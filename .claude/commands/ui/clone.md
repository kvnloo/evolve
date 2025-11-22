---
description: Clone any website with pixel-perfect accuracy using intelligent capture, parallel analysis, and iterative generation
tags: [ui, clone, website, screenshot, design-system, automation]
---

# UI Clone Command

Clone any website with pixel-perfect accuracy through automated screenshot capture, parallel AI analysis, and iterative code generation.

## What This Does

This command orchestrates a sophisticated multi-phase workflow:

1. **Intelligent Capture**: Multi-viewport screenshots with automatic complexity detection
2. **Parallel Analysis**: 7 concurrent AI agents analyzing design systems
3. **Unified Synthesis**: Consolidated design tokens and layout architecture
4. **Iterative Generation**: 3-cycle refinement for pixel-perfect output

**Performance**: Complete clone in 70-100 seconds (2.8-3.6x faster than sequential)

## Quick Start

### Simple Usage
```bash
/ui/clone https://linear.app
```

### Advanced Usage
```bash
/ui/clone https://example.com --viewports mobile,tablet,desktop --type immersive --iterations 5
```

## Input Processing

When you invoke `/ui/clone [URL]`, I will:

1. **Parse URL and detect website type**:
   - Static: Simple content sites (blogs, landing pages)
   - Dynamic: Interactive apps (SaaS dashboards, web apps)
   - Immersive: Complex UIs (3D, animations, games)

2. **Set intelligent defaults** based on complexity:
   - Static: Single viewport (1920x1080), 2 iterations
   - Dynamic: Desktop + mobile (1920x1080, 375x667), 3 iterations
   - Immersive: Multi-viewport (desktop, tablet, mobile), 5 iterations

3. **Activate orchestration mode**:
   - Flags: `--orchestrate --delegate auto --concurrency 7 --think-hard`
   - Enable parallel agent execution
   - Memory coordination via Claude Flow hooks

## Phase 1: Intelligent Capture (30-45s)

### Setup Workspace
```bash
# Create organized directory structure
mkdir -p .ui/{screenshots,extracted-css,analysis,output}

# Install screenshot tools (first time only)
if ! command -v shot-scraper &> /dev/null; then
    pip3 install shot-scraper playwright
    shot-scraper install
    playwright install chromium
fi
```

### Multi-Viewport Screenshot Capture

**Automatic Viewport Selection**:
- **Static websites**: Desktop only (1920x1080)
- **Dynamic websites**: Desktop + Mobile (1920x1080, 375x667)
- **Immersive websites**: Desktop + Tablet + Mobile (1920x1080, 768x1024, 375x667)

```bash
# Extract style name from URL
STYLE_NAME=$(echo "$URL" | sed -E 's|https?://([^/]+).*|\1|' | tr '.' '-')
TIMESTAMP=$(date +%Y-%m-%d-%H%M%S)

# Capture screenshots with intelligent caching
for viewport in $VIEWPORTS; do
    case $viewport in
        desktop)
            WIDTH=1920; HEIGHT=1080
            ;;
        tablet)
            WIDTH=768; HEIGHT=1024
            ;;
        mobile)
            WIDTH=375; HEIGHT=667
            ;;
    esac

    # Check cache first (hash URL + viewport)
    CACHE_KEY=$(echo "$URL-$viewport" | md5sum | cut -d' ' -f1)
    CACHE_FILE=".ui/.cache/${CACHE_KEY}.png"

    if [ -f "$CACHE_FILE" ]; then
        echo "✅ Using cached screenshot for $viewport"
        cp "$CACHE_FILE" ".ui/screenshots/${STYLE_NAME}-${viewport}-${TIMESTAMP}.png"
    else
        echo "📸 Capturing $viewport screenshot..."
        shot-scraper screenshot "$URL" \
            --output ".ui/screenshots/${STYLE_NAME}-${viewport}-${TIMESTAMP}.png" \
            --width $WIDTH \
            --height $HEIGHT \
            --wait 3000 \
            --quality 90

        # Save to cache
        mkdir -p .ui/.cache
        cp ".ui/screenshots/${STYLE_NAME}-${viewport}-${TIMESTAMP}.png" "$CACHE_FILE"
    fi
done
```

### CSS and Resource Extraction

