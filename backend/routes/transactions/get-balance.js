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
    const Amount_In_Rupees = account.balance / 100

    res.json({
        message: `Balance Fetched - ${Amount_In_Rupees}`,
        value: Amount_In_Rupees
    }).status(200)

});

export default router;
