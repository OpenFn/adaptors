#!/bin/sh -l

echo "Building docs.json"

# clean tmp directory
mkdir -p tmp
rm -rf tmp/*

# copy new packages docs files to the root docs directory
# rsync -pr packages/*/docs/ docs/
# rsync -av --progress packages/* docs/ --exclude node_modules --exclude src --exclude ast.json --exclude CHANGELOG.md --exclude test --exclude LICENSE --exclude LICENSE.LESSER --exclude package.json --exclude configuration-schema.json
rsync -zvr packages/ tmp/ --include="*.md" --include="*/" --exclude="*" --prune-empty-dirs

# move index.md to root directory
find tmp/*/docs -name '*.md' -type f -execdir mv -n '{}' ../ \;
find tmp/*/* -type d -empty -delete

# flatten json files
# jq -s 'flatten' packages/*/docs/*.json > docs/docs.json

# add first opening bracket
echo [ >>tmp/tmp.json
# use all json files in current folder
for i in packages/*/docs/*.json; do
    # first create the key; it is the filename without the extension
    # echo \"$i\": | sed 's/\.json//' >> output/tmp.json
    # dump the file's content
    cat "$i" >>tmp/tmp.json
    # add a comma afterwards
    echo , >>tmp/tmp.json
done
# remove the last comma from the file; otherwise it's not valid json
cat tmp/tmp.json | sed '$ s/.$//' >>tmp/docs.json
# remove tempfile
rm tmp/tmp.json
# add closing bracket
echo ] >>tmp/docs.json

echo "Done!"