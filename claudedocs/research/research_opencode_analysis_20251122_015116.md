# OpenCode Repository Analysis
**Research Date:** 2025-11-22
**Analysis Type:** Configuration Format & Command Structure
**Purpose:** Migration planning from Claude Code to OpenCode format

---

## Executive Summary

OpenCode uses a `.opencode/` directory structure with markdown files containing YAML frontmatter for agents and commands. The system is built on Bun runtime with TypeScript, using Zod for schema validation. Key differences from Claude Code include directory naming (`.opencode/` vs `.claude/`), frontmatter field names, and additional features like agent modes, permissions, and tool controls.

---

## 1. Directory Structure Specification

### OpenCode Layout
```
.opencode/
├── opencode.jsonc          # Main configuration file (JSONC format)
├── agent/                  # Agent definitions
│   ├── docs.md
│   ├── git-committer.md
│   └── [nested-dir]/
│       └── specialized.md  # Supports nested organization
├── command/                # Custom commands
│   ├── commit.md
│   ├── hello.md
│   ├── issues.md
│   └── spellcheck.md
├── mode/                   # Deprecated - migrated to agent/
│   └── *.md
├── plugin/                 # TypeScript/JavaScript plugins
│   ├── custom-tool.ts
│   └── integration.js
├── themes/                 # UI themes
│   └── mytheme.json
├── package.json           # Auto-generated for dependencies
├── bun.lock               # Auto-generated lock file
└── .gitignore             # Auto-generated (ignores node_modules, etc.)
```

### Claude Code Layout (for comparison)
```
.claude/
├── commands/              # Command organization
│   ├── agents/
│   ├── pm/
│   ├── github/
│   └── *.md
├── rules/                 # Rule files
│   └── *.md
├── prds/                  # Product requirements
│   └── *.md
├── epics/                 # Epic tracking (gitignored)
│   └── */
└── context/               # Context files
    └── *.md
```

**Key Differences:**
- OpenCode: Single `.opencode/` with type-based subdirectories
- Claude Code: Multiple subdirectories with functional organization
- OpenCode auto-generates package.json and manages dependencies
- Claude Code uses manual organization without auto-generation

---

## 2. Configuration Format Specification

### OpenCode Config File (`opencode.jsonc`)

```jsonc
{
  "$schema": "https://opencode.ai/config.json",

  // Plugin system
  "plugin": ["opencode-openai-codex-auth"],

  // Provider configuration
  "provider": {
    "opencode": {
      "options": {
        "baseURL": "http://localhost:8080"  // Optional override
      }
    }
  },

  // Agent configuration (inline, not file-based)
  "agent": {
    "custom-agent": {
      "model": "opencode/claude-sonnet-4-5",
      "temperature": 0.7,
      "top_p": 0.9,
      "description": "Custom agent description",
      "mode": "subagent",  // "primary", "subagent", or "all"
      "color": "#FF5733",
      "tools": {
        "todoread": false,
        "todowrite": true
      },
      "permission": {
        "edit": "allow",  // "allow", "deny", "ask"
        "bash": {
          "git*": "allow",
          "rm*": "ask",
          "*": "deny"
        },
        "webfetch": "allow",
        "doom_loop": "ask",
        "external_directory": "ask"
      }
    }
  },

  // Command configuration (inline, not file-based)
  "command": {
    "custom-cmd": {
      "description": "Command description",
      "agent": "build",
      "model": "opencode/claude-haiku-4-5",
      "subtask": true
    }
  },

  // Tool configuration
  "tools": {
    "read": true,
    "write": true,
    "bash": true
  },

  // Global permissions
  "permission": {
    "edit": "allow",
    "bash": {
      "*": "allow"
    }
  },

  // Username override
  "username": "custom-user",

  // Keybinds (extensive customization)
  "keybinds": {
    "leader": "ctrl+x",
    "app_exit": "ctrl+c,ctrl+d,<leader>q",
    "editor_open": "<leader>e",
    "session_new": "<leader>n"
  },

  // Enterprise features
  "enterprise": {
    "url": "http://localhost:3000"
  },

  // MCP (Model Context Protocol) servers
  "mcp": {
    "server-name": {
      "type": "local",
      "command": ["npx", "server-name"],
      "environment": {
        "API_KEY": "value"
      }
    }
  }
}
```

