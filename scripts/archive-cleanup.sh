#!/bin/bash
# Archive Cleanup Script
# Manages documentation archives with retention policies
#
# Retention Policy:
# - Max age: 6 months
# - Max archives: 100 total
# - Priority: Newer archives kept over older ones

set -e

# Configuration
MAX_AGE_DAYS=180  # 6 months
MAX_ARCHIVES=100
DRY_RUN=false
VERBOSE=false

# Archive locations
ARCHIVE_DIRS=(
    "claudedocs/archive"
    "docs/archive"
)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --verbose|-v)
            VERBOSE=true
            shift
            ;;
        --max-age)
            MAX_AGE_DAYS="$2"
            shift 2
            ;;
        --max-archives)
            MAX_ARCHIVES="$2"
            shift 2
            ;;
        --help|-h)
            echo "Archive Cleanup Script"
            echo ""
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --dry-run         Show what would be deleted without deleting"
            echo "  --verbose, -v     Show detailed output"
            echo "  --max-age DAYS    Override max age (default: 180)"
            echo "  --max-archives N  Override max archives (default: 100)"
            echo "  --help, -h        Show this help"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

log() {
    if [ "$VERBOSE" = true ] || [ "$2" = "always" ]; then
        echo -e "$1"
    fi
}

log_action() {
    if [ "$DRY_RUN" = true ]; then
        echo -e "${YELLOW}[DRY RUN]${NC} Would delete: $1"
    else
        echo -e "${RED}[DELETE]${NC} $1"
    fi
}

# Count total archives
count_archives() {
    local count=0
    for dir in "${ARCHIVE_DIRS[@]}"; do
        if [ -d "$dir" ]; then
            count=$((count + $(find "$dir" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l)))
        fi
    done
    echo $count
}

# Get all archive folders sorted by date (oldest first)
get_sorted_archives() {
    for dir in "${ARCHIVE_DIRS[@]}"; do
        if [ -d "$dir" ]; then
            find "$dir" -mindepth 1 -maxdepth 1 -type d -printf "%T@ %p\n" 2>/dev/null
        fi
    done | sort -n | cut -d' ' -f2-
}

# Get archives older than MAX_AGE_DAYS
get_old_archives() {
    for dir in "${ARCHIVE_DIRS[@]}"; do
        if [ -d "$dir" ]; then
            find "$dir" -mindepth 1 -maxdepth 1 -type d -mtime +${MAX_AGE_DAYS} 2>/dev/null
        fi
    done
}

# Main cleanup logic
main() {
    echo "=========================================="
    echo "Archive Cleanup Script"
    echo "=========================================="
    echo ""
    echo "Configuration:"
    echo "  Max age: ${MAX_AGE_DAYS} days (6 months)"
    echo "  Max archives: ${MAX_ARCHIVES}"
    echo "  Dry run: ${DRY_RUN}"
    echo ""

    local total_archives=$(count_archives)
    echo "Current state: ${total_archives} total archives"
    echo ""

    local deleted_count=0

    # Phase 1: Delete archives older than MAX_AGE_DAYS
    echo "Phase 1: Checking for archives older than ${MAX_AGE_DAYS} days..."
    while IFS= read -r archive; do
        if [ -n "$archive" ]; then
            log_action "$archive"
            if [ "$DRY_RUN" = false ]; then
                rm -rf "$archive"
            fi
            ((deleted_count++))
        fi
    done < <(get_old_archives)

    if [ $deleted_count -eq 0 ]; then
        log "${GREEN}No old archives found.${NC}" "always"
    else
        log "${YELLOW}Phase 1: Marked ${deleted_count} old archives for deletion.${NC}" "always"
    fi
    echo ""

    # Phase 2: If still over MAX_ARCHIVES, delete oldest
    total_archives=$(count_archives)
    if [ $total_archives -gt $MAX_ARCHIVES ]; then
        local excess=$((total_archives - MAX_ARCHIVES))
        echo "Phase 2: Removing ${excess} archives to reach limit of ${MAX_ARCHIVES}..."

        local count=0
        while IFS= read -r archive; do
            if [ -n "$archive" ] && [ $count -lt $excess ]; then
                log_action "$archive"
                if [ "$DRY_RUN" = false ]; then
                    rm -rf "$archive"
                fi
                ((count++))
                ((deleted_count++))
            fi
        done < <(get_sorted_archives)
    else
        log "${GREEN}Archive count (${total_archives}) is within limit (${MAX_ARCHIVES}).${NC}" "always"
    fi

    echo ""
    echo "=========================================="
    if [ "$DRY_RUN" = true ]; then
        echo -e "${YELLOW}DRY RUN complete. ${deleted_count} archives would be deleted.${NC}"
    else
        echo -e "${GREEN}Cleanup complete. ${deleted_count} archives deleted.${NC}"
    fi

    local final_count=$(count_archives)
    echo "Final archive count: ${final_count}"
    echo "=========================================="
}

# Run main
main
