const checkPermission = (action, resource) => {
  return async (req, res, next) => {
    const permit = req.app.get('permit');
    const user = req.user; // This should now come from JWT
    const tenant = req.params.tenantId;

    if (!user || !user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

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
