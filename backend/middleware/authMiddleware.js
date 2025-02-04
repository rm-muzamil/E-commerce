const jwt = require("jsonwebtoken");
const User = require("../models/Usere");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access Denied" });
  }
  next();
};

const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) throw new Error("User not found");

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

module.exports = { authenticate, isAdmin, protect, adminOnly };
