# if there's a pre file
# TODO maybe grep pre.json for `"mode": "pre"`
if test -f .changeset/pre.json; then
  # TODO if any of these steps fail, we have to exit 1
  echo "Publishing pre-release build"

  # bump versions
  pnpm changeset version

  cat packages/test-tmp/package.json
  
  git add .

  echo "Changes":
  git status
  
  echo "Commiting changes"
  git commit -m "Bump pre-release versions"
  git push origin $GITHUB_HEAD_REF

  echo "Publishing...."
  pnpm publish -r --report-summary --publish-branch main --access=public --no-git-checks --tag next

  echo "Done!"
else
  echo "No prelease detected. Skipping release"
fi