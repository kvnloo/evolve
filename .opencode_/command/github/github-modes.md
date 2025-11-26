---
description: GitHub workflow modes reference guide
agent: github-agent
---

# GitHub Integration Modes

Comprehensive GitHub workflow modes with ruv-swarm coordination.

## Core Workflow Modes

### pr-manager
Pull request management and review coordination
- **Usage**: Automated PR reviews, merge coordination, conflict resolution
- **Tools**: `gh pr create`, `gh pr view`, `gh pr review`, `gh pr merge`

### issue-tracker
Issue management and project coordination
- **Usage**: Project management, issue coordination, progress tracking
- **Tools**: `gh issue create`, `gh issue edit`, `gh issue comment`, `gh issue list`

### release-manager
Release coordination and deployment
- **Usage**: Release management, version coordination, deployment pipelines
- **Tools**: `gh release create`, `gh release upload`, `gh release list`

## Repository Management Modes

### repo-architect
Repository structure and organization
- **Usage**: Repository setup, structure optimization, multi-repo management
- **Tools**: `gh repo create`, `gh repo clone`, `gh repo view`

### code-reviewer
Automated code review and quality assurance
- **Usage**: Code quality, security reviews, performance analysis
- **Tools**: `gh pr diff`, `gh pr review`, `gh pr comment`

### branch-manager
Branch management and workflow coordination
- **Usage**: Branch coordination, merge strategies, workflow management
- **Tools**: `git` commands, `gh api` for branch operations

## Quick Reference

### Repository Operations
!`gh repo view {owner/repo} --json description,languages,topics`
!`gh repo clone {owner/repo} {directory}`

### Issue Operations
!`gh issue list --repo {owner/repo} --limit 50`
!`gh issue create --title "{title}" --body "{description}"`

### PR Operations
!`gh pr list --repo {owner/repo} --state open`
!`gh pr create --title "{title}" --head {branch} --base main`

### Release Operations
!`gh release list --repo {owner/repo}`
!`gh release create {tag} --title "{title}" --notes "{notes}"`
