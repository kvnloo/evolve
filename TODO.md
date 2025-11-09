# TODO - GitHub Repository Setup

**Purpose**: This TODO file tracks tasks that will be converted to GitHub issues using CCPM (Claude Code PM) once installation is complete.

**Note**: CCPM is currently being installed. Once ready, these tasks will be properly tracked as GitHub issues with the full epic/issue workflow.

---

## ✅ Completed Tasks

### Phase 1: Core Community Health Files (COMPLETED)
**Priority**: P0 - Critical for community participation

#### Task: Create README.md
- **Status**: ✅ Completed
- **Description**: Created comprehensive project overview with features, quick start, usage examples, and architecture
- **File**: `README.md`
- **Details**:
  - Feature highlights (SPARC, multi-agent coordination, PM system)
  - Installation and setup instructions
  - Usage examples for SPARC workflow, custom commands, PM system
  - Architecture diagram and project structure
  - Links to documentation
- **Remaining**: Update placeholders (`kvnloo/evolve`)

#### Task: Create CONTRIBUTING.md
- **Status**: ✅ Completed
- **Description**: Created contributor guidelines following SPARC methodology
- **File**: `CONTRIBUTING.md`
- **Details**:
  - Development setup and workflow
  - SPARC methodology integration
  - Shell script style guidelines (`set -euo pipefail`, quotes, functions)
  - File organization rules
  - Testing requirements
  - Commit message conventions
  - Agent coordination protocol
  - Instructions for adding slash commands and helper scripts

#### Task: Create CODE_OF_CONDUCT.md
- **Status**: ✅ Completed
- **Description**: Added community standards using Contributor Covenant 2.1
- **File**: `CODE_OF_CONDUCT.md`
- **Details**:
  - Industry-standard code of conduct
  - Enforcement guidelines
  - Scope and reporting process
- **Remaining**: Update placeholder (`[INSERT CONTACT EMAIL]`)

#### Task: Create SECURITY.md
- **Status**: ✅ Completed
- **Description**: Created security policy and vulnerability reporting process
- **File**: `SECURITY.md`
- **Details**:
  - Vulnerability reporting process
  - Supported versions matrix
  - Security timeline commitments (48hr ack, severity-based fixes)
  - Best practices for contributors (shell scripts, input validation)
  - Known security considerations (path privacy, GitHub integration)
- **Remaining**: Update placeholder (`[INSERT SECURITY EMAIL]`)

#### Task: Create Implementation Plan
- **Status**: ✅ Completed
- **Description**: Documented complete GitHub setup plan with all phases
- **File**: `docs/github-setup-plan.md`
- **Details**: Full roadmap for repository improvements

---

## 📋 Pending Tasks

### Phase 2: Enhanced GitHub Features
**Priority**: P1 - Automation & engagement
**Estimated Effort**: 3-4 hours

#### Task: GitHub Actions Enhancements
- **Status**: ⏳ Pending
- **Description**: Add automated workflows for dependency updates, health checks, labeling
- **Subtasks**:
  - [ ] Add Dependabot configuration for GitHub Actions
  - [ ] Add community health file validation workflow
  - [ ] Add automated issue/PR labeling
  - [ ] Add stale issue management workflow
  - [ ] Add shell script linting workflow (shellcheck)

#### Task: Add FUNDING.yml
- **Status**: ⏳ Pending
- **Description**: Configure sponsorship options
- **File**: `.github/FUNDING.yml`
- **Subtasks**:
  - [ ] Determine sponsorship platforms (GitHub Sponsors, Open Collective, etc.)
  - [ ] Create configuration file

#### Task: Add CODEOWNERS
- **Status**: ⏳ Pending
- **Description**: Define code ownership and auto-assign reviewers
- **File**: `.github/CODEOWNERS`
- **Subtasks**:
  - [ ] Identify module owners
  - [ ] Define review requirements
  - [ ] Configure auto-assignment

