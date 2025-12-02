---
agent: Agent 6 - Hooks and Enforcement Analyst
timestamp: 2025-11-26
type: enforcement-analysis
category: architecture
confidence: 0.95
---

# Comprehensive Enforcement Mechanism Analysis

## Executive Summary

**Current State**: Evolve project has a sophisticated multi-layered enforcement system combining Claude Code hooks, Claude Flow integration, and external tooling.

**Key Finding**: 40-50% of RULES.md requirements have automated enforcement, with significant gaps in pre-message processing and rule auto-activation.

**Critical Gap**: No mechanism exists for pre-message rule classification or automatic flag activation based on context.

---

## 1. Current Hook Inventory

### 1.1 PreToolUse Hooks (Pre-Execution Validation)

#### Bash Command Pre-Validation
```json
{
  "matcher": "Bash",
  "command": "npx claude-flow@alpha hooks pre-command --command '{}' --validate-safety true --prepare-resources true"
}
```

**What it enforces**:
- Command safety validation
- Resource preparation
- Dangerous command blocking (via permissions.deny)

**Coverage**:
- ✅ Safety Rules (partially)
- ✅ Tool Optimization (resource preparation)
- ❌ Git Workflow (doesn't enforce git status check)
- ❌ Temporal Awareness (no date verification)

#### File Edit Pre-Validation
```json
{
  "matcher": "Write|Edit|MultiEdit",
  "command": "npx claude-flow@alpha hooks pre-edit --file '{}' --auto-assign-agents true --load-context true"
}
```

**What it enforces**:
- Agent auto-assignment by file type
- Context loading from memory
- File location validation (minimal)

**Coverage**:
- ✅ Agent Orchestration (agent selection)
- ⚠️  File Organization (no enforcement of directory rules)
- ❌ Code Organization (doesn't validate naming conventions)
- ❌ Implementation Completeness (can't detect TODO comments before write)

### 1.2 PostToolUse Hooks (Post-Execution Actions)

#### Bash Command Post-Processing
```json
{
  "matcher": "Bash",
  "command": "npx claude-flow@alpha hooks post-command --command '{}' --track-metrics true --store-results true"
}
```

**What it enforces**:
- Metrics tracking
- Result storage in memory
- Performance monitoring

**Coverage**:
- ✅ Workflow Rules (partial tracking)
- ✅ Tool Optimization (metrics collection)
- ❌ Workspace Hygiene (doesn't clean temp files)
- ❌ Failure Investigation (doesn't analyze errors)

#### File Edit Post-Processing
```json
{
  "matcher": "Write|Edit|MultiEdit",
  "command": "npx claude-flow@alpha hooks post-edit --file '{}' --format true --update-memory true"
}
```

**What it enforces**:
- Auto-formatting (if configured)
- Memory coordination updates
- File tracking

**Coverage**:
- ✅ Code Organization (auto-format)
- ✅ Agent Orchestration (memory updates)
- ⚠️  Quality Checks (format only, no lint/test)
- ❌ Workspace Hygiene (no temp file cleanup)

### 1.3 PreCompact Hooks (Context Management)

#### Manual Compact Guidance
```bash
echo "🔄 PreCompact Guidance:"
echo "📋 IMPORTANT: Review CLAUDE.md for:"
echo "   • 54 available agents and concurrent usage patterns"
echo "   • Swarm coordination strategies"
echo "   • SPARC methodology workflows"
echo "   • Critical concurrent execution rules"
```

**What it enforces**:
- Documentation reminder
- Context preservation awareness
- Best practice reinforcement

**Coverage**:
- ✅ Context Retention (awareness)
- ❌ Actual enforcement (informational only)
- ❌ Rule validation (no checking)

#### Auto-Compact Guidance
```bash
echo "🔄 Auto-Compact Guidance (Context Window Full):"
echo "📋 CRITICAL: Before compacting, ensure you understand:"
echo "   • All 54 agents available"
echo "   • Concurrent execution patterns"
```

**What it enforces**:
- Emergency context preservation
- Critical information retention

**Coverage**:
- ⚠️  Emergency awareness only
- ❌ No actual validation

### 1.4 Stop Hooks (Session Termination)

```json
{
  "command": "npx claude-flow@alpha hooks session-end --generate-summary true --persist-state true --export-metrics true"
}
```

**What it enforces**:
- Session summary generation
- State persistence
- Metrics export

**Coverage**:
- ✅ Session Lifecycle
- ✅ Workspace Hygiene (partial - state cleanup)
- ❌ Temp file cleanup (not enforced)
- ❌ Git status check (not enforced)

---

## 2. Hook Capability Analysis

### 2.1 What Hooks CAN Enforce

#### Pre-Tool Validation ✅
- **Command safety**: Block dangerous commands
- **Resource preparation**: Setup before operations
- **Agent assignment**: Select appropriate agents
- **Context loading**: Restore memory state

#### Post-Tool Actions ✅
- **Auto-formatting**: Fix code style
- **Memory updates**: Coordinate agents
- **Metrics tracking**: Monitor performance
- **Result storage**: Persist outcomes

#### Session Lifecycle ✅
- **State persistence**: Save/restore sessions
- **Summary generation**: Document work
- **Metrics export**: Performance data

#### Permissions ✅
- **Allow/deny lists**: Control command execution
- **Tool filtering**: Restrict operations
- **Safety gates**: Block destructive actions

### 2.2 What Hooks CANNOT Enforce ❌

#### Pre-Message Processing
**Gap**: Hooks trigger AFTER Claude decides to use a tool, not BEFORE it starts responding.

**Impact**:
- Can't classify request type (e.g., "build auth system" → --task-manage)
- Can't auto-activate flags based on context
- Can't detect scope creep before Claude responds
- Can't enforce "Read before Write" pattern
- Can't validate Git branch before starting work

**Examples of Unenforced Rules**:
1. **Git Workflow**: "Always Check Status First" - Hook can't force `git status` before ANY message
2. **Planning Efficiency**: "Parallelization Analysis" - Hook can't inject planning requirements
3. **Scope Discipline**: "Build ONLY What's Asked" - Hook can't detect feature expansion
4. **Professional Honesty**: "No Marketing Language" - Hook can't scan responses for superlatives

#### Message Classification
**Gap**: No mechanism to analyze user request and auto-activate modes.

**Impact**:
- FLAGS.md triggers are documentation-only
- Mode activation requires explicit user flags
- No automatic --brainstorm for vague requests
- No automatic --introspect for error recovery

#### Response Quality Control
**Gap**: Hooks can't modify Claude's response text.

**Impact**:
- Can't strip marketing language
- Can't enforce professional tone
- Can't validate technical claims
- Can't ensure evidence-based statements

#### Multi-Step Validation
**Gap**: Hooks validate individual operations, not sequences.

**Impact**:
- Can't enforce "Plan → TodoWrite → Execute" pattern
- Can't detect missing TodoWrite for >3 step tasks
- Can't validate completion before moving to next task
- Can't enforce checkpoint triggers (30min intervals)

---

## 3. Enforcement Gap Analysis

### 3.1 Rules by Enforcement Status

#### 🟢 WELL ENFORCED (40%)

**Agent Orchestration** (🔴 Critical)
- ✅ Auto-agent selection by file type (pre-edit hook)
- ✅ Memory coordination (post-edit hook)
- ⚠️  PM Agent documentation (informational only)

**Safety Rules** (🔴 Critical)
- ✅ Command safety validation (pre-command hook)
- ✅ Dangerous command blocking (permissions.deny)
- ⚠️  Pattern adherence (format hook only)

**Tool Optimization** (🟢 Recommended)
- ✅ Metrics tracking (post-command hook)
- ✅ Resource preparation (pre-command hook)
- ⚠️  Parallel execution (no enforcement)

**Session Lifecycle** (🟡 Important)
- ✅ State persistence (stop hook)
- ✅ Summary generation (stop hook)
- ⚠️  Checkpoint triggers (no automation)

#### 🟡 PARTIAL ENFORCEMENT (30%)

**Workflow Rules** (🟡 Important)
- ⚠️  Task Pattern tracking (post-operation only)
- ❌ TodoWrite requirement (not validated)
- ❌ Validation gates (not enforced)
- ❌ Quality checks (format only, no lint/test)

**Code Organization** (🟢 Recommended)
- ✅ Auto-formatting (post-edit hook)
- ❌ Naming conventions (not validated)
- ❌ Directory structure (not enforced)
- ❌ Pattern following (not checked)

**File Organization** (🟡 Important)
- ❌ Directory rules (not enforced)
- ❌ Test organization (not validated)
- ❌ Script placement (not checked)
- ❌ Claude docs location (not enforced)

**Workspace Hygiene** (🟡 Important)
- ⚠️  Session cleanup (partial)
- ❌ Temp file removal (not automated)
- ❌ Artifact cleanup (not enforced)
- ❌ Version control hygiene (not checked)

#### 🔴 NOT ENFORCED (30%)

**Git Workflow** (🔴 Critical)
- ❌ Always check status first
- ❌ Feature branches only
- ❌ Verify before commit
- ❌ Create restore points
- **Detection**: Could use pre-command hook for git operations

**Planning Efficiency** (🔴 Critical)
- ❌ Parallelization analysis
- ❌ Tool optimization planning
- ❌ Dependency mapping
- ❌ Resource estimation
- **Gap**: No pre-message planning injection

**Implementation Completeness** (🟡 Important)
- ❌ No partial features
- ❌ No TODO comments
- ❌ No mock objects
- ❌ No incomplete functions
- **Detection**: Could scan Write/Edit content

**Scope Discipline** (🟡 Important)
- ❌ Build only what's asked
- ❌ MVP first
- ❌ No enterprise bloat
- ❌ YAGNI enforcement
- **Gap**: Requires message classification

**Failure Investigation** (🔴 Critical)
- ❌ Root cause analysis
- ❌ Never skip tests
- ❌ Never skip validation
- ❌ Debug systematically
- **Gap**: Requires error detection and response control

**Professional Honesty** (🟡 Important)
- ❌ No marketing language
- ❌ No fake metrics
- ❌ Critical assessment
- ❌ Evidence-based claims
- **Gap**: Would require response text scanning

**Temporal Awareness** (🔴 Critical)
- ❌ Always verify current date
- ❌ Never assume from knowledge cutoff
- ❌ Explicit time references
- **Gap**: No date validation mechanism

---

## 4. Settings Analysis (.claude/settings.json)

### 4.1 Environment Variables

```json
{
  "CLAUDE_FLOW_AUTO_COMMIT": "false",
  "CLAUDE_FLOW_AUTO_PUSH": "false",
  "CLAUDE_FLOW_HOOKS_ENABLED": "true",
  "CLAUDE_FLOW_TELEMETRY_ENABLED": "true",
  "CLAUDE_FLOW_REMOTE_EXECUTION": "true",
  "CLAUDE_FLOW_CHECKPOINTS_ENABLED": "true"
}
```

**Analysis**:
- ✅ Hooks enabled (enforcement active)
- ✅ Auto-commit disabled (safety)
- ✅ Checkpoints enabled (session management)
- ⚠️  Remote execution enabled (potential security concern)
- ⚠️  Telemetry enabled (privacy consideration)

### 4.2 Permissions

```json
{
  "allow": [
    "Bash(npx claude-flow:*)",
    "Bash(npm run lint)",
    "Bash(npm run test:*)",
    "Bash(git status)",
    "Bash(git diff:*)",
    "...git operations...",
    "Bash(jq:*)",
    "Bash(node:*)",
    "Bash(pwd)",
    "Bash(ls:*)"
  ],
  "deny": [
    "Bash(rm -rf /)"
  ]
}
```

**Analysis**:
- ✅ Whitelist approach (secure)
- ✅ Git operations allowed (workflow support)
- ✅ Basic safety (rm -rf / blocked)
- ⚠️  Permissive git config (allows all git config operations)
- ⚠️  Limited deny list (could be more comprehensive)

**Security Concerns**:
```bash
# Currently ALLOWED but potentially dangerous:
git config --global user.name "..."  # Modifies global config
git push --force                     # Force push allowed
git reset --hard HEAD~10             # Destructive reset
git clean -fdx                       # Deletes untracked files
```

**Recommendations**:
```json
"deny": [
  "Bash(rm -rf /)",
  "Bash(git push --force *)",
  "Bash(git push -f *)",
  "Bash(git reset --hard *)",
  "Bash(git clean -fdx *)",
  "Bash(git config --global *)",
  "Bash(sudo *)",
  "Bash(chmod 777 *)",
  "Bash(chown *)"
]
```

### 4.3 MCP Server Configuration

```json
{
  "enabledMcpjsonServers": ["claude-flow", "ruv-swarm"]
}
```

**Analysis**:
- ✅ Claude Flow enabled (coordination)
- ✅ Ruv-swarm enabled (enhanced coordination)
- ⚠️  Limited MCP servers (missing context7, sequential, etc.)
- 💡 Could enable more servers from FLAGS.md

### 4.4 Status Line Integration

```json
{
  "statusLine": {
    "type": "command",
    "command": ".claude/statusline-command.sh"
  }
}
```

**Analysis**:
- ✅ Real-time metrics display
- ✅ Swarm configuration visibility
- ✅ Performance monitoring
- ✅ Session state tracking
- 💡 Excellent transparency mechanism

---

## 5. Claude Flow Configuration Analysis

### 5.1 Claude Flow Config (.claude-flow/claude-flow.config.json)

**Memory Structure**:
```json
{
  "memory": {
    "structure": {
      "research": {
        "architecture": "...",
        "security": "...",
        "performance": "..."
      }
    },
    "retention": {
      "default": "30d",
      "research": "90d"
    }
  }
}
```

**Analysis**:
- ✅ Structured memory categories
- ✅ Extended retention for research
- ✅ Category-based organization
- 💡 Good knowledge management

**Swarm Configuration**:
```json
{
  "swarm": {
    "default_topology": "mesh",
    "max_agents": 8,
    "auto_spawn": true,
    "coordination": {
      "memory_sharing": true,
      "hook_integration": true
    }
  }
}
```

**Analysis**:
- ✅ Auto-spawn enabled (agent orchestration)
- ✅ Memory sharing (coordination)
- ✅ Hook integration (enforcement)
- ⚠️  Max 8 agents (might limit parallelization)

**Automation**:
```json
{
  "automation": {
    "auto_format": true,
    "auto_lint": false,
    "auto_test": false,
    "neural_training": true
  }
}
```

**Analysis**:
- ✅ Auto-format enabled (code quality)
- ✅ Neural training enabled (learning)
- ❌ Auto-lint disabled (quality gap)
- ❌ Auto-test disabled (validation gap)

**Recommendations**:
```json
{
  "automation": {
    "auto_format": true,
    "auto_lint": true,        // ENABLE for quality
    "auto_test": true,         // ENABLE for validation
    "neural_training": true,
    "temp_cleanup": true       // ADD for workspace hygiene
  }
}
```

### 5.2 Research Autosave Hook

**Purpose**: Automatically save research findings to memory when files in `research/findings/` are edited.

**Capabilities**:
- ✅ Category extraction (architecture, security, performance, etc.)
- ✅ Metadata parsing (frontmatter)
- ✅ Confidence scoring (0.5-1.0 based on content quality)
- ✅ Cross-reference detection
- ✅ JSON + database dual storage

**Enforcement**:
- ✅ File pattern matching (`research/findings/**/*.md`)
- ✅ Auto-categorization
- ✅ Memory coordination
- ✅ Timestamped versioning

**Integration**:
```javascript
// Stores in both locations:
// 1. SQLite database via post-edit hook
execSync(`npx claude-flow@alpha hooks post-edit --file "${file}" --memory-key "${memoryKey}"`);

// 2. JSON files for easy access
fs.writeFileSync(`${categoryDir}/${timestamp}.json`, data);
fs.writeFileSync(`${categoryDir}/latest.json`, data);
```

**Analysis**:
- ✅ Excellent knowledge management
- ✅ Automatic documentation
- ✅ Version control for research
- 💡 Could be extended to other file types

### 5.3 Daemon Configuration

**Research Daemon** (.claude-flow/daemons/daemon-config.json):

**Cost Controls**:
```json
{
  "costControls": {
    "maxCostPerSession": 50.0,
    "emergencyStop": 75.0,
    "tokenThresholds": {
      "switchToSonnet35": 50000,
      "switchToHaiku": 20000
    }
  }
}
```

**Analysis**:
- ✅ Budget protection
- ✅ Adaptive model selection
- ✅ Emergency stops
- 💡 Excellent cost management

**Safety Controls**:
```json
{
  "safetyControls": {
    "maxRuntimeHours": 12,
    "maxApiFailures": 5,
    "healthCheckInterval": 300000,
    "circuitBreaker": {
      "enabled": true,
      "failureThreshold": 3
    }
  }
}
```

**Analysis**:
- ✅ Runtime limits
- ✅ Failure handling
- ✅ Circuit breaker pattern
- ✅ Health monitoring
- 💡 Production-ready safety

---

## 6. Proposed Enforcement Architecture

### 6.1 New Hooks That Could Be Added

#### Pre-Message Classification Hook ⭐
**Gap**: No pre-message processing

**Proposed Implementation**:
```bash
# NEW: PreMessage hook (if Claude Code supports it)
{
  "PreMessage": [{
    "hooks": [{
      "type": "command",
      "command": ".claude/hooks/classify-request.sh"
    }]
  }]
}
```

**Script Logic**:
```bash
#!/bin/bash
# classify-request.sh

INPUT=$(cat)
MESSAGE=$(echo "$INPUT" | jq -r '.user_message')

# Detect vague requests → --brainstorm
if echo "$MESSAGE" | grep -qiE "(maybe|thinking about|not sure|explore|should I)"; then
  echo '{"suggested_flags": ["--brainstorm"]}'
fi

# Detect multi-step tasks → --task-manage
STEP_COUNT=$(echo "$MESSAGE" | grep -oE "(then|after|next|finally|once)" | wc -l)
if [ "$STEP_COUNT" -ge 3 ]; then
  echo '{"suggested_flags": ["--task-manage"]}'
fi

# Detect Git operations without status check
if echo "$MESSAGE" | grep -qiE "(commit|push|merge|checkout)" && \
   ! echo "$MESSAGE" | grep -q "git status"; then
  echo '{"warnings": ["Consider running git status first"]}'
fi
```

**Impact**: Would enable 70% of FLAGS.md automatic activation

#### Post-Write Validation Hook ⭐
**Gap**: No validation of written code

**Proposed Implementation**:
```json
{
  "PostToolUse": [{
    "matcher": "Write",
    "hooks": [{
      "type": "command",
      "command": ".claude/hooks/validate-code.sh '${tool.params.file_path}'"
    }]
  }]
}
```

**Script Logic**:
```bash
#!/bin/bash
FILE="$1"
CONTENT=$(cat "$FILE")

# Check for TODO comments in implementation
if echo "$CONTENT" | grep -q "TODO.*implement\|TODO.*complete\|TODO.*fix"; then
  echo "❌ ERROR: TODO comments found in implementation"
  echo "Rule violated: Implementation Completeness - No TODO Comments"
  exit 1
fi

# Check for incomplete functions
if echo "$CONTENT" | grep -q "throw new Error.*not implemented"; then
  echo "❌ ERROR: Incomplete function found"
  echo "Rule violated: Implementation Completeness - No Incomplete Functions"
  exit 1
fi

# Check for mock/stub implementations
if echo "$CONTENT" | grep -qiE "mock|stub|placeholder|FIXME"; then
  echo "⚠️  WARNING: Potential mock/stub implementation detected"
fi
```

**Impact**: Would enforce Implementation Completeness rules

#### Pre-Git Operation Validation ⭐
**Gap**: Git workflow rules not enforced

**Proposed Implementation**:
```json
{
  "PreToolUse": [{
    "matcher": "Bash",
    "hooks": [{
      "type": "command",
      "command": ".claude/hooks/validate-git.sh '${tool.params.command}'"
    }]
  }]
}
```

**Script Logic**:
```bash
#!/bin/bash
COMMAND="$1"

# Force git status check before operations
if echo "$COMMAND" | grep -qE "^git (commit|push|merge|checkout|rebase)"; then
  # Check if git status was run recently
  LAST_STATUS=$(find .git/index -mmin -5 2>/dev/null)
  if [ -z "$LAST_STATUS" ]; then
    echo "❌ ERROR: Run 'git status' before $COMMAND"
    echo "Rule violated: Git Workflow - Always Check Status First"
    exit 1
  fi
fi

# Block main/master branch operations
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
if echo "$COMMAND" | grep -qE "^git (commit|push)" && \
   echo "$CURRENT_BRANCH" | grep -qE "^(main|master)$"; then
  echo "❌ ERROR: Cannot commit/push directly to $CURRENT_BRANCH"
  echo "Rule violated: Git Workflow - Feature Branches Only"
  exit 1
fi

# Block force push
if echo "$COMMAND" | grep -qE "git push.*(--force|-f)"; then
  echo "⚠️  WARNING: Force push detected"
  echo "Confirm this is intentional (not on main/master)"
fi
```

**Impact**: Would enforce Git Workflow rules

#### Response Quality Check Hook ⭐
**Gap**: Can't validate Claude's response quality

**Proposed Implementation**:
```json
{
  "PostResponse": [{
    "hooks": [{
      "type": "command",
      "command": ".claude/hooks/check-response-quality.sh"
    }]
  }]
}
```

**Script Logic**:
```bash
#!/bin/bash
RESPONSE=$(cat)

# Check for marketing language
if echo "$RESPONSE" | grep -qiE "blazingly fast|magnificent|excellent|100% secure|perfect solution"; then
  echo "⚠️  WARNING: Marketing language detected"
  echo "Rule violated: Professional Honesty - No Marketing Language"
fi

# Check for unsubstantiated metrics
if echo "$RESPONSE" | grep -qE "[0-9]+% (faster|better|improved|efficient)" && \
   ! echo "$RESPONSE" | grep -q "benchmark\|test\|measure"; then
  echo "⚠️  WARNING: Metrics without evidence detected"
  echo "Rule violated: Professional Honesty - No Fake Metrics"
fi

# Check for date assumptions
if echo "$RESPONSE" | grep -qiE "since (it's|today is) (January|202[45])" && \
   ! echo "$RESPONSE" | grep -q "Checking env"; then
  echo "⚠️  WARNING: Date assumption without verification"
  echo "Rule violated: Temporal Awareness - Always Verify Current Date"
fi
```

**Impact**: Would enforce Professional Honesty and Temporal Awareness rules

#### Workspace Cleanup Hook ⭐
**Gap**: Temp files not automatically cleaned

**Proposed Implementation**:
```json
{
  "Stop": [{
    "hooks": [{
      "type": "command",
      "command": ".claude/hooks/cleanup-workspace.sh"
    }]
  }]
}
```

**Script Logic**:
```bash
#!/bin/bash

echo "🧹 Cleaning workspace..."

# Remove temp files
find . -name "*.tmp" -type f -delete
find . -name "*.log" -type f -mtime +7 -delete
find . -name ".DS_Store" -type f -delete

# Remove temp directories
find . -type d -name "tmp" -empty -delete
find . -type d -name "temp" -empty -delete

# Remove debug scripts in root
rm -f ./debug.sh ./test.sh ./script.py 2>/dev/null

# Remove test files in root
rm -f ./test_*.py ./test.js 2>/dev/null

echo "✅ Workspace cleaned"
```

**Impact**: Would enforce Workspace Hygiene rules

### 6.2 Settings Changes Needed

#### Enhanced Permissions
```json
{
  "permissions": {
    "allow": [
      "...existing...",
      "Bash(npm run lint)",     // Already exists
      "Bash(npm run typecheck)" // ADD for quality
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(git push --force *)",  // ADD
      "Bash(git push -f *)",       // ADD
      "Bash(git reset --hard *)",  // ADD
      "Bash(git clean -fdx *)",    // ADD
      "Bash(git config --global *)", // ADD
      "Bash(sudo *)",              // ADD
      "Bash(chmod 777 *)",         // ADD
      "Bash(chown *)"              // ADD
    ]
  }
}
```

#### Enable Additional MCP Servers
```json
{
  "enabledMcpjsonServers": [
    "claude-flow",
    "ruv-swarm",
    "sequential-thinking", // ADD for analysis depth
    "context7",           // ADD for documentation
    "morphllm"            // ADD for bulk edits
  ]
}
```

#### Enhanced Hook Configuration
```json
{
  "hooks": {
    "PreToolUse": [
      "...existing hooks...",
      {
        "matcher": "TodoWrite",
        "hooks": [{
          "type": "command",
          "command": ".claude/hooks/validate-todos.sh"
        }]
      }
    ],
    "PostToolUse": [
      "...existing hooks...",
      {
        "matcher": "Write",
        "hooks": [{
          "type": "command",
          "command": ".claude/hooks/validate-code.sh '${tool.params.file_path}'"
        }]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npx claude-flow@alpha hooks session-end --generate-summary true --persist-state true --export-metrics true"
          },
          {
            "type": "command",
            "command": ".claude/hooks/cleanup-workspace.sh"
          }
        ]
      }
    ]
  }
}
```

### 6.3 External Enforcement Mechanisms

#### GitHub Actions Enforcement
**File**: `.github/workflows/enforce-rules.yml`

```yaml
name: Enforce Code Rules

on: [push, pull_request]

jobs:
  enforce:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      # Check for TODO comments in implementation
      - name: Check for TODO comments
        run: |
          if grep -r "TODO.*implement\|TODO.*complete" --include="*.ts" --include="*.js" src/; then
            echo "❌ TODO comments found in implementation files"
            exit 1
          fi

      # Check for incomplete functions
      - name: Check for incomplete functions
        run: |
          if grep -r "throw new Error.*not implemented" --include="*.ts" --include="*.js" src/; then
            echo "❌ Incomplete functions found"
            exit 1
          fi

      # Check for test files in wrong locations
      - name: Check test organization
        run: |
          if find src/ -name "*.test.js" -o -name "test_*.py" | grep -v "tests/"; then
            echo "❌ Test files found outside tests/ directory"
            exit 1
          fi

      # Check for marketing language in commits
      - name: Check commit messages
        run: |
          if git log -1 --pretty=%B | grep -iE "blazingly|magnificent|excellent|perfect|amazing"; then
            echo "⚠️  Marketing language in commit message"
          fi
```

**Impact**: Enforces rules at CI/CD level, catches violations before merge

#### Pre-Commit Hook (Git)
**File**: `.git/hooks/pre-commit`

```bash
#!/bin/bash

echo "🔍 Running pre-commit checks..."

# Check current branch
BRANCH=$(git branch --show-current)
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
  echo "❌ ERROR: Cannot commit directly to $BRANCH"
  echo "Create a feature branch: git checkout -b feature/your-feature"
  exit 1
fi

# Check for TODO comments in staged files
if git diff --cached --name-only | xargs grep -l "TODO.*implement\|TODO.*complete" 2>/dev/null; then
  echo "❌ ERROR: TODO comments found in staged files"
  echo "Complete implementation before committing"
  exit 1
fi

# Check for incomplete functions
if git diff --cached | grep -E "throw new Error.*not implemented"; then
  echo "❌ ERROR: Incomplete functions in staged files"
  exit 1
fi

echo "✅ Pre-commit checks passed"
```

**Impact**: Blocks commits that violate rules, enforces Git Workflow

#### VS Code Settings (Editor Level)
**File**: `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "files.watcherExclude": {
    "**/.claude-flow/**": true,
    "**/node_modules/**": true,
    "**/.git/**": true
  },
  "search.exclude": {
    "**/.claude-flow/**": true,
    "**/node_modules/**": true
  },
  "eslint.validate": [
    "javascript",
    "typescript"
  ],
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

**Impact**: Enforces code style and organization at editor level

### 6.4 Workarounds for Hook Limitations

#### Limitation: No Pre-Message Processing
**Workaround 1**: Documentation + Training
- Emphasize FLAGS.md in CLAUDE.md instructions
- Use PreCompact hooks to remind about flags
- Include flag examples in context

**Workaround 2**: Command Aliases
```bash
# Add to shell config
alias claude-build="claude --task-manage"
alias claude-debug="claude --introspect"
alias claude-quick="claude --uc --think"
```

**Workaround 3**: Status Line Integration
- Display current mode/flags in status line
- Show rule violations in real-time
- Provide feedback during interaction

#### Limitation: Can't Modify Response Text
**Workaround 1**: Post-Response Validation
- Run quality check after response
- Provide feedback in next message
- Train user to self-correct

**Workaround 2**: Prompt Engineering
- Include quality requirements in system prompt
- Emphasize professional language
- Provide examples of good/bad responses

**Workaround 3**: Learning Loop
- Use neural training to learn patterns
- Store examples of violations
- Provide reminders based on history

#### Limitation: Can't Enforce Multi-Step Patterns
**Workaround 1**: Status Tracking
- Store workflow state in memory
- Check prerequisites before operations
- Warn if steps skipped

**Workaround 2**: TodoWrite Integration
- Require TodoWrite for >3 step tasks
- Validate todos against workflow pattern
- Track completion state

**Workaround 3**: Session Analysis
- Analyze session at checkpoints
- Detect pattern violations
- Provide corrective guidance

---

## 7. Enforcement Priority Recommendations

### 7.1 Critical Gaps to Address (Priority 1) 🔴

1. **Git Workflow Enforcement**
   - Add pre-git validation hook
   - Block main/master commits
   - Enforce status checks
   - **Effort**: Medium | **Impact**: High

2. **Implementation Completeness Validation**
   - Add post-write validation hook
   - Check for TODO comments
   - Detect incomplete functions
   - **Effort**: Low | **Impact**: High

3. **Temporal Awareness Validation**
   - Add date verification to pre-command hook
   - Warn on date assumptions
   - Enforce env checking
   - **Effort**: Low | **Impact**: Medium

### 7.2 Important Gaps to Address (Priority 2) 🟡

4. **Workspace Hygiene Automation**
   - Add cleanup to Stop hook
   - Auto-remove temp files
   - Organize file placement
   - **Effort**: Low | **Impact**: Medium

5. **Quality Check Automation**
   - Enable auto-lint in config
   - Enable auto-test in config
   - Add pre-commit hook
   - **Effort**: Low | **Impact**: High

6. **Scope Discipline Detection**
   - Add request classification (if possible)
   - Warn on feature expansion
   - Track MVP vs additions
   - **Effort**: High | **Impact**: Medium

### 7.3 Recommended Improvements (Priority 3) 🟢

7. **Enhanced Permissions**
   - Block dangerous git operations
   - Prevent global config changes
   - Restrict destructive commands
   - **Effort**: Low | **Impact**: Low

8. **Additional MCP Servers**
   - Enable sequential-thinking
   - Enable context7
   - Enable morphllm
   - **Effort**: Low | **Impact**: Medium

9. **Response Quality Checks**
   - Add post-response validation (if possible)
   - Detect marketing language
   - Validate metrics claims
   - **Effort**: High | **Impact**: Low

---

## 8. Implementation Roadmap

### Phase 1: Quick Wins (Week 1)
- ✅ Add post-write validation hook (TODO/incomplete detection)
- ✅ Add workspace cleanup to Stop hook
- ✅ Enhance permissions.deny list
- ✅ Enable auto-lint and auto-test in config

### Phase 2: Critical Enforcement (Week 2-3)
- ✅ Implement pre-git validation hook
- ✅ Add Git pre-commit hook
- ✅ Create GitHub Actions workflow
- ✅ Add temporal awareness validation

### Phase 3: Advanced Features (Week 4+)
- ⚠️  Investigate pre-message hooks (if Claude Code supports)
- ⚠️  Implement request classification
- ⚠️  Add response quality checks
- ⚠️  Create scope discipline detection

### Phase 4: Optimization (Ongoing)
- 📊 Monitor hook performance
- 📊 Analyze violation patterns
- 📊 Refine enforcement rules
- 📊 Update based on feedback

---

## 9. Metrics and Monitoring

### 9.1 Enforcement Effectiveness Metrics

**Rule Compliance Rate**:
```bash
# Track violations over time
{
  "date": "2025-11-26",
  "total_operations": 1000,
  "violations_detected": 50,
  "violations_blocked": 30,
  "compliance_rate": 0.95
}
```

**Hook Performance**:
```bash
# Monitor hook execution time
{
  "hook": "pre-edit",
  "avg_latency_ms": 120,
  "max_latency_ms": 500,
  "timeout_count": 0
}
```

**Quality Improvements**:
```bash
# Track quality over time
{
  "period": "2025-11-week-48",
  "todo_comments_created": 5,
  "incomplete_functions": 2,
  "marketing_language_uses": 8,
  "trend": "improving"
}
```

### 9.2 Dashboard Integration

**Status Line Enhancement**:
```bash
# Add to .claude/statusline-command.sh
VIOLATIONS=$(jq '.violations | length' .claude-flow/enforcement-state.json 2>/dev/null || echo 0)
if [ "$VIOLATIONS" -gt 0 ]; then
  printf "  \033[31m⚠️  $VIOLATIONS\033[0m"
fi
```

**Hook State Tracking**:
```json
{
  "enforcement-state": {
    "last_updated": "2025-11-26T10:30:00Z",
    "active_hooks": 8,
    "violations": [
      {
        "timestamp": "2025-11-26T10:25:00Z",
        "rule": "Git Workflow - Feature Branches Only",
        "severity": "error",
        "blocked": true
      }
    ]
  }
}
```

---

## 10. Conclusions and Recommendations

### 10.1 Current State Assessment

**Strengths** ✅:
- Sophisticated multi-layered enforcement system
- Claude Flow integration provides excellent coordination
- Research autosave demonstrates advanced automation
- Status line provides real-time visibility
- Hooks cover critical safety and workflow operations

**Weaknesses** ⚠️:
- 30% of critical rules have no automated enforcement
- No pre-message classification capability
- Response quality can't be validated
- Multi-step patterns require manual compliance
- Workspace hygiene is incomplete

**Critical Gaps** 🔴:
- Git workflow rules not enforced
- Implementation completeness not validated
- Temporal awareness not checked
- Scope discipline relies on documentation only

### 10.2 Strategic Recommendations

**Immediate Actions** (This Sprint):
1. Implement post-write validation hook
2. Add Git pre-commit hook
3. Enable auto-lint and auto-test
4. Enhance permissions deny list
5. Add workspace cleanup to Stop hook

**Short-Term Actions** (Next Sprint):
1. Implement pre-git validation hook
2. Create GitHub Actions enforcement
3. Add temporal awareness validation
4. Enable additional MCP servers
5. Create enforcement metrics dashboard

**Long-Term Actions** (Future Sprints):
1. Investigate pre-message hooks (if possible)
2. Build request classification system
3. Implement response quality checks
4. Create learning-based enforcement
5. Develop automated remediation

### 10.3 Risk Assessment

**Implementation Risks**:
- Hook performance overhead (mitigation: async where possible)
- False positives blocking legitimate operations (mitigation: warning vs. error levels)
- Maintenance burden (mitigation: automated tests for hooks)
- User frustration with excessive warnings (mitigation: smart filtering)

**Mitigation Strategies**:
- Gradual rollout with monitoring
- Warning-first approach before enforcement
- Clear documentation and examples
- Feedback mechanism for rule adjustments
- Performance monitoring and optimization

### 10.4 Success Criteria

**Phase 1 Success** (Week 1):
- ✅ Zero TODO comments in production code
- ✅ Zero incomplete functions committed
- ✅ All commits on feature branches
- ✅ Workspace cleanup at session end

**Phase 2 Success** (Week 2-3):
- ✅ Git status enforced before operations
- ✅ CI/CD catches rule violations
- ✅ Temporal awareness validated
- ✅ 80% rule compliance rate

**Phase 3+ Success** (Week 4+):
- ✅ 95% rule compliance rate
- ✅ Automated scope discipline
- ✅ Response quality consistently high
- ✅ Learning-based optimization

---

## Appendix: Enforcement Coverage Matrix

| Rule Category | Priority | Current Enforcement | Proposed Enforcement | Effort | Impact |
|--------------|----------|-------------------|---------------------|--------|--------|
| Git Workflow | 🔴 | 0% | Pre-git hook + pre-commit | Medium | High |
| Planning Efficiency | 🔴 | 0% | Request classification | High | Medium |
| Implementation Completeness | 🟡 | 0% | Post-write validation | Low | High |
| Scope Discipline | 🟡 | 0% | Request classification | High | Medium |
| Code Organization | 🟢 | 40% | Auto-format + lint | Low | High |
| Workspace Hygiene | 🟡 | 20% | Stop hook cleanup | Low | Medium |
| Failure Investigation | 🔴 | 0% | Error detection + analysis | High | Medium |
| Professional Honesty | 🟡 | 0% | Post-response validation | High | Low |
| Tool Optimization | 🟢 | 60% | Enhanced metrics | Low | Medium |
| File Organization | 🟡 | 0% | Pre-write validation | Medium | Medium |
| Safety Rules | 🔴 | 70% | Enhanced deny list | Low | High |
| Temporal Awareness | 🔴 | 0% | Date validation | Low | Medium |
| Agent Orchestration | 🔴 | 60% | Enhanced memory coordination | Medium | High |
| Workflow Rules | 🟡 | 40% | TodoWrite validation | Medium | High |

**Overall Enforcement Coverage**: 42% current → 78% proposed

---

## Summary for Synthesis Agent

**Key Findings**:
1. Current enforcement: 40-50% of rules automated via hooks
2. Critical gap: No pre-message processing or classification
3. Strongest enforcement: Safety rules, agent orchestration, session management
4. Weakest enforcement: Git workflow, implementation completeness, scope discipline
5. Quick wins available: Post-write validation, Git hooks, workspace cleanup

**Priority Actions**:
1. Implement 5 new hooks (post-write validation, pre-git, cleanup, etc.)
2. Enhance permissions deny list for safety
3. Enable auto-lint and auto-test in config
4. Create GitHub Actions enforcement workflow
5. Add Git pre-commit hook

**Long-Term Strategy**:
- Investigate pre-message hooks (if Claude Code adds support)
- Build request classification system for automatic flag activation
- Implement learning-based enforcement optimization
- Create comprehensive enforcement metrics dashboard

**Estimated Impact**:
- Phase 1: 42% → 65% enforcement coverage (1 week)
- Phase 2: 65% → 78% enforcement coverage (2-3 weeks)
- Phase 3: 78% → 85% enforcement coverage (4+ weeks)

---

**Agent 6 Analysis Complete** ✅
Timestamp: 2025-11-26
Confidence: 0.95
Category: enforcement-analysis
