const mongoose = require('mongoose');
require('dotenv').config({path: './config.env'})
const app = require('./__app__');
const Students = require('./Models/StudentModel')
const PostWork= require('./Models/PostWorkModel')
mongoose.connect(process.env.DATABASE_LOCAL,{

}).then(()=>console.log('Connected to Yeneta_Tutors DATABASE Sucessfully!!!'))
const port =3737;
app.listen(port,()=>{
    console.log(`Application is running on port ${port}...`)
})
console.log(process.env.DATABASE_LOCAL)