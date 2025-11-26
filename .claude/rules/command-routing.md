# Dynamic Command Routing Rules

This file defines intelligent routing logic for selecting optimal commands from **214+ commands across 25 categories**.

## Pre-Response Classification (MANDATORY)

Before responding to ANY request, classify and route:

```yaml
CLASSIFICATION_TRIGGERS:

  brainstorm:
    keywords: ["maybe", "thinking about", "not sure", "explore", "ideas", "brainstorm", "could we", "what if"]
    route_to: /sc:brainstorm OR /sparc:innovator

  implementation:
    keywords: ["implement", "create", "build", "add", "make", "code", "develop", "write"]
    route_to: /sc:implement OR /sparc:coder OR /swarm:development

  analysis:
    keywords: ["analyze", "review", "check", "audit", "examine", "assess"]
    route_to: /sc:analyze OR /sparc:analyzer OR /swarm:analysis

  research:
    keywords: ["investigate", "explore", "find", "discover", "learn", "research"]
    route_to: /sc:research OR /sparc:researcher OR /swarm:research

  troubleshoot:
    keywords: ["fix", "debug", "error", "broken", "not working", "bug", "issue"]
    route_to: /sc:troubleshoot OR /sparc:debugger

  documentation:
    keywords: ["document", "explain", "describe", "readme", "docs"]
    route_to: /sc:document OR /sparc:documenter

  testing:
    keywords: ["test", "verify", "validate", "coverage", "spec"]
    route_to: /sc:test OR /sparc:tdd OR /sparc:tester OR /swarm:testing

  architecture:
    keywords: ["design", "architect", "structure", "system", "schema", "plan"]
    route_to: /sc:design OR /sparc:architect

  optimization:
    keywords: ["optimize", "performance", "speed", "faster", "efficient", "improve"]
    route_to: /sparc:optimizer OR /analysis:performance-report

  project_management:
    keywords: ["prd", "epic", "sprint", "backlog", "requirement", "story", "task", "next"]
    route_to: /pm:* commands (see PM category below)

  github:
    keywords: ["pr", "pull request", "issue", "release", "merge", "review", "github"]
    route_to: /github:* commands (see GitHub category below)

  ui_frontend:
    keywords: ["ui", "frontend", "component", "layout", "clone", "website"]
    route_to: /ui:clone OR /ui:uied-analysis OR /sparc:designer

  coordination:
    keywords: ["swarm", "coordinate", "parallel", "multi-agent", "orchestrate"]
    route_to: /coordination:swarm-init OR /swarm:swarm-modes

  memory:
    keywords: ["remember", "context", "session", "persist", "memory"]
    route_to: /memory:usage OR /automation:session-memory
```

---

## Complete Command Reference (214+ Commands)

