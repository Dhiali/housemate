# Production Environment Security Configuration

## 🔒 Google Cloud Secret Manager Setup

### 1. Create Secrets in Google Cloud Console
```bash
# Database credentials
gcloud secrets create db-host --data-file=- <<< "your-cloud-sql-ip"
gcloud secrets create db-user --data-file=- <<< "your-db-user"
gcloud secrets create db-password --data-file=- <<< "your-strong-password"
gcloud secrets create db-name --data-file=- <<< "housemate_db"

# JWT Secret (generate 64-character random string)
gcloud secrets create jwt-secret --data-file=- <<< "your-64-char-jwt-secret"
```

### 2. Service Account IAM Permissions
```bash
# Create service account for Cloud Run
gcloud iam service-accounts create housemate-backend \
    --display-name="Housemate Backend Service Account"

# Grant Secret Manager access
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:housemate-backend@PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"

# Grant Cloud SQL Client access
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:housemate-backend@PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/cloudsql.client"
```

## 🚀 Cloud Run Deployment Configuration

### Dockerfile (Production)
```dockerfile
FROM node:20-alpine
WORKDIR /app

# Security: Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src/ ./src/

# Set ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 8080
CMD ["node", "src/server.js"]
```

### Cloud Run Environment Variables
```bash
# Deploy with secret manager integration
gcloud run deploy housemate-backend \
    --image gcr.io/PROJECT_ID/housemate-backend \
    --platform managed \
    --region us-central1 \
    --service-account housemate-backend@PROJECT_ID.iam.gserviceaccount.com \
    --set-secrets="DB_HOST=db-host:latest" \
    --set-secrets="DB_USER=db-user:latest" \
    --set-secrets="DB_PASSWORD=db-password:latest" \
    --set-secrets="DB_NAME=db-name:latest" \
    --set-secrets="JWT_SECRET=jwt-secret:latest" \
    --set-env-vars="NODE_ENV=production" \
    --set-env-vars="PORT=8080" \
    --allow-unauthenticated \
    --memory=512Mi \
    --cpu=1 \
    --concurrency=100 \
    --max-instances=10
```

## 🔐 Database Security (Cloud SQL)

### Network Security
```bash
# Enable private IP
gcloud sql instances patch INSTANCE_NAME \
    --network=projects/PROJECT_ID/global/networks/default \
    --no-assign-ip

# Configure authorized networks (for development only)
gcloud sql instances patch INSTANCE_NAME \
    --authorized-networks=YOUR_IP/32
```

### Database User Security
```sql
-- Create application-specific user
CREATE USER 'housemate_app'@'%' IDENTIFIED BY 'strong-random-password';

-- Grant minimal required privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON housemate_db.* TO 'housemate_app'@'%';

-- Revoke unnecessary privileges
REVOKE ALL PRIVILEGES ON *.* FROM 'housemate_app'@'%';
```

## 🛡️ VPC and Firewall Rules

### Firewall Rules
```bash
# Allow only HTTPS traffic to Cloud Run
gcloud compute firewall-rules create allow-https-cloudrun \
    --allow tcp:443 \
    --source-ranges 0.0.0.0/0 \
    --target-tags cloudrun

# Block direct database access from internet
gcloud compute firewall-rules create deny-mysql-internet \
    --deny tcp:3306 \
    --source-ranges 0.0.0.0/0 \
    --priority 1000
```

## 📊 Monitoring and Logging

### Cloud Logging Filters
```bash
# Monitor authentication failures
resource.type="cloud_run_revision" AND
textPayload:"Login failed" OR textPayload:"validation failed"

# Monitor rate limit violations
resource.type="cloud_run_revision" AND
textPayload:"Too many requests"

# Monitor database errors
resource.type="cloud_run_revision" AND
textPayload:"Database error"
```

### Alerting Policies
- Failed login attempts > 10 per minute
- Database connection errors
- Rate limit violations
- Memory/CPU usage > 80%

## 🔄 Security Maintenance

### Monthly Tasks
- [ ] Rotate JWT secrets
- [ ] Update dependencies (`npm audit fix`)
- [ ] Review IAM permissions
- [ ] Check Cloud SQL authorized networks
- [ ] Review application logs for anomalies

### Quarterly Tasks
- [ ] Rotate database passwords
- [ ] Review and update firewall rules
- [ ] Security audit of application code
- [ ] Update Node.js runtime version

## 🚨 Incident Response

### Security Incident Checklist
1. **Immediate Response**
   - Disable compromised user accounts
   - Rotate potentially compromised secrets
   - Scale down Cloud Run instances if needed

2. **Investigation**
   - Check Cloud Logging for suspicious activity
   - Review database access logs
   - Analyze network traffic patterns

3. **Recovery**
   - Deploy patched version
   - Reset user passwords if needed
   - Update security configurations

4. **Post-Incident**
   - Document lessons learned
   - Update security procedures
   - Schedule security review

## 📝 Security Compliance Checklist

- [ ] All credentials stored in Secret Manager
- [ ] Database uses private IP only
- [ ] Application runs as non-root user
- [ ] HTTPS enforced with HSTS
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection enabled
- [ ] CORS properly configured
- [ ] Security headers implemented
- [ ] Logging and monitoring configured
- [ ] Regular security updates scheduled