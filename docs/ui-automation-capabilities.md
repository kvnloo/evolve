# UI Automation Capabilities for AI/ML Experiment Visualization

## Executive Summary

The evolve workspace provides sophisticated UI automation capabilities through `/ui:clone`, `/ui:uied-analysis`, and superdesign integration. These tools enable rapid creation of experiment monitoring dashboards, result visualizations, and interactive research documentation in 2-5 minutes vs hours of manual development.

**Key Capabilities**:
- **Pixel-perfect website cloning** in 140-205 seconds
- **Computer vision-based UI analysis** with UIED
- **Automated dashboard generation** from text descriptions
- **Single-file HTML output** with zero dependencies
- **Real-time metric visualization** with Chart.js integration

---

## Core UI/Design Tools

### 1. UI Cloning System (`/ui:clone`)

**Purpose**: Clone any website with pixel-perfect accuracy using automated capture and parallel AI analysis.

#### Multi-Phase Workflow

**Phase 1: Intelligent Capture (30-45s)**
```bash
# Automatic viewport detection based on site type
- Static sites: Desktop only (1920x1080)
- Dynamic sites: Desktop + Mobile (1920x1080, 375x667)
- Immersive sites: Desktop + Tablet + Mobile

# Features:
- Multi-viewport screenshots
- CSS and resource extraction
- Screenshot deduplication (perceptual hashing)
- Intelligent caching for faster re-runs
```

**Phase 2: Parallel Analysis (30-45s)**

7 concurrent AI agents analyze different aspects:

1. **Structural Analyzer** - UIED component detection, positions, hierarchy
2. **Color Analyst** - Complete color palette extraction, Tailwind mapping
3. **Typography Analyst** - Font families, sizes, weights, heading hierarchy
4. **Spacing Analyst** - Padding, margins, grid systems, spacing scale
5. **Shadow Analyst** - Elevation patterns, shadow levels, Tailwind classes
6. **Border Analyst** - Radius values, border styles, patterns
7. **Component Classifier** - Component types, variants, interaction states

**Phase 3: Sequential Synthesis (15-20s)**
- Consolidate findings into unified design system
- Generate comprehensive style guide
- Plan layout architecture and component hierarchy

**Phase 2.5: ASCII Checkpoint (5s)**
- Visual layout confirmation before code generation
- User feedback opportunity

**Phase 4: Iterative Generation (60-90s)**
- 3-cycle refinement for pixel-perfect output
- Cycle 1: Semantic HTML structure
- Cycle 2: Tailwind styling with design tokens
- Cycle 3: Interactions, animations, responsive behavior

**Total Time**: 140-205 seconds (2.8-3.6x faster than sequential)

#### Usage Examples

```bash
# Simple clone
/ui:clone https://linear.app

# Advanced with options
/ui:clone https://example.com --viewports desktop,mobile --type dynamic --iterations 5

# Clone ML platform for reference
/ui:clone https://wandb.ai
/ui:clone https://tensorboard.dev
```

#### Output Quality Standards

- **>95% visual accuracy** to original design
- **Semantic HTML5** with proper heading hierarchy
- **Tailwind CSS** for all styling (no custom CSS files)
- **Responsive design** with mobile-first approach
- **Accessible** with ARIA labels and proper landmarks
- **Single-file output** with embedded styles

---

### 2. UIED Analysis (`/ui:uied-analysis`)

**Purpose**: Computer vision-based UI element detection and classification for structural analysis.

#### Capabilities

- **Element Detection**: Buttons, images, text fields, inputs, icons
- **OCR Integration**: PaddleOCR (free, offline) or Google Cloud Vision (accurate, paid)
- **Component Classification**: Automatic categorization of UI elements
- **Position Extraction**: Precise bounding boxes with pixel coordinates
- **Hierarchy Detection**: Parent-child relationships and nesting

#### Output Format

