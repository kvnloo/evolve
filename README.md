# Claude Code Extended Framework

A comprehensive configuration framework that extends [Claude Code](https://claude.ai/claude-code)'s capabilities with advanced features for AI-powered software development, including SPARC methodology integration, multi-agent coordination, and automated project management.

## ✨ Features

### 🎯 SPARC Methodology Integration
- **Specification**: Requirements analysis and planning
- **Pseudocode**: Algorithm design before implementation
- **Architecture**: System design and documentation
- **Refinement**: Test-Driven Development (TDD) workflow
- **Completion**: Integration and validation

### 🤖 Multi-Agent Coordination
- 54+ specialized agents for different development tasks
- Hierarchical, mesh, and adaptive swarm topologies
- Parallel execution with intelligent coordination
- Cross-agent memory and state management
- Byzantine fault-tolerant consensus protocols

### 📋 Project Management System (CCPM)
- Spec-driven development with PRDs (Product Requirement Documents)
- Epic decomposition and GitHub issue synchronization
- Git worktree-based parallel development
- Automated issue tracking and progress monitoring
- Agent assignment and coordination rules

### 🔧 Automation & Tooling
- Custom slash commands for common workflows
- Shell script helpers for setup and automation
- GitHub workflow integration (CI, docs, checkpoints)
- MCP server integration (claude-flow, ruv-swarm, flow-nexus)
- Intelligent file organization and path standards

## 🚀 Quick Start

### Prerequisites
- [Claude Code CLI](https://docs.claude.com/claude-code) installed
- Git configured
- Bash shell environment

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

2. **Review the configuration:**
```bash
cat CLAUDE.md  # Main configuration file
ls -la .claude/  # Configuration directory structure
```

3. **Set up MCP servers (optional but recommended):**
```bash
# Required: Claude Flow for SPARC and agent coordination
claude mcp add claude-flow npx claude-flow@alpha mcp start

# Optional: Enhanced coordination features
claude mcp add ruv-swarm npx ruv-swarm mcp start

# Optional: Cloud-based advanced features
claude mcp add flow-nexus npx flow-nexus@latest mcp start
```

4. **Start using the framework:**
```bash
# Initialize a new project with SPARC methodology
npx claude-flow sparc modes

# Use custom slash commands (see .claude/commands/)
# Example: /sc:research, /sc:implement, /sc:test, etc.
```

## 📚 Documentation

- **[GitHub Setup Plan](docs/github-setup-plan.md)** - Repository improvement roadmap
- **[SPARC Methodology](CLAUDE.md#sparc-workflow-phases)** - Development workflow phases
- **[Agent Coordination](CLAUDE.md#-available-agents-54-total)** - Multi-agent system guide
- **[PM System](CLAUDE.md#ccpm-claude-code-pm-integration)** - Project management features
- **[Additional Documentation](docs/)** - Detailed guides and analysis

## 🎮 Usage Examples

### SPARC Workflow
```bash
# Run complete TDD workflow
npx claude-flow sparc tdd "user authentication feature"

# Execute specific mode
npx claude-flow sparc run spec-pseudocode "API endpoint design"

# Parallel execution
npx claude-flow sparc batch spec-pseudocode,architect "microservice design"
```

### Custom Commands
```bash
# Research with deep analysis
/sc:research "best practices for REST API design"

# Implement with automatic agent selection
/sc:implement "JWT authentication middleware"

# Test with coverage analysis
/sc:test --coverage
```

### PM System Workflow
```bash
# Create new product requirement
/pm:prd-new "User management system"

# Decompose epic and sync to GitHub
/pm:epic-oneshot

# Start working on an issue with specialized agent
/pm:issue-start 123

# Get next priority task
/pm:next
```

## 🏗️ Architecture

```
.
├── .claude/                 # Configuration directory
│   ├── commands/            # Custom slash commands
│   ├── prds/                # Product requirement documents
│   ├── epics/               # Epic management (gitignored)
│   ├── context/             # Project context files
│   ├── rules/               # Coordination and operation rules
│   ├── helpers/             # Shell script utilities
│   └── statusline/          # Status line configuration
├── .github/                 # GitHub workflows and templates
│   ├── workflows/           # CI/CD automation
│   └── ISSUE_TEMPLATE/      # Issue templates
├── docs/                    # Documentation and analysis
├── scripts/                 # Utility scripts
└── CLAUDE.md                # Main configuration file
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Development setup
- Code style and standards
- SPARC methodology workflow
- Testing requirements
- Pull request process
- Agent coordination protocol

## 📋 Project Management

This project uses CCPM (Claude Code PM) for spec-driven development:
- **PRDs** stored in `.claude/prds/`
- **Epics** managed in `.claude/epics/` (gitignored)
- **GitHub Issues** synced automatically
- **Git Worktrees** for parallel development

See [CLAUDE.md](CLAUDE.md#ccpm-claude-code-pm-integration) for details.

## 🔐 Security

Security is important to us. Please see [SECURITY.md](SECURITY.md) for information on:
- Reporting vulnerabilities
- Supported versions
- Security update policy

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Key Principles

This framework follows these core principles:

1. **Concurrent Execution**: All operations must be parallel/batched in a single message
2. **File Organization**: Never save working files to root folder, use appropriate subdirectories
3. **SPARC Methodology**: Systematic development through Specification → Pseudocode → Architecture → Refinement → Completion
4. **Evidence-Based**: Code > Documentation, Evidence > Assumptions
5. **Agent Coordination**: MCP coordinates strategy, Claude Code Task tool executes with real agents

## 🎯 Performance Benefits

- **84.8% SWE-Bench solve rate**
- **32.3% token reduction**
- **2.8-4.4x speed improvement**
- **27+ neural models** for pattern learning

## 🔗 Links

- [Claude Code Documentation](https://docs.claude.com/claude-code)
- [Claude Flow GitHub](https://github.com/ruvnet/claude-flow)
- [Flow Nexus Platform](https://flow-nexus.ruv.io)
- [Issue Tracker](https://github.com/YOUR_USERNAME/YOUR_REPO/issues)

## 💬 Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/YOUR_USERNAME/YOUR_REPO/issues)
- **Discussions**: Join the conversation in [GitHub Discussions](https://github.com/YOUR_USERNAME/YOUR_REPO/discussions)
- **Documentation**: Check the [docs/](docs/) directory for detailed guides

---

**Remember**: Claude Flow coordinates, Claude Code creates!
