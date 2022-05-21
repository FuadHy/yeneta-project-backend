const jwt = require('jsonwebtoken');
const Student = require('./../Schema/StudentModel');
const catchAsync = require('../../../__utils__/__utils__');
require('dotenv').config({path: '../../../config.env'})
exports.Signup_Student = catchAsync(async(req,res,next)=>{
    const NewStudent = await Student.create(req.body.new)
const token = jwt.sign({ id: NewStudent._id }, process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_IN,
})

res.status(201).json({
    status:'success',
    
    data:{
        student:NewStudent,
        token:token
    }
})
})