```json
{
  "compos": [
    {
      "id": 0,
      "class": "Text",
      "content": "Sign In Button",
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

#### Parameter Tuning

**For Mobile Apps**:
- `min-grad: 4` (good balance)
- `min-ele-area: 50` (avoid tiny elements)
- `max-word-inline-gap: 6` (tight word grouping)

**For Web Pages**:
- `min-grad: 3` (finer details)
- `min-ele-area: 25` (detect smaller elements)
- `max-word-inline-gap: 4` (looser grouping)

**Too Many Elements?** → Increase `min-grad` (5-10), increase `min-ele-area` (100+)
**Missing Elements?** → Decrease `min-grad` (2-3), decrease `min-ele-area` (10-25)

---

### 3. Superdesign Integration

**Purpose**: Systematic UI design workflow with guided theme generation.

#### 4-Step Workflow

**Step 1: Layout Design**
```
Output: ASCII wireframe showing component organization
Example:
┌─────────────────────────────────────┐
│           HEADER (Fixed)            │
│  Logo | Nav Links | CTA Button      │
├─────────────────────────────────────┤
│              HERO                   │
│    Heading | Subheading | CTA       │
├─────────────────────────────────────┤
│            FEATURES                 │
│   [Card 1] [Card 2] [Card 3]        │
└─────────────────────────────────────┘
```

**Step 2: Theme Design**
```bash
# Uses generateTheme tool to create CSS
- Color palette (primary, secondary, neutral, accent)
- Typography (font families, sizes, weights)
- Spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Shadow system (subtle, medium, high elevation)
- Border radius (sharp, rounded, pill, circle)
```

**Step 3: Core Animation Design**
```
- Transitions (150ms buttons, 300ms modals)
- Hover effects (scale, opacity, color shifts)
- Scroll animations (fade-in-up on intersection)
- State changes (smooth transitions between states)
```

**Step 4: HTML Generation**
```html
<!-- Single-file output with embedded styles -->
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
</head>
<body class="font-sans antialiased">
    <!-- Pixel-perfect implementation -->
</body>
</html>
```

#### Theme System Examples

**Modern Dark Mode** (Linear/Vercel/Stripe style):
- Backgrounds: Gray 900-950
- Text: White with gray-400 for secondary
- Accents: Blue-500, purple-500 for highlights
- Shadows: Subtle with low opacity
- Fonts: Inter, Poppins for headings
- Radius: Rounded-lg (12px) for modern feel

**Neo-Brutalism** (90s Web Aesthetic):
- Bold primary colors: Orange-500, blue-800
- Thick borders: 4px solid black
- No border radius (sharp corners)
- High contrast: Black/white base
- Fonts: DM Sans, Space Mono
- Shadows: Heavy drop shadows (4px offset, black)

---

## AI/ML Experiment Visualization Patterns

### Dashboard Template: Experiment Monitoring

**Use Case**: Real-time neural network training dashboard

**Components**:

1. **Metrics Panel**
   - Real-time loss and accuracy charts (Chart.js line graphs)
   - Epoch counter and progress bar
   - Current metric values in large text
   - Metric history table (last 10 epochs)

2. **Hyperparameter Display**
   - Current configuration table (learning rate, batch size, etc.)
   - Editable sliders for live hyperparameter tuning
   - Reset to default button
   - Configuration export (JSON download)

3. **Model Architecture View**
   - Visual network diagram (layers, connections)
   - Layer configuration details (units, activation, dropout)
   - Parameter count summary
   - Model complexity metrics

4. **Data Pipeline Status**
   - Dataset statistics (train/val/test split)
   - Batch processing progress bars
   - Data augmentation previews (image samples)
   - Class distribution charts

5. **Resource Monitoring**
   - GPU utilization graph (real-time)
   - Memory usage (GPU VRAM, system RAM)
   - Training time estimates (ETA to completion)
   - Historical resource usage trends

6. **Experiment Comparison**
   - Side-by-side metric comparison table
   - Statistical significance tests (t-test, ANOVA)
   - Best model highlighting (green borders)
   - Export comparison report (PDF)

**Design Specifications**:
```yaml
theme:
  mode: dark
  primary_color: blue-600
  background: gray-950
  card_background: gray-900
  text: white
  text_secondary: gray-400

typography:
  heading: "Poppins, sans-serif"
  body: "Inter, sans-serif"
  mono: "JetBrains Mono, monospace"  # For numeric data

