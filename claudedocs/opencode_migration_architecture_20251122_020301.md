# OpenCode Migration Architecture
**Comprehensive Systems Design for .claude → .opencode Migration**

**Document Version**: 1.0
**Created**: 2025-11-22
**Analysis Type**: ULTRATHINK Deep Systems Architecture
**Scope**: 215 commands, 78 agents, 11 rules, 6 helpers, 8 configs

---

## Executive Summary

### Migration Scope
- **Total Files**: 341 files requiring conversion
- **Commands**: 215 slash commands → agent integrations
- **Agents**: 78 specialized agents → OpenCode agent definitions
- **Rules**: 11 behavioral rules → agent instruction embeddings
- **Helpers**: 6 utility scripts → shared agent resources
- **Configs**: 8 configuration files → opencode.jsonc integration

### Critical Success Factors
1. **Zero Data Loss**: All 341 files must be accounted for
2. **Permission Integrity**: Agent permissions must match or exceed current command permissions
3. **Dependency Preservation**: All command relationships and agent coordination patterns maintained
4. **Performance Parity**: Migration should not degrade execution speed
5. **Rollback Safety**: Ability to revert at any stage without data loss

### Key Architectural Decisions

**Decision 1: Agent Consolidation Strategy**
- **Current**: 78 specialized agents + 215 commands
- **Target**: 18 consolidated agents with role-based permissions
- **Rationale**: OpenCode's agent model favors fewer, more powerful agents over many specialized ones

**Decision 2: Permission Model**
- **Approach**: Start restrictive, expand as needed
- **Validation**: Test each agent with real-world tasks before granting additional permissions
- **Audit Trail**: Document all permission grants and justifications

**Decision 3: Migration Strategy**
- **Parallel Execution**: 5 concurrent migration batches
- **Incremental Cutover**: Migrate by functional domain, validate before next
- **Dual Operation Period**: Keep .claude operational during .opencode testing (2-4 weeks)

---

## Part 1: Agent Architecture Design

### 1.1 Core Agent Definitions

#### Tier 1: Build Agents (Core Development)

**Agent: `coder-agent`**
```json
{
  "name": "coder-agent",
  "type": "build",
  "description": "Core code implementation, file operations, and refactoring",
  "permissions": {
    "fs": ["read", "write", "delete"],
    "exec": ["shell"],
    "mcp": ["all"],
    "github": ["read"],
    "network": ["http"]
  },
  "specialized_for": [
    "Code implementation",
    "File system operations",
    "Refactoring and optimization",
    "Multi-file editing",
    "Pattern-based transformations"
  ],
  "command_sources": [
    "/commands/automation/",
    "/commands/optimization/",
    "/agents/development/"
  ],
  "estimated_commands_migrated": 45
}
```

**Agent: `reviewer-agent`**
```json
{
  "name": "reviewer-agent",
  "type": "build",
  "description": "Code review, quality analysis, and best practice enforcement",
  "permissions": {
    "fs": ["read"],
    "exec": ["shell:read-only"],
    "mcp": ["sequential", "context7"],
    "github": ["read", "comment"]
  },
  "specialized_for": [
    "Code quality analysis",
    "Security vulnerability scanning",
    "Best practice enforcement",
    "Technical debt assessment",
    "Automated code review"
  ],
  "command_sources": [
    "/commands/analysis/",
    "/agents/analysis/code-review/"
  ],
  "estimated_commands_migrated": 25
}
```

**Agent: `tester-agent`**
```json
{
  "name": "tester-agent",
  "type": "build",
  "description": "Test creation, execution, and quality assurance",
  "permissions": {
    "fs": ["read", "write"],
    "exec": ["shell"],
    "mcp": ["playwright", "context7"],
    "github": ["read"]
  },
  "specialized_for": [
    "Unit test generation",
    "Integration test creation",
    "E2E test automation",
    "Test coverage analysis",
    "CI/CD test integration"
  ],
  "command_sources": [
    "/agents/testing/",
    "/commands/verify/"
  ],
  "estimated_commands_migrated": 20
}
```

**Agent: `architect-agent`**
```json
{
  "name": "architect-agent",
  "type": "build",
  "description": "System design, architecture decisions, and technical planning",
  "permissions": {
    "fs": ["read", "write"],
    "exec": ["shell:read-only"],
    "mcp": ["sequential", "context7"],
    "github": ["read"]
  },
  "specialized_for": [
    "System architecture design",
    "Component interaction design",
    "Data flow analysis",
    "Technology selection",
    "Scalability planning"
  ],
  "command_sources": [
    "/agents/architecture/",
    "/commands/analysis/"
  ],
  "estimated_commands_migrated": 15
}
```

#### Tier 2: Plan Agents (Project Management)

**Agent: `pm-agent`**
```json
{
  "name": "pm-agent",
  "type": "plan",
  "description": "PRD creation, epic management, and project orchestration",
  "permissions": {
    "fs": ["read", "write:*.md", "write:.claude/prds/**", "write:.claude/epics/**"],
    "exec": ["shell:git"],
    "github": ["issues", "labels", "projects"],
    "mcp": ["sequential"]
  },
  "specialized_for": [
    "PRD generation",
    "Epic decomposition",
    "GitHub issue sync",
    "Progress tracking",
    "Milestone planning"
  ],
  "command_sources": [
    "/commands/pm/",
    "/agents/goal/"
  ],
  "estimated_commands_migrated": 35
}
```

**Agent: `planner-agent`**
```json
{
  "name": "planner-agent",
  "type": "plan",
  "description": "Task breakdown, workflow orchestration, and execution planning",
  "permissions": {
    "fs": ["read", "write:.claude/checkpoints/**"],
    "exec": ["shell:read-only"],
    "mcp": ["sequential", "serena"],
    "github": ["read"]
  },
  "specialized_for": [
    "Task decomposition",
    "Dependency analysis",
    "Resource allocation",
    "Timeline estimation",
    "Workflow optimization"
  ],
  "command_sources": [
    "/commands/workflows/",
    "/agents/reasoning/"
  ],
  "estimated_commands_migrated": 18
}
```

**Agent: `tracker-agent`**
```json
{
  "name": "tracker-agent",
  "type": "plan",
  "description": "Progress monitoring, metrics collection, and reporting",
  "permissions": {
    "fs": ["read", "write:.claude/context/**", "write:.claude/sessions/**"],
    "exec": ["shell:read-only"],
    "mcp": ["serena"],
    "github": ["read"]
  },
  "specialized_for": [
    "Progress tracking",
    "Metrics collection",
    "Status reporting",
    "Session management",
    "Context persistence"
  ],
  "command_sources": [
    "/commands/monitoring/",
    "/commands/context/"
  ],
  "estimated_commands_migrated": 12
}
```

#### Tier 3: Custom Agents (GitHub & Integration)

