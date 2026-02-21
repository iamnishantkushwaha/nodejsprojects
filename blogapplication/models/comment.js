const mongoose=require("mongoose");
const commentSchema=mongoose.Schema({
    Content:{
        type:String,
        required:true
    }, blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",   // MUST match Blog model name
      required: true
    },
    createdBy:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User"
       }
    
},{timestamps:true})

const Comments=mongoose.model("Comment",commentSchema)
module.exports=Comments