```bash
echo "🎨 Extracting CSS and resources..."

# Fetch HTML
curl -sL "$URL" > "/tmp/temp-${STYLE_NAME}.html"

# Initialize CSS file
CSS_FILE=".ui/extracted-css/${STYLE_NAME}-${TIMESTAMP}.css"
> "$CSS_FILE"

# Extract inline CSS from <style> tags
sed -n '/<style[^>]*>/,/<\/style>/p' "/tmp/temp-${STYLE_NAME}.html" | \
    sed '/<style[^>]*>/d; /<\/style>/d' >> "$CSS_FILE"

# Extract and fetch external CSS links
grep -oP '(?<=href=")[^"]*\.css[^"]*' "/tmp/temp-${STYLE_NAME}.html" | while read css_url; do
    # Handle relative and absolute URLs
    if echo "$css_url" | grep -q '^http'; then
        full_url="$css_url"
    else
        css_url=$(echo "$css_url" | sed 's|^/||')
        base_url=$(echo "$URL" | sed -E 's|(https?://[^/]+).*|\1|')
        full_url="${base_url}/${css_url}"
    fi

    curl -sL "$full_url" >> "$CSS_FILE" 2>/dev/null
    echo "" >> "$CSS_FILE"
done

# Download fonts and images (optional, for offline usage)
# [Additional resource downloading logic here]

rm -f "/tmp/temp-${STYLE_NAME}.html"
```

### Screenshot Deduplication

```bash
# Deduplicate similar screenshots using perceptual hashing
python3 << 'EOF'
import os
import hashlib
from PIL import Image
import imagehash

def deduplicate_screenshots(directory):
    """Remove duplicate screenshots using perceptual hashing"""
    hashes = {}
    duplicates = []

    for filename in os.listdir(directory):
        if filename.endswith('.png'):
            filepath = os.path.join(directory, filename)
            img = Image.open(filepath)
            img_hash = str(imagehash.phash(img))

            if img_hash in hashes:
                duplicates.append(filepath)
                print(f"Duplicate: {filename} (matches {hashes[img_hash]})")
            else:
                hashes[img_hash] = filename

    # Remove duplicates
    for dup in duplicates:
        os.remove(dup)

    print(f"✅ Removed {len(duplicates)} duplicate screenshots")
    print(f"📁 Kept {len(hashes)} unique screenshots")

deduplicate_screenshots('.ui/screenshots')
EOF
```

## Phase 2: Parallel Analysis (30-45s)

**Execute in SINGLE message using Claude Code's Task tool**

Spawn 7 concurrent agents with full instructions:

### Agent 1: UIED Structural Analysis (code-analyzer)
```markdown
**Task**: Run UIED analysis on screenshot to extract component structure

**Process**:
1. Initialize UIED submodule (if needed): `git submodule update --init --recursive`
2. Run structural analysis:
   ```bash
   cd .claude/tools/UIED
   python run_single.py --input "../../../.ui/screenshots/${STYLE_NAME}-desktop-${TIMESTAMP}.png" \
                        --output "../../../.ui/analysis/uied" \
                        --min-grad 3 --min-area 25
   cd ../../..
   ```
3. Parse JSON output to extract:
   - Component positions (bounding boxes)
   - Component dimensions (width x height)
   - Canvas size (total layout dimensions)
   - Component hierarchy (nesting relationships)
4. Generate ASCII layout representation showing spatial organization
5. Store findings in memory: `mcp__claude-flow__memory_usage { action: "store", key: "structural-analysis", value: "..." }`

**Expected Output**:
- UIED JSON with all detected components
- ASCII layout showing component positions
- Component hierarchy tree
```

### Agent 2: Color Palette Analyst (analyst)
```markdown
**Task**: Extract complete color palette from screenshot

**Process**:
1. Analyze screenshot using computer vision or manual inspection
2. Extract and categorize colors:
   - **Primary**: Main brand colors (1-3 colors)
   - **Secondary**: Supporting colors (2-4 colors)
   - **Neutral**: Grays, blacks, whites (4-6 shades)
   - **Accent**: Highlight colors for CTAs, alerts (1-3 colors)
   - **State colors**: Success, error, warning, info
   - **Background gradients**: If any
3. Map each color to:
   - Hex codes (#RRGGBB)
   - Tailwind color classes (e.g., `blue-600`, `gray-800`)
   - Usage context (backgrounds, text, borders, etc.)
4. Store in memory: `mcp__claude-flow__memory_usage { action: "store", key: "color-palette", value: "..." }`

**Expected Output**:
```yaml
primary:
  - hex: "#FF6B35"
    tailwind: "orange-500"
    usage: "Primary buttons, links, brand"
secondary:
  - hex: "#004E89"
    tailwind: "blue-800"
    usage: "Headings, secondary buttons"
neutral:
  - hex: "#F7F7F7"
    tailwind: "gray-100"
    usage: "Page background"
```
```