### Configuration Loading Priority
1. Global config: `~/.config/opencode/opencode.jsonc`
2. Environment variable: `$OPENCODE_CONFIG` (path to custom config)
3. Project configs: `{project-root}/.opencode/opencode.jsonc`
4. Upward search: Walks up directory tree looking for `.opencode/`
5. Environment override: `$OPENCODE_CONFIG_CONTENT` (JSON string)
6. Well-known provider configs (from authenticated providers)

**Merge Strategy:** Deep merge with later configs overriding earlier ones

---

## 3. Agent Definition Template

### Agent File Structure (`.opencode/agent/example.md`)

```markdown
---
description: When to use this agent - shown in UI and auto-selection
mode: subagent              # "primary" | "subagent" | "all"
model: opencode/claude-sonnet-4-5
temperature: 0.7
top_p: 0.9
color: "#FF5733"            # Hex color for UI display
tools:
  todoread: false
  todowrite: true
  read: true
permission:
  edit: allow               # "allow" | "deny" | "ask"
  bash:
    "git*": allow
    "rm*": ask
    "*": deny
  webfetch: allow
  doom_loop: ask
  external_directory: ask
---

Agent system prompt content goes here.

This is the instruction set that defines the agent's behavior.
Can use multiple paragraphs and markdown formatting.
```

### Built-in Agents

OpenCode includes three built-in agents:

1. **build** (Primary Agent)
   - Full access to all tools
   - Default agent for development work
   - Mode: `primary`

2. **plan** (Read-only Agent)
   - Denies file edits by default
   - Asks permission before bash commands
   - Limited bash commands allowed (read-only operations)
   - Mode: `primary`
   - Ideal for code exploration and planning

3. **general** (Subagent)
   - Multi-step task execution
   - Complex searches
   - Research capabilities
   - Mode: `subagent`
   - Invoked via `@general` in messages

### Agent Modes Explained

- **`primary`**: Main agent users can switch to (Tab key in UI)
- **`subagent`**: Invoked via `@agent-name` in messages, not switchable
- **`all`**: Can be both primary and subagent

### Agent Invocation

```markdown
# In messages:
@general search for authentication patterns in the codebase

# Tab key switches between primary agents:
build ⇄ plan ⇄ custom-primary
```

---

## 4. Command Definition Template

### Command File Structure (`.opencode/command/example.md`)

```markdown
---
description: Brief description of what the command does
agent: build                              # Optional: Agent to use
model: opencode/claude-haiku-4-5          # Optional: Model override
subtask: true                             # Optional: Is this a subtask?
---

Command template content with special variables:

$ARGUMENTS - User-provided arguments to the command

@README.md - File reference (auto-reads file)
@src/auth.ts - Multiple file references supported

!`git status` - Execute shell command and inject output

Example command that uses all features:

Search for $ARGUMENTS in the following files:
@src/
@tests/

Current git status:
!`git status`
```

### Command Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `$ARGUMENTS` | User arguments | `/cmd hello world` → `"hello world"` |
| `@filename` | File reference | `@README.md` reads and injects file |
| `@directory/` | Directory reference | `@src/` reads directory contents |
| <code>!\`command\`</code> | Shell execution | <code>!\`ls\`</code> executes and injects output |

### Command Invocation

```bash
# Basic command
/command-name

# Command with arguments
/command-name these are the arguments

# Commands are defined in .opencode/command/
# Nested directories create namespaced commands:
# .opencode/command/git/commit.md → /git/commit
```

---

## 5. Schema Definitions (TypeScript/Zod)

### Agent Schema
```typescript
export const Agent = z.object({
  model: z.string().optional(),
  temperature: z.number().optional(),
  top_p: z.number().optional(),
  prompt: z.string().optional(),
  tools: z.record(z.string(), z.boolean()).optional(),
  disable: z.boolean().optional(),
  description: z.string().optional()
    .describe("Description of when to use the agent"),
  mode: z.enum(["subagent", "primary", "all"]).optional(),
  color: z.string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Invalid hex color format")
    .optional()
    .describe("Hex color code for the agent (e.g., #FF5733)"),
  permission: z.object({
    edit: Permission.optional(),
    bash: z.union([
      Permission,
      z.record(z.string(), Permission)
    ]).optional(),
    webfetch: Permission.optional(),
    doom_loop: Permission.optional(),
    external_directory: Permission.optional(),
  }).optional(),
}).catchall(z.any())

