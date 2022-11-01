#!/bin/sh -l
# clean docs directory
rm -rf docs/*.md

# copy new docs files 
rsync -pr packages/*/docs/ docs/

# Check in changes.
git config --global user.email "$GH_EMAIL"
git config --global user.name "$GH_USER"

git add docs --force
git status
git commit -m "Update auto-generated documentation."
git push --set-upstream origin docs