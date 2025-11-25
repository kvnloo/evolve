---
description: Synchronize AI swarms with GitHub Projects
agent: github-agent
---

# project-board-sync

Synchronize swarm tasks with GitHub Projects for visual management.

## Quick Usage

### List projects
!`gh project list --owner @me --format json`

### View project items
!`gh project item-list {project-id} --owner @me --format json`

### Add issue to project
!`gh project item-add {project-id} --owner @me --url "{issue-url}"`

### Update project field
!`gh project field-list {project-id} --owner @me --format json`

## Advanced Examples

### Get project details
!`PROJECT_ID=$(gh project list --owner @me --format json | jq -r '.projects[] | select(.title == "Development Board") | .id')`
!`gh project view $PROJECT_ID --owner @me --format json`

### Batch add issues
!`gh issue list --label "enhancement" --json number,title,url | jq -r '.[].url' | while read url; do gh project item-add {project-id} --owner @me --url "$url"; done`

### Track progress
!`gh project item-list {project-id} --owner @me --format json | jq '.items[] | select(.content.type == "Issue")'`
