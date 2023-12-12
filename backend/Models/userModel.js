const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please enter your name"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email address already exist"]
    },
    phone:{
        type: Number,
        required: [true, "Please enter your Mobile Number"]
    },
    password:{
        type: String,
        required: [true, "Please enter your password"]
    },
},
{
    timestamps: true,
    strict: true
}
)

module.exports = mongoose.model("User", userSchema)