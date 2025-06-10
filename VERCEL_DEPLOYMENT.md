# 🚀 Vercel Full-Stack Deployment Guide

## Complete deployment guide for Luxe-Shop MERN application on Vercel

### 📋 Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas account (free)
- Your code pushed to GitHub

### 🏗️ Project Structure (Already Configured)
```
luxe-shop/
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── routes/api/      # Express API routes
├── models/          # MongoDB models
├── config/          # Database config
├── server.js        # Express server (configured for Vercel)
├── vercel.json      # Vercel configuration (ready)
└── package.json     # Backend dependencies
```

### 🔧 Configuration Files (Already Set Up)

#### vercel.json ✅
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    },
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server.js" },
    { "src": "/(.*)", "dest": "/client/build/$1" }
  ],
  "env": {
    "NODE_OPTIONS": "--openssl-legacy-provider",
    "NODE_ENV": "production"
  }
}
```

#### server.js ✅ (Modified for Vercel)
- API routes properly configured
- Serverless export added
- Health check endpoints added

### 🚀 Deployment Steps

#### Step 1: MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create free account & cluster
3. Create database user with read/write access
4. Add IP whitelist: `0.0.0.0/0` (allow all)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/luxeshop`

#### Step 2: Deploy to Vercel
1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Import your `Luxe-Shop` repository**
5. **Vercel auto-detects the configuration**
6. **Click "Deploy"**

#### Step 3: Environment Variables
In Vercel Dashboard → Project → Settings → Environment Variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxeshop
JWT_SECRET=luxeshop_jwt_secret_key_2024
NODE_ENV=production
CLIENT_URL=https://your-app-name.vercel.app
```

**Important**: Replace `your-app-name` with your actual Vercel domain!

### 🌐 How It Works

1. **Frontend**: React app builds to `client/build/`
2. **Backend**: Express API runs as serverless functions
3. **Routing**: 
   - `/api/*` → Backend API
   - `/*` → Frontend React app
4. **Database**: MongoDB Atlas (cloud)

### ✅ Testing Your Deployment

After deployment, test these URLs:

1. **Frontend**: `https://your-app.vercel.app`
2. **API Health**: `https://your-app.vercel.app/api/health`
3. **User Registration**: Try creating an account
4. **Login**: Test authentication
5. **Cart/Orders**: Test full functionality

### 🐛 Troubleshooting

#### Build Fails?
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Check build logs in Vercel dashboard

#### API Not Working?
- Verify environment variables are set
- Check MongoDB Atlas connection string
- Ensure IP whitelist includes `0.0.0.0/0`

#### CORS Errors?
- Update `CLIENT_URL` environment variable
- Ensure it matches your Vercel domain exactly

#### Database Connection Issues?
- Check MongoDB Atlas cluster is running
- Verify database user permissions
- Test connection string format

### 📱 Features Available After Deployment

- ✅ User Registration & Authentication
- ✅ Product Browsing
- ✅ Shopping Cart Management
- ✅ Order Placement & History
- ✅ User Profile Management
- ✅ Responsive Mobile Design
- ✅ Professional UI/UX

### 🎯 Final Result

Your full-stack MERN application will be live at:
**`https://your-app-name.vercel.app`**

Both frontend and backend will be served from the same domain, eliminating CORS issues and providing a seamless user experience!

### 🔄 Redeployment

Any push to your GitHub repository will automatically trigger a new deployment on Vercel. No manual intervention needed!

---

**🎉 Congratulations! Your Luxe-Shop application is now live on Vercel!**
