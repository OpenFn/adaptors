# if there's a pre file
if test -f .changeset/pre.json; then
  echo "Publishing pre-release build"

  # TODO I'd really like a robust way to tell if we're in pre mode
  # I suppose this works
  # will this reset numbers or anything?
  # the other option is to use jq to read the json
  # so this is not safe to do when already in pre mode
  #pnpm changeset pre enter next

  # bump versions
  pnpm changeset version

  # publish
  pnpm publish -r --report-summary --publish-branch main --access=public
else
  echo "No prelease detected. Skipping release"

fi