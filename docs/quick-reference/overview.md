# Evolve Project - Quick Reference Guide

**Last Updated**: 2025-10-19

---

## 🎯 Essential Commands

### SPARC Workflow
```bash
# List available modes
npx claude-flow sparc modes

# Run specific mode
npx claude-flow sparc run <mode> "<task>"

# Complete TDD workflow
npx claude-flow sparc tdd "<feature>"

# Parallel execution
npx claude-flow sparc batch architect,coder,tester "<task>"

# Full pipeline
npx claude-flow sparc pipeline "<task>"
```

### Build & Test
```bash
npm run build      # Build project
npm run test       # Run tests
npm run lint       # Linting
npm run typecheck  # Type checking
```

### MCP Setup
```bash
# Essential MCP server
claude mcp add claude-flow npx claude-flow@alpha mcp start

# Optional: Enhanced coordination
claude mcp add ruv-swarm npx ruv-swarm mcp start

# Optional: Cloud features
claude mcp add flow-nexus npx flow-nexus@latest mcp start
```

---

## 📊 Key Metrics

### Current Performance
- ✅ **84.8% SWE-Bench solve rate**
- ✅ **32.3% token reduction**
- ✅ **2.8-4.4x speed improvement**
- ✅ **27+ neural models**
- ✅ **54 specialized agents**

### Expected (Full Implementation)
- 🎯 **45-55% SWE-Bench Verified**
- 🎯 **70% token reduction** (SuperClaude)
- 🎯 **7-10x productivity** (Phase 4)
- 🎯 **75% bug reduction**
- 🎯 **96.5% skill retrieval** (Voyager)

---

## 🤖 Most-Used Agents

### Core Development
```bash
coder          # Implementation specialist
reviewer       # Code review and quality
tester         # Comprehensive testing
planner        # Strategic planning
researcher     # Deep research
```

### Specialized
```bash
backend-dev       # Backend API development
system-architect  # System architecture design
code-analyzer     # Code quality analysis
sparc-coord       # SPARC orchestrator
cicd-engineer     # CI/CD pipeline creation
```

### Coordination
```bash
task-orchestrator      # Central coordination
hierarchical-coordinator  # Queen-led hierarchy
mesh-coordinator       # Peer-to-peer mesh
adaptive-coordinator   # Dynamic topology
```

---

## 📁 Key Documentation

### Essential Reading
1. **[PROJECT-INDEX.md](PROJECT-INDEX.md)** - Complete project knowledge base
2. **[IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md)** - Implementation status
3. **[CLAUDE.md](../CLAUDE.md)** - Primary configuration
4. **[research_catalog.md](../research/docs/research_catalog.md)** - Research overview

### Implementation Guides
- **[implementation-roadmap-FINAL.md](../research/docs/implementation-roadmap-FINAL.md)** - 20-week timeline
- **[ENHANCED-CAPABILITIES.md](ENHANCED-CAPABILITIES.md)** - Feature guide
- **[SUPERCLAUDE-INSTALLATION.md](SUPERCLAUDE-INSTALLATION.md)** - Setup instructions

### Research Deep-Dives
- **Agricultural Automation**: [5-acre_farm_automation.md](../research/5-acre_farm_automation.md)
- **Autonomous AI**: [claude_code_automation_guide.md](../research/claude_code_automation_guide.md)
- **3D Generation**: [mesh_generation_strategy_research.md](../research/mesh_generation_strategy_research.md)
- **Self-Improvement**: [claude_digital_twin_management.md](../research/claude_digital_twin_management.md)

---

## 🎓 SPARC Phases

1. **Specification** → Requirements analysis
2. **Pseudocode** → Algorithm design
3. **Architecture** → System design
4. **Refinement** → TDD implementation
5. **Completion** → Integration

---

## 🔐 Constitutional AI Principles (Immutable)

