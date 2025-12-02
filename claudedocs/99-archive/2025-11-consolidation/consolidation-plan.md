# Documentation Consolidation Plan

**Generated**: 2025-11-06
**Purpose**: Eliminate duplicate documentation while preserving all unique content
**Target**: 50-70% reduction in documentation volume

---

## Executive Summary

Analysis identified **5 major duplicate sets** requiring consolidation:

1. **Quick-Start Guides** (6 versions → 1 consolidated)
2. **Architecture Documentation** (3 files → 1 comprehensive)
3. **Installation Guides** (scattered → 1 unified)
4. **Research Daemon Documentation** (2 locations → 1 canonical)
5. **Command References** (multiple → 1 authoritative)

Expected outcomes:
- **70% reduction** in duplicate content
- **Single source of truth** for each topic
- **Improved discoverability** through unified structure
- **Easier maintenance** with less redundancy

---

## 1. Quick-Start Guides Consolidation

### Current State (6 Files)

| File | Lines | Focus | Unique Content |
|------|-------|-------|----------------|
| `docs/QUICK-START-IMPLEMENTATION.md` | 1018 | Safety systems, SuperClaude install, SPARC | Week-by-week implementation timeline, safety verification scripts |
| `docs/QUICK-START-RESEARCH-HOOK.md` | 311 | Research autosave hook setup | Hook testing, memory access commands |
| `docs/getting-started/quick-start.md` | 362 | General framework setup | SPARC examples, PM system intro, troubleshooting |
| `docs/quick-start-epic-1.md` | 1083 | Epic 1 foundation infrastructure | Constitutional AI scripts, pre-commit hooks, security tests |
| `docs/statusline-enhancement/QUICK-START.md` | 276 | Statusline commands | Statusline configuration, workspace navigation |
| `docs/features/research-daemon/quickstart.md` | 245 | Research daemon quick test | 5-minute setup, monitoring commands |

**Total**: 3,295 lines across 6 files

### Consolidated Structure

**Target**: `docs/getting-started/quick-start-guide.md` (800-1000 lines)

```markdown
# Quick Start Guide

## Prerequisites (5 minutes)
- Node.js 18+, Git, Claude Code
- GitHub CLI authenticated
- [from getting-started/quick-start.md]

## Basic Setup (10 minutes)

### 1. Clone and Configure
[from getting-started/quick-start.md lines 17-59]

### 2. MCP Server Installation
[from getting-started/quick-start.md lines 42-69 + QUICK-START-IMPLEMENTATION.md lines 220-297]

### 3. Verify Installation
[from getting-started/quick-start.md lines 63-75]

## Framework-Specific Quick Starts

### SuperClaude Installation (30 minutes)
[from QUICK-START-IMPLEMENTATION.md lines 159-274]

### Research Daemon (5 minutes)
[from features/research-daemon/quickstart.md lines 1-245]

### Statusline Enhancement (10 minutes)
[from statusline-enhancement/QUICK-START.md lines 31-148]

### Research Hook Setup (15 minutes)
[from QUICK-START-RESEARCH-HOOK.md lines 7-89]

## Advanced Workflows

### Epic 1: Foundation Infrastructure (Week 1-4)
[from quick-start-epic-1.md, consolidated key sections]
- Day 1: SuperClaude + MCP (lines 38-157)
- Day 2: Multi-agent orchestration (lines 160-278)
- Day 3-4: Constitutional AI (lines 281-731)
- Day 5: BMAD/CCPM Integration (lines 734-865)

### Safety Systems Setup (CRITICAL)
[from QUICK-START-IMPLEMENTATION.md lines 9-156]

## Common Workflows
[from getting-started/quick-start.md lines 213-263]

## Troubleshooting
[Merge all troubleshooting sections from all 6 files]
```

### Migration Checklist

- [ ] Create unified `docs/getting-started/quick-start-guide.md`
- [ ] Merge prerequisite sections with deduplication
- [ ] Consolidate MCP server installation steps
- [ ] Create clear framework-specific subsections
- [ ] Combine all troubleshooting into single section
- [ ] Add internal navigation links for long document
- [ ] Test all commands and procedures
- [ ] Update all references in other docs
- [ ] Delete original 6 files
- [ ] Update README.md links

**Safe to Delete After Consolidation:**
- `docs/QUICK-START-IMPLEMENTATION.md`
- `docs/QUICK-START-RESEARCH-HOOK.md`
- `docs/quick-start-epic-1.md`
- `docs/statusline-enhancement/QUICK-START.md`
- `docs/features/research-daemon/quickstart.md`
- Keep `docs/getting-started/quick-start.md` as base, enhance it

