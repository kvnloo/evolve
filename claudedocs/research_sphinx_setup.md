# Sphinx Documentation Setup Research

**Research Date**: 2025-11-09
**Research Agent**: Deep Research Mode
**Objective**: Comprehensive guide for setting up Sphinx with MyST-Parser and Autodoc

---

## Executive Summary

Sphinx is a powerful documentation generator for Python projects that can automatically generate API documentation from docstrings, parse Markdown files, and produce professional HTML/PDF output. This research covers the complete setup process including:

- **Core Sphinx Setup**: Latest version compatibility (v6+), Python 3.10+ support
- **MyST-Parser Integration**: Modern Markdown support (v4.0.1) with extended CommonMark syntax
- **Autodoc Configuration**: Automatic API documentation generation from Python docstrings
- **Best Practices**: Professional configuration patterns and common pitfall avoidance

**Key Finding**: The latest myst-parser (v4.0.1, Feb 2025) has no strict Sphinx version pinning, works with Sphinx v6+, and provides seamless Markdown integration alongside traditional reStructuredText.

---

## 1. Core Sphinx Setup

### 1.1 Installation

**Prerequisites:**
- Python 3.10 or higher (myst-parser requirement)
- pip or conda package manager

**Installation Commands:**

```bash
# Install Sphinx
pip install sphinx

# Install MyST-Parser for Markdown support
pip install myst-parser

# Install autodoc (included with Sphinx core)
# No separate installation needed - sphinx.ext.autodoc is built-in

# Optional: Live reload for development
pip install sphinx-autobuild
```

**Version Information (2025):**
- **myst-parser**: v4.0.1 (latest as of Feb 2025)
- **Python**: 3.10, 3.11, 3.12, 3.13 supported
- **Sphinx**: v6+ recommended (no strict pinning in myst-parser)

### 1.2 Project Initialization

**Using sphinx-quickstart (Recommended):**

```bash
# Navigate to your project root
cd /path/to/your/project

# Run interactive setup
sphinx-quickstart docs

# Answer key questions:
# - Separate source and build directories? [n]: y (RECOMMENDED)
# - Project name: YourProjectName
# - Author name(s): Your Name
# - Project release: 1.0.0
# - Project language: en
```

**What Gets Created:**

```
your-project/
├── docs/
│   ├── source/           # Source files (if separated)
│   │   ├── conf.py       # Sphinx configuration
│   │   ├── index.rst     # Root documentation page
│   │   ├── _static/      # Custom CSS, images
│   │   └── _templates/   # Custom HTML templates
│   ├── build/            # Generated documentation (ignored in git)
│   ├── make.bat          # Windows build script
│   └── Makefile          # Unix build script
├── your_package/         # Your Python source code
└── tests/
```

### 1.3 Basic Configuration

**Minimal conf.py Setup:**

```python
# conf.py - Minimal configuration

# Project information
project = 'Your Project Name'
copyright = '2025, Your Name'
author = 'Your Name'
release = '1.0.0'

# General configuration
extensions = []

# Paths
templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# HTML output
html_theme = 'alabaster'  # or 'sphinx_rtd_theme'
html_static_path = ['_static']
```

### 1.4 Building Documentation

**Command-Line Build:**

```bash
# Using make (Unix/Linux/Mac)
cd docs
make html

# Using sphinx-build directly
sphinx-build -M html source build

# Using sphinx-autobuild for live reload
sphinx-autobuild source build
```

**Build Outputs:**
- HTML: `docs/build/html/index.html`
- PDF: `docs/build/latex/yourproject.pdf` (requires `make latexpdf`)
- ePub: `docs/build/epub/` (requires `make epub`)

---

## 2. MyST-Parser Integration

### 2.1 Overview

MyST (Markedly Structured Text) extends CommonMark Markdown with features for technical documentation:
- Roles and directives (Sphinx features in Markdown)
- Admonitions (note, warning, tip blocks)
- Cross-references
- Mathematical notation
- Figure and table support

### 2.2 Installation & Configuration

**Installation:**
```bash
pip install myst-parser
```

**Basic conf.py Configuration:**

```python
# conf.py - MyST-Parser integration

# Add myst_parser to extensions
extensions = [
    'myst_parser',
]

# Configure source file suffixes
source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

# Optional: Enable additional MyST features
myst_enable_extensions = [
    "dollarmath",      # $$ math $$
    "amsmath",         # Advanced math
    "deflist",         # Definition lists
    "html_admonition", # Styled admonitions
    "colon_fence",     # ::: fence syntax
    "smartquotes",     # Smart quotes
    "substitution",    # Variable substitution
    "tasklist",        # - [ ] checkboxes
]

# Optional: Custom URL schemes
myst_url_schemes = {
    "http": None,
    "https": None,
    "gh-pr": "https://github.com/yourorg/yourrepo/pull/{{path}}",
    "gh-issue": "https://github.com/yourorg/yourrepo/issues/{{path}}",
}
```

