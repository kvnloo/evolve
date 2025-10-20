# Agent Organization Migration Analysis

**Analysis Date**: 2025-10-20
**Total Agents**: 78
**Current Structure**: Flat/partial hierarchy in `.claude/agents/`
**Target Structure**: Organized hierarchy in `src/agents/`

## Executive Summary

This analysis catalogs all 78 agent definition files currently in `.claude/agents/` and provides a comprehensive migration strategy to reorganize them into a structured, logical hierarchy under `src/agents/`.

### Key Findings

- **5 Core Agents**: Essential base development agents (coder, planner, researcher, reviewer, tester)
- **43 Specialized Agents**: Domain-specific agents for specific technologies/domains
- **20 Coordination Agents**: Swarm orchestration, consensus, and performance management
- **10 Meta Agents**: SPARC methodology, planning, reasoning, and templates

### Migration Benefits

1. **Clear Hierarchy**: Logical organization by capability and domain
2. **Improved Discoverability**: Easy to find relevant agents by category
3. **Better Maintainability**: Related agents grouped together
4. **Dependency Clarity**: Clear relationships between agents
5. **Scalability**: Room for growth within each category

## Proposed Directory Structure

```
src/agents/
├── definitions/
│   ├── core/                          # 5 agents - Base development capabilities
│   │   ├── coder.md
│   │   ├── planner.md
│   │   ├── researcher.md
│   │   ├── reviewer.md
│   │   └── tester.md
│   │
│   ├── specialized/                   # 43 agents - Domain expertise
│   │   ├── analysis/                  # 2 agents
│   │   │   ├── code-analyzer.md
│   │   │   └── code-quality-analyzer.md
│   │   ├── architecture/              # 1 agent
│   │   │   └── system-architect.md
│   │   ├── backend/                   # 1 agent
│   │   │   └── backend-api-developer.md
│   │   ├── devops/                    # 1 agent
│   │   │   └── cicd-engineer.md
│   │   ├── documentation/             # 1 agent
│   │   │   └── api-documentation-specialist.md
│   │   ├── ml/                        # 1 agent
│   │   │   └── ml-model-specialist.md
│   │   ├── mobile/                    # 1 agent
│   │   │   └── react-native-specialist.md
│   │   ├── neural/                    # 1 agent
│   │   │   └── safla-neural-specialist.md
│   │   ├── scaffolding/               # 1 agent
│   │   │   └── template-generator.md
│   │   └── testing/                   # 2 agents
│   │       ├── tdd-london-swarm.md
│   │       └── production-validator.md
│   │
│   ├── coordination/                  # 20 agents - Orchestration & coordination
│   │   ├── consensus/                 # 6 agents
│   │   │   ├── byzantine-coordinator.md
│   │   │   ├── crdt-synchronizer.md
│   │   │   ├── gossip-coordinator.md
│   │   │   ├── quorum-manager.md
│   │   │   └── raft-manager.md
│   │   ├── hive-mind/                 # 5 agents
│   │   │   ├── collective-intelligence-coordinator.md
│   │   │   ├── queen-coordinator.md
│   │   │   ├── scout-explorer.md
│   │   │   ├── swarm-memory-manager.md
│   │   │   └── worker-specialist.md
│   │   ├── performance/               # 6 agents
│   │   │   ├── benchmark-suite.md
│   │   │   ├── load-balancer.md
│   │   │   ├── performance-benchmarker.md
│   │   │   ├── performance-monitor.md
│   │   │   ├── resource-allocator.md
│   │   │   └── topology-optimizer.md
│   │   ├── security/                  # 1 agent
│   │   │   └── security-manager.md
│   │   └── swarm/                     # 3 agents
│   │       ├── adaptive-coordinator.md
│   │       ├── hierarchical-coordinator.md
│   │       └── mesh-coordinator.md
│   │
│   ├── github/                        # 13 agents - GitHub integration
│   │   ├── code-review-swarm.md
│   │   ├── github-modes.md
│   │   ├── issue-tracker.md
│   │   ├── multi-repo-swarm.md
│   │   ├── pr-manager.md
│   │   ├── project-board-sync.md
│   │   ├── release-manager.md
│   │   ├── release-swarm.md
│   │   ├── repo-architect.md
│   │   ├── swarm-issue.md
│   │   ├── swarm-pr.md
│   │   ├── sync-coordinator.md
│   │   └── workflow-automation.md
│   │
│   ├── platform/                      # 9 agents - Flow Nexus platform
│   │   └── flow-nexus/
│   │       ├── app-store-manager.md
│   │       ├── authentication-manager.md
│   │       ├── challenge-coordinator.md
│   │       ├── neural-network-specialist.md
│   │       ├── payment-coordinator.md
│   │       ├── sandbox-manager.md
│   │       ├── swarm-orchestrator.md
│   │       ├── user-tools-manager.md
│   │       └── workflow-coordinator.md
│   │
│   └── meta/                          # 10 agents - Meta-capabilities
│       ├── planning/                  # 3 agents
│       │   ├── code-goal-planner.md
│       │   ├── goal-planner.md
│       │   └── reasoning-goal-planner.md
│       ├── reasoning/                 # 3 agents
│       │   ├── README.md
│       │   ├── reasoning-agent.md
│       │   └── reasoning-template.md
│       ├── sparc/                     # 4 agents
│       │   ├── architecture-specialist.md
│       │   ├── pseudocode-specialist.md
│       │   ├── refinement-specialist.md
│       │   └── specification-specialist.md
│       └── templates/                 # 9 agents
│           ├── github-pr-template.md
│           ├── memory-coordinator-template.md
│           ├── migration-plan-template.md
│           ├── performance-analyzer-template.md
│           ├── smart-agent-template.md
│           ├── sparc-coordinator-template.md
│           ├── sparc-coder-template.md
│           ├── swarm-init-template.md
│           └── task-orchestrator-template.md
│
└── registry/
    └── agent-registry.json            # Centralized agent metadata
```

