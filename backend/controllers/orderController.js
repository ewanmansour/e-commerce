import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import Razorpay from "razorpay"

const validateOrderPayload = ({ items, amount, address }) => {
    if (!items?.length || !amount || !address) {
        return "Order items, amount, and address are required"
    }

    return ""
}

const createOrderRecord = async ({ userId, items, amount, address, paymentMethod, payment = false }) => {
    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod,
        payment,
        date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    return newOrder
}

const getClientOrigin = () => {
    return process.env.FRONTEND_URL || process.env.CLIENT_ORIGIN?.split(",")[0]?.trim() || "http://localhost:5173"
}

// placing order using COD method

const placeOrder = async (req, res) => {

    try {
        const userId = req.userId
        const { items, amount, address } = req.body
        const validationMessage = validateOrderPayload({ items, amount, address })

        if (validationMessage) {
            return res.status(400).json({ success: false, message: validationMessage })
        }

        const newOrder = await createOrderRecord({
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
        })

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.status(201).json({ success: true, message: "Order placed", order: newOrder })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

// placing order using Stripe method

const placeOrderStripe = async (req, res) => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(501).json({ success: false, message: "Stripe payments are not configured" })
        }

        const userId = req.userId
        const { items, amount, address } = req.body
        const validationMessage = validateOrderPayload({ items, amount, address })

        if (validationMessage) {
            return res.status(400).json({ success: false, message: validationMessage })
        }

        const newOrder = await createOrderRecord({
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
        })

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const currency = process.env.STRIPE_CURRENCY || "usd"
        const clientOrigin = getClientOrigin()
        const itemsTotal = items.reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 0), 0)
        const deliveryAmount = Math.max(Number(amount || 0) - itemsTotal, 0)
        const line_items = items.map((item) => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: Math.round(Number(item.price || 0) * 100),
            },
            quantity: Number(item.quantity || 1),
        }))

        if (deliveryAmount > 0) {
            line_items.push({
                price_data: {
                    currency,
                    product_data: { name: "Delivery Charges" },
                    unit_amount: Math.round(deliveryAmount * 100),
                },
                quantity: 1,
            })
        }

        const session = await stripe.checkout.sessions.create({
            success_url: `${clientOrigin}/orders?payment=stripe&orderId=${newOrder._id}`,
            cancel_url: `${clientOrigin}/place-order?payment=cancelled&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
            metadata: {
                orderId: newOrder._id.toString(),
                userId,
            },
        })

        res.json({ success: true, session_url: session.url, orderId: newOrder._id })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// placing order using Razorpay method

const placeOrderRazor = async (req, res) => {
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return res.status(501).json({ success: false, message: "Razorpay payments are not configured" })
        }

        const userId = req.userId
        const { items, amount, address } = req.body
        const validationMessage = validateOrderPayload({ items, amount, address })

        if (validationMessage) {
            return res.status(400).json({ success: false, message: validationMessage })
        }

        const newOrder = await createOrderRecord({
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
        })

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })

        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(Number(amount || 0) * 100),
            currency: process.env.RAZORPAY_CURRENCY || "INR",
            receipt: newOrder._id.toString(),
        })

        res.json({
            success: true,
            key: process.env.RAZORPAY_KEY_ID,
            order: razorpayOrder,
            orderId: newOrder._id,
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// all data for Admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 })
        res.json({ success: true, orders })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// user order data for frontend
const userOrders = async (req, res) => {
    try {

        const userId = req.userId
        const orders = await orderModel.find({ userId }).sort({ date: -1 })
        res.json({ success: true, orders })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

// update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Order id and status are required" })
        }

        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" })
        }

        res.json({ success: true, message: "Order status updated", order })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazor, allOrders, userOrders, updateStatus }