### 2.3 Markdown Syntax Features

**Basic Markdown Works:**
```markdown
# Heading 1
## Heading 2

**bold** *italic* `code`

- List item
- List item

[Link](https://example.com)

![Image](path/to/image.png)
```

**MyST Extensions:**

```markdown
## Cross-references
{ref}`section-label`

## Admonitions
:::{note}
This is a note
:::

:::{warning}
This is a warning
:::

## Math
$$
E = mc^2
$$

## Directives
```{code-block} python
def hello():
    print("Hello!")
```

## Roles
{doc}`other-document`
{py:func}`my_function`
```

### 2.4 MyST vs RST Coexistence

**How Files Are Parsed:**
- `.md` files → MyST Markdown parser
- `.rst` files → reStructuredText parser
- Both can coexist in the same project
- Both can cross-reference each other

**Example index.rst with Markdown files:**

```rst
.. toctree::
   :maxdepth: 2
   :caption: Contents:

   installation
   usage
   api/index
   changelog
```

**Note**: Use file names without extensions. Sphinx auto-detects `.md` or `.rst`.

---

## 3. Autodoc Configuration

### 3.1 Overview

`sphinx.ext.autodoc` automatically generates API documentation from Python docstrings by importing modules and extracting documentation.

### 3.2 Basic Setup

**Configuration in conf.py:**

```python
import os
import sys

# Add your package to the Python path
sys.path.insert(0, os.path.abspath('../../your_package'))

# Enable autodoc extension
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',  # For Google/NumPy style docstrings
    'sphinx.ext.viewcode',  # Add source code links
    'sphinx.ext.intersphinx',  # Link to other projects
]

# Autodoc configuration
autodoc_default_options = {
    'members': True,              # Document all members
    'member-order': 'bysource',   # Order: bysource, alphabetical, groupwise
    'special-members': '__init__',
    'undoc-members': True,        # Include members without docstrings
    'show-inheritance': True,     # Show base classes
    'private-members': False,     # Exclude _private methods
}

# Mock imports for packages not available during doc build
autodoc_mock_imports = [
    'numpy',
    'pandas',
    'torch',
]

# Type hints configuration
autodoc_typehints = 'signature'  # Options: signature, description, both, none
autodoc_typehints_format = 'short'  # Use short type names

# Class documentation
autoclass_content = 'both'  # Options: class, init, both
```

### 3.3 Autodoc Directives

**Module Documentation:**
```rst
.. automodule:: your_package.module
   :members:
   :undoc-members:
   :show-inheritance:
```

**Class Documentation:**
```rst
.. autoclass:: your_package.MyClass
   :members:
   :private-members:
   :special-members: __init__, __str__
```

**Function Documentation:**
```rst
.. autofunction:: your_package.my_function
```

**Using Autosummary for Automatic Index:**

```python
# conf.py
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
]

autosummary_generate = True  # Auto-generate stub files
```

```rst
.. autosummary::
   :toctree: generated
   :recursive:

   your_package.module1
   your_package.module2
```

### 3.4 Docstring Formats

**Google Style (Recommended with napoleon):**

```python
def function(arg1: int, arg2: str) -> bool:
    """Summary line.

    Extended description of function.

    Args:
        arg1: Description of arg1
        arg2: Description of arg2

    Returns:
        Description of return value

    Raises:
        ValueError: If arg1 is negative

    Example:
        >>> function(1, "hello")
        True
    """
    pass
```

**NumPy Style:**

```python
def function(arg1, arg2):
    """
    Summary line.

    Extended description.

    Parameters
    ----------
    arg1 : int
        Description of arg1
    arg2 : str
        Description of arg2

    Returns
    -------
    bool
        Description of return value
    """
    pass
```

**Sphinx (reStructuredText) Style:**

```python
def function(arg1, arg2):
    """
    Summary line.

    :param arg1: Description of arg1
    :type arg1: int
    :param arg2: Description of arg2
    :type arg2: str
    :return: Description of return value
    :rtype: bool
    """
    pass
```

### 3.5 Autodoc with MyST Markdown

**Challenge**: Autodoc directives are reStructuredText, not Markdown.

**Solution 1: Use eval-rst directive**

