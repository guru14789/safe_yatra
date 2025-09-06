import express from "express";
import cors from "cors";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { MemStorage } = require('./server/storage.ts');

const storage = new MemStorage();

const app = express();

// Enable CORS for localhost development
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Authentication routes
app.post("/api/auth/send-otp", async (req, res) => {
  try {
    const { identifier, type, role, employeeId } = req.body;
    
    // For demo purposes, generate a simple OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + (10 * 60 * 1000); // 10 minutes
    
    // Store OTP
    await storage.storeOTP(identifier, otp, expiresAt);
    
    // In a real app, you would send SMS/Email here
    console.log(`OTP for ${identifier}: ${otp}`);
    
    res.json({ message: "OTP sent successfully", otp: otp }); // Include OTP in response for demo
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { identifier, otp, role, employeeId } = req.body;
    
    const isValid = await storage.verifyOTP(identifier, otp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    
    // Check if user exists, create if not
    let user = await storage.getUserByIdentifier(identifier);
    if (!user) {
      const userData = {
        name: role === 'pilgrim' ? 'Pilgrim User' : `${role} Officer`,
        role: role,
        verified: true
      };
      
      if (identifier.includes('@')) {
        userData.email = identifier;
      } else {
        userData.phone = identifier;
      }
      
      if (employeeId) {
        userData.employeeId = employeeId;
      }
      
      user = await storage.createUser(userData);
    }
    
    res.json({ 
      message: "Login successful",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Authentication failed" });
  }
});

// Pilgrim routes
app.post("/api/pilgrim/sos", async (req, res) => {
  try {
    const alertData = {
      type: 'emergency',
      status: 'active',
      priority: 'critical',
      location: req.body.location,
      description: req.body.description || 'SOS Emergency Alert',
      reportedBy: req.body.userId || 'anonymous'
    };
    
    const alert = await storage.createAlert(alertData);
    res.json({ message: "SOS alert sent", alert });
  } catch (error) {
    res.status(500).json({ message: "Failed to send SOS alert" });
  }
});

app.get("/api/pilgrim/status", async (req, res) => {
  try {
    res.json({
      crowdLevel: 'safe',
      coordinates: '23.1815°N, 75.7804°E',
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get status" });
  }
});

app.get("/api/pilgrim/heatmap", async (req, res) => {
  try {
    const heatmapData = await storage.getHeatmapData();
    res.json(heatmapData);
  } catch (error) {
    res.status(500).json({ message: "Failed to get heatmap data" });
  }
});

// Command Center routes
app.get("/api/admin/overview", async (req, res) => {
  try {
    const stats = await storage.getOverviewStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to get overview stats" });
  }
});

app.get("/api/admin/alerts", async (req, res) => {
  try {
    const alerts = await storage.getActiveAlerts();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get alerts" });
  }
});

app.get("/api/admin/heatmap", async (req, res) => {
  try {
    const heatmapData = await storage.getHeatmapData();
    res.json(heatmapData);
  } catch (error) {
    res.status(500).json({ message: "Failed to get heatmap data" });
  }
});

app.get("/api/admin/communication", async (req, res) => {
  try {
    const messages = await storage.getCommunications();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to get communications" });
  }
});

app.post("/api/admin/communication", async (req, res) => {
  try {
    const messageData = {
      message: req.body.message,
      unit: req.body.unit,
      userId: req.body.userId,
      userName: req.body.userName,
      priority: req.body.priority || 'normal'
    };
    
    const message = await storage.createCommunication(messageData);
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SafeYatra Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api/*`);
  console.log(`🔄 CORS enabled for: http://localhost:3000, http://127.0.0.1:3000`);
});