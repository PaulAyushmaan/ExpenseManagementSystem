const express = require('express');
const {
	loginController,
	registerController,
} = require('../controllers/userController');

//router object
const router = express.Router();
//routers
//POST || LOGIN
router.post('/login', loginController);

//POST || Register
router.post('/register', registerController);

//export
module.exports = router;
