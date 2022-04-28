const express = require('express');
const PostWorkController = require('../../Students/Post_work/Controller/PostWorkController')
const MentorController = require('../../Mentors/Controllers/MentorController')
const router = express.Router()
router.route('/').get(PostWorkController.GetPostedWorks);
router.route('/:id').get(MentorController.GetMentor)
router.route('/').post(MentorController.CreateMentor)
router.route('/:id').patch(MentorController.UpdateMentors);
module.exports = router