# Evolve Documentation Hub

Welcome to the Evolve framework documentation. This hub provides organized access to all project documentation, guides, and technical references.

## 📚 Core Documentation

### Getting Started
- **[Main README](../README.md)** - Project overview, quick start, and key features
- **[CLAUDE.md](../CLAUDE.md)** - Complete configuration reference and integration guide
- **[CREDITS.md](../CREDITS.md)** - Framework attribution and license information

### Project Context
- **[Project Overview](.claude/context/project-overview.md)** - Current capabilities and system status
- **[Project Vision](.claude/context/project-vision.md)** - Long-term roadmap and development goals

### Development Rules
- **[Agent Coordination](.claude/rules/agent-coordination.md)** - Multi-agent workflow protocols
- **[Path Standards](.claude/rules/path-standards.md)** - Privacy protection and portability guidelines
- **[GitHub Operations](.claude/rules/github-operations.md)** - Repository interaction standards

## 🎯 Framework Components

### SPARC Methodology
**Systematic development workflow from Claude Flow**

The SPARC methodology provides a structured 5-phase approach:
1. **Specification** - Requirements analysis with stakeholder dialogue
2. **Pseudocode** - Algorithm design before implementation
3. **Architecture** - System design with pattern validation
4. **Refinement** - Test-driven implementation with quality gates
5. **Completion** - Integration testing and deployment validation

**Reference**: [Claude Flow Repository](https://github.com/ruvnet/claude-flow)

### Project Management (CCPM)
**Spec-driven development with GitHub synchronization**

CCPM provides structured workflows:
- PRD brainstorming and creation
- Epic decomposition to GitHub issues
- Git worktree-based development
- Automated progress synchronization
- Privacy-protected automation

**Reference**: [CCPM Repository](https://github.com/automazeio/ccpm)

### SuperClaude Behavioral Modes
**Context-aware execution strategies**

Available modes:
- **Brainstorming Mode**: Requirement discovery through Socratic dialogue
- **Deep Research Mode**: Multi-hop investigation with credibility scoring
- **Introspection Mode**: Meta-cognitive analysis and reasoning optimization
- **Task Management Mode**: Hierarchical organization with persistent memory
- **Token Efficiency Mode**: Symbol-enhanced communication (30-50% token reduction)
- **Business Panel Mode**: Multi-expert strategic analysis

**Reference**: Community-developed patterns integrated into framework

## 🤖 Agent System

### 54+ Specialized Agents
Organized by domain and capability:

**Core Development**
- coder, reviewer, tester, planner, researcher

**Swarm Coordination**
- hierarchical-coordinator, mesh-coordinator, adaptive-coordinator
- collective-intelligence-coordinator, swarm-memory-manager

**Domain Specialists**
- backend-dev, mobile-dev, ml-developer, cicd-engineer
- api-docs, system-architect, code-analyzer

**GitHub Integration**
- github-modes, pr-manager, code-review-swarm
- issue-tracker, release-manager, workflow-automation

**SPARC Methodology**
- sparc-coord, sparc-coder, specification
- pseudocode, architecture, refinement

**Full agent list**: See [CLAUDE.md](../CLAUDE.md#-available-agents-54-total)

## 📖 Technical Guides

### Research Documentation
- **[Research Index](../research/)** - Deep technical research and analysis
- Topics: Autonomous systems, agent coordination, workflow optimization

### Setup & Configuration
- **[MCP Server Setup](../CLAUDE.md#-quick-setup)** - Installing and configuring MCP servers
- **[GitHub Integration](../CLAUDE.md#github--repository)** - Repository automation setup

### Usage Patterns
- **[SPARC Commands](../CLAUDE.md#sparc-commands)** - Complete command reference
- **[PM Commands](../CLAUDE.md#ccpm-claude-code-pm-integration)** - Project management workflows

## 🔧 Advanced Topics

### Multi-Agent Coordination
**Parallel execution and swarm intelligence**

Key concepts:
- Topology selection (hierarchical, mesh, adaptive)
- Byzantine fault tolerance
- Consensus protocols
- Memory and state management
- Neural pattern learning

**Documentation**: [Agent Coordination Rules](.claude/rules/agent-coordination.md)

### Privacy & Security
**Safe automation and repository protection**

Standards:
- Path sanitization (no absolute paths in public docs)
- Repository validation (prevent accidental template pollution)
- Sensitive data handling
- Secret management

**Documentation**: [Path Standards](.claude/rules/path-standards.md)

### Performance Optimization
**Metrics and benchmarks**

Validated performance:
- 84.8% SWE-Bench solve rate
- 32.3% token reduction
- 2.8-4.4x speed improvement
- 27+ neural models

**Source**: [Claude Flow benchmarks](https://github.com/ruvnet/claude-flow)

## 🎓 Learning Path

### For New Users
1. Read [Main README](../README.md) for overview
2. Follow [Quick Start](../README.md#quick-start) setup
3. Try [First Feature Development](../README.md#first-feature-development)
4. Review [CLAUDE.md](../CLAUDE.md) for detailed configuration

### For Advanced Users
1. Study [Agent Coordination](.claude/rules/agent-coordination.md) protocols
2. Explore [SPARC Methodology](../CLAUDE.md#sparc-workflow-phases) in depth
3. Review [Research Documentation](../research/) for theoretical foundations
4. Examine [Project Vision](.claude/context/project-vision.md) for future directions

### For Contributors
1. Read [CONTRIBUTING.md](../CONTRIBUTING.md) guidelines
2. Understand [Path Standards](.claude/rules/path-standards.md)
3. Follow [GitHub Operations](.claude/rules/github-operations.md) protocols
4. Review [Agent Coordination](.claude/rules/agent-coordination.md) rules

## 🔗 External Resources

### Primary Frameworks
- [Claude Flow](https://github.com/ruvnet/claude-flow) - SPARC and agent system
- [CCPM](https://github.com/automazeio/ccpm) - Project management layer
- [Claude Code](https://docs.claude.com/claude-code) - Development environment

### Optional Enhancements
- [Flow Nexus](https://flow-nexus.ruv.io) - Cloud-based advanced features
- [Ruv Swarm](https://github.com/ruvnet/ruv-swarm) - Enhanced coordination

## 📊 Project Status

**Current Version**: Integration and portfolio presentation phase
**Documentation Coverage**: Comprehensive (all major components documented)
**Framework Attribution**: Complete with proper credits
**Privacy Compliance**: Path sanitization and repository protection active

See [Project Overview](.claude/context/project-overview.md) for detailed status.

## 💡 Quick Reference

### Common Commands
```bash
# SPARC workflow
npx claude-flow sparc tdd "feature name"

# PM workflow
/pm:prd-new "requirement description"
/pm:epic-oneshot
/pm:issue-start <number>

# Custom commands
/sc:research "topic"
/sc:implement "task"
/sc:test
```

### Key Files
- `CLAUDE.md` - Main configuration
- `.claude/commands/` - Custom slash commands
- `.claude/prds/` - Product requirements
- `.claude/rules/` - Coordination protocols

### Support
- Issues: [GitHub Issues](https://github.com/kvnloo/evolve/issues)
- Documentation: This hub
- Source: [Repository](https://github.com/kvnloo/evolve)

---

**Navigation Tips**:
- Use the table of contents above to find topics
- All paths are relative for portability
- Links point to actual documentation files
- Framework attribution provided in [CREDITS.md](../CREDITS.md)

**Last Updated**: 2025-11-06
