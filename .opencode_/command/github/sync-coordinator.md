---
description: Multi-package synchronization and version alignment
agent: github-agent
---

# sync-coordinator

Synchronize packages and align versions across multiple repositories.

## Quick Usage

### Compare package versions
!`gh api repos/{owner}/{repo}/contents/package.json --jq '.content' | base64 -d | jq '.version'`

### List repository files
!`gh api repos/{owner}/{repo}/contents/{path} --jq '.[].name'`

### Get file content
!`gh api repos/{owner}/{repo}/contents/{file-path} --jq '.content' | base64 -d`

### Update file via PR
!`gh api repos/{owner}/{repo}/git/refs/heads/main --jq '.object.sha'`
!`gh pr create --title "Sync package versions" --body "Automated sync" --head sync-branch --base main`

## Advanced Examples

### Cross-package dependency check
!`for repo in repo1 repo2 repo3; do echo "=== $repo ==="; gh api repos/{owner}/$repo/contents/package.json --jq '.content' | base64 -d | jq '.dependencies'; done`

### Version alignment
!`gh api repos/{owner}/repo1/contents/package.json --jq '.content' | base64 -d | jq -r '.engines.node'`
!`gh api repos/{owner}/repo2/contents/package.json --jq '.content' | base64 -d | jq -r '.engines.node'`

### Batch file updates
!`gh repo clone {owner}/{repo} /tmp/{repo} -- --depth=1`
!`cd /tmp/{repo} && git checkout -b sync-update && git push origin sync-update`
!`gh pr create --repo {owner}/{repo} --title "Sync update" --head sync-update --base main`
