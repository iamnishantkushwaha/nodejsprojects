const express=require('express');
const router=express.Router()
const URL=require('../Models/url')

router.get("/",async (req,res)=>{
const allurls=await URL.find({})
console.log(allurls)
 return res.render("home",{
    urls:allurls,
    id:null
 })
})

module.exports=router