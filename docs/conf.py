# Configuration file for the Sphinx documentation builder.
#
# This configuration builds documentation from the existing markdown files
# in the docs/ directory and subdirectories.

import os
import sys
from datetime import datetime

# -- Project information -----------------------------------------------------

project = 'Evolve'
copyright = f'{datetime.now().year}, Kevin Rajan'
author = 'Kevin Rajan'
release = '1.0.0'

# -- General configuration ---------------------------------------------------

extensions = [
    'myst_parser',  # Markdown support
    'sphinxcontrib.mermaid',  # Mermaid diagram support
    'sphinx.ext.githubpages',  # Create .nojekyll file for GitHub Pages
    'sphinx.ext.intersphinx',  # Link to other projects' documentation
    'sphinx.ext.todo',  # Support for todo items
]

# MyST-Parser configuration - enable all features
myst_fence_as_directive = ["mermaid"]  # Render ```mermaid blocks as Mermaid diagrams

myst_enable_extensions = [
    "amsmath",
    "colon_fence",
    "deflist",
    "dollarmath",
    "fieldlist",
    "html_admonition",
    "html_image",
    "linkify",
    "replacements",
    "smartquotes",
    "strikethrough",
    "substitution",
    "tasklist",
    "attrs_inline",
    "attrs_block",
]

# Support both .md and .rst files
source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

templates_path = ['_templates']
exclude_patterns = [
    '_build',
    'Thumbs.db',
    '.DS_Store',
    'archive',  # Exclude archive directory
    '*.sh',  # Exclude shell scripts
    '*.csv',  # Exclude CSV files
]

# -- Options for HTML output -------------------------------------------------

# Use the revitron theme
import revitron_sphinx_theme

html_theme = 'revitron_sphinx_theme'
html_theme_path = [revitron_sphinx_theme.get_html_theme_path()]

# Theme options
html_theme_options = {
    'color_scheme': 'dark',
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 4,
    'includehidden': True,
    'titles_only': False,
    'github_url': 'https://github.com/kvnloo/evolve',
    'github_banner': True,
}

# Landing page configuration and theme context
html_context = {
    'style': 'default',  # Required by revitron theme
    'landing_page': {
        'menu': [
            {'title': 'Quick Start', 'url': 'quick-start.html'},
            {'title': 'Documentation', 'url': 'README.html'},
            {'title': 'GitHub', 'url': 'https://github.com/kvnloo/evolve'},
        ]
    }
}

html_static_path = []  # Will create _static if needed
html_logo = None
html_favicon = None

# -- Options for intersphinx -------------------------------------------------

intersphinx_mapping = {
    'python': ('https://docs.python.org/3', None),
}

# -- Additional configuration ------------------------------------------------

master_doc = 'index'
html_show_sourcelink = True
html_show_sphinx = True

# Suppress warnings for documents not in toctree
suppress_warnings = ['toc.not_readable']
