# Clone Website Command

You are helping to create a pixel-perfect clone of a website using automated screenshot capture, CSS extraction, and AI-powered design recreation.

## Workspace
All files will be saved to `.ui/` directory in project root:
- Screenshots: `.ui/screenshots/`
- Extracted CSS: `.ui/extracted-css/`
- Style guides: `.ui/{style-name}-style-guide.md`
- HTML output: `.ui/{style-name}.html`

## Input Arguments
Extract from user input:
- **URL**: The website URL to clone (required)
- **Style Name**: Optional custom name (default: extract from domain, e.g., "linear-app" from "https://linear.app")

## Workflow Steps

### Step 1: Setup Workspace
```bash
# Create .ui directories if they don't exist
mkdir -p .ui/screenshots .ui/extracted-css
```

### Step 2: Install Screenshot Tool (First Time Only)
Check if shot-scraper is installed:
```bash
if ! command -v shot-scraper &> /dev/null; then
    echo "Installing shot-scraper..."
    pip3 install shot-scraper
    shot-scraper install
    echo "✅ shot-scraper installed successfully"
else
    echo "✅ shot-scraper already installed"
fi
```

### Step 3: Extract Style Name and Generate Timestamp
```bash
# Extract domain from URL for style name
STYLE_NAME=$(echo "$URL" | sed -E 's|https?://([^/]+).*|\1|' | tr '.' '-')
TIMESTAMP=$(date +%Y-%m-%d-%H%M%S)

echo "🎨 Cloning website: $URL"
echo "📝 Style name: $STYLE_NAME"
echo "⏰ Timestamp: $TIMESTAMP"
```

### Step 4: Capture Full-Page Screenshot
```bash
echo "📸 Capturing full-page screenshot..."

shot-scraper screenshot "$URL" \
  --output ".ui/screenshots/${STYLE_NAME}-${TIMESTAMP}.png" \
  --width 1920 \
  --wait 3000 \
  --quality 90

if [ $? -eq 0 ]; then
    echo "✅ Screenshot saved: .ui/screenshots/${STYLE_NAME}-${TIMESTAMP}.png"
else
    echo "❌ Screenshot failed. Please check the URL and try again."
    exit 1
fi
```

### Step 5: Extract CSS from Website
```bash
echo "🎨 Extracting CSS..."

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
        # Remove leading slash if present
        css_url=$(echo "$css_url" | sed 's|^/||')
        # Extract base URL
        base_url=$(echo "$URL" | sed -E 's|(https?://[^/]+).*|\1|')
        full_url="${base_url}/${css_url}"
    fi

    echo "  Fetching: $full_url"
    curl -sL "$full_url" >> "$CSS_FILE" 2>/dev/null
    echo "" >> "$CSS_FILE"  # Add newline between CSS files
done

# Clean up temp file
rm -f "/tmp/temp-${STYLE_NAME}.html"

if [ -s "$CSS_FILE" ]; then
    echo "✅ CSS extracted: $CSS_FILE"
else
    echo "⚠️  Warning: No CSS extracted (site may use inline styles or JS-generated CSS)"
fi
```

### Step 6: Generate Style Guide
Now invoke the `/ui:style-guide` command with the following context:

**Screenshot**: `.ui/screenshots/${STYLE_NAME}-${TIMESTAMP}.png`
**Extracted CSS**: `.ui/extracted-css/${STYLE_NAME}-${TIMESTAMP}.css`
**Output**: `.ui/${STYLE_NAME}-style-guide.md`

You need to:
1. Read and analyze the screenshot image
2. Read and parse the extracted CSS file
3. Generate a comprehensive style guide that includes:
   - **Overview**: Brief description of the design style
   - **Color Palette**: Primary, secondary, accent colors with hex codes
   - **Typography**: Font families, sizes, weights, line heights
   - **Spacing System**: Margin and padding patterns (4px, 8px, 16px, etc.)
   - **Component Styles**: Buttons, cards, inputs, navigation
   - **Shadows & Elevation**: Box shadow patterns
   - **Animations & Transitions**: Timing and easing functions
   - **Border Radius**: Sharp corners (0px) vs rounded (8px, 16px, etc.)
   - **Opacity & Transparency**: Alpha values used
   - **Common Tailwind CSS Usage**: Map CSS patterns to Tailwind classes
   - **Example Component Reference**: Code snippets showing key components

