const mongoose = require('mongoose');
const Mentor = require('../../Mentors/Schema/MentorModel');
const Students = require('../../Students/Student_Details/Schema/StudentModel');
const catchAsync = require('../../__utils__/__utils__');

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

    

exports.DeleteMentors = catchAsync(async(req,res,next)=>{
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status:'Sucess',
        data:null,
    })
})
// Delete roll for admin(both students and mentor in one controllerexports.DeleteStudents = catchAsync(async(req,res,next)=>{
    exports.DeleteStudents = catchAsync(async(req,res,next)=>{
        const student = await Students.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:'Success',
            data:null,
        })
    })
    