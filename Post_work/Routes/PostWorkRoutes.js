const express = require('express');
const { post } = require('../../../__app__');
const PostWorkController = require('../../Post_work/Controller/PostWorkController')

const router = express.Router();
router.route('/').get(PostWorkController.GetPostedWorks);
router.route('/:id').get(PostWorkController.GetPostedWork);
router.route('/').post(PostWorkController.CreateWorks);
router.route('/:id').patch(PostWorkController.UpdatePostedWork);
router.route('/:id').delete(PostWorkController.DeletePostedWork);
module.exports = router;