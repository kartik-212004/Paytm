import express from "express";
import middleware from "../../middleware/middleware.js";
import { Account, User } from "../../mongodb/database.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", middleware, async (req, res) => {
    const { senderAddress, recieverAddress, amount } = req.body;
    console.log(senderAddress, recieverAddress, amount)
    const FinalAmount = Math.round(Number(amount) * 100);

    const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        if (!senderAddress || !recieverAddress) {
            // await session.abortTransaction();
            // await session.endSession();
            return res.json({
                message: "address not specified",
                status: 400,
            });
        }

        const sender = await User.findOne({ email: senderAddress });
        const reciever = await User.findOne({ email: recieverAddress });

        if (!sender || !reciever) {
            // await session.abortTransaction();
            // await session.endSession();
            return res.json({
                message: "no such address available",
                status: 400,
            });
        }

        const senderBalance = await Account.findOne({ userId: sender._id });

        if (!senderBalance || senderBalance.balance <= 0) {
            await session.abortTransaction();
            await session.endSession();
            return res.status(400).json({
                message: "Insufficient balance or no account found",
                status: 400,
            });
        }

        await Account.updateOne(
            { userId: sender._id },
            { $inc: { balance: -FinalAmount } },
            // { session }
        );

        await Account.updateOne(
            { userId: reciever._id },
            { $inc: { balance: FinalAmount } },
            // { session }
        );

        // await session.commitTransaction();
        // await session.endSession();

        return res.status(200).json({
            message: "Transfer successful",
            status: 200,
        });

    } catch (error) {
        console.error(error);
        // await session.abortTransaction();
        // await session.endSession();
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
});

export default router;
