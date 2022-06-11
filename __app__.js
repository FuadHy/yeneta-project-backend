const mongoose = require('mongoose');
const express = require('express');

const morgan = require('morgan');
const StudentRouter = require('./Students/Student_Details/Routes/StudentRoutes');
const PostWorkRouter = require('./Students/Post_work/Routes/PostWorkRoutes');
const MentorRouter = require('./Mentors/Routes/MentorRoutes')
const AdminRouter = require('./Admin/Routes/AdminRoutes')
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server( server, {
    cors: {
        origin: '*',
      }
})
// socket begin

io.on('connection', socket => {
    socket.on('joinRoom', ({ id, room, name }) => {
    //   const user = userJoin(socket.id, username, room);
  
    socket.join(room);
    console.log(room, id, name)
  
      // Welcome current user
      socket.emit('message', {system: true, text: 'Welcome to Yeneta Chat Room!'});
  
      // Broadcast when a user connects
      socket.broadcast
        .to(room)
        .emit(
          'message',
          {system: true, text: `${name} has joined the chat`, 
          name}
        );
  
    // Send users and room info
    //   io.to(user.room).emit('roomUsers', {
    //     room: user.room,
    //     users: []
    //   });
    });
  
    // Listen for chatMessage
    socket.on('chatMessage', async (msg) => {
        console.log(msg)
        let name;
        if(msg.mentor){
            let men = await Mentor.findById(msg.id)
            name = men.Mentor_First_Name
        } else {
            let st = await Student.findById(msg.id)
            name = st.Student_First_Name
        }
        socket.broadcast.to(msg.room).emit('message', {text: msg.msg, name});
    });
  
});
  
// socket end

app.use(morgan('dev'));
const cors = require('cors');
const Admin = require('./Admin/Schema/AdminModel');
const Student = require('./Students/Student_Details/Schema/StudentModel');
const Mentor = require('./Mentors/Schema/MentorModel');


app.use(express.json());
app.use(express.static(`${__dirname}/../public`));
// app.use(cors());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

;(async () => {
    let admins = await Admin.find();
    if(!admins.length){
        await Admin.create({
            First_Name: 'aman',
            Email: 'aman@yeneta.com',   
            Password: 'admin123'
        })
    }
})()

app.use('/Yeneta/students', StudentRouter);
//================STUDENTS==========================================
app.use(['/Yeneta/post_work_students','/Yeneta/update_posted_work',
'/Yeneta/feed_bacak_students','/Yeneta/chat_room',],PostWorkRouter);
//===============MENTORS=====================================
app.use('/Yeneta/mentor',MentorRouter)
//===============ADMIN========================================
app.use('/Yeneta/Admin/',AdminRouter)



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
module.exports = server;

