---
description: Repository structure optimization and multi-repo management
agent: github-agent
---

# repo-architect

Repository architecture analysis and optimization with best practices.

## Quick Usage

### Analyze repository structure
!`gh repo view {owner/repo} --json name,description,languages,primaryLanguage`
!`gh api repos/{owner}/{repo}/contents --jq '.[].name'`

### Search repositories
!`gh search repos --owner {owner} --language TypeScript --json name,description`

### Clone repository
!`gh repo clone {owner/repo} {directory} -- --depth=1`

### Create repository
!`gh repo create {name} --description "{description}" --public`

## Advanced Examples

### Analyze file structure
!`gh api repos/{owner}/{repo}/git/trees/main?recursive=1 --jq '.tree[] | .path' | head -50`

### Compare repository structures
!`gh repo view {owner}/repo1 --json languages`
!`gh repo view {owner}/repo2 --json languages`

### Fork and clone
!`gh repo fork {owner/repo} --clone=true`

### Template operations
!`gh repo create {new-repo} --template {owner/template-repo}`
