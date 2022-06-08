const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { validateEmail } = require('validators');
const AdminShema = new mongoose.Schema({
    First_Name:{
        type:String,
        required:[true,'An Admin must have a First Name'],
        maxlength:[40,'An Admin First Name must be less than 40 characters']
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
    
})
AdminShema.pre('save',async function(next){
    if(!this.isModified('Password')) return next();

    this.Password = await bcrypt.hash(this.Password, 12);
    this.ConfirmPassword = undefined;
    next()
})

AdminShema.methods.correctPassword = async function(candidatePassword,studentPassword){
    return await bcrypt.compare(candidatePassword, studentPassword) 
}
const Admin = mongoose.model('Admin',AdminShema)
module.exports = Admin;