---
created: 2025-10-20T09:14:50Z
last_updated: 2025-10-20T09:14:50Z
version: 1.0
author: Claude Code PM System
---

# Technical Context

## Technology Stack

### Primary Technologies

**Development Environment**: Linux (6.14.0-33-generic)
**Version Control**: Git
**Repository**: https://github.com/kvnloo/evolve.git
**Current Branch**: `main`

### Core Frameworks & Tools

#### Claude Code Ecosystem
- **Claude Code** - Primary development interface
- **Claude Flow** - Orchestration and coordination system
- **SPARC Methodology** - Specification, Pseudocode, Architecture, Refinement, Completion

#### MCP (Model Context Protocol) Servers
Configured in `.mcp.json`:
- **claude-flow** - Primary orchestration (`npx claude-flow@alpha mcp start`)
- **ruv-swarm** - Enhanced swarm coordination (optional)
- **flow-nexus** - Cloud features and advanced capabilities (optional)

### Development Tools

#### GitHub Integration
- **GitHub CLI**: v2.45.0 (authenticated as kvnloo)
- **gh-sub-issue**: v0.5.0 extension for issue management
- **Repository**: `kvnloo/evolve`

#### Helper Scripts (Shell)
Located in `.claude/helpers/`:
- `github-setup.sh` - GitHub CLI configuration
- `setup-mcp.sh` - MCP server setup
- `standard-checkpoint-hooks.sh` - Checkpoint automation
- `quick-start.sh` - Quick start script
- `github-safe.js` - Safe GitHub operations
- `checkpoint-manager.sh` - Checkpoint management

#### Automation Hooks
- `research-autosave.js` - Automatic research saving
- Pre/post operation hooks for agent coordination

## Agent System

### Available Agent Types (54 Total)

#### Core Development
- `coder` - Code implementation
- `reviewer` - Code review and quality
- `tester` - Test creation and execution
- `planner` - Task planning and organization
- `researcher` - Research and analysis

#### Swarm Coordination
- `hierarchical-coordinator` - Tree-based coordination
- `mesh-coordinator` - Peer-to-peer coordination
- `adaptive-coordinator` - Dynamic topology switching
- `collective-intelligence-coordinator` - Distributed decision-making
- `swarm-memory-manager` - Distributed memory management

#### Consensus & Distributed Systems
- `byzantine-coordinator` - Byzantine fault tolerance
- `raft-manager` - Raft consensus algorithm
- `gossip-coordinator` - Gossip protocol coordination
- `consensus-builder` - General consensus building
- `crdt-synchronizer` - Conflict-free replicated data types
- `quorum-manager` - Quorum-based operations
- `security-manager` - Security coordination

#### Performance & Optimization
- `perf-analyzer` - Performance analysis
- `performance-benchmarker` - Benchmarking and metrics
- `task-orchestrator` - Task coordination
- `memory-coordinator` - Memory management
- `smart-agent` - Intelligent agent routing

#### GitHub & Repository Management
- `github-modes` - GitHub workflow orchestration
- `pr-manager` - Pull request management
- `code-review-swarm` - Collaborative code review
- `issue-tracker` - Issue management
- `release-manager` - Release coordination
- `workflow-automation` - CI/CD automation
- `project-board-sync` - Project board synchronization
- `repo-architect` - Repository structure optimization
- `multi-repo-swarm` - Cross-repository coordination

#### SPARC Methodology Agents
- `sparc-coord` - SPARC workflow coordination
- `sparc-coder` - SPARC-based coding
- `specification` - Specification phase
- `pseudocode` - Pseudocode design
- `architecture` - Architecture design
- `refinement` - Refinement phase

#### Specialized Development
- `backend-dev` - Backend development
- `mobile-dev` - Mobile application development
- `ml-developer` - Machine learning development
- `cicd-engineer` - CI/CD engineering
- `api-docs` - API documentation
- `system-architect` - System architecture
- `code-analyzer` - Code analysis
- `base-template-generator` - Template generation

#### Testing & Validation
- `tdd-london-swarm` - TDD London School methodology
- `production-validator` - Production readiness validation

#### Planning & Migration
- `migration-planner` - Migration planning
- `swarm-init` - Swarm initialization

## Development Methodology

### SPARC Workflow
1. **Specification** - Requirements analysis and clarification
2. **Pseudocode** - Algorithm design and logic planning
3. **Architecture** - System design and structure
4. **Refinement** - TDD implementation and iteration
5. **Completion** - Integration and finalization