layout:
  grid: "12-col desktop, 8-col tablet, 4-col mobile"
  spacing: "gap-6 (24px between cards)"
  container: "max-w-[1400px] mx-auto px-6"

interactions:
  hover: "scale-105, shadow-lg"
  transition: "duration-150 ease-out"
  focus: "ring-2 ring-blue-500"
```

**Generation Command**:
```bash
/ui:design "Create ML experiment dashboard with:
- Dark mode tech aesthetic
- Real-time loss/accuracy line charts (Chart.js)
- Hyperparameter grid with editable sliders
- Model architecture visualization (tree diagram)
- GPU/CPU resource monitoring graphs
- Experiment comparison table (side-by-side)
- Responsive grid layout (12-col desktop, 4-col mobile)
- Export buttons for results (PNG, PDF, JSON)"
```

**Estimated Generation Time**: 2-3 minutes

---

### Dashboard Template: A/B Test Comparison

**Use Case**: Compare multiple model variants with statistical analysis

**Layout**:
```
┌─────────────────────────────────────────────────────┐
│  Header: Experiment Comparison | Export | Settings  │
├─────────────────────────────────────────────────────┤
│  Filters: [Hyperparameter Dropdowns] [Date Range]  │
├──────────────────┬──────────────────────────────────┤
│  Model A         │  Model B         │  Model C      │
│  ┌────────────┐  │  ┌────────────┐  │  ┌─────────┐ │
│  │ Metrics    │  │  │ Metrics    │  │  │ Metrics │ │
│  │ Loss: 0.23 │  │  │ Loss: 0.19 │  │  │ Loss:   │ │
│  │ Acc: 94.2% │  │  │ Acc: 96.1% │  │  │ 95.3%   │ │
│  └────────────┘  │  └────────────┘  │  └─────────┘ │
│  ┌────────────┐  │  ┌────────────┐  │  ┌─────────┐ │
│  │ Training   │  │  │ Training   │  │  │ Training│ │
│  │ Curve      │  │  │ Curve      │  │  │ Curve   │ │
│  └────────────┘  │  └────────────┘  │  └─────────┘ │
├──────────────────┴──────────────────────────────────┤
│  Statistical Analysis:                              │
│  Best Model: Model B (p < 0.05, t-test)             │
│  Significance: ★★★ (highly significant)             │
│  Recommendation: Deploy Model B                     │
└─────────────────────────────────────────────────────┘
```

**Features**:
- Parallel model cards (grid layout)
- Synchronized chart zoom/pan
- Highlight best performing model (green accent border)
- Statistical significance indicators (★ ★ ★)
- Interactive filters (by hyperparameter, date range)
- Export comparison report (PDF with charts)

**Generation Command**:
```bash
/ui:design "Create A/B test comparison dashboard:
- Side-by-side model comparison cards (3 columns)
- Synchronized training curve charts
- Metric comparison table with color coding
- Statistical significance tests (t-test results)
- Best model highlighting (green border, larger)
- Filter controls (hyperparameters, date range)
- Export report button (PDF with all charts)
- Dark mode, professional business aesthetic"
```

---

### Dashboard Template: Research Results Documentation

**Use Case**: Interactive supplement for research papers

**Sections**:

1. **Abstract & Summary**
   - Collapsible abstract
   - Key findings (bullet points with icons)
   - TL;DR (one-sentence summary)

2. **Methodology**
   - Model architecture diagram
   - Dataset description (stats, samples)
   - Training procedure (pseudocode)
   - Hyperparameter table

3. **Results**
   - Interactive result tables (sortable, filterable)
   - Comparison charts (bar, line, scatter)
   - Statistical tests (ANOVA, t-test results)
   - Confidence intervals

4. **Ablation Studies**
   - Component contribution chart
   - Feature importance ranking
   - Sensitivity analysis graphs

5. **Visualizations**
   - Confusion matrix heatmap
   - ROC/AUC curves
   - Attention maps (if applicable)
   - Sample predictions (with ground truth)

6. **Appendix**
   - Full hyperparameter configurations
   - Training logs (collapsible)
   - Reproducibility checklist
   - Code/data availability links

**Design Style**: Academic/scientific (light mode default)
- Clean, minimal design
- Serif fonts for headings (Merriweather, Playfair Display)
- Sans-serif for body (Inter, Roboto)
- Blue/gray color palette
- Subtle shadows (shadow-sm)
- Ample whitespace

**Generation Command**:
```bash
/ui:design "Create research results documentation page:
- Light mode, academic aesthetic
- Serif fonts for headings (Merriweather)
- Collapsible sections (abstract, methodology)
- Interactive result tables (sortable, filterable)
- Statistical analysis charts (ANOVA, t-test)
- Confusion matrix heatmap
- ROC/AUC curve visualization
- Sample predictions gallery
- Reproducibility checklist
- Export to PDF button
- Responsive (mobile-friendly for reading on tablets)"
```

---

## Automation Workflows

### Workflow 1: Clone Existing Platform

**Scenario**: Need dashboard similar to Weights & Biases or TensorBoard

**Steps**:
```bash
# 1. Clone reference platform
/ui:clone https://wandb.ai

