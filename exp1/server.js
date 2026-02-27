const http=require('http')
const fs=require('fs')
const server=http.createServer((req,res)=>{
   res.setHeader('content-type','text/html')
    let path='./docs/';
   if(req.url=='/home'|| req.url=='/'){
     path+='index.html'
      res.statusCode=200
   }
   else if(req.url=='/con')
    {
    path+='contact.html'
     res.statusCode=200
   }
   else if(req.url=='/about'){
    res.setHeader('location','/')
     res.statusCode=301
    res.end()
   
   }
    else{
    res.end('<h1> page not found</h1>')
    res.end()
    res.statusCode=404
   }
  
   fs.readFile(path,(err,data)=>{
    if(err){
        console.log(err.message)
        res.end()
    }
    else{
        res.write(data)
        res.end()
    }
   })
   
})

server.listen(3000,()=>{
    console.log("server is listening ")
})