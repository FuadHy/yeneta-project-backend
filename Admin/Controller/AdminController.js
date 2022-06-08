const mongoose = require('mongoose');
const Mentor = require('../../Mentors/Schema/MentorModel');
const Students = require('../../Students/Student_Details/Schema/StudentModel');
const catchAsync = require('../../__utils__/__utils__');
const Admin = require('../Schema/AdminModel');
const jwt = require('jsonwebtoken');
const PostWork = require('../../Students/Post_work/Schema/PostWorkModel');
require('dotenv').config({path: '../../../config.env'})

const signToken = id => {
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


exports.GetAllMentors = catchAsync(async(req,res,next)=>{
    const queryObj = {...req.query};
    const excludedFields = ['page','sort','limit','fields']
    excludedFields.forEach(el => delete([el]))
    //========ADVANCED FILTERING===============
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`)
    console.log(JSON.parse(queryStr))
    let query = Mentor.find(JSON.parse(queryStr))
     //===============SORTING=================
     if(req.query.sort){
         query = query.sort(req.query.sort);
     }else{
         query = query.sort('-createdAt')
     }
     //======PAGINATION==============
     const page = req.query.page *1 || 1;
     const limit = req.query.limit *1 || 100;
     const skip = (page-1) * limit;
     query = query.skip(skip).limit(limit);  
     const mentor = await query;
     //=====================================
        res.status(200).json({
            status:'Sucess',
            results: mentor.length,
            data:{
                mentor:  mentor.map(m => ({...m._doc, Password: undefined, PasswordConfirm: undefined}))
            }
        })
    })

    exports.login =catchAsync(async(req,res,next)=>{
        const email = req.body.Email;
        const password = req.body.Password;
        if(!email || !password){
           next() 
       return res.json({
               status: 'Error',
               error: 'Email or Password is incorrect!!'
           })
        }
        // await mentor.save({validateBeforeSave: false});
    
        const admin = await Admin.findOne({Email: email }).select('+Password')
    
        if(!admin || !(await admin.correctPassword(password,admin.Password))){
            return next(res.status(401).json({
                status: 'Error',
                error:'Incorrect Email or Password!!'
            }))
        }
    
        const token = signToken(admin._id);
        admin.Password = undefined
        admin.PasswordConfirm = undefined
        res.status(200).json({
            status: 'Sucess',
            token,
            admin
        })
    })

exports.DeleteMentors = catchAsync(async(req,res,next)=>{
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    res.json({
        status:'Success',
        data:null,
    })
})
// Delete roll for admin(both students and mentor in one controllerexports.DeleteStudents = catchAsync(async(req,res,next)=>{
    exports.DeleteStudents = catchAsync(async(req,res,next)=>{
        const student = await Students.findByIdAndDelete(req.params.id)
        res.json({
            status:'Success',
            data:null,
        })
    })
    
    exports.GetStudents = catchAsync(async(req,res,next)=>{
        const students = await Students.find()
        res.status(200).json({
            status:'Sucess',
            data:{
                students: students.map(m => ({...m._doc, Password: undefined, PasswordConfirm: undefined}))
            }
        })
    })

    exports.status = catchAsync(async(req,res,next)=>{
        const mentors = await Mentor.count();
        const students = await Students.count();
        const posts = await PostWork.count();
        res.json({
            status:'Sucess',
            mentors, posts, students
        })
    })