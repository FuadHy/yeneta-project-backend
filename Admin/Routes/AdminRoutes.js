const express = require('express');
const AdminController = require('../Controller/AdminController');
const router = express.Router()
router.route('/:id').delete(AdminController.DeleteMentors);
router.route('/:id').delete(AdminController.DeleteStudents);
module.exports = router