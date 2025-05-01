// middleware/checkPermission.js
module.exports = function checkPermission(action, resource) {
  return async (req, res, next) => {
    const permit = req.app.get('permit');
    const user = req.user; // from JWT
    const tenant = req.params.tenantId;

    try {
      const allowed = await permit.check(user.id, resource, action, {
        tenant: tenant,
      });

      if (!allowed) {
        return res.status(403).json({ error: "Access Denied" });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
// Usage in routes