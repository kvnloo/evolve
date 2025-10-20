# Hybrid Agent System Integration Guide

**SuperClaude (.claude/) + wshobson Marketplace**

## System Overview

This project integrates two powerful agent systems that work concurrently without conflicts:

1. **SuperClaude Framework** - Custom `.claude/` system with 78+ specialized agents
2. **wshobson Marketplace** - Production-ready plugin system with 63 plugins, 85 agents, 47 skills

Both systems coexist through careful namespace separation and complementary capabilities.

---

## Architecture Design

### Namespace Structure

The two systems use distinct command namespaces to prevent conflicts:

```
/sc:*           → SuperClaude system commands
/plugin:*       → wshobson marketplace plugins
@agent-*        → Both systems (context-aware routing)
```

**Examples:**
```bash
# SuperClaude commands
/sc:implement "feature"
/sc:analyze "codebase"
/sc:test "component"

# wshobson plugin commands
/plugin:backend-architect "API design"
/plugin:frontend-developer "React component"
/plugin:kubernetes-operations "deploy"

# Agent routing (auto-detected)
@agent-backend-dev "REST API"      # Routes to SuperClaude
@agent-backend-architect "scaling" # Routes to wshobson
```

### System Boundaries

| Aspect | SuperClaude | wshobson Marketplace |
|--------|-------------|---------------------|
| **Primary Focus** | Task orchestration, SPARC methodology, TDD workflows | Domain expertise, production patterns, best practices |
| **Command Pattern** | `/sc:*` slash commands | `/plugin:*` or direct agent invocation |
| **Agent Count** | 78+ agents in 22 directories | 85 agents across 63 plugins |
| **Specialization** | Workflow management, swarm coordination, SPARC phases | Language/framework experts, architecture patterns |
| **Token Usage** | Full context loading | Progressive disclosure, minimal loading |
| **Installation** | Project-local (`.claude/` directory) | Plugin marketplace (optional install) |

---

## Agent Inventory

### SuperClaude Agents (78+ agents)

Located in `.claude/agents/` organized by domain:

#### Core Development (5 agents)
- `core/coder` - General code implementation
- `core/planner` - Task planning and breakdown
- `core/researcher` - Investigation and analysis
- `core/reviewer` - Code review and quality checks
- `core/tester` - Test creation and validation

#### Analysis & Architecture (3 agents)
- `analysis/code-analyzer` - Code quality analysis
- `analysis/code-review/analyze-code-quality` - Quality metrics
- `architecture/system-design/arch-system-design` - System architecture

#### SPARC Methodology (4 agents)
- `sparc/specification` - Requirements analysis
- `sparc/pseudocode` - Algorithm design
- `sparc/architecture` - System design
- `sparc/refinement` - TDD implementation

#### GitHub Integration (13 agents)
- `github/code-review-swarm` - Swarm-based code review
- `github/github-modes` - GitHub workflow modes
- `github/issue-tracker` - Issue management
- `github/multi-repo-swarm` - Multi-repository coordination
- `github/pr-manager` - Pull request handling
- `github/project-board-sync` - Project board synchronization
- `github/release-manager` - Release management
- `github/release-swarm` - Swarm-based releases
- `github/repo-architect` - Repository structure design
- `github/swarm-issue` - Issue swarm coordination
- `github/swarm-pr` - PR swarm coordination
- `github/sync-coordinator` - Synchronization management
- `github/workflow-automation` - Workflow automation

#### Swarm Coordination (3 agents)
- `swarm/adaptive-coordinator` - Adaptive swarm patterns
- `swarm/hierarchical-coordinator` - Hierarchical coordination
- `swarm/mesh-coordinator` - Mesh network coordination

#### Consensus & Distributed Systems (6 agents)
- `consensus/byzantine-coordinator` - Byzantine fault tolerance
- `consensus/crdt-synchronizer` - CRDT synchronization
- `consensus/gossip-coordinator` - Gossip protocol coordination
- `consensus/performance-benchmarker` - Performance benchmarking
- `consensus/quorum-manager` - Quorum management
- `consensus/raft-manager` - Raft consensus protocol
- `consensus/security-manager` - Security management

