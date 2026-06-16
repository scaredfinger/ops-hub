---
description: Solve one or more GitHub issues sequentially, chaining branches, with dedicated planner and reviewer agents
---

Treat `$@` as a space-separated list of GitHub issue numbers. If none are provided, stop and ask for at least one issue number.

Follow this workflow exactly. Process each issue in order before starting the next.

---

## Orchestrator discipline

The orchestrator (current agent) must stay thin. Its only jobs are:

1. Track the two shared state variables below.
2. Route distilled specs and verdicts between subagents.
3. Never load full issue bodies, full docs, or unrelated diffs into its own context.
4. Delegate all git operations to the `executor` agent.
5. Delegate all file reading, analysis, and planning to the `planner` agent.
6. Delegate all file edits to the `implementor` agent.
7. Delegate all code-quality review to the `reviewer` agent.

**Shared state** (orchestrator tracks these across the entire run):

- `CURRENT_BRANCH` — starts as `main`; updated to each new branch name after it is created.
- `ITERATION_COUNT` — reset to `0` at the start of each issue; hard limit of `5` per issue.

---

## Per-issue loop

Repeat the phases below for every issue number in `$@`.

---

### Phase 0 — Determine branch name (orchestrator)

1. Use `gh issue view <N> --json number,title,labels` to read only the fields needed to build the branch name.
2. Determine the prefix from labels or title keywords:
   - `fix/` for bugs
   - `ci/` for CI or workflow work
   - `chore/` for maintenance or repo hygiene
   - `feat/` otherwise
3. Build `BRANCH_NAME` as `<prefix>/<N>-<slug>` in lowercase kebab-case.
4. Do not print a summary; do not load additional context.

---

### Phase 1 — Create branch using the executor agent

Delegate to the `executor` agent with only the following exact commands — no issue text, no docs:

```
git fetch --all --prune
git checkout <CURRENT_BRANCH>
git checkout -b <BRANCH_NAME>
```

> For the first issue `CURRENT_BRANCH` is `main`. For every subsequent issue it is the branch created for the previous issue. **Do not reset to main between issues.**

After the executor confirms success, set `CURRENT_BRANCH = BRANCH_NAME`.

---

### Phase 2 — Plan using the planner agent

Delegate to the `planner` agent with this exact framing (substitute values, nothing more):

> You are the planner for issue #<N>.
>
> 1. Read the issue: `gh issue view <N> --json number,title,body,labels,url`
> 2. Prime minimal project context:
>    - `docs/architecture.md`
>    - `docs/decisions/index.md`
> 3. If a specific decision record is relevant, read that decision file directly from `docs/decisions/` or `docs/decision-drafts/` and inspect only the nearby source files needed to understand the change. There is no decision registry in this repository.
> 4. Produce a terse implementation spec containing:
>    - Exact files to create or modify and the required changes in each.
>    - Which validation commands are needed (`pnpm check:decisions` is required whenever a decision record or governance file changes).
>    - A test impact section or an explicit reviewed exception for any behavior-changing work.
>    - Whether a new draft decision record is required (true/false) and, if true, the target path `docs/decision-drafts/<id>-<slug>.md`.
>    - DR lifecycle rules that apply (immutability, and that active governance updates may only describe separately promoted decisions, never an unpromoted draft).
> 5. Return only the spec. Do not explain, do not summarise the issue.

Receive the spec from the planner. Store it as `PLAN`. Do not expand it.

---

### Phase 3 — Implement using the implementor agent

Delegate to the `implementor` agent passing only `PLAN` plus any exact failure output from the previous iteration (empty on first pass):

- Target behavior and files to change (from `PLAN`).
- Any required DR, governance, or documentation updates (from `PLAN`).
- Exact validation failure output from the last executor run (if any).

Do not pass the full issue body, full architectural docs, or unrelated diffs.

Increment `ITERATION_COUNT`.

---

### Phase 4 — Validate using the executor agent

Delegate to the `executor` agent with the exact command list from `PLAN`. Always include `pnpm check:decisions` when `PLAN` changes a decision record or governance file. Include only the other commands `PLAN` specified as necessary (e.g. `pnpm test api`, `pnpm lint api`, `pnpm type-check api`, `pnpm build api`).

