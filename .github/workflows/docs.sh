#!/bin/sh -l
# clean docs directory
rm -rf docs/*.md

# copy new packages docs files to the root docs directory
rsync -pr packages/*/docs/ docs/

# Identity config
git config user.email "$GH_EMAIL"
git config user.name "$GH_USER"

# Commit new changes to docs
git checkout docs
git add docs --force
git status
git commit -m "Update auto-generated documentation."
git push origin docs