---

## 2. Architecture Documentation Consolidation

### Current State (3 Files)

| File | Lines | Focus | Overlap % |
|------|-------|-------|-----------|
| `docs/architecture.md` | 501 | General architecture | 95% |
| `docs/reference/architecture-part1.md` | 501 | General architecture (duplicate) | 95% |
| `docs/reference/architecture-part2.md` | 2612 | Detailed 4-layer architecture | 40% |

**Analysis**:
- `architecture.md` and `architecture-part1.md` are **IDENTICAL** (501 lines each)
- `architecture-part2.md` is much more comprehensive (2612 lines)
- Part2 contains unique content:
  - Layer-by-layer deep dives
  - Technology decisions with rationale
  - Security architecture details
  - Deployment architecture
  - Integration patterns
  - ADR (Architecture Decision Records)

### Consolidated Structure

**Target**: `docs/architecture.md` (enhanced, 2800-3000 lines)

```markdown
# Architecture Overview

[Table of Contents - Enhanced]

## Quick Reference
[High-level diagrams and key concepts - from original architecture.md]

## System Architecture
[from architecture.md lines 14-62 + part2 lines 18-163]

## Layer Architecture

### Layer 1: Foundation
[from part2 lines 165-303]
- SuperClaude (Orchestration)
- Claude Code SDK (Multi-Agent)
- MCP Protocol
- Git Worktrees

### Layer 2: Knowledge
[from part2 lines 305-503]
- Neo4j/ChromaDB (RAG)
- DSPy (Optimization)
- PostgreSQL + pgvector (Skills)
- Hierarchical Knowledge Management

### Layer 3: Specialized
[from part2 lines 505-673]
- 3D Generation (Meshy/TripoSR)
- Blender/Unity MCP
- Constitutional AI
- LLM-as-Judge

### Layer 4: Autonomous
[from part2 lines 675-932]
- CrewAI/LangGraph
- Meta-Rewarding
- AI-Researcher
- Production Monitoring

## Technology Decisions
[from part2 lines 934-1388]

## Integration Architecture
[from architecture.md lines 324-367 + part2 lines 1390-1720]

## Deployment Architecture
[from part2 lines 1722-2096]

## Security Architecture
[from part2 lines 2098-2466]

## Design Principles
[from architecture.md lines 368-458]

## Architecture Decision Records
[from part2 lines 2573-2605]

## Extension Points & Future
[from architecture.md lines 462-495]
```

### Migration Checklist

- [ ] Use `architecture.md` as base structure
- [ ] Insert comprehensive layer details from part2
- [ ] Add technology decisions section
- [ ] Include deployment and security architecture
- [ ] Append ADRs at end
- [ ] Create TOC with anchor links
- [ ] Add cross-references between sections
- [ ] Delete duplicate part1
- [ ] Move part2 content into main architecture.md
- [ ] Update all documentation links

**Safe to Delete After Consolidation:**
- `docs/reference/architecture-part1.md` (100% duplicate)
- `docs/reference/architecture-part2.md` (content merged into architecture.md)

---

## 3. Installation Documentation

### Current State (Scattered)

Installation information appears in:
- `docs/integration/INSTALLATION-PLAN.md` (analysis phase, not actual guide)
- `docs/getting-started/quick-start.md` (lines 42-69: MCP setup)
- `docs/QUICK-START-IMPLEMENTATION.md` (lines 159-297: comprehensive)
- Various feature-specific quickstart files

**Gap**: No single comprehensive installation guide

### Recommended Structure

**Create**: `docs/installation.md` (400-500 lines)

```markdown
# Installation Guide

## System Requirements
- Operating systems supported
- Hardware requirements
- Software prerequisites

## Core Installation

### 1. Claude Code CLI
[Installation steps]

### 2. SuperClaude Framework
[from QUICK-START-IMPLEMENTATION.md lines 159-179]

### 3. MCP Server Configuration
[from QUICK-START-IMPLEMENTATION.md lines 220-297]

## Framework Components

### SPARC Methodology
[Installation and verification]

### CCPM (Project Management)
[Setup and configuration]

### Multi-Agent System
[Agent configuration]

## Optional Components

### Research Daemon
[from features/research-daemon/quickstart.md]

### 3D Generation Tools
[Meshy API / TripoSR setup]

### Advanced MCP Servers
[Context7, Playwright, etc.]

## Verification

### Health Checks
[Comprehensive verification steps]

### Troubleshooting Common Issues
[Consolidated from all sources]

## Next Steps
[Link to quick-start-guide.md]
```