### /sc:* - SuperClaude Commands (26 commands)
Meta-routing and high-level operations.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/sc:analyze` | Code analysis | "analyze", "review code", "check quality" |
| `/sc:brainstorm` | Discovery mode | "not sure", "explore ideas", "thinking about" |
| `/sc:build` | Build/compile | "build", "compile", "package" |
| `/sc:business-panel` | Business analysis | "business strategy", "market analysis" |
| `/sc:cleanup` | Code cleanup | "clean up", "remove dead code", "refactor" |
| `/sc:design` | System design | "design system", "architect", "schema" |
| `/sc:document` | Documentation | "document", "explain", "describe" |
| `/sc:estimate` | Effort estimation | "estimate", "how long", "complexity" |
| `/sc:explain` | Code explanation | "explain this", "what does", "how does" |
| `/sc:git` | Git operations | "commit", "push", "branch", "merge" |
| `/sc:help` | List commands | "help", "what commands", "options" |
| `/sc:implement` | Feature implementation | "implement", "add feature", "create" |
| `/sc:improve` | Code improvement | "improve", "enhance", "better" |
| `/sc:index` | Project indexing | "index", "catalog", "map codebase" |
| `/sc:load` | Session load | "load session", "restore context" |
| `/sc:pm` | Project management (DEFAULT) | Complex/ambiguous requests |
| `/sc:reflect` | Task reflection | "reflect", "review progress", "assess" |
| `/sc:research` | Deep research | "research", "investigate", "find out" |
| `/sc:save` | Session save | "save session", "persist context" |
| `/sc:select-tool` | Tool selection | "which tool", "best approach" |
| `/sc:spawn` | Agent spawning | "spawn agent", "create worker" |
| `/sc:spec-panel` | Spec review | "review spec", "specification analysis" |
| `/sc:task` | Task execution | "do task", "execute" |
| `/sc:test` | Test execution | "run tests", "test coverage" |
| `/sc:troubleshoot` | Debugging | "fix", "debug", "error", "broken" |
| `/sc:workflow` | Workflow generation | "workflow", "process", "pipeline" |

---

### /sparc:* - SPARC Methodology (18 commands)
Systematic development modes with MCP integration.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/sparc:sparc-modes` | **List all SPARC modes** | "what sparc modes", "sparc options" |
| `/sparc:orchestrator` | Multi-agent coordination | Complex multi-step tasks |
| `/sparc:swarm-coordinator` | Swarm management | Swarm-specific coordination |
| `/sparc:workflow-manager` | Process automation | Workflow design/execution |
| `/sparc:batch-executor` | Parallel execution | Batch/parallel operations |
| `/sparc:coder` | Autonomous coding | Feature implementation |
| `/sparc:architect` | System design | Architecture decisions |
| `/sparc:reviewer` | Code review | PR review, quality checks |
| `/sparc:tdd` | Test-driven dev | TDD workflow, test-first |
| `/sparc:researcher` | Deep research | Investigation, exploration |
| `/sparc:analyzer` | Code analysis | Quality analysis, audits |
| `/sparc:optimizer` | Performance tuning | Optimization tasks |
| `/sparc:designer` | UI/UX design | Interface design |
| `/sparc:innovator` | Creative solutions | Brainstorming, innovation |
| `/sparc:documenter` | Documentation | Docs generation |
| `/sparc:debugger` | Systematic debugging | Bug fixing, troubleshooting |
| `/sparc:tester` | Comprehensive testing | Test creation/execution |
| `/sparc:memory-manager` | Knowledge management | Context persistence |

---

