console.log("my server file running");
const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");

const storyRoutes=require("./routes/storyRoutes");
const app=express();
app.use(express.json());
app.use("/api",storyRoutes);
mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{
    console.log("mongoDB connected");
})
.catch((err)=>{
    console.log(err);
});
app.put("/test", (req, res) => {
    res.send("PUT Working");  
});
app.get("/test", (req, res) => {
    res.send("GET Working");
});
app.listen(process.env.PORT,()=>{
    console.log("server started");
});
