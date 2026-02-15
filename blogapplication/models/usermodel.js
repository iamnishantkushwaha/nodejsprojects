const mongoose=require("mongoose")
const {createHmac, randomBytes}=require("crypto")
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
         type:String,
        
    },
     password:{
        type:String,
        required:true
    },
    profileimageurl:{
        type:String,
        default:'/images/download (1).jpg'
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{
    timestamps:true
})


userSchema.pre('save',function(next){
    const user=this;

    if(!user.isModified("password")) return  ;

    const salt=randomBytes(16).toString();
    const hashedpassword=createHmac("sha256",salt).update(user.password).digest("hex")
    this.salt=salt;
    this.password=hashedpassword;
    
})
const Users=mongoose.model("users",userSchema)

module.exports=Users