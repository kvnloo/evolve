---
description: Intelligent issue management and project coordination
agent: github-agent
---

# issue-tracker

Automated issue management with swarm-coordinated tracking and progress monitoring.

## Repository Protection Check

**CRITICAL**: Before creating/modifying issues, verify repository:

!`remote_url=$(git remote get-url origin 2>/dev/null || echo ""); if [[ "$remote_url" == *"automazeio/ccpm"* ]]; then echo "ERROR: Cannot modify template repository"; exit 1; fi`

## Quick Usage

### List and filter issues
!`gh issue list --repo {owner/repo} --limit 50 --json number,title,labels,state`

### Create new issue
!`gh issue create --title "{title}" --body "{description}" --label "bug,high-priority"`

### Update issue
!`gh issue edit {number} --add-label "{label}" --add-assignee @me`

### Add comment
!`gh issue comment {number} --body "{comment text}"`

## Advanced Examples

### Search issues
!`gh issue list --repo {owner/repo} --search "is:open label:bug" --json number,title`

### Bulk operations
!`gh issue list --label "needs-triage" --json number | jq -r '.[].number' | while read num; do gh issue edit $num --add-label "triaged"; done`

### Track progress
!`gh issue view {number} --json title,body,comments,labels`
!`gh issue edit {number} --body "Updated with progress checklist"`
