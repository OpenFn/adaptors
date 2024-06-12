#!/bin/sh -l

# commit new docs
git fetch origin docs
git switch docs

rsync -pr tmp/* docs/

git add docs --force
git status
git add -A && git commit -m "Update auto-generated documentation."

# push
git push origin docs
