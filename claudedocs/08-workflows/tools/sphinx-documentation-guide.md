# Sphinx Documentation Setup Guide

**Consolidated**: 2025-11-26
**Sources**: research_sphinx_setup.md, research_ghpages_workflow.md, research_github_actions_sphinx.md, research_revitron_theme.md

Complete guide for setting up Sphinx documentation with GitHub Pages deployment.

---

## Table of Contents

1. [Core Sphinx Setup](#1-core-sphinx-setup)
2. [GitHub Pages Deployment](#2-github-pages-deployment)
3. [GitHub Actions CI/CD](#3-github-actions-cicd)
4. [Revitron Theme Configuration](#4-revitron-theme-configuration)

---

## 1. Core Sphinx Setup

### Installation

**Prerequisites**: Python 3.10+

```bash
# Install core packages
pip install sphinx myst-parser sphinx-autobuild
```

**Version Info (2025)**:
- myst-parser: v4.0.1
- Sphinx: v6+
- Python: 3.10-3.13 supported

### Project Initialization

```bash
cd /path/to/project
sphinx-quickstart docs
# Recommended: Separate source/build directories
```

**Created Structure**:
```
docs/
├── source/
│   ├── conf.py          # Configuration
│   ├── index.rst        # Root page
│   ├── _static/         # CSS, images
│   └── _templates/      # Custom templates
├── build/               # Generated output (gitignored)
└── Makefile
```

### Basic Configuration (conf.py)

```python
project = 'Your Project'
copyright = '2025, Your Name'
author = 'Your Name'
release = '1.0.0'

extensions = ['myst_parser']

source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

html_theme = 'alabaster'
```

### MyST-Parser Extensions

```python
myst_enable_extensions = [
    "dollarmath",      # $$ math $$
    "deflist",         # Definition lists
    "html_admonition", # Styled notes/warnings
    "colon_fence",     # ::: fence syntax
    "tasklist",        # - [ ] checkboxes
]
```

### Building

```bash
cd docs
make html              # Build HTML
make clean && make html  # Clean rebuild
sphinx-autobuild source build  # Live reload
```

---

## 2. GitHub Pages Deployment

### Orphan Branch Setup

```bash
# Create gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m "Initialize gh-pages"
git push --set-upstream origin gh-pages
git checkout main
```

### Git Worktree Approach (Recommended for Local Dev)

```bash
# One-time setup
git worktree add docs/_build/html gh-pages

# Build and deploy
cd docs && make clean && make html
cd _build/html
git add -A
git commit -m "Update documentation"
git push origin gh-pages
```

### GitHub Pages Configuration

1. Repository Settings → Pages
2. Source: `gh-pages` branch, `/ (root)` folder
3. Save and wait 1-3 minutes

**URL**: `https://<username>.github.io/<repository>/`

### Required Files

```bash
# .nojekyll - Prevent Jekyll processing
touch docs/_build/html/.nojekyll

# CNAME - Custom domain (optional)
echo "docs.example.com" > docs/_build/html/CNAME
```

---

## 3. GitHub Actions CI/CD

### Recommended Workflow

Create `.github/workflows/docs.yml`:

```yaml
name: Deploy Sphinx Documentation

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - '*.py'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Install dependencies
        run: |
          pip install sphinx myst-parser sphinx-rtd-theme

      - name: Build documentation
        run: |
          cd docs
          make html
          touch _build/html/.nojekyll

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/_build/html
          force_orphan: true
```

### Popular Actions

| Action | Use Case | Stars |
|--------|----------|-------|
| `sphinx-notes/pages` | Sphinx-specific deployment | 95+ |
| `peaceiris/actions-gh-pages` | Generic static deployment | 4,000+ |
| `ammaraskar/sphinx-action` | Build-only | 500+ |

### Path Filtering

Trigger only on documentation changes:

```yaml
on:
  push:
    paths:
      - 'docs/**'
      - 'source/**'
      - 'conf.py'
```

### Caching

Speed up builds with pip caching:

```yaml
- uses: actions/setup-python@v5
  with:
    python-version: '3.11'
    cache: 'pip'
    cache-dependency-path: docs/requirements.txt
```

---

## 4. Revitron Theme Configuration

### Installation

```bash
pip install https://github.com/revitron/revitron-sphinx-theme/archive/master.zip
```

**Status**: Production/Stable (v0.7.2), MIT License

### Configuration

```python
import revitron_sphinx_theme

extensions = ['revitron_sphinx_theme']
html_theme = 'revitron_sphinx_theme'

html_theme_options = {
    'color_scheme': '',  # '' (light) or 'dark'
    'canonical_url': '',
    'analytics_id': 'UA-XXXXXXX-1',
    'style_external_links': False,
    'logo_only': False,
    'display_version': True,
    'prev_next_buttons_location': 'bottom',
    'collapse_navigation': True,
    'sticky_navigation': True,
    'navigation_depth': 4,
    'includehidden': True,
    'titles_only': False,
}
```

### Landing Page

The theme supports a special landing page configuration with hero sections and feature grids.

### Alternatives

| Theme | Best For |
|-------|----------|
| `sphinx_rtd_theme` | Read the Docs hosting |
| `furo` | Modern, clean design |
| `pydata-sphinx-theme` | Scientific/data projects |
| `alabaster` | Minimal, lightweight |

---

## Quick Reference

### File Structure
```
project/
├── docs/
│   ├── source/
│   │   ├── conf.py
│   │   ├── index.rst
│   │   └── *.md
│   ├── build/
│   └── Makefile
├── .github/
│   └── workflows/
│       └── docs.yml
└── src/
```

### Common Commands
```bash
make html          # Build
make clean         # Clean build
make latexpdf      # PDF (requires LaTeX)
sphinx-autobuild . _build  # Live reload
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| CSS not loading | Add `.nojekyll` to root |
| 404 on subpages | Check toctree includes |
| Build warnings | Run `make clean` first |
| Import errors | Check `sys.path` in conf.py |
