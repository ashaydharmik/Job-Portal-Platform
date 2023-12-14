const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    recruiterName:{
        type:String,
        required: [true, "please enter recruiter name"]
    },
    companyName:{
        type:String,
        required: [true, "please enter company name"]
    },
    addLogo : {
        type:String,
        required: [true, "please enter addLogo"]
    },
    jobPosition:{
        type:String,
        required: [true, "please enter jobPosition"]
    },
    salary:{
        type:Number,
        required: [true, "please enter MonthlySalary"]
    },
    jobType:{
        type:"String",
        enum:["part-time", "full-time"],
        required: [true, "please enter jobType"]
    },
    remote:{
        type:"String",
        enum:["remote", "office"],
        required: [true, "please choose remote/office "]
    },
    location:{
        type:String,
        required: [true, "please enter jobPosition"]
    },
    aboutCompany:{
        type:String,
        required: [true, "please enter company details"]
    },
    description:{
        type:String,
        required: [true, "please enter job description"]
    },
    skills:{
        type:[String],
        required: [true, "please enter skills"]
    },
    information:{
        type:String,
        required: [true, "please enter information"]
    }
},
{
    timestamps: true,
    strict:true
}
)

module.exports = mongoose.model("Job", jobSchema)