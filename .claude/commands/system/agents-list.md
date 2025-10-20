---
description: List all available agents across SuperClaude and wshobson marketplace
tags: [system, discovery, agents, plugins]
---

# Agent Discovery

Unified command to discover all available agents from SuperClaude framework and wshobson marketplace.

## Usage

```bash
/sc:agents-list [filter]
```

**Examples:**
```bash
/sc:agents-list                    # List all agents
/sc:agents-list github             # Filter by keyword
/sc:agents-list --category core    # Filter by category
/sc:agents-list --installed        # Show only installed plugins
```

## Implementation

```bash
#!/bin/bash

FILTER="${1:-}"
CATEGORY=""
INSTALLED_ONLY=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --category)
      CATEGORY="$2"
      shift 2
      ;;
    --installed)
      INSTALLED_ONLY=true
      shift
      ;;
    *)
      FILTER="$1"
      shift
      ;;
  esac
done

echo "# 🤖 Agent Discovery System"
echo ""
echo "Found agents across SuperClaude framework and wshobson marketplace"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# SuperClaude Agents
echo "## 📦 SuperClaude Framework Agents (.claude/agents/)"
echo ""

declare -A categories
categories=(
  ["core"]="Core Development"
  ["swarm"]="Swarm Coordination"
  ["consensus"]="Consensus & Distributed"
  ["optimization"]="Performance & Optimization"
  ["github"]="GitHub Integration"
  ["sparc"]="SPARC Methodology"
  ["development"]="Specialized Development"
  ["specialized"]="Domain Specialists"
  ["testing"]="Testing & Validation"
  ["hive-mind"]="Hive Mind Coordination"
  ["neural"]="Neural AI"
  ["flow-nexus"]="Flow Nexus Cloud"
  ["templates"]="Agent Templates"
  ["documentation"]="Documentation"
  ["devops"]="DevOps & CI/CD"
  ["data"]="Data & ML"
  ["goal"]="Goal Planning"
  ["reasoning"]="Reasoning & Logic"
  ["architecture"]="System Architecture"
  ["analysis"]="Code Analysis"
)

# Count agents by category
declare -A agent_counts
total_agents=0

for category in "${!categories[@]}"; do
  count=$(find .claude/agents/$category -name "*.md" 2>/dev/null | wc -l)
  agent_counts[$category]=$count
  total_agents=$((total_agents + count))
done

# Display summary
echo "**Total Agents:** $total_agents"
echo ""

# Display by category
for category in "${!categories[@]}"; do
  count=${agent_counts[$category]}

  # Skip if filtering and no match
  if [[ -n "$CATEGORY" ]] && [[ "$CATEGORY" != "$category" ]]; then
    continue
  fi

  if [[ $count -gt 0 ]]; then
    echo "### ${categories[$category]} ($count agents)"
    echo ""

    # List agents in this category
    while IFS= read -r agent_file; do
      agent_name=$(basename "$agent_file" .md)
      agent_desc=$(grep -m 1 "^description:" "$agent_file" 2>/dev/null | sed 's/description: *//' || echo "No description")

      # Apply text filter
      if [[ -n "$FILTER" ]]; then
        if ! echo "$agent_name $agent_desc" | grep -qi "$FILTER"; then
          continue
        fi
      fi

      # Extract usage example
      usage=$(grep -A 1 "## Usage" "$agent_file" 2>/dev/null | tail -n 1 | sed 's/^[[:space:]]*//')

      echo "- **$agent_name**"
      echo "  - Description: $agent_desc"
      if [[ -n "$usage" ]]; then
        echo "  - Usage: \`$usage\`"
      fi
      echo "  - Path: \`${agent_file#./}\`"
      echo ""
    done < <(find .claude/agents/$category -name "*.md" 2>/dev/null | sort)
  fi
done

echo ""
echo "---"
echo ""

# wshobson Marketplace Plugins
echo "## 🏪 wshobson Marketplace Plugins"
echo ""

if command -v claude &> /dev/null; then
  echo "Checking installed plugins..."
  echo ""

  if $INSTALLED_ONLY; then
    # Show only installed plugins
    plugin_list=$(claude plugin list 2>/dev/null || echo "")

    if [[ -n "$plugin_list" ]]; then
      echo "**Installed Plugins:**"
      echo ""
      echo "$plugin_list"
    else
      echo "❌ No plugins installed or 'claude plugin list' failed"
      echo ""
      echo "To browse marketplace:"
      echo "  \`claude plugin search [keyword]\`"
    fi
  else
    # Show available plugins from marketplace
    echo "**Available Plugins:**"
    echo ""

    if [[ -n "$FILTER" ]]; then
      echo "Searching for: $FILTER"
      echo ""
      claude plugin search "$FILTER" 2>/dev/null || echo "❌ Search failed. Check 'claude plugin' installation."
    else
      echo "Popular categories:"
      echo "- Development: \`claude plugin search development\`"
      echo "- Testing: \`claude plugin search testing\`"
      echo "- DevOps: \`claude plugin search devops\`"
      echo "- AI/ML: \`claude plugin search ai\`"
      echo ""
      echo "To list installed: \`/sc:agents-list --installed\`"
    fi
  fi
else
  echo "⚠️  wshobson CLI not found"
  echo ""
  echo "Install: \`npm install -g @wshobson/claude-cli\`"
fi

echo ""
echo "---"
echo ""

# Quick reference
echo "## 🚀 Quick Reference"
echo ""
echo "**SuperClaude Agent Usage:**"
echo "\`\`\`bash"
echo "# Invoke specific agent"
echo "@agent-[name] \"task description\""
echo ""
echo "# Examples"
echo "@agent-coder \"implement user authentication\""
echo "@agent-reviewer \"review code quality in src/\""
echo "@agent-tester \"create tests for auth module\""
echo "\`\`\`"
echo ""
echo "**wshobson Plugin Management:**"
echo "\`\`\`bash"
echo "claude plugin search [keyword]   # Search marketplace"
echo "claude plugin install [name]     # Install plugin"
echo "claude plugin list               # List installed"
echo "claude plugin remove [name]      # Uninstall plugin"
echo "\`\`\`"
echo ""
echo "**Agent Categories:**"
echo "- \`core\` - Essential development agents (coder, reviewer, tester, planner, researcher)"
echo "- \`swarm\` - Multi-agent coordination (hierarchical, mesh, adaptive)"
echo "- \`github\` - GitHub operations (PR management, issue tracking, releases)"
echo "- \`sparc\` - SPARC methodology (specification, architecture, refinement)"
echo "- \`testing\` - Testing strategies (TDD, validation, production checks)"
echo "- \`optimization\` - Performance analysis and optimization"
echo "- \`consensus\` - Distributed coordination (Byzantine, Raft, Gossip)"
echo ""
echo "**Pro Tips:**"
echo "- Use \`--category [name]\` to filter by category"
echo "- Use keyword filter to search descriptions"
echo "- Check agent file for detailed capabilities and examples"
echo "- Combine SuperClaude agents with wshobson plugins for extended functionality"
echo ""
echo "═══════════════════════════════════════════════════════════════"
```

