
const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const app=express();
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("mongoDB connected");
})
.catch((err)=>{
    console.log(err);
});
app.listen(process.env.PORT,()=>{
    console.log("server started");
});
