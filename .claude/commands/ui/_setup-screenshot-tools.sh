#!/bin/bash
# One-time setup for screenshot tools used by /ui:clone-website command

echo "🚀 Setting up screenshot tools for UI cloning..."
echo ""

# Check if pip3 is available
if ! command -v pip3 &> /dev/null; then
    echo "❌ Error: pip3 is not installed"
    echo "Please install Python 3 and pip3 first"
    exit 1
fi

# Install shot-scraper
echo "📦 Installing shot-scraper..."
pip3 install shot-scraper

if [ $? -ne 0 ]; then
    echo "❌ Failed to install shot-scraper"
    exit 1
fi

echo "✅ shot-scraper installed successfully"
echo ""

# Initialize shot-scraper browsers
echo "🌐 Initializing shot-scraper browsers..."
shot-scraper install

if [ $? -ne 0 ]; then
    echo "❌ Failed to initialize browsers"
    exit 1
fi

echo "✅ Browsers initialized successfully"
echo ""

# Create .ui workspace if it doesn't exist
echo "📁 Creating .ui workspace..."
mkdir -p .ui/screenshots
mkdir -p .ui/extracted-css

echo "✅ Workspace created at: .ui/"
echo ""

# Test shot-scraper
echo "🧪 Testing shot-scraper..."
shot-scraper screenshot "https://example.com" --output ".ui/screenshots/test.png" --width 800 --wait 1000 --quality 80

if [ $? -eq 0 ]; then
    echo "✅ Test screenshot successful!"
    echo "   Saved to: .ui/screenshots/test.png"
    rm -f .ui/screenshots/test.png
    echo "   (test file removed)"
else
    echo "⚠️  Test screenshot failed, but tools are installed"
    echo "   This may be due to network issues or browser setup"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "📖 Usage:"
echo "   /ui:clone-website https://example.com"
echo ""
echo "📁 All files will be saved to .ui/ directory:"
echo "   - Screenshots: .ui/screenshots/"
echo "   - Extracted CSS: .ui/extracted-css/"
echo "   - Style guides: .ui/{name}-style-guide.md"
echo "   - HTML output: .ui/{name}.html"
echo ""
