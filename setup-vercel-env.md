# Vercel Environment Variables Setup

## 🚀 Fix Database Connection Issue

Your backend is deployed but the database connection is failing because environment variables are not configured in Vercel.

### **Step 1: Add Environment Variables to Vercel**

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: `luke-shop-backend`
3. **Navigate to**: Settings → Environment Variables
4. **Add these variables one by one:**

```bash
Variable Name: MONGODB_URI
Value: mongodb+srv://dt418105:WTTLjZDxeGpZSIBW@cluster0.e0hav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
Environment: Production, Preview, Development
```

```bash
Variable Name: JWT_SECRET
Value: luxeshop_jwt_secret_key_2024
Environment: Production, Preview, Development
```

```bash
Variable Name: NODE_ENV
Value: production
Environment: Production
```

```bash
Variable Name: CLIENT_URL
Value: https://luxe-shop-lac.vercel.app
Environment: Production, Preview, Development
```

```bash
Variable Name: PORT
Value: 5000
Environment: Production, Preview, Development
```

### **Step 2: Redeploy the Backend**

After adding the environment variables:

1. **Go to Deployments tab** in your Vercel project
2. **Click the three dots** on the latest deployment
3. **Select "Redeploy"** to trigger a new deployment with the environment variables

### **Step 3: Verify the Fix**

After redeployment, check:
- **Health endpoint**: https://luke-shop-backend-gcok4j014-dhanesh105s-projects.vercel.app/api/health
- **Database status should show**: `"database": "Connected"`

### **Alternative: Using Vercel CLI**

If you have Vercel CLI installed, you can also set environment variables using:

```bash
vercel env add MONGODB_URI
# Enter the MongoDB URI when prompted

vercel env add JWT_SECRET
# Enter the JWT secret when prompted

vercel env add NODE_ENV
# Enter: production

vercel env add CLIENT_URL
# Enter: https://luxe-shop-lac.vercel.app

vercel env add PORT
# Enter: 5000
```

Then redeploy:
```bash
vercel --prod
```

### **What Was Fixed in Code:**

1. **Improved database connection caching** for serverless environments
2. **Added connection pooling** and timeout configurations
3. **Better error handling** for MongoDB connections
4. **Serverless-optimized** connection management

The database connection should work properly once the environment variables are configured in Vercel! 🎉