# 2. Review UIED analysis
# - Component structure exported to .ui/analysis/
# - Style guide in .ui/analysis/wandb-ai-style-guide.md

# 3. Customize theme
# - Adjust colors in style guide
# - Modify fonts for branding
# - Update component variants

# 4. Generate custom version
# - Use layout from UIED
# - Apply custom theme
# - Add project-specific features (custom metrics)

# 5. Export final HTML
# - Single file in .ui/output/
# - No dependencies (all CDN links)
# - Production-ready
```

**Time**: ~5 minutes
**Output**: Pixel-perfect dashboard matching reference with custom branding

---

### Workflow 2: Custom Dashboard from Scratch

**Scenario**: Unique experiment monitoring needs

**Steps**:
```bash
# 1. Define layout (superdesign workflow)
# Step 1: ASCII wireframe design
# Step 2: Theme generation (colors, fonts, spacing)
# Step 3: Animation design (transitions, hover states)
# Step 4: HTML generation

# 2. Integrate real-time data
# - Add WebSocket connection for live metrics
# - Implement Chart.js for dynamic charts
# - LocalStorage for user preferences

# 3. Test responsiveness
# - Verify mobile layout (hamburger menu, stacked cards)
# - Check tablet view (8-col grid)
# - Desktop optimization (12-col grid)

# 4. Deploy
# - Single HTML file (no build process)
# - Host on GitHub Pages
# - Or integrate into experiment tracking backend
```

**Time**: ~3-5 minutes for initial version, ~10-15 minutes with refinements

---

### Workflow 3: Batch Result Visualization

**Scenario**: Visualize results from 10+ experiment runs

**Steps**:
```bash
# 1. Design result card template
/ui:design "Single experiment result card with:
- Metric summary (loss, accuracy, F1)
- Hyperparameter display
- Training curve thumbnail
- Model comparison badge (if best)"

# 2. Generate grid layout
# - Responsive grid (3-col desktop, 2-col tablet, 1-col mobile)
# - Filter controls (by metric, hyperparameter)
# - Sort controls (by loss, accuracy, timestamp)

# 3. Populate with experiment data
# - Read JSON results from experiments/
# - Generate cards dynamically with JavaScript
# - Highlight best models (green border)

# 4. Add batch export
# - Export selected results to CSV
# - Generate comparison report (PDF)
# - Download best model checkpoints
```

---

## Integration with SuperClaude Framework

### Command Routing for Visualization Tasks

**Triggers**:
```yaml
visualization_keywords:
  - "dashboard"
  - "chart"
  - "metrics"
  - "visualization"
  - "monitor"
  - "experiment ui"
  - "results page"

route_to:
  primary: /ui:design
  alternative: /ui:clone (if reference exists)

flags:
  - --orchestrate (enable parallel agents)
  - --delegate auto (intelligent agent selection)
  - --think-hard (deep analysis mode)
