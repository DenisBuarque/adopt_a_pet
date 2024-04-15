const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/store', UserController.store);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);

module.exports = router;