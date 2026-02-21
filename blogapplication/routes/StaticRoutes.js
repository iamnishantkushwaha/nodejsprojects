const express=require("express");

const router=express.Router();
const blogs=require("../models/blog");
const blog = require("../models/blog");
router.get("/",async (req,res)=>{
    const allblog=await blog.find({})
    return res.render("home",{
        user:req.user,
       blogs:allblog
    })
})

router.get("/signup",(req,res)=>{
    return res.render("signup")
})

router.get("/login",(req,res)=>{
    return res.render("login")
})
router.get("/logout",(req,res)=>{
    return res.clearCookie("token").redirect("/");
})



module.exports=router