const express=require("express");

const app=express();

app.use(express.json());

app.get("/",(req, res)=>{
res.send("home page");
});
app.delete("/user",(req,res)=>{
    const name=req.body.name;
    const age=req.body.age;
    const city=req.body.city;
    res.send("user deleted"
    );
});


app.listen(5000,()=>{
    console.log("server started");
});
