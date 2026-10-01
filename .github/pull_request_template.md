## Summary

Add a high-level, single-sentence summary of what this PR changes.

Fixes #

## Details

Add technical details of what you've changed (and why).

## AI Usage

Please disclose how you've used AI in this work (it's cool, we just want to
know!):

- [ ] I have used Claude Code
- [ ] I have used another model
- [ ] I have not used AI

You can read more details in our
[Responsible AI Policy](https://www.openfn.org/ai#pull-request-templates)

## Review Checklist

Before merging, the reviewer should check the following items:

- [ ] Does the PR do what it claims to do?
- [ ] If this is a new adaptor, added the adaptor on marketing website ?
- [ ] If this PR includes breaking changes, do we need to update any jobs in
      production? Is it safe to release?
- [ ] Are there any unit tests?
- [ ] Does every changed adaptor have a corresponding changeset? If an adaptor
      change does not affect a release, has a maintainer applied the
      `no changeset required` label? Repository-only changes need neither.
- [ ] If there is a changeset, was `pnpm run version` used to bump versions (not
      `pnpm changeset version` directly)? This ensures changelog dates are stamped correctly.
- [ ] Have you ticked a box under AI Usage?
