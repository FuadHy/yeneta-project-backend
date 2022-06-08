const mongoose = require('mongoose');
const Mentor = require('../Schema/MentorModel');
const PostWork = require('../../Students/Post_work/Schema/PostWorkModel')
const catchAsync = require('../../__utils__/__utils__');

exports.GetPostedWorks = catchAsync(async(req,res,next)=>{
    const queryObj = {...req.query};
    const excludedFields = ['page','sort','limit','fields']
    excludedFields.forEach(el => delete([el]))
    //========ADVANCED FILTERING===============
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`)
    console.log(JSON.parse(queryStr))
    let query = PostWork.find(JSON.parse(queryStr))
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
        const getwork = await query;
        //=====================================
        res.status(200).json({
            status:'Sucess',
            results: getwork.length,
            data:{
                getwork
            }
        })
    })
exports.GetMentor = catchAsync(async(req,res,next)=>{
    const mentor = await Mentor.findById(req.params.id);
    res.status(200).json({
        status:'Sucess',
        data:{
            mentor
        }
    })
})


exports.GetMentors = catchAsync(async(req,res,next)=>{
    const mentors = await Mentor.find()
    res.status(200).json({
        status:'Sucess',
        data:{
            mentors: mentors.map(m => ({...m._doc, Password: undefined, PasswordConfirm: undefined}))
        }
    })
})

exports.CreateMentor = catchAsync(async(req,res,next)=>{
    const mentor = await Mentor.create(req.body);
    res.status(200).json({
        status:'Sucess',
        data:{
            mentor
        }
    })
})
exports.UpdateMentors = catchAsync(async(req,res,next)=>{
    const mentor = await Mentor.findByIdAndUpdate(req.params.id, req.body,{
        new:true.valueOf,
        runValidators:true,
    })
    res.json({
        status:'Sucess',
        data:{
            mentor
        }
    })
})
 