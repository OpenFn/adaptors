#!/bin/bash

# Check if git working tree is clean
# This script will fail if there are uncommitted changes

set -e
echo "Checking if git working tree is clean..."

if [ -z "$(git status --porcelain 2>/dev/null)" ]; then
    echo "✓ Git working tree is clean"
    exit 0
else
    echo "Has changes"
    git status --porcelain
    echo "Please commit or stash these changes before proceeding."
    exit 1
fi


