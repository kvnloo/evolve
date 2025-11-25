---
description: Reference to Autonomous Knowledge and Process Manager (AKPM) from external repository
agent: automation-agent
tags: [automation, reference, external, knowledge-management]
---

# AKPM Reference

**Note**: This file is a reference to an external command definition.

## External Reference

The Autonomous Knowledge and Process Manager (AKPM) command is defined in an external repository:

**Original Location**: `../../../repos/orchestra/.claude/commands/AKPM.md`

**Repository**: [Orchestra Repository]

## What is AKPM?

AKPM (Autonomous Knowledge and Process Manager) is an advanced automation system for knowledge management and process orchestration. It is maintained separately in the Orchestra repository.

## Usage

To use AKPM functionality:

1. Ensure the Orchestra repository is cloned at `../../../repos/orchestra/`
2. Reference the original AKPM.md file directly
3. Or use the symbolic link from the original location

## Integration Notes

If you need AKPM functionality in this project:

### Option 1: Use the External Reference

```bash
# Access via relative path
cat ../../../repos/orchestra/.claude/commands/AKPM.md
```

### Option 2: Create Local Copy

If AKPM should be fully integrated into this project, consider:
1. Copying the AKPM.md content into this directory
2. Adapting it for this project's specific needs
3. Removing dependency on external repository

### Option 3: Install Orchestra as Dependency

Configure Orchestra as a project dependency if AKPM is critical to automation workflows.

## See Also

- `ARM` - Autonomous Resource Manager
- `discovery-mode` - Autonomous scientific research
- `session-memory` - Cross-session learning

---

**Maintenance Note**: This is a reference file. The actual AKPM implementation is maintained externally. Consider whether AKPM should be:
- Kept as external reference
- Copied and adapted locally
- Installed as formal dependency