### /swarm:* - Swarm Strategies (17 commands)
Multi-agent coordination and strategies.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/swarm:swarm-modes` | **List swarm strategies** | "what swarm modes", "coordination options" |
| `/swarm:development` | Dev swarm | Feature building, implementation |
| `/swarm:research` | Research swarm | Investigation, exploration |
| `/swarm:testing` | Testing swarm | Comprehensive test coverage |
| `/swarm:analysis` | Analysis swarm | Deep code analysis |
| `/swarm:maintenance` | Maintenance swarm | Refactoring, cleanup |
| `/swarm:optimization` | Optimization swarm | Performance tuning |
| `/swarm:swarm-init` | Initialize swarm | Start new swarm |
| `/swarm:swarm-spawn` | Spawn agents | Add agents to swarm |
| `/swarm:swarm-status` | Check status | Monitor swarm health |
| `/swarm:swarm-monitor` | Real-time monitoring | Live swarm tracking |
| `/swarm:swarm-strategies` | Strategy reference | Strategy documentation |
| `/swarm:swarm-analysis` | Swarm analysis | Analyze swarm performance |
| `/swarm:swarm-background` | Background execution | Long-running tasks |
| `/swarm:swarm` | General swarm ops | Swarm management |
| `/swarm:examples` | Usage examples | Learn swarm patterns |

---

### /pm:* - Project Management (38 commands)
PRD, epic, and issue management.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/pm:prd-new` | Create PRD | "new requirement", "new feature spec" |
| `/pm:prd-edit` | Edit PRD | "update requirement", "modify spec" |
| `/pm:prd-list` | List PRDs | "show prds", "list requirements" |
| `/pm:prd-status` | PRD status | "prd progress", "requirement status" |
| `/pm:prd-parse` | Parse PRD | "extract from prd", "parse requirement" |
| `/pm:epic-oneshot` | Decompose epic | "break down epic", "decompose" |
| `/pm:epic-start` | Start epic | "begin epic", "start work" |
| `/pm:epic-start-worktree` | Epic worktree | "epic branch", "worktree" |
| `/pm:epic-status` | Epic status | "epic progress", "where are we" |
| `/pm:epic-sync` | Sync to GitHub | "sync epic", "update github" |
| `/pm:epic-show` | Show epic details | "show epic", "epic info" |
| `/pm:epic-list` | List epics | "list epics", "show all epics" |
| `/pm:epic-edit` | Edit epic | "modify epic", "update epic" |
| `/pm:epic-close` | Close epic | "complete epic", "finish epic" |
| `/pm:epic-merge` | Merge epic | "merge epic work", "combine" |
| `/pm:epic-refresh` | Refresh epic | "refresh", "reload epic" |
| `/pm:epic-decompose` | Decompose epic | "break into issues" |
| `/pm:issue-start` | Start issue | "work on issue", "begin task" |
| `/pm:issue-analyze` | Analyze issue | "analyze issue", "understand task" |
| `/pm:issue-status` | Issue status | "issue progress", "task status" |
| `/pm:issue-sync` | Sync issue | "sync issue", "update github issue" |
| `/pm:issue-show` | Show issue | "show issue", "issue details" |
| `/pm:issue-edit` | Edit issue | "modify issue", "update task" |
| `/pm:issue-close` | Close issue | "complete issue", "done with task" |
| `/pm:issue-reopen` | Reopen issue | "reopen issue", "restart task" |
| `/pm:next` | Next task | "what's next", "next priority" |
| `/pm:status` | Overall status | "project status", "where are we" |
| `/pm:standup` | Daily standup | "standup", "daily update" |
| `/pm:blocked` | Show blockers | "blockers", "what's stuck" |
| `/pm:in-progress` | In-progress items | "what's active", "current work" |
| `/pm:search` | Search items | "find issue", "search tasks" |
| `/pm:sync` | Full sync | "sync all", "update everything" |
| `/pm:init` | Initialize PM | "setup pm", "initialize project" |
| `/pm:import` | Import data | "import issues", "bring in" |
| `/pm:clean` | Clean data | "clean up pm", "remove old" |
| `/pm:validate` | Validate | "check integrity", "validate data" |
| `/pm:help` | PM help | "pm commands", "pm help" |
| `/pm:test-reference-update` | Update refs | "update test references" |

---

### /github:* - GitHub Operations (19 commands)
PR, issue, and repository management.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/github:pr-manager` | PR management | "create pr", "manage pr" |
| `/github:code-review-swarm` | Code review | "review pr", "code review" |
| `/github:code-review` | Simple review | "quick review", "check code" |
| `/github:issue-tracker` | Issue tracking | "track issues", "issue management" |
| `/github:issue-triage` | Issue triage | "triage issues", "prioritize" |
| `/github:release-manager` | Release management | "create release", "version" |
| `/github:release-swarm` | Release swarm | "coordinate release" |
| `/github:repo-analyze` | Repo analysis | "analyze repo", "repo health" |
| `/github:repo-architect` | Repo architecture | "repo structure", "organize" |
| `/github:github-modes` | GitHub modes | "github options", "gh commands" |
| `/github:github-swarm` | GitHub swarm | "github coordination" |
| `/github:workflow-automation` | Workflow automation | "automate workflow", "ci/cd" |
| `/github:multi-repo-swarm` | Multi-repo | "cross-repo", "multiple repos" |
| `/github:sync-coordinator` | Sync coordination | "sync repos", "coordinate" |
| `/github:swarm-issue` | Issue swarm | "swarm on issue" |
| `/github:swarm-pr` | PR swarm | "swarm on pr" |
| `/github:project-board-sync` | Board sync | "sync board", "project board" |
| `/github:pr-enhance` | PR enhancement | "improve pr", "enhance pr" |

---

### /coordination:* - Swarm Coordination (7 commands)
Initialize and manage swarm coordination.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/coordination:swarm-init` | Initialize swarm | "start swarm", "init coordination" |
| `/coordination:agent-spawn` | Spawn agent | "add agent", "spawn worker" |
| `/coordination:task-orchestrate` | Orchestrate task | "coordinate task", "orchestrate" |
| `/coordination:orchestrate` | General orchestration | "orchestrate", "coordinate" |
| `/coordination:spawn` | Quick spawn | "spawn", "create agent" |
| `/coordination:init` | Initialize | "init", "setup" |

