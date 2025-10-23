# 🚀 Alternative Deployment: AWS + Vercel

## Architecture Overview
- **Frontend**: Vercel (Free tier) 
- **Backend**: AWS Lambda + API Gateway (Pay-per-use)
- **Database**: AWS RDS MySQL (Free tier for 12 months)
- **Storage**: AWS S3 (for user uploads)

## Cost Analysis
- **Year 1**: ~$0-15/month (AWS free tier)
- **Year 2+**: ~$15-25/month
- **Domain**: $10-15/year

## Benefits of This Approach
1. **Industry Standard**: AWS experience is valuable
2. **Scalability**: Can handle massive growth
3. **Cost-Effective**: Free tier + pay-per-use
4. **Professional**: Production-ready architecture
5. **Learning**: Valuable cloud skills

---

## 📋 AWS + Vercel Deployment Guide

### Step 1: Backend to AWS Lambda

#### 1.1 Install Serverless Framework
```bash
npm install -g serverless
cd backend
npm install serverless-http
```

#### 1.2 Create serverless.yml
```yaml
service: housemate-backend
provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    NODE_ENV: production
    DB_HOST: ${env:DB_HOST}
    DB_USER: ${env:DB_USER}
    DB_PASSWORD: ${env:DB_PASSWORD}
    DB_NAME: ${env:DB_NAME}
    JWT_SECRET: ${env:JWT_SECRET}

functions:
  api:
    handler: src/lambda.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true
      - http:
          path: /
          method: ANY
          cors: true
```

#### 1.3 Create Lambda Handler
```javascript
// src/lambda.js
import serverless from 'serverless-http';
import app from './server.js';

export const handler = serverless(app);
```

#### 1.4 Update server.js for Lambda
```javascript
// Remove app.listen() for Lambda
// Add export default app;
```

### Step 2: AWS RDS MySQL Setup

#### 2.1 Create RDS Instance
```bash
# Using AWS CLI (or use AWS Console)
aws rds create-db-instance \
  --db-instance-identifier housemate-db \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password YourSecurePassword \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxxxxx
```

#### 2.2 Configure Security Groups
- Allow inbound MySQL (port 3306) from Lambda
- Configure VPC if needed

### Step 3: Frontend to Vercel (Same as before)

```bash
# Update .env.production
VITE_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/dev
```

### Step 4: Deploy

```bash
# Deploy backend to AWS
cd backend
serverless deploy

# Deploy frontend to Vercel
cd ../frontend
vercel --prod
```

---

## 🔧 Serverless Backend Code Changes

### Lambda-compatible server.js:
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// ... other imports

dotenv.config();

const app = express();

// Configure CORS for AWS API Gateway
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ["*"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// All your existing routes...
// ... (keep all existing endpoints)

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Housemate API is running on AWS Lambda!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// For serverless
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
```

---

## 💸 Cost Breakdown (AWS + Vercel)

### AWS Lambda (Backend):
- **First 1M requests/month**: Free
- **After that**: $0.20 per 1M requests
- **Compute**: $0.0000166667 per GB-second

### AWS RDS MySQL:
- **First 12 months**: Free (t3.micro)
- **After year 1**: ~$13/month (t3.micro)

### AWS Data Transfer:
- **First 1GB/month**: Free
- **Additional**: $0.09/GB

### Vercel:
- **Personal projects**: Free forever

### **Total Cost**:
- **Year 1**: $0-5/month (free tiers)
- **Year 2+**: $15-20/month
- **Domain**: $10-15/year

---

## 🎯 Final Recommendation

**For Learning & Cost**: Stick with **Railway + Vercel**
- Fastest to deploy
- Cheapest overall
- Perfect for portfolio projects

**For Enterprise/Resume**: Go with **AWS + Vercel**
- Industry-standard architecture
- Valuable AWS experience
- Scales to millions of users
- Still cost-effective

**Avoid**: Heroku, Azure (too expensive for this project)
**Maybe**: GCP if you want Google ecosystem experience

---

Would you like me to help you implement the **AWS + Vercel** approach, or stick with the **Railway + Vercel** for maximum simplicity and cost savings?