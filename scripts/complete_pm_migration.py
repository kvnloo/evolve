#!/usr/bin/env python3
"""Complete PM Commands Migration to OpenCode format"""

import os
import re
from pathlib import Path

SOURCE_DIR = Path(".claude/commands/pm")
TARGET_DIR = Path(".opencode/command/pm")

# Files already migrated
MIGRATED = {
    "prd-new.md", "prd-edit.md", "prd-list.md", "prd-parse.md", "prd-status.md",
    "epic-oneshot.md", "next.md", "issue-start.md",
    "status.md", "help.md", "init.md", "blocked.md"
}

# Command descriptions
DESCRIPTIONS = {
    "epic-decompose": "Break epic into concrete, actionable tasks",
    "epic-sync": "Push epic and tasks to GitHub as issues",
    "epic-list": "List all epics with status",
    "epic-show": "Show epic details and task breakdown",
    "epic-status": "Show epic progress and task completion",
    "epic-start": "Start work on an epic with parallel agents",
    "epic-edit": "Edit an existing epic",
    "epic-close": "Close an epic and merge to main",
    "epic-refresh": "Refresh epic status from GitHub",
    "epic-merge": "Merge epic branch to main",
    "epic-start-worktree": "Create worktree for epic development",
    "issue-analyze": "Analyze issue and create work stream breakdown",
    "issue-sync": "Sync local progress to GitHub issue",
    "issue-show": "Show issue details and progress",
    "issue-status": "Show issue status and completion",
    "issue-close": "Close an issue",
    "issue-reopen": "Reopen a closed issue",
    "issue-edit": "Edit an existing issue",
    "sync": "Sync all changes to GitHub",
    "clean": "Clean up old/completed PM files",
    "validate": "Validate PM system integrity",
    "search": "Search across PRDs, epics, and tasks",
    "import": "Import existing GitHub issues into PM system",
    "in-progress": "Show all in-progress tasks",
    "standup": "Generate standup report",
    "test-reference-update": "Test reference update functionality"
}


def strip_frontmatter(content):
    """Remove YAML frontmatter from content"""
    lines = content.split('\n')
    if lines[0].strip() == '---':
        try:
            end_idx = lines[1:].index('---') + 2
            return '\n'.join(lines[end_idx:])
        except ValueError:
            pass
    return content


def convert_auto_commands(content):
    """Convert bash commands to auto-shell format"""
    # Date command
    content = re.sub(
        r'`date -u \+"%Y-%m-%dT%H:%M:%SZ"`',
        r'!`date -u +"%Y-%m-%dT%H:%M:%SZ"`',
        content
    )
    # Other common commands
    for cmd in ['mkdir -p', 'git worktree', 'git status', 'gh ']:
        content = content.replace(f'`{cmd}', f'!`{cmd}')

    return content


def convert_auto_reads(content):
    """Convert file reads to auto-file-read format"""
    # PRD files
    content = re.sub(
        r'Read `\.claude/prds/\$ARGUMENTS\.md`',
        r'@.claude/prds/$ARGUMENTS.md',
        content
    )
    # Epic files
    content = re.sub(
        r'Read `\.claude/epics/\$ARGUMENTS/epic\.md`',
        r'@.claude/epics/$ARGUMENTS/epic.md',
        content
    )
    # Task files
    content = re.sub(
        r'Read `\.claude/epics/\$ARGUMENTS/\$ARGUMENTS\.md`',
        r'@.claude/epics/$ARGUMENTS/$ARGUMENTS.md',
        content
    )

    return content


def is_shell_wrapper(content):
    """Check if command is just a shell script wrapper"""
    lines = [l.strip() for l in content.split('\n') if l.strip()]
    # Look for pattern: Output: !bash script.sh
    for line in lines:
        if re.match(r'Output:\s*!bash\s+ccpm/scripts/', line):
            return line.split('!bash')[1].strip()
    return None


def migrate_file(source_path, target_path, filename):
    """Migrate a single file"""
    try:
        with open(source_path, 'r') as f:
            content = f.read()

        # Get description
        name = filename[:-3]  # Remove .md
        description = DESCRIPTIONS.get(name, f"PM command: {name}")

        # Check if shell wrapper
        shell_script = is_shell_wrapper(content)
        if shell_script:
            # Create simple wrapper
            migrated = f"""---
description: {description}
agent: pm-agent
---

# {description.title()}

## Usage
```
/pm:{name}
```

## Instructions

!bash {shell_script}
"""
        else:
            # Strip old frontmatter
            body = strip_frontmatter(content)

            # Apply conversions
            body = convert_auto_commands(body)
            body = convert_auto_reads(body)

            # Add new frontmatter
            migrated = f"""---
description: {description}
agent: pm-agent
---

{body}
"""

        # Write target file
        with open(target_path, 'w') as f:
            f.write(migrated)

        return True

    except Exception as e:
        print(f"❌ Error migrating {filename}: {e}")
        return False


def main():
    """Main migration function"""
    TARGET_DIR.mkdir(parents=True, exist_ok=True)

    print("🚀 PM Commands Migration to OpenCode")
    print("=" * 40)
    print()

    migrated_count = 0
    skipped_count = 0
    failed_count = 0

    for source_file in sorted(SOURCE_DIR.glob("*.md")):
        filename = source_file.name

        # Skip already migrated
        if filename in MIGRATED:
            print(f"⏭️  Skipped: {filename} (already migrated)")
            skipped_count += 1
            continue

        target_file = TARGET_DIR / filename

        if migrate_file(source_file, target_file, filename):
            print(f"✅ Migrated: {filename}")
            migrated_count += 1
        else:
            failed_count += 1

    print()
    print("📊 Migration Summary")
    print("=" * 40)
    print(f"✅ Migrated: {migrated_count} files")
    print(f"⏭️  Skipped: {skipped_count} files")
    print(f"❌ Failed: {failed_count} files")
    print(f"📁 Total in target: {len(list(TARGET_DIR.glob('*.md')))} files")
    print()
    print("✨ Migration complete!")


if __name__ == "__main__":
    main()