#### Hive Mind Coordination (5 agents)
- `hive-mind/collective-intelligence-coordinator` - Collective intelligence
- `hive-mind/queen-coordinator` - Queen bee pattern
- `hive-mind/scout-explorer` - Exploration patterns
- `hive-mind/swarm-memory-manager` - Swarm memory
- `hive-mind/worker-specialist` - Worker specialization

#### Optimization (5 agents)
- `optimization/benchmark-suite` - Benchmark testing
- `optimization/load-balancer` - Load balancing
- `optimization/performance-monitor` - Performance monitoring
- `optimization/resource-allocator` - Resource allocation
- `optimization/topology-optimizer` - Topology optimization

#### Development Specialists (3 agents)
- `development/backend/dev-backend-api` - Backend API development
- `specialized/mobile/spec-mobile-react-native` - React Native mobile
- `data/ml/data-ml-model` - ML model development

#### DevOps (1 agent)
- `devops/ci-cd/ops-cicd-github` - GitHub CI/CD

#### Documentation (1 agent)
- `documentation/api-docs/docs-api-openapi` - OpenAPI documentation

#### Testing (2 agents)
- `testing/unit/tdd-london-swarm` - London-style TDD swarm
- `testing/validation/production-validator` - Production validation

#### Flow-Nexus Integration (9 agents)
- `flow-nexus/app-store` - App store integration
- `flow-nexus/authentication` - Authentication services
- `flow-nexus/challenges` - Challenge management
- `flow-nexus/neural-network` - Neural network features
- `flow-nexus/payments` - Payment processing
- `flow-nexus/sandbox` - Sandbox environments
- `flow-nexus/swarm` - Swarm orchestration
- `flow-nexus/user-tools` - User tools
- `flow-nexus/workflow` - Workflow management

#### Templates & Utilities (11 agents)
- `templates/automation-smart-agent` - Smart automation
- `templates/coordinator-swarm-init` - Swarm initialization
- `templates/github-pr-manager` - PR management templates
- `templates/implementer-sparc-coder` - SPARC implementation
- `templates/memory-coordinator` - Memory coordination
- `templates/migration-plan` - Migration planning
- `templates/orchestrator-task` - Task orchestration
- `templates/performance-analyzer` - Performance analysis
- `templates/sparc-coordinator` - SPARC coordination
- `base-template-generator` - Template generation
- `reasoning/agent` - Reasoning patterns

#### Neural & Reasoning (3 agents)
- `neural/safla-neural` - Neural processing
- `reasoning/example-reasoning-agent-template` - Reasoning template
- `reasoning/goal-planner` - Goal planning

#### Goal Planning (2 agents)
- `goal/code-goal-planner` - Code goal planning
- `goal/goal-planner` - General goal planning

### wshobson Marketplace Agents (85 agents)

Organized across 63 plugins in 23 categories with 47 specialized skills:

#### Architecture (6 plugins, ~8 agents)
- **backend-architect** - Scalable API design, microservices, distributed systems
- **cloud-architect** - Multi-cloud infrastructure, cloud-native patterns
- **data-architect** - Data pipelines, warehousing, lake architecture
- **frontend-architect** - Frontend systems, React Server Components, state management
- **infrastructure-architect** - Infrastructure design, IaC patterns
- **solution-architect** - End-to-end solution design, integration patterns

#### Backend Development (4 plugins, ~6 agents)
- **backend-development** - Backend APIs with 3 architecture skills
- **api-design** - REST/GraphQL/gRPC API patterns
- **microservices** - Microservice architecture and patterns
- **serverless** - Serverless architecture and deployment

#### Frontend Development (5 plugins, ~7 agents)
- **frontend-development** - React 19, Next.js 15+, modern frontend
- **react-development** - React patterns, hooks, performance
- **nextjs-development** - Next.js App Router, Server Components
- **web-components** - Web Components, Custom Elements
- **ui-ux** - UI/UX design patterns and accessibility

