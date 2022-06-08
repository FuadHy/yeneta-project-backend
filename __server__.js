const mongoose = require('mongoose');

require('dotenv').config({path: './config.env'})
const app = require('./__app__');
const Students = require('./Students/Student_Details/Schema/StudentModel')
const PostWork= require('./Students/Post_work/Schema/PostWorkModel')
const Mentor = require('./Mentors/Schema/MentorModel')
const Admin = require('./Admin/Schema/AdminModel')
const FeedBack = require('./__FeedBack__');


mongoose.connect(process.env.DATABASE_LOCAL,{

}).then(()=>console.log('Connected to Yeneta_Tutors DATABASE Sucessfully!!!')).catch(e => console.log(e))
const port = process.env.PORT || 3737;


app.listen(port,()=>{
    console.log(`Application is running on port ${port}...`)
})
console.log(process.env.DATABASE_LOCAL)