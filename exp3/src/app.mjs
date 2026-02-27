import express from 'express';
import validation from './utils/validation.mjs';
import cookieParser from 'cookie-parser';
import {validationResult,matchedData,checkSchema} from 'express-validator';
import session from 'express-session';
import users from './user/users.mjs';
import router from './utils/router.mjs';
const app=express();
const port=3000;

app.use(express.json());
app.use(cookieParser("jesho"));
app.use(session({
    secret:'jesho',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:60000*60}
}));

app.use(router);
app.get('/users',(req,res)=>{
    req.session.visited=true;
    console.log(req.signedCookies);
    if(req.signedCookies.name&&req.signedCookies.name==="expressApp"){
 const{filter,value}=req.query;
    if(filter && value){
        return res.send(users.filter((user)=>user[filter].toLowerCase().includes(value)))
    }
else{
     res.send(users);
} }
else{
    res.status(401).json({error:'Unauthorized access'});
}  
});
app.get('/users/:id',(req,res)=>{
    const userid=parseInt(req.params.id);
    if(isNaN(userid)){
        return res.status(400).json({error:'Invalid user ID'});
    }
    else{
        const user=users.find((user)=>user.id===userid);
        //console.log(user);
        if(user){
            res.json(user);
        }
        else{
            res.status(404).json({error:'User not found'});
        }   
    }

});
app.post('/users',checkSchema(validation),(req,res)=>{
    const result=validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors:result.array()});
    }
    const name= matchedData(req);
    const newUser={id:users.length+1,name:name};
    users.push(newUser);
    res.status(201).json(newUser);
});
app.put('/users/:id',(req,res)=>{
    const userid=parseInt(req.params.id);
    const user=users.find((user)=>user.id===userid);
    if(user){
        user.name=req.body.name;
        res.json(user);       
    }
    else{
            res.status(404).json({error:'User not found'});
        }
        
});
app.patch('/users/:id',(req,res)=>{
    const userid=parseInt(req.params.id);
    const user=users.find((user)=>user.id===userid);
    if(user){
       const{age}=req.body;
       user.age=age;
      res.json(user);
    
       }
    else{
        res.status(404).json({error:'User not found'});
    }
});
app.delete('/users/:id',(req,res)=>{
    const userid=parseInt(req.params.id);
    const userIndex=users.findIndex((user)=>user.id===userid);
    if(userIndex===-1){
               res.status(404).json({error:'User not found'});  
    }
    else{
        users.splice(userIndex,1);
       return res.status(200).json({message:"user deleted successfully"});
    }
});
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})