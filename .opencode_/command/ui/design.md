---
description: Create custom UI designs with pixel-perfect Tailwind implementation
agent: ui-agent
tags: [ui, design, tailwind, prototyping, workflow]
---

# UI Design - Pixel-Perfect Recreation Workflow

## Orchestration Mode
When recreating UI from screenshots, use SuperClaude orchestration:
- Enable flags: `--orchestrate --delegate auto --concurrency 7 --think-hard`
- These flags activate parallel agent execution and intelligent coordination
- Memory coordination via hooks for cross-agent communication

## Workflow Execution

### Phase 1: Parallel Analysis (Execute in Single Message)
Spawn 7 agents concurrently using Claude Code's Task tool:

**Agent 1: Structural Analyzer** (code-analyzer)
- Run `/ui/uied-analysis` on the provided image
- Extract component positions, dimensions, and canvas size
- Generate ASCII layout representation showing spatial organization
- Store findings in memory with key: `structural-analysis`

**Agent 2: Color Analyst** (analyst)
- Analyze the image to extract complete color palette
- Identify: backgrounds, text colors, accents, borders, hover states
- Organize into primary, secondary, neutral, accent categories
- Map to Tailwind color classes
- Store in memory with key: `color-palette`

**Agent 3: Typography Analyst** (analyst)
- Examine all text elements in the image
- Document font families, sizes, weights, line heights, tracking
- Identify heading hierarchy (h1-h6) and body text styles
- Note any special typography patterns
- Store in memory with key: `typography-system`

**Agent 4: Spacing Analyst** (analyst)
- Analyze padding, margins, gaps throughout the UI
- Identify spacing scale (4px, 8px, 16px, 24px, etc.)
- Document grid patterns, alignment, and layout structure
- Store in memory with key: `spacing-system`

**Agent 5: Shadow Analyst** (analyst)
- Extract shadow and elevation patterns from the image
- Document shadow levels (subtle, medium, high)
- Map to Tailwind shadow classes (shadow-sm, shadow-md, etc.)
- Store in memory with key: `shadow-patterns`

**Agent 6: Border Analyst** (analyst)
- Identify border radius values and patterns
- Document border styles, widths, and colors
- Store in memory with key: `border-patterns`

**Agent 7: Component Classifier** (analyst)
- Catalog component types (buttons, cards, inputs, navigation, icons)
- Identify interaction states (hover, active, disabled, focus)
- Document component patterns and variants
- Store in memory with key: `component-catalog`

### Phase 2: Sequential Synthesis (After Phase 1 Completes)

**Style Guide Synthesizer** (technical-writer)
- Retrieve all Phase 1 memory outputs
- Consolidate into unified design system using `/ui/style-guide` structure
- Create comprehensive style guide document
- Store in memory with key: `style-guide`

**Layout Architect** (system-architect)
- Retrieve `structural-analysis` and `component-catalog` from memory
- Plan component hierarchy and spatial relationships
- Map UIED positions to semantic HTML structure
- Store in memory with key: `layout-architecture`

### Phase 2.5: ASCII Layout Output (Checkpoint Before Code Generation)

**IMPORTANT: Output the ASCII layout representation to the user**
- Retrieve `structural-analysis` from memory
- Display the ASCII layout showing component spatial organization
- Include major sections, component boundaries, and hierarchy
- This serves as a visual checkpoint before HTML generation
- Wait for confirmation or feedback before proceeding to Phase 3

### Phase 3: Final Generation

**HTML/Tailwind Coder** (sparc-coder)
- Retrieve all memory outputs from Phase 1 and Phase 2
- Use UIED positions for precise component placement
- Apply style guide for consistent design implementation
- Follow layout architecture for proper HTML structure
- Generate pixel-perfect HTML/Tailwind code in single file

## HTML/Tailwind Output Rules

Only code in HTML/Tailwind in a single code block.
Any CSS styles should be in the style attribute. Start with a response, then code and finish with a response.
Don't mention about tokens, Tailwind or HTML.
Always include the html, head and body tags.
Use lucide icons for javascript, 1.5 strokewidth.
Unless style is specified by user, design in the style of Linear, Stripe, Vercel, Tailwind UI (IMPORTANT: don't mention names).
Checkboxes, sliders, dropdowns, toggles should be custom (don't add, only include if part of the UI). Be extremely accurate with fonts.
For font weight, use one level thinner: for example, Bold should be Semibold.
Titles above 20px should use tracking-tight.
Make it responsive.
Avoid setting tailwind config or css classes, use tailwind directly in html tags.
If there are charts, use chart.js for charts (avoid bug: if your canvas is on the same level as other nodes: h2 p canvas div = infinite grows. h2 p div>canvas div = as intended.).
Add subtle dividers and outlines where appropriate.
Don't put tailwind classes in the html tag, put them in the body tags.
If no images are specified, use these Unsplash images like faces, 3d, render, etc.
Be creative with fonts, layouts, be extremely detailed and make it functional.
If design, code or html is provided, IMPORTANT: respect the original design, fonts, colors, style as much as possible.
Don't use javascript for animations, use tailwind instead. Add hover color and outline interactions.
For tech, cool, futuristic, favor dark mode unless specified otherwise.
For modern, traditional, professional, business, favor light mode unless specified otherwise.
Use 1.5 strokewidth for lucide icons and avoid gradient containers for icons.
Use subtle contrast.
For logos, use letters only with tight tracking.
Avoid a bottom right floating DOWNLOAD button.

## Performance Expectations
- Phase 1 (parallel): ~30-45 seconds
- Phase 2 (synthesis): ~15-20 seconds
- Phase 2.5 (ASCII output): ~5 seconds
- Phase 3 (generation): ~20-30 seconds
- Total: ~70-100 seconds (2.8-3.6x faster than sequential execution)
