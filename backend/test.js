import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
connectDB().then(() => setTimeout(() => process.exit(0), 1000));
