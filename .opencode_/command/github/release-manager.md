---
description: Automated release coordination and deployment
agent: github-agent
---

# release-manager

Automated release pipelines with comprehensive testing and version coordination.

## Quick Usage

### List releases
!`gh release list --repo {owner/repo} --limit 10`

### View release details
!`gh release view {tag} --repo {owner/repo} --json tagName,name,body,assets`

### Create release
!`gh release create {tag} --title "{title}" --notes "{release notes}" --target main`

### Upload release assets
!`gh release upload {tag} {file-path} --repo {owner/repo}`

## Advanced Examples

### Compare versions
!`LAST_TAG=$(gh release list --limit 1 --json tagName -q '.[0].tagName')`
!`gh api repos/{owner}/{repo}/compare/${LAST_TAG}...HEAD --jq '.commits'`

### Generate changelog from PRs
!`gh pr list --state merged --base main --json number,title,mergedAt --jq '.[] | "- \(.title) (#\(.number))"'`

### Create release with artifacts
!`npm run build && gh release create v1.0.0 --title "Release v1.0.0" --notes-file CHANGELOG.md`
!`gh release upload v1.0.0 dist/*.tar.gz dist/*.zip`
