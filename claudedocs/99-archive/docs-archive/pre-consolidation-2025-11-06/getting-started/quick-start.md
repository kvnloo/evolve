# Getting Started with Claude Code Extended Framework

This guide will help you get up and running with the Claude Code Extended Framework quickly.

## Prerequisites

Before you begin, ensure you have:

- **Claude Code CLI** installed ([Installation Guide](https://docs.claude.com/claude-code))
- **Git** (version 2.0 or higher)
- **Bash shell** (Linux, macOS, or WSL on Windows)
- **GitHub account** (for issue tracking and collaboration)

## Quick Installation

### 1. Clone the Repository

```bash
# Clone to your local machine
git clone https://github.com/kvnloo/evolve.git
cd evolve

# Or if you're contributing, fork first
gh repo fork kvnloo/evolve --clone
cd evolve
```

### 2. Explore the Configuration

```bash
# Review the main configuration file
cat CLAUDE.md

# Check the .claude directory structure
ls -la .claude/

# View available slash commands
ls .claude/commands/
```

### 3. Set Up MCP Servers (Recommended)

MCP (Model Context Protocol) servers extend Claude Code's capabilities:

```bash
# Required: Claude Flow for SPARC and agent coordination
claude mcp add claude-flow npx claude-flow@alpha mcp start

# Optional: Enhanced coordination features
claude mcp add ruv-swarm npx ruv-swarm mcp start

# Optional: Cloud-based advanced features (requires registration)
claude mcp add flow-nexus npx flow-nexus@latest mcp start
```

**Verify MCP servers:**
```bash
claude mcp list
```

### 4. Test Your Setup

```bash
# Check available SPARC modes
npx claude-flow sparc modes

# Test a simple slash command (if available)
# /sc:help

# Verify shell scripts work
./scripts/checkpoint.sh --help
```

## Your First Workflow

### Example 1: Using SPARC Methodology

```bash
# Run a complete TDD workflow
npx claude-flow sparc tdd "simple calculator function"

# This will:
# 1. Specification: Define requirements
# 2. Pseudocode: Design algorithm
# 3. Architecture: Plan structure
# 4. Refinement: Write tests, then code
# 5. Completion: Validate integration
```

### Example 2: Using Custom Commands

Custom slash commands are defined in `.claude/commands/`:

```bash
# Research with deep analysis
/sc:research "best practices for REST APIs"

# Implement with automatic agent selection
/sc:implement "user authentication middleware"

# Test with coverage reporting
/sc:test --coverage

# Analyze code quality
/sc:analyze
```

### Example 3: Using PM System (CCPM)

The Project Management system helps organize work:

```bash
# Create a new Product Requirement Document
/pm:prd-new "User management system"

# Decompose epic into issues and sync with GitHub
/pm:epic-oneshot

# Start working on a specific issue
/pm:issue-start 123

# Get your next priority task
/pm:next
```

## Understanding the Structure

### Directory Layout

```
.
├── .claude/                 # Configuration directory
│   ├── commands/            # Custom slash commands
│   │   └── sc/              # SuperClaude commands
│   ├── prds/                # Product requirement documents
│   ├── epics/               # Epic management (gitignored)
│   ├── context/             # Project context files
│   ├── rules/               # Coordination rules
│   │   ├── agent-coordination.md
│   │   ├── path-standards.md
│   │   └── github-operations.md
│   ├── helpers/             # Shell script utilities
│   └── statusline/          # Status line configuration
├── .github/                 # GitHub automation
│   ├── workflows/           # CI/CD workflows
│   └── ISSUE_TEMPLATE/      # Issue templates
├── docs/                    # Documentation
├── scripts/                 # Utility scripts
└── CLAUDE.md                # Main configuration
```

### Key Configuration Files

- **CLAUDE.md**: Main configuration loaded by Claude Code
- **.claude/commands/**: Define custom slash commands
- **.claude/rules/**: Operational rules and standards
- **.claude/helpers/**: Reusable shell scripts

## Core Concepts

### 1. SPARC Methodology

SPARC is a systematic development approach:

- **S**pecification: Define what you're building
- **P**seudocode: Design the logic before coding
- **A**rchitecture: Plan the system structure
- **R**efinement: Test-Driven Development
- **C**ompletion: Integration and validation

### 2. Multi-Agent Coordination

The framework supports 54+ specialized agents:

- **Core**: coder, reviewer, tester, planner, researcher
- **Swarm**: hierarchical-coordinator, mesh-coordinator
- **Specialized**: backend-dev, frontend-architect, security-engineer
- **GitHub**: pr-manager, code-review-swarm, issue-tracker

### 3. Concurrent Execution

**Golden Rule**: "1 MESSAGE = ALL RELATED OPERATIONS"

```bash
# ✅ Good: All operations in one batch
TodoWrite { todos: [todo1, todo2, todo3, ...] }
Read file1.js file2.js file3.js
Edit file1.js file2.js

# ❌ Bad: Sequential operations
TodoWrite { todos: [todo1] }
Read file1.js
Edit file1.js
```

### 4. File Organization

**Critical Rule**: Never save working files to root folder

```bash
# ✅ Correct
docs/analysis.md
scripts/deploy.sh
.claude/commands/my-command.md

# ❌ Wrong
analysis.md  # Don't put working files in root
deploy.sh    # Use scripts/
```

## Common Workflows

### Creating a New Feature

```bash
# 1. Create feature branch
git checkout -b feature/user-authentication

# 2. Create PRD (if major feature)
/pm:prd-new "User Authentication System"

# 3. Use SPARC workflow
npx claude-flow sparc tdd "JWT authentication"

# 4. Run tests and linting
npm test
shellcheck scripts/*.sh

# 5. Commit and create PR
git add .
git commit -m "feat(auth): add JWT authentication"
git push origin feature/user-authentication
gh pr create
```

### Using Git Worktrees for Parallel Work

```bash
# Create worktree for epic
git worktree add ../epic-auth epic/auth-system

# Work in parallel in different worktrees
cd ../epic-auth
# Agent 1 works here

# Meanwhile in main worktree
cd ../main-repo
# Agent 2 works here

# See .claude/rules/agent-coordination.md for details
```

### Running Shell Scripts

```bash
# All scripts follow safe patterns
./scripts/checkpoint.sh         # Create checkpoint
./scripts/migrate-agents.sh     # Migrate agent definitions

# Helpers are in .claude/helpers/
./.claude/helpers/setup-mcp.sh
./.claude/helpers/quick-start.sh
```

## Troubleshooting

### MCP Servers Not Working

```bash
# Check if servers are running
claude mcp list

# Restart servers
claude mcp restart claude-flow

# Check logs
claude mcp logs claude-flow
```

### Commands Not Found

```bash
# Ensure you're in the project directory
pwd

# Check CLAUDE.md is present
ls CLAUDE.md

# Verify .claude/commands/ exists
ls .claude/commands/
```

### Shell Script Errors

```bash
# Check script syntax
bash -n script.sh

# Run with debug mode
bash -x script.sh

# Verify script is executable
chmod +x script.sh
```

## Next Steps

1. **Read the Documentation**:
   - [Architecture Overview](architecture.md)
   - [Configuration Reference](configuration-reference.md)
   - [Troubleshooting Guide](troubleshooting.md)

2. **Explore Examples**:
   - Check `examples/` directory (if available)
   - Review existing slash commands in `.claude/commands/`

3. **Contribute**:
   - Read [CONTRIBUTING.md](../CONTRIBUTING.md)
   - Join [GitHub Discussions](https://github.com/kvnloo/evolve/discussions)
   - Report issues or request features

4. **Advanced Topics**:
   - Multi-agent swarm coordination
   - Custom slash command development
   - GitHub workflow automation
   - Neural pattern training

## Getting Help

- **Documentation**: Check `docs/` directory
- **Issues**: [GitHub Issues](https://github.com/kvnloo/evolve/issues)
- **Discussions**: [GitHub Discussions](https://github.com/kvnloo/evolve/discussions)
- **Security**: See [SECURITY.md](../SECURITY.md)

## Quick Reference Card

```bash
# SPARC Commands
npx claude-flow sparc modes              # List modes
npx claude-flow sparc tdd "feature"      # TDD workflow
npx claude-flow sparc run spec "task"    # Run specific mode

# PM Commands
/pm:prd-new "Feature name"               # New PRD
/pm:epic-oneshot                         # Decompose & sync
/pm:issue-start <number>                 # Start work
/pm:next                                 # Next task

# SuperClaude Commands
/sc:research "query"                     # Deep research
/sc:implement "feature"                  # Implementation
/sc:test                                 # Testing
/sc:analyze                              # Code analysis

# Git Workflows
git checkout -b feature/name             # New branch
git commit -m "type(scope): message"     # Commit
gh pr create                             # Create PR
```

Welcome to the Claude Code Extended Framework! 🚀
