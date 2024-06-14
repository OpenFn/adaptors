# if there's a pre file
# TODO maybe grep pre.json for `"mode": "pre"`
if test -f .changeset/pre.json; then
  echo "Publishing pre-release build"

  # bump versions
  pnpm changeset version

  ## check changes into git
  git add .
  git commit -m "Bump pre-release versions"
  git push origin `git rev-parse --abbrev-ref HEAD`

  # publish
  pnpm publish -r --report-summary --publish-branch main --access=public --no-git-checks --tag next
else
  echo "No prelease detected. Skipping release"

fi