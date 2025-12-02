# Sphinx Documentation on GitHub Pages: Orphan Branch Workflow

**Research Date:** 2025-11-09
**Research Focus:** Best practices for hosting Sphinx documentation on GitHub Pages using orphan gh-pages branch

## Executive Summary

This document provides a comprehensive guide for deploying Sphinx documentation to GitHub Pages using an orphan gh-pages branch. The research identifies three primary approaches (manual, git worktree, and automated CI/CD), with GitHub Actions being the recommended modern approach.

## Table of Contents

1. [Understanding Orphan Branches](#understanding-orphan-branches)
2. [Orphan Branch Setup](#orphan-branch-setup)
3. [GitHub Pages Configuration](#github-pages-configuration)
4. [Deployment Strategies](#deployment-strategies)
5. [Branch Management](#branch-management)
6. [Sphinx-Specific Considerations](#sphinx-specific-considerations)
7. [Common Pitfalls and Solutions](#common-pitfalls-and-solutions)
8. [Best Practices](#best-practices)

---

## 1. Understanding Orphan Branches

### What is an Orphan Branch?

An orphan branch is a Git branch that:
- Starts from an empty state with no prior commits
- Has no parent commit
- Creates a new, independent history tree
- Shares the same repository but has no shared history with other branches

**Source:** [Graph AI - Git Orphan Definition](https://www.graphapp.ai/engineering-glossary/git/orphan), [DEV Community - Orphan Branches](https://dev.to/scrabill/orphan-branches-in-git-1l12)

### Why Use Orphan Branches for GitHub Pages?

**Benefits:**
- **Clean Separation:** Website files remain completely separate from project source code
- **Independent History:** Documentation history doesn't clutter the main project history
- **Performance:** Smaller branch history means faster clones and checkouts
- **Organization:** Clear distinction between code and deployed documentation

**Common Use Cases:**
- GitHub Pages hosting (`gh-pages` branch convention)
- Documentation deployments
- Website hosting separate from source code
- Deployment artifacts storage

**Source:** [Stack Overflow - When Should Git Orphan Branches Be Used](https://stackoverflow.com/questions/13202705/when-should-git-orphaned-branches-be-used), [Graphite - Understanding Orphan Branches](https://graphite.com/guides/git-orphan-branches)

---

## 2. Orphan Branch Setup

### Method 1: Basic Orphan Branch Creation

**Step-by-step process:**

```bash
# 1. Navigate to your project root
cd /path/to/your/project

# 2. Create the orphan branch
git checkout --orphan gh-pages

# 3. Remove all files from the working tree
git rm -rf .

# 4. Create an initial empty commit (recommended)
git commit --allow-empty -m "Initialize gh-pages branch"

# 5. Push the branch to remote
git push --set-upstream origin gh-pages

# 6. Return to your main branch
git checkout main
```

**Source:** [GitHub Gist - Creating Clean gh-pages Branch](https://gist.github.com/ramnathv/2227408), [Gary Ewan Park - Create gh-pages Branch](https://www.gep13.co.uk/blog/how-to-create-gh-pages-branch)

**Important Notes:**
- The `--orphan` option creates a branch with no commit history
- `git rm -rf .` removes all tracked files but doesn't delete untracked files
- The empty commit provides a starting point for the branch history

### Method 2: Git Worktree Approach (Recommended for Local Development)

The git worktree approach allows you to work with the gh-pages branch without constantly switching branches.

```bash
# 1. Ensure you're on main branch
git checkout main

# 2. Create the orphan branch if it doesn't exist
git checkout --orphan gh-pages
git commit --allow-empty -m "Initialize gh-pages"
git push origin gh-pages
git checkout main

# 3. Remove any existing html directory
rm -rf docs/_build/html

# 4. Mount gh-pages branch as a subdirectory
git worktree add docs/_build/html gh-pages
```

**Benefits of Worktree Approach:**
- No branch switching required
- Build directly into the deployment directory
- Simplified commit and push workflow
- Ideal for local development and testing

**Source:** [Sphinx Tutorial - Hosting on GitHub Pages](https://olgarithms.github.io/sphinx-tutorial/docs/7-hosting-on-github-pages.html), [CodeRefinery - Deploying Sphinx to GitHub Pages](https://coderefinery.github.io/documentation/gh_workflow/)

**Using the Worktree:**

```bash
# Build documentation (automatically builds into worktree)
cd docs
make clean
make html

# Commit and push from the worktree
cd _build/html
git add -A
git commit -m "Update documentation"
git push origin gh-pages

# Return to main project
cd ../../..
```

---

## 3. GitHub Pages Configuration

### Enabling GitHub Pages

After creating and pushing your gh-pages branch:

**Via GitHub Web Interface:**

1. Navigate to your repository on GitHub
2. Click **Settings** (repository settings, not account settings)
3. Click **Pages** in the left sidebar
4. Under "Source":
   - Select branch: `gh-pages`
   - Select folder: `/ (root)` (unless using `/docs`)
5. Click **Save**
6. Wait 1-3 minutes for deployment

**Source:** [Sphinx Tutorial - GitHub Pages Setup](https://olgarithms.github.io/sphinx-tutorial/docs/7-hosting-on-github-pages.html), [CodeRefinery Tutorial](https://coderefinery.github.io/documentation/gh_workflow/)

### Configuration Options

**Branch Source Options:**
- `gh-pages` branch (root) - **Recommended for Sphinx**
- `main` branch with `/docs` folder - Alternative for simple sites
- `main` branch (root) - Not recommended for documentation

**Custom Domain (Optional):**
- Add a `CNAME` file with your domain to the gh-pages branch root
- Configure DNS settings at your domain registrar
- Enable HTTPS after domain verification

**Source:** [GitHub Docs - Configuring Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

### Automatic Configuration

When a gh-pages branch is first created and pushed, GitHub automatically:
- Detects the new branch
- Publishes it to GitHub Pages (if Pages is enabled)
- Uses the source found in the root directory
- Generates a URL: `https://<username>.github.io/<repository>/`

**Source:** [usethis R Package - Use GitHub Pages](https://usethis.r-lib.org/reference/use_github_pages.html)

---

## 4. Deployment Strategies

### Strategy 1: Manual Deployment (Not Recommended)

**Process:**
```bash
# 1. Build documentation
cd docs
make html

# 2. Switch to gh-pages branch
git checkout gh-pages

# 3. Copy built files
cp -r _build/html/* .

# 4. Commit and push
git add -A
git commit -m "Update documentation"
git push origin gh-pages

# 5. Return to main
git checkout main
```

**Drawbacks:**
- Error-prone manual process
- Risk of forgetting steps
- No automation
- Tedious for frequent updates

### Strategy 2: Git Worktree Deployment (Semi-Automated)

**Setup:**
```bash
# One-time setup
git worktree add docs/_build/html gh-pages
```

**Deployment script** (`deploy.sh`):
```bash
#!/bin/bash
set -e

echo "Building Sphinx documentation..."
cd docs
make clean
make html

echo "Committing to gh-pages..."
cd _build/html
git add -A
git commit -m "Deploy documentation: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin gh-pages

echo "✅ Documentation deployed successfully!"
cd ../../..
```

**Usage:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Source:** [Executable Opinions - Sphinx and GitHub Pages](https://executableopinions.readthedocs.io/en/latest/labs/gh-pages/gh-pages.html)

### Strategy 3: GitHub Actions Automation (Recommended)

The modern, recommended approach using CI/CD automation.

**Complete GitHub Actions Workflow** (`.github/workflows/docs.yml`):

```yaml
name: Deploy Sphinx Documentation to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      # Checkout repository
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for proper versioning

      # Set up Python environment
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'

      # Install dependencies
      - name: Install dependencies
        run: |
          pip install -U pip
          pip install sphinx sphinx_rtd_theme myst-parser
          # Add any additional Sphinx extensions here

      # Build documentation
      - name: Build Sphinx documentation
        run: |
          cd docs
          make clean
          make html
          # Ensure .nojekyll exists
          touch _build/html/.nojekyll

      # Deploy to GitHub Pages
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/_build/html
          publish_branch: gh-pages
          force_orphan: true
          user_name: 'github-actions[bot]'
          user_email: 'github-actions[bot]@users.noreply.github.com'
          commit_message: 'Deploy documentation: ${{ github.sha }}'
```

**Key Configuration Options Explained:**

- `publish_dir: ./docs/_build/html` - Directory containing built HTML files
- `publish_branch: gh-pages` - Target branch for deployment
- `force_orphan: true` - Keeps only the latest commit (clean history)
- `github_token: ${{ secrets.GITHUB_TOKEN }}` - Automatically provided by GitHub

**Source:** [Sphinx Documentation - Deploying](https://www.sphinx-doc.org/en/master/tutorial/deploying.html), [peaceiris/actions-gh-pages Documentation](https://github.com/peaceiris/actions-gh-pages)

**Benefits:**
- ✅ Automatic deployment on every push to main
- ✅ Consistent, reproducible builds
- ✅ No manual intervention required
- ✅ Pull request previews (can be configured)
- ✅ Clean commit history with `force_orphan`

**Alternative: Using Sphinx-Specific Actions**

```yaml
      # Alternative build step using pre-built action
      - name: Build Sphinx with Action
        uses: ammaraskar/sphinx-action@master
        with:
          docs-folder: "docs/"
```

**Source:** [Stack Overflow - GitHub Actions Sphinx Deployment](https://stackoverflow.com/questions/57989790/using-github-actions-to-publish-documentation)

---

## 5. Branch Management

### Keeping gh-pages Separate from Development

**Key Principles:**

1. **Never merge gh-pages into main** - They have incompatible histories
2. **Never merge main into gh-pages** - Keep deployment branch clean
3. **Treat gh-pages as a deployment target only** - Not a development branch
4. **Use force updates** - History doesn't matter for static files

**Source:** [Stack Overflow - Using Orphan Branches](https://stackoverflow.com/questions/72194830/using-orphan-branches-to-host-a-project-on-gh-pages)

### Managing Branch Relationships

**Viewing branches:**
```bash
# List all branches
git branch -a

# View branch history
git log --all --graph --oneline

# Orphan branches show no shared history
```

**Working with both branches:**
```bash
# Stay on main for development
git checkout main

# Never directly work on gh-pages manually
# Let automation or worktree handle gh-pages

# If using worktree, gh-pages is accessible at docs/_build/html
ls docs/_build/html  # Shows gh-pages content
```

### Cleaning Up Old Worktrees

If you need to remove a worktree:

```bash
# Remove the worktree
git worktree remove docs/_build/html

# Or if that fails, prune stale worktrees
git worktree prune
```

### GitHub UI Behavior

**Important Note:** GitHub may show suggestions like "gh-pages is X commits ahead/behind main." This is misleading because orphan branches have no shared history. You can safely ignore these messages.

**Source:** [GitHub Discussion - Orphan Branch Treatment](https://github.com/orgs/community/discussions/125555)

---

## 6. Sphinx-Specific Considerations

### The .nojekyll File (Critical)

**The Problem:**
GitHub Pages uses Jekyll by default. Jekyll ignores files and directories starting with underscores (`_`). Sphinx generates:
- `_static/` - CSS, JavaScript, and images
- `_sources/` - Source files for "Show Source" links
- Other `_*` directories

Without `.nojekyll`, these files return 404 errors, breaking CSS and functionality.

**The Solution:**

**Option 1: Manual .nojekyll file**
```bash
# In your gh-pages branch root (or docs/_build/html with worktree)
touch .nojekyll
git add .nojekyll
git commit -m "Disable Jekyll processing"
```

**Option 2: Automatic via Sphinx Extension (Recommended)**

Add to `docs/conf.py`:
```python
extensions = [
    'sphinx.ext.githubpages',
    # ... other extensions
]
```

This extension automatically creates `.nojekyll` during `make html`.

**Source:** [Stack Overflow - Sphinx CSS Not Working](https://stackoverflow.com/questions/59486442/python-sphinx-css-not-working-on-github-pages), [Sphinx Contrib - GitHub Pages](https://sphinxcontrib-versioning.readthedocs.io/en/latest/github_pages.html)

**Verification:**
After deployment, check:
```
https://<username>.github.io/<repository>/.nojekyll
```
Should show an empty page (not 404).

### Alternative: Force Include in _config.yml (Not Recommended)

Some sources suggest creating `_config.yml` in gh-pages:
```yaml
include:
  - _static
  - _sources
```

However, using `.nojekyll` is simpler and more reliable.

**Source:** [Stack Overflow - Sphinx HTML Display Issues](https://stackoverflow.com/questions/62626125/github-pages-with-sphinx-generated-documentation-not-displaying-html-correctly)

### Sphinx Build Directory Structure

**Typical Sphinx Output:**
```
docs/_build/html/
├── .nojekyll                    # Critical for GitHub Pages
├── index.html                   # Entry point
├── _static/                     # CSS, JS, images
│   ├── css/
│   ├── js/
│   └── ...
├── _sources/                    # Source .rst files
├── _images/                     # Generated images
├── search.html
├── genindex.html
└── ... (other HTML files)
```

**What gets deployed:** Everything inside `docs/_build/html/` goes to the gh-pages branch root.

### Sphinx Configuration Best Practices

**Essential conf.py settings for GitHub Pages:**

```python
# docs/conf.py

# Project information
project = 'Your Project Name'
author = 'Your Name'

# GitHub Pages extension (adds .nojekyll automatically)
extensions = [
    'sphinx.ext.githubpages',  # Critical!
    # Other useful extensions:
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'sphinx.ext.viewcode',
    'myst_parser',  # For Markdown support
]

# HTML output options
html_theme = 'sphinx_rtd_theme'  # Or your preferred theme
html_static_path = ['_static']

# If using custom domain
# html_baseurl = 'https://yourdomain.com/'

# Generate sitemap (optional but recommended)
html_use_opensearch = 'https://<username>.github.io/<repository>/'
```

**Source:** [Sphinx Documentation - Configuration](https://www.sphinx-doc.org/en/master/usage/configuration.html)

### Theme Considerations

**Popular themes compatible with GitHub Pages:**
- `sphinx_rtd_theme` (Read the Docs theme) - Most popular
- `alabaster` (Sphinx default)
- `pydata_sphinx_theme`
- `furo` - Modern, clean design
- `book` theme (from sphinx-book-theme)

**Installing themes:**
```bash
pip install sphinx_rtd_theme
# or
pip install furo
```

**Source:** [Sphinx Themes Gallery](https://sphinx-themes.org/)

---

## 7. Common Pitfalls and Solutions

### Issue 1: CSS and Static Files Not Loading (404 Errors)

**Symptoms:**
- Documentation displays as plain unstyled HTML
- Browser console shows 404 errors for `_static/*` files
- Images don't display

**Root Cause:** Jekyll processing is enabled (no `.nojekyll` file)

**Solution:**
```python
# Add to docs/conf.py
extensions = ['sphinx.ext.githubpages']
```
Then rebuild and redeploy.

**Verification:**
- View page source
- Check that CSS files are loaded: `_static/css/theme.css`
- Check browser Network tab for 404 errors

**Source:** [Stack Overflow - Sphinx CSS Issues](https://stackoverflow.com/questions/59486442/python-sphinx-css-not-working-on-github-pages), [Yes You Can Use GitHub Pages with Sphinx](https://www.docslikecode.com/articles/github-pages-python-sphinx/)

---

### Issue 2: .nojekyll File Not Taking Effect

**Symptoms:**
- `.nojekyll` file exists but underscore files still return 404

**Solutions:**

**A. Check file placement:**
```bash
# .nojekyll must be at the root of gh-pages branch
git checkout gh-pages
ls -la  # Should show .nojekyll at root
```

**B. Verify file was committed:**
```bash
git log --all --full-history -- .nojekyll
```

**C. Check GitHub Pages source setting:**
- Go to Settings → Pages
- Ensure "Source" is set to `gh-pages` branch, `/ (root)` folder

**D. Wait for GitHub to rebuild:**
- Changes can take 1-5 minutes to propagate
- Force refresh in browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

**Source:** [Stack Overflow - .nojekyll Not Working](https://stackoverflow.com/questions/47356997/pushed-nojekyll-file-to-github-pages-no-effect)

---

### Issue 3: Documentation Shows 404 Page

**Symptoms:**
- Navigating to `https://<username>.github.io/<repository>/` shows 404

**Possible Causes & Solutions:**

**A. GitHub Pages not enabled:**
- Go to Settings → Pages
- Enable GitHub Pages and select gh-pages branch

**B. index.html missing:**
```bash
git checkout gh-pages
ls  # Should show index.html
```
If missing, rebuild Sphinx documentation.

**C. Wrong branch or folder selected:**
- Ensure "Source" is `gh-pages` branch, `/ (root)` folder

**D. Repository is private:**
- GitHub Pages requires a public repository (free tier)
- Or GitHub Pro/Enterprise for private repositories

**E. First deployment delay:**
- Initial deployment can take 5-10 minutes
- Check Actions tab for deployment status

---

### Issue 4: GitHub Actions Workflow Fails

**Common failure scenarios:**

**A. Permission denied errors:**

**Solution:** Ensure workflow has write permissions:
```yaml
permissions:
  contents: write
```

**B. Build failures:**
```
sphinx-build: command not found
```

**Solution:** Install Sphinx and dependencies:
```yaml
- name: Install dependencies
  run: |
    pip install -U pip
    pip install sphinx sphinx_rtd_theme
```

**C. peaceiris/actions-gh-pages fails:**
```
Error: The deploy step encountered an error: The process '/usr/bin/git' failed
```

**Solutions:**
- Check that `publish_dir` points to correct location
- Verify `github_token` is properly configured
- Ensure GitHub Pages is enabled in repository settings

**D. Requirements file not found:**

**Solution:** Create `docs/requirements.txt`:
```
sphinx>=7.0
sphinx_rtd_theme
myst-parser
# Add other extensions
```

Then install in workflow:
```yaml
- name: Install dependencies
  run: |
    pip install -r docs/requirements.txt
```

**Source:** [Sphinx RTD Theme Installation](https://sphinx-rtd-theme.readthedocs.io/en/stable/installing.html)

---

### Issue 5: Merge Conflicts Between Branches

**Symptoms:**
- Git suggests merging gh-pages with main
- Merge conflicts appear

**Root Cause:** Attempting to merge orphan branches (they have no shared history)

**Solution:** Never merge orphan branches!

```bash
# If you accidentally started a merge
git merge --abort

# Correct approach: Deploy to gh-pages, don't merge
# Use automation or worktree for updates
```

**Source:** [Stack Overflow - Orphan Branch Usage](https://stackoverflow.com/questions/13202705/when-should-git-orphaned-branches-be-used)

---

### Issue 6: Old Documentation Persists After Updates

**Symptoms:**
- Documentation doesn't update after push
- Old content still visible

**Solutions:**

**A. Browser cache:**
```
Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

**B. Check GitHub Actions:**
- Go to Actions tab
- Verify workflow completed successfully
- Check deployment logs

**C. GitHub Pages rebuild delay:**
- Wait 1-5 minutes after deployment
- Check Settings → Pages for deployment status

**D. Check gh-pages branch:**
```bash
git checkout gh-pages
git log -1  # Should show recent commit
git show HEAD:index.html  # Check content
```

---

### Issue 7: Relative Links Broken

**Symptoms:**
- Internal links return 404
- Assets load from wrong paths

**Root Cause:** Incorrect base URL configuration for project pages

**Solution:** For project pages (not user/org pages), configure:

```python
# docs/conf.py
html_baseurl = 'https://<username>.github.io/<repository>/'
```

Or use relative URLs in documentation:
```rst
:doc:`/path/to/other/page`  # Absolute from root
:doc:`../relative/path`     # Relative path
```

**Source:** [Sphinx Documentation - HTML Options](https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-html_baseurl)

---

## 8. Best Practices

### Documentation Structure

**Recommended project layout:**
```
project/
├── .github/
│   └── workflows/
│       └── docs.yml              # CI/CD workflow
├── docs/
│   ├── conf.py                   # Sphinx configuration
│   ├── index.rst                 # Documentation root
│   ├── requirements.txt          # Documentation dependencies
│   ├── _static/                  # Custom CSS/JS
│   ├── _templates/               # Custom templates
│   └── ... (other .rst files)
├── src/                          # Source code
├── tests/                        # Tests
├── README.md
└── requirements.txt              # Project dependencies
```

**Source:** [Sphinx Documentation - Tutorial](https://www.sphinx-doc.org/en/master/tutorial/)

---

### Development Workflow

**Recommended workflow for documentation updates:**

1. **Create feature branch:**
   ```bash
   git checkout -b docs/update-api-reference
   ```

2. **Make documentation changes:**
   ```bash
   cd docs
   # Edit .rst files
   ```

3. **Build and test locally:**
   ```bash
   make clean html
   open _build/html/index.html  # Or firefox, chrome, etc.
   ```

4. **Commit and push:**
   ```bash
   git add docs/
   git commit -m "docs: Update API reference"
   git push origin docs/update-api-reference
   ```

5. **Create pull request:**
   - GitHub Actions will build documentation automatically
   - Review can include documentation preview

6. **Merge to main:**
   - After merge, GitHub Actions deploys to gh-pages automatically

---

### Dependency Management

**Create docs/requirements.txt:**
```
# Core Sphinx
sphinx>=7.0.0

# Theme
sphinx_rtd_theme>=2.0.0

# Extensions
sphinx-autodoc-typehints>=1.25.0
sphinx-copybutton>=0.5.0
myst-parser>=2.0.0

# Additional tools
sphinx-autobuild>=2021.3.14  # Live reload during development
```

**Install locally:**
```bash
pip install -r docs/requirements.txt
```

**Use in GitHub Actions:**
```yaml
- name: Install dependencies
  run: pip install -r docs/requirements.txt
```

**Benefits:**
- Reproducible builds
- Version pinning
- Easy dependency updates

---

### Local Development Setup

**Using sphinx-autobuild for live reload:**

```bash
# Install sphinx-autobuild
pip install sphinx-autobuild

# Run live server
cd docs
sphinx-autobuild . _build/html --open-browser

# Documentation auto-rebuilds on file changes
# Browser auto-refreshes
```

Access at: `http://127.0.0.1:8000`

**Source:** [sphinx-autobuild Documentation](https://github.com/executablebooks/sphinx-autobuild)

---

### Version Control Practices

**What to commit:**
- ✅ Source files (`.rst`, `.md`)
- ✅ `conf.py`
- ✅ `requirements.txt`
- ✅ Custom themes/templates
- ✅ GitHub Actions workflows

**What NOT to commit:**
- ❌ `_build/` directory (add to `.gitignore`)
- ❌ `.doctrees/`
- ❌ Compiled HTML files on main branch

**.gitignore for Sphinx:**
```gitignore
# Sphinx build outputs
docs/_build/
docs/_static/
docs/_templates/

# Sphinx cache
.doctrees/

# IDE files
.vscode/
.idea/
```

---

### Security Considerations

**GitHub Token Security:**
- ✅ Use `${{ secrets.GITHUB_TOKEN }}` - automatically provided, scoped correctly
- ❌ Never create custom Personal Access Tokens for public repos
- ✅ Limit workflow permissions:
  ```yaml
  permissions:
    contents: write  # Only what's needed
  ```

**Dependency Security:**
- Use Dependabot to keep dependencies updated
- Review security advisories for Sphinx extensions
- Pin major versions, allow patch updates:
  ```
  sphinx>=7.0,<8.0
  ```

**Source:** [GitHub Actions Security Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)

---

### Performance Optimization

**Build optimization:**
```python
# docs/conf.py

# Parallel reading (faster builds)
numfigs = True
parallel = 4  # Number of parallel jobs

# Smart rebuild (only changed files)
# Automatically enabled with -E flag
```

**GitHub Actions optimization:**
```yaml
- name: Set up Python
  uses: actions/setup-python@v5
  with:
    python-version: '3.11'
    cache: 'pip'  # Cache pip dependencies
```

**force_orphan optimization:**
```yaml
force_orphan: true  # Keeps only latest commit
```
Reduces gh-pages branch size over time.

---

### Testing Documentation

**Local testing checklist:**
- [ ] All pages build without errors
- [ ] Links work correctly (internal and external)
- [ ] Images display properly
- [ ] Code blocks render correctly
- [ ] Search functionality works
- [ ] Mobile responsive display

**Automated link checking:**
```bash
# Check for broken links
cd docs
make linkcheck
```

**Source:** [Sphinx Documentation - Builders](https://www.sphinx-doc.org/en/master/usage/builders/index.html#sphinx.builders.linkcheck.CheckExternalLinksBuilder)

---

### Monitoring and Maintenance

**Regular maintenance tasks:**
1. Update dependencies quarterly
2. Check for broken external links
3. Review and update outdated content
4. Monitor GitHub Actions success rate
5. Check deployment times

**GitHub Actions insights:**
- Go to Actions tab
- Review workflow runs
- Check deployment history
- Monitor build times

**GitHub Pages analytics:**
- Use Google Analytics (optional)
- Monitor traffic patterns
- Identify popular documentation pages

---

## Complete Working Example

Here's a complete, working setup from scratch:

### Step 1: Initialize Sphinx Documentation

```bash
# In your project root
mkdir docs
cd docs
sphinx-quickstart
```

Follow prompts:
- Separate source and build directories? `n`
- Project name: `Your Project`
- Author name(s): `Your Name`
- Project release: `1.0`

### Step 2: Configure Sphinx

Edit `docs/conf.py`:
```python
project = 'Your Project'
author = 'Your Name'

extensions = [
    'sphinx.ext.githubpages',  # Critical for GitHub Pages!
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'myst_parser',
]

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']
```

### Step 3: Create Documentation Content

Edit `docs/index.rst`:
```rst
Welcome to Your Project!
========================

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   installation
   usage
   api

Introduction
------------

Your project description here.
```

### Step 4: Add .gitignore

Create `.gitignore`:
```gitignore
# Sphinx
docs/_build/
```

### Step 5: Create GitHub Actions Workflow

Create `.github/workflows/docs.yml`:
```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Install dependencies
        run: |
          pip install sphinx sphinx_rtd_theme myst-parser

      - name: Build docs
        run: |
          cd docs
          make html

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/_build/html
          force_orphan: true
```

### Step 6: Push to GitHub

```bash
git add .
git commit -m "Initial Sphinx documentation setup"
git push origin main
```

### Step 7: Enable GitHub Pages

1. Go to repository Settings → Pages
2. Select branch: `gh-pages`
3. Select folder: `/ (root)`
4. Click Save

### Step 8: Wait and Verify

- Wait 2-3 minutes
- Visit `https://<username>.github.io/<repository>/`
- Documentation should be live!

---

## Troubleshooting Checklist

If documentation isn't working, check:

- [ ] GitHub Actions workflow completed successfully
- [ ] gh-pages branch exists and has content
- [ ] GitHub Pages is enabled (Settings → Pages)
- [ ] Source is set to gh-pages branch, / (root)
- [ ] .nojekyll file exists in gh-pages branch root
- [ ] index.html exists in gh-pages branch root
- [ ] Repository is public (or you have GitHub Pro)
- [ ] Wait 5 minutes after first deployment
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Check Actions tab for deployment errors

---

## Additional Resources

### Official Documentation
- [Sphinx Documentation](https://www.sphinx-doc.org/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)

### Tutorials and Guides
- [Sphinx Tutorial by Olgarithms](https://olgarithms.github.io/sphinx-tutorial/)
- [CodeRefinery Sphinx Tutorial](https://coderefinery.github.io/documentation/)
- [Real Python - Documenting Python Code](https://realpython.com/documenting-python-code/)

### Community Resources
- [Sphinx Themes Gallery](https://sphinx-themes.org/)
- [Awesome Sphinx](https://github.com/yoloseem/awesome-sphinxdoc)
- [Stack Overflow - Sphinx Tag](https://stackoverflow.com/questions/tagged/python-sphinx)

---

## Conclusion

Deploying Sphinx documentation to GitHub Pages using an orphan gh-pages branch is a well-established, reliable workflow with three primary approaches:

1. **Manual deployment** - Simple but error-prone
2. **Git worktree** - Good for local development and testing
3. **GitHub Actions** - **Recommended** for production use

The GitHub Actions approach provides automatic, consistent deployments with minimal maintenance overhead. The critical requirement for Sphinx on GitHub Pages is the `.nojekyll` file, which can be automatically added using the `sphinx.ext.githubpages` extension.

With proper setup, this workflow provides professional, automatically-updated documentation that stays in sync with your codebase.

---

**Document Version:** 1.0
**Last Updated:** 2025-11-09
**Research Sources:** 25+ technical articles, official documentation, and community tutorials
