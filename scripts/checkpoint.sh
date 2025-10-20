#!/bin/bash
# Automatic Git Checkpoint Script
# Creates timestamped checkpoint commits with current changes

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔖 Creating Git Checkpoint${NC}"

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo -e "${RED}❌ Not a git repository${NC}"
    exit 1
fi

# Check for uncommitted changes
if [[ -z $(git status --porcelain) ]]; then
    echo -e "${YELLOW}ℹ️  No changes to checkpoint${NC}"
    exit 0
fi

# Get current timestamp
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
BRANCH=$(git branch --show-current)

# Show what will be committed
echo -e "${YELLOW}📋 Changes to be checkpointed:${NC}"
git status --short

# Optional: Ask for confirmation
if [[ "${1}" != "--auto" ]]; then
    echo ""
    read -p "Create checkpoint on branch '$BRANCH'? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}❌ Checkpoint cancelled${NC}"
        exit 0
    fi
fi

# Stage all changes
git add -A

# Create checkpoint commit
git commit -m "🔖 Checkpoint: $TIMESTAMP

Automated checkpoint created on branch: $BRANCH

Changes preserved:
$(git status --short)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo -e "${GREEN}✅ Checkpoint created successfully${NC}"
echo -e "${GREEN}📊 Commit: $(git rev-parse --short HEAD)${NC}"

# Optional: Push to remote
if [[ "${2}" == "--push" ]]; then
    echo -e "${YELLOW}⬆️  Pushing to remote...${NC}"
    git push origin "$BRANCH"
    echo -e "${GREEN}✅ Pushed to remote${NC}"
fi

# Show latest commits
echo -e "\n${YELLOW}📜 Recent commits:${NC}"
git log --oneline -5