```markdown
# API Documentation

```{eval-rst}
.. automodule:: your_package.module
   :members:
   :show-inheritance:
```
```

**Solution 2: Use autodoc2 (MyST-native)**

```python
# conf.py
extensions = [
    'autodoc2',  # Instead of sphinx.ext.autodoc
    'myst_parser',
]

autodoc2_packages = [
    {
        "path": "../../your_package",
        "exclude_files": ["_docs.py"],
    }
]

autodoc2_render_plugin = "myst"
```

---

## 4. Complete Configuration Example

### 4.1 Production-Ready conf.py

```python
# conf.py - Complete configuration example
import os
import sys
from datetime import date

# Path setup
sys.path.insert(0, os.path.abspath('../../'))

# Project information
project = 'Your Project'
copyright = f'{date.today().year}, Your Name'
author = 'Your Name'
release = '1.0.0'

# General configuration
extensions = [
    # Core extensions
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx.ext.napoleon',
    'sphinx.ext.viewcode',
    'sphinx.ext.intersphinx',

    # Markdown support
    'myst_parser',

    # Additional features
    'sphinx.ext.todo',
    'sphinx.ext.coverage',
    'sphinx_copybutton',  # pip install sphinx-copybutton
]

# Source files
source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# MyST configuration
myst_enable_extensions = [
    "dollarmath",
    "amsmath",
    "deflist",
    "html_admonition",
    "colon_fence",
    "smartquotes",
    "substitution",
    "tasklist",
]

# Autodoc configuration
autodoc_default_options = {
    'members': True,
    'member-order': 'bysource',
    'special-members': '__init__',
    'undoc-members': False,
    'show-inheritance': True,
}

autodoc_mock_imports = []  # Add dependencies here if needed
autodoc_typehints = 'description'
autoclass_content = 'both'

# Autosummary
autosummary_generate = True

# Napoleon (Google/NumPy docstring support)
napoleon_google_docstring = True
napoleon_numpy_docstring = True
napoleon_include_init_with_doc = True
napoleon_use_param = True
napoleon_use_rtype = True

# Intersphinx mapping
intersphinx_mapping = {
    'python': ('https://docs.python.org/3', None),
    'numpy': ('https://numpy.org/doc/stable/', None),
    'pandas': ('https://pandas.pydata.org/docs/', None),
}

# HTML output options
html_theme = 'sphinx_rtd_theme'  # pip install sphinx-rtd-theme
html_static_path = ['_static']
html_title = f"{project} Documentation"

html_theme_options = {
    'navigation_depth': 4,
    'collapse_navigation': False,
    'sticky_navigation': True,
    'includehidden': True,
    'titles_only': False,
}

# Enable warnings
nitpicky = True  # Warn about broken links
keep_warnings = True  # Keep warnings in output

# Todo extension
todo_include_todos = True
```

### 4.2 requirements.txt for Documentation

```
sphinx>=6.0
myst-parser>=4.0
sphinx-rtd-theme
sphinx-copybutton
sphinx-autobuild
```

---

## 5. Best Practices

### 5.1 Project Structure Best Practices

**Recommended Structure:**

```
project-root/
├── docs/
│   ├── source/
│   │   ├── conf.py
│   │   ├── index.rst
│   │   ├── installation.md
│   │   ├── quickstart.md
│   │   ├── api/
│   │   │   ├── index.rst
│   │   │   └── modules.rst
│   │   ├── tutorials/
│   │   ├── _static/
│   │   └── _templates/
│   ├── build/  (git-ignored)
│   └── Makefile
├── src/
│   └── your_package/
│       ├── __init__.py
│       ├── module1.py
│       └── module2.py
├── tests/
├── .gitignore
├── README.md
└── pyproject.toml
```

**Why Separate source and build?**
- Clean separation of inputs (source) and outputs (build)
- build/ can be safely git-ignored
- Easier to manage in version control
- Professional standard

### 5.2 Configuration Best Practices

**1. Dynamic Copyright Year:**
```python
from datetime import date
copyright = f'{date.today().year}, Your Name'
```

**2. Enable Nitpicky Mode:**
```python
nitpicky = True  # Warn about all invalid references
keep_warnings = True  # Display warnings in output
```

**3. Use rst_epilog for Common Substitutions:**
```python
rst_epilog = """
.. |project| replace:: Your Project Name
.. |author| replace:: Your Name
"""
```

**4. Path Configuration:**
```python
# Always use absolute paths from conf.py
import os
import sys
sys.path.insert(0, os.path.abspath('../../src'))
```

