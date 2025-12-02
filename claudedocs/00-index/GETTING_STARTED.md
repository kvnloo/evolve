# Quick Start Guide

Get up and running with the Claude Code Extended Framework in under 30 minutes.

## What is This Project?

The Claude Code Extended Framework is a comprehensive development environment that extends Claude Code CLI with:

**SuperClaude Framework** - A sophisticated orchestration system providing 26 specialized slash commands, 54+ specialized agents, and intelligent tool selection for automated workflows.

**SPARC Methodology** - A systematic development approach (Specification → Pseudocode → Architecture → Refinement → Completion) that emphasizes test-driven development and incremental implementation.

**Multi-Agent Coordination** - Parallel agent execution using Git worktrees and mesh topology coordination, enabling 2-3x productivity improvements through concurrent work streams.

**Constitutional AI Safety** - Built-in safety systems including encryption, monitoring, circuit breakers, and audit logging to ensure secure autonomous operations.

This framework is designed for teams who want to leverage AI-powered development while maintaining strict quality, security, and productivity standards.

## Quick Start (5 Minutes)

### 1. Verify Prerequisites

```bash
# Check Node.js (18+ required)
node --version

# Check Git
git --version

# Check GitHub CLI authentication
gh auth status

# Check Claude Code access
claude --version
```

### 2. Clone and Configure

```bash
# Clone repository
git clone https://github.com/kvnloo/evolve.git
cd evolve

# Review main configuration
cat CLAUDE.md

# Check framework structure
ls -la .claude/
```

### 3. Install Core MCP Server

The Claude Flow MCP server is required for SPARC and agent coordination:

```bash
# Add Claude Flow MCP server
claude mcp add claude-flow npx claude-flow@alpha mcp start

# Verify installation
claude mcp list

# Test connection
npx claude-flow sparc modes
```

**Expected output**: List of SPARC modes (spec-pseudocode, architect, etc.)

### 4. Test Your First Workflow

```bash
# Run a simple SPARC workflow
npx claude-flow sparc tdd "calculate fibonacci numbers"

# This demonstrates the complete cycle:
# 1. Specification - Define requirements
# 2. Pseudocode - Design algorithm
# 3. Architecture - Plan structure
# 4. Refinement - Write tests, then implementation
# 5. Completion - Validate integration
```

**Success**: You should see test cases created first, followed by implementation code.

## Key Concepts

### SPARC Methodology

A systematic approach to development that prevents over-engineering:

- **S**pecification: What you're building (requirements)
- **P**seudocode: How it works (logic design)
- **A**rchitecture: Where it fits (system structure)
- **R**efinement: Test-Driven Development (tests → code)
- **C**ompletion: Integration and validation

### Multi-Agent Coordination

Parallel execution without conflicts using three key strategies:

- **Git Worktrees**: Independent working directories for parallel agents
- **Mesh Topology**: Peer-to-peer agent communication via memory
- **File-Level Parallelism**: Each agent assigned non-overlapping file patterns

**Example**: 4 agents building a REST API simultaneously:
- Agent 1: Express routes (`src/api/*.ts`)
- Agent 2: Database schema (`database/*.sql`)
- Agent 3: Test suite (`tests/*.test.ts`)
- Agent 4: Documentation (`docs/api/*.md`)

### Concurrent Execution Pattern

**Golden Rule**: "1 MESSAGE = ALL RELATED OPERATIONS"

```bash
# ✅ Correct: Batch all operations
TodoWrite { todos: [todo1, todo2, todo3, ...] }
Read file1.js file2.js file3.js
Edit file1.js file2.js

# ❌ Wrong: Sequential operations
TodoWrite { todos: [todo1] }
Read file1.js
Edit file1.js
```

### File Organization

**Critical Rule**: Never save working files to root folder

```bash
# ✅ Correct locations
docs/analysis.md          # Documentation
scripts/deploy.sh         # Utility scripts
.claude/commands/my-cmd.md  # Custom commands
tests/feature.test.js     # Test files

# ❌ Wrong locations
analysis.md               # Don't put working files in root
deploy.sh                 # Use scripts/
test.js                   # Use tests/
```

