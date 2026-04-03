require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');

const authRoutes = require('./routes/auth');
const outPassRoutes = require('./routes/outpass');
const demoAuthRoutes = require('./routes/demo-auth');
const demoOutPassRoutes = require('./routes/demo-outpass');

const app = express();
const useDemoData =
  process.env.USE_DEMO_DATA === 'true' || !process.env.MONGODB_URI;

if (!useDemoData) {
  connectDB();
}

app.use(cors());
app.use(express.json());

app.use('/api/auth', useDemoData ? demoAuthRoutes : authRoutes);
app.use('/api/pass', useDemoData ? demoOutPassRoutes : outPassRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    mode: useDemoData ? 'demo' : 'database',
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: useDemoData
      ? 'Digital Out-Pass System Demo API is running'
      : 'Digital Out-Pass System API is running',
  });
});

const frontendBuildPath = path.resolve(__dirname, '../frontend/build');

app.use(express.static(frontendBuildPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  return res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
