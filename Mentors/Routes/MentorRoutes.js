const express = require('express');
const PostWorkController = require('../../Students/Post_work/Controller/PostWorkController')
const MentorController = require('../../Mentors/Controllers/MentorController')
const AuthController = require('../Controllers/AuthController');
const router = express.Router()

router.post('/register_mentors',AuthController.SignUp)

router.route('/').get(PostWorkController.GetPostedWorks);
router.route('/:id').get(MentorController.GetMentor)

router.route('/:id').patch(MentorController.UpdateMentors);
module.exports = router