## Output Example

```
# 🤖 Agent Discovery System

Found agents across SuperClaude framework and wshobson marketplace
═══════════════════════════════════════════════════════════════

## 📦 SuperClaude Framework Agents (.claude/agents/)

**Total Agents:** 84

### Core Development (5 agents)

- **coder**
  - Description: Implementation specialist for code generation
  - Usage: `@agent-coder "implement feature"`
  - Path: `.claude/agents/core/coder.md`

- **reviewer**
  - Description: Code quality and architecture reviewer
  - Usage: `@agent-reviewer "review changes"`
  - Path: `.claude/agents/core/reviewer.md`

[... more agents ...]

---

## 🏪 wshobson Marketplace Plugins

Checking installed plugins...

**Installed Plugins:**

- @wshobson/plugin-typescript (v2.1.0)
- @wshobson/plugin-react (v1.8.3)

---

## 🚀 Quick Reference

[... usage examples ...]
```

## Features

### Search & Filter
- **Keyword search**: Filter agents by name or description
- **Category filter**: Show only specific categories
- **Installed only**: Show only installed wshobson plugins

### Integration
- **SuperClaude agents**: Scans `.claude/agents/` directory structure
- **wshobson CLI**: Interfaces with `claude plugin` commands
- **Unified view**: Single command for all agent discovery

### Information Display
- Agent counts by category
- Usage examples for each agent
- File paths for documentation
- Installation status for plugins
- Quick reference guide

## Related Commands

- `/sc:help` - Show all available SuperClaude commands
- `claude plugin search` - Search wshobson marketplace
- `claude plugin list` - List installed plugins

## Notes

- SuperClaude agents are file-based in `.claude/agents/`
- wshobson plugins require `@wshobson/claude-cli` installation
- Agent descriptions extracted from frontmatter
- Categories determined by directory structure
