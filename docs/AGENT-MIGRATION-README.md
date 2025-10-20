# Agent Migration Guide

Complete guide for migrating 78 agent files from `.claude/agents/` to structured `src/agents/` hierarchy.

## Quick Start

```bash
# Run automated migration
./scripts/migrate-agents.sh

# Verify migration
find src/agents/definitions -name "*.md" | wc -l  # Should output: 78

# Check migration report
cat docs/agent-migration-report.md
```

## Overview

This migration reorganizes all agent files from a flat/partial hierarchy into a logical, well-structured directory tree that improves:

- **Discoverability**: Easy to find agents by category
- **Maintainability**: Related agents grouped together
- **Scalability**: Room for growth within categories
- **Dependency Management**: Clear agent relationships

## Migration Details

### Source → Target Mapping

**Before** (Current):
```
.claude/agents/
├── core/
├── analysis/
├── architecture/
├── consensus/
├── github/
├── flow-nexus/
├── hive-mind/
├── optimization/
├── reasoning/
├── sparc/
├── swarm/
├── templates/
└── ... (mixed structure)
```

**After** (Target):
```
src/agents/
├── definitions/
│   ├── core/              (5 agents)
│   ├── specialized/       (43 agents)
│   ├── coordination/      (20 agents)
│   ├── github/            (13 agents)
│   ├── platform/          (9 agents)
│   └── meta/              (10 agents)
└── registry/
    └── agent-registry.json
```

### Category Breakdown

| Category | Count | Purpose |
|----------|-------|---------|
| **Core** | 5 | Base development capabilities |
| **Specialized** | 43 | Domain-specific expertise |
| **Coordination** | 20 | Swarm orchestration & consensus |
| **GitHub** | 13 | GitHub platform integration |
| **Platform** | 9 | Flow Nexus cloud services |
| **Meta** | 10 | Methodology & templates |
| **TOTAL** | **78** | All agent definitions |

## Migration Process

### Prerequisites

1. Backup your work
2. Ensure clean git state
3. Review the migration analysis: `docs/agent-migration-analysis.md`

### Step 1: Review Migration Plan

```bash
# Review detailed analysis
cat docs/agent-migration-analysis.md

# Review CSV mapping
cat docs/agent-migration-map.csv
```

### Step 2: Run Migration Script

```bash
# Automated migration
./scripts/migrate-agents.sh
```

The script will:
1. ✅ Create backup at `.claude-backup/agents-TIMESTAMP/`
2. ✅ Create target directory structure
3. ✅ Migrate all 78 agents
4. ✅ Validate critical agents
5. ✅ Generate migration report

### Step 3: Verify Migration

```bash
# Count migrated files
find src/agents/definitions -name "*.md" | wc -l

# Check by category
echo "Core: $(find src/agents/definitions/core -name "*.md" | wc -l)"
echo "Specialized: $(find src/agents/definitions/specialized -name "*.md" | wc -l)"
echo "Coordination: $(find src/agents/definitions/coordination -name "*.md" | wc -l)"
echo "GitHub: $(find src/agents/definitions/github -name "*.md" | wc -l)"
echo "Platform: $(find src/agents/definitions/platform -name "*.md" | wc -l)"
echo "Meta: $(find src/agents/definitions/meta -name "*.md" | wc -l)"

# View migration report
cat docs/agent-migration-report.md
```

### Step 4: Update Cross-References

Some agents may reference other agents by path. These need updating:

```bash
# Find old path references
grep -r "\.claude/agents/" src/agents/definitions/ || echo "No old paths found"

# Update to new paths
# (Manual or scripted replacement)
```

### Step 5: Test Agent Loading

```bash
# Test loading core agents
npx claude-flow agent list

# Test specific agent
npx claude-flow agent show coder
```

### Step 6: Update CLI Tooling

Update any CLI tools that reference agent paths:

- Update agent loader paths
- Update agent discovery logic
- Update agent registry generation

