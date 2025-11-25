---
description: PR-based swarm management and coordination
agent: github-agent
---

# swarm-pr

Create and manage AI swarms directly from GitHub Pull Requests.

## Quick Usage

### Get PR context
!`gh pr view {pr-number} --json body,title,labels,files,reviews`

### Create PR with swarm config
!`gh pr create --title "{title}" --body "Swarm Config: topology=mesh agents=5" --head {branch} --base main`

### Auto-spawn agents based on labels
!`gh pr view {pr-number} --json labels --jq '.labels[] | .name'`

### Update PR with swarm progress
!`gh pr comment {pr-number} --body "🐝 Swarm progress: 75% complete"`

## Advanced Examples

### PR diff analysis
!`gh pr diff {pr-number} | wc -l`
!`gh pr view {pr-number} --json files --jq '.files | length'`

### Multi-agent review
!`gh pr diff {pr-number} | npx claude-flow review-code --agents security,performance,style`
!`gh pr review {pr-number} --comment --body "Multi-agent review complete"`

### Progress tracking
!`gh pr view {pr-number} --json statusCheckRollup,reviewDecision`
!`gh pr edit {pr-number} --add-label "swarm-complete" --add-label "ready-for-merge"`

### Auto-merge when ready
!`SWARM_STATUS=$(gh pr view {pr-number} --json labels --jq '.labels[] | select(.name == "swarm-complete")'); if [ -n "$SWARM_STATUS" ]; then gh pr merge {pr-number} --auto --squash; fi`