### Project Management (CCPM)

Built-in workflow for spec-driven development:

- PRDs stored in `.claude/prds/`
- Epics decomposed into GitHub Issues
- Git worktrees for parallel epic work
- Bidirectional sync with GitHub

**Commands**:
- `/pm:prd-new` - Create product requirement
- `/pm:epic-oneshot` - Decompose and sync to GitHub
- `/pm:issue-start` - Begin work with specialized agent
- `/pm:next` - Get next priority task

### Safety Systems

Constitutional AI principles enforced through:

- **Pre-commit hooks**: Scan for secrets, SQL injection, XSS
- **Circuit breakers**: Prevent cost overruns and runaway operations
- **Audit logging**: Tamper-proof record of autonomous actions
- **Package verification**: Prevent slopsquatting attacks

## Common Workflows

### Creating a New Feature

```bash
# 1. Create feature branch
git checkout -b feature/user-authentication

# 2. Use SPARC for implementation
npx claude-flow sparc tdd "JWT authentication middleware"

# 3. Verify tests pass
npm test

# 4. Check code quality
npm run lint

# 5. Commit and create PR
git add .
git commit -m "feat(auth): add JWT authentication"
git push origin feature/user-authentication
gh pr create
```

### Using Custom Commands

SuperClaude commands are defined in `.claude/commands/sc/`:

```bash
# Deep research with web search
/sc:research "best practices for REST API design"

# Implementation with automatic agent selection
/sc:implement "user authentication middleware"

# Comprehensive testing with coverage
/sc:test --coverage

# Code quality analysis
/sc:analyze

# Architecture design
/sc:design "microservices architecture for e-commerce"
```

### Multi-Agent Parallel Work

```bash
# Create worktree for epic
git worktree add ../epic-auth epic/auth-system

# Work in parallel
# - Main repo: Agent 1 works on frontend
# - Epic worktree: Agent 2 works on backend

# Coordination happens automatically via memory
# Each agent commits independently
# No conflicts because different file paths
```

### Research Daemon (Overnight Planning)

```bash
# 1. Set API key
export ANTHROPIC_API_KEY="your-key"

# 2. Create research queue
cat > memory/research-queue.json << 'EOF'
{
  "queries": [
    {
      "id": "architecture-001",
      "text": "Research microservices patterns for e-commerce",
      "priority": "high"
    }
  ]
}
EOF

# 3. Start daemon
node .claude-flow/daemons/research-daemon.js start

# 4. Check in the morning
node .claude-flow/daemons/research-daemon.js status
cat .swarm/research/results/*.json | jq -r .response
```

## Next Steps

### 1. Understand the Architecture
Read the comprehensive architecture documentation to understand the 4-layer system:
- **Layer 1**: Foundation (SuperClaude, Claude Code SDK, MCP)
- **Layer 2**: Knowledge (RAG, DSPy optimization, skills database)
- **Layer 3**: Specialized (3D generation, Constitutional AI, LLM-as-Judge)
- **Layer 4**: Autonomous (CrewAI, meta-rewarding, production monitoring)

📖 **Read**: [docs/architecture.md](architecture.md)

### 2. Install Additional MCP Servers (Optional)

```bash
# Sequential Thinking - Deep analysis and multi-step reasoning
claude mcp add sequential-thinking npx @sequentialthinking/mcp

# Serena - Session memory and symbol navigation
claude mcp add serena npx serena-mcp

# Context7 - Documentation lookup for frameworks
claude mcp add context7 npx @context7/mcp

# Playwright - Browser testing and E2E validation
claude mcp add playwright npx @playwright/mcp

# Verify all servers
claude mcp list
```

### 3. Configure Safety Systems

```bash
# Enable encryption and monitoring
# Edit .hive-mind/config.json:
{
  "memory": {
    "encryptionEnabled": true
  },
  "monitoring": {
    "enabled": true,
    "alerting": {
      "enabled": true,
      "severity": "warning"
    }
  }
}

# Install pre-commit hooks
pip install pre-commit
pre-commit install

# Test safety verification
npm run verify-safety
```

