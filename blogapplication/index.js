const express=require("express")
const app= express();
const path=require("path")
const Staticrouter=require("./routes/StaticRoutes");
const userrouter=require("./routes/userroutes")
const { connectDB } = require("./connection");
require("dotenv").config()
const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL
connectDB(MONGO_URL)
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use("/",Staticrouter);
app.use("/user",userrouter)
app.listen(PORT,console.log("🌐 Server is running on",PORT))