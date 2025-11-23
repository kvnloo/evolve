# OpenCode Configuration

This directory contains agent definitions and commands for the evolve project using the OpenCode framework.

## Structure

```
.opencode/
├── agent/           # Agent persona definitions
│   └── ui-agent.md  # UI/Design specialist
└── command/         # Command definitions
    └── ui/          # UI-related commands
        ├── clone.md        # Website cloning
        ├── design.md       # Custom UI design
        └── uied-analysis.md # UIED computer vision analysis
```

## Agents

### ui-agent
Specialized agent for UI design, prototyping, and cloning with pixel-perfect accuracy.

**Tools**:
- **Magic MCP**: UI generation with 21st.dev patterns
- **Playwright MCP**: Visual validation and testing
- **UIED Tools**: Computer vision-based element detection (requires Python bash permissions)

**Capabilities**:
- Visual design (color, typography, spacing)
- Component architecture
- Responsive design
- Design-to-code workflows
- UI analysis and cloning

## Commands

### /ui/clone
Clone websites with pixel-perfect accuracy through:
- Multi-viewport screenshot capture
- Parallel analysis (7 agents)
- Design system extraction
- Iterative code generation

**Performance**: 140-205 seconds for complete clone

### /ui/design
Create custom UI designs with:
- Layout design (ASCII wireframe)
- Theme design (colors, fonts, spacing)
- Animation design
- HTML/Tailwind generation

**Performance**: 70-100 seconds

### /ui/uied-analysis
Analyze UI screenshots using computer vision:
- Element detection and classification
- Text extraction (OCR)
- Component position mapping
- JSON output with annotations

**Requirements**: Python with UIED submodule initialized

## Usage

### Frontmatter Format
Commands use YAML frontmatter:
```yaml
---
description: Command description
agent: ui-agent
tags: [tag1, tag2]
permissions:
  bash: python  # Optional: required for UIED tools
---
```

### Agent Assignment
Commands are automatically routed to the specified agent, which has access to:
- Specialized MCP tools (Magic, Playwright)
- Domain expertise and workflows
- Quality standards and best practices

## Migration Notes

**From**: `.claude/commands/ui/`
**To**: `.opencode/command/ui/`

**Changes**:
1. Added frontmatter with agent assignment
2. Created ui-agent.md with tool definitions
3. Preserved UIED integration and workflows
4. Maintained design philosophy and quality standards

## Dependencies

### UIED Tools
Located in `.claude/tools/UIED/` (git submodule)

**Setup**:
```bash
git submodule update --init --recursive
pip install opencv-python pandas numpy paddleocr
```

### Screenshot Tools
```bash
pip3 install shot-scraper playwright
shot-scraper install
playwright install chromium
```

## Resources

- **Magic MCP**: 21st.dev pattern generation
- **Playwright**: https://playwright.dev
- **UIED**: https://github.com/MulongXie/UIED
- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
