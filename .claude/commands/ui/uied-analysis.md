---
description: Analyze UI screenshots and website layouts using UIED (UI Element Detection) to detect and classify text and graphical elements
tags: [ui, analysis, detection, ocr, computer-vision]
---

# UI Analysis Command

Analyze UI screenshots and website layouts using UIED (UI Element Detection) - a hybrid computer vision-based system that detects and classifies text and graphical UI elements.

## What This Does

This command uses the UIED repository to:
- Detect and localize UI elements (buttons, images, text, input fields, etc.)
- Extract text content via OCR
- Classify graphical components
- Export structured JSON with element positions and metadata
- Generate annotated images showing detected elements

## Setup (First Time Only)

### 1. Initialize UIED Submodule

The UIED repository is included as a git submodule in `.claude/tools/UIED`.

```bash
# Initialize and update the submodule (if not already done)
git submodule update --init --recursive
```

### 2. Install Dependencies

```bash
pip install opencv-python pandas numpy requests paddleocr
```

### 3. Configure OCR (Choose One)

**Option A: PaddleOCR (Recommended - Free, Offline)**
- Already installed in step 2
- Works offline, no API key needed
- Good accuracy for most use cases

**Option B: Google Cloud Vision (More Accurate, Costs Money)**
1. Get API key from https://cloud.google.com/vision
2. Edit `.claude/tools/UIED/detect_text/ocr.py` line 28 to add your key
3. Note: Google OCR costs money after free tier

### 4. Verify Installation

```bash
cd .claude/tools/UIED
python run_single.py
# Should process data/input/497.jpg and create output
cd ../../..  # Return to project root
```

## Usage

I'll help you analyze UI screenshots using UIED and recreate them pixel-perfectly. Here's what I need from you:

### Single Image Analysis
Provide:
1. **Path to screenshot** (e.g., `./screenshots/app.png`)
2. **UI type** (mobile/web/custom)
3. **Output directory** (optional, defaults to `./uied-output`)

### Batch Analysis
Provide:
1. **Directory with screenshots**
2. **UI type** (mobile/web/custom)
3. **Output directory** (optional)

### Pixel-Perfect Recreation
After analysis, I can recreate the UI using:
1. **UIED component positions** (for exact placement)
2. **Original image visual design** (for accurate styling)
3. This ensures the recreation matches the original layout AND design

### Custom Parameters
If you want to fine-tune detection:
- `min-grad`: Gradient threshold (lower = more details)
- `min-ele-area`: Minimum element area in pixels
- `merge-contained-ele`: Whether to merge nested elements
- `max-word-inline-gap`: Word grouping threshold
- `max-line-gap`: Paragraph detection threshold

## Analysis Process

When you provide a UI screenshot, I will:

### 1. Setup Check

```bash
# Verify UIED submodule is initialized
if [ ! -d ".claude/tools/UIED/detect_compo" ]; then
  echo "⚠️ UIED submodule not initialized."
  echo "Run: git submodule update --init --recursive"
  exit 1
fi

# Verify dependencies
python -c "import cv2, pandas, numpy" 2>/dev/null || {
  echo "❌ Missing dependencies. Run: pip install opencv-python pandas numpy paddleocr"
  exit 1
}
```

### 2. Prepare Parameters

```bash
# Set parameters based on UI type
if [ "$UI_TYPE" == "mobile" ]; then
  MIN_GRAD=4
  MIN_AREA=50
  MAX_WORD_GAP=6
  MAX_LINE_GAP=1
elif [ "$UI_TYPE" == "web" ]; then
  MIN_GRAD=3
  MIN_AREA=25
  MAX_WORD_GAP=4
  MAX_LINE_GAP=4
else
  # Custom parameters from user
  MIN_GRAD=${CUSTOM_MIN_GRAD:-4}
  MIN_AREA=${CUSTOM_MIN_AREA:-50}
  MAX_WORD_GAP=${CUSTOM_WORD_GAP:-6}
  MAX_LINE_GAP=${CUSTOM_LINE_GAP:-1}
fi
```

### 3. Create Analysis Script

I'll create a Python script that uses the UIED submodule:

