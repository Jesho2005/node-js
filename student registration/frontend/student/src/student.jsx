import { useState } from "react"
function Data(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [dept,setDept]=useState("")
    const [roll,setRoll]=useState("")
    function Valid(e){
        e.preventDefault()        
       fetch("http://localhost:3000/student",{
        method:"POST",
        body:JSON.stringify({
            name:name,
            email:email,
            dept:dept,
            roll:roll
        }),
        headers:{
            "Content-Type":"application/json"
        }
       })
         .then(res=>res.json())
            .then(data=>{   
                alert(data.message)               
            })
            .catch(err=>{
                console.error("Error:",err)
            })                  
    }
    return(
        <div>
            <h1>Student Registration Form</h1>
         <form onSubmit={Valid}>
            name: <input type="text" onChange={(e)=>setName(e.target.value)}/><br/><br/>
            email: <input type="email" onChange={(e)=>setEmail(e.target.value)}/><br/><br/>
            department: <input type="text" onChange={(e)=>setDept(e.target.value)}/><br/><br/>
            roll number: <input type="text" onChange={(e)=>setRoll(e.target.value)}/><br/><br/>
            <button type="submit" >Submit</button>
    </form>
        </div>
    )
}
export default Data;