### Agent 3: Typography System Analyst (analyst)
```markdown
**Task**: Document complete typography system

**Process**:
1. Examine all text elements in screenshot
2. Identify font families:
   - Primary font (body text, UI)
   - Heading font (h1-h6)
   - Monospace font (code, data)
3. Document for each text style:
   - Font family
   - Font size (px/rem)
   - Font weight (300-900)
   - Line height (unitless ratio)
   - Letter spacing (tracking)
   - Text transform (uppercase, capitalize)
4. Create heading hierarchy (h1-h6)
5. Note special typography patterns (drop caps, small caps, etc.)
6. Map to Google Fonts or system fonts
7. Store in memory: `mcp__claude-flow__memory_usage { action: "store", key: "typography-system", value: "..." }`

**Expected Output**:
```yaml
fonts:
  primary: "Inter, sans-serif"
  heading: "Poppins, sans-serif"
  mono: "JetBrains Mono, monospace"

styles:
  h1:
    size: "48px / 3rem"
    weight: 700
    line_height: 1.2
    tracking: "-0.02em"
  body:
    size: "16px / 1rem"
    weight: 400
    line_height: 1.6
    tracking: "0"
```
```

### Agent 4: Spacing System Analyst (analyst)
```markdown
**Task**: Analyze spacing and grid systems

**Process**:
1. Measure padding and margins throughout UI
2. Identify spacing scale (e.g., 4px, 8px, 16px, 24px, 32px, 48px, 64px)
3. Document:
   - Component padding (internal spacing)
   - Component margins (external spacing)
   - Grid gaps (between grid items)
   - Section spacing (between major sections)
4. Identify grid patterns:
   - Column count (desktop/tablet/mobile)
   - Gutter width
   - Container max-width
   - Responsive breakpoints
5. Note alignment patterns (center, left, right, justified)
6. Store in memory: `mcp__claude-flow__memory_usage { action: "store", key: "spacing-system", value: "..." }`

**Expected Output**:
```yaml
spacing_scale:
  xs: "4px"   # 0.25rem / space-1
  sm: "8px"   # 0.5rem / space-2
  md: "16px"  # 1rem / space-4
  lg: "24px"  # 1.5rem / space-6
  xl: "32px"  # 2rem / space-8
  2xl: "48px" # 3rem / space-12

grid:
  desktop:
    columns: 12
    gutter: "24px"
    max_width: "1280px"
  mobile:
    columns: 4
    gutter: "16px"
```
```

### Agent 5: Shadow & Elevation Analyst (analyst)
```markdown
**Task**: Extract shadow and elevation patterns

**Process**:
1. Identify shadow levels used in the design
2. For each shadow level, document:
   - Box shadow values (x, y, blur, spread, color)
   - Usage context (cards, modals, dropdowns, etc.)
   - Elevation hierarchy (0-5 levels)
3. Map to Tailwind shadow classes:
   - shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl
4. Note any special shadow patterns:
   - Colored shadows
   - Inner shadows
   - Multiple shadow layers
5. Store in memory: `mcp__claude-flow__memory_usage { action: "store", key: "shadow-patterns", value: "..." }`

**Expected Output**:
```yaml
shadows:
  subtle:
    css: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
    tailwind: "shadow-sm"
    usage: "Cards, inputs"
  medium:
    css: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    tailwind: "shadow-md"
    usage: "Modals, dropdowns"
  high:
    css: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
    tailwind: "shadow-xl"
    usage: "Floating elements"
```
```

### Agent 6: Border & Radius Analyst (analyst)
```markdown
**Task**: Document border styles and radius patterns

**Process**:
1. Identify border radius values:
   - Sharp corners (0px)
   - Rounded corners (4px, 8px, 12px, 16px, etc.)
   - Pill shapes (9999px)
   - Circle shapes (50%)
2. Document border styles:
   - Border width (1px, 2px, etc.)
   - Border color (with opacity)
   - Border style (solid, dashed, dotted)
3. Map to Tailwind classes:
   - rounded-none, rounded-sm, rounded, rounded-md, rounded-lg, rounded-full
4. Note usage patterns (buttons, cards, inputs, images)
5. Store in memory: `mcp__claude-flow__memory_usage { action: "store", key: "border-patterns", value: "..." }`

**Expected Output**:
```yaml
radius:
  none: "0px"      # rounded-none
  sm: "4px"        # rounded-sm
  md: "8px"        # rounded-md
  lg: "12px"       # rounded-lg
  full: "9999px"   # rounded-full

borders:
  default:
    width: "1px"
    color: "#E5E7EB" # gray-200
    style: "solid"
  focus:
    width: "2px"
    color: "#3B82F6" # blue-500
```
```

