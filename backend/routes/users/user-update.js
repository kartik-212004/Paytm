import express from "express";
import { User } from "../../mongodb/database.js";
const update = express.Router();
import middleware from "../../middleware/middleware.js";

update.post("/", middleware, async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required to find the user",
        status: 400,
      });
    }

    const updateData = {};
    if (password) updateData.password = password;
    if (firstname) updateData.firstname = firstname;
    if (lastname) updateData.lastname = lastname;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No data provided to update",
        status: 400,
      });
    }

    const updated = await User.updateOne({ email }, { $set: updateData });

    if (updated.modifiedCount > 0) {
      return res.json({
        message: "User data updated successfully",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "User not found or no changes made",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      status: 500,
    });
  }
});

export default update;