```

### Memory Coordination Pattern

**Store Experiment Configuration**:
```bash
# Store hyperparameters for dashboard display
npx claude-flow@alpha memory store experiment/config '{
  "model": "ResNet50",
  "learning_rate": 0.001,
  "batch_size": 32,
  "epochs": 100
}'
```

**Retrieve for Dashboard Generation**:
```bash
# Retrieve during UI generation
npx claude-flow@alpha memory query experiment
# Use retrieved config to populate dashboard
```

### Swarm Coordination for Complex Dashboards

**Multi-Agent Dashboard Construction**:
```javascript
// Initialize swarm for parallel component generation
mcp__claude-flow__swarm_init({ topology: "mesh", maxAgents: 5 });

// Spawn specialized agents (use Claude Code's Task tool)
Task("Chart Designer", "Design training curve charts with Chart.js", "designer")
Task("Table Designer", "Create metric comparison tables", "designer")
Task("Controls Designer", "Build interactive controls (sliders, filters)", "designer")
Task("Layout Architect", "Plan responsive grid layout", "system-architect")
Task("Integration Agent", "Assemble components into single HTML", "coder")

// TodoWrite for tracking
TodoWrite({
  todos: [
    {content: "Generate chart components", status: "in_progress", activeForm: "Generating charts"},
    {content: "Create metric tables", status: "pending", activeForm: "Creating tables"},
    {content: "Build filter controls", status: "pending", activeForm: "Building controls"},
    {content: "Design responsive layout", status: "pending", activeForm: "Designing layout"},
    {content: "Integrate all components", status: "pending", activeForm: "Integrating"}
  ]
});
```

**Performance**: 140-180 seconds for complex multi-component dashboard

---

## Technical Implementation Details

### Chart.js Integration

**Avoid Infinite Growth Bug**:
```html
<!-- WRONG: Canvas at same level as siblings -->
<div>
  <h2>Metrics</h2>
  <p>Training progress</p>
  <canvas id="chart"></canvas>  <!-- BUG: Infinite growth! -->
  <div>Other content</div>
</div>

<!-- CORRECT: Canvas wrapped in container -->
<div>
  <h2>Metrics</h2>
  <p>Training progress</p>
  <div class="chart-container">
    <canvas id="chart"></canvas>  <!-- Contained, no growth bug -->
  </div>
  <div>Other content</div>
</div>
```

**Complete Chart Example**:
```html
<div class="chart-container w-full h-80">
  <canvas id="trainingChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const ctx = document.getElementById('trainingChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: epochs,  // [1, 2, 3, ..., 100]
      datasets: [{
        label: 'Training Loss',
        data: lossValues,
        borderColor: 'rgb(59, 130, 246)',  // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,  // Smooth curves
        fill: true
      }, {
        label: 'Validation Loss',
        data: valLossValues,
        borderColor: 'rgb(239, 68, 68)',  // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Loss'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Epoch'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          cornerRadius: 8
        }
      }
    }
  });
</script>
```

### Responsive Grid System

**12-Column Grid with Breakpoints**:
```html
<!-- Responsive grid: 1-col mobile, 2-col tablet, 3-col desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="metric-card bg-gray-900 rounded-lg p-6 shadow-lg">
    <h3 class="text-lg font-semibold mb-2">Training Loss</h3>
    <p class="text-4xl font-bold text-blue-500">0.234</p>
    <p class="text-sm text-gray-400 mt-1">↓ 12.3% from previous epoch</p>
  </div>

  <div class="metric-card bg-gray-900 rounded-lg p-6 shadow-lg">
    <h3 class="text-lg font-semibold mb-2">Accuracy</h3>
    <p class="text-4xl font-bold text-green-500">94.2%</p>
    <p class="text-sm text-gray-400 mt-1">↑ 2.1% from baseline</p>
  </div>

  <div class="metric-card bg-gray-900 rounded-lg p-6 shadow-lg">
    <h3 class="text-lg font-semibold mb-2">F1 Score</h3>
    <p class="text-4xl font-bold text-purple-500">0.921</p>
    <p class="text-sm text-gray-400 mt-1">Best so far</p>
  </div>
