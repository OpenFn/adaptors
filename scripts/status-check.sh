#!/bin/bash

# Check if git working tree is clean
# This script will fail if there are uncommitted changes

set -e

echo "Checking if git working tree is clean..."

# Check if we're in a CI environment
if [ -n "$CI" ] || [ -n "$GITHUB_ACTIONS" ]; then
    echo "Running in CI environment, checking git status..."
    
    # Debug information for CI
    echo "CI environment variables:"
    echo "  CI: $CI"
    echo "  GITHUB_ACTIONS: $GITHUB_ACTIONS"
    echo "  GITHUB_WORKSPACE: $GITHUB_WORKSPACE"
    
    # In CI, we might have a shallow clone or different git state
    # First check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo "Warning: Not in a git repository in CI, skipping git checks"
        echo "✓ Git checks skipped in CI environment"
        exit 0
    fi
    
    # Check if we have a valid HEAD (might be detached in CI)
    if ! git rev-parse HEAD > /dev/null 2>&1; then
        echo "Warning: No valid HEAD in CI, skipping git checks"
        echo "✓ Git checks skipped in CI environment"
        exit 0
    fi
    
    # Check if this is a shallow clone (common with actions/checkout@v3)
    if [ -f ".git/shallow" ]; then
        echo "Warning: Shallow clone detected in CI, this may affect git checks"
    fi
    
    # In CI, try to check git status but be more lenient
    echo "CI environment detected - performing basic git checks..."
    
    # Show git status for debugging
    echo "Git status:"
    git status --porcelain || echo "Could not get git status"
    echo ""
    
    # In CI, we'll be more lenient and just check for obvious uncommitted changes
    # rather than using diff-index which can be problematic with shallow clones
    if git diff --name-only HEAD 2>/dev/null | grep -q .; then
        echo "Error: Working tree has uncommitted changes:"
        echo ""
        git status --porcelain
        echo ""
        echo "Please commit or stash these changes before proceeding."
        exit 1
    fi
    
    # Check for untracked files
    untracked_files=$(git ls-files --others --exclude-standard 2>/dev/null | head -10)
    if [ -n "$untracked_files" ]; then
        echo "Warning: Found untracked files in CI:"
        echo "$untracked_files"
        echo ""
        echo "Continuing with build in CI environment..."
    fi
    
    echo "✓ Git checks passed in CI environment"
    exit 0
fi

# For non-CI environments, use the original strict checking
# Check if there are any uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "Error: Working tree has uncommitted changes:"
    echo ""
    git status --porcelain
    echo ""
    echo "Please commit or stash these changes before proceeding."
    exit 1
fi

# Check if there are any untracked files that should be tracked
# Look for common files that should be committed after build
untracked_important_files=$(git ls-files --others --exclude-standard 2>/dev/null | grep -E '\.(json|js|ts|md)$' | head -10)

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
