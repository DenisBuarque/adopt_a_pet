const express = require('express');
const router = express.Router();
// controllers
const UserController = require('../controllers/UserController');
// helpers
const verifyToken = require('../helpers/verifyToken');
const { imageUpload } = require('../helpers/imageUpload');

router.post('/store', UserController.store);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
router.get('/edit/:id', UserController.getUserById);
router.patch('/update/:id', verifyToken, imageUpload.single("image"), UserController.update);

module.exports = router;