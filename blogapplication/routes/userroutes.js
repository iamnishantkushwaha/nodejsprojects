
const express=require("express");
const { handlesignup } = require("../controllers/usercontroller");
const router=express.Router();
router.post("/signup",handlesignup)

module.exports=router