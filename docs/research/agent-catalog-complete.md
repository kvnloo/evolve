# Complete Agent Definition Catalog

**Total Agents Analyzed**: 78 agent files across 20 categories

---

## 1. CORE AGENTS (5 agents)

### coder
- **Type**: developer
- **Description**: Implementation specialist for writing clean, efficient code
- **Capabilities**: code_generation, refactoring, optimization, api_design, error_handling
- **Triggers**:
  - Implementation tasks
  - Code generation requests
  - Refactoring needs
- **Tools**: Read, Write, Edit, MultiEdit, Bash, Grep, Glob
- **Best For**: Feature implementation, API development, code optimization

### planner
- **Type**: coordinator
- **Description**: Strategic planning and task orchestration agent
- **Capabilities**: task_decomposition, dependency_analysis, resource_allocation, timeline_estimation, risk_assessment
- **Triggers**:
  - Complex multi-step tasks
  - Project planning requests
  - Task breakdown needs
- **Tools**: MCP task_orchestrate, memory_usage, swarm tools
- **Best For**: Project planning, task decomposition, resource allocation

### researcher
- **Type**: analyst
- **Description**: Deep research and information gathering specialist
- **Capabilities**: code_analysis, pattern_recognition, documentation_research, dependency_tracking, knowledge_synthesis
- **Triggers**:
  - Research requests
  - Pattern analysis needs
  - Dependency investigation
- **Tools**: Grep, Glob, Read, memory tools
- **Best For**: Codebase analysis, pattern discovery, dependency mapping

### reviewer
- **Type**: validator
- **Description**: Code review and quality assurance specialist
- **Capabilities**: code_review, security_audit, performance_analysis, best_practices, documentation_review
- **Triggers**:
  - Code review requests
  - Quality assurance needs
  - Security audits
- **Tools**: Read, Grep, github_repo_analyze
- **Best For**: Code reviews, security audits, quality validation

### tester
- **Type**: validator
- **Description**: Comprehensive testing and quality assurance specialist
- **Capabilities**: unit_testing, integration_testing, e2e_testing, performance_testing, security_testing
- **Triggers**:
  - Testing requests
  - Test implementation needs
  - Quality validation
- **Tools**: Bash (test runners), Read, Write (test files)
- **Best For**: Test implementation, quality assurance, validation

---

## 2. ANALYSIS AGENTS (2 agents)

### code-analyzer (analyst)
- **Type**: code-analyzer
- **Description**: Advanced code quality analysis agent for comprehensive code reviews
- **Capabilities**: code_quality_assessment, performance_bottleneck_detection, security_vulnerability_scanning, architectural_pattern_analysis, dependency_analysis, code_complexity_evaluation, technical_debt_identification, best_practices_validation, code_smell_detection, refactoring_suggestions
- **Triggers**:
  - Code analysis keywords
  - Quality assessment requests
  - Architecture reviews
- **Best For**: Comprehensive code analysis, quality metrics, architectural review

### analyze-code-quality
- **Type**: analysis
- **Description**: Specialized code quality analyzer
- **Triggers**: Quality analysis requests
- **Best For**: Detailed quality assessment, metrics collection

---

## 3. ARCHITECTURE AGENTS (1 agent)

### system-architect
- **Type**: architecture
- **Description**: System design and architecture specialist
- **Triggers**:
  - Architecture keywords
  - System design requests
  - Scalability discussions
- **Best For**: System architecture, design patterns, scalability planning

---

## 4. SPARC METHODOLOGY AGENTS (4 agents)

### specification
- **Type**: analyst
- **Description**: SPARC Specification phase specialist for requirements analysis
- **Capabilities**: requirements_gathering, constraint_analysis, acceptance_criteria, scope_definition, stakeholder_analysis
- **SPARC Phase**: specification
- **Triggers**: Requirements analysis, specification needs
- **Best For**: Requirements gathering, acceptance criteria, scope definition

### pseudocode
- **Type**: architect
- **Description**: SPARC Pseudocode phase specialist for algorithm design
- **SPARC Phase**: pseudocode
- **Triggers**: Algorithm design, pseudocode requests
- **Best For**: Algorithm design, implementation planning

