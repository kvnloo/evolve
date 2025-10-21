---
name: project-reorganization
description: Complete project structure reorganization with Claude Code awareness and incremental PR strategy
status: backlog
created: 2025-10-21T16:20:38Z
---

# PRD: Project Structure Reorganization

## Executive Summary

This PRD outlines a comprehensive reorganization strategy for a project containing 846 files across 433 directories. The reorganization focuses on removing verified duplicates (~320 files), establishing a research taxonomy with continuous intake, improving documentation structure, and consolidating data/memory locations - all while preserving Claude Code functionality by keeping the critical .claude folder intact.

## Problem Statement

The current project structure suffers from significant organizational debt that impedes productivity and maintenance:

**Critical Issues:**
- **38% file redundancy**: ~320 duplicate files consuming space and causing confusion
- **No research taxonomy**: 124 research files scattered without categorization or intake process
- **Documentation chaos**: 746 markdown files with no organizational structure
- **Memory fragmentation**: 4+ separate memory/state locations without unification
- **Hidden directory confusion**: 7 hidden directories with overlapping purposes
- **Claude Code risk**: Any migration out of .claude folder would break agent/command functionality

**Why Now:**
- Project has grown organically to 846 files without planned structure
- Team productivity impacted by difficulty finding files
- Research insights lost in scattered documentation
- Duplicates causing version confusion and git conflicts
- New team members struggle with onboarding due to chaos

## User Stories

### Developer Perspective
**As a developer**, I want verified duplicate files removed so that:
- Navigation is 75% faster with fewer files to search through
- Git operations are cleaner without redundant changes
- I can find the authoritative version of any file immediately
- *Acceptance Criteria*: All duplicates verified by MD5 hash before removal

### Researcher Perspective
**As a researcher**, I want an organized research structure with continuous intake so that:
- New research has a clear destination (intake → review → topics)
- Old research auto-archives after 90 days
- Topics are easily discoverable by category
- Related research is co-located for synthesis
- *Acceptance Criteria*: Research taxonomy with intake pipeline established

### Claude Code User Perspective
**As a Claude Code user**, I need the .claude folder preserved so that:
- All agents remain functional and discoverable
- Commands continue to work without modification
- Settings and configurations remain intact
- No retraining or reconfiguration required
- *Acceptance Criteria*: Zero Claude Code functionality loss

### Team Lead Perspective
**As a team lead**, I want incremental PRs so that:
- Changes can be reviewed in manageable chunks
- Rollback is possible at any phase
- Risk is minimized through staged deployment
- Team can adapt gradually to new structure
- *Acceptance Criteria*: 5 separate PRs with clear boundaries

## Requirements

### Functional Requirements

