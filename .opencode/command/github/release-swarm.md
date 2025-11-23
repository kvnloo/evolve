---
description: Intelligent release automation with AI swarms
agent: github-agent
---

# release-swarm

Automated release orchestration with changelog generation and multi-platform deployment.

## Quick Usage

### Get release history
!`gh release list --repo {owner/repo} --limit 10`
!`LAST_TAG=$(gh release list --limit 1 --json tagName -q '.[0].tagName')`

### Generate changelog from commits
!`gh api repos/{owner}/{repo}/compare/${LAST_TAG}...HEAD --jq '.commits[].commit.message'`

### Generate changelog from PRs
!`gh pr list --state merged --base main --json number,title,mergedAt --jq '.[] | "- \(.title) (#\(.number))"'`

### Create release
!`gh release create {tag} --title "Release {version}" --notes-file CHANGELOG.md --target main`

## Advanced Examples

### Get contributors
!`gh api repos/{owner}/{repo}/compare/${LAST_TAG}...HEAD --jq '.commits[].author.login' | sort -u`

### Create release with automated changelog
!`CHANGELOG=$(gh pr list --state merged --base main --search "merged:>=$(gh release view $LAST_TAG --json publishedAt -q .publishedAt)" --json number,title,labels --jq '.[] | "- \(.title) (#\(.number))"')`
!`gh release create v2.0.0 --title "Release v2.0.0" --notes "$CHANGELOG" --target main`

### Upload release assets
!`npm run build`
!`for file in dist/*; do gh release upload {tag} "$file"; done`

### Create announcement issue
!`gh issue create --title "🚀 Released {tag}" --body "See release notes: https://github.com/{owner}/{repo}/releases/tag/{tag}" --label "announcement,release"`
