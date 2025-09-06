# SafeYatra - Complete Local Development Setup Guide

## 🚀 Quick Start for VS Code

### Prerequisites
- Node.js 18+ installed
- VS Code with extensions: TypeScript, ES6 code snippets
- Two terminal windows/tabs

### 📁 Project Structure
```
SafeYatra/
├── server-standalone.mjs     # Backend server (Port 8000)
├── client/                   # Frontend app (Port 3000)
│   ├── src/
│   │   ├── pages/           # All application pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/            # Utilities and configurations
│   │   └── contexts/       # React contexts
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.local
└── shared/                  # Shared types and schemas
```

## 🔧 Step-by-Step Setup

### Step 1: Install Dependencies

**Terminal 1 - Backend Setup:**
```bash
# Install backend dependencies (if not already installed)
npm install express cors

# Test backend server
node server-standalone.mjs
```

**Terminal 2 - Frontend Setup:**
```bash
# Navigate to client directory
cd client

# Install frontend dependencies
npm install

# Start frontend development server
npm run dev
```

### Step 2: Environment Configuration

Create `client/.env.local`:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
```

## 🌐 Running the Application

### Backend Server (Terminal 1)
```bash
node server-standalone.mjs
```
**Expected Output:**
```
🚀 SafeYatra Backend Server is running!
📡 Server URL: http://localhost:8000
🏥 Health Check: http://localhost:8000/api/health
🔄 CORS enabled for: http://localhost:3000, http://localhost:5173
📊 Sample data loaded: 5 heatmap points, 2 alerts
```

### Frontend Client (Terminal 2)
```bash
cd client
npm run dev
```
**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## 🔗 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/*
- **Health Check**: http://localhost:8000/api/health

## 🧪 Testing the Application

### 1. Access Landing Page
- Open: http://localhost:3000
- Should see SafeYatra landing page with two portal options

### 2. Test Pilgrim Portal
- Click "Pilgrim App"
- Enter email/phone for OTP
- Check Terminal 1 for OTP code (e.g., "🔐 OTP for user@email.com: 123456")
- Enter OTP to login
- Test SOS button, view heatmap, navigation

### 3. Test Command Center
- Click "Command Center" from landing page
- Select role (Administrator/Police/Medical/Coordinator)
- Enter employee ID and phone
- Use OTP from Terminal 1
- Explore dashboard, alerts, communication features

## 📱 Application Features

### Pilgrim App Features
✅ **Authentication**: Email/Phone + OTP verification  
✅ **SOS Emergency**: Large red emergency button  
✅ **Live Heatmap**: Real-time crowd density visualization  
✅ **Location Status**: Current crowd level and coordinates  
✅ **Quick Actions**: Lost & Found, Safe Route navigation  
✅ **Notifications**: Hydration reminders, announcements  

### Command Center Features
✅ **Role-based Access**: Admin, Police, Medical, Coordinator  
✅ **Dashboard Overview**: Live statistics and metrics  
✅ **Alert Management**: View and respond to active alerts  
✅ **Crowd Monitoring**: Real-time heatmap with auto-refresh  
✅ **Team Communication**: Live messaging between units  
✅ **Multi-tab Interface**: Overview, Alerts, Heatmap, Drones, Lost & Found  

## 🔧 Troubleshooting

### Common Issues & Solutions

**1. Port Already in Use**
```bash
# Kill process on port 8000
npx kill-port 8000

# Kill process on port 3000  
npx kill-port 3000
```

**2. CORS Issues**
- Ensure backend is running on port 8000
- Check `.env.local` has correct API URL
- Verify CORS settings in `server-standalone.mjs`

**3. Firebase Connection Issues**
- Update Firebase credentials in `.env.local`
- For demo mode, app will work with default values

**4. Import/Module Errors**
```bash
# Clear node modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
```

**5. TypeScript Errors**
```bash
# Check TypeScript compilation
cd client
npx tsc --noEmit
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to user
- `POST /api/auth/verify-otp` - Verify OTP and login

### Pilgrim APIs
- `POST /api/pilgrim/sos` - Send emergency alert
- `GET /api/pilgrim/status` - Get location status
- `GET /api/pilgrim/heatmap` - Get crowd heatmap data

### Command Center APIs
- `GET /api/admin/overview` - Dashboard statistics
- `GET /api/admin/alerts` - Active alerts list
- `GET /api/admin/heatmap` - Heatmap data
- `GET /api/admin/communication` - Team messages
- `POST /api/admin/communication` - Send team message

## 🎯 Development Tips

### Hot Reload
- Frontend: Automatic hot reload on file changes
- Backend: Restart server manually after changes

### Debugging
- Frontend: Use browser DevTools
- Backend: Console logs in Terminal 1
- Network: Check Network tab for API calls

### File Watching
```bash
# Auto-restart backend on changes (optional)
npm install -g nodemon
nodemon server-standalone.mjs
```

## 🚀 Production Build

### Build Frontend
```bash
cd client
npm run build
# Creates optimized build in client/dist/
```

### Deploy
- Frontend: Deploy `client/dist/` to static hosting
- Backend: Deploy `server-standalone.mjs` to Node.js hosting
- Update environment variables for production

## 💡 Development Workflow

1. **Start both servers** (backend & frontend)
2. **Open browser** to http://localhost:3000
3. **Make changes** to code files
4. **Frontend auto-reloads**, backend needs manual restart
5. **Test features** in both portals
6. **Check logs** in Terminal 1 for backend activity

## 📞 Support

If you encounter issues:
1. Check both terminal outputs for errors
2. Verify ports 3000 and 8000 are available
3. Ensure all dependencies are installed
4. Check browser console for frontend errors
5. Test API health endpoint: http://localhost:8000/api/health

---

**🎉 Your SafeYatra application is now ready for local development!**

Access the app at: **http://localhost:3000**