#### DevOps & Infrastructure (6 plugins, ~9 agents)
- **kubernetes-operations** - K8s with 4 deployment skills
- **cloud-infrastructure** - AWS/Azure/GCP with 4 cloud skills
- **docker-containerization** - Docker, containers, orchestration
- **ci-cd-pipeline** - CI/CD automation, GitHub Actions
- **infrastructure-as-code** - Terraform, Pulumi, CloudFormation
- **monitoring-observability** - Metrics, logs, traces, alerting

#### Languages (8 plugins, ~12 agents)
- **python-development** - Python with 3 agents, 5 skills
- **javascript-development** - JavaScript/TypeScript expertise
- **go-development** - Go programming, concurrency
- **rust-development** - Rust systems programming
- **java-development** - Java/Spring Boot development
- **csharp-development** - C#/.NET development
- **php-development** - PHP/Laravel development
- **ruby-development** - Ruby/Rails development

#### Data & AI (5 plugins, ~8 agents)
- **machine-learning** - ML models, training, deployment
- **data-engineering** - ETL pipelines, data processing
- **data-science** - Analytics, visualization, modeling
- **database-development** - SQL/NoSQL database design
- **ai-integration** - AI/ML integration patterns

#### Quality & Testing (4 plugins, ~6 agents)
- **test-automation** - E2E, integration, unit testing
- **performance-testing** - Load, stress, performance testing
- **security-testing** - Security scanning, penetration testing
- **code-quality** - Static analysis, linting, code review

#### Documentation (3 plugins, ~5 agents)
- **technical-writing** - Technical documentation, API docs
- **api-documentation** - OpenAPI/Swagger, REST docs
- **developer-education** - Tutorials, guides, examples

#### Business & Operations (4 plugins, ~6 agents)
- **business-analyst** - Requirements, user stories, BDD
- **product-manager** - Product strategy, roadmaps, prioritization
- **project-manager** - Agile/Scrum, project planning
- **devops-engineer** - DevOps practices, automation

#### SEO & Marketing (3 plugins, ~4 agents)
- **seo-specialist** - Technical SEO, optimization
- **content-strategy** - Content planning, marketing
- **analytics** - Analytics setup, tracking, insights

#### Security (3 plugins, ~5 agents)
- **security-engineer** - Application security, threat modeling
- **compliance-auditor** - Compliance, GDPR, SOC2
- **penetration-tester** - Security testing, vulnerability assessment

#### Mobile Development (2 plugins, ~3 agents)
- **mobile-development** - iOS/Android native development
- **react-native** - React Native cross-platform development

#### Additional Categories (10+ plugins, ~10 agents)
- Blockchain, game development, IoT, embedded systems
- Low-code/no-code platforms
- Legacy system modernization
- System integration patterns
- And more specialized domains...

---

## Agent Overlap & Coexistence

### Overlapping Domains

Both systems have agents in these areas:

| Domain | SuperClaude Agent | wshobson Agent | Differentiation |
|--------|-------------------|----------------|-----------------|
| **Backend** | `development/backend/dev-backend-api` | `backend-architect`, `backend-development` | SuperClaude: workflow integration; wshobson: architecture patterns |
| **Code Analysis** | `analysis/code-analyzer` | `code-quality` plugin agents | SuperClaude: holistic analysis; wshobson: specific quality metrics |
| **Testing** | `testing/unit/tdd-london-swarm` | `test-automation` plugin | SuperClaude: swarm TDD; wshobson: comprehensive test patterns |
| **Documentation** | `documentation/api-docs/docs-api-openapi` | `api-documentation` plugin | SuperClaude: integration; wshobson: specialized API docs |
| **Mobile** | `specialized/mobile/spec-mobile-react-native` | `react-native` plugin | SuperClaude: specification phase; wshobson: implementation expertise |

### Complementary Strengths

**When to use SuperClaude:**
- Multi-agent swarm coordination
- SPARC methodology workflows
- GitHub issue/PR automation
- Complex task orchestration
- Cross-session memory management
- TDD workflow automation

