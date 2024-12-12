const Officer=require('../models/officer.model');
const Task=require('../models/task.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { generateAccessToken,generateRefreshToken } = require('../utils/auth');

const officerLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const OfficerResponse=await Officer.findOne({email});
        if(!OfficerResponse){
            return res.status(400).json({message:"Officer not found"});
        }
        const validPassword=await bcrypt.compare(password,OfficerResponse.password);
        if(!validPassword){
            return res.status(400).json({message:"invalid password"});
        }
        const accessToken=generateAccessToken(OfficerResponse._id);
        const refreshToken=generateRefreshToken(OfficerResponse._id);
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            sameSite:'None',
            secure:true
        });
        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            sameSite:'None',
            secure:true
        });
        const officer= await Officer.findById(OfficerResponse._id).select('-password');
        res.status(200).json({message:"login successful",officer});
    }
    catch(error){
        res.status(500).json({message:"an error occured",error:error.message});
    }
}

const getAllOfficers=async(req,res)=>{
    try{
        const officers=await Officer.find().select('-password');
        res.status(200).json({officers});
    }
    catch(error){
        res.status(500).json({message:"an error occured",error:error.message});
    }
}



const getAllTasks = async (req, res) => {
  const officerId = req.userId; // Assuming userId is added to req object via middleware (e.g., JWT authentication)

  try {
    // Validate officerId format
    if (!mongoose.Types.ObjectId.isValid(officerId)) {
      return res.status(400).json({ message: "Invalid officer ID format" });
    }

    // Check if officer exists
    const officer = await Officer.findById(officerId);
    if (!officer) {
      return res.status(404).json({ message: "Officer not found" });
    }

    // Fetch tasks where officerId exists in assignedToOfficers array
    const tasks = await Task.find({ assignedToOfficers: { $in: [officerId] } });

    // Return tasks in response
    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving tasks",
      error: error.message,
    });
  }
};




module.exports={officerLogin,getAllOfficers,getAllTasks};