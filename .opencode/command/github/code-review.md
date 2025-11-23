---
description: Automated code review with swarm intelligence
agent: github-agent
---

# code-review

Automated code review with AI-powered insights.

## Quick Usage
!`gh pr view {pr-number} --json files,diff`

## Examples

### Review pull request
!`gh pr diff 456 | npx claude-flow review-code --focus security,performance`

### Security-focused review
!`gh pr view 456 --json files | npx claude-flow security-scan`
!`gh pr review 456 --comment --body "Security review completed"`

### Suggest code fixes
!`gh pr diff 456 | npx claude-flow suggest-fixes`
!`gh pr comment 456 --body-file /tmp/suggestions.md`
