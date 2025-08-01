import jwt from "jsonwebtoken";

const middleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Failed to authenticate token",
      });
    }
    console.log("Decoded JWT:", decoded);
    req.user = decoded;
    next();
  });
};
export default middleware;
