import express from "express";
const router = express.Router();
import { User } from "../../mongodb/database.js";
import middleware from "../../middleware/middleware.js";

router.get("/", middleware, async (req, res) => {
  try {
    const { search } = req.query;
    console.log(search);

    const queryUser = await User.find({
      name: { $regex: `${search}`, $options: "i" },
    });

    res.json({
      users: queryUser,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
});

export default router;
