const express = require('express');
const router = express.Router();
// helpers
const verifyToken = require('../helpers/verifyToken');
const { imageUpload } = require('../helpers/imageUpload');
// controllers
const UserController = require('../controllers/UserController');

router.post('/store', UserController.store);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
router.get('/edit/:id', UserController.getUserById);
router.patch('/update/:id', verifyToken, imageUpload.single("image"), UserController.update);

module.exports = router;