---

### /hive-mind:* - Collective Intelligence (12 commands)
Distributed consensus and collective decision-making.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/hive-mind:hive-mind-init` | Initialize hive | "start hive", "collective init" |
| `/hive-mind:hive-mind-spawn` | Spawn hive agent | "add to hive", "hive agent" |
| `/hive-mind:hive-mind-consensus` | Build consensus | "consensus", "collective decision" |
| `/hive-mind:hive-mind-memory` | Hive memory | "collective memory", "shared knowledge" |
| `/hive-mind:hive-mind-status` | Hive status | "hive health", "collective status" |
| `/hive-mind:hive-mind-stop` | Stop hive | "stop hive", "end collective" |
| `/hive-mind:hive-mind-resume` | Resume hive | "resume hive", "continue collective" |
| `/hive-mind:hive-mind-sessions` | Hive sessions | "hive history", "sessions" |
| `/hive-mind:hive-mind-metrics` | Hive metrics | "collective metrics", "performance" |
| `/hive-mind:hive-mind-wizard` | Setup wizard | "hive wizard", "guided setup" |
| `/hive-mind:hive-mind` | General hive | "hive mind", "collective" |

---

### /analysis:* - Performance Analysis (7 commands)
Token, performance, and bottleneck analysis.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/analysis:performance-report` | Performance report | "performance report", "perf summary" |
| `/analysis:bottleneck-detect` | Find bottlenecks | "bottleneck", "slow", "performance issue" |
| `/analysis:performance-bottlenecks` | Bottleneck analysis | "analyze bottlenecks" |
| `/analysis:token-usage` | Token usage | "token usage", "context usage" |
| `/analysis:token-efficiency` | Token efficiency | "token optimization", "reduce tokens" |
| `/analysis:COMMAND_COMPLIANCE_REPORT` | Compliance report | "compliance", "standards check" |

---

### /automation:* - Workflow Automation (10 commands)
Self-healing, smart agents, and automation.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/automation:workflow-select` | Select workflow | "which workflow", "auto select" |
| `/automation:smart-agents` | Smart agent config | "smart agents", "intelligent agents" |
| `/automation:smart-spawn` | Smart spawning | "auto spawn", "intelligent spawn" |
| `/automation:self-healing` | Self-healing | "auto fix", "self repair" |
| `/automation:session-memory` | Session memory | "remember session", "persist context" |
| `/automation:auto-agent` | Auto agent | "automatic agent", "auto work" |
| `/automation:discovery_mode_command` | Discovery mode | "discover", "explore automatically" |
| `/automation:AKPM` | AKPM mode | "akpm", "automated pm" |
| `/automation:ARM` | ARM mode | "arm", "automated resource" |

---

### /memory:* - Memory Management (6 commands)
Persistent memory and context.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/memory:usage` | Memory usage | "memory status", "what's stored" |
| `/memory:memory-usage` | Detailed usage | "detailed memory", "memory details" |
| `/memory:memory-persist` | Persist memory | "save memory", "persist" |
| `/memory:memory-search` | Search memory | "find in memory", "search stored" |
| `/memory:neural` | Neural memory | "neural patterns", "learned patterns" |

---

### /monitoring:* - System Monitoring (6 commands)
Status, health, and real-time monitoring.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/monitoring:status` | System status | "status", "health check" |
| `/monitoring:agents` | Agent status | "agent status", "workers" |
| `/monitoring:agent-metrics` | Agent metrics | "agent performance", "metrics" |
| `/monitoring:swarm-monitor` | Swarm monitoring | "monitor swarm", "swarm health" |
| `/monitoring:real-time-view` | Real-time view | "live view", "real-time" |

---

### /optimization:* - Performance Optimization (6 commands)
Parallel execution and topology optimization.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/optimization:parallel-execution` | Parallel exec | "run parallel", "concurrent" |
| `/optimization:parallel-execute` | Execute parallel | "execute parallel", "batch run" |
| `/optimization:auto-topology` | Auto topology | "optimize topology", "best structure" |
| `/optimization:topology-optimize` | Topology optimize | "improve topology", "structure" |
| `/optimization:cache-manage` | Cache management | "cache", "caching" |

