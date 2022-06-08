const express = require('express');
const StudentController = require('../../Student_Details/Controller/StudentController')
const MentorController = require('../../../Mentors/Controllers/MentorController')
const AuthController = require('../Controller/AuthController');
const router = express.Router()

router.post('/signup', StudentController.CreateStudents);
router.post('/update/:id', StudentController.UpdateStudents);
router.post('/login',AuthController.login_Students);
router.post('/forgetPassword',AuthController.forgetPassword);
router.patch('/resetPassword/:token',AuthController.resetPassword);


router.route('/').get(StudentController.GetAllMentors);
router.route('/:id').get(StudentController.GetStudent)
router.route('/').post(StudentController.CreateStudents);
router.route('/:id').patch(StudentController.UpdateStudents);
module.exports = router;