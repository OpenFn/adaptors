---
mode: agent
description: Review the current adaptor changes against the OpenFn code review rubric.
---

# Adaptor Code Review

Perform a code review of the current changes against the OpenFn adaptor review
rubric.

## Steps

1. Read the review rubric at [wiki/code-review.md](../../wiki/code-review.md).
   This is the source of truth for what to check.
2. Determine the diff to review:
   - Prefer the changes on the current branch versus `main`
     (`git diff main...HEAD`), including the list of changed files.
   - If there is no diff against `main`, review the working-tree changes
     (`git status` / `git diff`).
   - Only review changed files and their immediate context. Do not flag
     unrelated existing code.
3. For each changed adaptor, work through the rubric sections that apply. Read
   the touched source and test files as needed to verify each item.
4. Report findings using the output format below. For every finding, cite the
   relevant rubric rule (and source wiki page where useful) and classify it as
   **Blocking**, **Recommended**, or **Nit**.
5. Prefer concrete, actionable suggestions (ideally a suggested change) over
   general observations. Be concise.
6. Scale the review to the size of the change — a small or dev-only PR does not
   need every section.

## Output format

```
## Summary
<1–2 sentences: what the change does and overall assessment>

## Blocking
- <finding> — <rubric rule / wiki reference>

## Recommended
- <finding> — <rubric rule / wiki reference>

## Nits
- <finding>
```

If there are no findings in a section, write "None".