## Category Breakdown

### 1. Core Agents (5)
**Purpose**: Foundation development capabilities used across all projects

| Agent | Current Path | Priority | Key Dependencies |
|-------|--------------|----------|-----------------|
| coder | `.claude/agents/core/coder.md` | high | planner, researcher, tester |
| planner | `.claude/agents/core/planner.md` | high | researcher, coder |
| researcher | `.claude/agents/core/researcher.md` | high | planner |
| reviewer | `.claude/agents/core/reviewer.md` | high | coder, tester |
| tester | `.claude/agents/core/tester.md` | high | coder, reviewer |

**Characteristics**:
- Always available
- No domain specialization
- Form the base layer for all development
- Highest usage frequency

### 2. Specialized Agents (43)
**Purpose**: Domain-specific expertise for particular technologies or problem domains

#### Analysis (2)
- `code-analyzer`: Static analysis and complexity metrics
- `code-quality-analyzer`: Standards enforcement and quality gates

#### Architecture (1)
- `system-architect`: High-level system design and component definition

#### Backend (1)
- `backend-api-developer`: REST/GraphQL API development

#### DevOps (1)
- `cicd-engineer`: CI/CD pipeline engineering

#### Documentation (1)
- `api-documentation-specialist`: OpenAPI and API documentation

#### ML (1)
- `ml-model-specialist`: Machine learning model development

#### Mobile (1)
- `react-native-specialist`: React Native mobile development

#### Neural (1)
- `safla-neural-specialist`: SAFLA neural pattern implementation

#### Scaffolding (1)
- `template-generator`: Project scaffolding and templates

#### Testing (2)
- `tdd-london-swarm`: London-style TDD coordination
- `production-validator`: Production deployment validation

### 3. Coordination Agents (20)
**Purpose**: Swarm orchestration, consensus protocols, and performance management

#### Consensus (6)
Distributed consensus and coordination protocols:
- `byzantine-coordinator`: Byzantine fault tolerance
- `crdt-synchronizer`: Conflict-free replicated data types
- `gossip-coordinator`: Gossip protocol coordination
- `quorum-manager`: Quorum-based decision making
- `raft-manager`: Raft consensus algorithm

#### Hive Mind (5)
Collective intelligence and distributed cognition:
- `collective-intelligence-coordinator`: Central cognitive orchestration
- `queen-coordinator`: Hierarchical command coordination
- `scout-explorer`: Information gathering
- `swarm-memory-manager`: Distributed memory sync
- `worker-specialist`: Task execution

