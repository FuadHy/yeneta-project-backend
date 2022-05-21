const Mentor = require('../Schema/MentorModel');
const catchAsync = require('../../__utils__/__utils__')
exports.SignUp = catchAsync(async (req,res,next)=>{
    const newMentor = await Mentor.create(req.body);
    res.status(201).json({
        status:'Success',
        data:{
            mentor: newMentor
        }
    })
})