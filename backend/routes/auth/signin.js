import express from "express";
import { User } from "../../mongodb/database.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        status: 400,
      });
    }

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        status: 401,
      });
    }

    jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "700h" },
      (err, token) => {
        if (err) {
          return res.status(500).json({
            message: "Error generating token",
            status: 500,
          });
        }

        return res.status(200).json({
          message: "Signin successful",
          status: 200,
          data: {
            email,
            token,
          },
        });
      },
    );
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
});

export default router;