</div>
```

### Real-time Updates with WebSocket

**Live Metric Streaming**:
```javascript
// Connect to experiment tracking backend
const ws = new WebSocket('ws://localhost:8080/metrics');

ws.onopen = () => {
  console.log('Connected to experiment tracker');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  // Update metric cards
  document.getElementById('loss-value').textContent = data.loss.toFixed(3);
  document.getElementById('accuracy-value').textContent =
    (data.accuracy * 100).toFixed(1) + '%';

  // Update charts
  trainingChart.data.labels.push(data.epoch);
  trainingChart.data.datasets[0].data.push(data.loss);
  trainingChart.data.datasets[1].data.push(data.val_loss);
  trainingChart.update('none');  // No animation for real-time

  // Update progress bar
  const progress = (data.epoch / data.total_epochs) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
  document.getElementById('connection-status').textContent = 'Disconnected';
  document.getElementById('connection-status').classList.add('text-red-500');
};

// Graceful cleanup
window.addEventListener('beforeunload', () => {
  ws.close();
});
```

### State Persistence with LocalStorage

**Save User Preferences**:
```javascript
// Theme preference
const theme = localStorage.getItem('theme') || 'dark';
document.documentElement.classList.toggle('dark', theme === 'dark');

// Chart settings
const chartConfig = {
  showGrid: localStorage.getItem('showGrid') !== 'false',
  smoothCurves: localStorage.getItem('smoothCurves') !== 'false',
  fillArea: localStorage.getItem('fillArea') === 'true'
};

// Filter state
const filters = JSON.parse(localStorage.getItem('filters') || '{}');
applyFilters(filters);

// Save on change
document.getElementById('theme-toggle').addEventListener('click', () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  location.reload();
});
```

---

## Best Practices for AI/ML Visualizations

### 1. Dark Mode for Tech UIs

**Why**: Reduces eye strain during long training runs, tech aesthetic

**Implementation**:
```html
<body class="bg-gray-950 text-white font-sans antialiased">
  <!-- Cards with subtle elevation -->
  <div class="bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
    <!-- Content -->
  </div>
</body>
```

**Color Palette**:
- Background: `gray-950` (#030712)
- Cards: `gray-900` (#111827)
- Borders: `gray-800` (#1F2937)
- Text: `white`
- Secondary text: `gray-400` (#9CA3AF)
- Accents: `blue-500`, `green-500`, `red-500`

### 2. Monospace Fonts for Numeric Data

**Why**: Consistent digit width for tabular data alignment

**Implementation**:
```html
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
</style>

<div class="font-mono text-2xl text-blue-500">
  0.234567  <!-- All digits same width -->
</div>

<table class="font-mono">
  <tr>
    <td>Epoch 1</td>
    <td>0.234</td>  <!-- Aligns perfectly -->
  </tr>
  <tr>
    <td>Epoch 2</td>
    <td>0.189</td>  <!-- With other rows -->
  </tr>
</table>
```

**Recommended Fonts**:
- JetBrains Mono (excellent for code/data)
- Fira Code (ligatures, modern)
- Source Code Pro (readable, classic)
- Roboto Mono (neutral, clean)

### 3. Color Coding for Status

**Why**: Instant visual feedback on metric trends

**Implementation**:
```html
<!-- Success (improving) -->
<span class="text-green-500">↑ 2.3%</span>

<!-- Error (degrading) -->
<span class="text-red-500">↓ 1.5%</span>

<!-- In Progress -->
<span class="text-blue-500">Training...</span>

<!-- Warning (stagnant) -->
<span class="text-yellow-500">⚠ No improvement for 5 epochs</span>

<!-- Neutral (baseline) -->
<span class="text-gray-400">Baseline: 0.450</span>
```

### 4. Responsive Design Patterns

**Why**: Access dashboards on mobile/tablet during experiments

**Mobile-First Grid**:
```html
<!-- Single column on mobile, expands to multi-column on larger screens -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <div class="card">Metric 1</div>
  <div class="card">Metric 2</div>
  <div class="card">Metric 3</div>
  <div class="card">Metric 4</div>