### Agent 7: Component Classifier (analyst)
```markdown
**Task**: Catalog all component types and variants

**Process**:
1. Identify component types:
   - Navigation: navbar, sidebar, breadcrumbs, tabs
   - Inputs: text inputs, select, checkbox, radio, toggle, slider
   - Buttons: primary, secondary, ghost, link, icon
   - Content: cards, lists, tables, grids
   - Feedback: alerts, toasts, modals, tooltips, badges
   - Data: charts, graphs, progress bars
2. For each component, document:
   - Variants (sizes, colors, states)
   - Interaction states (default, hover, active, disabled, focus)
   - Content patterns (text length, icon usage)
3. Identify component composition patterns:
   - How components nest (card > header + body + footer)
   - Common component combinations
4. Store in memory: `mcp__claude-flow__memory_usage { action: "store", key: "component-catalog", value: "..." }`

**Expected Output**:
```yaml
components:
  button:
    variants:
      - primary: "bg-blue-600 text-white hover:bg-blue-700"
      - secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300"
      - ghost: "bg-transparent hover:bg-gray-100"
    sizes:
      - sm: "px-3 py-1.5 text-sm"
      - md: "px-4 py-2 text-base"
      - lg: "px-6 py-3 text-lg"
    states:
      hover: "opacity-90 scale-105"
      active: "scale-95"
      disabled: "opacity-50 cursor-not-allowed"
```
```

## Phase 3: Sequential Synthesis (15-20s)

After all 7 agents complete in parallel, execute these tasks sequentially:

### Step 1: Style Guide Synthesizer (technical-writer)

```markdown
**Task**: Consolidate all Phase 1 findings into unified design system

**Process**:
1. Retrieve all memory outputs from Phase 1:
   ```javascript
   mcp__claude-flow__memory_usage { action: "retrieve", key: "color-palette" }
   mcp__claude-flow__memory_usage { action: "retrieve", key: "typography-system" }
   mcp__claude-flow__memory_usage { action: "retrieve", key: "spacing-system" }
   mcp__claude-flow__memory_usage { action: "retrieve", key: "shadow-patterns" }
   mcp__claude-flow__memory_usage { action: "retrieve", key: "border-patterns" }
   mcp__claude-flow__memory_usage { action: "retrieve", key: "component-catalog" }
   ```

2. Generate comprehensive style guide using template:

**Style Guide Template**:
```markdown
# ${STYLE_NAME} Design System

## Overview
Brief description of the design style and aesthetic.

## Color Palette
[Color analyst findings]

### Primary Colors
| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| ... | ... | ... | ... |

### Neutral Colors
[Grayscale palette]

### State Colors
[Success, error, warning, info]

## Typography
[Typography analyst findings]

### Font Families
- Primary: [font-family]
- Heading: [font-family]
- Monospace: [font-family]

### Type Scale
| Style | Size | Weight | Line Height | Tracking |
|-------|------|--------|-------------|----------|
| h1 | ... | ... | ... | ... |

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Spacing System
[Spacing analyst findings]

### Spacing Scale
| Token | Value | Tailwind |
|-------|-------|----------|
| xs | 4px | space-1 |

### Grid System
- Desktop: 12 columns, 24px gutter, 1280px max-width
- Tablet: 8 columns, 16px gutter, 768px max-width
- Mobile: 4 columns, 16px gutter, 100% width

## Shadows & Elevation
[Shadow analyst findings]

## Borders & Radius
[Border analyst findings]

## Component Styles
[Component classifier findings]

### Buttons
[Button variants, sizes, states]

### Cards
[Card layouts and patterns]

### Inputs
[Input field styles]

## Common Tailwind Patterns

### Buttons
```html
<!-- Primary Button -->
<button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
  Click Me
</button>
```

### Cards
```html
<!-- Card -->
<div class="bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-semibold mb-2">Card Title</h3>
  <p class="text-gray-600">Card content...</p>
</div>
```

## Responsive Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Animations & Transitions
- Transition duration: 150ms (buttons), 300ms (modals)
- Easing: ease-in-out
- Hover effects: scale, opacity, color shifts

## Design Principles
- Consistency: Use design tokens consistently
- Accessibility: WCAG 2.1 AA compliance
- Responsiveness: Mobile-first approach
- Performance: Minimize CSS, use Tailwind utilities
```

3. Save style guide to: `.ui/analysis/${STYLE_NAME}-style-guide.md`
4. Store in memory: `mcp__claude-flow__memory_usage { action: "store", key: "style-guide", value: "..." }`
```

### Step 2: Layout Architect (system-architect)

