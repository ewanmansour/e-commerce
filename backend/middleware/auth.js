import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : req.headers.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized. Please log in again.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        req.body.userId = decoded.id
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired session.' })
    }

}

export default authUser