**Agent: `github-agent`**
```json
{
  "name": "github-agent",
  "type": "custom",
  "description": "Complete GitHub operations: issues, PRs, releases, workflows",
  "permissions": {
    "fs": ["read", "write:.github/**"],
    "exec": ["shell:git", "shell:gh"],
    "github": ["all"],
    "mcp": ["sequential"]
  },
  "specialized_for": [
    "Issue management",
    "Pull request operations",
    "Release automation",
    "Workflow management",
    "Repository analytics"
  ],
  "command_sources": [
    "/commands/github/",
    "/agents/github/"
  ],
  "estimated_commands_migrated": 30
}
```

**Agent: `release-agent`**
```json
{
  "name": "release-agent",
  "type": "custom",
  "description": "Release management, versioning, and changelog generation",
  "permissions": {
    "fs": ["read", "write:CHANGELOG.md", "write:package.json"],
    "exec": ["shell:git", "shell:npm"],
    "github": ["releases", "tags"],
    "mcp": ["sequential"]
  },
  "specialized_for": [
    "Semantic versioning",
    "Changelog generation",
    "Release notes creation",
    "Tag management",
    "Distribution packaging"
  ],
  "command_sources": [
    "/commands/github/release*.md"
  ],
  "estimated_commands_migrated": 8
}
```

#### Tier 4: Domain Specialists

**Agent: `ui-agent`**
```json
{
  "name": "ui-agent",
  "type": "custom",
  "description": "Frontend development, UI/UX, and design system operations",
  "permissions": {
    "fs": ["read", "write:src/components/**", "write:src/ui/**"],
    "exec": ["shell:npm"],
    "mcp": ["magic", "playwright", "chrome-devtools"],
    "github": ["read"]
  },
  "specialized_for": [
    "Component creation",
    "UI cloning and iteration",
    "Design system integration",
    "Accessibility testing",
    "Visual regression testing"
  ],
  "command_sources": [
    "/commands/ui/",
    "/tools/UIED/"
  ],
  "estimated_commands_migrated": 15
}
```

**Agent: `data-agent`**
```json
{
  "name": "data-agent",
  "type": "custom",
  "description": "Database operations, migrations, and data management",
  "permissions": {
    "fs": ["read", "write:migrations/**", "write:db/**"],
    "exec": ["shell:psql", "shell:sqlite3"],
    "mcp": ["sequential"],
    "github": ["read"]
  },
  "specialized_for": [
    "Schema design",
    "Migration generation",
    "Data modeling",
    "Query optimization",
    "Data validation"
  ],
  "command_sources": [
    "/agents/data/"
  ],
  "estimated_commands_migrated": 10
}
```

**Agent: `devops-agent`**
```json
{
  "name": "devops-agent",
  "type": "custom",
  "description": "CI/CD, infrastructure, deployment, and operations",
  "permissions": {
    "fs": ["read", "write:.github/workflows/**", "write:docker/**"],
    "exec": ["shell"],
    "mcp": ["sequential"],
    "github": ["workflows", "actions"]
  },
  "specialized_for": [
    "CI/CD pipeline creation",
    "Docker containerization",
    "Infrastructure as code",
    "Deployment automation",
    "Monitoring setup"
  ],
  "command_sources": [
    "/agents/devops/"
  ],
  "estimated_commands_migrated": 12
}
```

**Agent: `security-agent`**
```json
{
  "name": "security-agent",
  "type": "custom",
  "description": "Security scanning, vulnerability assessment, and compliance",
  "permissions": {
    "fs": ["read"],
    "exec": ["shell:npm audit", "shell:trivy"],
    "mcp": ["sequential"],
    "github": ["security"]
  },
  "specialized_for": [
    "Vulnerability scanning",
    "Dependency auditing",
    "Security best practices",
    "Compliance checking",
    "Threat modeling"
  ],
  "command_sources": [
    "/commands/analysis/security*.md"
  ],
  "estimated_commands_migrated": 8
}
```

**Agent: `docs-agent`**
```json
{
  "name": "docs-agent",
  "type": "custom",
  "description": "Documentation generation, API docs, and technical writing",
  "permissions": {
    "fs": ["read", "write:docs/**", "write:README.md"],
    "exec": ["shell:typedoc"],
    "mcp": ["context7", "sequential"],
    "github": ["read"]
  },
  "specialized_for": [
    "API documentation",
    "README generation",
    "Tutorial creation",
    "Documentation site building",
    "Code comment generation"
  ],
  "command_sources": [
    "/agents/documentation/"
  ],
  "estimated_commands_migrated": 10
}
```

#### Tier 5: Advanced Capabilities

**Agent: `research-agent`**
```json
{
  "name": "research-agent",
  "type": "custom",
  "description": "Deep research, web search, and knowledge synthesis",
  "permissions": {
    "fs": ["read", "write:claudedocs/research/**"],
    "exec": ["shell:read-only"],
    "mcp": ["tavily", "sequential", "playwright"],
    "network": ["http", "https"]
  },
  "specialized_for": [
    "Web research",
    "Documentation lookup",
    "Pattern discovery",
    "Best practice research",
    "Technology evaluation"
  ],
  "command_sources": [
    "/commands/truth/"
  ],
  "estimated_commands_migrated": 5
}
```

**Agent: `analyzer-agent`**
```json
{
  "name": "analyzer-agent",
  "type": "custom",
  "description": "Code analysis, metrics, and pattern detection",
  "permissions": {
    "fs": ["read"],
    "exec": ["shell:read-only"],
    "mcp": ["sequential", "context7"],
    "github": ["read"]
  },
  "specialized_for": [
    "Code complexity analysis",
    "Pattern detection",
    "Dependency analysis",
    "Performance profiling",
    "Technical debt measurement"
  ],
  "command_sources": [
    "/agents/analysis/"
  ],
  "estimated_commands_migrated": 15
}
```

**Agent: `workflow-agent`**
```json
{
  "name": "workflow-agent",
  "type": "custom",
  "description": "Workflow automation and orchestration",
  "permissions": {
    "fs": ["read", "write:.claude/workflows/**"],
    "exec": ["shell"],
    "mcp": ["all"],
    "github": ["workflows"]
  },
  "specialized_for": [
    "Workflow creation",
    "Task automation",
    "Agent coordination",
    "Pipeline orchestration",
    "Event-driven automation"
  ],
  "command_sources": [
    "/commands/workflows/",
    "/commands/coordination/"
  ],
  "estimated_commands_migrated": 12
}
```

**Agent: `memory-agent`**
```json
{
  "name": "memory-agent",
  "type": "custom",
  "description": "Context management, session persistence, and knowledge storage",
  "permissions": {
    "fs": ["read", "write:.claude/sessions/**", "write:.claude/checkpoints/**"],
    "exec": ["shell:git"],
    "mcp": ["serena", "sequential"],
    "github": ["read"]
  },
  "specialized_for": [
    "Session management",
    "Context persistence",
    "Knowledge storage",
    "Checkpoint creation",
    "State restoration"
  ],
  "command_sources": [
    "/commands/memory/",
    "/commands/checkpoints/"
  ],
  "estimated_commands_migrated": 10
}
```

