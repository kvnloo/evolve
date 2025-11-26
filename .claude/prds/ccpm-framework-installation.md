---
title: CCPM Framework Installation
status: completed
created: 2025-10-21
author: kvn
priority: high
type: infrastructure
---

# CCPM Framework Installation

## Problem Statement

The project had CCPM (Claude Code Project Management) partially installed with command definitions but missing the executable scripts directory (`ccpm/`), preventing any PM commands from functioning. This created a broken state where commands were registered but couldn't execute.

## Solution Overview

Complete the CCPM installation by obtaining and integrating the missing `ccpm/` directory containing all executable scripts, agents, rules, and documentation from the official repository.

## Goals

1. **Primary**: Restore full CCPM functionality with all commands operational
2. **Secondary**: Understand why the initial installation was incomplete
3. **Tertiary**: Document the proper installation process for future reference
4. **Validation**: Test the complete workflow from PRD creation to GitHub sync

## Success Criteria

- ✅ All `/pm:*` commands execute without "file not found" errors
- ✅ `ccpm/scripts/pm/` directory exists with all executable scripts
- ✅ `/pm:status` shows project dashboard
- ✅ `/pm:validate` confirms system health
- ✅ Documentation available for reference
- ✅ Can create PRD, parse to epic, and sync to GitHub

## User Stories

### As a Developer
- I want to use `/pm:status` to see my project dashboard
- I want to create PRDs through `/pm:prd-new` for new features
- I want to manage epics and tasks through PM commands
- I want to sync work to GitHub Issues automatically

### As a Project Manager
- I want to track all PRDs and their implementation status
- I want to see task breakdowns and dependencies
- I want full traceability from requirement to implementation

## Technical Requirements

### Infrastructure
- Git repository with GitHub remote configured
- GitHub CLI (gh) installed and authenticated
- Repository: `kvnloo/evolve`

### Directory Structure
```
project/
├── ccpm/                    # Missing - needs installation
│   ├── scripts/
│   │   └── pm/             # Executable bash scripts
│   ├── agents/             # Agent definitions
│   ├── commands/           # Command structures
│   ├── rules/              # Rule files
│   └── hooks/              # Hook integrations
├── .claude/
│   ├── commands/pm/        # ✅ Already exists
│   ├── rules/              # ✅ Already exists
│   ├── prds/               # ✅ Already exists
│   └── ccpm.config         # ✅ Already exists
└── docs/                   # Documentation location
```

### Dependencies
- GitHub CLI v2.45.0+
- gh-sub-issue extension v0.5.0+
- Bash shell environment

## Implementation Details

### Phase 1: Root Cause Analysis
**Objective**: Understand why installation was incomplete

**Investigation Steps**:
1. Check current directory structure
2. Verify which components exist vs missing
3. Examine installation documentation
4. Review CCPM repository structure

**Findings**:
- `.claude/` directory fully installed
- `ccpm/` directory completely missing
- Commands reference `ccpm/scripts/pm/*.sh`
- Previous installation only copied `.claude/` contents

### Phase 2: Research Proper Installation
**Objective**: Determine correct installation method

**Research Tasks**:
1. Clone CCPM repository: `https://github.com/automazeio/ccpm`
2. Examine repository structure
3. Review installation scripts and README
4. Identify all required components

**Discovery**:
- Official install method: Clone entire repo into project root
- Repository contains both `.claude/` and `ccpm/` directories
- Installation should use: `git clone https://github.com/automazeio/ccpm.git .`
- Remove `.git` directory after cloning

### Phase 3: Execute Installation
**Objective**: Install missing components safely

**Implementation Steps**:
1. Clone repository to temporary location
   ```bash
   git clone --depth 1 https://github.com/automazeio/ccpm.git /tmp/ccpm-check
   ```

2. Copy `ccpm/` directory to project root
   ```bash
   cp -r /tmp/ccpm-check/ccpm ./
   ```

3. Copy documentation files
   ```bash
   cp /tmp/ccpm-check/README.md ./docs/CCPM-README.md
   cp /tmp/ccpm-check/AGENTS.md ./docs/CCPM-AGENTS.md
   cp /tmp/ccpm-check/COMMANDS.md ./docs/CCPM-COMMANDS.md
   ```

