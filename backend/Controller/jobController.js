const asyncHandler = require("../Middleware/asyncHandler")
const Job = require("../Models/jobModel")


const jobPosting = asyncHandler(async(req,res)=>{

    //1. token is getting validated before creating a job post 
    
    const {recruiterName,
        companyName,
        addLogo,
        jobPosition,
        salary,
        jobType,
        remote,
        location,
        description,
        aboutCompany,
        skills,
        information} = req.body;

        let skillsArray = skills;
        if(typeof skills === "string"){
            skillsArray= skills.split(',').map(skill => skill.trim())
        }

        if(!recruiterName || !companyName || !addLogo || !jobPosition || !salary || !jobType || !remote ||!location || !description || !aboutCompany || !skills || !information){
            res.status(400)
            throw new Error("Please enter all the fields")
        }      
        
    const newJob = await Job.create({
        recruiterName,companyName,addLogo,jobPosition,salary,jobType,remote,location,description,aboutCompany,skills,information
    })

    if(newJob){
        res.status(201).json({message:"Job successfully Posted", _id : newJob.id})
    }else{
        res.status(400)
        throw new Error("Invalid Job data")
    }
})

module.exports = jobPosting;