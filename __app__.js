const mongoose = require('mongoose');
const express = require('express');

const morgan = require('morgan');
const StudentRouter = require('./StudentRoutes/StudentRoutes');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/../public`))

app.use(['/Yeneta/register_students','/Yeneta/login_students',
'/Yeneta/manage profile_students','/Yeneta/post_work_students',
'/Yeneta/feed_back_students','/Yeneta/chat_room','/Yeneta/search_profile'],StudentRouter);

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
