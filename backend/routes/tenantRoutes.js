const express = require('express');
const router = express.Router();

// GET all tenants (for Admin)
router.get('/', (req, res) => {
  res.json({ message: 'List of all tenants' });
});

module.exports = router;
// This code defines a route for getting all tenants in an Express application.