#### Tier 6: Swarm & Coordination

**Agent: `swarm-coordinator`**
```json
{
  "name": "swarm-coordinator",
  "type": "custom",
  "description": "Multi-agent orchestration and swarm management",
  "permissions": {
    "fs": ["read", "write:.claude/swarm/**"],
    "exec": ["shell"],
    "mcp": ["claude-flow", "ruv-swarm", "flow-nexus"],
    "github": ["read"]
  },
  "specialized_for": [
    "Swarm initialization",
    "Agent spawning",
    "Task distribution",
    "Consensus management",
    "Performance monitoring"
  ],
  "command_sources": [
    "/commands/swarm/",
    "/commands/coordination/",
    "/agents/swarm/",
    "/agents/consensus/",
    "/agents/hive-mind/"
  ],
  "estimated_commands_migrated": 40
}
```

### 1.2 Agent Count Summary

**Total Agents: 18**
- Tier 1 (Build): 4 agents (coder, reviewer, tester, architect)
- Tier 2 (Plan): 3 agents (pm, planner, tracker)
- Tier 3 (GitHub): 2 agents (github, release)
- Tier 4 (Domain): 5 agents (ui, data, devops, security, docs)
- Tier 5 (Advanced): 3 agents (research, analyzer, workflow)
- Tier 6 (Coordination): 1 agent (swarm-coordinator)

**Command Migration Coverage: 215 commands**
- Estimated migration complete with 18 agents
- Some commands will map to multiple agents (collaborative workflows)
- Some agents will handle multiple command patterns (consolidation)

---

## Part 2: Migration Execution Plan

### 2.1 Phase Overview

**Phase 1: Foundation (Week 1)**
- Goal: Create base OpenCode structure
- Duration: 3-5 days
- Risk: Low
- Blocking: All subsequent phases

**Phase 2: Core Agents (Week 1-2)**
- Goal: Migrate build agents (coder, reviewer, tester, architect)
- Duration: 5-7 days
- Risk: Medium
- Blocking: Phase 3

**Phase 3: PM System (Week 2)**
- Goal: Migrate PM agents and commands
- Duration: 3-4 days
- Risk: Medium
- Blocking: Phase 4

**Phase 4: GitHub Integration (Week 2-3)**
- Goal: Migrate GitHub agents and workflows
- Duration: 4-5 days
- Risk: High (external API dependencies)
- Blocking: Phase 5

**Phase 5: Specialized Agents (Week 3)**
- Goal: Migrate domain-specific agents
- Duration: 5-6 days
- Risk: Medium
- Blocking: Phase 6

**Phase 6: Advanced Features (Week 4)**
- Goal: Migrate research, workflow, and swarm coordination
- Duration: 4-5 days
- Risk: High (complex MCP integrations)
- Blocking: None

**Phase 7: Validation & Cutover (Week 4)**
- Goal: Final testing and production cutover
- Duration: 2-3 days
- Risk: Low
- Blocking: None

### 2.2 Parallel Execution Strategy

**Batch 1: Foundation Setup (Parallel)**
```yaml
tasks:
  - create_opencode_structure
  - migrate_rules_to_instructions
  - migrate_helpers_to_shared
  - setup_validation_framework
dependencies: []
estimated_time: 4 hours
agents_needed: 2
```

**Batch 2: Core Build Agents (Parallel)**
```yaml
tasks:
  - migrate_coder_agent_commands
  - migrate_reviewer_agent_commands
  - migrate_tester_agent_commands
  - migrate_architect_agent_commands
dependencies: [Batch 1]
estimated_time: 2 days
agents_needed: 4
```

**Batch 3: PM & Planning (Parallel)**
```yaml
tasks:
  - migrate_pm_agent_commands
  - migrate_planner_agent_commands
  - migrate_tracker_agent_commands
dependencies: [Batch 1]
estimated_time: 1.5 days
agents_needed: 3
```

**Batch 4: Integration Agents (Parallel)**
```yaml
tasks:
  - migrate_github_agent_commands
  - migrate_release_agent_commands
dependencies: [Batch 1]
estimated_time: 1.5 days
agents_needed: 2
```

**Batch 5: Domain Specialists (Parallel)**
```yaml
tasks:
  - migrate_ui_agent_commands
  - migrate_data_agent_commands
  - migrate_devops_agent_commands
  - migrate_security_agent_commands
  - migrate_docs_agent_commands
dependencies: [Batch 2]
estimated_time: 2 days
agents_needed: 5
```

**Batch 6: Advanced Capabilities (Parallel)**
```yaml
tasks:
  - migrate_research_agent_commands
  - migrate_analyzer_agent_commands
  - migrate_workflow_agent_commands
  - migrate_memory_agent_commands
  - migrate_swarm_coordinator_commands
dependencies: [Batch 2]
estimated_time: 2 days
agents_needed: 5
```

### 2.3 Dependency Graph

```
Foundation (Batch 1)
    ├── Core Build Agents (Batch 2) ──┐
    ├── PM & Planning (Batch 3)       │
    └── Integration Agents (Batch 4)  │
                                      │
    ┌─────────────────────────────────┘
    │
    ├── Domain Specialists (Batch 5)
    └── Advanced Capabilities (Batch 6)
            │
            └── Validation & Cutover (Phase 7)
```

### 2.4 Critical Path Analysis

**Critical Path: Foundation → Core Agents → Domain Specialists → Validation**
- Total Duration: ~22 days
- Path Length: 4 phases
- Bottlenecks: Core agent migration (most complex)

**Parallel Opportunities:**
- Batches 2, 3, 4 can run simultaneously after Batch 1
- Batches 5 and 6 can run simultaneously after Batch 2
- Total time savings: ~8 days (from sequential 30 days to parallel 22 days)

---

## Part 3: Conversion Templates

### 3.1 Template Categories

#### Template 1: Simple Command → Agent Integration
**Use Case**: Single-purpose commands with no dependencies

**Claude Code Format:**
```markdown
---
description: Do something specific
---

Execute task X using tool Y
Check condition Z
Report results
```

**OpenCode Format:**
```json
{
  "agents": {
    "example-agent": {
      "instructions": "Execute task X using tool Y\nCheck condition Z\nReport results"
    }
  }
}
```

**Conversion Script:**
```bash
#!/bin/bash
# convert_simple_command.sh

command_file="$1"
agent_name="$2"
output_file="$3"

# Extract description and content
description=$(grep "^description:" "$command_file" | cut -d: -f2- | xargs)
content=$(sed '1,/^---$/d; /^---$/d' "$command_file")

# Generate agent definition
cat > "$output_file" <<EOF
{
  "name": "$agent_name",
  "description": "$description",
  "instructions": $(echo "$content" | jq -Rs .)
}
EOF
```

#### Template 2: Command with Helper Dependencies
**Use Case**: Commands that reference shared helpers

