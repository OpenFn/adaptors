#!/bin/sh -l
echo "Committing new docs"

git fetch origin docs
git switch docs

rsync -pr tmp/* docs/

git add docs --force
git status
git add -A && git commit -m "Update auto-generated documentation."

echo "Pushing to docs branch"
git push origin docs

echo "Done!"