**5. Mock Unavailable Dependencies:**
```python
# Mock heavy dependencies during doc build
autodoc_mock_imports = [
    'tensorflow',
    'torch',
    'cv2',
]
```

### 5.3 Content Organization

**Documentation Structure:**
```
docs/source/
├── index.rst              # Landing page
├── installation.md        # Setup instructions
├── quickstart.md          # Getting started guide
├── user_guide/            # User documentation
│   ├── index.rst
│   ├── basics.md
│   └── advanced.md
├── api/                   # API reference (autodoc)
│   ├── index.rst
│   └── modules.rst
├── tutorials/             # Detailed tutorials
├── changelog.md           # Version history
└── contributing.md        # Contribution guide
```

**Index.rst Example:**
```rst
Welcome to Your Project Documentation
======================================

.. toctree::
   :maxdepth: 2
   :caption: Getting Started:

   installation
   quickstart

.. toctree::
   :maxdepth: 2
   :caption: User Guide:

   user_guide/index

.. toctree::
   :maxdepth: 2
   :caption: API Reference:

   api/modules

.. toctree::
   :maxdepth: 1
   :caption: Development:

   changelog
   contributing
```

---

## 6. Common Issues and Solutions

### 6.1 Autodoc Issues

**Problem: "No module named 'your_package'"**

**Cause**: Package not importable by Sphinx.

**Solutions:**
```python
# Solution 1: Add to sys.path in conf.py
import os
import sys
sys.path.insert(0, os.path.abspath('../../src'))

# Solution 2: Install package in editable mode
# pip install -e .

# Solution 3: Set PYTHONPATH
# export PYTHONPATH="${PYTHONPATH}:/path/to/your/package"
```

**Problem: "Circular import errors"**

**Cause**: Module has circular dependencies.

**Solutions:**
- Refactor code to eliminate circular imports
- Use `autodoc_mock_imports` to mock problematic modules
- Use type hints with `from __future__ import annotations`

**Problem: "Missing dependencies during build"**

**Solution:**
```python
# Mock heavy dependencies
autodoc_mock_imports = [
    'numpy',
    'pandas',
    'tensorflow',
]
```

### 6.2 MyST-Parser Issues

**Problem: "Markdown tables not rendering in PDF"**

**Cause**: LaTeX backend limitations with markdown tables.

**Solutions:**
- Use reStructuredText for complex tables
- Use `sphinx-markdown-tables` extension (limited support)
- Convert to grid tables in rst

**Problem: "Autodoc directives not working in Markdown"**

**Cause**: Autodoc is hardcoded for reStructuredText.

**Solutions:**
```markdown
# Solution 1: Use eval-rst directive
```{eval-rst}
.. automodule:: your_package
   :members:
```

# Solution 2: Use autodoc2 (MyST-native)
# In conf.py: extensions = ['autodoc2', 'myst_parser']
```

**Problem: "Blank line required after :maxdepth:"**

**Solution:**
```markdown
```{toctree}
:maxdepth: 2

installation
quickstart
```
```

### 6.3 Build Issues

**Problem: "WARNING: document isn't included in any toctree"**

**Cause**: Document not referenced in any toctree directive.

**Solution:**
- Add to toctree in index.rst
- Or use `:orphan:` directive if intentionally standalone

**Problem: "Extension error: sphinx.ext.autodoc"**

**Cause**: Extension configuration issue.

**Solution:**
```python
# Check extension loading order
extensions = [
    'sphinx.ext.napoleon',  # Load BEFORE autodoc_typehints
    'sphinx.ext.autodoc',
    'sphinx_autodoc_typehints',  # Load AFTER napoleon
]
```

**Problem: "RST syntax errors"**

**Solutions:**
- Use RST linter: `pip install doc8`
- Check Sphinx build logs: `make html > build.log 2>&1`
- Validate with: `sphinx-build -W -b html source build` (-W = warnings as errors)

### 6.4 Version Compatibility

**Problem: "Incompatible extension versions"**

**Solution:**
```bash
# Pin compatible versions
pip install 'sphinx>=6.0,<8.0' 'myst-parser>=4.0'

# Or use requirements.txt
sphinx>=6.0,<8.0
myst-parser>=4.0.1
sphinx-rtd-theme>=2.0
```

---

## 7. Workflow Integration

### 7.1 Local Development

```bash
# Install dependencies
pip install -r docs/requirements.txt

# Live reload during editing
sphinx-autobuild docs/source docs/build

# Access at: http://127.0.0.1:8000
```

### 7.2 Git Integration

**.gitignore:**
```
# Sphinx build directory
docs/build/
docs/source/_build/

# Generated files
docs/source/api/generated/
docs/source/_autosummary/
```

