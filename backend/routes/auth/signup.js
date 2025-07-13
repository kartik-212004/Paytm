import express from "express";
import { User } from "../../mongodb/database.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the backend API",
    status: "success",
  });
});

router.post("/signup", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
      status: 400,
    });
  }
  await User.insertOne({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
  });

  res.status(200).json({
    message: "Account created successfully",
    status: 200,
    data: {
      email: email,
    },
  });
});

export default router;