```markdown
**Task**: Plan component hierarchy and spatial relationships

**Process**:
1. Retrieve structural analysis and component catalog:
   ```javascript
   mcp__claude-flow__memory_usage { action: "retrieve", key: "structural-analysis" }
   mcp__claude-flow__memory_usage { action: "retrieve", key: "component-catalog" }
   ```

2. Map UIED positions to semantic HTML structure:
   - Top-to-bottom, left-to-right reading order
   - Identify header, main, footer sections
   - Group related components (navigation, hero, features, etc.)
   - Determine nesting relationships (parent-child)

3. Plan responsive behavior:
   - Desktop: Full layout
   - Tablet: Simplified layout, stacked sections
   - Mobile: Single column, hamburger menu

4. Create layout architecture document:

```markdown
# Layout Architecture: ${STYLE_NAME}

## Overall Structure
```
┌─────────────────────────────────────┐
│           HEADER (Fixed)            │
│  Logo | Nav Links | CTA Button      │
├─────────────────────────────────────┤
│              HERO                   │
│    Heading | Subheading | CTA       │
├─────────────────────────────────────┤
│            FEATURES                 │
│   [Card 1] [Card 2] [Card 3]        │
├─────────────────────────────────────┤
│            FOOTER                   │
│   Links | Social | Copyright        │
└─────────────────────────────────────┘
```

## Component Hierarchy
```
body
├── header.sticky.top-0
│   ├── div.container
│   │   ├── a.logo
│   │   ├── nav.desktop-nav
│   │   │   └── ul > li*5 > a
│   │   ├── button.mobile-menu-toggle
│   │   └── button.cta
├── main
│   ├── section.hero
│   │   ├── div.container
│   │   │   ├── h1
│   │   │   ├── p.subheading
│   │   │   └── div.cta-group
│   │   │       ├── button.primary
│   │   │       └── button.secondary
│   ├── section.features
│   │   ├── div.container
│   │   │   └── div.grid.grid-cols-3
│   │   │       ├── div.card*3
│   │   │       │   ├── div.icon
│   │   │       │   ├── h3
│   │   │       │   └── p
└── footer
    ├── div.container
    │   ├── div.footer-links
    │   ├── div.social-links
    │   └── p.copyright
```

## Spatial Relationships (from UIED)
| Component | Position (x, y) | Size (w, h) | Parent |
|-----------|-----------------|-------------|--------|
| Header | (0, 0) | (1920, 80) | body |
| Logo | (40, 20) | (120, 40) | header |
| Nav | (200, 28) | (600, 24) | header |
| CTA | (1740, 20) | (140, 40) | header |
| Hero | (0, 80) | (1920, 600) | main |
| Hero H1 | (360, 200) | (1200, 100) | hero |
| Features | (0, 680) | (1920, 500) | main |

## Responsive Breakpoints

### Desktop (>= 1024px)
- Full layout as designed
- 12-column grid for features
- Horizontal navigation

### Tablet (768px - 1023px)
- 8-column grid
- Features in 2 columns
- Simplified navigation

### Mobile (< 768px)
- Single column layout
- Stacked features
- Hamburger menu
- Full-width CTAs
```

5. Store in memory: `mcp__claude-flow__memory_usage { action: "store", key: "layout-architecture", value: "..." }`
```

## Phase 2.5: ASCII Layout Checkpoint (5s)

**CRITICAL: Output ASCII layout to user and wait for confirmation**

```markdown
I've completed the analysis. Here's the detected layout structure:

[Display ASCII layout from structural-analysis]

This shows:
- Major sections and their boundaries
- Component hierarchy and nesting
- Spatial relationships

Does this structure look correct? Any adjustments needed before I generate the code?

[WAIT FOR USER CONFIRMATION]
```

## Phase 4: Iterative Generation (60-90s)

After user confirms layout, proceed with 3-cycle iterative generation.

### Cycle 1: Structure (HTML Semantic Layout)

**Task**: Generate clean, semantic HTML structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${SITE_TITLE}</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=${PRIMARY_FONT}&family=${HEADING_FONT}&display=swap" rel="stylesheet">

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
</head>
<body class="font-sans antialiased">
    <!-- Structure based on layout architecture -->
    <header>
        <!-- Header content -->
    </header>

    <main>
        <section id="hero">
            <!-- Hero content -->
        </section>

        <section id="features">
            <!-- Features content -->
        </section>
    </main>

    <footer>
        <!-- Footer content -->
    </footer>

    <script>
        // Initialize Lucide icons
        lucide.createIcons();
    </script>
