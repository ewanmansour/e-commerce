import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}


// Route for user login
const loginUser = async (req, res) => {

    try {
        const email = req.body.email?.trim().toLowerCase();
        const { password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        }
        else {
            res.status(401).json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }

}


// Route for user register
const registerUser = async (req, res) => {

    try {

        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const { password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields" })
        }

        // checking user already exist or not
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.status(409).json({ success: false, message: "User already exists" })
        }

        // validiating email format & strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" })
        }

        //  hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }

}

// Route for admin login
const adminLogin = async (req, res) => {
    try {

        const email = req.body.email?.trim();
        const { password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, { expiresIn: "12h" });
            res.json({ success: true, token })
        }
        else {
            res.status(401).json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

export { loginUser, registerUser, adminLogin }
