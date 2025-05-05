const checkPermission = (action, resource) => {
  return async (req, res, next) => {
    const permit = req.app.get('permit');
    // Hardcode the user id to "admin" for now (update with your auth flow later)
    const user = { id: "admin" };  // Simulating an admin user for permission checks
    const tenant = req.params.tenantId;

    try {
      const allowed = await permit.check(user.id, action, resource, {
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

module.exports = checkPermission;