### Migration Checklist

- [ ] Create new `docs/installation.md`
- [ ] Extract installation sections from quick-start files
- [ ] Organize by component and priority
- [ ] Add verification steps for each component
- [ ] Create troubleshooting section
- [ ] Link from README.md
- [ ] Update quick-start-guide.md to reference installation.md
- [ ] Remove installation details from quick-start files (keep only references)

---

## 4. Research Daemon Documentation

### Current State (2 Locations)

| Location | Files | Purpose |
|----------|-------|---------|
| `docs/features/research-daemon/` | `quickstart.md` (245 lines) | Quick 5-min setup |
| Root/archive | Multiple analysis/summary docs | Implementation details |

**Note**: Research daemon docs are mostly organized, just need consolidation

### Recommended Action

**Keep**: `docs/features/research-daemon/` as canonical location

**Consolidate**:
```
docs/features/research-daemon/
├── README.md (overview + links)
├── quickstart.md (5-min setup) ← KEEP AS IS
├── configuration.md (detailed config)
├── usage-guide.md (common patterns)
└── troubleshooting.md (common issues)
```

### Migration Checklist

- [ ] Create `docs/features/research-daemon/README.md` as index
- [ ] Keep `quickstart.md` unchanged (already concise)
- [ ] Extract configuration details into `configuration.md`
- [ ] Create `usage-guide.md` from scattered examples
- [ ] Consolidate troubleshooting into dedicated file
- [ ] Move archived analysis docs to `docs/archive/research-daemon/`
- [ ] Update main quick-start-guide.md to reference this directory

---

## 5. Command Reference Consolidation

### Current State (Scattered)

Command documentation appears in:
- `docs/quick-reference/commands.md` (primary reference)
- Various quick-start guides (examples)
- `CLAUDE.md` (project-specific commands)
- `.claude/commands/` (actual command files)

### Recommended Structure

**Enhance**: `docs/quick-reference/commands.md`

```markdown
# Command Reference

## Core Commands

### SPARC Methodology
```bash
npx claude-flow sparc modes              # List modes
npx claude-flow sparc tdd "feature"      # TDD workflow
npx claude-flow sparc run spec "task"    # Run specific mode
```

### Project Management (CCPM)
```bash
/pm:prd-new "Feature name"               # New PRD
/pm:epic-oneshot                         # Decompose & sync
/pm:issue-start <number>                 # Start work
/pm:next                                 # Next task
```

### SuperClaude Commands
```bash
/sc:research "query"                     # Deep research
/sc:implement "feature"                  # Implementation
/sc:test                                 # Testing
/sc:analyze                              # Code analysis
```

### Git Workflows
```bash
git checkout -b feature/name             # New branch
git worktree add ../epic-name -b epic/name
git commit -m "type(scope): message"
gh pr create
```

### MCP Operations
```bash
claude mcp add <name> <command>
claude mcp list
claude mcp test <name>
```

### Research Daemon
```bash
node .claude-flow/daemons/research-daemon.js start
node .claude-flow/daemons/research-daemon.js status
node .claude-flow/daemons/research-daemon.js logs [N]
```

## Command Categories

### Development
[Organized by workflow]

### Testing
[Test commands]

### Deployment
[Deployment commands]

### Troubleshooting
[Diagnostic commands]

## Quick Reference Card
[One-page cheat sheet]
```

### Migration Checklist

- [ ] Enhance existing `docs/quick-reference/commands.md`
- [ ] Extract all command examples from quick-starts
- [ ] Organize by category and frequency of use
- [ ] Add command options and flags
- [ ] Create quick reference card section
- [ ] Link from main documentation
- [ ] Remove duplicate command listings from quick-starts (keep only references)

---

## Implementation Strategy

### Phase 1: Preparation (Week 1)

**Days 1-2**: Analysis and Validation
- [ ] Review all files marked for consolidation
- [ ] Extract unique content from each file
- [ ] Create content mapping spreadsheet
- [ ] Identify potential conflicts or gaps

**Days 3-5**: Structure Design
- [ ] Design table of contents for each consolidated file
- [ ] Create internal navigation structure
- [ ] Plan cross-references between documents
- [ ] Define link update strategy