### 4. Explore Example Workflows

```bash
# Test multi-agent coordination (4 parallel agents)
# In Claude Code:
# "Create REST API for user management with 4 parallel agents"
# - Agent 1: Express routes
# - Agent 2: Database schema
# - Agent 3: Test suite
# - Agent 4: API documentation

# Measure productivity improvement
# Before: Single-agent sequential work
# After: Multi-agent parallel execution
# Expected: 2-3x faster completion
```

### 5. Review Best Practices

Key principles to follow:

**Concurrent Execution**: Always batch operations in single messages

**File Organization**: Keep root clean, use proper directories

**Safety First**: Never bypass pre-commit hooks or security checks

**Test-Driven**: Write tests before implementation (SPARC Refinement phase)

**Git Workflow**: Use feature branches and worktrees for parallel work

**Documentation**: Update docs alongside code changes

## Troubleshooting

### MCP Servers Not Working

```bash
# Check server status
claude mcp list

# Restart specific server
claude mcp restart claude-flow

# View logs for errors
claude mcp logs claude-flow

# Test connection
npx claude-flow sparc modes
```

### Commands Not Found

```bash
# Verify you're in project directory
pwd

# Check CLAUDE.md exists
ls CLAUDE.md

# Verify .claude/commands/ exists
ls .claude/commands/sc/

# Restart Claude Code to reload configuration
```

### Safety Verification Fails

```bash
# Check configuration file
cat .hive-mind/config.json | jq .

# Restore from backup if corrupted
cp .hive-mind/config.json.backup .hive-mind/config.json

# Run verification script
./scripts/verify-safety.sh
```

### Git Worktree Conflicts

```bash
# List all worktrees
git worktree list

# Remove problematic worktree
git worktree remove ../epic-name --force

# Recreate worktree
git worktree add ../epic-name -b epic/name
```

### Pre-Commit Hooks Blocking

```bash
# View what failed
pre-commit run --all-files

# Fix violations (recommended)
# Address each issue reported

# Only as last resort (not recommended)
git commit --no-verify
```

## Getting Help

- **Documentation**: Comprehensive guides in `docs/` directory
- **Architecture**: [docs/architecture.md](architecture.md) for system design
- **Configuration**: [docs/configuration-reference.md](configuration-reference.md) for detailed settings
- **Troubleshooting**: [docs/troubleshooting.md](troubleshooting.md) for common issues

## Quick Reference

```bash
# SPARC Commands
npx claude-flow sparc modes                    # List available modes
npx claude-flow sparc tdd "feature"            # Complete TDD workflow
npx claude-flow sparc run architect "task"     # Run specific mode

# Project Management
/pm:prd-new "Feature name"                     # Create PRD
/pm:epic-oneshot                               # Decompose and sync
/pm:issue-start 123                            # Start work on issue
/pm:next                                       # Get next task

# SuperClaude Commands
/sc:research "query"                           # Deep research mode
/sc:implement "feature"                        # Implementation
/sc:test                                       # Run tests
/sc:analyze                                    # Code analysis
/sc:design "system"                            # Architecture design

# MCP Operations
claude mcp list                                # List servers
claude mcp add <name> <command>                # Add server
claude mcp test <name>                         # Test connection
claude mcp logs <name>                         # View logs

# Research Daemon
node .claude-flow/daemons/research-daemon.js start    # Start
node .claude-flow/daemons/research-daemon.js status   # Check
node .claude-flow/daemons/research-daemon.js logs 50  # View logs
node .claude-flow/daemons/research-daemon.js stop     # Stop

# Git Workflows
git checkout -b feature/name                   # New branch
git worktree add ../epic-name -b epic/name     # New worktree
git commit -m "type(scope): message"           # Conventional commit
gh pr create                                   # Create pull request
```

---

**Welcome to the Claude Code Extended Framework!** 🚀

This guide covered the essentials to get started. For detailed implementation guides, architecture deep-dives, and advanced workflows, explore the comprehensive documentation in the `docs/` directory.
