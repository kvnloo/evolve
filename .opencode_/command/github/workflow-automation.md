---
description: GitHub Actions integration with swarm coordination
agent: github-agent
---

# workflow-automation

Intelligent CI/CD pipeline integration with GitHub Actions.

## Quick Usage

### List workflows
!`gh workflow list --repo {owner/repo}`

### View workflow runs
!`gh run list --repo {owner/repo} --limit 20`

### View run details
!`gh run view {run-id} --repo {owner/repo} --json jobs,conclusion`

### Trigger workflow
!`gh workflow run {workflow-name} --repo {owner/repo} --ref {branch}`

## Advanced Examples

### Monitor workflow status
!`gh run watch {run-id} --repo {owner/repo}`

### Download workflow artifacts
!`gh run download {run-id} --repo {owner/repo} --dir ./artifacts`

### View workflow logs
!`gh run view {run-id} --repo {owner/repo} --log`

### Cancel running workflow
!`gh run cancel {run-id} --repo {owner/repo}`

## Failure Analysis
!`gh run view {run-id} --json jobs,conclusion | jq '.jobs[] | select(.conclusion == "failure")'`
!`gh run view {run-id} --log --job {job-id} | grep ERROR`

## Integration Examples

### Create issue for failed run
!`gh issue create --title "CI Failure: Run {run-id}" --body "Workflow failed" --label "ci-failure"`

### Retry failed workflow
!`gh run rerun {run-id} --repo {owner/repo}`
