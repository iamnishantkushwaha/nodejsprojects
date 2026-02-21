const JWT=require("jsonwebtoken");
const SECRET="Nishant";


function generatetoken(user){
    const payload={
        _id: user._id,
        fullname:user.fullname,
        email:user.email,
       
        profileimageurl: user.profileimageurl,
       role: user.role,
    }
    return JWT.sign(payload,SECRET);
}

function validatetoken(token){
    return JWT.verify(token,SECRET);
}

module.exports={generatetoken,validatetoken}