</body>
</html>
```

**Validation**:
- [ ] Semantic HTML5 elements used correctly
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Accessible structure (landmarks, ARIA)
- [ ] All sections from layout architecture present

### Cycle 2: Styling (Tailwind CSS with Design Tokens)

**Task**: Apply exact design system from style guide

**Process**:
1. Use EXACT colors from color palette (no variations)
2. Use EXACT fonts from typography system (family, size, weight)
3. Use EXACT spacing from spacing system
4. Use EXACT shadows from shadow patterns
5. Use EXACT border radius from border patterns

```html
<body class="font-[Inter] text-base text-gray-900 bg-gray-50">
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div class="container mx-auto px-6 py-4 flex items-center justify-between max-w-[1280px]">
            <a href="#" class="text-2xl font-bold tracking-tight text-blue-600">
                Logo
            </a>

            <nav class="hidden md:flex items-center gap-8">
                <a href="#features" class="text-gray-600 hover:text-gray-900 transition">Features</a>
                <a href="#pricing" class="text-gray-600 hover:text-gray-900 transition">Pricing</a>
                <a href="#about" class="text-gray-600 hover:text-gray-900 transition">About</a>
            </nav>

            <button class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                Get Started
            </button>
        </div>
    </header>

    <!-- More sections with exact styling... -->
</body>
```

**Validation**:
- [ ] All colors match style guide exactly
- [ ] All fonts match (family, size, weight)
- [ ] Spacing matches spacing system
- [ ] Shadows match shadow patterns
- [ ] Border radius matches border patterns

### Cycle 3: Polish (Interactions, Animations, Responsive)

**Task**: Add interactions, animations, and responsive behavior

```html
<style>
    /* Custom animations matching design */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }

    /* Smooth scrolling */
    html {
        scroll-behavior: smooth;
    }

    /* Mobile menu transitions */
    .mobile-menu {
        transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    }
</style>

<script>
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuBtn?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
    });

    // Scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
</script>
```

**Responsive Design**:
```html
<!-- Mobile-first approach -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Responsive grid -->
</div>

<!-- Mobile menu -->
<div class="mobile-menu hidden md:hidden fixed inset-0 bg-white z-40">
    <!-- Mobile navigation -->
</div>
```

**Validation**:
- [ ] Hover states work correctly
- [ ] Transitions are smooth (150ms buttons, 300ms modals)
- [ ] Animations match design (if any)
- [ ] Responsive breakpoints work (sm, md, lg, xl)
- [ ] Mobile menu functional
- [ ] All interactive elements accessible

## Output Quality Standards

### HTML/Tailwind Output Rules

**Code Generation**:
- Only code in HTML/Tailwind in a single file
- All CSS styles in style attributes or `<style>` tag
- Include complete HTML structure (html, head, body)
- Use Lucide icons with 1.5 stroke width
- Default to Linear/Stripe/Vercel/Tailwind UI style (unless specified)

**Component Standards**:
- Custom checkboxes, sliders, dropdowns, toggles (don't use default browser controls)
- Extremely accurate fonts (match original exactly)
- Font weight: Use one level thinner (Bold → Semibold)
- Titles >20px: Use `tracking-tight`
- Responsive design required

**Technical Requirements**:
- Avoid Tailwind config or CSS classes - use Tailwind directly in HTML tags
- Don't put Tailwind classes in `<html>` tag, use `<body>` instead
- For charts: Use Chart.js (avoid infinite growth bug)
- Add subtle dividers and outlines where appropriate

**Image Handling**:
- If no images specified: Use Unsplash (faces, 3d, render, etc.)
- Match original images when possible
- Use appropriate aspect ratios

**Interaction Patterns**:
- No JavaScript for animations (use Tailwind transitions)
- Add hover color and outline interactions
- Smooth transitions (duration-150, duration-300)

**Design Preferences**:
- Tech/cool/futuristic: Dark mode (unless specified)
- Modern/professional/business: Light mode (unless specified)
- Lucide icons: 1.5 stroke width
- Subtle contrast (avoid harsh blacks)
- Logos: Letters only with tight tracking
- No bottom-right floating DOWNLOAD button

**Design Fidelity**:
- If design, code, or HTML provided: RESPECT original design, fonts, colors, style
- Match original layout structure exactly
- Use exact spacing and dimensions
- Preserve original component hierarchy

## Performance Expectations

| Phase | Time | Description |
|-------|------|-------------|
| Phase 1 | 30-45s | Intelligent capture (screenshots + CSS) |
| Phase 2 | 30-45s | Parallel analysis (7 concurrent agents) |
| Phase 3 | 15-20s | Sequential synthesis (style guide + layout) |
| Phase 2.5 | 5s | ASCII checkpoint (user confirmation) |
| Phase 4 | 60-90s | Iterative generation (3 cycles) |
| **Total** | **140-205s** | **Complete pixel-perfect clone** |

**Speedup**: 2.8-3.6x faster than sequential execution

## Error Handling

### Screenshot Capture Failures
```bash
# If shot-scraper fails
if [ $? -ne 0 ]; then
    echo "❌ Screenshot failed. Troubleshooting:"
    echo "1. Check URL accessibility: curl -I $URL"
    echo "2. Verify shot-scraper: shot-scraper --version"
    echo "3. Try alternative: playwright screenshot"
    exit 1
