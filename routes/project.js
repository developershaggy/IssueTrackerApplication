const express = require('express');
const router = express.Router();
const projectDetailsController=require('../controllers/project_controller');


router.get('/',projectDetailsController.home);
router.post('/create-issue',projectDetailsController.createIssue);

module.exports = router;