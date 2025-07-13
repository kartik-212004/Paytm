import express from "express";
import middleware from "../../middleware/middleware.js";
const router = express.Router();
import { User } from "../../mongodb/database.js";

router.get("/", middleware, async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json({
      users: allUsers,
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
