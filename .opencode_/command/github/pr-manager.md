---
description: Comprehensive pull request management with swarm coordination
agent: github-agent
---

# pr-manager

Comprehensive PR management with multi-reviewer coordination and automated workflows.

## Repository Protection Check

**CRITICAL**: Before ANY GitHub write operation, verify you're not targeting the template repository:

!`remote_url=$(git remote get-url origin 2>/dev/null || echo ""); if [[ "$remote_url" == *"automazeio/ccpm"* ]]; then echo "ERROR: Cannot modify template repository"; exit 1; fi`

## Quick Usage

### View PR details
!`gh pr view {pr-number} --json title,body,files,labels,reviews`

### Create pull request
!`gh pr create --title "{title}" --body "{description}" --head {branch} --base main`

### Review and approve
!`gh pr review {pr-number} --approve --body "LGTM after review"`

### Merge pull request
!`gh pr merge {pr-number} --squash --delete-branch`

## Advanced Examples

### Multi-file PR review
!`gh pr diff {pr-number}`
!`gh pr view {pr-number} --json files --jq '.files[] | .path'`
!`gh pr review {pr-number} --comment --body "Review comments here"`

### PR status and validation
!`gh pr view {pr-number} --json statusCheckRollup,reviewDecision`
!`gh pr checks {pr-number}`

### Update PR branch
!`gh pr view {pr-number} --json headRefName,baseRefName`
!`git fetch origin && git checkout {head-branch} && git merge origin/{base-branch}`
