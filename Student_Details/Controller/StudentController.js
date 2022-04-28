const mongoose = require('mongoose');
const Students = require('../Schema/StudentModel');    
const Mentor  = require('../../../Mentors/Schema/MentorModel')   
const catchAsync = require('../../../__utils__/__utils__');

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
                    mentor
                }
            })
        })
exports.GetStudent = catchAsync(async(req,res,next)=>{
    const student = await Students.findById(req.params.id);
    res.status(200).json({
        status:'Sucess',
        data:{
            student
        }
    })
})
//==============================
exports.CreateStudents = catchAsync(async(req,res,next)=>{
    const student = await Students.create(req.body);
    res.status(200).json({
        status:'Sucess',
        data:{
            student
        }
    })
})
exports.UpdateStudents = catchAsync(async(req,res,next)=>{
    const student = await Students.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    })
    res.status(200).json({
        status: 'Success',
        data:{
            student
        }
    })
})
