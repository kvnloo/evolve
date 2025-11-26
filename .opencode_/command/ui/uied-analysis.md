---
description: Analyze UI screenshots using UIED (UI Element Detection) for component extraction and layout analysis
agent: ui-agent
tags: [ui, analysis, detection, ocr, computer-vision, uied]
permissions:
  bash: python  # Required for UIED Python tools
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

### Custom Parameters
Fine-tune detection:
- `min-grad`: Gradient threshold (lower = more details)
- `min-ele-area`: Minimum element area in pixels
- `merge-contained-ele`: Whether to merge nested elements
- `max-word-inline-gap`: Word grouping threshold
- `max-line-gap`: Paragraph detection threshold

## Analysis Process

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

### 2. Run UIED Analysis

```bash
cd .claude/tools/UIED
python run_single.py \
  --input "../../../screenshots/app.png" \
  --output "../../../uied-output" \
  --min-grad 3 \
  --min-area 25
cd ../../..
```

## Output Structure

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

## Troubleshooting

### Error: "UIED submodule not initialized"
```bash
git submodule update --init --recursive
```

### Error: "Module not found"
```bash
pip install opencv-python pandas numpy paddleocr
```

### Error: "OCR failed"
- Make sure PaddleOCR is installed: `pip install paddleocr`
- Or configure Google Cloud Vision API in `.claude/tools/UIED/detect_text/ocr.py`

### Too Many/Few Elements Detected
- Use the parameter tuning guide above
- Try the interactive tuning tool in the UIED directory

## Resources

- **UIED Repository**: https://github.com/MulongXie/UIED
- **Research Paper**: [UIED: a hybrid tool for GUI element detection](https://dl.acm.org/doi/10.1145/3368089.3417940)
- **Google Cloud Vision**: https://cloud.google.com/vision
- **PaddleOCR**: https://github.com/PaddlePaddle/PaddleOCR
