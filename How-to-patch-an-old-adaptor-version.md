Very occasionally, we get into a situation where we want to issue a patch release to an old major (or even minor) adaptor version.

For example, a critical bug comes out for salesforce v3.x and we need to update its jsforce, but `main` has salesforce v5.x. You can't just patch the main version and set the version back to 3.whatever, it'll be totally the wrong code version and incompatible with workflows on 3.x.

But there is a way. We basically checkout a tag and create a temporary branch which does not get merged to main. We'll release from this branch 


This Wiki will show you how to do it.

# Prep the branch

1. Check out the closest tag to the version you want to patch. Something like `git checkout @openfn/language-common@1.15.2`
1. Checkout a new branch from this tag
1. Make your changes
1. Create a changeset
1. Open a PR and add the `DO NOT MERGE` label
1. Review as usual
1. When you're ready, bump versions

Note: If you're bumping common, you may have to update dependencies of packages within the monorepo. Do not create changesets for these packages unless you absolutely have to.

The goal here is only to have a version bump for the one adaptor that's changed. If you're bumping a legacy common version, you should probably update dependencies on main after releasing the patch version. This stuff gets a bit weird and confusing.

# Release through CI

I recommend you release the patched version through CI (github actions). But it is a little hacky.

When you're ready to release, update `.github/workflows/publish.yaml` along these lines:

1. Publish on push, by changing the `on` line at the top to `on: push`. This means that every subsequent push to your temporary release branch will attempt to publish.
1. Update the actual publish command so that the `legacy` tag is added to the new release instead of latest. Also update the branch name. So the `run: pnpm:publish` line becomes something like this:

```
  - run: pnpm publish -r --report-summary --publish-branch <YOUR_BRANCH_NAME>
    --access=public --tag legacy --no-git-checks
```

Commit the changes to publish.yaml and push. This should instantly trigger a build and publish.

# Release locally

If releasing through CI is too much of a hassle, you may want to just do a local release with `pnpm publish`.

You still need a command like:
```
pnpm publish -r --publish-branch <BRANCH-NAME> --access=public --tag legacy --no-git-checks
```

You will need a OTP from npmjs to do this, or the right permissions on your account.

If you do this, you need to make ABSOLUTELY SURE that your local repo is properly built.

You should probably use `--dry-run` first to test changes before actually releasing.

## Tidyup

You may have to push tags for the new versions manually.

Close the PR.

Do not delete the branch.

## Examples

Some old patch branches for reference:

* https://github.com/OpenFn/adaptors/pull/784
* https://github.com/OpenFn/adaptors/pull/703