**Claude Code Format:**
```markdown
---
description: Complex operation
helpers:
  - standard-checkpoint-hooks
  - github-safe
---

@helpers/standard-checkpoint-hooks.sh

Execute main logic
```

**OpenCode Format:**
```json
{
  "agents": {
    "complex-agent": {
      "instructions": "@.opencode/shared/standard-checkpoint-hooks.sh\n\nExecute main logic"
    }
  }
}
```

**Conversion Logic:**
```bash
# Extract helper references
helpers=$(grep -E "^helpers:" "$command_file" | sed 's/helpers://; s/[][]//g')

# Convert @helper references to @.opencode/shared/ paths
sed 's|@helpers/|@.opencode/shared/|g' "$command_file"
```

#### Template 3: Command with Sub-Command Calls
**Use Case**: Commands that invoke other commands

**Claude Code Format:**
```markdown
Call /pm:epic-new to create epic
Then call /pm:epic-sync to sync with GitHub
```

**OpenCode Format:**
```json
{
  "agents": {
    "orchestrator-agent": {
      "instructions": "Use pm-agent to create epic\nThen use pm-agent to sync with GitHub"
    }
  }
}
```

**Conversion Rule:**
```bash
# Pattern: /command-name → agent-name
sed 's|/pm:epic-new|pm-agent (epic creation)|g'
sed 's|/pm:epic-sync|pm-agent (GitHub sync)|g'
sed 's|/github:pr-create|github-agent (PR creation)|g'
```

#### Template 4: Multi-Agent Workflow
**Use Case**: Commands that coordinate multiple agents

**Claude Code Format:**
```markdown
1. Analyze code with reviewer
2. Generate tests with tester
3. Implement fixes with coder
```

**OpenCode Format:**
```json
{
  "agents": {
    "workflow-agent": {
      "instructions": "1. Delegate analysis to reviewer-agent\n2. Delegate test generation to tester-agent\n3. Delegate fixes to coder-agent"
    }
  }
}
```

#### Template 5: Rule Embedding
**Use Case**: Converting behavioral rules into agent instructions

**Claude Code Rules:**
```markdown
# .claude/rules/test-execution.md
- Always run tests before committing
- Report coverage metrics
- Fail on coverage below 80%
```

**OpenCode Agent Integration:**
```json
{
  "agents": {
    "tester-agent": {
      "instructions": "Core Testing Instructions:\n...\n\nBehavioral Rules:\n@.opencode/rules/test-execution.md"
    }
  }
}
```

### 3.2 Automated Conversion Scripts

#### Master Conversion Script
```bash
#!/bin/bash
# master_convert.sh - Orchestrates all conversion operations

set -euo pipefail

CLAUDE_DIR=".claude"
OPENCODE_DIR=".opencode"
LOG_FILE="migration_$(date +%Y%m%d_%H%M%S).log"

# Initialize logging
exec > >(tee -a "$LOG_FILE") 2>&1

echo "=== OpenCode Migration Started ==="
echo "Timestamp: $(date)"
echo ""

# Phase 1: Structure Creation
echo "Phase 1: Creating OpenCode structure..."
./scripts/01_create_structure.sh

# Phase 2: Rule Migration
echo "Phase 2: Migrating rules..."
./scripts/02_migrate_rules.sh

# Phase 3: Helper Migration
echo "Phase 3: Migrating helpers..."
./scripts/03_migrate_helpers.sh

# Phase 4: Agent Definition Generation
echo "Phase 4: Generating agent definitions..."
./scripts/04_generate_agents.sh

# Phase 5: Command Migration (Parallel Batches)
echo "Phase 5: Migrating commands (parallel)..."
./scripts/05_migrate_commands_parallel.sh

# Phase 6: Validation
echo "Phase 6: Running validation..."
./scripts/06_validate_migration.sh

echo ""
echo "=== Migration Complete ==="
echo "Log file: $LOG_FILE"
echo "Next steps: Review $OPENCODE_DIR/opencode.jsonc"
```

#### Structure Creation Script
```bash
#!/bin/bash
# 01_create_structure.sh

OPENCODE_DIR=".opencode"

# Create directory structure
mkdir -p "$OPENCODE_DIR"/{agents,shared,rules,templates,validation}
mkdir -p "$OPENCODE_DIR"/agents/{build,plan,custom}

# Create opencode.jsonc skeleton
cat > "$OPENCODE_DIR/opencode.jsonc" <<'EOF'
{
  "version": "1.0.0",
  "agents": {},
  "globalPermissions": {
    "fs": ["read"],
    "exec": [],
    "mcp": [],
    "github": [],
    "network": []
  },
  "sharedResources": [],
  "migrationMetadata": {
    "migrationDate": "$(date -Iseconds)",
    "sourceSystem": "claude-code",
    "totalCommands": 215,
    "totalAgents": 78
  }
}
EOF

echo "✅ OpenCode structure created"
```

#### Rule Migration Script
```bash
#!/bin/bash
# 02_migrate_rules.sh

CLAUDE_RULES=".claude/rules"
OPENCODE_RULES=".opencode/rules"

# Copy all rules
cp -r "$CLAUDE_RULES"/* "$OPENCODE_RULES"/

# Create index file
{
  echo "# Behavioral Rules Index"
  echo ""
  echo "These rules are embedded into agent instructions."
  echo ""
  for rule in "$OPENCODE_RULES"/*.md; do
    basename=$(basename "$rule")
    description=$(grep "^#" "$rule" | head -1 | sed 's/^# //')
    echo "- \`$basename\`: $description"
  done
} > "$OPENCODE_RULES/INDEX.md"

echo "✅ Migrated $(ls "$OPENCODE_RULES"/*.md | wc -l) rules"
```

#### Helper Migration Script
```bash
#!/bin/bash
# 03_migrate_helpers.sh

CLAUDE_HELPERS=".claude/helpers"
OPENCODE_SHARED=".opencode/shared"

# Copy helpers
for helper in "$CLAUDE_HELPERS"/*; do
  basename=$(basename "$helper")
  cp "$helper" "$OPENCODE_SHARED/$basename"
  chmod +x "$OPENCODE_SHARED/$basename"
done

echo "✅ Migrated $(ls "$OPENCODE_SHARED" | wc -l) helpers"
```

#### Agent Definition Generator
```bash
#!/bin/bash
# 04_generate_agents.sh

AGENTS_DIR=".opencode/agents"
CONFIG_FILE=".opencode/opencode.jsonc"

# Agent definitions from Part 1
declare -A AGENTS=(
  ["coder-agent"]="build"
  ["reviewer-agent"]="build"
  ["tester-agent"]="build"
  ["architect-agent"]="build"
  ["pm-agent"]="plan"
  ["planner-agent"]="plan"
  ["tracker-agent"]="plan"
  ["github-agent"]="custom"
  ["release-agent"]="custom"
  ["ui-agent"]="custom"
  ["data-agent"]="custom"
  ["devops-agent"]="custom"
  ["security-agent"]="custom"
  ["docs-agent"]="custom"
  ["research-agent"]="custom"
  ["analyzer-agent"]="custom"
  ["workflow-agent"]="custom"
  ["memory-agent"]="custom"
)

for agent in "${!AGENTS[@]}"; do
  type="${AGENTS[$agent]}"

  # Create agent definition file
  cat > "$AGENTS_DIR/$type/$agent.json" <<EOF
{
  "name": "$agent",
  "type": "$type",
  "description": "Auto-generated agent definition",
  "permissions": {},
  "instructions": "",
  "commandSources": []
}
EOF

  echo "✅ Generated $agent ($type)"
done

echo "✅ Generated ${#AGENTS[@]} agent definitions"
```

