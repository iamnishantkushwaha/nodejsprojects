const mongoose=require("mongoose");
const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
         type:String,
        required:true
    },
    coverimageurl:{
         type:String,
        required:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Blog=mongoose.model("blog",blogSchema)
module.exports=Blog