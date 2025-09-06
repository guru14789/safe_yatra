# SafeYatra - Localhost Development Setup

This setup allows you to run the client and server on separate ports for local development.

## Setup Instructions

### 1. Backend Server (Port 8000)

Open a terminal and run:
```bash
node server-standalone.js
```

The backend API will be available at: `http://localhost:8000`

### 2. Frontend Client (Port 3000)

In a separate terminal, navigate to the client directory and run:
```bash
cd client
npm run dev
# or
npx vite --port 3000
```

The frontend will be available at: `http://localhost:3000`

## Environment Configuration

Update `client/.env.local` with your Firebase credentials:
```
VITE_API_BASE_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_APP_ID=your_firebase_app_id  
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

## Key Changes for Localhost

1. **Separate Ports**: Frontend runs on port 3000, backend on port 8000
2. **CORS Enabled**: Backend accepts requests from localhost:3000
3. **API Base URL**: Client requests are prefixed with the backend URL
4. **OTP Display**: For testing, OTP is returned in the API response (demo mode)

## Testing the Application

1. Start both servers (backend on 8000, frontend on 3000)
2. Open `http://localhost:3000` in your browser
3. Test the login flow - OTP will be displayed in both:
   - Backend terminal (console log)
   - Browser network response (for easy copying)

## Original Replit Setup

To run the original single-port setup on Replit, use:
```bash
npm run dev
```

This serves both frontend and backend on port 5000 using the integrated Vite setup.