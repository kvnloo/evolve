# OpenCode Configuration

This directory contains the standard OpenCode agent configuration for this project.

## Structure

```
.opencode/
├── agent/          # Simple agent definitions
├── command/        # Command configurations
├── themes/         # Theme files
├── opencode.jsonc  # Main configuration
└── README.md       # This file
```

## Quick Start

```bash
# Use OpenCode agents
opencode agent coder --task "Your task here"

# Run commands
opencode command build

# Change themes
opencode theme use default
```

## Standard Structure

This follows the standard OpenCode format with minimal configuration for a clean, portable setup that works with any OpenCode installation.