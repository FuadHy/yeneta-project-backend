const mongoose = require('mongoose');
const Mentor = require('../../Mentors/Schema/MentorModel');
const Students = require('../../Students/Student_Details/Schema/StudentModel');
const catchAsync = require('../../__utils__/__utils__');

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
    