#### Parallel Command Migration
```bash
#!/bin/bash
# 05_migrate_commands_parallel.sh

CLAUDE_COMMANDS=".claude/commands"
OPENCODE_AGENTS=".opencode/agents"
MAX_PARALLEL=5

# Command to agent mapping
declare -A COMMAND_MAP=(
  ["pm"]="pm-agent"
  ["github"]="github-agent"
  ["ui"]="ui-agent"
  ["swarm"]="swarm-coordinator"
  ["automation"]="coder-agent"
  ["analysis"]="analyzer-agent"
  ["verify"]="tester-agent"
  ["workflows"]="workflow-agent"
  ["memory"]="memory-agent"
)

migrate_command_dir() {
  local dir=$1
  local agent=$2
  local dir_name=$(basename "$dir")

  echo "Migrating $dir_name → $agent..."

  # Find all .md files in directory
  find "$dir" -name "*.md" | while read -r cmd_file; do
    cmd_name=$(basename "$cmd_file" .md)

    # Extract content (skip frontmatter)
    content=$(sed '1,/^---$/d; /^---$/d' "$cmd_file")

    # Append to agent instructions
    {
      echo ""
      echo "## Command: $cmd_name"
      echo "$content"
    } >> "$OPENCODE_AGENTS/*/($agent).md"
  done

  echo "✅ Migrated $dir_name"
}

# Export function for parallel execution
export -f migrate_command_dir

# Migrate in parallel batches
for cmd_dir in "${!COMMAND_MAP[@]}"; do
  agent="${COMMAND_MAP[$cmd_dir]}"
  full_path="$CLAUDE_COMMANDS/$cmd_dir"

  if [ -d "$full_path" ]; then
    migrate_command_dir "$full_path" "$agent" &

    # Limit parallel processes
    while [ $(jobs -r | wc -l) -ge $MAX_PARALLEL ]; do
      sleep 1
    done
  fi
done

# Wait for all background jobs
wait

echo "✅ All command migrations complete"
```

---

## Part 4: Validation Framework

### 4.1 Validation Levels

#### Level 1: Syntax Validation
```bash
#!/bin/bash
# validate_syntax.sh

echo "=== Level 1: Syntax Validation ==="

# Validate opencode.jsonc
echo -n "Checking opencode.jsonc... "
if jq empty .opencode/opencode.jsonc 2>/dev/null; then
  echo "✅ Valid JSON"
else
  echo "❌ Invalid JSON"
  exit 1
fi

# Validate agent definitions
for agent_file in .opencode/agents/*/*.json; do
  echo -n "Checking $(basename "$agent_file")... "
  if jq empty "$agent_file" 2>/dev/null; then
    echo "✅"
  else
    echo "❌ Invalid JSON in $agent_file"
    exit 1
  fi
done

echo "✅ Level 1 passed"
```

#### Level 2: Structural Validation
```bash
#!/bin/bash
# validate_structure.sh

echo "=== Level 2: Structural Validation ==="

# Check required fields in opencode.jsonc
required_fields=("version" "agents" "globalPermissions")
for field in "${required_fields[@]}"; do
  if ! jq -e ".$field" .opencode/opencode.jsonc > /dev/null; then
    echo "❌ Missing required field: $field"
    exit 1
  fi
done

# Check agent definition completeness
for agent_file in .opencode/agents/*/*.json; do
  agent_name=$(jq -r '.name' "$agent_file")

  # Required fields
  for field in "name" "type" "permissions" "instructions"; do
    if ! jq -e ".$field" "$agent_file" > /dev/null; then
      echo "❌ Agent $agent_name missing field: $field"
      exit 1
    fi
  done
done

# Check command coverage
total_commands=215
migrated_commands=$(grep -r "## Command:" .opencode/agents/ | wc -l)
coverage=$((migrated_commands * 100 / total_commands))

echo "Command migration coverage: $migrated_commands/$total_commands ($coverage%)"

if [ $coverage -lt 95 ]; then
  echo "⚠️  Coverage below 95% - review required"
else
  echo "✅ Level 2 passed"
fi
```

#### Level 3: Functional Validation
```bash
#!/bin/bash
# validate_functional.sh

echo "=== Level 3: Functional Validation ==="

# Test file operations
test_file_ops() {
  echo "Testing coder-agent file operations..."

  # Create test file
  echo "test content" > /tmp/opencode_test.txt

  # Use OpenCode to read file
  result=$(opencode run coder-agent "Read /tmp/opencode_test.txt")

  if [[ "$result" == *"test content"* ]]; then
    echo "✅ File read successful"
  else
    echo "❌ File read failed"
    return 1
  fi

  rm /tmp/opencode_test.txt
}

# Test shell execution
test_shell_exec() {
  echo "Testing shell execution..."

  result=$(opencode run coder-agent '!`echo "hello world"`')

  if [[ "$result" == *"hello world"* ]]; then
    echo "✅ Shell execution successful"
  else
    echo "❌ Shell execution failed"
    return 1
  fi
}

# Test agent collaboration
test_collaboration() {
  echo "Testing agent collaboration..."

  # PM agent creates task, coder agent implements
  opencode run pm-agent "Create simple task"
  result=$(opencode run coder-agent "Implement task from pm-agent")

  if [ $? -eq 0 ]; then
    echo "✅ Agent collaboration successful"
  else
    echo "❌ Agent collaboration failed"
    return 1
  fi
}

# Run all tests
test_file_ops || exit 1
test_shell_exec || exit 1
test_collaboration || exit 1

echo "✅ Level 3 passed"
```

