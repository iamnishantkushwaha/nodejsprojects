const Users=require('../models/usermodel')

async function handlesignup(req,res){
    console.log(req.body)
    const {fullname,email,password}=req.body;
    await Users.create({
        fullname,email,password
    })
    return res.redirect("/");
}

module.exports={handlesignup}