const admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Access denied. You need admin privileges to perform this action");
  }
  next();
};

module.exports = admin;