type Permission = "allow" | "deny" | "ask"
```

### Command Schema
```typescript
export const Command = z.object({
  template: z.string(),              // Required: Template content
  description: z.string().optional(),
  agent: z.string().optional(),      // Agent name to use
  model: z.string().optional(),      // Model override
  subtask: z.boolean().optional(),   // Is subtask flag
})
```

### Permission Schema
```typescript
export const Permission = z.enum(["allow", "deny", "ask"])
```

---

## 6. Key Format Differences: OpenCode vs Claude Code

### Directory Structure
| Feature | OpenCode | Claude Code |
|---------|----------|-------------|
| Root directory | `.opencode/` | `.claude/` |
| Agent location | `.opencode/agent/*.md` | N/A (no separate agent files) |
| Command location | `.opencode/command/*.md` | `.claude/commands/**/*.md` |
| Config file | `opencode.jsonc` | N/A (no central config) |
| Nested organization | Supported for agents | Supported for commands |

### Frontmatter Fields

**Agent Frontmatter:**
| Field | OpenCode | Claude Code |
|-------|----------|-------------|
| Description | `description` | N/A |
| Mode | `mode: subagent\|primary\|all` | N/A |
| Model | `model` | N/A |
| Temperature | `temperature` | N/A |
| Tools | `tools: {name: bool}` | N/A |
| Permissions | `permission` object | N/A |
| Color | `color: "#HEX"` | N/A |

**Command Frontmatter:**
| Field | OpenCode | Claude Code |
|-------|----------|-------------|
| Description | `description` | N/A (in content) |
| Tools | N/A | `allowed-tools` |
| Agent | `agent` | N/A |
| Model | `model` | N/A |
| Subtask | `subtask` | N/A |

### Template Variables
| Variable | OpenCode | Claude Code |
|----------|----------|-------------|
| Arguments | `$ARGUMENTS` | `$ARGUMENTS` (same) |
| File reference | `@file.txt` | Context not auto-loaded |
| Shell exec | <code>!\`cmd\`</code> | N/A |

### Permission System
- **OpenCode**: Granular per-agent permissions for edit, bash (with patterns), webfetch
- **Claude Code**: Tool-level restrictions via `allowed-tools`

---

## 7. Migration Requirements Matrix

### File Structure Migration

| Migration Task | Complexity | Notes |
|----------------|------------|-------|
| Rename `.claude/` → `.opencode/` | Low | Simple directory rename |
| Move commands to `.opencode/command/` | Medium | Requires reorganization |
| Create agent files | High | New concept, needs definition |
| Create `opencode.jsonc` | Medium | Central config setup |
| Update frontmatter | High | Field mapping required |

### Frontmatter Conversion

**From Claude Code to OpenCode (Commands):**
```yaml
# BEFORE (Claude Code)
---
allowed-tools: Bash, Read, Write, LS
---

# AFTER (OpenCode)
---
description: Brief command description
agent: build              # Optional
model: provider/model     # Optional
subtask: false           # Optional
---
```

**New Agent Files (OpenCode only):**
```yaml
---
description: When to use this agent
mode: subagent
tools:
  bash: true
  read: true
permission:
  edit: allow
  bash:
    "*": allow
---
Agent system prompt here
```

### Content Migration

| Element | Action | Priority |
|---------|--------|----------|
| Command instructions | Keep as-is | Low |
| `$ARGUMENTS` usage | No change | None |
| File operations | Document → use `@file` | Medium |
| Bash operations | Document → use <code>!\`cmd\`</code> | Medium |
| Tool restrictions | Move to agent permissions | High |

### Configuration Migration

**New Configuration Required:**
1. Create `opencode.jsonc` with provider settings
2. Define agent permissions globally
3. Configure tool availability
4. Set up MCP servers (if using)
5. Configure keybinds (optional)

---

## 8. Critical Differences List

### 1. Agent System
- **OpenCode**: Explicit agent definitions with modes (primary/subagent/all)
- **Claude Code**: No separate agent concept, tools controlled per command

### 2. Permission Model
- **OpenCode**: Per-agent permissions with pattern matching
  ```yaml
  permission:
    bash:
      "git*": allow
      "rm*": ask
      "*": deny
  ```
- **Claude Code**: Per-command tool allowlist
  ```yaml
  allowed-tools: Bash, Read, Write
  ```

### 3. Configuration Approach
- **OpenCode**: Centralized JSONC config + file-based definitions
- **Claude Code**: Distributed markdown-only approach

### 4. Template Enhancement
- **OpenCode**: Auto-file-reading (`@file`), shell execution (<code>!\`cmd\`</code>)
- **Claude Code**: Manual file reading, explicit bash calls

### 5. Namespace Organization
- **OpenCode**: Type-based (agent/, command/, plugin/)
- **Claude Code**: Function-based (pm/, github/, agents/)

### 6. Model Selection
- **OpenCode**: Per-agent, per-command, and global levels
- **Claude Code**: Per-session selection

### 7. Plugin System
- **OpenCode**: TypeScript/JavaScript plugins in `.opencode/plugin/`
- **Claude Code**: No plugin system

### 8. Dependency Management
- **OpenCode**: Auto-manages package.json and dependencies
- **Claude Code**: No dependency management

---

## 9. Example Conversions

### Example 1: Simple Command

**Claude Code (`.claude/commands/pm/prd-new.md`):**
```markdown
---
allowed-tools: Bash, Read, Write, LS
---

