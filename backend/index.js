const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { Permit } = require('permitio'); // ✅ use CommonJS-style

// Load env vars
dotenv.config();

// Import routes and middleware
const authRoutes = require('./routes/authRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authenticate = require('./middleware/authMiddleware');

// Permit.io setup
const permit = new Permit({
  token: process.env.PERMIT_API_KEY,
  pdp: "https://cloudpdp.api.permit.io",
});
app.set('permit', permit);

// Middleware
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use(authenticate); // Protect everything after this line
app.use('/api/tenants', tenantRoutes);
app.use('/api', taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
