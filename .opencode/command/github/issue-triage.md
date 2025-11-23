---
description: Intelligent issue classification and triage
agent: github-agent
---

# issue-triage

Intelligent issue classification and automated triage.

## Quick Usage
!`gh issue list --repo {owner/repo} --limit 50 --json number,title,body,labels`

## Examples

### Triage all issues
!`gh issue list --repo myorg/myrepo --state open --json number,title,body,labels`

### Auto-label issues
!`gh issue list --repo myorg/myrepo --label "needs-triage" --json number,title,body | npx claude-flow auto-label`

### Auto-assign to team members
!`gh issue view 456 --json title,body | npx claude-flow suggest-assignee`
!`gh issue edit 456 --add-assignee suggested-user`