Save the style guide to: `.ui/${STYLE_NAME}-style-guide.md`

### Step 7: Generate Pixel-Perfect HTML
Now invoke the `/ui:design` command with the following context:

**Screenshot Reference**: `.ui/screenshots/${STYLE_NAME}-${TIMESTAMP}.png`
**Style Guide**: `.ui/${STYLE_NAME}-style-guide.md`
**Extracted CSS**: `.ui/extracted-css/${STYLE_NAME}-${TIMESTAMP}.css`
**Output**: `.ui/${STYLE_NAME}.html`

You need to:
1. Carefully analyze the screenshot to understand:
   - Overall layout structure (header, hero, sections, footer)
   - Component hierarchy and nesting
   - Responsive behavior hints (mobile menu, grid layouts)
   - Interactive elements (buttons, links, forms)
   - Content organization and typography usage

2. Follow the style guide EXACTLY:
   - Use the exact color palette (no variations)
   - Use the exact fonts (family, size, weight)
   - Use the exact spacing values
   - Use the exact border radius values
   - Use the exact shadow patterns

3. Generate a single HTML file with:
   - Complete HTML5 structure (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)
   - Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
   - Lucide icons if needed (`<script src="https://unpkg.com/lucide@latest"></script>`)
   - Google Fonts links if custom fonts are used
   - Inline styles only when Tailwind cannot express exact values
   - All content visible in the screenshot
   - Responsive design with mobile-first approach

4. Quality requirements:
   - Pixel-perfect accuracy (fonts, colors, spacing, borders)
   - No placeholder content - use real text from screenshot
   - No placeholder images - use actual image URLs or Unsplash
   - Fully functional (interactive elements work)
   - Clean, readable code with proper indentation
   - No CSS classes - use Tailwind utility classes only

Save the HTML file to: `.ui/${STYLE_NAME}.html`

### Step 8: Validation Report
After generating the HTML, provide a validation summary:

```
✅ Clone Website Complete!

📁 Files Created:
  - Screenshot: .ui/screenshots/${STYLE_NAME}-${TIMESTAMP}.png
  - CSS: .ui/extracted-css/${STYLE_NAME}-${TIMESTAMP}.css
  - Style Guide: .ui/${STYLE_NAME}-style-guide.md
  - HTML: .ui/${STYLE_NAME}.html

🔍 Validation Checklist:
  [ ] All colors match the original design
  [ ] All fonts match (family, size, weight)
  [ ] Spacing and padding are accurate
  [ ] Border radius values are correct
  [ ] Shadows and elevation match
  [ ] Responsive design implemented
  [ ] Interactive elements are functional

📝 Next Steps:
  1. Open .ui/${STYLE_NAME}.html in your browser
  2. Compare side-by-side with the screenshot
  3. If adjustments needed, provide specific feedback
  4. Iterate until pixel-perfect ✨
```

## Example Usage

```
/ui:clone-website https://linear.app
```

This will:
1. Create `.ui/screenshots/linear-app-2025-11-02-143022.png`
2. Extract CSS to `.ui/extracted-css/linear-app-2025-11-02-143022.css`
3. Generate `.ui/linear-app-style-guide.md`
4. Create `.ui/linear-app.html`

## Error Handling

If any step fails:
- **Screenshot fails**: Check URL accessibility, network connection
- **CSS extraction fails**: Site may use JS-generated CSS (acceptable, proceed with screenshot only)
- **Style guide generation fails**: Ensure screenshot and CSS files exist
- **HTML generation fails**: Review error, may need manual intervention

## Tips for Best Results

1. **For complex sites**: Start with the homepage, then clone individual sections
2. **For dynamic content**: Screenshot may capture one state; HTML should reflect that exact state
3. **For responsive sites**: Primary screenshot is desktop (1920px), can add mobile variants
4. **For sites with animations**: Document animation behavior in style guide, implement with CSS transitions
5. **For sites with custom fonts**: Ensure Google Fonts links are included or use system font fallbacks

## Success Criteria

✅ Screenshot captures entire page with no cutoff
✅ CSS extraction includes inline and external stylesheets
✅ Style guide documents all design patterns accurately
✅ HTML matches screenshot with >95% visual accuracy
✅ All files saved to `.ui/` workspace
✅ Code is clean, maintainable, and uses Tailwind CSS