</div>
```

**Hamburger Menu for Mobile**:
```html
<!-- Mobile menu toggle -->
<button class="md:hidden" id="menu-toggle">
  <i data-lucide="menu"></i>
</button>

<!-- Navigation (hidden on mobile, visible on desktop) -->
<nav class="hidden md:flex items-center gap-4">
  <a href="#metrics">Metrics</a>
  <a href="#config">Config</a>
  <a href="#results">Results</a>
</nav>

<!-- Mobile menu (shown when toggled) -->
<div id="mobile-menu" class="hidden md:hidden fixed inset-0 bg-gray-900 z-50">
  <nav class="flex flex-col p-6 gap-4">
    <a href="#metrics">Metrics</a>
    <a href="#config">Config</a>
    <a href="#results">Results</a>
  </nav>
</div>
```

### 5. Export Options

**Why**: Share results in papers, presentations, reports

**PNG Export (Chart.js)**:
```javascript
// Download chart as PNG
function downloadChart() {
  const canvas = document.getElementById('trainingChart');
  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'training_curve.png';
  link.href = url;
  link.click();
}
```

**PDF Export (jsPDF)**:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script>
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text('Experiment Results', 20, 20);

  // Add metrics
  doc.setFontSize(12);
  doc.text(`Loss: ${loss}`, 20, 40);
  doc.text(`Accuracy: ${accuracy}%`, 20, 50);

  // Add chart (as image)
  const canvas = document.getElementById('trainingChart');
  const imgData = canvas.toDataURL('image/png');
  doc.addImage(imgData, 'PNG', 20, 60, 170, 100);

  // Save
  doc.save('experiment_results.pdf');
}
</script>
```

**JSON Export (Results Data)**:
```javascript
function exportResults() {
  const results = {
    experiment_id: 'exp_001',
    timestamp: new Date().toISOString(),
    hyperparameters: {
      learning_rate: 0.001,
      batch_size: 32,
      epochs: 100
    },
    metrics: {
      final_loss: 0.234,
      final_accuracy: 0.942,
      f1_score: 0.921
    },
    training_history: trainingData
  };

  const blob = new Blob([JSON.stringify(results, null, 2)],
    { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'experiment_results.json';
  link.href = url;
  link.click();
}
```

---

## Performance Benchmarks

| Task | Time | Description |
|------|------|-------------|
| **Simple Dashboard** | 60-90s | Single agent, basic metrics display |
| **Complex Dashboard** | 140-180s | 3-5 parallel agents, multi-component |
| **Website Clone** | 140-205s | Full UIED analysis, pixel-perfect recreation |
| **Theme Iteration** | 20-30s | Adjust colors/fonts, regenerate CSS |
| **Component Generation** | 10-15s | Single UI component (button, card, table) |
| **ASCII Layout** | 5-10s | Wireframe generation from UIED data |
| **HTML Export** | 15-20s | Final code generation and formatting |

**Speedup vs Manual Development**:
- Manual dashboard: ~2-4 hours
- Automated dashboard: ~2-3 minutes
- **Speed improvement**: 40-120x faster

---

## Conclusion

The UI automation capabilities in the evolve workspace transform experiment monitoring from manual HTML/CSS development into automated generation:

1. **Clone Reference Platforms**: Copy designs from W&B, TensorBoard in minutes
2. **Generate Custom Dashboards**: From text descriptions to production HTML
3. **Iterate Rapidly**: Theme/component adjustments in 20-30 seconds
4. **Export Zero-Dependency HTML**: Single file, all CDN links, no build process
5. **Integrate with Research**: Memory coordination for cross-agent communication

**Key Advantage**: Reduce dashboard creation from hours to minutes while maintaining pixel-perfect quality and production readiness.

**Next Steps**:
1. Clone a reference platform for initial layout
2. Customize theme for project branding
3. Add real-time WebSocket integration
4. Deploy to GitHub Pages or experiment backend
5. Iterate based on user feedback

**Resources**:
- `/ui:clone` command documentation
- `/ui:uied-analysis` for component detection
- Superdesign workflow guide
- Chart.js documentation: https://www.chartjs.org
- Tailwind CSS: https://tailwindcss.com
