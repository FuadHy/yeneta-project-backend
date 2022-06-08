const crypto = require('crypto')
const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
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
     type: Date,
         default:Date.now()
  },
    Phone:{
        type:String,
        required:[true,'Must add a phone number'],
    },
    Email:{     
        type:String,
        required:[true,'Student must have E-mail adress'],
        validate:[validator.isEmail,'Please provide a valid Email'],
        lowercase: true,
        unique: true
    },
    Password:{
        type:String,
        required:[true,'Enter your password'],
        unique:true,
        minlength:8,
        select: false,
    },
    ConfirmPassword:{
        type: String,
        required:[true,'Please Confirm your password'],
        validate:{
            //This only works on SAVE
            validator: function(el){
                return el === this.Password;
            },
            message: 'Password doesnot match!!!',
        }
    },
    Grade_level:{
        type:Number,
        required:[true,'Student must submit Grade Level']
    },
    Photo:{
        type:String,
        
    },
    Description:{
        type:String,
        required:[true,'Student must write Discription']
    },
    PasswordResetToken: String,
    PasswordResetExpires: Date,
})
StudentSchema.pre('save',async function(next){
    if(!this.isModified('Password')) return next();

    this.Password = await bcrypt.hash(this.Password, 12);
    this.ConfirmPassword = undefined;
    next()
})

StudentSchema.methods.correctPassword = async function(candidatePassword,studentPassword){
    return await bcrypt.compare(candidatePassword, studentPassword) 
}
StudentSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log({resetToken},this.PasswordResetToken)

this.PasswordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

this.PasswordResetExpires = Date.now() + 10 * 60 * 1000;
return resetToken;
}
const Student = mongoose.model('Student',StudentSchema)
module.exports = Student;