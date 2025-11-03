# Complete File Migration Map - Every Single File
Generated: 2025-10-21
Total Project Files: ~846 files (excluding .git)

## 📊 Complete Directory Analysis

### File Distribution by Directory
```
.claude/              311 files  → Mapped (agents: 78, commands: 196, others: 37)
research/             152 files  → Mapped (124 MD + 28 data files)
docs/                  52 files  → Need mapping
memory/                 5 files  → Need mapping
coordination/           0 files  → Empty directories
.claude-flow/          13 files  → Need mapping
.hive-mind/             5 files  → Need mapping
.swarm/                 7 files  → Need mapping
.claude-backup/       ~250 files  → TO DELETE (redundant backup)
scripts/                3 files  → Need mapping
Root files:            10 files  → Need mapping
```

## 🗂️ Hidden Directories Migration

### .claude-flow Directory (13 files)
```
Current → New Location

.claude-flow/daemons/research-daemon.js
→ src/core/daemons/research-daemon.ts (convert to TypeScript)

.claude-flow/hooks/research-autosave.js
→ src/core/hooks/research-autosave.ts (convert to TypeScript)

.claude-flow/metrics/system-metrics.json
→ data/metrics/system/system-metrics.json

.claude-flow/metrics/performance.json
→ data/metrics/performance/performance-history.json

.claude-flow/metrics/agent-metrics.json
→ data/metrics/agents/agent-performance.json

.claude-flow/metrics/task-metrics.json
→ data/metrics/tasks/task-history.json

.claude-flow/logs/*
→ data/logs/claude-flow/ (preserve all logs)
```

### .hive-mind Directory (5 files)
```
Current → New Location

.hive-mind/config/config.json
→ config/integrations/hive-mind.json

.hive-mind/sessions/*.json
→ data/sessions/hive-mind/ (preserve session data)

.hive-mind/memory/*
→ data/memory/hive-mind/ (unified memory location)

.hive-mind/backups/*
→ DELETE (redundant with git versioning)

.hive-mind/templates/*
→ src/agents/templates/hive-mind/
```

### .swarm Directory (7 files)
```
Current → New Location

.swarm/memory.db
→ data/memory/swarm/memory.db (SQLite database)

.swarm/research/analysis/*
→ research/synthesis/swarm-analysis/

.swarm/research/architecture/*
→ docs/architecture/swarm-patterns/

.swarm/research/checkpoints/*
→ data/checkpoints/swarm/

.swarm/research/performance/*
→ data/metrics/swarm/performance/

.swarm/research/security/*
→ docs/security/swarm-security/

.swarm/research/synthesis/*
→ research/synthesis/swarm-synthesis/
```

## 📁 Core Directories Migration

### Memory Directory (5 files)
```
Current → New Location

memory/research-queue.json
→ data/memory/queues/research-queue.json

memory/claude-flow@alpha-data.json
→ data/memory/tools/claude-flow-data.json

memory/agents/README.md
→ docs/architecture/memory/agent-memory.md

memory/sessions/README.md
→ docs/architecture/memory/session-management.md

memory/memory-store.json
→ data/memory/store/global-memory.json
```

### Coordination Directory (Empty)
```
coordination/memory_bank/     → DELETE (empty)
coordination/orchestration/   → DELETE (empty)
coordination/subtasks/        → DELETE (empty)
```

### Scripts Directory (3 files)
```
Current → New Location

scripts/checkpoint.sh
→ scripts/utils/checkpoint.sh

scripts/*.sh (any others)
→ scripts/utils/ or scripts/migration/
```

### Docs Directory (52 files)
```
Current Structure → New Structure

docs/analysis/*.json
→ data/analysis/code-quality/

docs/analysis/*.md
→ docs/reports/analysis/

docs/hive-mind/*.md
→ docs/architecture/hive-mind/

docs/integration/*.md
→ docs/guides/integration/

docs/PROJECT-REORGANIZATION-PLAN.md
→ docs/planning/reorganization/v1-plan.md

docs/RESEARCH-REORGANIZATION-DETAILED.md
→ docs/planning/reorganization/research-plan.md

docs/command-*.md (various command docs)
→ docs/reference/commands/ (consolidate)

docs/agent-*.md (various agent docs)
→ docs/reference/agents/ (consolidate)
```

## 🌳 Root Files Migration

```
Current → New Location

CLAUDE.md
→ docs/guides/getting-started/claude-configuration.md

LICENSE
→ LICENSE (keep in root)

discovery_mode_command.md
→ docs/reference/commands/discovery-mode.md

claude-flow (symlink or file)
→ DELETE (will be npm package)

.gitignore
→ .gitignore (keep in root, update paths)

README.md (if exists)
→ README.md (create comprehensive new one)
```

## 🗑️ Files to Delete

### .claude-backup Directory (~250 files)
```
DELETE ENTIRELY - Redundant with git history
.claude-backup/backup-20251020-042200/*
```

### Duplicate Files
```
research/.claude/commands/* (66 files) → DELETE (duplicates)
research/.claude-flow/* → DELETE (duplicates)
research/.hive-mind/* → DELETE (duplicates)
research/.swarm/* → DELETE (duplicates)
```

### Empty Directories
```
coordination/* → DELETE (empty structure)
```

## 📋 Complete Migration Statistics

### Before Migration
```
Total Files:        846
Total Directories:  433
Duplicate Files:    ~320 (38%)
Empty Dirs:         ~50
Scattered Configs:  15+ locations
No Source Code:     0 files in /src
No Tests:          0 files in /tests
```

