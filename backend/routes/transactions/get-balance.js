import express from "express";
import middleware from "../../middleware/middleware.js";
import { Account } from "../../mongodb/database.js";

const router = express.Router();

router.post("/", middleware, async (req, res) => {
    try {
        // Get user ID from the JWT token (set by middleware)
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({
                message: "User ID not found in token",
                status: 400
            });
        }

        const account = await Account.findOne({
            userId: userId
        });

        if (!account) {
            return res.status(404).json({
                message: "Account not found",
                status: 404
            });
        }

        const Amount_In_Rupees = (account.balance / 100).toFixed(2);

        res.status(200).json({
            message: `Balance Fetched - ${Amount_In_Rupees}`,
            value: parseFloat(Amount_In_Rupees)
        });

    } catch (error) {
        console.error("Balance fetch error:", error);
        res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
});

export default router;