#### Performance (6)
Performance monitoring and optimization:
- `benchmark-suite`: Comprehensive benchmarking
- `load-balancer`: Dynamic load distribution
- `performance-benchmarker`: Performance metrics collection
- `performance-monitor`: Real-time monitoring
- `resource-allocator`: Resource allocation optimization
- `topology-optimizer`: Swarm topology optimization

#### Security (1)
- `security-manager`: Security policy enforcement

#### Swarm (3)
Core swarm topology coordinators:
- `adaptive-coordinator`: Dynamic topology switching (CRITICAL)
- `hierarchical-coordinator`: Tree-based coordination (CRITICAL)
- `mesh-coordinator`: Peer-to-peer coordination (CRITICAL)

### 4. GitHub Agents (13)
**Purpose**: GitHub platform integration and workflow automation

| Agent | Focus Area | Dependencies |
|-------|------------|--------------|
| `github-modes` | Orchestration hub | None (CRITICAL) |
| `pr-manager` | Pull request workflow | github-modes, reviewer |
| `issue-tracker` | Issue management | github-modes |
| `release-manager` | Release workflow | pr-manager |
| `repo-architect` | Repository structure | github-modes |
| `sync-coordinator` | Multi-package sync | github-modes |
| `workflow-automation` | GH Actions automation | github-modes, cicd-engineer |
| `code-review-swarm` | Swarm PR reviews | pr-manager, reviewer |
| `multi-repo-swarm` | Multi-repo coordination | repo-architect, sync-coordinator |
| `release-swarm` | Swarm release coordination | release-manager |
| `swarm-issue` | Swarm issue management | issue-tracker |
| `swarm-pr` | Swarm PR coordination | pr-manager |
| `project-board-sync` | Project board sync | issue-tracker |

### 5. Platform Agents (9)
**Purpose**: Flow Nexus cloud platform integration

All Flow Nexus agents for cloud orchestration:
- `app-store-manager`: App marketplace
- `authentication-manager`: User auth (foundation)
- `challenge-coordinator`: Coding challenges
- `neural-network-specialist`: Distributed ML training
- `payment-coordinator`: Credit management
- `sandbox-manager`: E2B sandbox orchestration
- `swarm-orchestrator`: Cloud swarm management
- `user-tools-manager`: User utilities
- `workflow-coordinator`: Event-driven workflows

### 6. Meta Agents (10)
**Purpose**: Methodology, planning, and agent templates

#### Planning (3)
- `code-goal-planner`: Code-focused planning
- `goal-planner`: General goal decomposition
- `reasoning-goal-planner`: Reasoning-based planning

#### Reasoning (3)
- `reasoning-agent`: General reasoning
- `reasoning-template`: Template for reasoning agents
- `README.md`: Documentation

#### SPARC (4)
SPARC methodology specialists:
- `architecture-specialist`: Architecture phase
- `pseudocode-specialist`: Pseudocode design
- `refinement-specialist`: TDD refinement
- `specification-specialist`: Requirements specification

#### Templates (9)
Agent templates and patterns:
- Various templates for common patterns

## Dependency Analysis

