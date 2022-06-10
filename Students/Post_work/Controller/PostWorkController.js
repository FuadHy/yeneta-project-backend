const mongoose = require('mongoose');
require('dotenv').config({path: '../../../config.env'})

const PostWork = require('../Schema/PostWorkModel');
const catchAsync = require('../../../__utils__/__utils__');
const jwt = require('jsonwebtoken');
const Student = require('../../Student_Details/Schema/StudentModel');

//==============POST WORK=====================
exports.CreateWorks = catchAsync(async(req,res,next)=>{
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, async function(err, user){
        if(err) return res.json({status: 'Authorization error'})
        req.body.Student = user.id
        const work = await PostWork.create(req.body);
        res.status(200).json({
            status:'Sucess',
            data:{
                work
            }
        })
    })
})
//=============================================
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
exports.GetPostedWork = catchAsync(async(req,res,next)=>{
    const work = await PostWork.findById(req.params.id);
    let student = await Student.findById(work.Student)
    work.Student = student
    res.status(200).json({
        status:'Sucess',
        data:{
            work
        }
    })
})
//==========================================
exports.UpdatePostedWork = catchAsync(async(req,res,next)=>{
    const work = await PostWork.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
    })
    res.status(200).json({
        status:'Sucess',
        data:{
            work
        }
    })
})
exports.DeletePostedWork = catchAsync(async(req,res,next)=>{
    const work = await PostWork.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:'Sucess',
        data: null,
    })
})