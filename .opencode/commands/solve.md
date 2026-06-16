---
description: Solve a GitHub issue end-to-end and open a PR without merging
---

Treat `$1` as the GitHub issue number. If it is missing, stop and ask for the issue number.

Follow this workflow exactly:

## 0. Read issue and prime minimal context

1. Using the current agent, read the issue with `gh issue view $1 --json number,title,body,labels,url`.
2. Do not print an issue summary back to the user.
3. Prime the minimum project context by reading:
   - @docs/architecture.md
   - @docs/decisions/index.md
4. Read additional files only when needed.
5. If a specific decision record matters, read that decision file directly from `docs/decisions/` or `docs/decision-drafts/` and then inspect only the source files needed to understand the change. Do not rely on a decision registry; this repository does not have one.

## 1. Prepare git state using the executor agent

1. Determine the branch prefix from the issue type:
   - `fix/` for bugs
   - `ci/` for CI or workflow work
   - `chore/` for maintenance or repo hygiene
   - `feat/` otherwise
2. Build a branch name from the issue title in the form `<type>/$1-<slug>` using lowercase kebab-case.
3. Delegate to the `executor` agent with only the exact commands needed to:
   - `git fetch --all --prune`
   - `git checkout main`
   - `git pull --ff-only`
   - `git checkout -b <branch-name>`
4. Do not pass the full issue text or documentation context to the executor agent.

## 2. Plan with the main agent

1. Plan the implementation using the current agent.
2. Decide which files need changes and which validations are required.
3. Decide whether a new decision record is required.
4. If the change affects behavior, include a test impact section or an explicit reviewed exception in the implementation notes and PR body.
5. If architecture or governance changes require a decision record:
   - never edit a committed decision record
   - create a new **draft** decision record in `docs/decision-drafts/<id>-<slug>.md` using the repository's decision-file format
   - do not update `docs/decisions/index.md` or `docs/architecture.md` for the draft itself until the draft is promoted
   - note that the draft must be promoted using `.opencode/commands/promote-decision-draft.md` before it becomes part of active governance
6. Draft decision precedence is non-negotiable:
   - if the issue acceptance criteria ask for a new decision record and active governance updates in the same PR, create the draft decision record only and do **not** update active governance artifacts for that draft
   - active governance artifacts may still be updated for separately promoted decisions in the same PR, but they must not describe an unpromoted draft as active
   - do not create an active decision record directly under `docs/decisions/` during this workflow
   - do not satisfy issue text by bypassing the draft lifecycle
   - the PR must be a draft PR while any unpromoted decision draft is present
7. If no new decision is required, do not create one.

## 3. Implement using the implementor agent

1. Delegate implementation to the `implementor` agent.
2. Pass only the implementation spec it needs:
   - the target behavior
   - the files to change
   - any required DR, governance, or documentation updates
   - any exact validation failures from prior attempts
3. Do not pass the full issue text, full architectural docs, or unrelated repository context.

## 4. Validate using the executor agent

1. Choose the minimum sufficient validation commands for the changed area.
2. Always include `pnpm check:decisions` when a decision record or governance file changes.
3. Add only the other commands that are necessary, such as:
   - `pnpm test api`
   - `pnpm lint api`
   - `pnpm lint:all`
   - `pnpm type-check api`
   - `pnpm type-check:all`
   - `pnpm build api`
   - `pnpm build:all`
   - `pnpm acceptance`
   - `pnpm check:decisions`
4. Delegate validation to the `executor` agent with only the exact command list.

## 5. Retry loop

1. If executor validation fails, pass only the failing output and the required fix delta to the `implementor` agent.
2. Resume from step 3.
3. Maximum 5 total iterations.

## 6. Main-agent review gate

1. Once executor validations pass, review the work with the current agent.
2. Verify correctness, completeness, DR compliance, documentation coherence, and test-impact coverage.
3. If anything is wrong or incomplete, resume from step 3.
4. The same 5-iteration maximum applies across validation and review loops combined.

## 7. DR and architecture governance

Before leaving the implementation loop, ensure all applicable rules are satisfied:

1. Decision records are immutable once committed.
2. New decisions supersede or relate to older ones instead of editing history.
3. `docs/architecture.md` reflects only active promoted decisions.
4. `docs/decisions/index.md` reflects only active promoted decisions and evolution relationships.
5. Behavior changes include a test impact section or an explicit reviewed exception.

## 8. Commit, push, and open a PR using the executor agent

1. Delegate to the `executor` agent to inspect:
   - `git status`
   - `git diff`
   - `git log --oneline -10`
2. Stage only the intended files.
3. Create a concise commit message matching repo style.
4. Push the branch.
5. Create a PR with `gh pr create`.
    - If unpromoted draft decision records exist in the PR (files under `docs/decision-drafts/` other than README.md), create a **draft PR** using `gh pr create --draft`
    - Otherwise, create a regular PR
6. Include `Close #$1` in the PR body.
7. If the change affects behavior, ensure the PR body includes a test impact section or an explicit reviewed exception.
8. Do not merge the PR.
9. Do not pass unnecessary implementation context to the executor agent.

## 9. PR validation gate

1. Use the `executor` agent to check PR validations.
2. Poll `gh pr checks` for up to 5 minutes before treating a failure as actionable.
3. If checks fail because the code or tests need changes, resume from step 3.
4. Re-run the necessary validation loop, push fixes, and check the PR again.
5. Do not merge the PR.

## Subagent token discipline

When delegating:

1. Never pass the full issue body unless a subagent needs one exact excerpt.
2. Never pass the full contents of `docs/decisions/index.md` or `docs/architecture.md` to subagents.
3. Never pass unrelated diffs or logs.
4. Pass exact commands to `executor`.
5. Pass exact file-change instructions and failure deltas to `implementor`.
