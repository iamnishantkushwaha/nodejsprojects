
const express=require("express");
const multer=require("multer")
const path=require("path")
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
         cb(null,path.resolve(`./public/profileimg/`));
    },
    filename:(req,file,cb)=>{
         cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload=multer({storage:storage});

const { handlesignup, handlelogin } = require("../controllers/usercontroller");
const router=express.Router();
router.post("/signup",upload.single("profileimageurl"),handlesignup)
router.post("/login",handlelogin)
module.exports=router