### Phase 2: Consolidation (Week 2)

**Days 1-2**: Quick-Start Guide
- [ ] Create consolidated quick-start-guide.md
- [ ] Test all procedures and commands
- [ ] Add internal navigation links
- [ ] Update external references

**Days 3-4**: Architecture Documentation
- [ ] Merge architecture files
- [ ] Add layer details from part2
- [ ] Create comprehensive TOC
- [ ] Test all links

**Day 5**: Installation, Research, Commands
- [ ] Create installation.md
- [ ] Organize research daemon docs
- [ ] Enhance command reference
- [ ] Cross-link all documents

### Phase 3: Cleanup (Week 3)

**Days 1-2**: Link Updates
- [ ] Update README.md
- [ ] Update CLAUDE.md references
- [ ] Update all documentation cross-references
- [ ] Fix broken links

**Days 3-4**: Deletion
- [ ] Archive duplicate files to `docs/archive/pre-consolidation/`
- [ ] Delete duplicates from active documentation
- [ ] Verify no broken links remain
- [ ] Test documentation navigation

**Day 5**: Validation
- [ ] Full documentation review
- [ ] Test all commands and procedures
- [ ] Verify completeness (no lost content)
- [ ] User acceptance testing

---

## Safe-to-Delete File List

**After successful consolidation and verification:**

### Quick-Start Consolidation
```bash
docs/QUICK-START-IMPLEMENTATION.md
docs/QUICK-START-RESEARCH-HOOK.md
docs/quick-start-epic-1.md
docs/statusline-enhancement/QUICK-START.md
docs/features/research-daemon/quickstart.md  # Keep if research daemon isolated
```

### Architecture Consolidation
```bash
docs/reference/architecture-part1.md         # 100% duplicate
docs/reference/architecture-part2.md         # Content merged
```

### Archive Candidates (move to docs/archive/)
```bash
docs/archive/epic-1/quick-start.md           # Epic-specific, historical
docs/archive/research-hook/*                 # Historical analysis docs
```

**Total Files to Delete**: 5-7 primary files
**Archive Candidates**: 10-15 historical/epic-specific files

---

## Quality Assurance Checklist

### Content Completeness
- [ ] All unique content from duplicates preserved
- [ ] No information loss during consolidation
- [ ] Examples and code snippets verified working
- [ ] All diagrams and images included

### Organization
- [ ] Logical flow from basic to advanced
- [ ] Clear section headings and hierarchy
- [ ] Table of contents with working links
- [ ] Cross-references between related sections

### Usability
- [ ] Quick-start can be completed in stated time
- [ ] Installation steps tested on clean system
- [ ] Commands verified against actual implementation
- [ ] Troubleshooting covers common issues

### Maintenance
- [ ] Single source of truth for each topic
- [ ] Clear ownership and review schedule
- [ ] Update process documented
- [ ] Deprecated docs clearly marked

---

## Success Metrics

### Quantitative
- **Documentation volume**: 3,295 lines (quick-starts) → ~1,000 lines (70% reduction)
- **File count**: 6 quick-start files → 1 consolidated guide (83% reduction)
- **Duplicate content**: 95% overlap (architecture) → 0% overlap
- **Search time**: Multiple file search → Single file navigation (5x faster)

### Qualitative
- **Discoverability**: Clear entry points for new users
- **Maintainability**: Single update updates all references
- **Consistency**: Unified voice and structure
- **Completeness**: All information accessible from single guide

---

## Next Steps

1. **Review and Approval**: Get sign-off on consolidation plan
2. **Execute Phase 1**: Complete preparation and validation
3. **Execute Phase 2**: Create consolidated documents
4. **Execute Phase 3**: Clean up and verify
5. **Documentation Review**: Full quality assurance pass
6. **Release**: Update main README with new structure

---

## Notes for Architecture Design

**Wait for architecture design before finalizing**:
- Final documentation structure should align with system architecture
- Navigation patterns should match component hierarchy
- Integration points should be clearly documented in both architecture and user guides
- Deployment documentation should reflect actual architecture decisions

**Recommended Sequence**:
1. Finalize system architecture design
2. Align documentation structure with architecture
3. Execute consolidation with architecture-aligned organization
4. Ensure documentation accurately reflects implemented architecture

---

**Status**: Ready for Review and Approval
**Estimated Effort**: 3 weeks (with testing and validation)
**Risk Level**: Low (archival strategy provides rollback safety)
