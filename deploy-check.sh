#!/bin/bash

# Housemate Deployment Script
# This script helps prepare and deploy the application

echo "🚀 Housemate Deployment Helper"
echo "==============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
    echo "✅ Git repository initialized"
fi

# Check for .env files
echo ""
echo "🔍 Checking environment configuration..."

if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found!"
    echo "📝 Please create backend/.env with your production values"
    echo "   Example: DB_HOST, DB_USER, DB_PASSWORD, JWT_SECRET, etc."
fi

if [ ! -f "frontend/.env.production" ]; then
    echo "⚠️  Frontend production env not found!"
    echo "📝 Please update frontend/.env.production with your backend URL"
fi

# Check package.json scripts
echo ""
echo "📦 Verifying build scripts..."

# Backend check
cd backend
if npm run --silent start --dry-run >/dev/null 2>&1; then
    echo "✅ Backend scripts configured correctly"
else
    echo "❌ Backend scripts need attention"
fi

cd ../frontend
if npm run --silent build --dry-run >/dev/null 2>&1; then
    echo "✅ Frontend build script configured correctly"
else
    echo "❌ Frontend build script needs attention"
fi

cd ..

echo ""
echo "🎯 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. 📤 Push code to GitHub: git add . && git commit -m 'Deploy ready' && git push"
echo "2. 🚂 Deploy backend to Railway: https://railway.app"
echo "3. ⚡ Deploy frontend to Vercel: https://vercel.com"
echo "4. 🌐 Configure custom domain"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"