### Core Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                        CORE LAYER (5)                       │
├─────────────────────────────────────────────────────────────┤
│  researcher → planner → coder ⇄ tester                      │
│                           ↓                                 │
│                        reviewer                             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   SPECIALIZED LAYER (43)                    │
├─────────────────────────────────────────────────────────────┤
│  system-architect, backend-api-developer,                   │
│  cicd-engineer, api-documentation-specialist, etc.          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  COORDINATION LAYER (20)                    │
├─────────────────────────────────────────────────────────────┤
│  Consensus: byzantine, raft, gossip, quorum, crdt          │
│  Swarm: adaptive, hierarchical, mesh                        │
│  Hive Mind: collective-intelligence, queen, workers         │
│  Performance: monitor, benchmarker, load-balancer           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   INTEGRATION LAYER (22)                    │
├─────────────────────────────────────────────────────────────┤
│  GitHub (13): github-modes → pr/issue/release managers      │
│  Platform (9): flow-nexus services                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      META LAYER (10)                        │
├─────────────────────────────────────────────────────────────┤
│  SPARC: specification → pseudocode → architecture → refine  │
│  Planning: goal decomposition and reasoning                 │
│  Templates: Reusable agent patterns                         │
└─────────────────────────────────────────────────────────────┘
```

### Critical Path Agents

These agents are foundational and have many dependents:

1. **Core 5**: All specialized agents depend on these
2. **github-modes**: Hub for all GitHub operations
3. **adaptive-coordinator**: Critical for swarm optimization
4. **collective-intelligence-coordinator**: Central to hive mind
5. **swarm-memory-manager**: Essential for coordination

### Isolated Agents

These have minimal dependencies:
- `template-generator`
- `reasoning-template`
- Most template agents

## Migration Strategy

### Phase 1: Preparation (Week 1)
1. Create new directory structure in `src/agents/`
2. Create agent registry schema
3. Update build/test scripts for new paths
4. Create migration validation scripts

### Phase 2: Core Migration (Week 1)
1. Migrate 5 core agents first
2. Update internal cross-references
3. Test core agent functionality
4. Update documentation

### Phase 3: Category Migration (Weeks 2-3)
Migrate in dependency order:
1. **Week 2 Day 1-2**: Specialized agents (43)
2. **Week 2 Day 3-4**: Coordination agents (20)
3. **Week 2 Day 5**: GitHub agents (13)
4. **Week 3 Day 1**: Platform agents (9)
5. **Week 3 Day 2**: Meta agents (10)

### Phase 4: Registry & Validation (Week 3)
1. Generate agent registry
2. Validate all cross-references
3. Update CLI/tooling
4. Final integration tests

### Phase 5: Cleanup (Week 4)
1. Remove old `.claude/agents/` directory
2. Update all documentation
3. Archive migration artifacts
4. Create migration retrospective

## File Naming Conventions

### Current Issues
- Inconsistent prefixes (`spec-`, `dev-`, `ops-`, `docs-`)
- Nested directory names in filenames
- Redundant naming

### New Standard: kebab-case.md
- All lowercase
- Hyphen-separated words
- No prefixes (directory provides context)
- Descriptive and consistent

**Examples**:
- ❌ `spec-mobile-react-native.md` → ✅ `react-native-specialist.md`
- ❌ `dev-backend-api.md` → ✅ `backend-api-developer.md`
- ❌ `ops-cicd-github.md` → ✅ `cicd-engineer.md`
- ❌ `docs-api-openapi.md` → ✅ `api-documentation-specialist.md`

## Agent Registry Schema

```json
{
  "version": "1.0.0",
  "generated": "2025-10-20T00:00:00Z",
  "agents": {
    "coder": {
      "name": "coder",
      "path": "src/agents/definitions/core/coder.md",
      "type": "developer",
      "category": "core",
      "subcategory": "implementation",
      "priority": "high",
      "color": "#FF6B35",
      "capabilities": [
        "code_generation",
        "refactoring",
        "optimization",
        "api_design",
        "error_handling"
      ],
      "dependencies": [
        "planner",
        "researcher",
        "tester"
      ],
      "hooks": {
        "pre": true,
        "post": true
      },
      "mcp_tools": [
        "memory_usage",
        "benchmark_run"
      ]
    }
  },
  "categories": {
    "core": {
      "count": 5,
      "agents": ["coder", "planner", "researcher", "reviewer", "tester"]
    },
    "specialized": {
      "count": 43,
      "subcategories": {
        "analysis": 2,
        "architecture": 1,
        "backend": 1,
        "devops": 1,
        "documentation": 1,
        "ml": 1,
        "mobile": 1,
        "neural": 1,
        "scaffolding": 1,
        "testing": 2
      }
    },
    "coordination": {
      "count": 20,
      "subcategories": {
        "consensus": 6,
        "hive-mind": 5,
        "performance": 6,
        "security": 1,
        "swarm": 3
      }
    },
    "github": {
      "count": 13
    },
    "platform": {
      "count": 9,
      "subcategories": {
        "flow-nexus": 9
      }
    },
    "meta": {
      "count": 10,
      "subcategories": {
        "planning": 3,
        "reasoning": 3,
        "sparc": 4,
        "templates": 9
      }
    }
  },
  "statistics": {
    "total_agents": 78,
    "critical_priority": 12,
    "high_priority": 31,
    "medium_priority": 27,
    "low_priority": 8
  }
}
```

## Migration Validation Checklist

### Pre-Migration
- [ ] Backup current `.claude/agents/` directory
- [ ] Document all current agent cross-references
- [ ] Create new directory structure
- [ ] Update build scripts for new paths

### During Migration (per category)
- [ ] Copy files to new structure
- [ ] Rename files to kebab-case
- [ ] Update internal cross-references
- [ ] Update frontmatter metadata
- [ ] Test agent loading

### Post-Migration
- [ ] All 78 agents migrated
- [ ] Registry generated and validated
- [ ] All cross-references updated
- [ ] CLI tooling updated
- [ ] Documentation updated
- [ ] Integration tests pass
- [ ] Old directory removed

## Risk Assessment

### Low Risk
- Core agents (well-tested, stable)
- Template agents (minimal dependencies)
- Isolated specialized agents

### Medium Risk
- Coordination agents (complex dependencies)
- GitHub agents (external integration)
- Platform agents (external dependencies)

### High Risk
- Swarm coordinators (critical infrastructure)
- Hive mind coordinators (complex interdependencies)
- Memory managers (state management)

### Mitigation Strategies
1. Migrate in dependency order
2. Test each category independently
3. Maintain rollback capability
4. Comprehensive integration testing
5. Staged deployment

## Success Metrics

### Quantitative
- 100% of agents migrated
- 100% of cross-references updated
- 0% broken dependencies
- <5% path update commits after migration
- <1 day to complete full migration

### Qualitative
- Improved developer experience finding agents
- Clearer agent relationships
- Easier onboarding for new contributors
- Better maintainability
- Logical, intuitive organization

## Next Steps

1. **Review**: Stakeholder review of proposed structure
2. **Approve**: Get approval for migration plan
3. **Prepare**: Create scripts and tooling
4. **Execute**: Run migration in phases
5. **Validate**: Comprehensive testing
6. **Document**: Update all documentation
7. **Monitor**: Watch for issues post-migration

## Appendix A: Full Agent List (Alphabetical)

1. adaptive-coordinator
2. api-documentation-specialist
3. app-store-manager
4. architecture-specialist
5. authentication-manager
6. backend-api-developer
7. benchmark-suite
8. byzantine-coordinator
9. challenge-coordinator
10. cicd-engineer
11. code-analyzer
12. code-goal-planner
13. code-quality-analyzer
14. code-review-swarm
15. coder
16. collective-intelligence-coordinator
17. crdt-synchronizer
18. github-modes
19. github-pr-template
20. goal-planner
21. gossip-coordinator
22. hierarchical-coordinator
23. issue-tracker
24. load-balancer
25. memory-coordinator-template
26. mesh-coordinator
27. migration-plan-template
28. ml-model-specialist
29. multi-repo-swarm
30. neural-network-specialist
31. payment-coordinator
32. performance-analyzer-template
33. performance-benchmarker
34. performance-monitor
35. planner
36. pr-manager
37. production-validator
38. project-board-sync
39. pseudocode-specialist
40. queen-coordinator
41. quorum-manager
42. raft-manager
43. react-native-specialist
44. reasoning-agent
45. reasoning-goal-planner
46. reasoning-template
47. refinement-specialist
48. release-manager
49. release-swarm
50. repo-architect
51. researcher
52. resource-allocator
53. reviewer
54. safla-neural-specialist
55. sandbox-manager
56. scout-explorer
57. security-manager
58. smart-agent-template
59. sparc-coordinator-template
60. sparc-coder-template
61. specification-specialist
62. swarm-init-template
63. swarm-issue
64. swarm-memory-manager
65. swarm-orchestrator
66. swarm-pr
67. sync-coordinator
68. system-architect
69. task-orchestrator-template
70. tdd-london-swarm
71. template-generator
72. tester
73. topology-optimizer
74. user-tools-manager
75. worker-specialist
76. workflow-automation
77. workflow-coordinator
78. (README.md - documentation)

## Appendix B: Dependency Matrix

See `agent-migration-map.csv` for detailed dependency mappings.

---

**Document Version**: 1.0
**Last Updated**: 2025-10-20
**Author**: Code Quality Analyzer
**Status**: Ready for Review
