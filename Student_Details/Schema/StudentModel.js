const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    Student_First_Name:{
        type: String,
        required:[true,'A Student must have a FirstName'],
        maxlength:[40,'A Student FirstName must have less than or equal then 40 characters'],
      //  minlength:[10,'A Student LastName must have more than or equal than 10 characters']
    },
    Student_Middle_Name:{
        type: String,
        required:[true,'A Student must have a MiddleName'],
        maxlength:[40,'A Student MiddleName must have less than or equal then 40 characters '],
      //  minlength:[10,'A Student MiddleName must have more than or equal than 10 characters']
    },

    Student_Last_Name:{
        type: String,
        required:[true,'A Student must have a LastName'],
        maxlength:[40,'A Student LastName must have less than or equal then 40 characters '],
     //   minlength:[10,'A Student LastName must have more than or equal than 10 characters']
        
    },
    Date_Of_Birth:{
     type:Date,
         default:Date.now()
  },
    Phone:{
        type:String,
        required:[true,'Must add a phone number'],
    },
    Email:{
        type:String,
        required:[true,'Student must have E-mail adress']
    },
    Password:{
        type:String,
        required:[true,'Enter your password']
    },
    Grade_level:{
        type:Number,
        required:[true,'Student must submit Grade Level']
    },
    Photo:{
        type:String,
        required:[true,'Student must have Photo']
    },
    Description:{
        type:String,
        require:[true,'Student must write Discription']
    },
})
const Student = mongoose.model('Student',StudentSchema)
module.exports = Student;