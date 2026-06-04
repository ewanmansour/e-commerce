import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: {
        type: [String],
        required: true,
        validate: [(value) => value.length > 0, "At least one product image is required"]
    },
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, required: true, trim: true },
    sizes: { type: [String], required: true },
    bestseller: { type: Boolean, default: false },
    date: { type: Number, default: Date.now }
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
