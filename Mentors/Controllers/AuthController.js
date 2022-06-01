const Mentor = require('../Schema/MentorModel');
const catchAsync = require('../../__utils__/__utils__')
require('dotenv').config({path: '../../../config.env'})
const email = require('../../__utils__/email');
const signToken = id => {
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.Signup_Mentor = catchAsync(async(req,res,next)=>{
    const NewMentor = await Mentor.create(req.body)
    const token = signToken(NewMentor._id)

res.status(201).json({
    status: 'Success',
    token,
    data:{
        mentor: NewMentor
    }
})
})



exports.login_Mentor =catchAsync(async(req,res,next)=>{
    const email = req.body.Email;
    const password = req.body.Password;
    if(!email || !password){
       next() 
   return res.json({
           status: 'Error',
           error: 'Email or Password is incorrect!!'
       })
    }
    await mentor.save({validateBeforeSave: false});

    const mentor = await Mentor.findOne({email }).select('+password')

    if(!mentor || await mentor.correctPassword(password,mentor.password)){
        return next(res.status(401).json({
            status: 'Error',
            error:'Incorrect Email or Password!!'
        }))
    }

    const token = signToken(mentor._id);
    res.status(200).json({
        status: 'Sucess',
        token
    })
})

exports.forgetPassword = catchAsync(async(req,res,next)=>{
    const mentor = await Mentor.findOne({ email: req.body.email })
    if(!mentor){
        return next(res.json({
            status: 'Error',
            error:'there is no user with that email'
        }))
    }
    const resetToken = mentor.createPasswordRestToken();
    await mentor.save({validateBeforeSave: false});

    const resetURL = `${req.protocol}://${req.get('host')}/Yeneta/students/forgetPassword/${resetToken}`
    const message  = `forget your password? Submit a PATCH request with your new password and passwordConfirm to:${resetURL}.\n If you didn't forget your password, please ignore this email!`
    try{
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 min)',
            message
        });
        res.status(200).json({
            status:'Sucess',
            message:'Token sent to email!'
        })
    }catch(err){
        mentor.createPasswordRestToken = undefined;
        mentor.createPasswordRestExpires = undefined;
        await mentor.save({validateBeforeSave: false});

        return next(
            res.status(500).json({
                status:'Errror',
                error:'There was an error sendin email.Tray again later!!!'
            })
        )
    }

})

exports.resetPassword = (req,res,next)=>{}