### Key SPARC Commands
```bash
npx claude-flow sparc modes                    # List available modes
npx claude-flow sparc run <mode> "<task>"     # Execute specific mode
npx claude-flow sparc tdd "<feature>"         # Run complete TDD workflow
npx claude-flow sparc info <mode>             # Get mode details
npx claude-flow sparc batch <modes> "<task>"  # Parallel execution
npx claude-flow sparc pipeline "<task>"       # Full pipeline
```

### Development Principles
- **Concurrent Execution**: All related operations in single messages
- **Test-Driven Development**: Tests before implementation
- **Clean Architecture**: Separation of concerns
- **Modular Design**: Files under 500 lines
- **Environment Safety**: No hardcoded secrets

## Dependencies

### Current Dependencies
No `package.json`, `requirements.txt`, or similar dependency manifest found yet. Project is in setup phase.

### Future Dependencies
Expected based on SPARC methodology and agent capabilities:
- Testing frameworks (Jest, Mocha, pytest, etc.)
- Build tools (webpack, esbuild, etc.)
- Code quality tools (ESLint, prettier, etc.)
- Documentation generators

## Build System

### Planned Build Commands
From `CLAUDE.md` configuration:
- `npm run build` - Build project
- `npm run test` - Run tests
- `npm run lint` - Linting
- `npm run typecheck` - Type checking

**Note**: Build system not yet implemented. These are planned commands.

## Environment Configuration

### MCP Server Configuration
File: `.mcp.json`
- Claude Flow integration for orchestration
- Optional ruv-swarm and flow-nexus servers
- Server routing and coordination settings

### CCPM Configuration
File: `.claude/ccpm.config`
- GitHub repository: `kvnloo/evolve`
- GitHub owner: `kvnloo`
- Issue and PR integration settings

### Claude Code Configuration
File: `CLAUDE.md`
- SPARC methodology rules
- Agent coordination protocols
- File organization standards
- Concurrent execution patterns

## Integration Points

### GitHub Integration
- Issue creation and management
- Pull request workflows
- Project board synchronization
- Code review automation
- Release management

### Hook System
- Pre-task hooks for preparation
- Post-edit hooks for automation
- Post-task hooks for cleanup
- Session management hooks
- Memory coordination hooks

### Memory Systems
- Cross-session persistence
- Agent coordination memory
- Research memory storage
- Hive mind collective memory
- Swarm state management

## Performance Characteristics

### Claimed Performance Benefits
From documentation:
- **84.8% SWE-Bench solve rate**
- **32.3% token reduction**
- **2.8-4.4x speed improvement**
- **27+ neural models** available

### Optimization Features
- Automatic topology selection
- Parallel execution (2.8-4.4x speed)
- Neural training and pattern learning
- Bottleneck analysis
- Smart auto-spawning of agents
- Self-healing workflows

## Development Environment

### Required Tools
- ✅ Git (installed)
- ✅ GitHub CLI v2.45.0 (installed, authenticated)
- ✅ gh-sub-issue extension (installed)
- ✅ Node.js/npx (for claude-flow)

### Optional Tools
- Editors with Claude Code support
- Terminal with good Unicode/emoji support
- Browser for GitHub web interface

## Technical Constraints

### File Organization
- NEVER save working files to root folder
- ALWAYS organize in appropriate subdirectories
- Use designated directories: `/src`, `/tests`, `/docs`, `/config`, `/scripts`

### Concurrent Execution
- ALL related operations in single messages
- Batch file operations together
- Batch bash commands together
- Batch memory operations together
- Use Task tool for parallel agent spawning

### Agent Coordination
Every agent must:
1. Run pre-task hooks before work
2. Use post-edit hooks during work
3. Run post-task hooks after completion
4. Coordinate via memory system
5. Report status via notification hooks

## Future Technical Considerations

### Planned Additions
1. **Package Management** - npm, pip, cargo, or go modules
2. **Testing Infrastructure** - Framework and test runner setup
3. **Build Pipeline** - Compilation and bundling system
4. **CI/CD** - Automated testing and deployment
5. **Documentation Generation** - API docs and user guides

### Scalability Considerations
- Agent coordination at scale
- Memory system efficiency
- Hook performance optimization
- Parallel execution limits
- Token budget management

The technical foundation emphasizes orchestration, coordination, and automation through the SPARC methodology and extensive agent system.
