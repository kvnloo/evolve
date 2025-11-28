# Documentation Reorganization Plan

**Based on:** ace-3Dmerge documentation structure (v3.0)
**Target:** evolve/docs-consolidation worktree
**Date:** 2025-11-28
**Status:** Planning

---

## Overview

This plan reorganizes the current documentation structure to match the proven ace-3Dmerge model, which uses a numbered folder convention for logical progression through the development lifecycle with consolidated planning.

---

## Current State Analysis

### Current `claudedocs/` Structure
```
claudedocs/
├── active_research/          # 87 files - Active research topics
├── archive/                  # Historical documentation
│   ├── 2025-10-deep-research/
│   ├── 2025-11-consolidation/
│   └── deprecated/
├── migration/                # Migration documentation
└── tooling/                  # Tool documentation
```

### Current `docs/` Structure
```
docs/
├── analysis/                 # 3 files - Capability analysis
├── architecture/             # 3 files - Architecture plans
├── archive/                  # Historical docs (organized)
├── blueprints/               # 3 files - Migration blueprints
├── features/                 # Feature documentation
├── guides/                   # 2 files - User guides
├── hive-mind/                # 1 file - Hive mind init
├── implementation/           # 2 files - Implementation docs
├── integration/              # 4 files - Integration docs
├── migration/                # Migration planning
├── quick-reference/          # 2 files - Quick refs
├── reference/                # 1 file - Configuration
├── research-synthesis/       # Research synthesis
├── statusline-enhancement/   # Statusline project
└── troubleshooting/          # 2 files - FAQ, issues
```

**Total Files:**
- claudedocs: 87 markdown files
- docs: 80 markdown files

---

## Target Structure (ace-3Dmerge Model)

### claudedocs/ (LLM-optimized)
```
claudedocs/
├── 00-index/           # Navigation hub, getting started, specs
├── 01-architecture/    # System architecture, ADRs, design decisions
├── 02-research/        # Research findings, studies, explorations
│   └── synthesis/      # Synthesized research findings
├── 03-vision/          # Strategic vision, concepts, future direction
├── 04-planning/        # Consolidated planning hub
│   ├── features/       # Feature documentation by domain
│   ├── stories/        # User stories, epics, requirements
│   ├── defects/        # Bug tracking, root cause analysis
│   ├── roadmaps/       # Strategic roadmaps and feature plans
│   ├── sprints/        # Sprint planning and tracking
│   ├── milestones/     # Project milestones
│   └── business/       # Business planning docs
├── 05-implementation/  # Implementation guides, technical specs
├── 06-testing/         # Testing guides, strategies, coverage
├── 07-operations/      # Monitoring, performance, maintenance
├── 08-workflows/       # Deployment, CI/CD, processes
└── 99-archive/         # Historical documentation (date-organized)
```

### docs/ (Human-developer documentation)
```
docs/
├── API.md              # API documentation
├── ARCHITECTURE.md     # High-level architecture overview
├── DEVELOPMENT.md      # Development guide
├── NAVIGATION.md       # Navigation to claudedocs
├── PERFORMANCE_OPTIMIZATION.md  # Performance guide
├── README.md           # Main entry point
└── (other top-level human-facing docs as needed)
```

---

## Migration Mapping

### Phase 1: Create Target Structure

#### claudedocs/00-index/
**Purpose:** Entry point and navigation hub

**Create:**
- `README.md` - Main documentation index with quick links
- `STRUCTURE_SPECIFICATION.md` - This specification document
- `GETTING_STARTED.md` - Onboarding guide
- `QUICK_REFERENCE.md` - Quick reference card

**Source Files:**
- `docs/README.md` → Adapt to `00-index/README.md`
- `docs/quick-start.md` → `00-index/GETTING_STARTED.md`
- `docs/quick-reference/overview.md` → `00-index/QUICK_REFERENCE.md`
- Create new `00-index/STRUCTURE_SPECIFICATION.md` (based on ace-3Dmerge)

#### claudedocs/01-architecture/
**Purpose:** System architecture and design decisions

**Migrate:**
- `docs/architecture/` → `01-architecture/`
- `docs/evolve-architecture.md` → `01-architecture/CORE_ARCHITECTURE.md`
- `claudedocs/architecture-files-comparison.md` → `01-architecture/analysis/`
- `claudedocs/codebase-structure-analysis.md` → `01-architecture/analysis/`
- `claudedocs/framework-investigation.md` → `01-architecture/analysis/`