### architecture (SPARC)
- **Type**: architect
- **Description**: SPARC Architecture phase specialist for system design
- **SPARC Phase**: architecture
- **Triggers**: System design in SPARC context
- **Best For**: System architecture design, component planning

### refinement
- **Type**: developer
- **Description**: SPARC Refinement phase specialist for iterative improvement
- **SPARC Phase**: refinement
- **Triggers**: Refinement, optimization, improvement requests
- **Best For**: Iterative improvement, optimization, polishing

---

## 5. DEVELOPMENT AGENTS (2 agents)

### backend-dev
- **Type**: development
- **Description**: Specialized agent for backend API development (REST/GraphQL)
- **Capabilities**: api_design, authentication, database_queries, API_documentation, error_handling, rate_limiting
- **Triggers**:
  - Keywords: api, endpoint, rest, graphql, backend, server
  - File patterns: `**/api/**/*.js`, `**/routes/**/*.js`, `**/controllers/**/*.js`, `*.resolver.js`
  - Task patterns: "create * endpoint", "implement * api", "add * route"
- **Best For**: Backend API implementation, REST/GraphQL endpoints, server development

### mobile-dev (React Native)
- **Type**: specialized
- **Description**: Expert React Native mobile app development (iOS/Android)
- **Capabilities**: react_native_components, navigation, native_modules, cross_platform, mobile_UI_UX
- **Triggers**:
  - Keywords: react native, mobile app, ios app, android app, expo, native module
  - File patterns: `**/*.jsx`, `**/*.tsx`, `**/App.js`, `**/ios/**/*.m`, `**/android/**/*.java`
- **Best For**: Mobile app development, cross-platform development, React Native

---

## 6. SPECIALIZED AGENTS (3 agents)

### cicd-engineer
- **Type**: devops
- **Description**: CI/CD pipeline specialist
- **Triggers**: CI/CD, deployment, pipeline keywords
- **Best For**: CI/CD automation, deployment pipelines

### api-docs
- **Type**: documentation
- **Description**: API documentation specialist (OpenAPI/Swagger)
- **Triggers**: API documentation requests
- **Best For**: OpenAPI spec generation, API documentation

### ml-developer
- **Type**: data
- **Description**: Machine learning development specialist
- **Triggers**: ML, machine learning, model training keywords
- **Best For**: ML model development, data science tasks

---

## 7. GITHUB INTEGRATION AGENTS (13 agents)

### github-modes
- **Type**: development
- **Description**: Comprehensive GitHub integration modes for workflow orchestration
- **Triggers**: GitHub workflow requests, repository management
- **Best For**: GitHub automation, workflow orchestration

### pr-manager
- **Type**: development
- **Description**: Comprehensive pull request management with swarm coordination
- **Capabilities**: multi_reviewer_coordination, automated_conflict_resolution, comprehensive_testing, progress_tracking, branch_management
- **Tools**: gh CLI, mcp github tools, swarm coordination
- **Best For**: PR lifecycle management, automated reviews, merge coordination

### issue-tracker
- **Type**: development
- **Description**: Intelligent issue management and project coordination
- **Triggers**: Issue management, project tracking
- **Best For**: Issue tracking, project coordination, progress monitoring

### code-review-swarm
- **Type**: development
- **Description**: Deploy specialized AI agents for comprehensive code reviews
- **Triggers**: Code review requests, PR reviews
- **Best For**: Intelligent code review, multi-agent analysis

### release-manager
- **Type**: development
- **Description**: Automated release coordination and deployment
- **Triggers**: Release, deployment, version management
- **Best For**: Release orchestration, version management, deployment

### release-swarm
- **Type**: coordination
- **Description**: Orchestrate complex software releases using AI swarms
- **Triggers**: Release orchestration requests
- **Best For**: Multi-platform releases, changelog generation

### repo-architect
- **Type**: architecture
- **Description**: Repository structure optimization and multi-repo management
- **Triggers**: Repository architecture, multi-repo coordination
- **Best For**: Repository structure, multi-repo management

