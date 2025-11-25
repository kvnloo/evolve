---
description: Convert PRD to technical implementation epic
agent: pm-agent
---

# PRD Parse

Convert PRD to technical implementation epic.

## Usage
```
/pm:prd-parse <feature_name>
```

## Preflight Checklist

### Validation Steps
1. **Verify <feature_name> was provided:**
   - If not: "❌ <feature_name> required. Run: /pm:prd-parse <feature_name>"

2. **Verify PRD exists:**
   @.claude/prds/$ARGUMENTS.md
   - If not found: "❌ PRD not found. Create with: /pm:prd-new $ARGUMENTS"

3. **Validate PRD frontmatter:**
   - Verify has: name, description, status, created
   - If invalid: "❌ Invalid PRD frontmatter. Check: .claude/prds/$ARGUMENTS.md"

4. **Check for existing epic:**
   @.claude/epics/$ARGUMENTS/epic.md
   - If exists, ask: "⚠️ Epic '$ARGUMENTS' already exists. Overwrite? (yes/no)"
   - Only proceed with explicit 'yes'
   - If no: "View existing: /pm:epic-show $ARGUMENTS"

5. **Verify directory permissions:**
   !`mkdir -p .claude/epics/$ARGUMENTS`

## Instructions

You are a technical lead converting a PRD into an implementation epic for: **$ARGUMENTS**

### 1. Read the PRD
@.claude/prds/$ARGUMENTS.md
- Analyze all requirements and constraints
- Understand user stories and success criteria
- Extract PRD description from frontmatter

### 2. Technical Analysis
- Identify architectural decisions needed
- Determine technology stack and approaches
- Map functional requirements to technical components
- Identify integration points and dependencies

### 3. File Format with Frontmatter
Create epic at: `.claude/epics/$ARGUMENTS/epic.md`:

```markdown
---
name: $ARGUMENTS
status: backlog
created: !`date -u +"%Y-%m-%dT%H:%M:%SZ"`
progress: 0%
prd: .claude/prds/$ARGUMENTS.md
github: [Will be updated when synced to GitHub]
---

# Epic: $ARGUMENTS

## Overview
Brief technical summary of implementation approach

## Architecture Decisions
- Key technical decisions and rationale
- Technology choices
- Design patterns to use

## Technical Approach
### Frontend Components
- UI components needed
- State management approach
- User interaction patterns

### Backend Services
- API endpoints required
- Data models and schema
- Business logic components

### Infrastructure
- Deployment considerations
- Scaling requirements
- Monitoring and observability

## Implementation Strategy
- Development phases
- Risk mitigation
- Testing approach

## Task Breakdown Preview
High-level task categories:
- [ ] Category 1: Description
- [ ] Category 2: Description
- [ ] etc.

## Dependencies
- External service dependencies
- Internal team dependencies
- Prerequisite work

## Success Criteria (Technical)
- Performance benchmarks
- Quality gates
- Acceptance criteria

## Estimated Effort
- Overall timeline estimate
- Resource requirements
- Critical path items
```

### 4. Frontmatter Guidelines
- **name**: Exact feature name (same as $ARGUMENTS)
- **status**: "backlog" for new epics
- **created**: !`date -u +"%Y-%m-%dT%H:%M:%SZ"`
- **progress**: "0%" for new epics
- **prd**: Reference source PRD file path
- **github**: Placeholder - updated during sync

### 5. Quality Validation

Before saving:
- [ ] All PRD requirements addressed
- [ ] Task breakdown covers all areas
- [ ] Dependencies technically accurate
- [ ] Effort estimates realistic
- [ ] Architecture decisions justified

### 6. Post-Creation

After creating:
1. Confirm: "✅ Epic created: .claude/epics/$ARGUMENTS/epic.md"
2. Show summary:
   - Number of task categories
   - Key architecture decisions
   - Estimated effort
3. Suggest: "Break down into tasks? Run: /pm:epic-decompose $ARGUMENTS"

## Error Recovery

If any step fails:
- Explain what went wrong
- If PRD incomplete, list missing sections
- If approach unclear, identify needed clarification
- Never create incomplete epic

## IMPORTANT:
- Aim for ≤10 tasks total
- Simplify and improve the epic
- Leverage existing functionality when possible