### Step 7: Generate Agent Registry

```bash
# Generate comprehensive registry
npx claude-flow agent registry generate > src/agents/registry/agent-registry.json
```

### Step 8: Integration Testing

```bash
# Run full test suite
npm test

# Test agent spawning
npx claude-flow test agents

# Test coordination
npx claude-flow test swarm
```

### Step 9: Documentation Updates

Update all documentation referencing agent paths:

- README files
- API documentation
- Examples and tutorials
- Integration guides

### Step 10: Cleanup

Once verified:

```bash
# Remove old directory (CAREFUL!)
# Only after thorough testing
rm -rf .claude/agents/

# Keep backup for safety
# .claude-backup/agents-TIMESTAMP/ remains
```

## Directory Structure Details

### Core Agents (5)

Foundation development capabilities:

```
src/agents/definitions/core/
├── coder.md               # Implementation specialist
├── planner.md             # Task breakdown
├── researcher.md          # Analysis & context
├── reviewer.md            # Code review
└── tester.md              # Testing & validation
```

### Specialized Agents (43)

Domain-specific expertise:

```
src/agents/definitions/specialized/
├── analysis/              # Code analysis (2)
├── architecture/          # System design (1)
├── backend/               # Backend development (1)
├── devops/                # CI/CD (1)
├── documentation/         # Documentation (1)
├── ml/                    # Machine learning (1)
├── mobile/                # Mobile development (1)
├── neural/                # Neural networks (1)
├── scaffolding/           # Templates (1)
└── testing/               # Testing strategies (2)
```

### Coordination Agents (20)

Swarm orchestration and consensus:

```
src/agents/definitions/coordination/
├── consensus/             # Consensus protocols (6)
│   ├── byzantine-coordinator.md
│   ├── crdt-synchronizer.md
│   ├── gossip-coordinator.md
│   ├── quorum-manager.md
│   └── raft-manager.md
├── hive-mind/             # Collective intelligence (5)
│   ├── collective-intelligence-coordinator.md
│   ├── queen-coordinator.md
│   ├── scout-explorer.md
│   ├── swarm-memory-manager.md
│   └── worker-specialist.md
├── performance/           # Performance optimization (6)
├── security/              # Security management (1)
└── swarm/                 # Swarm topologies (3)
    ├── adaptive-coordinator.md
    ├── hierarchical-coordinator.md
    └── mesh-coordinator.md
```

### GitHub Agents (13)

GitHub platform integration:

```
src/agents/definitions/github/
├── github-modes.md        # Orchestration hub
├── pr-manager.md          # Pull requests
├── issue-tracker.md       # Issue management
├── release-manager.md     # Releases
├── repo-architect.md      # Repository structure
├── sync-coordinator.md    # Multi-package sync
├── workflow-automation.md # GH Actions
└── ... (7 more)
```

### Platform Agents (9)

Flow Nexus cloud services:

```
src/agents/definitions/platform/flow-nexus/
├── authentication-manager.md
├── sandbox-manager.md
├── swarm-orchestrator.md
├── neural-network-specialist.md
├── workflow-coordinator.md
└── ... (4 more)
```

### Meta Agents (10)

Methodology and templates:

```
src/agents/definitions/meta/
├── planning/              # Goal planning (3)
├── reasoning/             # Reasoning agents (3)
├── sparc/                 # SPARC methodology (4)
│   ├── architecture-specialist.md
│   ├── pseudocode-specialist.md
│   ├── refinement-specialist.md
│   └── specification-specialist.md
└── templates/             # Agent templates (9)
```

## File Naming Conventions

All agent files follow **kebab-case.md** naming:

- ✅ `backend-api-developer.md`
- ✅ `collective-intelligence-coordinator.md`
- ✅ `tdd-london-swarm.md`

### Renamed Files

Files with inconsistent prefixes have been standardized:

