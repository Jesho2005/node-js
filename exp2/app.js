const express=require('express');
const app=express();
app.use((req,res,next)=>{
    console.log(req.method)
    next();
})
app.get("/",(req,res)=>{
    res.status(200).sendFile('./docs/index.html',{root:__dirname});
});
app.get("/con",(req,res)=>{
    res.status(200).sendFile('./docs/contact.html',{root:__dirname});
});
app.get("/home",(req,res)=>{
     res.status(200).redirect('/');
})
app.use((req,res)=>{
    res.status(404).send('<h1>404 Page Not Found</h1>');
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000 ');
})