**When to use wshobson plugins:**
- Domain-specific expertise (e.g., Kubernetes, specific languages)
- Production-ready patterns and best practices
- Framework-specific implementation (React 19, Next.js 15)
- Cloud platform expertise (AWS/Azure/GCP)
- Specialized skills (progressive disclosure)
- Minimal token usage scenarios

### Resolution Strategy

When both systems have similar agents:

1. **Check task type:**
   - Workflow/orchestration → SuperClaude
   - Implementation/patterns → wshobson

2. **Check complexity:**
   - Multi-agent coordination needed → SuperClaude
   - Single expert needed → wshobson

3. **Check context:**
   - SPARC methodology → SuperClaude
   - Framework-specific → wshobson

4. **Use both:**
   - SuperClaude orchestrates workflow
   - wshobson provides implementation expertise

---

## Usage Patterns

### Pattern 1: Sequential Usage

**SuperClaude orchestrates, wshobson implements:**

```bash
# 1. SuperClaude plans the work
/sc:implement "Build REST API for user management"
# → Spawns planner, creates task breakdown

# 2. wshobson plugin provides implementation
/plugin:backend-architect "Design REST API architecture"
# → Provides scalable API patterns

# 3. SuperClaude coordinates implementation
@agent-backend-dev "Implement endpoints"
# → SuperClaude's backend developer implements

# 4. wshobson validates patterns
/plugin:api-design "Review API design"
# → Validates against best practices
```

### Pattern 2: Parallel Usage

**Both systems work concurrently:**

```bash
# Single message with both systems
[Message 1]:
  /sc:analyze "current codebase structure"
  /plugin:security-engineer "security audit"
  /plugin:performance-testing "load testing"

# SuperClaude coordinates while wshobson provides expertise
[Message 2]:
  Task("SuperClaude coordinator", "Orchestrate refactoring", "sparc-coord")
  /plugin:backend-architect "Review architecture"
  /plugin:code-quality "Quality analysis"
```

### Pattern 3: Hybrid Workflow

**SPARC methodology + plugin expertise:**

```bash
# Phase 1: Specification (SuperClaude)
/sc:run spec-pseudocode "E-commerce checkout flow"

# Phase 2: Architecture (Both)
/sc:run architect "System design"
/plugin:frontend-architect "React architecture"
/plugin:backend-architect "API architecture"

# Phase 3: Refinement (SuperClaude TDD + wshobson patterns)
/sc:tdd "checkout feature"
/plugin:react-development "React patterns"
/plugin:test-automation "Test strategies"

# Phase 4: Implementation (Coordinated)
Task("SPARC coordinator", "Orchestrate implementation", "sparc-coord")
/plugin:frontend-development "Build UI"
/plugin:backend-development "Build API"
```

### Pattern 4: Skill-Based Selection

**Progressive disclosure with wshobson skills:**

```bash
# Start with minimal context
/plugin:python-development "basic script"
# → Loads 1 Python agent (~100 tokens)

# Need more expertise? Load skills progressively
/plugin:python-development "async patterns" --skill asyncio
# → Adds asyncio skill (~50 tokens)

/plugin:python-development "data processing" --skill pandas
# → Adds pandas skill (~50 tokens)

# SuperClaude coordinates the overall workflow
/sc:implement "data pipeline"
# → Orchestrates with python-development plugin
```

### Pattern 5: Domain-Specific Deep Dive

**When you need specialized expertise:**

```bash
# Kubernetes deployment (wshobson excels)
/plugin:kubernetes-operations "production deployment strategy"
# → 4 deployment skills: rolling, blue-green, canary, A/B

# SuperClaude coordinates rollout
/sc:task "Deploy with canary strategy"
# → Uses swarm coordination for staged rollout

# Monitor with both systems
/plugin:monitoring-observability "Setup monitoring"
/sc:monitor "Track deployment metrics"
```

---

## Integration Examples

### Example 1: Full-Stack Feature Development

