const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const Student=require('./db/db.js');
mongoose.connect("mongodb://localhost:27017/studentDB")
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.error("Error connecting to MongoDB",err);
})
app.use(cors());
app.use(express.json());
app.post("/student",async(req,res)=>{
    const{name,email,dept,roll}=req.body;
    const existingStudent=await Student.findOne({email:email});
    if(existingStudent){
        return res.status(400).json({message:"Email already exists"});
    }
    await Student.create({
        name:name,
        email:email,
        dept:dept,
        roll:roll
    }).then(()=>{
        res.json({message:"Student registered successfully"});
    }).catch((err)=>{
        console.error("Error registering student",err);
        res.status(500).json({message:"Error registering student"});
    })
})
app.listen(3000,()=>{
    console.log(`server is running on port 3000: http://localhost:3000`);
})