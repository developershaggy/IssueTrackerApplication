const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


//for home page
router.get('/', homeController.home);

//for project creation
router.post('/create-project',homeController.createProject);

module.exports = router;