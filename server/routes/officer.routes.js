const express = require("express");
const {officerLogin,getAllOfficers,getAllTasks}=require("../controllers/officer.controller");
const { authMiddleware } = require("../middlewares/authmiddleware");
const router=express.Router();
router.post("/login",officerLogin);
router.get("/get-all-officers",getAllOfficers);
router.get("/get-all-tasks",authMiddleware,getAllTasks);
module.exports=router;