**Create:**
- `01-architecture/README.md` - Architecture overview
- `01-architecture/ADRs/` - Architecture Decision Records (future)
- `01-architecture/patterns/` - Design patterns

#### claudedocs/02-research/
**Purpose:** Research findings and technology evaluations

**Migrate:**
- `claudedocs/active_research/` → `02-research/`
- `docs/research-synthesis/` → `02-research/synthesis/`
- `claudedocs/doc-*.md` files → `02-research/documentation-research/`

**Structure:**
```
02-research/
├── README.md
├── topics/                # From active_research/topics
│   ├── ai-agents/
│   ├── architecture/
│   ├── benchmarks/
│   ├── claude-code/
│   ├── digital-twins/
│   ├── domain-specific/
│   └── llm-systems/
├── papers/                # From active_research/papers
├── synthesis/             # Synthesized findings
│   └── (from research-synthesis/)
└── complete-catalog.md    # From active_research/
```

#### claudedocs/03-vision/
**Purpose:** Strategic vision and future direction

**Migrate:**
- `docs/portfolio-redesign-proposal.md` → `03-vision/`
- `docs/PROJECT-INDEX.md` → `03-vision/PROJECT_VISION.md`
- Extract vision/strategy content from various docs

**Create:**
- `03-vision/README.md` - Vision overview
- `03-vision/concepts/` - Innovation proposals

#### claudedocs/04-planning/
**Purpose:** Consolidated planning hub

**Migrate:**

```
04-planning/
├── README.md (create)
├── features/
│   ├── github-integration/     (from docs/features/)
│   ├── research-daemon/        (from docs/features/)
│   └── statusline-enhancement/ (from docs/statusline-enhancement/)
├── roadmaps/
│   ├── implementation/         (from docs/implementation/)
│   └── capabilities/           (from docs/analysis/)
├── business/
│   └── (business planning docs if any)
├── stories/
│   └── (user stories - create as needed)
├── defects/
│   └── (from docs/troubleshooting/)
├── sprints/
│   └── (create as needed)
└── milestones/
    └── (create as needed)
```

#### claudedocs/05-implementation/
**Purpose:** Implementation guides and technical specs

**Migrate:**
- `docs/implementation/` → `05-implementation/`
- `docs/guides/` → `05-implementation/guides/`
- `docs/integration/` → `05-implementation/integration/`

**Create:**
- `05-implementation/README.md`
- `05-implementation/specifications/`

#### claudedocs/06-testing/
**Purpose:** Testing strategies and documentation

**Migrate:**
- `docs/integration/INTEGRATION-TESTS.md` → `06-testing/integration/`

**Create:**
- `06-testing/README.md`
- `06-testing/TESTING_GUIDE.md`
- `06-testing/general/`
- `06-testing/reports/`

#### claudedocs/07-operations/
**Purpose:** Operational procedures and monitoring

**Migrate:**
- `docs/performance_analysis.md` → `07-operations/performance/`
- `docs/hive-mind/initialization-report.md` → `07-operations/procedures/`

**Create:**
- `07-operations/README.md`
- `07-operations/monitoring/`
- `07-operations/performance/`
- `07-operations/procedures/`

#### claudedocs/08-workflows/
**Purpose:** Development processes and deployment

**Migrate:**
- `docs/installation.md` → `08-workflows/INSTALLATION.md`
- `docs/guides/hook-system.md` → `08-workflows/hooks/`

**Create:**
- `08-workflows/README.md`
- `08-workflows/deployment/`
- `08-workflows/scripts/`

#### claudedocs/99-archive/
**Purpose:** Historical documentation

**Migrate:**
- `claudedocs/archive/` → `99-archive/`
- `docs/archive/` → `99-archive/`
- `docs/migration/` → `99-archive/2025-11-migrations/`
- `docs/blueprints/` → `99-archive/migration-plans/`
- `claudedocs/migration/` → `99-archive/migration/`

**Structure:**
```
99-archive/
├── 2025-10-deep-research/
├── 2025-11-consolidation/
├── 2025-11-migrations/
├── deprecated/
├── migration-plans/
└── legacy/
```

---

## docs/ Reorganization

### Target: Minimal Human-Facing Documentation

