
import mongoose from "mongoose";

export const connectToDB = async () => {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sp_track_1";
    mongoose
        .connect(uri)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err: unknown) => console.error("MongoDB connection error:", err));
};

