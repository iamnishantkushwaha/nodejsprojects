const express=require("express");
const multer=require("multer")
const Blog=require("../models/blog")
const router=express.Router();
const path=require("path")
const Comment=require('../models/comment')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,path.resolve(`./public/uploads/`))
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload=multer({storage:storage})
router.get("/addnewblog",(req,res)=>{
    return res.render("addnewblog",{
        user:req.user
    })
})

router.post("/",upload.single("coverimage"),async(req,res)=>{
    const {title,body}=req.body;
   
    console.log(req.user,"hgjghghj");
    await Blog.create({
        title,
        body,
          coverimageurl:`/uploads/${req.file.filename}`,
         createdBy:req.user._id
    })
        return res.redirect("/")
})


router.post("/comment/:blogid",async (req,res)=>{
    console.log(req.body,"gfhg")
  const {Content} = req.body;
  console.log(req.user,"jk");

  await Comment.create({Content,
    blogId:req.params.blogid,
    createdBy:req.user._id
  })

   return res.redirect(`/blog/${req.params.blogid}/`);
  
})

router.get("/:id",async (req,res)=>{
 
   const blogData= await Blog.findById(req.params.id).populate("createdBy")
   
   console.log(blogData,"j")
const commentdata= await Comment.find({blogId:req.params.id}).populate("createdBy")
 console.log("comment",commentdata)
 console.log(blogData,"h")
 console.log(req.user)
   return res.render("blog",{
    user:req.user,
    blog:blogData,
    comments:commentdata
   })
})


module.exports=router