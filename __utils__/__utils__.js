const { send } = require("express/lib/response")

const SendErrProduction = (err,res)=>{
    res.status(err.statusCode).json({
        status:er.status,
        message:err.message
    })
}
const SendErrDevelopmet = (err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack,
    })
}
module.exports = catchAsync = fn=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
// if(process.env.NODE_ENV === 'developement'){
//     SendErrDevelopmet(err,res)
// }
// else if(process.env.NODE_ENV === 'production'){
//     SendErrProduction(err,res)
// }
    }
}