import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {

    let token;

    // витягуємо токен з headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]; // беремо друге слово після Bearer
    }

    if (!token){
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // check jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();

  } catch (e) {
    console.log("Error in protectRoute middleware: ", e.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