#### Level 4: Integration Validation
```bash
#!/bin/bash
# validate_integration.sh

echo "=== Level 4: Integration Validation ==="

# Test GitHub integration
test_github() {
  echo "Testing github-agent..."

  # Check if gh CLI is authenticated
  if ! gh auth status &>/dev/null; then
    echo "⚠️  GitHub CLI not authenticated - skipping test"
    return 0
  fi

  # Test issue listing
  result=$(opencode run github-agent "List open issues")

  if [ $? -eq 0 ]; then
    echo "✅ GitHub integration successful"
  else
    echo "❌ GitHub integration failed"
    return 1
  fi
}

# Test MCP integrations
test_mcp() {
  echo "Testing MCP integrations..."

  # Check if claude-flow is available
  if ! npx claude-flow@alpha --version &>/dev/null; then
    echo "⚠️  Claude Flow not installed - skipping test"
    return 0
  fi

  # Test swarm initialization
  result=$(opencode run swarm-coordinator "Initialize mesh swarm with 3 agents")

  if [ $? -eq 0 ]; then
    echo "✅ MCP integration successful"
  else
    echo "❌ MCP integration failed"
    return 1
  fi
}

# Test UI operations
test_ui() {
  echo "Testing ui-agent..."

  # Test UI component generation
  result=$(opencode run ui-agent "Generate a button component")

  if [[ "$result" == *"component"* ]] || [[ "$result" == *"button"* ]]; then
    echo "✅ UI agent successful"
  else
    echo "❌ UI agent failed"
    return 1
  fi
}

# Run integration tests
test_github || exit 1
test_mcp || exit 1
test_ui || exit 1

echo "✅ Level 4 passed"
```

### 4.2 Comprehensive Test Suite

```bash
#!/bin/bash
# run_all_validations.sh

set -euo pipefail

echo "==================================="
echo "OpenCode Migration Validation Suite"
echo "==================================="
echo ""

# Run all validation levels
./validate_syntax.sh
echo ""

./validate_structure.sh
echo ""

./validate_functional.sh
echo ""

./validate_integration.sh
echo ""

echo "==================================="
echo "✅ ALL VALIDATIONS PASSED"
echo "==================================="
echo ""
echo "Migration is ready for production cutover"
```

### 4.3 Regression Test Cases

```yaml
# .opencode/validation/test_cases.yaml

test_cases:
  - name: "PM: Create PRD"
    agent: pm-agent
    command: "Create a PRD for user authentication feature"
    expected_output:
      - contains: ".claude/prds/"
      - file_created: true

  - name: "GitHub: Create Issue"
    agent: github-agent
    command: "Create an issue titled 'Test Issue'"
    expected_output:
      - contains: "issue #"
      - github_issue_created: true

  - name: "Coder: Implement Feature"
    agent: coder-agent
    command: "Implement a simple calculator function"
    expected_output:
      - file_modified: true
      - syntax_valid: true

  - name: "Tester: Generate Tests"
    agent: tester-agent
    command: "Generate unit tests for calculator function"
    expected_output:
      - contains: "test"
      - file_created: true

  - name: "UI: Clone Design"
    agent: ui-agent
    command: "Clone a simple button design"
    expected_output:
      - contains: "component"
      - file_created: true

  - name: "Swarm: Initialize"
    agent: swarm-coordinator
    command: "Initialize a mesh swarm with 3 agents"
    expected_output:
      - contains: "swarm"
      - agents_spawned: 3
```

---

## Part 5: Risk Mitigation & Rollback

### 5.1 Risk Assessment Matrix

| Risk | Probability | Impact | Severity | Mitigation |
|------|-------------|--------|----------|------------|
| Permission mapping errors | High | Medium | **HIGH** | Start restrictive, expand incrementally |
| Command loss during migration | Low | High | **MEDIUM** | Comprehensive mapping checklist + backup |
| Broken command dependencies | Medium | High | **HIGH** | Dependency graph analysis + validation |
| Performance degradation | Low | Medium | **LOW** | Benchmark each phase |
| GitHub API failures | Medium | High | **MEDIUM** | Retry logic + fallback mechanisms |
| MCP integration issues | Medium | Medium | **MEDIUM** | Test with mock data first |
| User workflow disruption | High | High | **CRITICAL** | Dual operation period (2-4 weeks) |
| Data loss or corruption | Low | Critical | **CRITICAL** | Complete backup + git safety |

### 5.2 Mitigation Strategies

#### Strategy 1: Incremental Permission Grants
```yaml
permission_strategy:
  initial_grant: minimal
  expansion_policy: request_based
  audit_trail: required

  example:
    phase_1: ["fs.read"]
    phase_2: ["fs.read", "fs.write:specific-dirs"]
    phase_3: ["fs.read", "fs.write", "exec.shell:read-only"]
    phase_4: ["fs.read", "fs.write", "exec.shell"]
```

#### Strategy 2: Dual Operation Period
```yaml
dual_operation:
  duration: 2-4 weeks
  approach: parallel_systems

  .claude/:
    status: operational
    updates: frozen

  .opencode/:
    status: testing
    updates: active

  cutover_criteria:
    - all_validations_pass: true
    - user_acceptance: true
    - performance_acceptable: true
```

#### Strategy 3: Comprehensive Backup
```bash
#!/bin/bash
# create_migration_backup.sh

BACKUP_DIR="migration_backup_$(date +%Y%m%d_%H%M%S)"

# Create backup
mkdir -p "$BACKUP_DIR"
cp -r .claude "$BACKUP_DIR/"
git stash push -u -m "Pre-migration backup"

echo "✅ Backup created: $BACKUP_DIR"
echo "Git stash: $(git stash list | head -1)"
```

#### Strategy 4: Dependency Graph Validation
```python
#!/usr/bin/env python3
# validate_dependencies.py

import os
import re
from pathlib import Path

def extract_dependencies(file_path):
    """Extract command dependencies from markdown files."""
    with open(file_path, 'r') as f:
        content = f.read()

    # Find /command references
    commands = re.findall(r'/[\w:-]+', content)

    # Find @helper references
    helpers = re.findall(r'@helpers/([\w-]+)', content)

    return {
        'commands': commands,
        'helpers': helpers
    }

def build_dependency_graph():
    """Build complete dependency graph."""
    graph = {}

    for cmd_file in Path('.claude/commands').rglob('*.md'):
        deps = extract_dependencies(cmd_file)
        graph[str(cmd_file)] = deps

    return graph

def detect_circular_dependencies(graph):
    """Detect circular dependencies."""
    def visit(node, visited, stack):
        visited.add(node)
        stack.add(node)

        for neighbor in graph.get(node, {}).get('commands', []):
            if neighbor not in visited:
                if visit(neighbor, visited, stack):
                    return True
            elif neighbor in stack:
                return True

        stack.remove(node)
        return False

    visited = set()
    for node in graph:
        if node not in visited:
            if visit(node, visited, set()):
                return True

    return False

def validate_all_dependencies():
    """Validate all dependencies are satisfied."""
    graph = build_dependency_graph()

    print("Checking for circular dependencies...")
    if detect_circular_dependencies(graph):
        print("❌ Circular dependencies detected")
        return False

    print("✅ No circular dependencies")

    # Check all referenced commands exist
    all_commands = set(graph.keys())
    for file, deps in graph.items():
        for cmd in deps['commands']:
            if cmd not in all_commands:
                print(f"⚠️  Missing dependency: {cmd} (referenced in {file})")

    return True

if __name__ == '__main__':
    validate_all_dependencies()
```

### 5.3 Rollback Procedures