```bash
# 1. SuperClaude creates plan
/sc:implement "User authentication system"
# → Spawns planner, creates epic, breaks down tasks

# 2. wshobson provides expertise
/plugin:backend-architect "Auth system architecture"
/plugin:frontend-architect "Auth UI patterns"
/plugin:security-engineer "Security requirements"

# 3. SuperClaude coordinates implementation
Task("Backend dev", "Implement auth API", "backend-dev")
Task("Frontend dev", "Implement auth UI", "coder")
Task("Security review", "Audit implementation", "reviewer")

# 4. wshobson validates
/plugin:security-testing "Penetration testing"
/plugin:code-quality "Quality review"

# 5. SuperClaude finalizes
/sc:test "auth system"
/sc:document "auth implementation"
```

### Example 2: Microservices Migration

```bash
# 1. Analysis (Both systems)
/sc:analyze "monolithic codebase"
/plugin:backend-architect "Microservices strategy"
/plugin:data-architect "Data migration plan"

# 2. Planning (SuperClaude orchestrates)
/sc:task "Create migration roadmap"
# → Uses migration-plan template

# 3. Implementation (Parallel with wshobson expertise)
Task("Service 1", "Extract user service", "backend-dev")
  → /plugin:microservices "Service boundaries"

Task("Service 2", "Extract order service", "backend-dev")
  → /plugin:api-design "Service contracts"

Task("Infrastructure", "Setup K8s cluster", "cicd-engineer")
  → /plugin:kubernetes-operations "Cluster configuration"

# 4. Testing (Both systems)
/sc:tdd "service integration tests"
/plugin:test-automation "E2E testing strategy"

# 5. Deployment (Coordinated)
/plugin:kubernetes-operations "Rolling deployment"
/sc:monitor "Track migration progress"
```

### Example 3: Performance Optimization

```bash
# 1. Benchmarking (SuperClaude)
/sc:benchmark "current performance"
# → Uses consensus/performance-benchmarker

# 2. Analysis (Both systems)
/plugin:performance-testing "Load testing analysis"
/plugin:backend-architect "Bottleneck identification"
/sc:analyze "performance metrics"

# 3. Optimization (Parallel)
Task("Database opt", "Optimize queries", "code-analyzer")
  → /plugin:database-development "Query optimization"

Task("Frontend opt", "Bundle optimization", "coder")
  → /plugin:frontend-architect "Performance patterns"

Task("Caching", "Implement caching", "backend-dev")
  → /plugin:backend-architect "Caching strategies"

# 4. Validation (Both)
/plugin:performance-testing "Re-test performance"
/sc:validate "performance improvements"
```

---

## Quick Reference

### Command Cheat Sheet

```bash
# SuperClaude Commands
/sc:implement <task>         # Full SPARC implementation
/sc:analyze <target>         # Code analysis
/sc:test <component>         # TDD workflow
/sc:sparc run <mode> <task>  # Specific SPARC phase
/sc:task <description>       # Task orchestration
/sc:research <topic>         # Deep research

# wshobson Plugin Commands
/plugin:<name> <task>        # Invoke specific plugin
@agent-<name> <task>         # Direct agent invocation

# Common Plugins
/plugin:backend-architect
/plugin:frontend-developer
/plugin:kubernetes-operations
/plugin:security-engineer
/plugin:python-development
/plugin:react-development
/plugin:test-automation
/plugin:api-design
```

### Agent Selection Guide

| Need | Use SuperClaude | Use wshobson |
|------|-----------------|--------------|
| **Workflow orchestration** | ✅ `/sc:implement` | ❌ |
| **SPARC methodology** | ✅ `/sc:sparc run` | ❌ |
| **GitHub automation** | ✅ `github/*` agents | ❌ |
| **Swarm coordination** | ✅ `swarm/*` agents | ❌ |
| **TDD workflows** | ✅ `/sc:tdd` | ❌ |
| **Framework expertise** | ❌ | ✅ `/plugin:react-development` |
| **Cloud platform patterns** | ❌ | ✅ `/plugin:cloud-infrastructure` |
| **Language specialists** | ❌ | ✅ `/plugin:python-development` |
| **Production patterns** | ❌ | ✅ `/plugin:backend-architect` |
| **Minimal token usage** | ❌ | ✅ Progressive skills |
| **Architecture patterns** | ⚠️ Limited | ✅ `/plugin:*-architect` |
| **Security expertise** | ⚠️ Basic | ✅ `/plugin:security-engineer` |

