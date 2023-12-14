const asyncHandler = require("../Middleware/asyncHandler")
const Job = require("../Models/jobModel")
const User = require("../Models/userModel")

// create job post
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



//update job-post
const updateJobPost = asyncHandler(async (req, res) => {
      const {
        recruiterName,
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
        information
      } = req.body;
  
      const { _id } = req.query;
      console.log('receiver id', _id)

      if (!_id) {
        return res.status(400).json({ message: "Invalid request. Missing job post ID." });
      }

      const existingPost = await Job.findById(_id);
      if (!existingPost) {
        return res.status(404).json({ message: "Job post not found." });
      }

      const updatedPost = await Job.findByIdAndUpdate(
        _id,
        {
            recruiterName,
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
            information
        },
        { new: true } // Return the updated document
      );

      if(updatedPost){
          res.status(200).json({
            message: "Updated successfully",
            updatedPost
          });
      }else{
        res.status(400)
        throw new Error({message:"invalid data"})
      } 
  });


  //get all job post with filter
  const getJobPost = asyncHandler(async(req,res)=>{

      const {skills,jobPosition} = req.query

      if(!skills || !jobPosition){
        res.status(400)
        throw new Error({message: "mention skills"})
      }

      const skillsArray = skills.split(',');

      const allJobs = await Job.find({$or: [{skills: { $in:[skillsArray] }},{jobPosition: { $in: [jobPosition] }}]})

      if(!allJobs){
        res.status(400)
        throw new Error("Job post not found with given skills")
      }else{
        res.status(200).json({message: "SUCCESS", allJobs})
      }
  })


  //get a single job post
  const singleJobPost = asyncHandler(async(req,res)=>{
    const{_id} = req.query

    const fetchJob = await Job.findOne({_id})
    if(!fetchJob){
      res.status(400)
        throw new Error({message:"Job post not found with given id"})
      }else{
        res.status(200).json({message: "SUCCESS", fetchJob})
      }
    
  })

module.exports = {jobPosting, updateJobPost, getJobPost, singleJobPost};