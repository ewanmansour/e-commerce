import { v2 as cloudinary } from "cloudinary"
import fs from "fs/promises"
import productModel from "../models/productModel.js"

const parseSizes = (sizes) => {
    if (Array.isArray(sizes)) return sizes;

    try {
        const parsedSizes = JSON.parse(sizes);
        return Array.isArray(parsedSizes) ? parsedSizes : [];
    } catch (error) {
        return [];
    }
}

const removeLocalFile = async (filePath) => {
    if (!filePath) return;
    await fs.unlink(filePath).catch(() => {});
}

// function for add product
const addProduct = async (req, res) => {

    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body
        const parsedSizes = parseSizes(sizes);

        if (!name || !description || !price || !category || !subCategory) {
            return res.status(400).json({ success: false, message: "Missing required product fields" })
        }

        if (Number(price) <= 0) {
            return res.status(400).json({ success: false, message: "Product price must be greater than zero" })
        }

        if (parsedSizes.length === 0) {
            return res.status(400).json({ success: false, message: "Select at least one size" })
        }

        const image1 = req.files?.image1?.[0]
        const image2 = req.files?.image2?.[0]
        const image3 = req.files?.image3?.[0]
        const image4 = req.files?.image4?.[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        if (images.length === 0) {
            return res.status(400).json({ success: false, message: "Upload at least one product image" })
        }

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                await removeLocalFile(item.path);
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: parsedSizes,
            image: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save()


        res.status(201).json({ success: true, message: "Product added", product })
    } catch (error) {
        await Promise.all(Object.values(req.files || {}).flat().map((file) => removeLocalFile(file.path)));
        res.status(500).json({ success: false, message: error.message })
    }

}


// function for list product
const listProduct = async (req, res) => {

    try {

        const products = await productModel.find({}).sort({ date: -1 });
        res.json({ success: true, products })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}


// function for remove product
const removeProduct = async (req, res) => {

    try {

        const deletedProduct = await productModel.findByIdAndDelete(req.body.id)

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        res.json({ success: true, message: "Product removed" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}

// function for single product info
const singleProduct = async (req, res) => {
    try {

        const { productId } = req.body
        const product = await productModel.findById(productId)

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        res.json({ success: true, product })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}

export { listProduct, addProduct, removeProduct, singleProduct }