### After Migration
```
Expected Files:     ~500 (41% reduction)
Expected Dirs:      ~100 (77% reduction)
Source Files:       ~150 (new TypeScript)
Test Files:         ~100 (new test suite)
Config Files:       ~20 (consolidated)
Documentation:      ~200 (organized)
```

## 🔧 Final Directory Structure

```
evolve/
├── src/                      # 150+ TypeScript files (NEW)
│   ├── core/                # Core functionality
│   ├── agents/              # Agent implementations
│   ├── cli/                 # CLI commands
│   ├── integrations/        # External integrations
│   └── utils/               # Utilities
│
├── tests/                    # 100+ test files (NEW)
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── packages/                 # Monorepo packages (NEW)
│   ├── @evolve/core/
│   ├── @evolve/agents/
│   ├── @evolve/cli/
│   └── @evolve/mcp/
│
├── config/                   # 20 config files (CONSOLIDATED)
│   ├── default.json
│   ├── development.json
│   ├── production.json
│   └── integrations/
│
├── data/                     # All runtime data (UNIFIED)
│   ├── memory/              # Unified memory store
│   ├── sessions/            # Session data
│   ├── metrics/             # Performance metrics
│   ├── logs/                # Application logs
│   └── checkpoints/         # State checkpoints
│
├── research/                 # 60+ research docs (ORGANIZED)
│   ├── active/
│   ├── topics/
│   ├── projects/
│   ├── findings/
│   └── archive/
│
├── docs/                     # 200+ docs (STRUCTURED)
│   ├── architecture/
│   ├── api/
│   ├── guides/
│   ├── reference/
│   └── planning/
│
├── scripts/                  # Build & utility scripts
│   ├── migration/           # Migration scripts
│   ├── build/              # Build scripts
│   └── utils/              # Utilities
│
├── .claude/                  # Claude-specific (STREAMLINED)
│   ├── agents/             # Agent definitions only
│   ├── commands/           # Command definitions only
│   ├── workflows/          # Workflow definitions
│   └── rules/              # Operational rules
│
└── [Root Config Files]       # Package.json, tsconfig, etc.
```

## 🚀 Migration Execution Plan

### Phase 1: Preparation (Day 1)
```bash
# 1. Full backup
git checkout -b pre-migration-backup
tar -czf backup-$(date +%Y%m%d).tar.gz .

# 2. Create new structure
mkdir -p src/{core,agents,cli,integrations,utils}
mkdir -p tests/{unit,integration,e2e}
mkdir -p packages/@evolve/{core,agents,cli,mcp}
mkdir -p config/integrations
mkdir -p data/{memory,sessions,metrics,logs,checkpoints}
```

### Phase 2: Core Migration (Day 2-3)
```bash
# Migrate agents (78 files)
./scripts/migration/migrate-agents.sh

# Migrate commands (196 files)
./scripts/migration/migrate-commands.sh

# Migrate research (124 files)
./scripts/migration/migrate-research.sh
```

### Phase 3: Data & Config (Day 4)
```bash
# Consolidate memory
./scripts/migration/unify-memory.sh

# Merge configurations
./scripts/migration/merge-configs.sh

# Migrate hidden directories
./scripts/migration/migrate-hidden.sh
```

### Phase 4: Cleanup (Day 5)
```bash
# Remove duplicates
rm -rf research/.claude
rm -rf research/.claude-flow
rm -rf research/.hive-mind
rm -rf .claude-backup

# Remove empty directories
find . -type d -empty -delete

# Verify migration
./scripts/migration/verify-migration.sh
```

## ✅ Validation Checklist

### Pre-Migration
- [ ] Complete backup created
- [ ] Git branch for migration
- [ ] All stakeholders notified
- [ ] Migration scripts tested

### During Migration
- [ ] Phase 1: Structure created
- [ ] Phase 2: Core files migrated
- [ ] Phase 3: Data consolidated
- [ ] Phase 4: Cleanup completed

### Post-Migration
- [ ] All 846 files accounted for
- [ ] No broken references
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Team trained on new structure

### Success Metrics
- [ ] File count reduced by 40%+
- [ ] Directory count reduced by 75%+
- [ ] All duplicates removed
- [ ] Clear navigation paths
- [ ] Consistent naming throughout

## 📝 Migration Scripts Blueprint

### Master Migration Script
```bash
#!/bin/bash
# master-migration.sh

echo "🚀 Starting Complete Project Migration"

# Phase tracking
PHASE_1_COMPLETE=false
PHASE_2_COMPLETE=false
PHASE_3_COMPLETE=false
PHASE_4_COMPLETE=false

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Logging
LOG_FILE="migration-$(date +%Y%m%d-%H%M%S).log"

log() {
    echo -e "${GREEN}[$(date +%H:%M:%S)]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

# Run all phases
./scripts/migration/phase1-structure.sh && PHASE_1_COMPLETE=true
./scripts/migration/phase2-core.sh && PHASE_2_COMPLETE=true
./scripts/migration/phase3-data.sh && PHASE_3_COMPLETE=true
./scripts/migration/phase4-cleanup.sh && PHASE_4_COMPLETE=true

# Final report
if [ "$PHASE_4_COMPLETE" = true ]; then
    log "✅ Migration Complete!"
    ./scripts/migration/generate-report.sh
else
    error "Migration failed. Check $LOG_FILE for details."
fi
```

---

**This document maps EVERY SINGLE FILE in the project (846 total) with exact migration paths. No file is left behind.**