---

### /ui:* - UI/Frontend (6 commands)
UI design, cloning, and analysis.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/ui:clone` | Clone website | "clone website", "copy ui" |
| `/ui:clone-website` | Clone site | "clone site", "replicate" |
| `/ui:uied-analysis` | UI analysis | "analyze ui", "ui review" |
| `/ui:design` | UI design | "design ui", "create interface" |
| `/ui:style-guide` | Style guide | "style guide", "design system" |

---

### /flow-nexus:* - Cloud Operations (9 commands)
Cloud sandboxes, neural networks, and deployment.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/flow-nexus:sandbox` | Sandbox management | "sandbox", "isolated env" |
| `/flow-nexus:swarm` | Cloud swarm | "cloud swarm", "remote agents" |
| `/flow-nexus:neural-network` | Neural network | "neural", "ai training" |
| `/flow-nexus:workflow` | Cloud workflow | "cloud workflow", "remote process" |
| `/flow-nexus:app-store` | App store | "apps", "templates" |
| `/flow-nexus:challenges` | Challenges | "challenges", "tasks" |
| `/flow-nexus:payments` | Payments | "credits", "billing" |
| `/flow-nexus:user-tools` | User tools | "user management", "profile" |
| `/flow-nexus:login-registration` | Auth | "login", "register" |

---

### /hooks:* - Hook Configuration (8 commands)
Lifecycle hooks and triggers.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/hooks:setup` | Setup hooks | "configure hooks", "setup triggers" |
| `/hooks:pre-task` | Pre-task hook | "before task", "pre hook" |
| `/hooks:post-task` | Post-task hook | "after task", "post hook" |
| `/hooks:pre-edit` | Pre-edit hook | "before edit", "pre edit" |
| `/hooks:post-edit` | Post-edit hook | "after edit", "post edit" |
| `/hooks:session-end` | Session end | "end session", "cleanup" |
| `/hooks:overview` | Hooks overview | "hooks info", "what hooks" |

---

### /training:* - Neural Training (6 commands)
Pattern learning and model training.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/training:neural-train` | Train neural | "train model", "neural training" |
| `/training:neural-patterns` | Neural patterns | "patterns", "learned behaviors" |
| `/training:pattern-learn` | Learn patterns | "learn patterns", "pattern recognition" |
| `/training:model-update` | Update model | "update model", "improve model" |
| `/training:specialization` | Specialization | "specialize", "domain training" |

---

### /pair:* - Pair Programming (9 commands)
Collaborative coding sessions.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/pair:start` | Start pairing | "pair program", "collaborate" |
| `/pair:session` | Pair session | "pairing session", "together" |
| `/pair:modes` | Pair modes | "pair options", "collaboration modes" |
| `/pair:config` | Pair config | "configure pair", "pair settings" |
| `/pair:commands` | Pair commands | "pair commands", "pair help" |
| `/pair:shortcuts` | Shortcuts | "pair shortcuts", "quick actions" |
| `/pair:templates` | Templates | "pair templates", "session templates" |
| `/pair:examples` | Examples | "pair examples", "how to pair" |

---

### /workflows:* - Workflow Templates (6 commands)
Predefined workflow templates.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/workflows:development` | Dev workflow | "development process", "dev workflow" |
| `/workflows:research` | Research workflow | "research process", "investigation" |
| `/workflows:workflow-create` | Create workflow | "new workflow", "create process" |
| `/workflows:workflow-execute` | Execute workflow | "run workflow", "execute process" |
| `/workflows:workflow-export` | Export workflow | "export workflow", "save process" |

---

