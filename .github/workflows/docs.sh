#!/bin/sh -l
# clean docs directory
rm -rf docs/*

# copy new packages docs files to the root docs directory
# rsync -pr packages/*/docs/ docs/
# rsync -av --progress packages/* docs/ --exclude node_modules --exclude src --exclude ast.json --exclude CHANGELOG.md --exclude test --exclude LICENSE --exclude LICENSE.LESSER --exclude package.json --exclude configuration-schema.json
rsync -zvr packages/ docs/ --include="*.md" --include="*/" --exclude="*" --prune-empty-dirs

# move index.md to root directory
find docs/*/docs -name '*.md' -type f -execdir mv -n '{}' ../ \;
find  docs/*/* -type d -empty -delete;

# Identity config
git config user.email "$GH_EMAIL"
git config user.name "$GH_USER"

# Commit new changes to docs
git fetch origin docs
git switch docs
git add docs --force
git status
git commit -m "Update auto-generated documentation."
git push origin docs