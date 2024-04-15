const express = require('express');
const router = express.Router();

const verifyToken = require('../helpers/verifyToken');

const UserController = require('../controllers/UserController');

router.post('/store', UserController.store);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
router.get('/edit/:id', UserController.getUserById);
router.patch('/update/:id', verifyToken, UserController.update);

module.exports = router;