```python
#!/usr/bin/env python
import sys
import os
import json
from pathlib import Path

# Add UIED submodule to path
UIED_PATH = Path(__file__).parent.parent / '.claude' / 'tools' / 'UIED'
sys.path.insert(0, str(UIED_PATH))

# Import UIED modules
from detect_compo import ip_region_proposal as ip
from detect_text import text_detection as text
from detect_merge import merge

def analyze_ui(input_path, output_dir, params):
    """Analyze UI screenshot and return structured results"""

    # Create output directory
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    # Run detection pipelines
    print("🔍 Detecting text elements...")
    text.text_detection(input_path, output_dir, method='paddle', show=False)

    print("🎨 Detecting graphical components...")
    ip.compo_detection(input_path, output_dir, params, show=False)

    print("🔗 Merging results...")
    input_name = Path(input_path).stem
    compo_path = os.path.join(output_dir, 'ip', f'{input_name}.json')
    ocr_path = os.path.join(output_dir, 'ocr', f'{input_name}.json')

    merge.merge(input_path, compo_path, ocr_path, output_dir,
                is_paragraph=params.get('merge-line-to-paragraph', False),
                is_remove_bar=params.get('remove-bar', True))

    # Read merged results
    merge_path = os.path.join(output_dir, 'merge', f'{input_name}.json')
    with open(merge_path, 'r') as f:
        results = json.load(f)

    return results, merge_path

def summarize_results(results, image_path):
    """Generate human-readable summary of detection results"""
    compos = results.get('compos', [])

    # Count element types
    text_elements = [c for c in compos if c.get('class') == 'Text']
    graphical_elements = [c for c in compos if c.get('class') != 'Text']

    print("\n" + "="*60)
    print(f"📊 UI Analysis Results for: {Path(image_path).name}")
    print("="*60)
    print(f"\n✅ Total Elements Detected: {len(compos)}")
    print(f"   📝 Text Elements: {len(text_elements)}")
    print(f"   🎨 Graphical Components: {len(graphical_elements)}")

    if text_elements:
        print(f"\n📝 Text Content Found:")
        for i, text_el in enumerate(text_elements[:10], 1):  # Show first 10
            content = text_el.get('content', 'N/A')
            pos = text_el.get('position', {})
            print(f"   {i}. \"{content}\" at ({pos.get('column_min', 0)}, {pos.get('row_min', 0)})")
        if len(text_elements) > 10:
            print(f"   ... and {len(text_elements) - 10} more text elements")

    print(f"\n🎨 Component Distribution:")
    # Try to show component types if available
    component_types = {}
    for comp in graphical_elements:
        comp_type = comp.get('class', 'Unknown')
        component_types[comp_type] = component_types.get(comp_type, 0) + 1

    for comp_type, count in sorted(component_types.items(), key=lambda x: x[1], reverse=True):
        print(f"   {comp_type}: {count}")

    print("\n" + "="*60)

if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('input', help='Input image path')
    parser.add_argument('output', help='Output directory')
    parser.add_argument('--min-grad', type=int, default=4)
    parser.add_argument('--min-area', type=int, default=50)
    parser.add_argument('--max-word-gap', type=int, default=6)
    parser.add_argument('--max-line-gap', type=int, default=1)
    parser.add_argument('--merge-contained', action='store_true', default=True)
    parser.add_argument('--merge-paragraphs', action='store_true', default=False)
    parser.add_argument('--remove-bar', action='store_true', default=True)

    args = parser.parse_args()

    params = {
        'min-grad': args.min_grad,
        'ffl-block': 5,
        'min-ele-area': args.min_area,
        'merge-contained-ele': args.merge_contained,
        'merge-line-to-paragraph': args.merge_paragraphs,
        'remove-bar': args.remove_bar,
        'max-word-inline-gap': args.max_word_gap,
        'max-line-gap': args.max_line_gap
    }

    results, output_path = analyze_ui(args.input, args.output, params)
    summarize_results(results, args.input)

    print(f"\n📁 Full results saved to: {output_path}")
    print(f"🖼️  Annotated image: {output_path.replace('.json', '.jpg')}")
```

### 4. Run Analysis

I'll execute the analysis with your specified parameters and present the results in a clear, structured format.

## Output Structure

After analysis, you'll get:

```
{output-directory}/
├── ip/                     # Component detection results
│   ├── {image}.jpg        # Annotated with component boxes
│   └── {image}.json       # Component coordinates
├── ocr/                   # Text detection results
│   ├── {image}.png        # Annotated with text boxes
│   └── {image}.json       # Text content and positions
└── merge/                 # Combined results (USE THIS)
    ├── {image}.jpg        # Final annotated image
    └── {image}.json       # All elements unified
```

### JSON Format (merge/*.json)

```json
{
  "compos": [
    {
      "id": 0,
      "class": "Text",          // or "Compo" for graphical
      "content": "Button Text", // only for Text elements
      "height": 39,
      "width": 369,
      "position": {
        "column_min": 10,
        "row_min": 34,
        "column_max": 379,
        "row_max": 73
      }
    }
  ]
}
```

## Use Cases

### 1. Accessibility Audit
"Analyze this web page screenshot to identify all interactive elements and check if they have text labels"

### 2. UI Element Extraction
"Extract all buttons, inputs, and text from this mobile app screenshot for automated testing"

### 3. Design-to-Code
"Analyze this design mockup and list all UI components with their positions"

### 4. Batch Website Analysis
"Process all screenshots in the ./screenshots/ folder and generate a report of UI patterns used"

### 5. Element Hierarchy
"Show me the containment hierarchy of UI elements in this layout"

## Parameter Tuning Guide

### For Mobile Apps
- Use `min-grad: 4` (good balance)
- Use `min-ele-area: 50` (avoid tiny elements)
- Use `max-word-inline-gap: 6` (tight word grouping)

### For Web Pages
- Use `min-grad: 3` (finer details)
- Use `min-ele-area: 25` (detect smaller elements)
- Use `max-word-inline-gap: 4` (looser grouping)

