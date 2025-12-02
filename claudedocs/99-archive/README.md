# 99-ARCHIVE: Historical Documentation

**Purpose**: Preserved historical documentation, abandoned plans, and migration history.

## Archive Categories

### Abandoned Plans (`abandoned-plans/`)
Planning documents that were created but never executed:
- **agent-migration-2025-11-02/** - Agent migration to src/ (never executed)
- **command-migration-2025-11-02/** - Command migration to src/cli/ (never executed)

### Migration History (`2025-11-migrations/`)
Actual migration events that occurred:
- Oct 21, 2025 - File reorganization (846→742 files, 12% reduction)
- Nov 6, 2025 - research/ folder elimination
- Nov 26, 2025 - Phases 1-6 consolidation

### Consolidation Analysis (`consolidation-analysis/`)
Documentation consolidation analysis artifacts from Nov 2025

### Migrated Archives
- **docs-archive/** - Historical docs/ content
- **migration-planning/** - Old migration planning documents
- **analysis-archive/** - Old analysis documents
- **blueprints-archive/** - Old blueprint documents
- **integration-archive/** - Old integration documents
- **migration-history/** - Migration tracking documents

### Legacy Archives (`archive/`)
Pre-consolidation archive structure

## Archive Organization

Each archived directory includes:
- **README.md** - Context about what happened vs what was planned
- **Original files** - Preserved with git history
- **Git references** - Commit hashes for verification

## Important Notes

⚠️ **Always check README files in archived directories** - They explain:
- Why documentation was archived
- What actually happened vs what was planned
- Git commit references for verification
- Historical context and lessons learned

## Verification

To verify historical claims in archived docs:
```bash
# Check file creation date
git log --follow --format='%ai %h %s' -- <file>

# Get commits around creation
git log --oneline --before="<date>" --after="<earlier-date>"

# Verify claimed migrations
git log --oneline --grep="migration\|reorganization\|consolidation"
```

---
**Navigate**: [← Workflows](../08-workflows/) | [Index →](../00-index/)
