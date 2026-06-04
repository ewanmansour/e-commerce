import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is required");
    }

    mongoose.connection.on('connected', () => {
        console.log("DB connected");
    })

    const options = process.env.MONGODB_DB_NAME
        ? { dbName: process.env.MONGODB_DB_NAME }
        : {};

    await mongoose.connect(process.env.MONGODB_URI, options)

}

export default connectDB;
