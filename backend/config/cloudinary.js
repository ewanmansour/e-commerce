import { v2 as cloudinary } from "cloudinary"

const connectCloudinary = async () => {
    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
        console.warn("Cloudinary credentials are not fully configured");
        return;
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
}

export default connectCloudinary;