4. Clean up temporary clone
   ```bash
   rm -rf /tmp/ccpm-check
   ```

### Phase 4: Validation
**Objective**: Verify complete functionality

**Validation Tests**:
1. Directory structure check
   ```bash
   ls -la ccpm/scripts/pm/
   # Should show 15 executable scripts
   ```

2. Command execution test
   ```bash
   bash ccpm/scripts/pm/status.sh
   bash ccpm/scripts/pm/help.sh
   bash ccpm/scripts/pm/validate.sh
   ```

3. System health check
   ```bash
   /pm:validate
   # Should report: ✅ System is healthy!
   ```

4. Full workflow test
   ```bash
   /pm:status        # View dashboard
   /pm:prd-list      # List existing PRDs
   /pm:help          # View all commands
   ```

## Deliverables

### Code/Infrastructure
- [x] `ccpm/` directory with all subdirectories
- [x] `ccpm/scripts/pm/` with 15 executable scripts:
  - blocked.sh
  - epic-list.sh
  - epic-show.sh
  - epic-status.sh
  - help.sh
  - init.sh
  - in-progress.sh
  - next.sh
  - prd-list.sh
  - prd-status.sh
  - search.sh
  - standup.sh
  - status.sh
  - validate.sh
- [x] `ccpm/agents/` directory
- [x] `ccpm/commands/` directory
- [x] `ccpm/rules/` directory
- [x] `ccpm/hooks/` directory

### Documentation
- [x] `docs/CCPM-README.md` - Complete system documentation
- [x] `docs/CCPM-AGENTS.md` - Agent reference
- [x] `docs/CCPM-COMMANDS.md` - Command reference
- [x] Updated installation guide with proper procedure

### Validation Results
- [x] All PM commands functional
- [x] System validation passing
- [x] 4 existing PRDs detected
- [x] Ready for production use

## Testing Strategy

### Unit Tests
- ✅ Each script executes without errors
- ✅ Scripts have correct permissions (executable)
- ✅ Scripts can locate required files

### Integration Tests
- ✅ Commands work through `/pm:*` interface
- ✅ Scripts interact correctly with `.claude/` directories
- ✅ GitHub CLI integration functional

### Workflow Tests
- ✅ PRD creation workflow
- ✅ Epic decomposition
- ✅ GitHub sync
- ✅ Status reporting

## Risks & Mitigations

### Risk 1: Installation Conflicts
**Impact**: Overwriting existing configurations
**Mitigation**: Used merge approach - only added missing `ccpm/` directory
**Result**: ✅ Existing `.claude/` configurations preserved

### Risk 2: GitHub Repository Confusion
**Impact**: Syncing to wrong repository
**Mitigation**: Repository validation in `.claude/ccpm.config`
**Result**: ✅ Correctly configured for `kvnloo/evolve`

### Risk 3: Script Compatibility
**Impact**: Scripts might not work on all systems
**Mitigation**: Tested on Linux environment
**Result**: ✅ All scripts functional

## Lessons Learned

### What Went Well
- Identified root cause quickly through systematic investigation
- Clone-and-copy approach was safe and non-destructive
- Validation tools caught issues early

### What Could Be Improved
- Installation documentation could be clearer about complete structure
- The `curl` install method appears broken (returns HTML)
- Need better error messages when scripts are missing

### Recommendations
1. **For Users**: Always use `git clone` method for installation
2. **For CCPM Maintainers**: Fix or document the curl install endpoint
3. **For Our Project**: Document this installation process for team reference

## Timeline

- **Investigation**: 10 minutes
- **Research**: 15 minutes
- **Implementation**: 5 minutes
- **Validation**: 10 minutes
- **Documentation**: 15 minutes
- **Total**: ~55 minutes

## Future Enhancements

1. Create automated installation validation script
2. Add pre-commit hooks to verify CCPM integrity
3. Document common troubleshooting scenarios
4. Create getting started guide for team members

## References

- CCPM Repository: https://github.com/automazeio/ccpm
- GitHub Repository: https://github.com/kvnloo/evolve
- Installation Documentation: `docs/installation.md`
- Command Reference: `docs/CCPM-COMMANDS.md`
