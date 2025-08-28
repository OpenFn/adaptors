#!/bin/bash

# Check if git working tree is clean
# This script will fail if there are uncommitted changes

set -e
echo "Checking if git working tree is clean..."

if [ -z "$(git status --porcelain 2>/dev/null)" ]; then
    echo "✓ Git working tree is clean"
    exit 0
else
    echo "❌ Git working tree has uncommitted changes"
    echo ""
    git status --porcelain
    
    # Simple note about ast.json
    if git status --porcelain | grep -q "ast.json"; then
        echo ""
        echo "Note: ast.json changes are often caused by the file not being checked into the build"
    fi
    
    echo ""
    echo "Please commit or stash these changes before proceeding."
    exit 1
fi


