---
description: Promote a draft decision record to accepted status
---

Treat `$1` as either a file path to the draft (e.g., `docs/decision-drafts/00020-my-decision.md`) or a decision id (e.g., `00020`).

If the argument is missing or ambiguous, stop and ask for clarification.

Follow this workflow exactly:

## 1. Locate the draft file

1. If `$1` is a file path, verify it exists under `docs/decision-drafts/`.
2. If `$1` is a decision id, find the draft file matching `docs/decision-drafts/<id>-*.md`.
3. If multiple matches exist, stop and ask which one to promote.
4. If no match exists, stop and ask for the correct path.

## 2. Validate the draft

1. Read the draft file.
2. Verify it matches `tools/check-decisions.mjs`:
   - YAML frontmatter exists.
   - Required keys are present: `id`, `title`, `type`, `date`, `tags`, `dependsOn`, `supersedes`, `related`.
   - `id` is five digits and the filename matches the slugified title.
   - Required headings are present in order: `# AI Summary`, `# Context`, `# Decision`, `# Rationale`, `# Consequences`, `# Implementation Notes`, `# Provenance`.
   - `# AI Summary` has 2-5 sentences.
   - `# Provenance` contains `Author:` and `Sources:` lines.
3. Check for conflicts with active decisions.
4. Stop if the draft is incomplete or has issues.

## 3. Assign the next numeric ID

1. List all files in `docs/decisions/`.
2. Find the highest numeric ID.
3. Calculate the next ID by incrementing the highest existing numeric ID and left-padding to five digits.

## 4. Move and rename the draft

1. Update the draft file's `id` field to the assigned numeric ID.
2. Move the draft from `docs/decision-drafts/<id>-<slug>.md` to `docs/decisions/<NNNNN>-<slug>.md`.
3. Remove the now-empty draft file.

## 5. Update `docs/decisions/index.md`

1. Read `docs/decisions/index.md`.
2. Insert the new decision in the appropriate place in the promoted decision list.
3. Add any new evolution links if the new decision relates to existing decisions.

## 6. Update `docs/architecture.md`

1. Read `docs/architecture.md`.
2. If the new decision affects the architectural summary, update the relevant section.
3. If the decision introduces a new subsection topic, add it.

## 7. Validate the changes

1. Run `pnpm check:decisions`.
2. If validation fails, stop and report the failure.
3. If validation passes, proceed.

## 8. Report success

1. Commit changes.
2. Push.
3. If there are no more draft decisions, offer the user to unset the PR as draft.
