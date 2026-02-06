const { connectmongodb } = require("./connection");
const StaticRouter=require('./Routes/StaticRoutes')
const express = require("express");
const app = express();
const urlRouter = require("./Routes/urlroutes");
const path=require('path')

require('dotenv').config();

const PORT=process.env.PORT
const MONGO_URI=process.env.MONGO_URI
connectmongodb(MONGO_URI);
app.set('view engine','ejs');
app.set('views',path.resolve('./views'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/url", urlRouter);
app.use("/",StaticRouter);

app.listen(PORT,()=>console.log("Server Started"));