Pass only the command list — no implementation context.

---

### Phase 5 — Validation retry loop

If validation fails and `ITERATION_COUNT < 5`:

1. Extract only the failing output lines.
2. Go to Phase 3, passing the failure delta as the second argument.

If `ITERATION_COUNT == 5` and validation still fails, stop, report the final failure to the user, and do not proceed to the next issue.

---

### Phase 6 — Review using the reviewer agent

Once all validations pass, delegate to the `reviewer` agent with this exact framing:

> You are the reviewer for issue #<N>.
>
> 1. Read the issue: `gh issue view <N> --json number,title,body,labels,url`
> 2. Read the current diff: `git diff main...<CURRENT_BRANCH>`
> 3. Verify:
>    - The implementation satisfies every acceptance criterion in the issue.
>    - No committed decision record has been edited (check `docs/decisions/`).
>    - If a draft decision was created, it is under `docs/decision-drafts/`; any updates to `docs/decisions/index.md` / `docs/architecture.md` must describe only separately promoted decisions, not the draft.
>    - If the change affects behavior, the diff includes a test impact section or an explicit reviewed exception.
>    - Code quality: no speculative abstractions, no in-process caching, no code comments, no missing env-var fail-fast guards.
> 4. Return one of:
>    - `APPROVED` — changes are correct and complete.
>    - `CHANGES REQUIRED: <terse bullet list of specific defects>` — nothing else.

---

### Phase 7 — Review retry loop

If the reviewer returns `CHANGES REQUIRED` and `ITERATION_COUNT < 5`:

1. Extract only the defect bullets.
2. Go to Phase 3, treating the defect list as the failure delta.

If `ITERATION_COUNT == 5` and the reviewer still returns `CHANGES REQUIRED`, stop, report to the user, and do not proceed to the next issue.

---

### Phase 8 — DR and architecture governance check (orchestrator)

Before committing, verify the following from the planner's `PLAN`:

1. If a draft decision was required: confirm the file exists under `docs/decision-drafts/` and that `docs/decisions/index.md` and `docs/architecture.md` were not updated to describe the draft as active.
2. If no draft decision was required: confirm no file was created under `docs/decisions/` or `docs/decision-drafts/`.
3. If the change affects behavior, confirm the implementation or PR body includes a test impact section or an explicit reviewed exception.
4. If the PR will contain an unpromoted draft decision, the PR must be created as a draft PR.

---

### Phase 9 — Commit, push, and open PR using the executor agent

Delegate to the `executor` agent with only these instructions:

1. Inspect `git status`, `git diff`, `git log --oneline -10`.
2. Stage only the files changed for issue #<N>.
3. Commit with a message matching repo style.
4. Push the branch.
5. Create a PR:
   - Draft PR (`gh pr create --draft`) if an unpromoted decision draft is present.
   - Regular PR otherwise.
   - PR body must include `Closes #<N>`.
   - PR base must be `<PREVIOUS_BRANCH>` (the branch this one was created from), not `main`.
6. Return the PR URL.

Do not pass implementation context to the executor.

---

### Phase 10 — CI gate using the executor agent

Delegate to the `executor` agent:

1. Poll `gh pr checks <PR_URL>` every 30 seconds for up to 5 minutes.
2. Report the final check status.

If checks fail due to code or test problems and `ITERATION_COUNT < 5`:

1. Extract only the actionable failure from the check output.
2. Go to Phase 3 to fix, then re-run Phase 4, Phase 9 (amend commit / force-push), and Phase 10.

If checks pass, record the PR URL and advance to the next issue.

Do not merge the PR.

---

## After all issues are processed

Report to the user:

- One line per issue: issue number, branch name, PR URL, and PR status (open / draft).
- Nothing else.

---

## Subagent token discipline

1. Never pass full issue bodies to the orchestrator's own context — only the fields needed for branch naming (Phase 0).
2. Never pass full `docs/decisions/index.md` or `docs/architecture.md` to any subagent; let the planner read them directly.
3. Never pass unrelated diffs or logs between agents.
4. Pass exact command lists to `executor`.
5. Pass exact file-change specs and failure deltas (never full docs) to `implementor`.
6. Pass only the git diff and issue number to `reviewer`.
