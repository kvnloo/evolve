# GitHub Pages Deployment Analysis

**Repository**: kvnloo/evolve
**Pages URL**: https://kvnloo.github.io/evolve/
**Analysis Date**: 2025-11-26

---

## Deployment Architecture

### Build System: Sphinx + Python (NOT Jekyll)

This repository uses **Sphinx** (Python documentation generator) with GitHub Actions workflow deployment, NOT Jekyll.

**Key Components**:
- **Static Site Generator**: Sphinx 6.0.0+
- **Markdown Parser**: MyST-Parser 4.0.0+
- **Theme**: Revitron Sphinx Theme (GitHub source)
- **Build Method**: GitHub Actions workflow (`docs.yml`)
- **Pages Build Type**: `workflow` (GitHub Actions artifact deployment)

---

## Build Process Flow

### 1. Trigger Conditions
```yaml
Triggers:
  - Push to main branch (docs/** changes)
  - Push to dev branch (docs/** changes)
  - Manual workflow dispatch
  - Changes to .github/workflows/docs.yml

Concurrency:
  - Group: "pages"
  - Cancel in-progress deployments: true
```

### 2. Build Steps (Ubuntu Latest)

**Step 1: Environment Setup**
```yaml
- Checkout repository (actions/checkout@v4)
- Python 3.11 setup (actions/setup-python@v5)
- Install pip + pipenv
```

**Step 2: Dependency Management**
```yaml
- Cache Pipenv virtualenv (~/.local/share/virtualenvs)
- Cache key: pipenv-{OS}-{Pipfile.lock-hash}
- Install dependencies via Pipfile
```

**Dependencies (Pipfile)**:
```ini
[packages]
sphinx = ">=6.0.0"
myst-parser = ">=4.0.0"
revitron-sphinx-theme = {file = "https://github.com/revitron/revitron-sphinx-theme/archive/master.zip"}

[dev-packages]
sphinx-autobuild = "*"

[requires]
python_version = "3.10"
```

**Step 3: Build Documentation**
```bash
Working directory: ./docs
Command: pipenv run sphinx-build -b html . _build/html -W --keep-going

Flags:
  -b html          → HTML output format
  -W               → Treat warnings as errors
  --keep-going     → Continue on warnings (but report)
```

**Step 4: Prepare Artifact**
```yaml
- Create .nojekyll file (disables Jekyll processing)
- Upload Pages artifact (docs/_build/html)
```

**Step 5: Deploy**
```yaml
- Deploy to GitHub Pages (actions/deploy-pages@v4)
- Environment: github-pages
- Output URL: Deployment page URL
```

---

## Sphinx Configuration (conf.py)

### Project Metadata
```python
project = 'Evolve'
author = 'Kevin Loo'
release = '1.0.0'
copyright = '2025, Kevin Loo'
```

### Extensions Enabled
```python
extensions = [
    'myst_parser',              # Markdown support
    'sphinx.ext.githubpages',   # Creates .nojekyll
    'sphinx.ext.intersphinx',   # Cross-project links
    'sphinx.ext.todo',          # TODO items
]
```

### MyST-Parser Features
All advanced MyST features enabled:
- Math rendering (amsmath, dollarmath)
- HTML admonitions and images
- Smart quotes and replacements
- Task lists and field lists
- Inline/block attributes
- Auto-linking (linkify)
- Strikethrough, colon fences, definition lists

### Theme Configuration
```python
Theme: revitron_sphinx_theme
Color Scheme: blue
Navigation:
  - Sticky navigation: true
  - Collapse navigation: false
  - Navigation depth: 4 levels
  - Titles only: false
GitHub Integration:
  - Banner: enabled
  - URL: https://github.com/kvnloo/evolve
```

### File Handling
```python
Source Formats: .rst, .md
Master Document: index.rst
Excluded Patterns:
  - _build/
  - archive/
  - *.sh (shell scripts)
  - *.csv (data files)
  - Thumbs.db, .DS_Store
```

---

## Documentation Structure

### Total Source Files: 86
**Formats**: Markdown (.md) + reStructuredText (.rst)

### Main Entry Point
**File**: `docs/index.rst`
**Type**: reStructuredText table of contents

**Table of Contents Sections**:
1. Getting Started (README, quick-start, installation)
2. Architecture & Overview (evolve-architecture, PROJECT-INDEX, performance_analysis)
3. Guides (CCPM workflow, development, hook system)
4. Implementation (capabilities, roadmap)
5. Reference (CCPM commands, agents, configuration)
6. Quick Reference (overview, commands)
7. Features (GitHub integration, research daemon)
8. Integration (hybrid agent system, installation plan, tests)
9. Analysis (capabilities gap, improvement plan, quality dashboard)
10. Troubleshooting (common issues, FAQ)
11. Migration & Blueprints (master migration, plans)

