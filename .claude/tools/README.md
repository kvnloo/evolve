# Claude Tools Directory

This directory contains external tools integrated as git submodules for use by Claude commands.

## Installed Tools

### UIED (UI Element Detection)

**Repository**: https://github.com/MulongXie/UIED
**Version**: Tracked as git submodule
**Purpose**: Computer vision-based UI element detection for screenshots and layouts

**Used by**:
- `/ui/ui-analysis` - Analyze UI screenshots to detect and classify elements

**Setup**:
```bash
# Initialize submodule (if not already done)
git submodule update --init --recursive

# Install Python dependencies
pip install opencv-python pandas numpy paddleocr
```

**Features**:
- Detects text elements via OCR (PaddleOCR or Google Cloud Vision)
- Detects graphical components via computer vision
- Exports structured JSON with element positions
- Generates annotated images showing detections

## Managing Submodules

### Initialize All Submodules
```bash
git submodule update --init --recursive
```

### Update a Submodule to Latest Version
```bash
cd .claude/tools/UIED
git pull origin master
cd ../../..
git add .claude/tools/UIED
git commit -m "Update UIED submodule to latest version"
```

### Remove a Submodule
```bash
# Remove from .gitmodules
git config -f .gitmodules --remove-section submodule.{path}

# Remove from .git/config
git config -f .git/config --remove-section submodule.{path}

# Remove from working tree
git rm --cached {path}
rm -rf {path}

# Commit changes
git add .gitmodules
git commit -m "Remove {submodule} submodule"
```

## Adding New Tools

To add a new tool as a submodule:

```bash
# Add the submodule
git submodule add {repository-url} .claude/tools/{tool-name}

# Initialize and update
git submodule update --init --recursive

# Document in this README
```

## Notes

- Submodules are frozen at a specific commit
- Use `git submodule update --remote` to update to latest commit
- Each submodule maintains its own git history
- Submodule commits are tracked in the parent repository