### 7.3 CI/CD Integration

**GitHub Actions Example:**

```yaml
# .github/workflows/docs.yml
name: Documentation

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          pip install -r docs/requirements.txt
          pip install -e .

      - name: Build documentation
        run: |
          cd docs
          make html

      - name: Deploy to GitHub Pages
        if: github.event_name == 'push'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/build/html
```

### 7.4 Read the Docs Integration

**Create .readthedocs.yaml:**

```yaml
version: 2

build:
  os: ubuntu-22.04
  tools:
    python: "3.11"

sphinx:
  configuration: docs/source/conf.py

python:
  install:
    - method: pip
      path: .
    - requirements: docs/requirements.txt
```

---

## 8. Advanced Topics

### 8.1 Custom Themes

```python
# Use Read the Docs theme
html_theme = 'sphinx_rtd_theme'

# Or Furo (modern, clean)
html_theme = 'furo'  # pip install furo

# Customize theme
html_theme_options = {
    'logo_only': False,
    'display_version': True,
    'style_nav_header_background': '#2980B9',
}
```

### 8.2 Multi-language Support

```python
# conf.py
language = 'en'
locale_dirs = ['locale/']
gettext_compact = False
```

### 8.3 API Documentation Generation

```bash
# Auto-generate API documentation
sphinx-apidoc -o docs/source/api your_package

# With options
sphinx-apidoc -f -o docs/source/api your_package --separate
```

---

## 9. Source Citations

### Official Documentation
1. **Sphinx Getting Started**: https://www.sphinx-doc.org/en/master/usage/quickstart.html
2. **Sphinx Autodoc**: https://www.sphinx-doc.org/en/master/usage/extensions/autodoc.html
3. **MyST-Parser Documentation**: https://myst-parser.readthedocs.io/en/latest/
4. **MyST-Parser PyPI**: https://pypi.org/project/myst-parser/ (v4.0.1, Feb 2025)

### Configuration Examples
5. **MyST-Parser conf.py**: https://github.com/executablebooks/MyST-Parser/blob/master/docs/conf.py
6. **Read the Docs Sphinx Guide**: https://docs.readthedocs.io/en/stable/intro/getting-started-with-sphinx.html

### Best Practices
7. **Sphinx conf.py Tips**: https://documatt.com/blog/21/sphinx-conf-py-tips/
8. **Write the Docs - Sphinx Introduction**: https://www.writethedocs.org/guide/tools/sphinx/

### Tutorials
9. **Sphinx Autodoc Guide**: https://www.sphinx-doc.org/en/master/usage/extensions/autodoc.html
10. **Sphinx-RTD Tutorial**: https://sphinx-rtd-tutorial.readthedocs.io/

---

## 10. Quick Reference

### Essential Commands

```bash
# Initialize new project
sphinx-quickstart docs

# Build HTML
cd docs && make html

# Live reload
sphinx-autobuild docs/source docs/build

# Generate API docs
sphinx-apidoc -o docs/source/api your_package

# Build with warnings as errors
sphinx-build -W -b html docs/source docs/build

# Clean build
cd docs && make clean
```

### Key Configuration Values

```python
# Essential extensions
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'myst_parser',
]

# Source suffixes
source_suffix = {'.rst': 'restructuredtext', '.md': 'markdown'}

# Autodoc options
autodoc_default_options = {
    'members': True,
    'show-inheritance': True,
}

# MyST extensions
myst_enable_extensions = ["dollarmath", "colon_fence", "deflist"]
```

---

## Conclusion

Setting up Sphinx with MyST-Parser and Autodoc provides a powerful documentation system that:

1. **Supports Multiple Formats**: Both Markdown and reStructuredText
2. **Automates API Documentation**: Direct from Python docstrings
3. **Scales with Projects**: From simple to complex documentation needs
4. **Integrates Well**: CI/CD, Read the Docs, GitHub Pages

**Recommended Workflow:**
1. Use `sphinx-quickstart` with separate source/build directories
2. Enable `myst_parser` for Markdown support
3. Configure `autodoc` with proper path and mock imports
4. Use Google or NumPy docstring style with `napoleon`
5. Enable `sphinx-autobuild` for live editing
6. Set up CI/CD for automated builds

**Common Gotchas:**
- Ensure package is importable (sys.path or editable install)
- Mock heavy dependencies to speed up builds
- Use `eval-rst` for autodoc directives in Markdown
- Separate source and build directories from the start

This research provides a complete foundation for professional Python documentation using modern tools and best practices.