# PRD New

Create a new Product Requirements Document for: $ARGUMENTS

## Instructions
1. Ask clarifying questions
2. Document requirements
3. Save to .claude/prds/$ARGUMENTS.md
```

**OpenCode (`.opencode/command/pm/prd-new.md`):**
```markdown
---
description: Create new Product Requirements Document
agent: build
model: opencode/claude-sonnet-4-5
subtask: false
---

# PRD New

Create a new Product Requirements Document for: $ARGUMENTS

Current project structure:
!`ls -la .claude/prds/`

## Instructions
1. Ask clarifying questions
2. Document requirements
3. Save to .claude/prds/$ARGUMENTS.md
```

### Example 2: Agent Definition (New in OpenCode)

**OpenCode Only (`.opencode/agent/pm.md`):**
```markdown
---
description: Product management agent for PRDs and epics
mode: subagent
model: opencode/claude-sonnet-4-5
temperature: 0.7
tools:
  read: true
  write: true
  bash: true
permission:
  edit: allow
  bash:
    "git*": allow
    "gh*": allow
    "rm*": ask
    "*": deny
  webfetch: allow
---

You are a product manager specialized in creating PRDs and managing epics.

Your responsibilities:
- Create comprehensive Product Requirements Documents
- Break down features into implementable epics
- Sync with GitHub Issues
- Track progress and deliverables

Always maintain clear, actionable documentation.
```

### Example 3: Command with Auto-File-Reading

**OpenCode (`.opencode/command/analyze-auth.md`):**
```markdown
---
description: Analyze authentication implementation
agent: plan
---

Analyze the authentication implementation:

Current auth code:
@src/auth/

Current tests:
@tests/auth/

Current git status:
!`git status src/auth/`

Provide security analysis and recommendations.
```

---

## 10. Migration Strategy Recommendations

### Phase 1: Analysis (Current Phase)
- ✅ Understand OpenCode format and structure
- ✅ Identify critical differences
- ✅ Document migration requirements

### Phase 2: Planning
1. **Inventory existing commands**
   - Count total commands
   - Categorize by complexity
   - Identify shared patterns

2. **Design agent architecture**
   - Define primary agents needed
   - Define subagents for specialized tasks
   - Map commands to appropriate agents

3. **Plan configuration**
   - Provider setup
   - Permission policies
   - Tool configurations

### Phase 3: Implementation
1. **Create base structure**
   ```bash
   mkdir -p .opencode/{agent,command,plugin}
   touch .opencode/opencode.jsonc
   ```

2. **Convert commands systematically**
   - Start with simplest commands
   - Test each conversion
   - Document any issues

3. **Create agent definitions**
   - Define core agents (build, specialized)
   - Set permissions appropriately
   - Test agent switching

4. **Setup configuration**
   - Configure providers
   - Set global permissions
   - Add MCP servers if needed

### Phase 4: Testing
1. Test each converted command
2. Verify agent switching works
3. Validate permissions are correct
4. Check file/shell auto-injection

### Phase 5: Optimization
1. Refine agent prompts based on usage
2. Optimize permission policies
3. Add convenience commands
4. Create plugins for repeated patterns

---

## 11. Tools and Utilities

### Validation Script (Proposed)
```bash
#!/bin/bash
# validate-opencode-config.sh

echo "🔍 Validating OpenCode configuration..."

