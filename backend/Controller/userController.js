const asyncHandler = require("express-async-handler")
const User = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//server health api
const serverHealth = (req,res)=>{
    const healthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthCheck);
    } catch (error) {
        healthCheck.message = error;
        res.status(503).send();
    }
}


//user registration
const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, phone, password} = req.body;
    if(!username || !email || !phone || !password){
        res.status(404).json("Please enter all the fields")
    }

    const availableUser = await User.findOne({email})
    if(availableUser){
        res.status(400).json("email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        phone,
        password : hashedPassword
    })

    if(user){
        res.status(200).json({_id: user.id, email: user.email})
    }else{
        res.json("Invalid user data")
    }
    res.json("user registered successfully")
})


//user login
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(404).json("Please enter all the fields")
    }

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                id: user.id,
                email: user.email,
                password: user.password
            }
        }, process.env.ACCESS_KEY
        )
        res.status(200).json({accessToken})
    }else{
        res.status(400).json("email and password is not valid")
    }
})

module.exports = {serverHealth, registerUser, loginUser}