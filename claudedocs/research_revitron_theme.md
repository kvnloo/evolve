# Revitron Sphinx Theme - Research Findings

**Research Date:** 2025-11-09
**Theme Repository:** https://github.com/revitron/revitron-sphinx-theme
**Live Documentation:** https://revitron-sphinx-theme.readthedocs.io

## Overview

Revitron-sphinx-theme is a fork of the original Read the Docs Sphinx theme, designed to provide an excellent reader experience for documentation users on both desktop and mobile devices. The theme is highly customizable and includes special features for landing pages and content styling.

**Status:** Production/Stable (v0.7.2)
**License:** MIT
**GitHub Stars:** 28

---

## 1. Installation Requirements

### Installation Command

```bash
pip install https://github.com/revitron/revitron-sphinx-theme/archive/master.zip
```

### Dependencies

**Core Requirements:**
- `sphinx` - No specific version constraint listed in setup.py

**Development Dependencies:**
- `pytest` - For testing
- `transifex-client` - Translation management
- `sphinxcontrib-httpdomain` - HTTP domain extensions
- `bump2version` - Version management

### Python Version Support

The theme officially supports:
- Python 2.7 (legacy)
- Python 3.3, 3.4, 3.5, 3.6

**Note:** While these are the officially declared versions in setup.py, the theme likely works with newer Python 3.x versions (3.7+), but compatibility has not been formally tested or declared.

