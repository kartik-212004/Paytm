import express from "express";
import middleware from "../../middleware/middleware.js";
import { Account, User } from "../../mongodb/database.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({
        email: email
    })
    const account = await Account.findOne({
        userId: user._id
    })

    res.json({
        message: `Balance Fetched - ${account.balance} `
    })

});

export default router;
