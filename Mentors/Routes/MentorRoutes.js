const express = require('express');
const PostWorkController = require('../../Students/Post_work/Controller/PostWorkController')
const MentorController = require('../../Mentors/Controllers/MentorController')
const AuthController = require('../Controllers/AuthController');
const router = express.Router()

router.post('/signup',AuthController.Signup_Mentor);
router.post('/login',AuthController.login_Mentor);
router.post('/forgetPassword',AuthController.forgetPassword);
router.patch('/resetPassword/:token',AuthController.resetPassword);


router.route('/').get(PostWorkController.GetPostedWorks);
router.route('/:id').get(MentorController.GetMentor)
router.route('/').post(MentorController.CreateMentor)
router.route('/:id').patch(MentorController.UpdateMentors);
module.exports = router