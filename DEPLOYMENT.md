# LuxeShop Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel + MongoDB Atlas (Recommended)

#### Step 1: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/luxeshop`

#### Step 2: Deploy to Vercel
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxeshop
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=production
   CLIENT_URL=https://your-app-name.vercel.app
   NODE_OPTIONS=--openssl-legacy-provider
   ```
5. Deploy!

### Option 2: Heroku + MongoDB Atlas

#### Step 1: Install Heroku CLI
```bash
npm install -g heroku
```

#### Step 2: Deploy to Heroku
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_atlas_connection_string
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set NODE_ENV=production
git push heroku main
```

### Option 3: Railway + MongoDB Atlas

1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables
4. Deploy automatically

## 🔧 Environment Variables Required

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxeshop
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
CLIENT_URL=https://your-domain.com
PORT=5000
```

## 📝 Pre-deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with read/write permissions
- [ ] IP whitelist configured (0.0.0.0/0 for cloud deployment)
- [ ] Environment variables configured
- [ ] Code pushed to GitHub
- [ ] Build process tested locally

## 🧪 Test Deployment Locally

```bash
# Install dependencies
npm install
cd client && npm install && cd ..

# Set environment variables
export MONGODB_URI="your_mongodb_atlas_uri"
export JWT_SECRET="your_jwt_secret"
export NODE_ENV="production"

# Build client
cd client && npm run build && cd ..

# Start server
npm start
```

## 🔍 Troubleshooting

### Common Issues:
1. **Build fails**: Check Node.js version compatibility
2. **Database connection fails**: Verify MongoDB URI and IP whitelist
3. **CORS errors**: Check CLIENT_URL environment variable
4. **JWT errors**: Verify JWT_SECRET is set

### Debug Commands:
```bash
# Check environment variables
echo $MONGODB_URI

# Test database connection
node -e "require('./config/db')()"

# Build client manually
cd client && npm run build
```
