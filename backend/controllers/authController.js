
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // 2. Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 5. Response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        next(err);
    }
};
const loginUser =async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                message:"email and password are required"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"invalid email or password"
            });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,user.password
        );
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"invalid email or password"
            });
        }
    return res.status(200).json({
        message:"Login successful",
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    });

}catch(err){
    next(err);
  }
};


module.exports = { registerUser,loginUser };