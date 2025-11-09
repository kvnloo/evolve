# Installation Guide

Complete setup guide for the Claude Code Extended Framework. Get started in under 10 minutes.

---

## Prerequisites

Before installing, ensure you have:

### Required Software
- **Claude Code CLI** ([Installation Guide](https://docs.claude.com/claude-code))
- **Git** (version 2.0+)
- **Node.js** (version 18+)
- **Bash shell** (Linux, macOS, or WSL on Windows)

### Optional Requirements
- **GitHub account** (for project management features)
- **GitHub CLI** (`gh`) (for CCPM integration)
- **Python 3.8+** (for advanced features)

### Verify Prerequisites
```bash
# Check installations
claude --version
git --version
node --version
npm --version
bash --version

# Optional: Check GitHub CLI
gh --version
gh auth status
```

---

## Framework Components

This framework integrates three powerful systems:

### 1. Claude Flow (Core)
**Purpose**: Multi-agent orchestration and SPARC methodology
**Source**: https://github.com/ruvnet/claude-flow
**Required**: Yes

### 2. CCPM (Project Management)
**Purpose**: Spec-driven development with GitHub integration
**Source**: https://github.com/automazeio/ccpm
**Required**: Optional (recommended for teams)

### 3. SuperClaude (Optimization)
**Purpose**: Token optimization and enhanced capabilities
**Source**: SuperClaude framework
**Required**: Optional (advanced users)

---

## Quick Installation (10 Minutes)

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/kvnloo/evolve.git
cd evolve

# Or fork and clone
gh repo fork kvnloo/evolve --clone
cd evolve
```

### Step 2: Install Claude Flow (Required)

Claude Flow provides multi-agent coordination and SPARC methodology:

```bash
# Add Claude Flow MCP server
claude mcp add claude-flow npx claude-flow@alpha mcp start

# Verify installation
claude mcp list
npx claude-flow sparc modes
```

**Expected output**:
```
✅ claude-flow: Connected
Available SPARC modes:
  - spec-pseudocode
  - architect
  - tdd
  - integration
```

### Step 3: Explore Configuration

```bash
# Review main configuration
cat CLAUDE.md

# Check directory structure
ls -la .claude/

# View available commands
ls .claude/commands/
```

### Step 4: Test Your Setup

```bash
# Test SPARC workflow
npx claude-flow sparc modes

# Test a simple command (in Claude Code)
# /sc:help

# Verify file organization
tree .claude/ -L 2
```

**You're ready!** The core system is operational.

---

## Optional: CCPM Installation

CCPM adds project management capabilities with GitHub integration.

### Prerequisites
- GitHub CLI authenticated (`gh auth status`)
- Write access to your GitHub repository

### Install CCPM

```bash
# Clone CCPM installer
git clone https://github.com/automazeio/ccpm /tmp/ccpm-install

# Run installer
cd /tmp/ccpm-install
./install.sh /path/to/your/repo

# Verify installation
ls /path/to/your/repo/.claude/commands/pm/
```

### Configure GitHub Integration

```bash
# Install gh-sub-issue extension
gh extension install yahsan2/gh-sub-issue

# Verify repository connection
gh repo view kvnloo/evolve

# Test CCPM commands (in Claude Code)
# /pm:help
```

**CCPM Commands Available**:
- `/pm:prd-new` - Create product requirement document
- `/pm:epic-oneshot` - Decompose epic and sync to GitHub
- `/pm:issue-start` - Begin work with specialized agent
- `/pm:next` - Get next priority task

See [CCPM Installation Summary](CCPM-INSTALLATION.md) for complete details.

---

## Optional: Additional MCP Servers

Extend capabilities with specialized MCP servers:

### Enhanced Coordination
```bash
# Ruv-Swarm for advanced coordination patterns
claude mcp add ruv-swarm npx ruv-swarm mcp start
```

### Cloud Features
```bash
# Flow-Nexus for cloud-based orchestration (requires registration)
claude mcp add flow-nexus npx flow-nexus@latest mcp start

# Register account
npx flow-nexus@latest register
npx flow-nexus@latest login
```

### Research & Analysis
```bash
# Sequential Thinking for deep analysis
claude mcp add sequential-thinking npx @sequentialthinking/mcp

# Serena for memory management
claude mcp add serena npx serena-mcp

# Context7 for documentation lookup
claude mcp add context7 npx @context7/mcp
```

### Testing & Browser Automation
```bash
# Playwright for browser testing
claude mcp add playwright npx @playwright/mcp
```

### Verify All MCP Servers
```bash
# List all installed servers
claude mcp list

# Test specific server
claude mcp test claude-flow
```

---

## Optional: SuperClaude Framework

SuperClaude provides token optimization and enhanced command system.

### Install via pipx
```bash
# Install SuperClaude
pipx install SuperClaude

# Initialize in your project
SuperClaude install

# Verify installation
SuperClaude --version
SuperClaude list-commands
```

**Expected output**:
- 26 slash commands available
- 16 specialized agents configured
- Token optimization enabled

### Measure Token Baseline
```bash
# Create baseline measurement script
cat > scripts/measure-tokens.py << 'EOF'
import anthropic
import json

def measure_baseline():
    """Measure token usage before optimization"""
    client = anthropic.Anthropic()

    test_prompts = [
        "Analyze this codebase structure",
        "Design a REST API for user management",
        "Write unit tests for authentication",
        "Create documentation for deployment"
    ]

    results = []
    for prompt in test_prompts:
        message = client.messages.create(
            model="claude-sonnet-4",
            max_tokens=4096,
            messages=[{"role": "user", "content": prompt}]
        )

        results.append({
            "prompt": prompt,
            "input_tokens": message.usage.input_tokens,
            "output_tokens": message.usage.output_tokens,
            "total_tokens": message.usage.input_tokens + message.usage.output_tokens
        })

    with open("docs/token-baseline.json", "w") as f:
        json.dump(results, f, indent=2)

    print(f"Baseline measured: {sum(r['total_tokens'] for r in results)} tokens")

if __name__ == "__main__":
    measure_baseline()
EOF

# Run baseline measurement
python scripts/measure-tokens.py
```

---

## Verification Checklist

After installation, verify everything works:

### Core System
- [ ] Claude Code CLI responds to commands
- [ ] CLAUDE.md file exists and is readable
- [ ] `.claude/` directory structure created
- [ ] Custom slash commands available

### Claude Flow (Required)
- [ ] MCP server running (`claude mcp list`)
- [ ] SPARC modes available (`npx claude-flow sparc modes`)
- [ ] 54+ agents configured
- [ ] Hooks system operational

### CCPM (Optional)
- [ ] PM commands available (`ls .claude/commands/pm/`)
- [ ] GitHub CLI authenticated (`gh auth status`)
- [ ] Repository connected (`gh repo view`)
- [ ] gh-sub-issue extension installed

### MCP Servers (Optional)
- [ ] All servers show "Connected" (`claude mcp list`)
- [ ] Test calls succeed (`claude mcp test {server-name}`)
- [ ] No error messages in logs

---

## Your First Feature

Now that installation is complete, try building a simple feature:

### Using SPARC Methodology

```bash
# Run complete TDD workflow
npx claude-flow sparc tdd "simple calculator function"
```

This will guide you through:
1. **Specification** - Define requirements
2. **Pseudocode** - Design algorithm
3. **Architecture** - Plan structure
4. **Refinement** - Write tests, then code
5. **Completion** - Validate integration

### Using Custom Commands

```bash
# In Claude Code, try these commands:

# Research with deep analysis
/sc:research "best practices for REST APIs"

# Implement with automatic agent selection
/sc:implement "user authentication middleware"

# Test with coverage reporting
/sc:test --coverage

# Analyze code quality
/sc:analyze
```

### Using CCPM (If Installed)

```bash
# Create a product requirement document
/pm:prd-new "User Management System"

# Decompose into tasks and sync to GitHub
/pm:epic-oneshot

# Start working on specific issue
/pm:issue-start 123

# Get your next priority task
/pm:next
```

---

## Understanding the Structure

### Directory Layout

```
.
├── .claude/                 # Configuration directory
│   ├── commands/            # Custom slash commands
│   │   ├── sc/              # SuperClaude commands
│   │   ├── pm/              # CCPM commands (if installed)
│   │   └── context/         # Context commands (if CCPM)
│   ├── prds/                # Product requirement documents
│   ├── epics/               # Epic management (gitignored)
│   ├── context/             # Project context files
│   ├── rules/               # Coordination rules
│   ├── helpers/             # Shell script utilities
│   └── statusline/          # Status line configuration
├── .github/                 # GitHub automation
│   ├── workflows/           # CI/CD workflows
│   └── ISSUE_TEMPLATE/      # Issue templates
├── docs/                    # Documentation
├── scripts/                 # Utility scripts
├── research/                # Research and findings
│   ├── intake/              # New research intake
│   ├── topics/              # Organized by subject
│   └── _implementation/     # Feature tracking
└── CLAUDE.md                # Main configuration
```

### Key Files

- **CLAUDE.md** - Main configuration loaded by Claude Code
- **.claude/commands/** - Define custom slash commands
- **.claude/rules/** - Operational rules and standards
- **.claude/helpers/** - Reusable shell scripts

---

## Core Concepts

### 1. SPARC Methodology

Systematic development workflow:
- **S**pecification - Define what you're building
- **P**seudocode - Design logic before coding
- **A**rchitecture - Plan system structure
- **R**efinement - Test-Driven Development
- **C**ompletion - Integration and validation

### 2. Multi-Agent Coordination

The framework supports 54+ specialized agents:
- **Core**: coder, reviewer, tester, planner, researcher
- **Swarm**: hierarchical-coordinator, mesh-coordinator
- **Specialized**: backend-dev, frontend-architect, security-engineer
- **GitHub**: pr-manager, code-review-swarm, issue-tracker

### 3. Concurrent Execution

**Golden Rule**: "1 MESSAGE = ALL RELATED OPERATIONS"

```bash
# ✅ Good: Batch operations
TodoWrite { todos: [todo1, todo2, todo3] }
Read file1.js file2.js file3.js

# ❌ Bad: Sequential operations
TodoWrite { todos: [todo1] }
Read file1.js
```

### 4. File Organization

**Never save working files to root folder**

```bash
# ✅ Correct
docs/analysis.md
scripts/deploy.sh
.claude/commands/my-command.md

# ❌ Wrong
analysis.md  # Root clutter
deploy.sh    # Use scripts/
```

---

## Common Workflows

### Creating a Feature

```bash
# 1. Create feature branch
git checkout -b feature/user-authentication

# 2. Create PRD (if major feature)
/pm:prd-new "User Authentication System"

# 3. Use SPARC workflow
npx claude-flow sparc tdd "JWT authentication"

# 4. Run tests
npm test

# 5. Create PR
git add .
git commit -m "feat(auth): add JWT authentication"
gh pr create
```

### Using Git Worktrees

```bash
# Create worktree for parallel work
git worktree add ../epic-auth epic/auth-system

# Work in parallel
cd ../epic-auth
# Agent 1 works here

# Meanwhile in main repo
cd ../main-repo
# Agent 2 works here

# See .claude/rules/agent-coordination.md for details
```

---

## Troubleshooting

### MCP Servers Not Working

```bash
# Check server status
claude mcp list

# Restart specific server
claude mcp restart claude-flow

# Check logs
claude mcp logs claude-flow

# Remove and re-add server
claude mcp remove claude-flow
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

### Commands Not Found

```bash
# Verify in project directory
pwd
ls CLAUDE.md

# Check .claude/commands/ exists
ls .claude/commands/

# Verify command files
find .claude/commands -name "*.md"
```

### GitHub CLI Issues

```bash
# Check authentication
gh auth status

# Re-authenticate
gh auth login

# Test repository access
gh repo view kvnloo/evolve
```

### CCPM Installation Fails

```bash
# Verify GitHub CLI
gh --version
gh extension list

# Reinstall extension
gh extension remove yahsan2/gh-sub-issue
gh extension install yahsan2/gh-sub-issue

# Check repository permissions
gh repo view --json permissions
```

### Shell Script Errors

```bash
# Check script syntax
bash -n script.sh

# Run with debug mode
bash -x script.sh

# Verify executable permissions
chmod +x script.sh
```

---

## Next Steps

After successful installation:

### 1. Read Documentation
- [Getting Started Guide](getting-started.md)
- [Architecture Overview](architecture.md)
- [Configuration Reference](configuration-reference.md)
- [Troubleshooting Guide](troubleshooting.md)

### 2. Explore Examples
- Review existing commands in `.claude/commands/`
- Check example workflows in `docs/`
- Try SPARC modes: `npx claude-flow sparc modes`

### 3. Customize
- Create custom slash commands
- Configure agent preferences
- Set up project-specific rules
- Integrate with your workflow

### 4. Advanced Features
- Multi-agent swarm coordination
- GitHub workflow automation
- Research system organization
- Neural pattern training

---

## Performance Expectations

After installation, you should see:
- **84.8% SWE-Bench solve rate** (with full setup)
- **32.3% token reduction** (with SuperClaude)
- **2.8-4.4x speed improvement** (with Claude Flow)
- **89% less context switching** (with CCPM)

---

## Getting Help

### Documentation
- Check `docs/` directory for guides
- Review `docs/troubleshooting/` for common issues
- See `docs/reference/` for command references

### Support
- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Community Q&A
- **Security Issues**: See [SECURITY.md](../SECURITY.md)

### Quick Reference

```bash
# SPARC Commands
npx claude-flow sparc modes              # List modes
npx claude-flow sparc tdd "feature"      # TDD workflow
npx claude-flow sparc run spec "task"    # Run specific mode

# PM Commands (if CCPM installed)
/pm:prd-new "Feature name"               # New PRD
/pm:epic-oneshot                         # Decompose & sync
/pm:issue-start <number>                 # Start work
/pm:next                                 # Next task

# SuperClaude Commands (if installed)
/sc:research "query"                     # Deep research
/sc:implement "feature"                  # Implementation
/sc:test                                 # Testing
/sc:analyze                              # Code analysis

# MCP Management
claude mcp list                          # List servers
claude mcp test <server>                 # Test server
claude mcp restart <server>              # Restart server
```

---

## What's Installed

### Minimum Installation (Required)
- Claude Flow MCP server
- SPARC methodology
- 54+ specialized agents
- Core slash commands
- File organization structure

### With CCPM (Optional)
- 40+ PM commands
- GitHub integration
- Epic and PRD management
- Context system
- Parallel development support

### With SuperClaude (Optional)
- 26 additional slash commands
- Token optimization
- Enhanced agents
- Advanced capabilities

---

**Installation Complete!** 🚀

You're ready to use the Claude Code Extended Framework. Start with the [Getting Started Guide](getting-started.md) for your first feature walkthrough.
