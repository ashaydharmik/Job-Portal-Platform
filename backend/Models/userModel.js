const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please enter your name"]
    },
    email:{
        type: String,
        required: [true, "Please enter your email"]
    },
    phone:{
        type: Number,
        required: [true, "Please enter your Mobile Number"],
        unique: [true, "Email address already exist"]
    },
    password:{
        type: String,
        required: [true, "Please enter your password"]
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("User", userSchema)