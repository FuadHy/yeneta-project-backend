const mongoose = require('mongoose');
const MentorSchema = new mongoose.Schema({
    Mentor_First_Name:{
        type:String,
        required:[true,'A Mentor must have a First Name'],
        maxlength:[40,'A Mentor First Name must be less than 40 characters']
    },
    Mentor_Last_Name:{
        type:String,
        required:[true,'A Mentor must have a Last Name'],
        maxlength:[40,'A Mentor Last Name must be less than 40 characters']
    },
    Date_Of_Birth:{
        type:String,
        default:Date.now()
    },
    Email:{
        type:String,
        required:[true,'Please enter your Email']
    },
    Password:{
        type:String,
        required:[true,'Please enter your password']
    },
    Phone:{
        type:Number,
        required:[true,'Please enter your phone number']
    },
    Educational_Level:{
        type:String,
        required:[true,'Enter your Educational Level']
    },
    Description:{
        type:String,
        required:[true,'Enter short description about your self']
    },
})
const Mentor = mongoose.model('Mentor',MentorSchema)
module.exports = Mentor;