# 🚀 Housemate Application - Production Deployment Guide

## 💰 Cost-Efficient Deployment Strategy

**Total Monthly Cost: $0-5** (after free tiers expire)
- **Frontend**: Vercel (Free forever for personal projects)
- **Backend + Database**: Railway ($0 for 3 months, then $5/month)
- **Domain**: ~$10-15/year (one-time annual cost)

---

## 📋 Prerequisites Checklist

- [ ] GitHub account (free)
- [ ] Railway account (free) - [Sign up here](https://railway.app)
- [ ] Vercel account (free) - [Sign up here](https://vercel.com)
- [ ] Domain registrar account (Namecheap, Cloudflare, GoDaddy)

---

## 🏗️ Phase 1: Backend Deployment (Railway)

### Step 1.1: Prepare Repository
```bash
# Navigate to your project
cd "C:\Users\dhial\Desktop\MD\Housemate"

# Initialize git if not already done
git init
git add .
git commit -m "Initial deployment setup"

# Push to GitHub (create repo first on GitHub.com)
git remote add origin https://github.com/YOUR_USERNAME/housemate-app.git
git branch -M main
git push -u origin main
```

### Step 1.2: Deploy to Railway

1. **Login to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `housemate-app` repository
   - Select `backend` folder as root directory

3. **Add MySQL Database**
   - In your project dashboard, click "New Service"
   - Select "Database" → "MySQL"
   - Railway will provision a managed MySQL instance

4. **Configure Environment Variables**
   Click on your backend service → Variables tab:
   ```
   NODE_ENV=production
   DB_HOST=${{MySQL.MYSQL_HOST}}
   DB_USER=${{MySQL.MYSQL_USER}}
   DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
   DB_NAME=${{MySQL.MYSQL_DATABASE}}
   DB_PORT=${{MySQL.MYSQL_PORT}}
   JWT_SECRET=your-super-secure-jwt-secret-minimum-32-chars
   CORS_ORIGINS=https://your-domain.com,https://housemate-app.vercel.app
   ```

5. **Deploy & Get URL**
   - Railway automatically deploys
   - Copy your backend URL (e.g., `https://backend-production-xxxx.up.railway.app`)

### Step 1.3: Test Backend Deployment
```bash
# Test the health endpoint
curl https://your-backend-url.railway.app/health

# Expected response:
# {"status":"OK","database":"connected","timestamp":"..."}
```

---

## 🎨 Phase 2: Frontend Deployment (Vercel)

### Step 2.1: Update Frontend Environment

Update `frontend/.env.production`:
```bash
VITE_API_URL=https://your-backend-url.railway.app
```

Commit changes:
```bash
git add frontend/.env.production
git commit -m "Update production API URL"
git push
```

### Step 2.2: Deploy to Vercel

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Framework Preset: **Vite**
   - Root Directory: `frontend`

3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app`

5. **Deploy**
   - Click "Deploy"
   - Get your Vercel URL (e.g., `https://housemate-app.vercel.app`)

### Step 2.3: Update CORS in Backend

Update Railway backend environment variables:
```
CORS_ORIGINS=https://housemate-app.vercel.app,https://your-custom-domain.com
```

---

## 🌐 Phase 3: Custom Domain Setup

### Step 3.1: Purchase Domain

**Recommended Registrars (cheapest):**
- **Cloudflare Registrar**: $8.57/year for .com (at cost pricing)
- **Namecheap**: ~$10-12/year for .com
- **Porkbun**: ~$9-11/year for .com

### Step 3.2: Configure Domain for Frontend (Vercel)

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your custom domain: `yourdomain.com`
   - Add www subdomain: `www.yourdomain.com`

2. **Configure DNS (at your registrar):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com

   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel's IP)
   ```

3. **Verify Domain**
   - Vercel will automatically provision SSL certificate
   - DNS propagation takes 5-60 minutes

### Step 3.3: Configure Subdomain for API (Optional)

1. **Create API subdomain:**
   ```
   Type: CNAME
   Name: api
   Value: your-backend-url.railway.app
   ```

2. **Update environment variables:**
   - Frontend: `VITE_API_URL=https://api.yourdomain.com`
   - Backend: `CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com`

---

## 🛡️ Phase 4: Security & SSL Configuration

### Step 4.1: SSL Certificates
- **Vercel**: Automatic SSL (Let's Encrypt) - ✅ Free
- **Railway**: Automatic SSL for Railway domains - ✅ Free

### Step 4.2: Security Headers
Frontend is already configured with:
- X-Frame-Options
- X-Content-Type-Options  
- Referrer-Policy

### Step 4.3: Environment Security
- All sensitive data in environment variables ✅
- JWT secrets configured ✅
- Database credentials secured ✅

---

## 📊 Phase 5: Monitoring & Testing

### Step 5.1: Test Full Application

1. **Frontend Tests:**
   ```
   ✅ https://yourdomain.com loads
   ✅ User registration works
   ✅ Login functionality works
   ✅ Dashboard displays data
   ✅ API calls successful
   ```

2. **Backend Tests:**
   ```bash
   # Test health endpoint
   curl https://api.yourdomain.com/health
   
   # Test authentication
   curl -X POST https://api.yourdomain.com/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123","name":"Test","surname":"User"}'
   ```

### Step 5.2: Performance Monitoring

1. **Railway Monitoring:**
   - View logs in Railway dashboard
   - Monitor resource usage (free tier limits)

2. **Vercel Analytics:**
   - Enable Web Analytics in Vercel dashboard (free)
   - Monitor page load times and traffic

---

## 💸 Cost Breakdown

### Free Tier Limits:
- **Railway**: $5 credit monthly (3 months free)
- **Vercel**: Unlimited for personal projects
- **Domain**: $10-15/year

### After Free Credits:
- **Railway**: $5/month (backend + database)
- **Vercel**: Still free for personal use
- **Total**: ~$5/month + annual domain cost

### Cost Optimization Tips:
1. Use Railway's free credits efficiently (3 months)
2. Monitor resource usage to stay within limits
3. Consider pausing Railway service during low usage
4. Use Vercel's generous free tier fully

---

## 🚀 Live Application URLs

After deployment, your application will be available at:

- **🌐 Frontend**: https://yourdomain.com
- **📡 API**: https://api.yourdomain.com (or Railway subdomain)
- **📊 Admin**: https://yourdomain.com/dashboard

---

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   ```bash
   # Update Railway environment variable
   CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

2. **Database Connection Issues:**
   - Check Railway MySQL service status
   - Verify environment variables are correct
   - Check Railway logs for connection errors

3. **Frontend Build Errors:**
   - Verify `VITE_API_URL` environment variable
   - Check Vercel build logs
   - Ensure all dependencies are in package.json

4. **Domain Not Loading:**
   - Check DNS propagation: `nslookup yourdomain.com`
   - Verify DNS settings at registrar
   - Wait for SSL certificate provisioning (up to 24 hours)

### Getting Help:
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Vercel Discord: [discord.gg/vercel](https://discord.gg/vercel)
- Check platform status pages for outages

---

## 📝 Deployment Checklist

### Pre-Deployment:
- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] Database connection tested locally
- [ ] Frontend builds successfully
- [ ] Backend starts without errors

### Railway Backend:
- [ ] Service deployed and running
- [ ] MySQL database connected
- [ ] Environment variables set
- [ ] Health endpoint responding
- [ ] CORS configured for frontend domain

### Vercel Frontend:
- [ ] Project imported from GitHub
- [ ] Build completed successfully
- [ ] Environment variables set
- [ ] Domain connected (if using custom domain)
- [ ] SSL certificate active

### Domain Configuration:
- [ ] Domain purchased
- [ ] DNS records configured
- [ ] SSL certificates active
- [ ] All subdomains working
- [ ] Redirects configured (www → non-www or vice versa)

### Final Testing:
- [ ] User registration works
- [ ] Authentication flow complete
- [ ] Dashboard loads with real data
- [ ] All API endpoints functional
- [ ] Mobile responsive design works
- [ ] HTTPS enforced everywhere

---

**🎉 Congratulations! Your Housemate application is now live in production!**

**Live URLs:**
- Frontend: https://yourdomain.com
- Backend API: https://your-backend.railway.app
- Health Check: https://your-backend.railway.app/health

Share your deployed application and start managing your household efficiently! 🏠✨