### workflow-automation
- **Type**: automation
- **Description**: GitHub Actions workflow automation with adaptive CI/CD
- **Triggers**: Workflow automation, CI/CD setup
- **Best For**: GitHub Actions automation, intelligent pipelines

### sync-coordinator
- **Type**: coordination
- **Description**: Multi-repository synchronization coordinator
- **Triggers**: Multi-repo sync, version alignment
- **Best For**: Cross-repo synchronization, dependency management

### project-board-sync
- **Type**: coordination
- **Description**: Synchronize AI swarms with GitHub Projects
- **Triggers**: Project board, visual task management
- **Best For**: GitHub Projects integration, task visualization

### swarm-issue
- **Type**: coordination
- **Description**: GitHub issue-based swarm coordination
- **Triggers**: Issue-based task distribution
- **Best For**: Issue-driven development, automated task decomposition

### swarm-pr
- **Type**: development
- **Description**: Pull request swarm management
- **Triggers**: PR-based workflows, multi-agent reviews
- **Best For**: Automated PR workflows, collaborative reviews

### multi-repo-swarm
- **Type**: coordination
- **Description**: Cross-repository swarm orchestration
- **Triggers**: Organization-wide automation
- **Best For**: Multi-repo coordination, org-wide tasks

---

## 8. SWARM COORDINATION AGENTS (3 agents)

### hierarchical-coordinator
- **Type**: coordinator
- **Description**: Queen-led hierarchical swarm with specialized worker delegation
- **Capabilities**: swarm_coordination, task_decomposition, agent_supervision, work_delegation, performance_monitoring, conflict_resolution
- **Architecture**: Queen → Research/Code/Analyst/Test Workers
- **Best For**: Complex projects needing centralized coordination, large-scale orchestration

### mesh-coordinator
- **Type**: coordinator
- **Description**: Peer-to-peer mesh network swarm with distributed decision making
- **Best For**: Fault-tolerant operations, peer-to-peer coordination

### adaptive-coordinator
- **Type**: coordinator
- **Description**: Dynamic topology switching with self-organizing patterns
- **Best For**: Variable workloads, dynamic optimization

---

## 9. CONSENSUS & DISTRIBUTED SYSTEMS AGENTS (7 agents)

### byzantine-coordinator
- **Type**: coordinator
- **Description**: Byzantine fault-tolerant consensus with malicious actor detection
- **Capabilities**: pbft_consensus, malicious_detection, message_authentication, view_management, attack_mitigation
- **Best For**: High-security consensus, malicious actor protection

### raft-manager
- **Type**: coordinator
- **Description**: Raft consensus algorithm with leader election
- **Best For**: Strong consistency, leader-based consensus

### gossip-coordinator
- **Type**: coordinator
- **Description**: Gossip-based consensus for scalable systems
- **Best For**: Eventual consistency, scalable systems

### crdt-synchronizer
- **Type**: synchronizer
- **Description**: Conflict-free Replicated Data Types synchronization
- **Best For**: Offline-first systems, conflict-free merging

### quorum-manager
- **Type**: coordinator
- **Description**: Dynamic quorum adjustment and membership management
- **Best For**: Flexible quorum systems, dynamic membership

### security-manager
- **Type**: security
- **Description**: Comprehensive security for distributed consensus
- **Best For**: Cryptographic validation, security enforcement

### performance-benchmarker
- **Type**: analyst
- **Description**: Performance benchmarking for distributed protocols
- **Best For**: Consensus performance analysis, optimization

---

## 10. HIVE MIND AGENTS (5 agents)

### queen-coordinator
- **Description**: Sovereign orchestrator of hierarchical hive operations
- **Best For**: Strategic decisions, resource allocation, centralized-decentralized hybrid control

### scout-explorer
- **Description**: Information reconnaissance specialist
- **Best For**: Exploration, intelligence gathering, reporting

### worker-specialist
- **Description**: Dedicated task execution specialist
- **Best For**: Precise task execution, continuous progress reporting

### swarm-memory-manager
- **Description**: Distributed memory management across hive mind
- **Best For**: Data consistency, memory persistence, caching