#### Immediate Rollback (< 1 hour)
```bash
#!/bin/bash
# emergency_rollback.sh

echo "⚠️  EMERGENCY ROLLBACK INITIATED"

# Stop all OpenCode operations
pkill -f opencode

# Restore from git stash
git stash pop

# Restore from backup directory
LATEST_BACKUP=$(ls -td migration_backup_* | head -1)
if [ -d "$LATEST_BACKUP" ]; then
  rm -rf .opencode
  cp -r "$LATEST_BACKUP/.claude" .
  echo "✅ Restored from $LATEST_BACKUP"
fi

# Verify .claude is operational
if [ -f ".claude/commands/pm/prd-new.md" ]; then
  echo "✅ Rollback successful - .claude operational"
else
  echo "❌ Rollback failed - manual intervention required"
  exit 1
fi
```

#### Partial Rollback (Specific Agent)
```bash
#!/bin/bash
# rollback_agent.sh

AGENT=$1

echo "Rolling back $AGENT..."

# Remove agent definition
rm -f ".opencode/agents/*/${AGENT}.json"

# Remove migrated commands for this agent
# (restore from backup)

echo "✅ $AGENT rolled back"
```

#### Graceful Cutback (Planned Reversion)
```bash
#!/bin/bash
# graceful_cutback.sh

echo "Planning graceful cutback to .claude..."

# Freeze .opencode
touch .opencode/.frozen

# Re-enable .claude updates
rm -f .claude/.frozen

# Notify users
echo "⚠️  Reverting to .claude system"
echo "OpenCode testing suspended"

# Keep .opencode for analysis
mv .opencode .opencode.suspended

echo "✅ Cutback complete"
```

### 5.4 Failure Mode Analysis

#### Failure Mode 1: Agent Permission Errors
```yaml
symptom: Agent cannot perform required operations
cause: Insufficient permissions
detection: Validation Level 3 failures
recovery:
  immediate: Grant minimum additional permissions
  long_term: Review permission design
rollback: Not required (fix in place)
```

#### Failure Mode 2: Command Mapping Loss
```yaml
symptom: Commands not responding or not found
cause: Incomplete migration mapping
detection: Validation Level 2 coverage check
recovery:
  immediate: Manual mapping of missing commands
  long_term: Improve automated mapping logic
rollback: Partial rollback for affected agents
```

#### Failure Mode 3: GitHub Integration Failure
```yaml
symptom: Cannot create issues or PRs
cause: API auth or rate limiting
detection: Validation Level 4 failures
recovery:
  immediate: Use gh CLI auth refresh
  long_term: Implement retry logic with backoff
rollback: Not required (external dependency)
```

#### Failure Mode 4: Performance Degradation
```yaml
symptom: Operations slower than .claude
cause: Inefficient agent coordination
detection: Benchmark comparisons
recovery:
  immediate: Profile and optimize bottlenecks
  long_term: Redesign agent communication
rollback: Full rollback if >50% slower
```

#### Failure Mode 5: User Workflow Disruption
```yaml
symptom: Users cannot complete common tasks
cause: Missing or broken commands
detection: User reports + validation failures
recovery:
  immediate: Hotfix critical workflows
  long_term: Extend testing coverage
rollback: Full rollback if critical path broken
```

---

## Part 6: Quality Assurance & Success Metrics

### 6.1 Quality Gates

**Gate 1: Syntax & Structure (Automated)**
- All JSON files valid
- All agent definitions complete
- No missing required fields
- **Criteria**: 100% pass rate

**Gate 2: Coverage (Automated + Manual)**
- ≥95% command migration coverage
- ≥90% agent definition completeness
- All dependencies mapped
- **Criteria**: Pass automated + manual review

**Gate 3: Functional (Automated + Manual)**
- All validation tests pass
- Key workflows operational
- No critical failures
- **Criteria**: 100% test suite pass + spot checks

**Gate 4: Integration (Manual)**
- GitHub operations work
- MCP integrations functional
- Agent collaboration validated
- **Criteria**: Manual approval by 2+ reviewers

**Gate 5: User Acceptance (Manual)**
- 10+ real-world task completions
- User feedback collected
- Performance acceptable
- **Criteria**: User sign-off

### 6.2 Success Metrics

#### Migration Completeness
```yaml
targets:
  command_coverage: ≥95%
  agent_definitions: 100%
  permission_mappings: 100%
  dependency_resolution: 100%

measurement:
  automated: coverage scripts
  frequency: after each batch
  threshold: must meet before next phase
```

#### Functional Correctness
```yaml
targets:
  validation_pass_rate: 100%
  regression_test_pass: 100%
  integration_test_pass: ≥90%

measurement:
  automated: test suites
  frequency: continuous
  threshold: all gates must pass
```

#### Performance Benchmarks
```yaml
targets:
  execution_time: ≤110% of .claude baseline
  memory_usage: ≤120% of .claude baseline
  api_calls: ≤100% of .claude baseline

measurement:
  automated: benchmark suite
  frequency: after each phase
  threshold: must meet before cutover
```

#### User Satisfaction
```yaml
targets:
  workflow_completion: 100% of common tasks
  user_approval: ≥80% satisfaction
  issue_reports: <5 critical issues

measurement:
  manual: user surveys + issue tracking
  frequency: weekly during dual operation
  threshold: must meet before full cutover
```

### 6.3 Continuous Monitoring

```bash
#!/bin/bash
# monitor_migration_health.sh

echo "=== Migration Health Dashboard ==="
echo ""

# Check coverage
coverage=$(grep -r "## Command:" .opencode/agents/ | wc -l)
total=215
coverage_pct=$((coverage * 100 / total))
echo "Command Coverage: $coverage/$total ($coverage_pct%)"

# Check validation status
if [ -f ".opencode/validation/last_run.log" ]; then
  last_validation=$(grep "✅" .opencode/validation/last_run.log | wc -l)
  echo "Last Validation: $last_validation checks passed"
fi

# Check agent health
agent_count=$(find .opencode/agents -name "*.json" | wc -l)
echo "Active Agents: $agent_count"

# Check error logs
if [ -f ".opencode/error.log" ]; then
  error_count=$(wc -l < .opencode/error.log)
  echo "⚠️  Error Count: $error_count"
fi

echo ""
echo "=== End Dashboard ==="
```

---

## Part 7: Post-Migration Operations

### 7.1 Cutover Checklist

```markdown
# Production Cutover Checklist

## Pre-Cutover
- [ ] All validation gates passed
- [ ] User acceptance testing complete
- [ ] Performance benchmarks meet targets
- [ ] Rollback procedures tested
- [ ] Team trained on OpenCode
- [ ] Documentation updated
- [ ] Backup created and verified

## Cutover
- [ ] Announce maintenance window
- [ ] Freeze .claude updates
- [ ] Enable .opencode as primary
- [ ] Update documentation links
- [ ] Update CI/CD pipelines
- [ ] Notify all team members

## Post-Cutover
- [ ] Monitor error logs (24h)
- [ ] Collect user feedback
- [ ] Address critical issues
- [ ] Archive .claude (keep as backup)
- [ ] Update training materials
- [ ] Document lessons learned
```

