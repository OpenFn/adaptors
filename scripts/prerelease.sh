#!/bin/sh -l

mode=$(cat .changeset/pre.json | jq ".mode")

if [ "$mode" = "\"pre\"" ]; then
  # TODO if any of these steps fail, we have to exit 1
  echo "Publishing pre-release build"

  # bump versions
  pnpm changeset version

  git add .

  echo "Changes":
  git status
  
  echo "Commiting changes"
  git commit -m "Bump pre-release versions"
  git push origin $GITHUB_HEAD_REF

  # publish with a dry run to get the summary
  pnpm publish -r --report-summary --publish-branch main --access=public --no-git-checks --tag next --dry-run

  node scripts/deprecate.mjs

  echo "Publishing...."
  pnpm publish -r --report-summary --publish-branch main --access=public --no-git-checks --tag next

  echo "Done!"
else
  echo "No prelease detected. Skipping release"
fi