### collective-intelligence-coordinator
- **Description**: Orchestrates distributed cognitive processes
- **Best For**: Collective decision-making, consensus protocols

---

## 11. OPTIMIZATION AGENTS (5 agents)

### performance-monitor
- **Type**: agent
- **Description**: Real-time metrics collection, bottleneck analysis, SLA monitoring
- **Best For**: Performance monitoring, anomaly detection

### benchmark-suite
- **Type**: agent
- **Description**: Comprehensive performance benchmarking, regression detection
- **Best For**: Performance validation, regression testing

### load-balancer
- **Type**: agent
- **Description**: Dynamic task distribution, work-stealing algorithms
- **Best For**: Load balancing, adaptive distribution

### resource-allocator
- **Type**: agent
- **Description**: Adaptive resource allocation, predictive scaling
- **Best For**: Resource optimization, capacity planning

### topology-optimizer
- **Type**: agent
- **Description**: Dynamic swarm topology reconfiguration
- **Best For**: Communication optimization, topology adaptation

---

## 12. TEMPLATE AGENTS (8 agents)

### task-orchestrator
- **Type**: orchestration
- **Description**: Central coordination for task decomposition and execution planning
- **Capabilities**: task_decomposition, execution_planning, dependency_management, result_aggregation, progress_tracking
- **Best For**: Complex task coordination, multi-agent orchestration

### sparc-coordinator
- **Type**: coordination
- **Description**: SPARC methodology orchestrator
- **Best For**: SPARC phase coordination, systematic development

### sparc-coder
- **Type**: development
- **Description**: Transform specifications into working code with TDD
- **Best For**: Spec-to-code implementation, TDD practices

### perf-analyzer
- **Type**: analysis
- **Description**: Performance bottleneck analyzer
- **Best For**: Performance analysis, efficiency optimization

### smart-agent
- **Type**: automation
- **Description**: Intelligent agent coordination and dynamic spawning
- **Best For**: Agent automation, dynamic coordination

### swarm-init
- **Type**: coordination
- **Description**: Swarm initialization and topology optimization
- **Best For**: Swarm setup, topology selection

### memory-coordinator
- **Type**: coordination
- **Description**: Persistent memory management across sessions
- **Best For**: Cross-agent memory sharing, session persistence

### migration-planner
- **Type**: planning
- **Description**: Comprehensive migration planning
- **Best For**: System migrations, conversion planning

---

## 13. TESTING AGENTS (2 agents)

### tdd-london-swarm
- **Type**: tester
- **Description**: TDD London School specialist for mock-driven development
- **Best For**: TDD practices, mock-driven testing, swarm coordination

### production-validator
- **Type**: validator
- **Description**: Production validation ensuring deployment-readiness
- **Best For**: Production validation, deployment checks

---

## 14. REASONING & PLANNING AGENTS (4 agents)

### goal-planner
- **Description**: Goal-Oriented Action Planning (GOAP) specialist
- **Capabilities**: Dynamic planning, adaptive replanning, multi-step reasoning, state space navigation
- **Triggers**: Complex workflows, high-level goals, multi-step planning
- **Best For**: Complex goal achievement, adaptive planning, optimal pathfinding

### code-goal-planner
- **Description**: Code-centric Goal-Oriented Action Planning specialist
- **Triggers**: Software development objectives, feature implementation, performance optimization
- **Best For**: Development planning, feature breakdown, implementation milestones

### sublinear-goal-planner
- **Description**: GOAP specialist with ReasoningBank integration
- **Best For**: Advanced goal planning with reasoning capabilities

---

## 15. NEURAL & AI AGENTS (1 agent)

### safla-neural
- **Description**: Self-Aware Feedback Loop Algorithm (SAFLA) neural specialist
- **Capabilities**: Distributed neural training, persistent memory patterns, self-learning, autonomous improvement
- **Best For**: Self-aware AI systems, memory-persistent learning, feedback loop optimization

---

## 16. FLOW-NEXUS CLOUD AGENTS (9 agents)

### flow-nexus-swarm
- **Description**: AI swarm orchestration in Flow Nexus cloud platform
- **Best For**: Cloud-based swarm deployment, complex task execution

