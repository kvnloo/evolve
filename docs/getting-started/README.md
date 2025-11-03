# Getting Started with Claude Code Extended Framework

**Welcome!** This guide will help you get up and running with the Claude Code Extended Framework.

---

## 📚 Quick Links

- **[Quick Start](quick-start.md)** - Get running in 10 minutes
- **[Installation Guide](installation.md)** - Detailed setup instructions
- **[Your First Project](your-first-project.md)** - Tutorial walkthrough
- **[Common Workflows](common-workflows.md)** - Everyday usage patterns

---

## 🎯 What is This Framework?

The Claude Code Extended Framework transforms Claude Code from a coding assistant into a comprehensive autonomous development system featuring:

- **SPARC Methodology** - Systematic development workflow
- **Multi-Agent Coordination** - 54+ specialized agents
- **CCPM Project Management** - Spec-driven development with GitHub integration
- **Research System** - Organized knowledge base with implementation tracking
- **Automation** - Hooks, workflows, and intelligent orchestration

**Performance**: 84.8% SWE-Bench solve rate, 32.3% token reduction, 2.8-4.4x speed improvements

---

## ⚡ Quick Start (10 Minutes)

### 1. Prerequisites
- Claude Code CLI installed
- Git configured
- Bash shell environment
- GitHub account (for project management features)

### 2. Installation
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Install MCP servers (recommended)
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

### 3. First Steps
```bash
# Explore configuration
cat CLAUDE.md

# Try SPARC workflow
npx claude-flow sparc modes

# Add research
echo "# My Research" > research/intake/unorganized/$(date +%Y-%m-%d)-test.md
```

**✅ You're ready!** See [Quick Start](quick-start.md) for detailed walkthrough.

---

## 📖 Documentation Structure

### For New Users
1. Start with [Quick Start](quick-start.md)
2. Read [Installation Guide](installation.md) for full setup
3. Follow [Your First Project](your-first-project.md) tutorial
4. Explore [Common Workflows](common-workflows.md)

### For Experienced Users
- **Guides**: `docs/guides/` - How-to guides for specific tasks
- **Reference**: `docs/reference/` - Commands, agents, configuration
- **Implementation**: `docs/implementation/` - Features and roadmap

---

## 🚀 Key Concepts

### SPARC Methodology
Systematic development workflow:
1. **Specification** - Define requirements
2. **Pseudocode** - Design algorithms
3. **Architecture** - System design
4. **Refinement** - TDD implementation
5. **Completion** - Integration and validation

### Research System
Organized knowledge base:
- **Intake** (`research/intake/`) - Drop new research here
- **Topics** (`research/topics/`) - Organized by subject
- **Implementation** (`research/_implementation/`) - Track features

### CCPM (Project Management)
Spec-driven development:
- PRDs in `.claude/prds/`
- GitHub issue synchronization
- Git worktree-based parallel development

---

## 🎓 Learning Path

### Week 1: Basics
- [ ] Complete quick start
- [ ] Explore SPARC commands
- [ ] Add research to intake system
- [ ] Try creating a simple feature

### Week 2: Intermediate
- [ ] Use multi-agent workflows
- [ ] Set up CCPM for project
- [ ] Explore MCP integrations
- [ ] Optimize with SuperClaude framework

### Week 3: Advanced
- [ ] Customize agents and workflows
- [ ] Create custom slash commands
- [ ] Implement research into features
- [ ] Contribute improvements

---

## 🔧 Common Tasks

### Adding Research
```bash
# Drop file in intake
cp ~/Downloads/research.md research/intake/unorganized/2025-11-02-topic-source.md

# Process weekly
mv research/intake/unorganized/*.md research/topics/appropriate-category/
```

### Running SPARC Workflow
```bash
# Complete TDD workflow
npx claude-flow sparc tdd "user authentication"

# Specific phase
npx claude-flow sparc run architect "API design"
```

### Using CCPM
```bash
# Create PRD
/pm:prd-new "Feature Name"

# Decompose into tasks
/pm:epic-oneshot

# Start work
/pm:issue-start 123
```

---

## 🆘 Getting Help

**Documentation:**
- Troubleshooting: `docs/troubleshooting/`
- FAQ: `docs/troubleshooting/faq.md`
- Reference: `docs/reference/`

**Support:**
- GitHub Issues: Report bugs and request features
- Documentation: Check guides for how-tos
- Community: Discussions and Q&A

---

## 📝 Next Steps

After getting started:

1. **Explore Features**: Check `docs/implementation/capabilities.md`
2. **Learn Workflows**: Read `docs/guides/`
3. **Customize**: Adapt framework to your needs
4. **Contribute**: Share improvements and feedback

---

**Ready to begin?** Start with **[Quick Start Guide](quick-start.md)** →