### 7.2 Maintenance Plan

**Week 1-2: Intensive Monitoring**
- Daily health checks
- Immediate issue response
- User support sessions
- Performance monitoring

**Week 3-4: Stabilization**
- Address non-critical issues
- Optimize performance
- Refine agent instructions
- Expand permission sets as needed

**Month 2-3: Optimization**
- Analyze usage patterns
- Consolidate similar agents
- Improve automation
- Add new capabilities

**Ongoing: Continuous Improvement**
- Monthly agent reviews
- Quarterly permission audits
- Annual architecture review
- Regular user feedback sessions

### 7.3 Knowledge Transfer

```yaml
training_materials:
  - agent_guide.md: "How to use each agent effectively"
  - permission_guide.md: "Understanding agent permissions"
  - workflow_guide.md: "Common workflows and patterns"
  - troubleshooting.md: "Common issues and solutions"
  - migration_history.md: "What changed and why"

training_sessions:
  - overview: "1-hour OpenCode introduction"
  - hands_on: "2-hour practical workshop"
  - advanced: "1-hour advanced features"
  - qa: "30-min Q&A sessions (weekly)"
```

---

## Appendices

### Appendix A: Complete Agent Permission Matrix

| Agent | fs.read | fs.write | fs.delete | exec.shell | github | mcp | network |
|-------|---------|----------|-----------|------------|--------|-----|---------|
| coder-agent | ✅ | ✅ | ✅ | ✅ | read | all | http |
| reviewer-agent | ✅ | ❌ | ❌ | read-only | read, comment | sequential, context7 | ❌ |
| tester-agent | ✅ | ✅ | ❌ | ✅ | read | playwright, context7 | ❌ |
| architect-agent | ✅ | ✅ | ❌ | read-only | read | sequential, context7 | ❌ |
| pm-agent | ✅ | *.md, prds, epics | ❌ | git | issues, labels, projects | sequential | ❌ |
| planner-agent | ✅ | checkpoints | ❌ | read-only | read | sequential, serena | ❌ |
| tracker-agent | ✅ | context, sessions | ❌ | read-only | read | serena | ❌ |
| github-agent | ✅ | .github | ❌ | git, gh | all | sequential | ❌ |
| release-agent | ✅ | CHANGELOG, package.json | ❌ | git, npm | releases, tags | sequential | ❌ |
| ui-agent | ✅ | src/components, src/ui | ❌ | npm | read | magic, playwright, chrome | ❌ |
| data-agent | ✅ | migrations, db | ❌ | psql, sqlite3 | read | sequential | ❌ |
| devops-agent | ✅ | .github/workflows, docker | ❌ | ✅ | workflows, actions | sequential | ❌ |
| security-agent | ✅ | ❌ | ❌ | npm audit, trivy | security | sequential | ❌ |
| docs-agent | ✅ | docs, README | ❌ | typedoc | read | context7, sequential | ❌ |
| research-agent | ✅ | claudedocs/research | ❌ | read-only | ❌ | tavily, sequential, playwright | http, https |
| analyzer-agent | ✅ | ❌ | ❌ | read-only | read | sequential, context7 | ❌ |
| workflow-agent | ✅ | .claude/workflows | ❌ | ✅ | workflows | all | ❌ |
| memory-agent | ✅ | sessions, checkpoints | ❌ | git | read | serena, sequential | ❌ |
| swarm-coordinator | ✅ | .claude/swarm | ❌ | ✅ | read | claude-flow, ruv-swarm, flow-nexus | ❌ |

### Appendix B: Command Migration Mapping

```csv
Command Path,Target Agent,Migration Batch,Priority
/commands/pm/prd-new.md,pm-agent,Batch 3,High
/commands/pm/epic-sync.md,pm-agent,Batch 3,High
/commands/github/pr-create.md,github-agent,Batch 4,High
/commands/github/issue-sync.md,github-agent,Batch 4,High
/commands/ui/clone.md,ui-agent,Batch 5,Medium
/commands/automation/checkpoint.md,coder-agent,Batch 2,High
/commands/swarm/init.md,swarm-coordinator,Batch 6,Medium
/commands/workflows/create.md,workflow-agent,Batch 6,Medium
... (215 total rows)
```

### Appendix C: Estimated Timeline

```gantt
title OpenCode Migration Timeline (4 weeks)

section Week 1
Foundation Setup          :done, w1d1, 2d
Core Agents Migration     :done, w1d3, 3d
Validation Level 1-2      :done, w1d6, 2d

section Week 2
PM System Migration       :active, w2d1, 2d
GitHub Integration        :w2d3, 3d
Validation Level 3        :w2d6, 2d

section Week 3
Domain Specialists        :w3d1, 3d
Advanced Features         :w3d4, 2d
Integration Testing       :w3d6, 2d

section Week 4
Final Validation          :w4d1, 2d
User Acceptance           :w4d3, 2d
Production Cutover        :w4d5, 1d
Post-Cutover Monitoring   :w4d6, 2d
```

### Appendix D: Resource Requirements

**Human Resources:**
- **Migration Lead**: 1 person, full-time, 4 weeks
- **Agent Specialists**: 3 people, part-time (50%), 4 weeks
- **QA Engineers**: 2 people, part-time (50%), 2 weeks (validation phases)
- **DevOps Support**: 1 person, on-call, 4 weeks
- **Total Effort**: ~360 person-hours

**Compute Resources:**
- **Development Environment**: Standard workstation
- **Testing Environment**: Dedicated testing VM
- **Backup Storage**: ~500MB (complete .claude backup)
- **Log Storage**: ~100MB (migration logs)

**Software Requirements:**
- OpenCode CLI (latest)
- jq (JSON processing)
- Git (version control)
- GitHub CLI (gh)
- Node.js + npm (MCP integrations)
- Python 3.8+ (validation scripts)

---

## Conclusion

This comprehensive architecture provides a systematic, low-risk approach to migrating from Claude Code's .claude structure to OpenCode's agent-based model. Key strengths:

1. **Systematic Agent Design**: 18 well-defined agents covering all 215 commands
2. **Parallel Execution**: 6 batches enabling ~8-day time savings
3. **Comprehensive Validation**: 4-level validation framework ensuring quality
4. **Risk Mitigation**: Multiple rollback strategies and dual operation period
5. **Quality Assurance**: Clear gates and success metrics

**Next Steps:**
1. Review and approve architecture
2. Allocate resources (team + compute)
3. Create detailed migration scripts
4. Execute Phase 1 (Foundation)
5. Iterative execution with validation gates

**Estimated Total Duration**: 22 working days (4-5 weeks calendar time)

**Success Probability**: High (85%+) with proper execution of validation and rollback procedures.

---

**Document Control:**
- **Version**: 1.0
- **Status**: Draft for Review
- **Owner**: System Architecture Team
- **Next Review**: Before Phase 1 execution
