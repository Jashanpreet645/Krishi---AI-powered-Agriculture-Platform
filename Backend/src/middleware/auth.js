import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "abcd";

export const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authentication token" });
  }
};
