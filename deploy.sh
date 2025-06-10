#!/bin/bash

# Luxe-Shop Deployment Script for Vercel
echo "🚀 Luxe-Shop Deployment Preparation"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Initializing..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
else
    echo "✅ Git repository found"
fi

# Check if vercel.json exists
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json configuration found"
else
    echo "❌ vercel.json not found. Please ensure it exists."
    exit 1
fi

# Check if client directory exists
if [ -d "client" ]; then
    echo "✅ Client directory found"
else
    echo "❌ Client directory not found"
    exit 1
fi

# Check if server.js exists
if [ -f "server.js" ]; then
    echo "✅ server.js found"
else
    echo "❌ server.js not found"
    exit 1
fi

# Install dependencies
echo "📦 Installing backend dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
cd client && npm install && cd ..

# Test build locally (optional)
echo "🔨 Testing frontend build..."
cd client && npm run build && cd ..

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for Vercel deployment'"
echo "   git push origin main"
echo ""
echo "2. Go to https://vercel.com"
echo "3. Import your GitHub repository"
echo "4. Add environment variables:"
echo "   - MONGODB_URI"
echo "   - JWT_SECRET"
echo "   - NODE_ENV=production"
echo "   - CLIENT_URL"
echo ""
echo "5. Deploy!"
echo ""
echo "🎉 Your app will be live at: https://your-app-name.vercel.app"
