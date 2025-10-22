#!/usr/bin/env bash
# Example Helper Script Template
# Description: Template for creating helper scripts following framework best practices
# Usage: ./helper-script-example.sh [options]

# Strict mode: exit on error, undefined variables, pipe failures
set -euo pipefail

# Script directory and project root
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
readonly CLAUDE_DIR="${PROJECT_ROOT}/.claude"

# Color output (optional but helpful)
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly NC='\033[0m' # No Color

# Logging functions
log_info() {
  echo -e "${GREEN}[INFO]${NC} $*"
}

log_warn() {
  echo -e "${YELLOW}[WARN]${NC} $*" >&2
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $*" >&2
}

# Show usage information
usage() {
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Example helper script demonstrating best practices.

OPTIONS:
    -h, --help        Show this help message
    -v, --verbose     Enable verbose output
    -d, --dry-run     Show what would be done without executing
    -c, --config FILE Use specific config file

EXAMPLES:
    $(basename "$0") --dry-run
    $(basename "$0") --config custom.conf
    $(basename "$0") --verbose

For more information, see: docs/script-reference.md
EOF
}

# Validate environment
validate_environment() {
  log_info "Validating environment..."

  # Check we're in project root
  if [[ ! -f "${PROJECT_ROOT}/CLAUDE.md" ]]; then
    log_error "Not in project root (CLAUDE.md not found)"
    log_error "Current directory: $(pwd)"
    return 1
  fi

  # Check required directories
  if [[ ! -d "${CLAUDE_DIR}" ]]; then
    log_error ".claude directory not found"
    return 1
  fi

  log_info "Environment validation passed"
  return 0
}

# Example: Process a file
process_file() {
  local file="$1"

  log_info "Processing file: ${file}"

  # Validate input
  if [[ ! -f "${file}" ]]; then
    log_error "File not found: ${file}"
    return 1
  fi

  # Example processing (replace with actual logic)
  local line_count
  line_count=$(wc -l < "${file}")

  log_info "File has ${line_count} lines"

  # Do something with the file...

  log_info "File processing complete"
  return 0
}

# Example: Batch operation
batch_operation() {
  local pattern="$1"

  log_info "Running batch operation for pattern: ${pattern}"

  # Find files matching pattern
  local files=()
  while IFS= read -r -d '' file; do
    files+=("${file}")
  done < <(find "${PROJECT_ROOT}" -name "${pattern}" -type f -print0)

  if [[ ${#files[@]} -eq 0 ]]; then
    log_warn "No files found matching pattern: ${pattern}"
    return 0
  fi

  log_info "Found ${#files[@]} files to process"

  # Process each file
  local count=0
  for file in "${files[@]}"; do
    if process_file "${file}"; then
      ((count++))
    else
      log_warn "Failed to process: ${file}"
    fi
  done

  log_info "Successfully processed ${count}/${#files[@]} files"
  return 0
}

# Main function
main() {
  local verbose=false
  local dry_run=false
  local config_file=""

  # Parse arguments
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -h|--help)
        usage
        exit 0
        ;;
      -v|--verbose)
        verbose=true
        shift
        ;;
      -d|--dry-run)
        dry_run=true
        shift
        ;;
      -c|--config)
        config_file="$2"
        shift 2
        ;;
      *)
        log_error "Unknown option: $1"
        usage
        exit 1
        ;;
    esac
  done

  # Set verbose if requested
  if [[ "${verbose}" == true ]]; then
    set -x
  fi

  # Show dry-run notice
  if [[ "${dry_run}" == true ]]; then
    log_warn "DRY RUN MODE - No changes will be made"
  fi

  # Validate environment
  validate_environment || exit 1

  # Load config if specified
  if [[ -n "${config_file}" ]]; then
    if [[ -f "${config_file}" ]]; then
      log_info "Loading config: ${config_file}"
      # shellcheck source=/dev/null
      source "${config_file}"
    else
      log_error "Config file not found: ${config_file}"
      exit 1
    fi
  fi

  # Main logic goes here
  log_info "Starting main operation..."

  # Example: Process markdown files
  if [[ "${dry_run}" == true ]]; then
    log_info "Would process markdown files (dry-run)"
  else
    batch_operation "*.md"
  fi

  log_info "Operation complete!"
  return 0
}

# Run main function with all arguments
main "$@"
