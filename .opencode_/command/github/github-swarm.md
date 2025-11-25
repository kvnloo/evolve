---
description: Create specialized swarm for GitHub repository management
agent: github-agent
---

# github-swarm

Create specialized AI swarms for comprehensive GitHub repository management.

## Quick Usage
!`gh repo view {owner/repo} --json name,description,languages,topics`

## Examples

### Basic GitHub swarm
!`gh repo view owner/repo --json defaultBranchRef,languages`

### Maintenance-focused swarm with issue labeling
!`gh issue list --repo owner/repo --state open --json number,title,labels`
!`gh issue edit {number} --add-label "maintenance,swarm-processed"`

### Development swarm with PR automation
!`gh pr list --repo owner/repo --state open --json number,title,files`
!`gh pr review {number} --approve --body "Automated swarm review"`

### Full-featured triage swarm
!`gh issue list --repo owner/repo --label "needs-triage" --json number,title,body`
!`gh pr list --repo owner/repo --state open --json number,title,reviews`
