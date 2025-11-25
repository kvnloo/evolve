---
description: AI-powered pull request enhancements
agent: github-agent
---

# pr-enhance

AI-powered pull request enhancements with automated improvements.

## Quick Usage
!`gh pr view {pr-number} --json title,body,files,labels`

## Examples

### Enhance pull request
!`gh pr view 123 --json files,diff | npx claude-flow github enhance-pr`

### Add missing tests
!`gh pr diff 123 | npx claude-flow suggest-tests`
!`gh pr edit 123 --add-label "needs-tests"`

### Improve documentation
!`gh pr view 123 --json files --jq '.files[] | select(.filename | endswith(".md"))'`
!`gh pr comment 123 --body "Documentation improvements suggested"`

### Security review
!`gh pr view 123 --json files | npx claude-flow security-check`
!`gh pr edit 123 --add-label "security-reviewed"`
