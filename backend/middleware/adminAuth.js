import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : req.headers.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized. Please log in again." })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const legacyToken = decoded === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
        const roleToken = decoded?.role === "admin" && decoded?.email === process.env.ADMIN_EMAIL;

        if (!legacyToken && !roleToken) {
            return res.status(403).json({ success: false, message: "Admin access required." })
        }

        next();

    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired admin session." })
    }
}

export default adminAuth;
