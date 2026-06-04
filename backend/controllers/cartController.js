import userModel from "../models/userModel.js"


// add products to user cart
const addToCart = async (req, res) => {
    try {

        const { itemId, size } = req.body
        const userId = req.userId

        if (!itemId || !size) {
            return res.status(400).json({ success: false, message: "Product and size are required" })
        }

        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: "Added to cart", cartData })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}

// update user cart
const updateCart = async (req, res) => {

    try {

        const { itemId, size } = req.body
        const quantity = Number(req.body.quantity)
        const userId = req.userId

        if (!itemId || !size || Number.isNaN(quantity)) {
            return res.status(400).json({ success: false, message: "Product, size, and quantity are required" })
        }

        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {}
        }

        if (quantity <= 0) {
            delete cartData[itemId][size]

            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId]
            }
        } else {
            cartData[itemId][size] = quantity
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Cart updated", cartData })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}

// get user cart data
const getUserCart = async (req, res) => {

    try {

        const userId = req.userId

        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        let cartData = userData.cartData || {};

        res.json({ success: true, cartData })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }


}

export { addToCart, updateCart, getUserCart }
