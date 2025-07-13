import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import signup from "./routes/auth/signup.js";
import signinRouter from "./routes/auth/signin.js";
import update from "./routes/users/user-update.js";
import usersRoute from "./routes/users/get-all-users.js";
import queryRoute from "./routes/users/query-user.js";
import transaction from "./routes/transactions/send.js";
import getBalance from './routes/transactions/get-balance.js'
const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log(`MongoDB connected at ${MONGODB_URI}`);
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

app.use("/api", signup);
app.use("/api", signinRouter);
app.use("/update", update);
app.use("/allUsers", usersRoute);
app.use("/users", queryRoute);
app.use("/transaction", transaction);
app.use("/balance", getBalance);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
