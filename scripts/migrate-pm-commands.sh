#!/bin/bash
# PM Commands Migration Script
# Migrates .claude/commands/pm/*.md to .opencode/command/pm/*.md format

set -e

SOURCE_DIR=".claude/commands/pm"
TARGET_DIR=".opencode/command/pm"

# Ensure target directory exists
mkdir -p "$TARGET_DIR"

echo "🚀 PM Commands Migration"
echo "========================"
echo ""

# Files already manually migrated (skip these)
MIGRATED=(
  "prd-new.md"
  "prd-edit.md"
  "prd-list.md"
  "prd-parse.md"
  "prd-status.md"
  "epic-oneshot.md"
  "next.md"
  "issue-start.md"
)

# Check if file is already migrated
is_migrated() {
  local filename="$1"
  for migrated in "${MIGRATED[@]}"; do
    if [ "$filename" = "$migrated" ]; then
      return 0
    fi
  done
  return 1
}

# Convert shell script commands to auto-shell format
convert_shell_command() {
  local file="$1"
  local script=$(grep 'bash ccpm/scripts/pm/' "$file" | sed 's/.*bash //' | sed 's/)$//')

  if [ -n "$script" ]; then
    echo "!bash $script"
  fi
}

# Process each source file
count=0
skipped=0

for source_file in "$SOURCE_DIR"/*.md; do
  [ -f "$source_file" ] || continue

  filename=$(basename "$source_file")

  # Skip if already migrated
  if is_migrated "$filename"; then
    echo "⏭️  Skipped: $filename (manually migrated)"
    ((skipped++))
    continue
  fi

  target_file="$TARGET_DIR/$filename"

  # Read source file
  content=$(cat "$source_file")

  # Extract description from title or first line
  description=$(echo "$content" | grep -A1 '^# ' | tail -1 | sed 's/^# //' || echo "PM command")

  # Check if it's a shell-script-only command
  if grep -q 'allowed-tools: Bash(' "$source_file"; then
    # Simple shell script wrapper
    script_path=$(echo "$content" | grep 'bash ccpm/scripts/' | sed 's/.*bash //' | sed 's/)$//')

    cat > "$target_file" << EOF
---
description: $description
agent: pm-agent
---

# ${description}

## Usage
\`\`\`
/pm:${filename%.md}
\`\`\`

## Instructions

!bash $script_path
EOF

  else
    # Complex command - preserve structure, add frontmatter
    # Remove old frontmatter
    body=$(echo "$content" | sed '1,/^---$/d; 1,/^---$/d')

    cat > "$target_file" << EOF
---
description: $description
agent: pm-agent
---

$body
EOF

    # Replace bash command patterns with auto-shell
    sed -i 's/`date -u +"%Y-%m-%dT%H:%M:%SZ"`/!`date -u +"%Y-%m-%dT%H:%M:%SZ"`/g' "$target_file"
    sed -i 's/`mkdir -p /!`mkdir -p /g' "$target_file"
    sed -i 's/`git /!`git /g' "$target_file"
    sed -i 's/`gh /!`gh /g' "$target_file"
    sed -i 's/`ls /!`ls /g' "$target_file"

    # Replace file read patterns with auto-file-read
    sed -i 's/Read `.claude\/prds\/$ARGUMENTS.md`/@.claude\/prds\/$ARGUMENTS.md/g' "$target_file"
    sed -i 's/Read `.claude\/epics\/$ARGUMENTS\/epic.md`/@.claude\/epics\/$ARGUMENTS\/epic.md/g' "$target_file"
  fi

  echo "✅ Migrated: $filename"
  ((count++))
done

echo ""
echo "📊 Migration Summary"
echo "===================="
echo "Migrated: $count files"
echo "Skipped: $skipped files (manually migrated)"
echo "Total: $((count + skipped)) files in $TARGET_DIR"
echo ""
echo "✨ Migration complete!"
