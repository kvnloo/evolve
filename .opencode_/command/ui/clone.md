---
description: Clone any website with pixel-perfect accuracy using intelligent capture, parallel analysis, and iterative generation
agent: ui-agent
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

rm -f "/tmp/temp-${STYLE_NAME}.html"
```

## Phase 2: Parallel Analysis (30-45s)

**Execute in SINGLE message using Claude Code's Task tool**

Spawn 7 concurrent agents with full instructions - see full clone.md for detailed agent tasks.

## Phase 3: Sequential Synthesis (15-20s)

After all 7 agents complete, synthesize findings into:
1. Unified style guide
2. Layout architecture with HTML structure

## Phase 2.5: ASCII Layout Checkpoint (5s)

**CRITICAL: Output ASCII layout to user and wait for confirmation**

## Phase 4: Iterative Generation (60-90s)

After user confirms layout:

### Cycle 1: Structure (HTML Semantic Layout)
Generate clean semantic HTML5 structure

### Cycle 2: Styling (Tailwind CSS with Design Tokens)
Apply exact design system from style guide

### Cycle 3: Polish (Interactions, Animations, Responsive)
Add interactions, animations, and responsive behavior

## Output Quality Standards

See full documentation in original clone.md for:
- HTML/Tailwind output rules
- Component standards
- Technical requirements
- Design preferences
- Performance expectations

## Resources

- **UIED Repository**: https://github.com/MulongXie/UIED
- **Shot-scraper**: https://github.com/simonw/shot-scraper
- **Playwright**: https://playwright.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **Google Fonts**: https://fonts.google.com
