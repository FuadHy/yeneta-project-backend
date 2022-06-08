const express = require('express');
const AdminController = require('../Controller/AdminController');
const router = express.Router()

router.route('/mentors').get(AdminController.GetAllMentors)
router.route('/students').get(AdminController.GetStudents);
router.route('/login').post(AdminController.login)
router.route('/status').get(AdminController.status)

router.route('/mentor/:id').delete(AdminController.DeleteMentors);
router.route('/student/:id').delete(AdminController.DeleteStudents);
module.exports = router