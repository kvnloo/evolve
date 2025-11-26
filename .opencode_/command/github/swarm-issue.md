---
description: Issue-based swarm coordination and task decomposition
agent: github-agent
---

# swarm-issue

Transform GitHub Issues into intelligent swarm tasks with automatic decomposition.

## Repository Protection Check

**CRITICAL**: Verify repository before write operations:

!`remote_url=$(git remote get-url origin 2>/dev/null || echo ""); if [[ "$remote_url" == *"automazeio/ccpm"* ]]; then echo "ERROR: Cannot modify template repository"; exit 1; fi`

## Quick Usage

### Get issue details
!`gh issue view {number} --json title,body,labels,assignees,comments`

### Create swarm-ready issue
!`gh issue create --title "{title}" --body "{description}" --label "swarm-ready"`

### Batch process issues
!`gh issue list --label "swarm-ready" --json number,title,body | jq -r '.[] | "\(.number): \(.title)"'`

## Advanced Examples

### Decompose issue into subtasks
!`gh issue view {number} --json body --jq '.body' | grep '- \[ \]'`

### Track progress
!`gh issue view {number} --json body | jq -r '.body' | grep -o '\[x\]' | wc -l`
!`gh issue comment {number} --body "Progress update: X/Y tasks completed"`

### Link related issues
!`gh issue view {number} --json body | grep -oE '#[0-9]+' | while read ref; do NUM=${ref#\#}; gh issue view $NUM --json number,title,state; done`

### Update issue status
!`gh issue edit {number} --add-label "in-progress,swarm-processing"`
!`gh issue comment {number} --body "🐝 Swarm initialized for this issue"`
