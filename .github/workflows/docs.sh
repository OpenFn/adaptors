#!/bin/sh -l
# Identity config
git config user.email "$GH_EMAIL"
git config user.name "$GH_USER"

# sudo apt install jq
# Commit new changes to docs
# git pull
# git switch docs
# git rebase origin/main

# clean docs directory
rm -rf docs/*

# Setup pnpm
pnpm install --frozen-lockfile

# build new docs
pnpm -r run build docs

# copy new packages docs files to the root docs directory
# rsync -pr packages/*/docs/ docs/
# rsync -av --progress packages/* docs/ --exclude node_modules --exclude src --exclude ast.json --exclude CHANGELOG.md --exclude test --exclude LICENSE --exclude LICENSE.LESSER --exclude package.json --exclude configuration-schema.json
rsync -zvr packages/ docs/ --include="*.md" --include="*/" --exclude="*" --prune-empty-dirs

# move index.md to root directory
find docs/*/docs -name '*.md' -type f -execdir mv -n '{}' ../ \;
find  docs/*/* -type d -empty -delete;

# flatten json files
rm docs/*.json
# add first opening bracked
echo [ >> docs/tmp.json
# use all json files in current folder
for i in packages/*/docs/*.json
do 
    # first create the key; it is the filename without the extension
    # echo \"$i\": | sed 's/\.json//' >> output/tmp.json
    # dump the file's content
    cat "$i" >> docs/tmp.json
    # add a comma afterwards
    echo , >>  docs/tmp.json
done
# remove the last comma from the file; otherwise it's not valid json
cat docs/tmp.json | sed '$ s/.$//' >> docs/docs.json
# remove tempfile
rm docs/tmp.json
# add closing bracket
echo ] >> docs/docs.json

# commit new docs 
git fetch docs
git switch docs
git add docs --force
git status
git commit -m "Update auto-generated documentation."
git push origin docs