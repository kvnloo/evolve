---
description: Begin work on GitHub issue with parallel agent streams
agent: pm-agent
---

# Issue Start

Begin work on a GitHub issue with parallel agents based on work stream analysis.

## Usage
```
/pm:issue-start <issue_number>
```

## Quick Check

1. **Get issue details:**
   !`gh issue view $ARGUMENTS --json state,title,labels,body`
   - If fails: "❌ Cannot access issue. Check number or: gh auth login"

2. **Find local task file:**
   @.claude/epics/*/$ARGUMENTS.md
   - First check new naming (issue number)
   - If not found, search for github: field matching issue
   - If not found: "❌ No local task for issue. May be external."

3. **Check for analysis:**
   @.claude/epics/*/$ARGUMENTS-analysis.md
   - If not found: "❌ No analysis. Run: /pm:issue-analyze $ARGUMENTS"
   - Or: "Run with --analyze flag to do both"

## Instructions

### 1. Ensure Worktree Exists

Check epic worktree:
!`git worktree list | grep epic-{epic_name}`

If not found:
- "❌ No worktree. Run: /pm:epic-start {epic_name}"
- Stop execution

### 2. Read Analysis

@.claude/epics/{epic_name}/$ARGUMENTS-analysis.md
- Parse parallel streams
- Identify immediately startable streams
- Note dependencies between streams

### 3. Setup Progress Tracking

Get current datetime: !`date -u +"%Y-%m-%dT%H:%M:%SZ"`

Create workspace:
!`mkdir -p .claude/epics/{epic_name}/updates/$ARGUMENTS`

Update task frontmatter `updated` field with current datetime.

### 4. Launch Parallel Agents

For each stream ready to start:

Create stream progress file:
`.claude/epics/{epic_name}/updates/$ARGUMENTS/stream-{X}.md`

```markdown
---
issue: $ARGUMENTS
stream: {stream_name}
agent: {agent_type}
started: {current_datetime}
status: in_progress
---

# Stream {X}: {stream_name}

## Scope
{stream_description}

## Files
{file_patterns}

## Progress
- Starting implementation
```

Launch agent using Task tool:
```yaml
Task:
  description: "Issue #$ARGUMENTS Stream {X}"
  subagent_type: "{agent_type}"
  prompt: |
    Working on Issue #$ARGUMENTS in epic worktree.

    Worktree: ../epic-{epic_name}/
    Stream: {stream_name}

    Scope:
    - Files: {file_patterns}
    - Work: {stream_description}

    Requirements:
    1. Read task from: .claude/epics/{epic_name}/{task_file}
    2. Work ONLY in assigned files
    3. Commit format: "Issue #$ARGUMENTS: {specific change}"
    4. Update progress: .claude/epics/{epic_name}/updates/$ARGUMENTS/stream-{X}.md
    5. Follow: /rules/agent-coordination.md

    If need files outside scope:
    - Check other stream ownership
    - Wait if necessary
    - Update progress with coordination notes

    Complete stream work and mark completed.
```

### 5. GitHub Assignment

!`gh issue edit $ARGUMENTS --add-assignee @me --add-label "in-progress"`

### 6. Output

```
✅ Started parallel work on issue #$ARGUMENTS

Epic: {epic_name}
Worktree: ../epic-{epic_name}/

Launching {count} parallel agents:
  Stream A: {name} (Agent-1) ✓ Started
  Stream B: {name} (Agent-2) ✓ Started
  Stream C: {name} - Waiting (depends on A)

Progress tracking:
  .claude/epics/{epic_name}/updates/$ARGUMENTS/

Monitor: /pm:epic-status {epic_name}
Sync updates: /pm:issue-sync $ARGUMENTS
```

## Error Handling

If any step fails:
- "❌ {What failed}: {How to fix}"
- Continue with what's possible
- Never leave partial state
