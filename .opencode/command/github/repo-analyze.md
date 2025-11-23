---
description: Deep analysis of GitHub repository with AI insights
agent: github-agent
---

# repo-analyze

Deep analysis of GitHub repository with AI insights using gh CLI.

## Quick Usage
!`gh repo view {owner/repo} --json description,languages,topics,stargazersCount`

## Examples

### Basic repository analysis
!`gh repo view myorg/myrepo --json name,description,languages,topics,issues,pullRequests`

### Deep analysis with commit history
!`gh repo view myorg/myrepo --json defaultBranchRef`
!`gh api repos/myorg/myrepo/commits --paginate --jq '.[].commit.message' | head -100`

### Analyze specific areas
!`gh issue list --repo myorg/myrepo --limit 100 --json number,title,labels,state`
!`gh pr list --repo myorg/myrepo --limit 50 --json number,title,labels,state,reviews`
