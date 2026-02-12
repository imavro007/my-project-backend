import 'dotenv/config';
import express from 'express';
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// --- MongoDB Connection ---
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/habiganj_rover";
mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Database Connection Error:", err));

// --- Database Schemas ---
const NoticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  pdfUrl: String
});
const Notice = mongoose.model('Notice', NoticeSchema);

const UnitSchema = new mongoose.Schema({
  name: String,
  upazilla: String,
  institutionType: String,
  leaderName: String,
  contactInfo: String,
  email: String,
  description: String
});
const Unit = mongoose.model('Unit', UnitSchema);

const GallerySchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  date: String
});
const Gallery = mongoose.model('Gallery', GallerySchema);

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET || "supersecret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API Routes ---

// Admin Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // প্রোডাকশনে এটি ডাটাবেস থেকে চেক করা উচিত
  if (username === "admin" && password === "rover123") {
    const token = jwt.sign({ username: "admin" }, process.env.JWT_SECRET || "supersecret");
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Notices API
app.get('/api/notices', async (req, res) => res.json(await Notice.find().sort({ date: -1 })));
app.post('/api/notices', authenticateToken, async (req, res) => res.json(await new Notice(req.body).save()));
app.put('/api/notices/:id', authenticateToken, async (req, res) => res.json(await Notice.findByIdAndUpdate(req.params.id, req.body)));
app.delete('/api/notices/:id', authenticateToken, async (req, res) => res.json(await Notice.findByIdAndDelete(req.params.id)));

// Units API
app.get('/api/units', async (req, res) => res.json(await Unit.find()));
app.post('/api/units', authenticateToken, async (req, res) => res.json(await new Unit(req.body).save()));
app.put('/api/units/:id', authenticateToken, async (req, res) => res.json(await Unit.findByIdAndUpdate(req.params.id, req.body)));
app.delete('/api/units/:id', authenticateToken, async (req, res) => res.json(await Unit.findByIdAndDelete(req.params.id)));

// Gallery API
app.get('/api/gallery', async (req, res) => res.json(await Gallery.find().sort({ date: -1 })));
app.post('/api/gallery', authenticateToken, async (req, res) => res.json(await new Gallery(req.body).save()));
// Added missing PUT route for Gallery to handle edit requests from frontend
app.put('/api/gallery/:id', authenticateToken, async (req, res) => res.json(await Gallery.findByIdAndUpdate(req.params.id, req.body)));
app.delete('/api/gallery/:id', authenticateToken, async (req, res) => res.json(await Gallery.findByIdAndDelete(req.params.id)));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