---

## GitHub Pages Settings

**Current Configuration**:
```json
{
  "build_type": "workflow",
  "source": {
    "branch": "main",
    "path": "/"
  },
  "homepage": "https://kvnloo.github.io/evolve/"
}
```

**Key Points**:
- Build type: `workflow` (GitHub Actions, NOT legacy branch deployment)
- Source branch: `main` (root path)
- No CNAME file (using default github.io domain)
- .nojekyll created during build (prevents Jekyll processing)

---

## Build Artifacts & Gitignore

### Generated Files (NOT tracked in Git)
```
docs/_build/        → Complete HTML site output
docs/_static/       → Theme static assets
docs/_templates/    → Custom templates
docs/.doctrees/     → Sphinx doctree cache
Pipfile.lock        → Python dependency lock
*.pyc               → Python bytecode
```

### Gitignore Configuration
```gitignore
# From root .gitignore
docs/_build/
docs/_static/
docs/_templates/
docs/.doctrees/
Pipfile.lock
*.pyc
```

**Rationale**: Build artifacts are generated during CI/CD and uploaded as Pages artifacts. Source files in `docs/` are tracked, built artifacts are ephemeral.

---

## Recent Deployment History

### Last 5 Workflow Runs
```
Run 1: 2025-11-26 18:50 (main)    → ✅ SUCCESS
Run 2: 2025-11-26 17:49 (dev)     → ❌ FAILURE
Run 3: 2025-11-22 07:43 (dev)     → ❌ FAILURE
Run 4: 2025-11-10 09:04 (main)    → ✅ SUCCESS
Run 5: 2025-11-10 09:02 (main)    → ✅ SUCCESS
```

**Observations**:
- `main` branch: Consistent success
- `dev` branch: Recent failures (2 consecutive)
- Latest deployment: Successful (26 Nov 2025)

---

## Potential Deployment Issues

### 🔴 Critical Issues

#### 1. Theme Dependency Source Instability
**Problem**: Theme installed from GitHub master ZIP
```python
# Pipfile line 9
revitron-sphinx-theme = {file = "https://github.com/revitron/revitron-sphinx-theme/archive/master.zip"}
```

**Risks**:
- No version pinning (always pulls latest master)
- Upstream changes can break builds unpredictably
- GitHub rate limits can cause download failures
- No checksum validation (security risk)

**Impact**: Build failures if upstream repo changes structure or has breaking updates

**Recommendation**: Pin to specific commit SHA or PyPI version
```python
# Better approach
revitron-sphinx-theme = {git = "https://github.com/revitron/revitron-sphinx-theme.git", ref = "abc123def"}
```

#### 2. Python Version Mismatch
**Problem**: Pipfile specifies Python 3.10, workflow uses 3.11
```yaml
# Pipfile requires 3.10
python_version = "3.10"

# docs.yml uses 3.11
python-version: '3.11'
```

**Risks**:
- Potential compatibility issues
- Unexpected behavior differences
- Dependency resolution conflicts

**Impact**: Low (minor versions usually compatible), but adds uncertainty

**Recommendation**: Align versions
```yaml
# Option 1: Match workflow to Pipfile
python-version: '3.10'

# Option 2: Update Pipfile to 3.11
python_version = "3.11"
```

### 🟡 Medium Issues

#### 3. Missing Pipfile.lock in Repository
**Observation**: `Pipfile.lock` is gitignored

**Pros**:
- Reduces repo size
- Avoids merge conflicts

**Cons**:
- Non-deterministic builds (dependency versions can drift)
- Harder to reproduce exact build environment
- `pipenv install --deploy` fails, falls back to `pipenv install`

**Current Workaround** (line 53 of workflow):
```yaml
pipenv install --deploy --ignore-pipfile || pipenv install
```

**Impact**: Builds succeed but dependencies may change between runs

**Recommendation**: Commit `Pipfile.lock` for reproducibility
```bash
# Remove from .gitignore
git add Pipfile.lock
git commit -m "Pin exact dependency versions"
```

#### 4. Strict Warning-as-Error Mode
**Setting**: Sphinx build uses `-W` flag (warnings = errors)

**Risks**:
- Broken internal links cause build failure
- Missing referenced files fail builds
- Malformed markdown/RST syntax blocks deployment

**Current Mitigation**: `--keep-going` flag continues on warnings

**Impact**: `dev` branch failures likely due to documentation issues

**Recommendation**: Review dev branch documentation for:
- Broken internal links
- Missing files referenced in toctrees
- Malformed markdown syntax

