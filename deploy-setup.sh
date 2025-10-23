#!/bin/bash

# Housemate Application Deployment Setup Script
# This script helps prepare your application for deployment

echo "🏠 Housemate Deployment Setup"
echo "==============================="

# Check if we're in the right directory
if [ ! -f "DEPLOYMENT.md" ]; then
    echo "❌ Please run this script from the Housemate root directory"
    exit 1
fi

echo "📋 Pre-deployment Checklist:"
echo ""

# Backend checks
echo "Backend Checks:"
if [ -f "backend/.env" ]; then
    echo "✅ Backend .env file exists"
else
    echo "⚠️  Backend .env file missing - copying from .env.example"
    cp backend/.env.example backend/.env
fi

if [ -f "backend/package.json" ]; then
    echo "✅ Backend package.json exists"
else
    echo "❌ Backend package.json missing"
fi

# Frontend checks  
echo ""
echo "Frontend Checks:"
if [ -f "frontend/.env.production" ]; then
    echo "✅ Frontend production env file exists"
else
    echo "⚠️  Frontend .env.production missing"
fi

if [ -f "frontend/package.json" ]; then
    echo "✅ Frontend package.json exists"
else
    echo "❌ Frontend package.json missing"
fi

echo ""
echo "🚀 Next Steps:"
echo "1. Update backend/.env with your production database credentials"
echo "2. Update frontend/.env.production with your backend URL"
echo "3. Push your code to GitHub"
echo "4. Follow the DEPLOYMENT.md guide for your chosen platform"
echo ""
echo "🔧 Quick Commands:"
echo "Backend dev: cd backend && npm run dev"
echo "Frontend dev: cd frontend && npm run dev"
echo "Backend build: cd backend && npm install"
echo "Frontend build: cd frontend && npm run build"
echo ""
echo "📖 Read DEPLOYMENT.md for detailed deployment instructions"