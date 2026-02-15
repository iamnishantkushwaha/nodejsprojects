const mongoose=require("mongoose")

function connectDB(url){
    return mongoose.connect(url).then(console.log("🍃 MongoDB Connected Successfully 🚀"))
}

module.exports={connectDB}