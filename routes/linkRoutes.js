const express = require('express');
const router = express.Router();
const linkController = require('../controller/linkController');

// Route for creating a dynamic link
router.post('/createLink', linkController.createLink);

// Route for redirection using short ID
router.get('/:shortId', linkController.redirectLink);

module.exports = router;