### For Hand-Drawn UIs
- Use `min-grad: 10` (stronger edges)
- Use `min-ele-area: 100` (ignore noise)
- Disable `merge-contained-ele` (preserve all elements)

### If You Get Too Many Elements
- Increase `min-grad` (5-10)
- Increase `min-ele-area` (100+)
- Enable `merge-contained-ele`

### If You Miss Elements
- Decrease `min-grad` (2-3)
- Decrease `min-ele-area` (10-25)
- Disable `remove-bar` (keep all elements)

## Example Interactions

### Example 1: Basic Analysis
```
User: "Analyze ./screenshots/app.png using mobile settings"

Response: I'll analyze the mobile app screenshot using UIED.

[Runs analysis with mobile parameters]

📊 UI Analysis Results for: app.png
==================================================
✅ Total Elements Detected: 47
   📝 Text Elements: 23
   🎨 Graphical Components: 24

📝 Text Content Found:
   1. "Sign In" at (150, 45)
   2. "Email" at (50, 120)
   3. "Password" at (50, 180)
   ...

🎨 Component Distribution:
   Button: 8
   Input: 3
   Image: 13

📁 Full results: ./uied-output/merge/app.json
🖼️ Annotated image: ./uied-output/merge/app.jpg
```

### Example 2: Batch Analysis
```
User: "Process all images in ./web-screenshots/ folder"

Response: I'll batch process all screenshots in the directory.

[Creates batch script and processes all images]

✅ Processed 15 images
📊 Summary:
   - homepage.png: 52 elements
   - product.png: 38 elements
   - checkout.png: 41 elements
   ...

All results saved to ./uied-output/
```

### Example 3: Custom Parameters
```
User: "Analyze design.png but use min-grad=2 to catch fine details"

Response: I'll analyze with custom parameters for fine detail detection.

[Runs with custom min-grad=2]

📊 Detected 127 elements (more than default due to lower threshold)
⚠️ Note: Lower gradient threshold found more elements but may include some noise.
```

## Troubleshooting

### Error: "UIED submodule not initialized"
```bash
# Initialize the submodule
git submodule update --init --recursive
```

### Error: "Module not found"
```bash
# Install missing dependencies
pip install opencv-python pandas numpy paddleocr
```

### Error: "OCR failed"
- Make sure PaddleOCR is installed: `pip install paddleocr`
- Or configure Google Cloud Vision API in `.claude/tools/UIED/detect_text/ocr.py`

### Too Many/Few Elements Detected
- Use the parameter tuning guide above
- Try the interactive tuning tool in the UIED directory

### Slow Processing
- UIED processes ~5-10 seconds per image
- For faster results, use lower resolution images
- Disable OCR if only need component detection

## Advanced Usage

### Interactive Parameter Tuning
```bash
cd .claude/tools/UIED
python "run_testing(Used for Adjusting).py"
# Opens GUI with sliders to adjust parameters in real-time
# Find optimal parameters, then use them in the command
cd ../../..  # Return to project root
```

### Extract Specific Element Types
```python
# Parse JSON to get only buttons
import json
with open('output/merge/app.json') as f:
    data = json.load(f)

buttons = [c for c in data['compos']
           if 'button' in c.get('class', '').lower()]
```

### Generate Element Hierarchy
```python
# Build containment tree
def is_contained(inner, outer):
    return (inner['column_min'] >= outer['column_min'] and
            inner['column_max'] <= outer['column_max'] and
            inner['row_min'] >= outer['row_min'] and
            inner['row_max'] <= outer['row_max'])

def build_hierarchy(elements):
    tree = {}
    for el in elements:
        pos = el['position']
        # Check which elements contain this one
        for parent in elements:
            if el != parent and is_contained(pos, parent['position']):
                tree.setdefault(parent['id'], []).append(el)
    return tree
```

## Integration with Other Commands

### With /ui/clone-website
```bash
# 1. Clone website screenshots
/ui/clone-website https://example.com

# 2. Analyze the screenshots
/ui/ui-analysis ./screenshots/ --type web
```

### With /ui/design
```bash
# 1. Analyze existing UI
/ui/ui-analysis app.png

# 2. Use results to inform new design
/ui/design "Create similar layout with modern styling"
```

## Notes

- **Processing Time**: ~5-10 seconds per image for full pipeline
- **Best Results**: Modern, clean UIs with clear element boundaries
- **OCR Accuracy**: PaddleOCR is good but Google Vision is more accurate (costs money)
- **Parameter Sensitivity**: Different UI types may need parameter adjustment
- **Output Size**: Each analysis generates ~3 images + 3 JSON files
- **Submodule Location**: `.claude/tools/UIED` (managed via git submodule)

## Resources

- **UIED Repository**: https://github.com/MulongXie/UIED
- **Research Paper**: [UIED: a hybrid tool for GUI element detection](https://dl.acm.org/doi/10.1145/3368089.3417940)
- **Google Cloud Vision**: https://cloud.google.com/vision (for OCR API key)
- **PaddleOCR**: https://github.com/PaddlePaddle/PaddleOCR (free OCR alternative)
