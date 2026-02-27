const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dept: {
        type: String,
        required: true
    },
    roll: {
        type: String,   
        required: true,
        unique: true
    }
}); 
 const Student = mongoose.model("Student", userSchema);
module.exports=Student;