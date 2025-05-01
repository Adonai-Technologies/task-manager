const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const users = require("../models/user");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role, tenant: user.tenant },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;
// This code defines a route for user login in an Express application. It checks the provided credentials against a list of users and generates a JWT token if valid.
// The token includes the user's ID, role, and tenant information, and is sent back to the client for authentication in subsequent requests.