#### Phase 1: Safe Cleanup (PR #1)
**Remove Verified Duplicates**
- Delete .claude-backup directory (250+ files, verified redundant)
- Remove research/.claude/* (66 files, hash-verified identical to main)
- Clean empty coordination directories
- Preserve any unique files found during verification

**Verification Process**
- Generate MD5 hashes for all candidate files
- Compare hashes to identify true duplicates
- Create deletion manifest before execution
- Backup before deletion

#### Phase 2: Research Organization (PR #2)
**Create Research Taxonomy**
```
research/
├── active/
│   ├── _intake/      # New research entry point
│   ├── _in-progress/ # Active development
│   └── _review/      # Ready for integration
├── topics/
│   ├── ai-agents/
│   ├── automation/
│   ├── claude-code/
│   ├── digital-twins/
│   └── architecture/
├── findings/
│   └── 2025/10/      # Date-based findings
└── projects/         # Multi-phase research
```

**Continuous Intake Pipeline**
- New research → active/_intake/
- Review process → active/_review/
- Approved → topics/[category]/ or findings/[date]/
- Auto-archive to archive/ after 90 days

#### Phase 3: Documentation Structure (PR #3)
**Organize Documentation**
```
docs/
├── planning/         # Project planning
├── research/        # Research summaries
├── guides/          # How-to guides
├── api/            # API documentation
├── reports/        # Analysis reports
└── index.md        # Navigation hub
```

#### Phase 4: .claude Enhancement (PR #4)
**Improve .claude Organization** (within folder only)
- Add README.md files for navigation
- Create index files for agents/commands
- Document dependencies between components
- Add category markers for better grouping

#### Phase 5: Data Consolidation (PR #5)
**Unify Memory/Data**
```
data/
├── memory/
│   ├── global/      # System-wide
│   ├── agents/      # Per-agent
│   ├── swarm/       # Collective
│   └── sessions/    # Persistence
├── metrics/         # Performance data
└── logs/           # Application logs
```

### Non-Functional Requirements

#### Safety Requirements
- **Hash verification**: Every duplicate verified by MD5 before deletion
- **Incremental rollout**: 5 separate PRs, each independently revertible
- **Backup protocol**: Full backup before each phase
- **Testing gates**: Claude Code functionality test after each PR

#### Performance Requirements
- **File reduction target**: 40% fewer files (846 → ~500)
- **Directory reduction target**: 75% fewer directories (433 → ~100)
- **Search performance**: 3x faster file discovery
- **Git performance**: 50% faster operations with fewer files

#### Compatibility Requirements
- **Claude Code preservation**: 100% functionality maintained
- **Git history**: Full history preserved
- **Tool compatibility**: All existing tools continue working
- **Path stability**: No breaking changes to critical paths

## Success Criteria

### Quantitative Metrics
- ✅ 320+ duplicate files removed (hash-verified)
- ✅ File count reduced to ~500 (40% reduction)
- ✅ Directory count reduced to ~100 (75% reduction)
- ✅ 100% Claude Code tests passing
- ✅ 0 broken references or links

### Qualitative Metrics
- ✅ Research has clear intake pipeline
- ✅ Documentation is discoverable
- ✅ New team members can navigate structure
- ✅ Git operations are cleaner
- ✅ Development velocity improved

### Validation Checklist
- [ ] All duplicates verified by hash
- [ ] Research taxonomy established
- [ ] Documentation organized
- [ ] .claude folder intact
- [ ] Memory/data consolidated
- [ ] All tests passing
- [ ] Team trained on new structure

## Constraints & Assumptions

### Technical Constraints
- **Must preserve .claude folder**: Moving files out breaks Claude Code
- **Git limitations**: Large moves can complicate history
- **Hash collision risk**: MD5 sufficient for duplicate detection
- **Symbolic links**: May not work on all platforms

### Resource Constraints
- **Timeline**: 5 weeks (1 week per phase)
- **Team availability**: Part-time effort required
- **Review bandwidth**: PRs must be manageable size

### Assumptions
- Team agrees on proposed taxonomy
- No active development during migration windows
- Backup storage available
- Git repository has sufficient space

## Out of Scope

The following are explicitly NOT part of this reorganization:
- **Source code restructuring**: No src/ folder creation
- **TypeScript migration**: No JS → TS conversion
- **Build system**: No package.json or build setup
- **Monorepo conversion**: No packages/ structure
- **External tool integration**: No new tools or services
- **Agent rewriting**: No modification of agent definitions
- **Command changes**: No command restructuring
- **API changes**: No external API modifications

These items may be addressed in future phases but are not part of this reorganization effort.

## Dependencies

### Internal Dependencies
- Git repository access
- File system permissions
- Claude Code installation
- Backup storage availability

### External Dependencies
- MD5 hashing utility
- Git version 2.0+
- Bash shell for scripts
- Sufficient disk space for backups

### Team Dependencies
- Code review availability
- Testing resources
- Documentation updates
- Training materials

## Risk Analysis

### High Risk Items
**Data Loss**
- *Mitigation*: Full backup before each phase
- *Contingency*: Git history for recovery

**Claude Code Breakage**
- *Mitigation*: Keep .claude intact, test after each PR
- *Contingency*: Immediate rollback capability

### Medium Risk Items
**Team Disruption**
- *Mitigation*: Incremental rollout, clear communication
- *Contingency*: Pause between phases if needed

**Hash Collisions**
- *Mitigation*: Manual verification of edge cases
- *Contingency*: Additional comparison methods

### Low Risk Items
**Performance Impact**
- *Mitigation*: Execute during low-activity periods
- *Contingency*: Extend timeline if needed

## Implementation Timeline

### Week 1: Phase 1 - Cleanup
- Day 1-2: Hash verification and manifest creation
- Day 3-4: Execute cleanup, test
- Day 5: PR review and merge

### Week 2: Phase 2 - Research
- Day 1-2: Create taxonomy structure
- Day 3-4: Migrate research files
- Day 5: PR review and merge

### Week 3: Phase 3 - Documentation
- Day 1-2: Organize docs folder
- Day 3-4: Create indexes and navigation
- Day 5: PR review and merge

### Week 4: Phase 4 - Enhancement
- Day 1-2: Improve .claude organization
- Day 3-4: Add navigation aids
- Day 5: PR review and merge

### Week 5: Phase 5 - Consolidation
- Day 1-2: Unify memory/data
- Day 3-4: Final testing
- Day 5: PR review and completion

## Appendix

### A. Hash Verification Script
```bash
#!/bin/bash
# Generate hashes for duplicate detection
find . -type f -name "*.md" -exec md5sum {} \; |
  sort | awk '{print $1}' | uniq -d
```

### B. Research Intake Rules
```yaml
intake_rules:
  entry: active/_intake/YYYY-MM-DD-topic.md
  review: After 7 days or completion
  categorization: Auto-suggest based on keywords
  archival: After 90 days of inactivity
```

### C. Success Metrics Tracking
- Weekly file count measurements
- Git performance benchmarks
- Team satisfaction surveys
- Claude Code functionality tests