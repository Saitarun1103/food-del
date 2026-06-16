import usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


// login user
const loginuser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) { 
        console.log(error);
        res.json({ success: false, message: "Login failed" });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registeruser = async (req, res) => {
        const { name, email, password } = req.body;
        try {
            // check if user already exists
            const exists = await usermodel.findOne({ email });
            if (exists) {
                return res.json({ success: false, message: "User already exists" });
            }

            // validate email format and password
            if (!validator.isEmail(email)) {
                return res.json({ success: false, message: "Please enter a valid email" });
            }


            if (password.length < 8) {
                return res.json({ success: false, message: "Please enter a strong password" });
            }

            // hashing user password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // create user
            const newuser = new usermodel({
                name,
                email,
                password: hashedPassword
            });

            const user = await newuser.save()
            const token = createToken(user._id);
            res.json({ success: true, token })

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Error" });
        }
}


export {loginuser,registeruser};