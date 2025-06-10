# Backend Deployment Guide for Vercel

## 🚀 Quick Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy the Backend
```bash
vercel --prod
```

## 🔧 Environment Variables Setup

After deployment, you need to set up the following environment variables in Vercel Dashboard:

### Required Environment Variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `NODE_ENV`: Set to "production"
- `CLIENT_URL`: Your frontend URL (https://luxe-shop-lac.vercel.app)

### Setting Environment Variables:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with its value
4. Redeploy the project

## 📁 Project Structure
```
├── server.js          # Main server file
├── vercel.json        # Vercel configuration
├── package.json       # Dependencies
├── config/
│   └── db.js         # Database connection
├── models/           # MongoDB models
├── routes/           # API routes
└── middleware/       # Authentication middleware
```

## 🔗 API Endpoints
After deployment, your API will be available at:
- Base URL: `https://your-backend-url.vercel.app`
- Health Check: `/api/health`
- User Routes: `/api/user/*`
- Auth Routes: `/api/auth/*`
- Cart Routes: `/api/cart/*`
- Order Routes: `/api/order/*`

## 🛠️ Troubleshooting

### Common Issues:
1. **Database Connection**: Ensure MONGODB_URI is correctly set
2. **CORS Issues**: Verify CLIENT_URL matches your frontend domain
3. **JWT Issues**: Check JWT_SECRET is properly configured

### Logs:
View deployment logs in Vercel dashboard under Functions tab.
