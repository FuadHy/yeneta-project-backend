const mongoose = require('mongoose');
const express = require('express');

const morgan = require('morgan');
const StudentRouter = require('./Students/Student_Details/Routes/StudentRoutes');
const PostWorkRouter = require('./Students/Post_work/Routes/PostWorkRoutes');
const MentorRouter = require('./Mentors/Routes/MentorRoutes')
const AdminRouter = require('./Admin/Routes/AdminRoutes')
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/../public`))

app.use(['/Yeneta/students/home','/Yeneta/students/signup','/Yeneta/students/login',
'/Yeneta/students/update_profile'],StudentRouter);
//==========================================================
app.use(['/Yeneta/post_work_students','/Yeneta/update_posted_work',
'/Yeneta/feed_back_students','/Yeneta/chat_room',
'/Yeneta/get_posted_works'],PostWorkRouter);
//===============MENTORS======================
app.use(['/Yeneta/mentors/home','/Yeneta/mentors/register_mentors','/Yeneta/mentors/login_mentors',
'/Yeneta/mentors/manage_profile_mentors'
,'/Yeneta/mentors/apply_post'],MentorRouter)
app.use(['/Yeneta/Admin/delete students','/Yeneta/Admin/delete mentors'],AdminRouter)



app.all('*',(req,res,next)=>{
    err = new Error(`Can't find ${req.originalUrl} on this Server!!!`)
    err.status = 'Fail',
    err.statuscode = 404;
    next(err)
})
app.use((err,req,res,next)=>{
    err.statuscode = err.statuscode||500;
    err.status = err.status||'error';
    res.status(err.statuscode).json({
        status:err.status,
        message:err.message
    })
})
module.exports = app;