**Legend:**
- ✅ = Primary strength
- ❌ = Not available or limited
- ⚠️ = Available but limited compared to alternative

### Most Useful Plugins

**For backend development:**
1. `backend-architect` - Architecture and design patterns
2. `api-design` - REST/GraphQL/gRPC patterns
3. `microservices` - Microservice patterns
4. `database-development` - Database design

**For frontend development:**
1. `frontend-developer` - React 19, Next.js 15+
2. `react-development` - React patterns
3. `nextjs-development` - Next.js App Router
4. `ui-ux` - UI/UX patterns

**For infrastructure:**
1. `kubernetes-operations` - K8s deployment (4 skills)
2. `cloud-infrastructure` - AWS/Azure/GCP (4 skills)
3. `infrastructure-as-code` - Terraform, Pulumi
4. `docker-containerization` - Containers

**For quality:**
1. `test-automation` - Comprehensive testing
2. `security-testing` - Security scanning
3. `code-quality` - Static analysis
4. `performance-testing` - Load testing

---

## Integration Tips

### 1. Start with SuperClaude for Workflow

Use SuperClaude commands first to establish workflow and task structure:

```bash
/sc:implement "feature"
# → Creates plan, tasks, coordinates agents
```

Then bring in wshobson plugins for specialized expertise:

```bash
/plugin:backend-architect "architecture review"
/plugin:security-engineer "security analysis"
```

### 2. Use wshobson for Deep Expertise

When you need domain-specific knowledge:

```bash
# Instead of generic agent
@agent-coder "implement Kubernetes deployment"

# Use specialized plugin
/plugin:kubernetes-operations "production deployment with canary strategy"
# → Gets expert knowledge + 4 deployment skills
```

### 3. Combine for Best Results

**Workflow orchestration + domain expertise:**

```bash
# SuperClaude orchestrates
Task("Backend implementation", "Build API", "backend-dev")

# wshobson provides patterns within task
  /plugin:api-design "REST API best practices"
  /plugin:security-engineer "API security patterns"
```

### 4. Progressive Disclosure

Start minimal, add expertise as needed:

```bash
# Basic implementation
/plugin:python-development "script"

# Need async? Add skill
--skill asyncio

# Need data? Add skill
--skill pandas

# SuperClaude tracks progress
/sc:task "Monitor development progress"
```

### 5. Leverage Both Memory Systems

**SuperClaude cross-session memory:**
```bash
/sc:save "project state"
# → Session persistence via Serena MCP
```

**wshobson skill-based knowledge:**
```bash
/plugin:backend-architect "recall patterns"
# → Progressive skills load only what's needed
```

### 6. Avoid Redundancy

Don't duplicate work between systems:

```bash
# ❌ Bad - Redundant
/sc:analyze "code"
/plugin:code-quality "analyze code"

# ✅ Good - Complementary
/sc:analyze "architecture"          # Structural analysis
/plugin:code-quality "metrics"      # Quality metrics
```

### 7. Use Correct Context

Match system to task context:

```bash
# ❌ Bad - Wrong context
/plugin:sparc-coordinator "SPARC workflow"
# wshobson doesn't have SPARC

# ✅ Good - Correct context
/sc:sparc run architect "system design"
# SuperClaude handles SPARC natively
```

### 8. Token Efficiency

When token usage matters:

```bash
# High token usage
/sc:implement "feature"
# → Loads full SPARC workflow

# Low token usage
/plugin:backend-architect "pattern only"
# → Minimal context, specific expertise
```

### 9. Parallel Execution

Both systems support concurrency:

```bash
[Single Message]:
  # SuperClaude coordinates
  Task("Coord", "Orchestrate", "sparc-coord")

  # wshobson experts work in parallel
  /plugin:frontend-developer "UI"
  /plugin:backend-architect "API"
  /plugin:database-development "Schema"

  # All execute concurrently
```

### 10. Validation Chain

Create validation workflows:

