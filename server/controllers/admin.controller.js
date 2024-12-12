const Admin=require('../models/admin.model');
const Officer=require('../models/officer.model');
const Task=require('../models/task.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { generateAccessToken,generateRefreshToken } = require('../utils/auth');
const createAdmin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const hashedPassword=await bcrypt.hash(password,10);
        const AdminResponse=await Admin.create({email,password:hashedPassword});
        const admin= await Admin.findById(AdminResponse._id).select('-password');
        res.status(201).json({message:"principal created successfully",admin});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"error creating admin",error});
    }
  }

  const loginAdmin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const AdminResponse=await Admin.findOne({email});
        if(!AdminResponse){
            return res.status(400).json({message:"Admin not found"});
        }
        const validPassword=await bcrypt.compare(password,AdminResponse.password);
        if(!validPassword){
            return res.status(400).json({message:"invalid password"});
        }
        const accessToken=generateAccessToken(AdminResponse._id);
        const refreshToken=generateRefreshToken(AdminResponse._id);
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
        const admin= await Admin.findById(AdminResponse._id).select('-password');
        res.status(200).json({message:"login successful",admin});
    }
    catch(error){
  
        res.status(500).json({message:"an error occured",error:error.message});
    }
  }  

  const createOfficer=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const hashedPassword=await bcrypt.hash(password,10);
        const OfficerResponse=await Officer.create({name,email,password:hashedPassword});
        const officer= await Officer.findById(OfficerResponse._id).select('-password');
        res.status(201).json({message:"officer created successfully",officer});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"error creating officer",error});
}
}
    
  const createTask = async (req, res) => {
  const { title, description, status, priority, deadline } = req.body; // Extracting additional fields from request body
  const createdBy = req.UserId; // Assuming UserId is extracted from the token middleware

  try {
      // Creating the task with all the provided fields
      const task = await Task.create({
          title,
          description,
          status: status || 'Pending', // Default to 'Pending' if not provided
          priority: priority || 'Medium', // Default to 'Medium' if not provided
          deadline,
          createdBy,
      });

      res.status(201).json({
          message: "Task created successfully",
          task,
      });
  } catch (error) {
      console.error(error);
      res.status(400).json({
          message: "Error creating task",
          error,
      });
  }
     };

     const getAllTasks = async (req, res) => {
      try {
          const tasks = await Task.find()
              .populate({
                  path: 'assignedToOfficers', // Path to the reference in Task schema
                  select: 'name', // Select only the fields you want to include
              });
  
          res.status(200).json({ tasks });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error getting all tasks", error });
      }
  };
  
    
    const assignTask = async (req, res) => {
        const {taskId}  = req.params; // Extract task ID from params
        const { officersId } = req.body; // Get officer(s) IDs from request body
      
        try {
          // Validate the task
          console.log(taskId)
          const task = await Task.findById(taskId);
          if (!task) {
            return res.status(404).json({ message: 'Task not found' });
          }
      
          // Ensure officersId is an array
          const officerIdsArray = Array.isArray(officersId) ? officersId : [officersId];
      
          // Check if all officers exist
          const officers = await Officer.find({ _id: { $in: officerIdsArray } });
          if (officers.length !== officerIdsArray.length) {
            return res.status(400).json({ message: 'One or more officers not found' });
          }
      
          // Assign task to officers
          task.assignedToOfficers = officerIdsArray;
      
          // Update each officer's assigned tasks
          await Officer.updateMany(
            { _id: { $in: officerIdsArray } },
            { $addToSet: { assignedTasks: task._id } } // Prevent duplicates
          );
      
          // Save task
          await task.save();
      
          return res.status(200).json({ message: 'Task assigned successfully', task });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      };
      

module.exports={createAdmin,loginAdmin,createOfficer,createTask,getAllTasks,assignTask}  