# Check directory structure
test -d .opencode || { echo "❌ .opencode/ not found"; exit 1; }
test -d .opencode/agent || { echo "⚠️  .opencode/agent/ not found"; }
test -d .opencode/command || { echo "⚠️  .opencode/command/ not found"; }

# Check config file
test -f .opencode/opencode.jsonc || { echo "⚠️  opencode.jsonc not found"; }

# Validate frontmatter in agent files
for file in .opencode/agent/**/*.md; do
  if ! grep -q "^---$" "$file"; then
    echo "❌ Missing frontmatter: $file"
  fi
done

# Validate frontmatter in command files
for file in .opencode/command/**/*.md; do
  if ! grep -q "^---$" "$file"; then
    echo "❌ Missing frontmatter: $file"
  fi
done

echo "✅ Validation complete"
```

### Conversion Script Template
```bash
#!/bin/bash
# convert-command.sh <claude-file> <opencode-file>

CLAUDE_FILE=$1
OPENCODE_FILE=$2

# Extract allowed-tools
TOOLS=$(sed -n '/^allowed-tools:/p' "$CLAUDE_FILE" | cut -d: -f2)

# Create new frontmatter
cat > "$OPENCODE_FILE" <<EOF
---
description: $(basename "$OPENCODE_FILE" .md)
agent: build
---
EOF

# Copy content (skip old frontmatter)
sed -n '/^---$/,/^---$/!p' "$CLAUDE_FILE" >> "$OPENCODE_FILE"
```

---

## 12. Resources and References

### Official Documentation
- OpenCode Website: https://opencode.ai
- OpenCode Docs: https://opencode.ai/docs
- Agent Documentation: https://opencode.ai/docs/agents
- Configuration Schema: https://opencode.ai/config.json
- GitHub Repository: https://github.com/sst/opencode

### Key Files Analyzed
- `repos/opencode/README.md` - Project overview
- `repos/opencode/AGENTS.md` - Agent guidelines
- `repos/opencode/.opencode/` - Example configurations
- `repos/opencode/packages/opencode/src/agent/agent.ts` - Agent implementation
- `repos/opencode/packages/opencode/src/config/config.ts` - Config loading
- `repos/opencode/packages/opencode/src/config/markdown.ts` - Markdown parsing

### Schema Locations
- Agent schema: `src/config/config.ts` (line ~430)
- Command schema: `src/config/config.ts` (line ~420)
- Permission schema: `src/config/config.ts` (line ~390)

---

## 13. Quick Reference

### Command Cheat Sheet
```bash
# Create agent
cat > .opencode/agent/my-agent.md <<EOF
---
description: My custom agent
mode: subagent
---
Agent prompt here
EOF

# Create command
cat > .opencode/command/my-cmd.md <<EOF
---
description: My command
agent: build
---
Execute: $ARGUMENTS
EOF

# Use in OpenCode
/my-cmd arguments here
@my-agent do something
```

### Permission Pattern Examples
```yaml
permission:
  edit: allow
  bash:
    "git*": allow           # All git commands
    "git push*": ask        # Ask before push
    "rm -rf*": deny         # Never allow
    "ls*": allow            # Read-only commands
    "find*": allow
    "*": ask                # Ask for everything else
  webfetch: allow
  doom_loop: ask            # Prevent infinite loops
  external_directory: ask   # Warn when outside project
```

### Model Selection Priority
```
1. Command-level:    model: opencode/claude-haiku-4-5
2. Agent-level:      agent.model in opencode.jsonc
3. Global default:   provider.default in opencode.jsonc
```

---

## Conclusion

OpenCode provides a more structured and feature-rich configuration system compared to Claude Code. The migration requires:

1. **Directory restructure** - Move to `.opencode/` with type-based organization
2. **Agent definition** - New concept requiring thoughtful design
3. **Permission modeling** - Granular control replaces simple tool lists
4. **Configuration centralization** - Add `opencode.jsonc` for global settings
5. **Template enhancement** - Leverage auto-file-reading and shell execution

**Migration Complexity:** Medium-High
**Estimated Effort:** 2-3 days for full migration of existing commands
**Recommended Approach:** Incremental migration with parallel testing

**Key Benefits:**
- More powerful agent system
- Better permission control
- Auto-file and shell injection
- Plugin extensibility
- Centralized configuration

**Key Challenges:**
- Learning curve for agent modes
- Permission pattern design
- Frontmatter field mapping
- Testing all conversions