```bash
# Implementation
/sc:implement "feature"

# Validation (parallel)
/plugin:security-testing "security check"
/plugin:performance-testing "load test"
/plugin:code-quality "quality metrics"

# SuperClaude synthesizes results
/sc:validate "all checks passed"
```

---

## Best Practices

### Do's ✅

1. **Use SuperClaude for orchestration**
   - Task coordination, swarm management, SPARC workflows

2. **Use wshobson for specialization**
   - Framework expertise, production patterns, specific skills

3. **Combine both for complex projects**
   - SuperClaude coordinates, wshobson provides expertise

4. **Start minimal with wshobson**
   - Use progressive disclosure, load skills as needed

5. **Leverage both memory systems**
   - SuperClaude: cross-session persistence
   - wshobson: skill-based knowledge

6. **Use parallel execution**
   - Both systems support concurrent operations

7. **Match system to task**
   - Workflow → SuperClaude
   - Implementation → wshobson

### Don'ts ❌

1. **Don't duplicate work**
   - Check if one system already handles the task

2. **Don't use wrong context**
   - SPARC → SuperClaude only
   - Framework patterns → wshobson only

3. **Don't over-load context**
   - Use wshobson's progressive disclosure
   - Use SuperClaude's task delegation

4. **Don't ignore complementary strengths**
   - Both systems together > either alone

5. **Don't assume agent availability**
   - Check which system has the agent you need

6. **Don't mix namespaces carelessly**
   - `/sc:*` for SuperClaude
   - `/plugin:*` for wshobson

---

## Troubleshooting

### Issue: Agent Not Found

```bash
# Check which system has the agent
/sc:help agents              # SuperClaude agents
/plugin:help                 # wshobson plugins
```

### Issue: Namespace Conflict

```bash
# Use explicit namespace
/sc:implement "task"         # Explicitly SuperClaude
/plugin:backend-dev "task"   # Explicitly wshobson
```

### Issue: High Token Usage

```bash
# Use wshobson progressive disclosure
/plugin:python-development "minimal task"
# Add skills only when needed
--skill asyncio
```

### Issue: Both Systems Trying to Handle Same Task

```bash
# Prioritize based on task type:
# Workflow/orchestration → SuperClaude
# Implementation/patterns → wshobson

# Or use both explicitly:
/sc:task "Coordinate implementation"
  → /plugin:backend-architect "Provide patterns"
```

---

## Summary

This hybrid agent system provides:

- **130+ specialized agents** (78 SuperClaude + 85 wshobson - overlaps)
- **Clear namespace separation** (`/sc:` vs `/plugin:`)
- **Complementary strengths** (orchestration vs expertise)
- **Concurrent execution** (both systems work together)
- **Progressive disclosure** (minimal to comprehensive context)
- **Production-ready patterns** (wshobson marketplace)
- **Workflow automation** (SuperClaude SPARC + swarms)

**Key Principle:**
> SuperClaude orchestrates workflows and coordinates agents.
> wshobson provides deep domain expertise and production patterns.
> Together, they create a comprehensive development environment.

---

## Additional Resources

### SuperClaude Documentation
- `.claude/commands/pm/` - CCPM project management
- `.claude/rules/` - Integration rules
- `CLAUDE.md` - SuperClaude configuration

### wshobson Marketplace
- GitHub: https://github.com/wshobson/agents
- 63 plugins across 23 categories
- 85 agents with 47 specialized skills
- Progressive disclosure for token efficiency

### Installation

**SuperClaude** (already installed):
- Project-local in `.claude/` directory
- Commands available via `/sc:*` namespace

**wshobson Marketplace** (optional):
```bash
# Install wshobson CLI
npm install -g wshobson

# Install plugins as needed
wshobson install backend-architect
wshobson install frontend-developer
wshobson install kubernetes-operations

# Or install category
wshobson install category:architecture
wshobson install category:backend
```

---

## Conclusion

This hybrid system combines the orchestration power of SuperClaude with the specialized expertise of wshobson's marketplace, creating a comprehensive development environment that scales from simple tasks to enterprise-level complexity.

**Use both systems together for maximum effectiveness.**
