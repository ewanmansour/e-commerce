import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express()
const port = process.env.PORT || 4000

await connectDB()
connectCloudinary()

const allowedOrigins = process.env.CLIENT_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean)

app.use(cors({
    origin: allowedOrigins?.length ? allowedOrigins : true,
    credentials: true
}))
app.use(express.json({ limit: '1mb' }))

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.json({ success: true, message: 'API is running' })
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    })
})

app.listen(port, () => console.log('Server started on PORT : ' + port))