1. **Safety First** - Never compromise system security
2. **Data Integrity** - Protect data accuracy and consistency
3. **Human Oversight** - Critical operations require approval
4. **Transparency** - All actions auditable and explainable
5. **Bounded Autonomy** - Operate within defined limits
6. **Fail-Safe Operations** - Graceful degradation
7. **Privacy Protection** - Respect user data privacy
8. **Continuous Evaluation** - Ongoing safety assessment

---

## 💰 Cost Overview

### Monthly Operating Costs
- **Conservative**: $570/month
- **Aggressive**: $1,289/month
- **Full Stack**: $485-1,365/month

### One-Time Infrastructure
- **GPU (Optional)**: $1,600-2,000 (RTX 4090)
- **Workstation**: $0-2,000 (if needed)
- **Training**: $0-1,000 (team upskilling)

### ROI Expectations
- **Break-Even**: First month (professional use)
- **ROI**: 100-300% in first 3 months
- **Productivity**: 7-10x by Phase 4

---

## 🚀 Quick Start Checklist

### Week 1
- [ ] Install SuperClaude
- [ ] Configure MCP servers
- [ ] Set up Git worktrees
- [ ] Test multi-agent execution
- [ ] Review Constitutional AI principles

### Week 2
- [ ] Integrate Linear/GitHub MCPs
- [ ] Establish baseline metrics
- [ ] Create first PRD using BMAD
- [ ] Run parallel agent test (5 agents)

### Week 3-4
- [ ] Implement safety framework
- [ ] Set up audit logging
- [ ] Create security test suite
- [ ] Train team on workflows

### Month 2
- [ ] Deploy RAG knowledge base
- [ ] Run DSPy optimization
- [ ] Implement hierarchical knowledge
- [ ] Set up quality monitoring

---

## 🔍 Troubleshooting

### Agent Coordination Issues
```bash
# Check agent status
npx claude-flow@alpha hooks session-restore --session-id "swarm-[id]"

# View metrics
cat research/.claude-flow/metrics/agent-metrics.json

# Reset coordination
npx claude-flow@alpha hooks session-end --export-metrics true
```

### Performance Issues
```bash
# Check token usage
cat research/.claude-flow/metrics/performance.json

# Review system metrics
cat research/.claude-flow/metrics/system-metrics.json

# Analyze bottlenecks
npm run perf:analyze
```

### Memory Issues
```bash
# Check memory store
cat research/memory/memory-store.json

# Clear session cache
rm -rf research/memory/sessions/*

# Consolidate memory
npx claude-flow@alpha memory consolidate
```

---

## 📞 Support & Resources

### Documentation
- **Full Index**: [PROJECT-INDEX.md](PROJECT-INDEX.md)
- **Claude Flow**: https://github.com/ruvnet/claude-flow
- **Flow Nexus**: https://flow-nexus.ruv.io
- **Issues**: https://github.com/ruvnet/claude-flow/issues

### Key Research Papers
- **Voyager**: [voyager.pdf](../research/voyager.pdf) - Skill library framework
- **Eureka**: [eureka.pdf](../research/eureka.pdf) - Reward function learning
- **AlphaEvolve**: [AlphaEvolve.pdf](../research/AlphaEvolve.pdf) - Production optimization

---

## 🎯 Implementation Phases Summary

### Phase 1: Foundation (Weeks 1-4)
**Goal**: 2-3x productivity
- SuperClaude + Multi-Agent
- MCP Ecosystem
- Constitutional AI
- BMAD Method

### Phase 2: Knowledge & Optimization (Weeks 5-8)
**Goal**: 4-5x productivity
- RAG Knowledge Base
- DSPy Optimization
- Hierarchical Knowledge
- Quality Monitoring

### Phase 3: Advanced Capabilities (Weeks 9-14)
**Goal**: 6-7x productivity
- 3D Mesh Generation
- Blender/Unity MCP
- Voyager Skill Library

### Phase 4: Autonomous Systems (Weeks 15-20)
**Goal**: 7-10x productivity
- Multi-Agent Patterns
- Meta-Rewarding
- Autonomous Research
- Production Deploy

---

**Quick Reference Version**: 1.0
**Maintained By**: Hive Mind Coordination System