**Keep in root:**
- `API.md` - API documentation for developers
- `ARCHITECTURE.md` - High-level architecture (links to claudedocs/01-architecture/)
- `DEVELOPMENT.md` - Development setup and workflows
- `NAVIGATION.md` - Navigation guide to claudedocs
- `PERFORMANCE_OPTIMIZATION.md` - Performance best practices
- `README.md` - Main entry point with project overview

**Remove from docs/ (move to claudedocs/):**
- All detailed planning → claudedocs/04-planning/
- All research content → claudedocs/02-research/
- All implementation details → claudedocs/05-implementation/
- All architecture details → claudedocs/01-architecture/
- All archived content → claudedocs/99-archive/

---

## File Count Estimate

### After Reorganization

**claudedocs/ breakdown:**
- 00-index: 4 files
- 01-architecture: ~15 files
- 02-research: ~90 files (from active_research + synthesis)
- 03-vision: ~5 files
- 04-planning: ~25 files
- 05-implementation: ~12 files
- 06-testing: ~5 files
- 07-operations: ~5 files
- 08-workflows: ~5 files
- 99-archive: ~75 files

**Total claudedocs: ~241 files** (organized and consolidated)

**docs/ breakdown:**
- Top-level: 8 files (minimal human-facing docs)

---

## Implementation Steps

### Step 1: Create Target Structure
```bash
# Create all target directories
mkdir -p claudedocs/{00-index,01-architecture,02-research,03-vision,04-planning,05-implementation,06-testing,07-operations,08-workflows,99-archive}

# Create planning subdirectories
mkdir -p claudedocs/04-planning/{features,stories,defects,roadmaps,sprints,milestones,business}

# Create other subdirectories
mkdir -p claudedocs/02-research/synthesis
mkdir -p claudedocs/05-implementation/{guides,specifications,integration}
mkdir -p claudedocs/06-testing/{general,integration,reports}
mkdir -p claudedocs/07-operations/{monitoring,performance,procedures}
mkdir -p claudedocs/08-workflows/{deployment,scripts,hooks}
```

### Step 2: Create Index Files
1. Create `00-index/README.md` (navigation hub)
2. Create `00-index/STRUCTURE_SPECIFICATION.md` (this spec)
3. Create `00-index/GETTING_STARTED.md` (onboarding)
4. Create `00-index/QUICK_REFERENCE.md` (quick ref)
5. Create README.md for each top-level folder

### Step 3: Migrate Files
Execute migration script (to be created) that:
1. Moves files according to mapping
2. Updates internal links
3. Creates README files for new directories
4. Archives old structure

### Step 4: Update Cross-References
1. Update all internal links to reflect new structure
2. Update NAVIGATION.md in docs/
3. Update README.md files with correct paths

### Step 5: Validate
1. Verify all files migrated correctly
2. Check that no broken links exist
3. Validate structure matches specification
4. Test navigation flows

### Step 6: Archive Old Structure
Move current structure to:
- `99-archive/2025-11-reorganization/pre-migration-backup/`

---

## Benefits of New Structure

1. **Clear Lifecycle Progression**: Numbered folders (00-08) guide users through documentation logically
2. **Consolidated Planning**: All planning artifacts in one hub (04-planning/)
3. **Reduced Cognitive Load**: Fewer top-level folders to navigate
4. **Professional Organization**: Matches industry-standard documentation patterns
5. **LLM-Optimized**: Structure designed for AI agent navigation and understanding
6. **Scalable**: Easy to add new content without restructuring
7. **Separation of Concerns**: Clear distinction between LLM docs and human docs

---

## Migration Script Outline

```bash
#!/bin/bash
# docs-reorganization.sh

# 1. Create backup
# 2. Create target structure
# 3. Migrate files according to mapping
# 4. Update internal links
# 5. Create README files
# 6. Validate migration
# 7. Archive old structure
```

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Create migration script** based on detailed mapping
3. **Test migration** in isolated branch
4. **Execute migration** after approval
5. **Update documentation** with new structure
6. **Announce changes** to team

---

## Open Questions

1. Should we preserve git history for moved files? (Yes - use `git mv`)
2. How to handle files that fit multiple categories? (Use primary category + cross-reference)
3. Timeline for migration? (Suggest: 1-2 days)
4. Communication plan? (Update README.md with migration notice)

---

**Status:** Planning Complete - Awaiting Review
**Next:** Create detailed file mapping and migration script
