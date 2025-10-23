# 🚂 Railway Deployment - Step by Step

## Current Status: Ready to Deploy! ✅

Your code is now on GitHub and ready for Railway deployment.

### 🎯 Quick Deployment Steps:

1. **Railway Setup** (5 minutes)
   - Go to https://railway.app
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select: `Dhiali/housemate` repository
   - Choose: `backend` folder as root directory

2. **Add MySQL Database** (2 minutes)
   - In Railway dashboard, click "New Service"
   - Select "Database" → "MySQL"
   - Railway creates managed database automatically

3. **Configure Environment Variables** (3 minutes)
   Click backend service → Variables tab, add these:
   ```
   NODE_ENV=production
   DB_HOST=${{MySQL.MYSQL_HOST}}
   DB_USER=${{MySQL.MYSQL_USER}}
   DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
   DB_NAME=${{MySQL.MYSQL_DATABASE}}
   DB_PORT=${{MySQL.MYSQL_PORT}}
   JWT_SECRET=housemate-super-secure-jwt-secret-key-2024-production
   CORS_ORIGINS=https://housemate-app.vercel.app
   ```

4. **Deploy & Test** (5 minutes)
   - Railway auto-deploys when you save variables
   - Copy your Railway URL (like: https://backend-production-xxxx.up.railway.app)
   - Test: https://your-url.railway.app/health

---

## ⚡ Phase 2: Deploy Frontend to Vercel

1. **Vercel Setup**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project" → Import `Dhiali/housemate`
   - Root Directory: `frontend`

2. **Configure Build Settings**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**
   - Add: `VITE_API_URL` = `https://your-railway-url.railway.app`

4. **Deploy**
   - Click Deploy
   - Get URL: https://housemate-app.vercel.app

---

## 🌐 Phase 3: Domain Setup (Optional)

**Cheap Domain Options:**
- Cloudflare: $8.57/year (.com)
- Namecheap: ~$10/year (.com)  
- Porkbun: ~$9/year (.com)

**Configure in Vercel:**
- Project Settings → Domains
- Add your custom domain
- Update CORS_ORIGINS in Railway

---

## ✅ Deployment Checklist

### Pre-deployment:
- [x] Code pushed to GitHub
- [x] Environment variables configured  
- [x] Railway config file ready
- [x] Vercel config file ready

### Railway Backend:
- [ ] Railway account created
- [ ] Backend service deployed
- [ ] MySQL database added
- [ ] Environment variables set
- [ ] Backend URL working

### Vercel Frontend:
- [ ] Vercel account created
- [ ] Frontend deployed
- [ ] Environment variables set
- [ ] Frontend URL working
- [ ] API connection working

### Final Testing:
- [ ] User registration works
- [ ] Login functionality works
- [ ] Dashboard displays real data
- [ ] All features functional

---

## 🆘 Need Help?

If you encounter issues:
1. Check Railway logs: Railway Dashboard → Service → Logs
2. Check Vercel logs: Vercel Dashboard → Project → Functions tab
3. Test API directly: `curl https://your-backend.railway.app/health`

## 📱 Expected URLs After Deployment:

- **Backend API**: `https://backend-production-xxxx.up.railway.app`
- **Frontend App**: `https://housemate-app.vercel.app`
- **Health Check**: `https://backend-production-xxxx.up.railway.app/health`

🎉 **Total Time**: ~15 minutes
💰 **Cost**: $0 for first 3 months, then $5/month