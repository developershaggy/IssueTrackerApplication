const express = require('express');
const router = express.Router();


//for home page
router.use('/', require('./home'));


//for project details page
router.use('/project',require('./project'));

module.exports = router;