| Old Name | New Name | Reason |
|----------|----------|--------|
| `spec-mobile-react-native.md` | `react-native-specialist.md` | Remove prefix |
| `dev-backend-api.md` | `backend-api-developer.md` | Remove prefix |
| `ops-cicd-github.md` | `cicd-engineer.md` | Remove prefix |
| `docs-api-openapi.md` | `api-documentation-specialist.md` | Remove prefix |
| `arch-system-design.md` | `system-architect.md` | Remove prefix |

## Dependency Management

### Critical Dependencies

These agents are foundational:

1. **Core 5** → All specialized agents depend on these
2. **github-modes** → Hub for GitHub operations
3. **adaptive-coordinator** → Critical swarm optimization
4. **collective-intelligence-coordinator** → Hive mind central
5. **swarm-memory-manager** → Coordination essential

### Dependency Graph Layers

```
Layer 1: Core (5)
    ↓
Layer 2: Specialized (43)
    ↓
Layer 3: Coordination (20)
    ↓
Layer 4: Integration (GitHub 13, Platform 9)
    ↓
Layer 5: Meta (10)
```

## Rollback Procedure

If issues arise during migration:

```bash
# 1. Stop all processes
pkill -f claude-flow

# 2. Remove new structure
rm -rf src/agents/

# 3. Restore from backup
BACKUP_DIR=$(ls -t .claude-backup/agents-* | head -1)
cp -r "$BACKUP_DIR" .claude/agents/

# 4. Verify restoration
find .claude/agents -name "*.md" | wc -l  # Should be 78
```

## Common Issues & Solutions

### Issue: Missing Files After Migration

**Symptom**: File count < 78

**Solution**:
```bash
# Compare source and target
diff -r .claude/agents/ src/agents/definitions/

# Re-run migration for missing category
./scripts/migrate-agents.sh
```

### Issue: Broken Cross-References

**Symptom**: Agents can't find dependencies

**Solution**:
```bash
# Find old references
grep -r "\.claude/agents/" src/agents/

# Update references
# Replace old paths with new paths
```

### Issue: CLI Can't Find Agents

**Symptom**: `agent not found` errors

**Solution**:
```bash
# Update agent discovery path in CLI
# Usually in: lib/agents/loader.js or similar

# Test agent discovery
npx claude-flow agent list
```

## Validation Checklist

- [ ] All 78 files migrated
- [ ] No files left in old structure
- [ ] File count matches by category
- [ ] Critical agents present and loadable
- [ ] Cross-references updated
- [ ] CLI tooling works
- [ ] Agent registry generated
- [ ] Integration tests pass
- [ ] Documentation updated
- [ ] Backup created and verified

## Success Metrics

### Quantitative
- ✅ 100% of agents migrated (78/78)
- ✅ 0 broken dependencies
- ✅ All tests passing
- ✅ Registry generated

### Qualitative
- ✅ Improved discoverability
- ✅ Clearer agent relationships
- ✅ Better maintainability
- ✅ Logical organization

## Reference Documentation

- **Migration Analysis**: `docs/agent-migration-analysis.md`
- **Migration Map**: `docs/agent-migration-map.csv`
- **Migration Log**: `docs/agent-migration.log`
- **Migration Report**: `docs/agent-migration-report.md`

## Support

If you encounter issues:

1. Check migration log: `docs/agent-migration.log`
2. Review backup: `.claude-backup/agents-TIMESTAMP/`
3. Consult analysis: `docs/agent-migration-analysis.md`
4. Rollback if necessary (see Rollback Procedure)

## Timeline

Recommended migration timeline:

- **Day 1**: Review documentation, backup, run migration script
- **Day 2**: Validate migration, update cross-references
- **Day 3**: Update CLI tooling, generate registry
- **Day 4**: Integration testing
- **Day 5**: Documentation updates, cleanup

Total: **5 days** for complete migration

---

**Last Updated**: 2025-10-20
**Version**: 1.0
**Status**: Ready for Execution
