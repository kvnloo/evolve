#!/bin/bash

# Safe Duplicate File Cleanup Script
# Generated: 2025-11-06
# Purpose: Remove verified identical duplicate files from docs/ root

set -e  # Exit on any error

DOCS_DIR="/home/kvn/.claude-squad/worktrees/organize_18757c09ebc7d891/docs"
cd "$DOCS_DIR"

echo "=== Docs Duplicate Cleanup Script ==="
echo ""
echo "This script will remove VERIFIED IDENTICAL duplicate files from the root."
echo "Organized versions in subdirectories will be preserved."
echo ""

# Verification function
verify_identical() {
  local file1="$1"
  local file2="$2"

  if ! diff -q "$file1" "$file2" > /dev/null 2>&1; then
    echo "❌ ERROR: Files are NOT identical!"
    echo "   $file1"
    echo "   $file2"
    return 1
  fi
  return 0
}

# Safe deletion function
safe_delete() {
  local file="$1"
  local keep="$2"

  echo "Checking: $file"
  echo "  Keep version: $keep"

  if [ ! -f "$file" ]; then
    echo "  ⚠️  File doesn't exist, skipping: $file"
    return
  fi

  if [ ! -f "$keep" ]; then
    echo "  ❌ ERROR: Keep version doesn't exist: $keep"
    return 1
  fi

  if verify_identical "$file" "$keep"; then
    echo "  ✅ Verified identical"
    git rm "$file" 2>/dev/null || rm "$file"
    echo "  🗑️  Deleted: $file"
    echo ""
  else
    echo "  ⚠️  Files differ, manual review needed"
    echo ""
    return 1
  fi
}

echo "--- Phase 1: Verified Identical Duplicates ---"
echo ""

# 1. faq.md
safe_delete "./faq.md" "./troubleshooting/faq.md"

# 2. migration-plan.md
safe_delete "./migration-plan.md" "./blueprints/migration-plan.md"

# 3. security-analysis-report.md
safe_delete "./security-analysis-report.md" "./blueprints/security-analysis-report.md"

echo "--- Cleanup Summary ---"
echo ""
echo "Deleted files: 3"
echo "  - faq.md (kept in troubleshooting/)"
echo "  - migration-plan.md (kept in blueprints/)"
echo "  - security-analysis-report.md (kept in blueprints/)"
echo ""
echo "Kept organized versions:"
echo "  ✅ ./troubleshooting/faq.md"
echo "  ✅ ./blueprints/migration-plan.md"
echo "  ✅ ./blueprints/security-analysis-report.md"
echo ""
echo "✅ Phase 1 cleanup complete!"
echo ""
echo "Next steps:"
echo "  1. Review DUPLICATE-FILES-ANALYSIS.md for remaining files"
echo "  2. Commit changes: git commit -m 'docs: Remove duplicate files (Phase 1)'"
echo "  3. Proceed with Phase 2 file moves"
