const express = require('express');
const StudentController = require('../../Student_Details/Controller/StudentController')
const MentorController = require('../../../Mentors/Controllers/MentorController')
const router = express.Router()
router.route('/').get(StudentController.GetAllMentors);
router.route('/:id').get(StudentController.GetStudent)
router.route('/').post(StudentController.CreateStudents);
router.route('/:id').patch(StudentController.UpdateStudents);
module.exports = router;