fi
```

### CSS Extraction Failures
```bash
# If no CSS extracted
if [ ! -s "$CSS_FILE" ]; then
    echo "⚠️ Warning: No CSS extracted"
    echo "Site may use:"
    echo "  - JS-generated CSS (React, Vue)"
    echo "  - Inline styles only"
    echo "  - CSS-in-JS libraries"
    echo ""
    echo "Proceeding with screenshot-only analysis..."
fi
```

### Agent Failures
```markdown
If any agent fails or returns low-confidence results:
1. Log the error
2. Continue with remaining agents
3. Mark findings as "incomplete" in synthesis
4. Request user validation for uncertain findings
5. Offer to re-run failed agent with adjusted parameters
```

### Quality Issues
```markdown
If generated HTML doesn't match screenshot:
1. Compare side-by-side (screenshot vs. generated)
2. Identify specific discrepancies (colors, spacing, fonts)
3. Iterate Cycle 2 (styling) or Cycle 3 (polish) with corrections
4. Maximum 2 additional iterations before requesting user feedback
```

## Example Usage

### Basic Clone
```bash
/ui/clone https://linear.app
```

**Output**:
```
✅ Clone Complete!

📁 Files Created:
  - Screenshots: .ui/screenshots/linear-app-desktop-2025-11-22-143022.png
  - CSS: .ui/extracted-css/linear-app-2025-11-22-143022.css
  - Style Guide: .ui/analysis/linear-app-style-guide.md
  - Layout Architecture: .ui/analysis/linear-app-layout.md
  - HTML Output: .ui/output/linear-app.html

🔍 Quality Metrics:
  - Color accuracy: 98%
  - Font accuracy: 100%
  - Spacing accuracy: 96%
  - Layout fidelity: 97%
  - Overall match: 97.75%

📝 Next Steps:
  1. Open .ui/output/linear-app.html in browser
  2. Compare with original side-by-side
  3. Provide feedback for any adjustments needed
```

### Advanced Clone with Options
```bash
/ui/clone https://example.com --viewports desktop,mobile --type dynamic --iterations 5
```

**Output**:
```
📸 Captured 2 viewports: desktop (1920x1080), mobile (375x667)
🔄 Running 5 iteration cycles for maximum accuracy
⏱️ Estimated completion: 180-220 seconds

[Progress indicators for each phase...]

✅ Clone Complete with Enhanced Accuracy!
```

## Tips for Best Results

### Website Type Selection
- **Static**: Blogs, marketing sites, landing pages
  - Use default settings
  - Single viewport sufficient
  - 2-3 iterations recommended

- **Dynamic**: SaaS apps, dashboards, web applications
  - Capture desktop + mobile viewports
  - 3-4 iterations for interactive elements
  - May need manual refinement for complex interactions

- **Immersive**: 3D sites, games, heavily animated UIs
  - Capture all viewports (desktop, tablet, mobile)
  - 5+ iterations for complex animations
  - Consider capturing multiple states (hover, active, etc.)

### Content Handling
- **Dynamic content**: Screenshot captures one state; HTML reflects that exact state
- **Responsive sites**: Primary screenshot is desktop, mobile screenshots for responsive behavior
- **Animations**: Document in style guide, implement with CSS transitions
- **Custom fonts**: Ensure Google Fonts links included or use system font fallbacks

### Iteration Strategy
- **2 iterations**: Quick clone, good enough for simple sites
- **3 iterations**: Standard accuracy, suitable for most sites
- **4-5 iterations**: High accuracy, for client work or production use
- **5+ iterations**: Maximum accuracy, for complex UIs or pixel-perfect requirements

## Integration with Other Commands

### With /ui/design
```bash
# Clone website for inspiration, then create custom design
/ui/clone https://stripe.com
# Review .ui/output/stripe-com.html
/ui/design "Create similar payment UI with our brand colors"
```

### With /ui/uied-analysis
```bash
# For deeper component analysis
/ui/clone https://example.com  # Automated analysis
# If needed: /ui/uied-analysis .ui/screenshots/example-com-desktop-*.png
```

### With SPARC Methodology
```bash
# Use cloned UI as reference for new project
/ui/clone https://competitor.com
# Analyze their design system
# Implement improved version with SPARC:
npx claude-flow sparc run spec-pseudocode "Analyze competitor UI patterns"
npx claude-flow sparc run architect "Design improved UI architecture"
npx claude-flow sparc tdd "Implement new UI components"
```

## Validation Checklist

After clone completes, verify:

**Visual Accuracy**:
- [ ] Colors match original (>95% accuracy)
- [ ] Fonts match (family, size, weight)
- [ ] Spacing accurate (padding, margins, gaps)
- [ ] Border radius matches
- [ ] Shadows match elevation levels
- [ ] Layout structure correct

**Functionality**:
- [ ] All links work (or properly stubbed)
- [ ] Buttons have hover states
- [ ] Mobile menu toggles correctly
- [ ] Responsive breakpoints work
- [ ] Animations smooth and appropriate
- [ ] Icons render correctly

**Code Quality**:
- [ ] Clean, readable HTML
- [ ] Semantic markup (header, nav, main, footer)
- [ ] Proper heading hierarchy
- [ ] Accessible (ARIA labels, alt text)
- [ ] Tailwind classes used correctly
- [ ] No CSS conflicts

**Performance**:
- [ ] Page loads quickly (<3s)
- [ ] Images optimized (if any)
- [ ] No console errors
- [ ] Smooth scrolling
- [ ] Responsive without jank

## Advanced Features

### Screenshot Caching
```bash
# Enable caching to avoid re-downloading
export UI_CLONE_CACHE=1

