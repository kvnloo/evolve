---
description: Cross-repository swarm orchestration
agent: github-agent
---

# multi-repo-swarm

Coordinate AI swarms across multiple repositories for organization-wide automation.

## Quick Usage

### List organization repositories
!`gh repo list {org} --limit 100 --json name,description,languages`

### Batch repository operations
!`gh repo list {org} --limit 50 --json name | jq -r '.[].name' | while read repo; do gh repo view {org}/$repo --json defaultBranchRef; done`

### Search across repositories
!`gh search repos --owner {org} --language TypeScript --json name,description,stars`

### Clone multiple repositories
!`gh repo list {org} --json name --limit 10 | jq -r '.[].name' | while read repo; do gh repo clone {org}/$repo; done`

## Advanced Examples

### Analyze org dependencies
!`gh repo list {org} --json name | jq -r '.[].name' | while read repo; do gh api repos/{org}/$repo/contents/package.json --jq '.content' 2>/dev/null | base64 -d | jq -r '.dependencies | keys[]'; done | sort -u`

### Cross-repo issue search
!`gh issue list --repo {org}/repo1,{org}/repo2 --search "is:open label:bug"`

### Bulk PR creation
!`for repo in repo1 repo2 repo3; do gh pr create --repo {org}/$repo --title "Update dependencies" --body "Automated update"; done`