### flow-nexus-sandbox
- **Description**: E2B sandbox deployment and management
- **Best For**: Isolated execution environments, code testing

### flow-nexus-neural
- **Description**: Neural network training and deployment in cloud
- **Best For**: Distributed neural training, model lifecycle management

### flow-nexus-workflow
- **Description**: Event-driven workflow automation
- **Best For**: Automated workflows, message queue processing

### flow-nexus-auth
- **Description**: Flow Nexus authentication and user management
- **Best For**: Login, registration, session management

### flow-nexus-user-tools
- **Description**: User management and system utilities
- **Best For**: Profile management, storage, real-time subscriptions

### flow-nexus-app-store
- **Description**: Application marketplace and template management
- **Best For**: App publishing, discovery, deployment

### flow-nexus-challenges
- **Description**: Coding challenges and gamification
- **Best For**: Challenge creation, leaderboards, achievements

### flow-nexus-payments
- **Description**: Credit management and billing
- **Best For**: Payment processing, tier management

---

## 17. UTILITY AGENT (1 agent)

### base-template-generator
- **Description**: Foundation templates and boilerplate code generator
- **Triggers**: New project setup, component scaffolding, starter configurations
- **Best For**: Template generation, boilerplate creation, project initialization

---

## AUTO-SELECTION MAPPING

### By Task Type

**Implementation Tasks** → coder, sparc-coder, backend-dev, mobile-dev

**Planning & Strategy** → planner, goal-planner, code-goal-planner, migration-planner

**Research & Analysis** → researcher, code-analyzer, analyze-code-quality

**Code Review** → reviewer, code-review-swarm

**Testing** → tester, tdd-london-swarm, production-validator

**Architecture** → system-architect, architecture (SPARC), repo-architect

**GitHub Operations** → github-modes, pr-manager, issue-tracker, release-manager

**Swarm Coordination** → hierarchical-coordinator, mesh-coordinator, adaptive-coordinator, task-orchestrator

**SPARC Phases** → specification, pseudocode, architecture, refinement

**Performance** → perf-analyzer, performance-monitor, benchmark-suite, performance-benchmarker

**Security** → security-manager, reviewer (security audit)

**Distributed Systems** → byzantine-coordinator, raft-manager, gossip-coordinator, crdt-synchronizer

**DevOps** → cicd-engineer, workflow-automation

**Documentation** → api-docs

### By File Type

**.js, .ts** → coder, backend-dev, code-analyzer

**.jsx, .tsx** → mobile-dev, coder

**.test.js, .spec.ts** → tester, tdd-london-swarm

**API files** → backend-dev, api-docs

**Config files** → cicd-engineer, system-architect

**.md** → api-docs, base-template-generator

### By Keywords

**"swarm", "coordinate", "orchestrate"** → hierarchical-coordinator, mesh-coordinator, task-orchestrator

**"consensus", "distributed"** → byzantine-coordinator, raft-manager, gossip-coordinator

**"github", "pr", "issue"** → github-modes, pr-manager, issue-tracker

**"test", "testing"** → tester, tdd-london-swarm

**"plan", "planning", "goal"** → planner, goal-planner, code-goal-planner

**"review", "audit"** → reviewer, code-review-swarm

**"architecture", "design"** → system-architect, architecture

**"performance", "optimize"** → perf-analyzer, performance-monitor

**"neural", "ml", "ai"** → safla-neural, ml-developer, flow-nexus-neural

**"mobile", "react native"** → mobile-dev

**"api", "backend", "endpoint"** → backend-dev

**"release", "deploy"** → release-manager, release-swarm

---

## AGENT OVERLAP ANALYSIS

### High Overlap (Consider Consolidation)

1. **Code Analysis**
   - code-analyzer (analyst)
   - analyze-code-quality
   - **Recommendation**: Use code-analyzer as primary, analyze-code-quality for specific quality metrics

2. **Goal Planning**
   - goal-planner
   - code-goal-planner
   - sublinear-goal-planner
   - **Recommendation**: Use code-goal-planner for development tasks, goal-planner for general planning