#### Task: Enhance Issue Templates
- **Status**: ⏳ Pending
- **Description**: Add specialized templates for different request types
- **Files**: `.github/ISSUE_TEMPLATE/`
- **Subtasks**:
  - [ ] Add documentation request template
  - [ ] Add research request template
  - [ ] Add agent coordination issue template
  - [ ] Add template chooser configuration

### Phase 3: Documentation Expansion
**Priority**: P2 - Adoption & learning
**Estimated Effort**: 6-8 hours

#### Task: Add Common Documentation Files
- **Status**: ⏳ Pending
- **Description**: Create essential guides (without restructuring existing docs/)
- **Files**: `docs/`
- **Subtasks**:
  - [ ] Getting Started guide
  - [ ] Architecture documentation
  - [ ] Configuration reference (.claude/ structure)
  - [ ] Script reference (helpers and utilities)
  - [ ] Troubleshooting guide
  - [ ] FAQ

#### Task: Create Examples Directory
- **Status**: ⏳ Pending
- **Description**: Provide sample workflows and use cases
- **Directory**: `examples/`
- **Subtasks**:
  - [ ] Sample SPARC workflow examples
  - [ ] Common use case demonstrations
  - [ ] Integration examples with different tools
  - [ ] Example slash command implementations

#### Task: Create CHANGELOG.md
- **Status**: ⏳ Pending
- **Description**: Initialize version history tracking
- **File**: `CHANGELOG.md`
- **Format**: Keep a Changelog format with semantic versioning

#### Task: GitHub Pages Setup
- **Status**: ⏳ Pending
- **Description**: Set up documentation hosting
- **Subtasks**:
  - [ ] Configure GitHub Pages
  - [ ] Set up static site generation
  - [ ] Add version selector
  - [ ] Deploy initial documentation

### Phase 4: Community & Quality
**Priority**: P3 - Long-term growth
**Estimated Effort**: 4-6 hours

#### Task: Community Features
- **Status**: ⏳ Pending
- **Subtasks**:
  - [ ] Enable GitHub Discussions
  - [ ] Create GitHub Projects for roadmap
  - [ ] Set up all-contributors recognition
  - [ ] Schedule regular community calls (if applicable)

#### Task: Quality Automation
- **Status**: ⏳ Pending
- **Subtasks**:
  - [ ] Add shellcheck workflow for shell scripts
  - [ ] Add link checking in documentation
  - [ ] Add spelling/grammar checking
  - [ ] Add broken script detection

#### Task: Release Process
- **Status**: ⏳ Pending
- **Subtasks**:
  - [ ] Define semantic versioning strategy
  - [ ] Set up release notes generation
  - [ ] Configure changelog generation from commits
  - [ ] Create tag-based release workflow

---

## 🎯 Immediate Actions Needed

### Before Moving to Phase 2
1. **Update Placeholders**:
   - [ ] Replace `kvnloo/evolve` in README.md
   - [ ] Add contact email in CODE_OF_CONDUCT.md
   - [ ] Add security email in SECURITY.md

2. **Commit Phase 1 Work**:
   - [x] Commit all Phase 1 files
   - [ ] Push to repository

3. **CCPM Setup**:
   - [ ] Complete CCPM installation
   - [ ] Convert this TODO to proper GitHub issues
   - [ ] Create epic for "GitHub Repository Setup"
   - [ ] Sync with GitHub using `/pm:epic-oneshot`

---

## 📊 Progress Summary

- **Phase 1**: ✅ 100% Complete (4/4 tasks)
- **Phase 2**: ⏳ 0% Complete (0/4 tasks)
- **Phase 3**: ⏳ 0% Complete (0/4 tasks)
- **Phase 4**: ⏳ 0% Complete (0/3 tasks)

**Overall Progress**: 26.7% (4/15 tasks completed)

---

## Notes

- This TODO will be deprecated once CCPM is installed and issues are created
- See `docs/github-setup-plan.md` for detailed implementation plan
- All tasks follow open source best practices for configuration/script frameworks
- Shell script focus (not Node.js/npm) - Phase 2 from original plan was removed
