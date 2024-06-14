# if there's a pre file
# TODO maybe grep pre.json for `"mode": "pre"`
if test -f .changeset/pre.json; then
  # TODO if any of these steps fail, we have to exit 1
  echo "Publishing pre-release build"

  # bump versions
  pnpm changeset version

  echo "Checkout git branch"
  echo git status
  
  # This is wierd, why do I have to fetch here?
  # Has something cached?
  # git fetch origin $GITHUB_HEAD_REF
  # git switch -c $GITHUB_HEAD_REF

  cat packages/test-tmp/package.json
  
  git add .
  
  echo "Commiting changes"
  git commit -m "Bump pre-release versions"
  # git push origin $GITHUB_HEAD_REF

  # publish
  # pnpm publish -r --report-summary --publish-branch main --access=public --no-git-checks --tag next
else
  echo "No prelease detected. Skipping release"
fi