3. **Swarm Coordination**
   - hierarchical-coordinator
   - mesh-coordinator
   - adaptive-coordinator
   - task-orchestrator
   - **Recommendation**: Auto-select based on task complexity and coordination needs

4. **Release Management**
   - release-manager
   - release-swarm
   - **Recommendation**: Use release-manager for single-repo, release-swarm for complex multi-component releases

### Complementary Agents (Work Well Together)

1. **SPARC Pipeline**
   - specification → pseudocode → architecture → refinement
   - Coordinate with: coder, tester, reviewer

2. **GitHub Workflow**
   - issue-tracker → planner → coder → tester → reviewer → pr-manager → release-manager

3. **Performance Optimization**
   - perf-analyzer → performance-monitor → resource-allocator → topology-optimizer

4. **Distributed Systems**
   - Any consensus agent + security-manager + performance-benchmarker

---

## MISSING AGENT TYPES (Gaps Identified)

1. **Security Specialist** - Dedicated security auditing beyond reviewer
2. **Database Specialist** - Database schema design and optimization
3. **Frontend Specialist** - Separate from mobile-dev, for web frontend
4. **Integration Specialist** - System integration and API orchestration
5. **Monitoring & Observability** - Production monitoring and alerting
6. **Data Migration Specialist** - Database and data migration
7. **Configuration Management** - Environment and config management
8. **Accessibility Specialist** - WCAG compliance and accessibility

---

## COMPLEXITY LEVELS

### Simple (Single File, <100 lines)
- base-template-generator
- code-analyzer
- reviewer (single file)

### Moderate (Multiple Files, <1000 lines)
- coder
- tester
- backend-dev
- mobile-dev
- api-docs

### Complex (Multiple Components, System-wide)
- system-architect
- planner
- hierarchical-coordinator
- task-orchestrator
- SPARC agents (full pipeline)

### Enterprise (Multi-System, Organization-wide)
- multi-repo-swarm
- repo-architect
- release-swarm
- workflow-automation
- Consensus agents

---

## RECOMMENDED AUTO-SELECTION RULES

### Priority 1: Exact Match
If user request contains exact agent name → Use that agent directly

### Priority 2: Keyword Match
If keywords match agent triggers → Use highest priority matching agent

### Priority 3: File Type Match
If working with specific file types → Use file-pattern matching agent

### Priority 4: Complexity-Based
- Simple task → Single specialized agent
- Moderate task → 2-3 coordinated agents
- Complex task → Swarm coordinator + specialized agents
- Enterprise task → Multi-level swarm hierarchy

### Priority 5: Context-Aware
- GitHub context → GitHub agents
- SPARC context → SPARC agents
- Testing context → Testing agents
- Cloud context → Flow-Nexus agents

---

## AGENT ACTIVATION DECISION TREE

```
User Request
    │
    ├─ Contains "swarm" or "coordinate"?
    │   └─ YES → hierarchical-coordinator or task-orchestrator
    │
    ├─ GitHub-related?
    │   └─ YES → github-modes → Specific GitHub agent
    │
    ├─ SPARC phase mentioned?
    │   └─ YES → Corresponding SPARC agent
    │
    ├─ Implementation task?
    │   ├─ Backend API → backend-dev
    │   ├─ Mobile → mobile-dev
    │   ├─ General → coder
    │   └─ ML/AI → ml-developer
    │
    ├─ Analysis task?
    │   ├─ Code quality → code-analyzer
    │   ├─ Performance → perf-analyzer
    │   ├─ Architecture → system-architect
    │   └─ Research → researcher
    │
    ├─ Testing task?
    │   ├─ TDD → tdd-london-swarm
    │   └─ General → tester
    │
    ├─ Planning task?
    │   ├─ Code-specific → code-goal-planner
    │   ├─ General goal → goal-planner
    │   └─ Project → planner
    │
    └─ Default → planner (to decompose and route)
```

---

**Summary**: The repository contains a comprehensive agent ecosystem spanning core development, specialized domains, cloud services, distributed systems, and workflow automation. The agents are well-organized by function and can be auto-selected based on task type, file patterns, keywords, and complexity levels.
