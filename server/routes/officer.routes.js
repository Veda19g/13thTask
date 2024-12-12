const express = require("express");
const {officerLogin,getAllOfficers}=require("../controllers/officer.controller");
const router=express.Router();
router.post("/login",officerLogin);
router.get("/get-all-officers",getAllOfficers);
module.exports=router;