**Source:** [setup.py on GitHub](https://github.com/revitron/revitron-sphinx-theme/blob/master/setup.py)

---

## 2. Configuration

### Basic Configuration (conf.py)

```python
import revitron_sphinx_theme

extensions = [
    # ... your other extensions
    "revitron_sphinx_theme",
]

html_theme = "revitron_sphinx_theme"
```

### Theme Options (html_theme_options)

The theme supports extensive customization through `html_theme_options`:

```python
html_theme_options = {
    # Color scheme: '' (light) or 'dark'
    'color_scheme': '',

    # Canonical URL for the documentation
    'canonical_url': '',

    # Google Analytics tracking ID
    'analytics_id': 'UA-XXXXXXX-1',

    # Style external links differently
    'style_external_links': False,

    # Collapse navigation by default
    'collapse_navigation': True,

    # Make navigation sticky on scroll
    'sticky_navigation': True,

    # Maximum depth for table of contents
    'navigation_depth': 4,

    # Include hidden toc entries
    'includehidden': True,

    # Display only titles (no descriptions)
    'titles_only': False,

    # GitHub repository URL (adds GitHub link)
    'github_url': '',

    # Mobile logo path
    'logo_mobile': 'demo/static/logo-mobile.svg'
}

# Main logo
html_logo = 'demo/static/logo.svg'
```

**Source:** [GitHub README configuration section](https://github.com/revitron/revitron-sphinx-theme)

### Landing Page Configuration

Create a special landing page template with custom menu items:

```python
html_context = {
    'landing_page': {
        'menu': [
            {'title': 'Get Started', 'url': 'installing.html'},
            {'title': 'Documentation', 'url': 'documentation.html'},
            {'title': 'GitHub', 'url': 'https://github.com/user/repo'}
        ]
    }
}
```

This creates a landing page on your `master_doc` page with styled menu items.

**Source:** [Revitron theme documentation](https://revitron-sphinx-theme.readthedocs.io)

---

## 3. Theme Customization Options

### Color Customization

Colors are controlled by CSS custom properties (CSS variables), making it easy to override color schemes:

1. Create a custom CSS file (e.g., `_static/custom.css`)
2. Override CSS custom properties for light or dark themes
3. Add the custom CSS file in `conf.py`:

```python
html_static_path = ['_static']
html_css_files = ['custom.css']
```

**Example CSS customizations:**
```css
:root {
    --primary-color: #2980b9;
    --background-color: #fcfcfc;
    --text-color: #404040;
}

[data-theme="dark"] {
    --primary-color: #3498db;
    --background-color: #1e1e1e;
    --text-color: #e0e0e0;
}
```

### Container Classes for RST Files

The theme provides three special container classes for styling content directly in `.rst` files:

#### 1. `.large` - Large Text Blocks
```rst
.. container:: large

   This is a large, prominent text block
   useful for introductions or important notices.
```

#### 2. `.buttons` - Button Links
```rst
.. container:: buttons

   `Get Started <installation.html>`_
   `View on GitHub <https://github.com/user/repo>`_
```

#### 3. `.image` - Image Wrapping
```rst
.. container:: image

   .. image:: path/to/image.png
      :alt: Image description
```

**Source:** [Revitron theme documentation - Container Classes](https://revitron-sphinx-theme.readthedocs.io)

### Responsive Design

The theme is designed mobile-first and provides:
- Responsive navigation that collapses on mobile
- Optimized typography for different screen sizes
- Touch-friendly interface elements
- Sticky navigation option for desktop

---

## 4. Compatibility Information

### Sphinx Version Compatibility

**Direct Compatibility:** The theme's setup.py does not specify a Sphinx version constraint, meaning it should work with multiple Sphinx versions.

**Important Context:** Since revitron-sphinx-theme is a fork of `sphinx-rtd-theme`, compatibility issues from the parent theme may apply:

#### Sphinx 6 & 7 Considerations

The parent theme (`sphinx-rtd-theme`) has had the following compatibility milestones:

- **Sphinx 6 Support:** Added in sphinx-rtd-theme v1.2.0 (released early 2023)
- **Sphinx 7 Support:** Confirmed working in sphinx-rtd-theme v1.2.0+
- **jQuery Dependency:** Sphinx 6+ removed bundled jQuery, which can cause issues

**jQuery Workaround for Sphinx 6+:**
```python
# Add theme to extensions to ensure jQuery loads
extensions = [
    'revitron_sphinx_theme',
    # This helps ensure jQuery dependency is handled
]
```

**Recommended Approach:**
- For Sphinx 5.x and earlier: Should work without issues
- For Sphinx 6.x and 7.x: Test thoroughly, ensure jQuery loads correctly
- For Sphinx 8.x: May require updates (parent theme working on support)

**Source:** [sphinx-rtd-theme GitHub Issues](https://github.com/readthedocs/sphinx_rtd_theme/issues/1463)

### Last Update

The revitron-sphinx-theme repository was last updated on **January 1, 2023**, which means:

- May not include latest Sphinx 7/8 compatibility fixes
- Consider checking the parent theme (sphinx-rtd-theme) for recent updates
- Community forks may have more recent updates

### Extension Compatibility

The theme is designed to work alongside standard Sphinx extensions. No known conflicts with common extensions like:
- `sphinx.ext.autodoc`
- `sphinx.ext.napoleon`
- `sphinx.ext.viewcode`
- `sphinx.ext.intersphinx`

---

## 5. Known Issues & Limitations

### Documentation-Reported Issues

**Search Results:** No public GitHub Issues page was accessible during research, suggesting:
- Limited active issue tracking
- Possible inactive maintenance
- Issues may be handled privately or in forks

### Potential Issues (Based on Parent Theme)

Since this is a fork of sphinx-rtd-theme, the following issues from the parent may apply:

#### 1. jQuery Loading Issues (Sphinx 6+)
**Problem:** jQuery may not load automatically with Sphinx 6+
**Symptom:** JavaScript features not working, console errors about jQuery
**Solution:** Add `revitron_sphinx_theme` to `extensions` list

#### 2. Docutils Version Requirements
**Problem:** Sphinx 6+ requires docutils 0.18 or 0.19
**Symptom:** Build failures with older docutils versions
**Solution:** Upgrade docutils: `pip install --upgrade docutils`

#### 3. Maintenance Status
**Problem:** Last update was January 2023
**Risk:** May lack compatibility with latest Sphinx features
**Mitigation:** Test thoroughly before production use, consider alternatives for new projects

### Workarounds & Best Practices

1. **Test before deploying:** Always test the theme with your specific Sphinx version
2. **Pin versions:** Consider pinning Sphinx and theme versions for stability
3. **Check parent theme:** Review sphinx-rtd-theme changelog for relevant updates
4. **Fork consideration:** For production use, consider maintaining a fork with updates

---

## 6. Examples Using This Theme

### Official Examples

**Revitron Documentation Itself:**
- URL: https://revitron.readthedocs.io
- Source: https://github.com/revitron/revitron
- Demonstrates: Full theme capabilities including landing page, dark mode, custom containers

**Live Demo Features:**
- Landing page with custom menu
- Dark/light color scheme toggle
- Responsive mobile navigation
- Custom styled containers (`.large`, `.buttons`, `.image`)
- API documentation with autodoc integration

### Configuration Example from Revitron Project

```python
# conf.py from Revitron documentation
import revitron_sphinx_theme

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.intersphinx',
    'revitron_sphinx_theme',
]

html_theme = 'revitron_sphinx_theme'

html_theme_options = {
    'color_scheme': '',  # Light theme by default
    'github_url': 'https://github.com/revitron/revitron',
    'collapse_navigation': True,
    'sticky_navigation': True,
    'navigation_depth': 4,
}

html_logo = '_static/logo.svg'
html_static_path = ['_static']

# Landing page configuration
html_context = {
    'landing_page': {
        'menu': [
            {'title': 'Get Started', 'url': 'get-started.html'},
            {'title': 'Developer Guide', 'url': 'revitron.html'},
            {'title': 'Cheat Sheet', 'url': 'cheat-sheet.html'},
            {'title': 'GitHub', 'url': 'https://github.com/revitron/revitron'}
        ]
    }
}
```

**Source:** [Revitron Documentation Site](https://revitron.readthedocs.io)

---

## 7. Alternatives & Related Themes

If you encounter compatibility issues or maintenance concerns with revitron-sphinx-theme, consider these alternatives:

### Parent Theme
- **sphinx-rtd-theme:** The parent theme with active maintenance
  - GitHub: https://github.com/readthedocs/sphinx_rtd_theme
  - More actively maintained (updated regularly)
  - Better Sphinx 6/7/8 support

### Community Forks
- **mesozoic/revitron-sphinx-theme:** Community fork
  - May have additional features or fixes
- **gtalarico/revitron-sphinx-theme:** Another community fork
  - Check for recent updates

### Other Modern Themes
- **furo:** Modern, customizable Sphinx theme
- **sphinx-book-theme:** Based on Jupyter Book
- **pydata-sphinx-theme:** Used by NumPy, Pandas, etc.

---

## 8. Migration Path (If Needed)

If you need to migrate away from revitron-sphinx-theme:

### To sphinx-rtd-theme (Parent)
```python
# Minimal changes needed
extensions = [
    'sphinx_rtd_theme',  # Changed from revitron_sphinx_theme
]

html_theme = 'sphinx_rtd_theme'  # Changed from revitron_sphinx_theme
```

Most configuration options are compatible, though some custom features (landing page, container classes) may need adjustment.

---

## 9. Quick Start Checklist

- [ ] Install theme: `pip install https://github.com/revitron/revitron-sphinx-theme/archive/master.zip`
- [ ] Add to conf.py extensions: `"revitron_sphinx_theme"`
- [ ] Set html_theme: `html_theme = "revitron_sphinx_theme"`
- [ ] Configure theme options in `html_theme_options`
- [ ] Test build: `make html`
- [ ] Verify JavaScript features work (especially with Sphinx 6+)
- [ ] Test mobile responsiveness
- [ ] (Optional) Configure landing page in `html_context`
- [ ] (Optional) Add custom CSS for color scheme overrides

---

## 10. Resources & Links

### Official Resources
- **GitHub Repository:** https://github.com/revitron/revitron-sphinx-theme
- **Documentation:** https://revitron-sphinx-theme.readthedocs.io
- **Live Example:** https://revitron.readthedocs.io
- **Issue Tracker:** Check repository for issues/discussions

### Parent Theme Resources
- **sphinx-rtd-theme GitHub:** https://github.com/readthedocs/sphinx_rtd_theme
- **sphinx-rtd-theme Docs:** https://sphinx-rtd-theme.readthedocs.io
- **Changelog:** https://sphinx-rtd-theme.readthedocs.io/en/stable/changelog.html

### Community Forks
- https://github.com/mesozoic/revitron-sphinx-theme
- https://github.com/gtalarico/revitron-sphinx-theme

### Related Documentation
- **Sphinx Theming Guide:** https://www.sphinx-doc.org/en/master/usage/theming.html
- **Sphinx Configuration:** https://www.sphinx-doc.org/en/master/usage/configuration.html

---

## Summary & Recommendations

### Strengths
✅ Clean, professional design
✅ Excellent mobile responsiveness
✅ Highly customizable (colors, layout, navigation)
✅ Special features (landing page, container classes)
✅ MIT licensed, free to use

### Concerns
⚠️ Last updated January 2023 (not actively maintained)
⚠️ May require jQuery workaround for Sphinx 6+
⚠️ Limited public documentation of known issues
⚠️ Python 2.7 officially listed (though likely works with modern Python)

### Recommendation
**For New Projects:** Consider using the parent theme (`sphinx-rtd-theme`) or more actively maintained alternatives unless you specifically need revitron-sphinx-theme's unique features.

**For Existing Projects:** The theme should work reliably with Sphinx 5.x. For Sphinx 6+, test thoroughly and apply jQuery workarounds if needed.

**For Production Use:** Pin versions and maintain your own fork if long-term stability is critical.

---

**Research compiled by:** Claude Code (Deep Research Mode)
**Sources:** GitHub repository, ReadTheDocs documentation, web search results
**Confidence Level:** High (based on official documentation and source code analysis)
