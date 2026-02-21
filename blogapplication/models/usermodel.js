const mongoose=require("mongoose")
const {createHmac, randomBytes}=require("crypto");
const { generatetoken } = require("../services/authentication");
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

    if(!user.isModified("password")) return next() ;

    const salt=randomBytes(16).toString("hex");
    const hashedpassword=createHmac("sha256",salt).update(user.password).digest("hex")
    this.salt=salt;
    this.password=hashedpassword;
    next();
})

userSchema.static("ismatchpasswordandgeneratetoken",async function(email,password){
const user=await  this.findOne({email});
console.log(user)
if(!user) throw new Error("User Not Found");
const salt=user.salt;
const hashedpassword=user.password;
const userproviddpassword=createHmac("sha256",salt).update(password).digest("hex");

if(hashedpassword!=userproviddpassword) {throw new Error("incorrect password");}
else
{
return generatetoken(user);
}

})
const Users=mongoose.model("User",userSchema)

module.exports=Users