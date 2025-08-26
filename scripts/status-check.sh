#!/bin/bash

# Check if git working tree is clean
# This script will fail if there are uncommitted changes

set -e

echo "Checking if git working tree is clean..."

# Check if there are any uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "Error: Working tree has uncommitted changes:"
    echo ""
    git status --porcelain
    echo ""
    echo "Please commit or stash these changes before proceeding."
    exit 1
fi

# Check if there are any untracked files that should be tracked
# Look for common files that should be committed after build
untracked_important_files=$(git ls-files --others --exclude-standard | grep -E '\.(json|js|ts|md)$' | head -10)

if [ -n "$untracked_important_files" ]; then
    echo "Warning: Found untracked files that might need to be committed:"
    echo "$untracked_important_files"
    echo ""
    echo "If these are build artifacts, consider adding them to .gitignore"
    echo "If they should be committed, please add and commit them."
    echo ""
    echo "Continuing with build..."
fi

echo "✓ Git working tree is clean"
exit 0
