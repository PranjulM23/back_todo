const express = require("express");
const Router = require("./Routers/UserRoute");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors")
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const TaskRouter = require("./Routers/Task");
const { getuser } = require("./auth/auth.js");
const app =express();
app.use(cors({ credentials: true, origin: true }))
const PORT = process.env.PORT||8000;
app.use(bodyParser.json())
app.use(Router)
app.use(TaskRouter)
app.use(cookieParser());
mongoose.connect(process.env.uri,{useNewUrlParser:true}).then((e)=>{console.log("Mongodb Connected");}).catch((err)=>{console.log(err);})

app.listen(PORT,()=>{
    console.log("Listening......");
})