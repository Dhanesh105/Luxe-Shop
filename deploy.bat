@echo off
echo 🚀 Luxe-Shop Deployment Preparation
echo ==================================

REM Check if vercel.json exists
if exist "vercel.json" (
    echo ✅ vercel.json configuration found
) else (
    echo ❌ vercel.json not found. Please ensure it exists.
    pause
    exit /b 1
)

REM Check if client directory exists
if exist "client" (
    echo ✅ Client directory found
) else (
    echo ❌ Client directory not found
    pause
    exit /b 1
)

REM Check if server.js exists
if exist "server.js" (
    echo ✅ server.js found
) else (
    echo ❌ server.js not found
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing backend dependencies...
call npm install

echo 📦 Installing frontend dependencies...
cd client
call npm install
cd ..

REM Test build locally
echo 🔨 Testing frontend build...
cd client
call npm run build
cd ..

echo.
echo ✅ Deployment preparation complete!
echo.
echo 📋 Next Steps:
echo 1. Push your code to GitHub:
echo    git add .
echo    git commit -m "Ready for Vercel deployment"
echo    git push origin main
echo.
echo 2. Go to https://vercel.com
echo 3. Import your GitHub repository
echo 4. Add environment variables:
echo    - MONGODB_URI
echo    - JWT_SECRET
echo    - NODE_ENV=production
echo    - CLIENT_URL
echo.
echo 5. Deploy!
echo.
echo 🎉 Your app will be live at: https://your-app-name.vercel.app
echo.
pause
