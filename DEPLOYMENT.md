# Housemate Application Deployment Guide

## Overview
This guide provides multiple deployment options for the Housemate application, which consists of:
- **Frontend**: React + Vite application
- **Backend**: Node.js + Express API server  
- **Database**: MySQL database

## Quick Start - Recommended: Railway (Full-Stack)

### Prerequisites
1. GitHub account
2. Railway account (free tier available)
3. Push your code to GitHub repository

### Railway Deployment Steps

#### 1. Deploy Backend + Database
1. Go to [Railway.app](https://railway.app)
2. Click "Start a New Project"
3. Connect your GitHub repository
4. Select your backend folder
5. Railway will automatically detect Node.js and deploy
6. Add a MySQL database service:
   - Click "New Service" → "Database" → "MySQL"
   - Railway provides a managed MySQL instance

#### 2. Configure Environment Variables
In Railway dashboard, set these environment variables for your backend:
```
NODE_ENV=production
DB_HOST=[Railway MySQL Host]
DB_USER=[Railway MySQL User]  
DB_PASSWORD=[Railway MySQL Password]
DB_NAME=[Railway MySQL Database]
DB_PORT=[Railway MySQL Port]
JWT_SECRET=your-super-secret-jwt-key-change-this
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

#### 3. Deploy Frontend
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Select frontend folder
4. Set environment variable:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
5. Deploy

## Alternative Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend + DB)
- **Frontend**: Deploy to Vercel (excellent for React apps)
- **Backend**: Deploy to Railway with managed MySQL
- **Pros**: Fast, reliable, good free tiers
- **Cons**: Requires managing two platforms

### Option 2: Render (Full-Stack)
1. Deploy backend to Render with managed PostgreSQL
2. Deploy frontend to Render or Vercel
3. Good for full-stack applications

### Option 3: DigitalOcean App Platform
1. Connect GitHub repository
2. Configure both frontend and backend services
3. Add managed database
4. Single platform for everything

### Option 4: Docker + Cloud Provider
1. Build Docker containers using provided Dockerfiles
2. Deploy to AWS ECS, Google Cloud Run, or Azure Container Instances
3. Use cloud database services (RDS, Cloud SQL, etc.)

## Database Migration

When deploying, you'll need to set up the database:

1. **Automatic Setup**: The application creates tables automatically on first run
2. **Manual Setup**: Import the provided SQL schema if needed
3. **Data Migration**: Export local data and import to production database

## Environment Variables Reference

### Backend (.env)
```bash
PORT=3000
NODE_ENV=production
DB_HOST=your-db-host
DB_USER=your-db-user  
DB_PASSWORD=your-db-password
DB_NAME=housemate_db
DB_PORT=3306
JWT_SECRET=your-jwt-secret
CORS_ORIGINS=https://your-frontend-domain.com
```

### Frontend (.env.production)
```bash
VITE_API_URL=https://your-backend-domain.com
```

## Security Checklist

- [ ] Change JWT_SECRET to a strong, random value
- [ ] Update database credentials
- [ ] Configure CORS_ORIGINS for your frontend domain
- [ ] Use HTTPS in production
- [ ] Set up proper database user permissions
- [ ] Enable database SSL if supported

## Post-Deployment Steps

1. **Test API endpoints**: Verify all backend routes work
2. **Test frontend**: Ensure UI connects to backend correctly  
3. **Create test user**: Register and test authentication
4. **Test core features**: Create house, add tasks, manage bills
5. **Monitor logs**: Check for any runtime errors
6. **Set up monitoring**: Use platform monitoring tools

## Troubleshooting

### Common Issues:
1. **CORS errors**: Update CORS_ORIGINS environment variable
2. **Database connection**: Verify database credentials and network access
3. **Environment variables**: Ensure all required variables are set
4. **Build errors**: Check Node.js version compatibility (>=18)

### Debugging:
- Check deployment logs in your platform dashboard
- Verify environment variables are set correctly
- Test API endpoints directly using Postman or curl
- Check browser console for frontend errors

## Cost Estimates (Monthly)

### Free Tier Options:
- **Railway**: Free tier available (limited resources)
- **Vercel**: Generous free tier for frontend
- **Render**: Free tier with limitations

### Paid Tiers (Approximately):
- **Railway**: $5-20/month for backend + database
- **Vercel Pro**: $20/month per team member
- **Render**: $7-25/month for backend services

## Support
If you encounter issues during deployment, check:
1. Platform documentation (Railway, Vercel, etc.)
2. Application logs in the dashboard
3. GitHub issues for platform-specific problems

## Next Steps After Deployment
1. Set up custom domain names
2. Configure SSL certificates (usually automatic)
3. Set up automated backups for database
4. Implement monitoring and alerting
5. Set up CI/CD pipelines for automatic deployments