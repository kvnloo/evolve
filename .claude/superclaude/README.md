# SuperClaude Framework Integration

This directory contains the SuperClaude framework v4.1.9 files integrated into the evolve project.

## Directory Structure

```
.claude/superclaude/
├── core/                           # Core framework files
│   ├── PRINCIPLES.md              # Software engineering principles
│   ├── RULES.md                   # Behavioral rules
│   ├── FLAGS.md                   # Mode activation flags
│   ├── RESEARCH_CONFIG.md         # Deep research configuration
│   ├── BUSINESS_PANEL_EXAMPLES.md # Business analysis examples
│   └── BUSINESS_SYMBOLS.md        # Symbol systems
├── modes/                          # Behavioral modes
│   ├── MODE_Brainstorming.md
│   ├── MODE_Business_Panel.md
│   ├── MODE_DeepResearch.md
│   ├── MODE_Introspection.md
│   ├── MODE_Orchestration.md
│   ├── MODE_Task_Management.md
│   └── MODE_Token_Efficiency.md
├── VERSION                         # Version tracking
└── README.md                       # This file
```

## Framework vs Project Configuration

### Global Framework
- Location: `/home/kvn/.claude/`
- Applied to: All Claude Code sessions globally
- Update method: `superclaude install` or reinstall

### Project Framework (This Directory)
- Location: `/home/kvn/workspace/evolve/.claude/superclaude/`
- Applied to: This project only (when referenced)
- Update method: Manual copy from latest release (see VERSION file)

### Project-Specific Config
- Location: `/home/kvn/workspace/evolve/CLAUDE.md`
- Contains: SPARC/CCPM specific configuration
- Supplements: SuperClaude framework with project requirements

## Usage

The global SuperClaude framework automatically applies to all Claude Code sessions. These local files serve as:

1. **Version Control** - Track which framework version the project uses
2. **Offline Reference** - Access framework docs without global dependency
3. **Project Documentation** - Team members can see framework configuration
4. **Custom Extensions** - Modify local copies for project-specific needs

## Updating

To update to the latest SuperClaude framework:

```bash
# From project root
./scripts/update-superclaude.sh

# Or manually:
cd /tmp
git clone --depth 1 https://github.com/SuperClaude-Org/SuperClaude_Framework.git sc
cp sc/src/superclaude/core/*.md .claude/superclaude/core/
cp sc/src/superclaude/modes/*.md .claude/superclaude/modes/
# Update VERSION file with new version number
rm -rf /tmp/sc
```

## References

- [SuperClaude Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework)
- [Official Documentation](https://superclaude.org/)
- [Installation Guide](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/docs/getting-started/installation.md)
