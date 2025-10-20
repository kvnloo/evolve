---
created: 2025-10-20T09:14:50Z
last_updated: 2025-10-20T09:14:50Z
version: 1.0
author: Claude Code PM System
---

# Project Structure

## Root Directory Organization

```
evolve/
├── .claude/                    # Claude Code configuration
│   ├── commands/              # Custom slash commands
│   │   ├── context/          # Context management commands (3)
│   │   └── pm/               # Project management commands (40+)
│   ├── rules/                # Project rules and standards (11 files)
│   ├── helpers/              # Helper scripts
│   ├── context/              # Project context documentation
│   ├── prds/                 # Product requirement documents
│   ├── epics/                # Epic decompositions (gitignored)
│   ├── ccpm.config          # GitHub repository configuration
│   └── statusline-command.sh # Status line helper
│
├── .claude-flow/             # Claude Flow orchestration
│   └── hooks/               # Automation hooks
│       └── research-autosave.js
│
├── .hive-mind/              # Hive mind coordination system
│   └── [coordination structure]
│
├── .swarm/                  # Swarm coordination data
│   └── [swarm state]
│
├── coordination/            # Manual coordination files
│   ├── subtasks/
│   ├── orchestration/
│   └── memory_bank/
│
├── memory/                  # Memory system storage
│   └── [memory state]
│
├── research/                # Research documentation (primary content)
│   ├── docs/               # Research documents
│   ├── memory/             # Research memory
│   │   ├── sessions/
│   │   └── agents/
│   ├── metrics/            # Research metrics
│   ├── findings/           # Research findings
│   ├── plans/              # Research plans
│   ├── coordination/       # Research coordination
│   └── deep-research-2025-10/  # Structured deep research
│       ├── implementation-blueprint/
│       ├── phase1-autonomous-learning/
│       ├── phase2-self-improvement/
│       ├── phase3-safety-quality/
│       └── phase4-integration/
│
├── docs/                    # Project documentation
│   ├── analysis/           # Code quality analysis
│   ├── CCPM-INSTALLATION.md
│   ├── HOOK-TESTING-GUIDE.md
│   ├── performance_analysis.md
│   ├── research-autosave-hook.md
│   └── security-analysis-report.md
│
├── .git/                   # Git repository
├── .gitignore             # Git ignore rules
├── .mcp.json              # MCP server configuration
├── claude-flow            # Claude Flow executable
├── CLAUDE.md              # Main Claude Code configuration
├── discovery_mode_command.md  # Discovery mode documentation
└── LICENSE                # Project license
```

## Directory Purposes

### Configuration Directories
- **`.claude/`** - All Claude Code configuration, commands, rules, and context
- **`.claude-flow/`** - Claude Flow orchestration and hooks
- **`.mcp.json`** - MCP server definitions and routing

### Coordination Systems
- **`.hive-mind/`** - Hive mind coordination infrastructure
- **`.swarm/`** - Swarm state and coordination data
- **`coordination/`** - Manual coordination and orchestration
- **`memory/`** - Persistent memory system

### Research & Documentation
- **`research/`** - Primary research content (20+ documents)
  - Organized by topic and phase
  - Contains extensive technical architecture research
  - Includes implementation blueprints and roadmaps
- **`docs/`** - Project documentation and analysis
  - Installation guides
  - Testing guides
  - Quality and performance analysis

### Development Directories (To Be Created)
- **`src/`** - Source code (not yet created)
- **`tests/`** - Test files (not yet created)
- **`config/`** - Configuration files (not yet created)
- **`scripts/`** - Utility scripts (helpers exist, but no scripts/ dir)
- **`examples/`** - Example code (not yet created)

## File Organization Patterns

### Documentation Files
- Markdown format (`.md`)
- Organized by topic in subdirectories
- Comprehensive frontmatter where appropriate

### Shell Scripts
- Located in `.claude/helpers/`
- Executable permissions set
- Used for automation and setup tasks

### Configuration Files
- JSON format for structured config (`.mcp.json`, `ccpm.config`)
- Markdown for documentation-style config (`CLAUDE.md`)
- Example files use `.example` suffix

### Research Organization
- Hierarchical by phase and topic
- Separate directories for findings, plans, metrics
- Deep research organized by year-month

## Naming Conventions

### Directories
- Lowercase with hyphens for multi-word names
- Hidden directories (`.claude`, `.git`) for system/config
- Descriptive names (`research`, `coordination`, `memory`)

### Files
- Uppercase for root-level important files (`CLAUDE.md`, `LICENSE`)
- Lowercase with hyphens for most files
- Descriptive suffixes (`-analysis`, `-report`, `-guide`)

## Git Ignore Patterns

Key patterns from `.gitignore`:
- Node modules and package manager files
- Editor and IDE files
- OS-specific files
- CCPM epics directory (`.claude/epics/`)
- Build and temporary files

## Module Organization

Currently, the project is primarily research-focused with no established module structure. Future module organization will follow:
- Feature-based organization in `src/`
- Co-located tests in `tests/`
- Shared utilities and common code
- Clear separation of concerns

## Access Patterns

### For Development
1. Configuration: `.claude/` and `CLAUDE.md`
2. Commands: `.claude/commands/`
3. Rules: `.claude/rules/`
4. Context: `.claude/context/`

### For Research
1. Primary research: `research/`
2. Deep research phases: `research/deep-research-2025-10/`
3. Research documentation: `research/docs/`
4. Findings and analysis: `research/findings/`

### For Documentation
1. Installation: `docs/CCPM-INSTALLATION.md`
2. Guides: `docs/HOOK-TESTING-GUIDE.md`
3. Analysis: `docs/analysis/`
4. Reports: `docs/*-report.md`

## Future Structure Considerations

As the project evolves from research to implementation:
1. Create `src/` directory for source code
2. Establish `tests/` directory for test files
3. Add `config/` for runtime configuration
4. Consider `scripts/` for build and deployment scripts
5. Add `examples/` for usage examples and demos

The current structure prioritizes research, coordination, and infrastructure setup. The development structure will emerge as implementation begins.