### /statusline:* - Status Display (8 commands)
Status line configuration and display.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/statusline:config` | Config statusline | "statusline settings", "configure display" |
| `/statusline:refresh` | Refresh display | "refresh status", "update display" |
| `/statusline:get-agents` | Get agents | "show agents", "agent list" |
| `/statusline:list-workspaces` | List workspaces | "workspaces", "environments" |
| `/statusline:switch-workspace` | Switch workspace | "switch workspace", "change env" |
| `/statusline:assign-instance` | Assign instance | "assign", "allocate" |
| `/statusline:scroll-left` | Scroll left | "scroll left", "previous" |
| `/statusline:scroll-right` | Scroll right | "scroll right", "next" |

---

### /stream-chain:* - Pipeline Processing (2 commands)
Data pipeline and stream processing.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/stream-chain:pipeline` | Pipeline | "pipeline", "data flow" |
| `/stream-chain:run` | Run chain | "run stream", "execute pipeline" |

---

### /agents:* - Agent Reference (5 commands)
Agent documentation and capabilities.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/agents:agent-capabilities` | Agent capabilities | "what can agents do", "agent features" |
| `/agents:agent-types` | Agent types | "agent types", "available agents" |
| `/agents:agent-spawning` | Spawning guide | "how to spawn", "create agents" |
| `/agents:agent-coordination` | Coordination guide | "coordinate agents", "agent communication" |

---

### /verify:* - Verification (2 commands)
Verification and validation.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/verify:check` | Verification check | "verify", "validate", "check" |
| `/verify:start` | Start verification | "begin verification", "start check" |

---

### /truth:* - Ground Truth (1 command)
Ground truth verification.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/truth:start` | Ground truth | "ground truth", "verify facts" |

---

### /system:* - System Commands (1 command)
System-level operations.

| Command | Purpose | Use When |
|---------|---------|----------|
| `/system:agents-list` | List all agents | "all agents", "agent catalog" |

---

## Routing Algorithm

```yaml
ROUTING_STEPS:

  1_classify_request:
    action: Match keywords to classification triggers above
    output: primary_category

  2_assess_complexity:
    simple: Single file, clear scope → Direct tool use
    moderate: Multi-file, clear requirements → Single SPARC mode or /sc command
    complex: Multi-component, unclear scope → Swarm coordination
    enterprise: Cross-project, long-running → /sc:pm with wave strategy

  3_select_command:
    - Check category-specific commands above
    - For SPARC tasks: consult /sparc:sparc-modes
    - For swarm tasks: consult /swarm:swarm-modes
    - For unclear tasks: use /sc:pm (default meta-router)

  4_execute:
    - Use TodoWrite for >2 steps
    - Batch operations in single messages
    - Verify completion before marking done
```

## Fallback Hierarchy

When uncertain which command to use:

```
1. /sc:pm         → Default meta-router (handles all cases)
2. /sparc:sparc-modes → Lists all SPARC mode options
3. /swarm:swarm-modes → Lists all swarm strategy options
4. /sc:help       → Lists all /sc commands
```

## Quick Reference Matrix

| Request Pattern | Primary Command | Alternatives |
|-----------------|-----------------|--------------|
| "Build X" | `/swarm:development` | `/sparc:coder`, `/sc:implement` |
| "Design X" | `/sparc:architect` | `/sc:design` |
| "Research X" | `/sc:research` | `/sparc:researcher`, `/swarm:research` |
| "Fix X" | `/sparc:debugger` | `/sc:troubleshoot` |
| "Review PR" | `/github:code-review-swarm` | `/sparc:reviewer` |
| "Test X" | `/sparc:tdd` | `/sc:test`, `/swarm:testing` |
| "Document X" | `/sparc:documenter` | `/sc:document` |
| "Optimize X" | `/sparc:optimizer` | `/analysis:performance-report` |
| "Create PRD" | `/pm:prd-new` | - |
| "Start issue" | `/pm:issue-start` | - |
| "Clone website" | `/ui:clone` | `/ui:uied-analysis` |
| "Init swarm" | `/coordination:swarm-init` | `/swarm:swarm-init` |
| "Check status" | `/monitoring:status` | `/swarm:swarm-status` |
| "What's next" | `/pm:next` | `/pm:status` |
| "Not sure..." | `/sc:brainstorm` | `/sparc:innovator` |
