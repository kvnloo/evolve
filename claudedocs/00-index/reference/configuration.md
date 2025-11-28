# Configuration Reference

Complete reference for configuring the Claude Code Extended Framework.

## Table of Contents

- [CLAUDE.md Configuration](#claudemd-configuration)
- [.claude/ Directory Structure](#claude-directory-structure)
- [Slash Commands](#slash-commands)
- [Rules Configuration](#rules-configuration)
- [MCP Server Configuration](#mcp-server-configuration)
- [Environment Variables](#environment-variables)

## CLAUDE.md Configuration

The main configuration file loaded by Claude Code CLI.

### Structure

```markdown
# Claude Code Configuration - SPARC Development Environment

## 🚨 CRITICAL: CONCURRENT EXECUTION & FILE MANAGEMENT
[Critical rules and patterns]

## Project Overview
[Project description]

## SPARC Commands
[Command reference]

## Available Agents
[Agent listings]

## PM System Overview
[CCPM configuration]

## Rules
[@.claude/rules/*.md references]
```

### Key Sections

#### Concurrent Execution Rules

```markdown
**ABSOLUTE RULES**:
1. ALL operations MUST be concurrent/parallel in a single message
2. **NEVER save working files to root folder**
3. ALWAYS organize files in appropriate subdirectories
```

#### File Organization

```markdown
**NEVER save to root folder. Use these directories:**
- `/src` - Source code files
- `/tests` - Test files
- `/docs` - Documentation
- `/config` - Configuration
- `/scripts` - Utility scripts
```

#### Agent Coordination

```markdown
**Every Agent MUST:**
- Run hooks before/during/after work
- Update progress via memory
- Follow file-level parallelism
- Make atomic commits
```

## .claude/ Directory Structure

### commands/

Custom slash command definitions.

**Structure**:
```
.claude/commands/
├── sc/                    # SuperClaude namespace
│   ├── research.md
│   ├── implement.md
│   ├── test.md
│   └── analyze.md
└── pm/                    # PM system
    ├── prd-new.md
    ├── epic-oneshot.md
    └── issue-start.md
```

**Command File Format**:
```markdown
---
name: command-name
description: Brief description
category: category-name
---

# Command Implementation

Implementation details and logic...
```

### rules/

Operational rules and standards.

#### agent-coordination.md

Rules for parallel agent execution:

```markdown
# Agent Coordination

## Parallel Execution Principles
1. File-level parallelism
2. Explicit coordination
3. Fail fast
4. Human resolution

## Work Stream Assignment
Each agent gets assigned files/directories
```

#### path-standards.md

Path usage standards:

```markdown
# Path Standards

## Privacy Protection
- Prohibit absolute paths with usernames
- Use relative paths for project files
- Cross-project: `../project-name/file`
```

#### github-operations.md

GitHub CLI operation patterns:

```markdown
# GitHub Operations

## CRITICAL: Repository Protection
Check remote origin before ANY write operation
```

### helpers/

Reusable shell script utilities.

**Common Helpers**:
- `setup-mcp.sh`: MCP server setup
- `github-setup.sh`: GitHub configuration
- `checkpoint-manager.sh`: Session checkpointing
- `quick-start.sh`: Quick setup wizard

**Script Standards**:
```bash
#!/usr/bin/env bash
set -euo pipefail

# All helpers follow:
# - Strict mode
# - Error handling
# - Clear documentation
# - Reusable functions
```

### prds/

Product Requirement Documents.

**Format**:
```markdown
# PRD: Feature Name

## Overview
[Description]

## Requirements
[Detailed requirements]

## Success Criteria
[Measurable outcomes]
```

### epics/ (gitignored)

Epic management and decomposition.

**Structure**:
```
.claude/epics/
└── epic-{name}/
    ├── epic.md
    ├── {issue}-analysis.md
    └── updates/
        └── {issue}/
            ├── stream-A.md
            └── stream-B.md
```

### context/

Project context files for session persistence.

### statusline/

Status line configuration for CLI.

**Configuration**:
```
.claude/statusline/
├── config.json
└── scripts/
    ├── list-workspaces.sh
    └── switch-workspace.sh
```

## Slash Commands

### SuperClaude Commands (/sc:*)

#### /sc:research
Deep research with adaptive planning.

**Usage**:
```
/sc:research "[query]" [--depth quick|standard|deep|exhaustive]
```

**Configuration**: `.claude/commands/sc/research.md`

#### /sc:implement
Implementation with automatic agent selection.

**Usage**:
```
/sc:implement "[feature description]"
```

#### /sc:test
Testing with coverage analysis.

**Usage**:
```
/sc:test [--coverage] [--watch]
```

#### /sc:analyze
Code quality analysis.

**Usage**:
```
/sc:analyze [--focus performance|security|quality]
```

### PM Commands (/pm:*)

#### /pm:prd-new
Create new Product Requirement Document.

**Usage**:
```
/pm:prd-new "[feature name]"
```

**Output**: `.claude/prds/{name}.md`

#### /pm:epic-oneshot
Decompose PRD into epic and sync to GitHub.

**Usage**:
```
/pm:epic-oneshot
```

#### /pm:issue-start
Begin work on GitHub issue.

**Usage**:
```
/pm:issue-start <issue-number>
```

#### /pm:next
Get next priority task.

**Usage**:
```
/pm:next
```

## Rules Configuration

### Enabling/Disabling Rules

Rules are referenced in CLAUDE.md:

```markdown
## Rules
@.claude/rules/agent-coordination.md
@.claude/rules/path-standards.md
@.claude/rules/github-operations.md
```

### Creating Custom Rules

1. Create file in `.claude/rules/`:
```bash
touch .claude/rules/my-rule.md
```

2. Document the rule:
```markdown
# My Rule Title

Clear, actionable rules with examples.

## Section

✅ Correct examples
❌ Incorrect examples
```

3. Reference in CLAUDE.md:
```markdown
@.claude/rules/my-rule.md
```

## MCP Server Configuration

### Claude Flow (Required)

```bash
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

**Configuration Options**:
```json
{
  "mcpServers": {
    "claude-flow": {
      "command": "npx",
      "args": ["claude-flow@alpha", "mcp", "start"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Ruv-Swarm (Optional)

```bash
claude mcp add ruv-swarm npx ruv-swarm mcp start
```

**Features**:
- Enhanced swarm coordination
- Advanced topology management
- Performance benchmarking

### Flow-Nexus (Optional)

```bash
claude mcp add flow-nexus npx flow-nexus@latest mcp start
```

**Requires Registration**:
```bash
npx flow-nexus@latest register
npx flow-nexus@latest login
```

**Features**:
- Cloud-based execution
- Template marketplace
- Real-time collaboration
- 70+ specialized tools

### Verifying MCP Servers

```bash
# List installed servers
claude mcp list

# Check server status
claude mcp status claude-flow

# View logs
claude mcp logs claude-flow

# Restart server
claude mcp restart claude-flow
```

## Environment Variables

### Optional Configuration

```bash
# MCP Server Settings
export CLAUDE_FLOW_ENV=production
export RUV_SWARM_PORT=8080

# PM System
export CCPM_DEFAULT_BASE_BRANCH=main
export CCPM_ISSUE_LABELS=enhancement,feature

# GitHub Integration
export GH_TOKEN=your_github_token  # If not using gh auth

# Custom Settings
export SPARC_DEFAULT_MODE=tdd
export AGENT_CONCURRENCY=5
```

### Loading Environment

Create `.env` file (gitignored):
```bash
# .env
CLAUDE_FLOW_ENV=production
CCPM_DEFAULT_BASE_BRANCH=main
```

Load in session:
```bash
source .env
```

## GitHub Automation Configuration

### Dependabot

**File**: `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

### Workflows

**Shellcheck**: `.github/workflows/shellcheck.yml`
- Triggers: Push/PR to `.sh` files
- Validates: Script syntax and best practices

**Health Check**: `.github/workflows/health-check.yml`
- Triggers: Weekly + file changes
- Validates: Community health files

**Auto Label**: `.github/workflows/auto-label.yml`
- Triggers: Issue/PR creation
- Labels: By title, content, files

**Stale**: `.github/workflows/stale.yml`
- Triggers: Daily cron
- Manages: Stale issues/PRs

### CODEOWNERS

**File**: `.github/CODEOWNERS`

```
# Default owners
*       @kvnloo

# Documentation
*.md    @kvnloo
/docs/  @kvnloo

# Scripts (security-sensitive)
*.sh    @kvnloo @security-team
```

## Customization Examples

### Adding a New Command Category

1. Create directory:
```bash
mkdir .claude/commands/myapp
```

2. Add command:
```bash
cat > .claude/commands/myapp/deploy.md <<EOF
---
name: deploy
description: Deploy application
category: myapp
---

# Deploy Command
Implementation...
EOF
```

3. Use command:
```
/myapp:deploy
```

### Custom Agent Configuration

Define in CLAUDE.md:

```markdown
## Custom Agents

### my-agent
- Type: specialized
- Purpose: Custom task automation
- Configuration: .claude/agents/my-agent.yml
```

### Workflow Customization

Copy and modify existing workflow:

```bash
cp .github/workflows/shellcheck.yml .github/workflows/my-check.yml
# Edit my-check.yml
```

## Configuration Validation

### Check Configuration

```bash
# Validate YAML syntax
yamllint .github/workflows/*.yml

# Check bash scripts
shellcheck scripts/*.sh .claude/helpers/*.sh

# Verify markdown
markdownlint docs/*.md
```

### Test Configuration

```bash
# Test MCP servers
claude mcp status

# Test commands (if available)
/sc:help

# Test scripts
./scripts/checkpoint.sh --dry-run
```

## Troubleshooting Configuration

### Common Issues

**MCP server not found**:
```bash
claude mcp list  # Check if registered
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

**Command not recognized**:
- Check `.claude/commands/` structure
- Verify CLAUDE.md loads properly
- Ensure file format is correct

**Rules not applying**:
- Check `@.claude/rules/*.md` references in CLAUDE.md
- Verify markdown syntax
- Reload Claude Code CLI

---

For more information:
- [Getting Started](getting-started.md)
- [Architecture Overview](architecture.md)
- [Script Reference](script-reference.md)