#### 5. Large Documentation Structure (86 Files)
**Observation**: Complex multi-section documentation

**Risks**:
- Link rot as files move/rename
- Difficult to maintain toctree consistency
- Higher chance of Sphinx warnings

**Impact**: Maintenance burden, potential for broken builds

**Recommendation**:
- Regular link validation (already have `links-check.yml` workflow)
- Document organization conventions
- Consider automated toctree generation

### 🟢 Low Priority Issues

#### 6. No Custom Domain (CNAME)
**Observation**: No CNAME file, using default github.io domain

**Impact**: None (working as designed)

**Note**: If custom domain desired, add `CNAME` file to `docs/_build/html/` during workflow

#### 7. Pipenv Cache May Grow Large
**Observation**: Caching `~/.local/share/virtualenvs`

**Impact**: Slight CI/CD performance impact if cache grows unbounded

**Recommendation**: Add cache cleanup or size limits if needed

---

## Workflow Permissions

**Current Permissions** (docs.yml):
```yaml
permissions:
  contents: read     # Read repository contents
  pages: write       # Write to GitHub Pages
  id-token: write    # Generate deployment tokens
```

**Security Posture**: ✅ Least-privilege (only necessary permissions)

---

## Deployment Testing Recommendations

### Local Build Testing
```bash
cd docs

# Install dependencies
pipenv install

# Build documentation locally
pipenv run sphinx-build -b html . _build/html -W --keep-going

# Preview locally
python -m http.server --directory _build/html 8000
# Open http://localhost:8000
```

### CI/CD Testing
```bash
# Test workflow syntax
gh workflow view docs.yml

# Trigger manual build
gh workflow run docs.yml --ref dev

# Monitor build
gh run watch
```

### Validation Checklist
- [ ] All toctree references resolve
- [ ] No broken internal links
- [ ] Markdown/RST syntax valid
- [ ] Theme renders correctly
- [ ] Search functionality works
- [ ] Navigation menus functional
- [ ] Mobile responsiveness

---

## Summary

### ✅ Working Correctly
- GitHub Actions workflow deployment functional
- Sphinx build process robust
- Main branch deployments succeed consistently
- Theme renders properly
- .nojekyll file prevents Jekyll interference
- Proper artifact-based deployment (workflow mode)

### ⚠️ Needs Attention
1. **Stabilize theme dependency** (pin version)
2. **Align Python versions** (Pipfile vs workflow)
3. **Consider committing Pipfile.lock** (reproducibility)
4. **Debug dev branch failures** (likely documentation issues)
5. **Maintain link hygiene** (86 files = link rot risk)

### 📊 Deployment Health
- **Build Success Rate (main)**: 100% (last 5 runs)
- **Build Success Rate (dev)**: 0% (last 2 runs)
- **Current Status**: ✅ Live and functional
- **Last Successful Deploy**: 2025-11-26 18:50 UTC

---

## Recommended Actions

### Immediate (High Priority)
```bash
# 1. Pin theme to specific version
cd docs
# Edit Pipfile to use git ref or PyPI version

# 2. Align Python version
# Edit Pipfile: python_version = "3.11"

# 3. Investigate dev branch failures
gh run view <failed-run-id> --log > failure-log.txt
# Review Sphinx warnings and broken links
```

### Short-term (Medium Priority)
```bash
# 4. Commit Pipfile.lock for reproducibility
git rm .gitignore # (remove Pipfile.lock entry)
cd docs && pipenv lock
git add Pipfile.lock
git commit -m "Pin exact Python dependencies"

# 5. Add documentation health checks
# Create pre-commit hook to validate links
# Run local builds before pushing to dev
```

### Long-term (Maintenance)
```bash
# 6. Regular dependency updates
pipenv update --outdated  # Check for updates
pipenv update             # Apply updates

# 7. Documentation reorganization (if needed)
# Reduce file count, consolidate sections
# Automated toctree generation

# 8. Consider custom domain
# Add CNAME file if desired
```

---

## Technical Debt Assessment

**Severity**: 🟡 **MEDIUM**

**Reasoning**:
- Site currently functional and deploying
- Main branch stable, dev branch has issues
- Theme dependency fragile but manageable
- No immediate outages, but preventable failures exist

**Effort to Resolve**: 2-4 hours

**Risk if Ignored**: Unpredictable build failures, harder debugging, version drift

---

## Additional Resources

- **Sphinx Documentation**: https://www.sphinx-doc.org/
- **MyST-Parser Docs**: https://myst-parser.readthedocs.io/
- **GitHub Pages Actions**: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow
- **Revitron Theme**: https://github.com/revitron/revitron-sphinx-theme

---

**End of Analysis**
