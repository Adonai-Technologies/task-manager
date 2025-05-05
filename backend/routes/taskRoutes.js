const express = require('express');
const router = express.Router();
const checkPermission = require('../middleware/checkPermission');

// GET tasks
router.get('/tenants/:tenantId/tasks', checkPermission('read', 'question'), (req, res) => {
  res.json({ message: `Tasks for tenant ${req.params.tenantId}` });
});

// CREATE task
router.post('/tenants/:tenantId/tasks', checkPermission('create', 'question'), (req, res) => {
  const task = req.body;
  res.json({ message: `Task created for tenant ${req.params.tenantId}`, task });
});

// UPDATE task
router.put('/tenants/:tenantId/tasks/:taskId', checkPermission('update', 'question'), (req, res) => {
  const { taskId } = req.params;
  res.json({ message: `Task ${taskId} updated for tenant ${req.params.tenantId}` });
});

// DELETE task
router.delete('/tenants/:tenantId/tasks/:taskId', checkPermission('delete', 'question'), (req, res) => {
  const { taskId } = req.params;
  res.json({ message: `Task ${taskId} deleted from tenant ${req.params.tenantId}` });
});

module.exports = router;
