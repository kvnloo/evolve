---
description: Multi-agent code review with specialized review agents
agent: github-agent
---

# code-review-swarm

Deploy specialized AI agents for comprehensive intelligent code reviews.

## Quick Usage

### Get PR details for review
!`gh pr view {pr-number} --json files,additions,deletions,title,body`
!`gh pr diff {pr-number}`

### Security review
!`gh pr view {pr-number} --json files --jq '.files[].path' | grep -E '\.(js|ts|py)$'`
!`gh pr review {pr-number} --comment --body "🔒 Security review: No issues found"`

### Performance analysis
!`gh pr diff {pr-number} | grep -E '(for|while|forEach|map|filter)'`
!`gh pr comment {pr-number} --body "⚡ Performance suggestions: Consider optimization"`

### Style check
!`gh pr diff {pr-number} | npx eslint --stdin --format compact`
!`gh pr review {pr-number} --comment --body "Style check complete"`

## Advanced Examples

### Multi-agent review workflow
!`PR_DATA=$(gh pr view {pr-number} --json files,additions,deletions)`
!`CHANGED_FILES=$(gh pr view {pr-number} --json files --jq '.files[].path')`
!`gh pr review {pr-number} --comment --body "🔍 Multi-agent code review initiated"`

### Post review findings
!`SECURITY_RESULTS=$(gh pr diff {pr-number} | npx claude-flow security-scan)`
!`if echo "$SECURITY_RESULTS" | grep -q "critical"; then gh pr review {pr-number} --request-changes --body "$SECURITY_RESULTS"; fi`

### Create inline comments
!`gh api repos/{owner}/{repo}/pulls/{pr-number}/comments --method POST -f path="file.js" -f line=42 -f body="Suggestion: Use const instead of var" -f commit_id=$(gh pr view {pr-number} --json headRefOid -q .headRefOid)`
