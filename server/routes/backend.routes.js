const  {Router}=require("express");
const adminRoutes=require("./admin.routes");
const  officerRoutes  = require("./officer.routes");
const backendroutes=Router();
backendroutes.use("/admin",adminRoutes);
backendroutes.use("/officer",officerRoutes);
module.exports=backendroutes;