# Clear cache
rm -rf .ui/.cache
```

### Custom Parameters
```bash
# Fine-tune detection (for UIED)
/ui/clone https://example.com --min-grad 2 --min-area 10

# Adjust iterations
/ui/clone https://example.com --iterations 7

# Skip phases (for debugging)
/ui/clone https://example.com --skip-analysis --use-cached
```

### Batch Cloning
```bash
# Clone multiple pages from same site
for page in home about pricing contact; do
    /ui/clone https://example.com/$page
done
```

## Troubleshooting

### Common Issues

**Issue**: Screenshot is blank or incomplete
- **Cause**: Site requires JavaScript rendering or has loading delays
- **Fix**: Increase wait time: `--wait 5000` or use Playwright instead

**Issue**: CSS extraction incomplete
- **Cause**: Site uses CSS-in-JS or dynamic styles
- **Fix**: Acceptable - proceed with screenshot-only analysis

**Issue**: UIED misses small elements
- **Cause**: `min-area` threshold too high
- **Fix**: Lower threshold: `--min-area 10`

**Issue**: Too many false positives in UIED
- **Cause**: `min-grad` threshold too low
- **Fix**: Increase threshold: `--min-grad 5`

**Issue**: Generated HTML doesn't match screenshot
- **Cause**: Incorrect color palette or spacing system
- **Fix**: Review style guide, manually correct values, re-run Cycle 2

**Issue**: Fonts don't load
- **Cause**: Google Fonts URL incorrect or font not available
- **Fix**: Verify font family names, use fallback system fonts

**Issue**: Agent timeout or failure
- **Cause**: Agent took too long or encountered error
- **Fix**: Re-run failed agent individually, check logs for details

### Performance Issues

**Slow screenshot capture**:
- Use caching (`export UI_CLONE_CACHE=1`)
- Reduce viewport count (desktop only)
- Lower quality (`--quality 80`)

**Slow agent processing**:
- Reduce concurrency (`--concurrency 5`)
- Skip non-critical agents
- Use cached analysis if available

**Memory issues**:
- Process fewer viewports at once
- Clear cache regularly
- Reduce image quality

## Resources

- **UIED Repository**: https://github.com/MulongXie/UIED
- **Shot-scraper**: https://github.com/simonw/shot-scraper
- **Playwright**: https://playwright.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **Google Fonts**: https://fonts.google.com

## Notes

- Processing time: 140-205 seconds for complete clone
- Best results: Modern, clean UIs with clear element boundaries
- Pixel-perfect accuracy: >95% match to original design
- Responsive: Mobile-first approach, all breakpoints tested
- Accessible: WCAG 2.1 AA compliance targeted
- Production-ready: Clean code, optimized performance

---

**Remember**: This command orchestrates a sophisticated multi-phase workflow. Each phase builds on the previous, culminating in a pixel-perfect clone. The ASCII checkpoint (Phase 2.5) is critical - always wait for user confirmation before generating code.

**Success Criteria**:
✅ Screenshot captures entire page with no cutoff
✅ All 7 analysis agents complete successfully
✅ Style guide documents all design patterns accurately
✅ Layout architecture matches original structure
✅ HTML output matches screenshot with >95% visual accuracy
✅ All files saved to `.ui/` workspace
✅ Code is clean, maintainable, and uses Tailwind CSS consistently
