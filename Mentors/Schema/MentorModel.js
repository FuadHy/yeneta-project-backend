const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { validateEmail } = require('validators');
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
        required:[true,'Please enter your Email'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail,'Please provide a valid Email']
    },
    Password:{
        type:String,
        required:[true,'Please enter your password'],
        minlength:8
    },
    PasswordConfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            //This only works on SAVE
            validator: function(el){
                return el === this.Password;
            },
            message: 'Password doesnot match!!!',
        }
    },
    Photo:{
        type: String,
    },
    CV:{
        type: String,
        required:[true,'Please enter your CV!!!']
    },
    Estimated_Price:{
        type: Number,
        required:[true,'Estimated_Price is mandatory']
    },
    Phone:{
        type:Number,
        required:[true,'Please enter your phone number']
    },
    Educational_Level:{
        type:String,
        required:[true,'Enter your Educational Level']
    },
    Experiance:{
        type:String,
        required:[true,'Enter Your Experiance']
    },
    Description:{
        type:String,
        required:[true,'Enter short description about your self']
    },
    
})
MentorSchema.pre('save',async function(next){
    if(!this.isModified('Password')) return next();

    this.Password = await bcrypt.hash(this.Password, 12);
    this.ConfirmPassword = undefined;
    next()
})

MentorSchema.methods.correctPassword = async function(candidatePassword,studentPassword){
    return await bcrypt.compare(candidatePassword, studentPassword) 
}
const Mentor = mongoose.model('Mentor',MentorSchema)
module.exports = Mentor;