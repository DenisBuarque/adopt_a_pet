const express = require('express');
const router = express.Router();
// controllers
const PetController = require('../controllers/PetController');
//helpers
const verifyToken = require('../helpers/verifyToken');
const { imageUpload } = require('../helpers/imageUpload');

router.get('/', PetController.getAll);
router.get('/mypets', verifyToken, PetController.getMyPets);
router.get('/myadoptions', verifyToken, PetController.getMyAdoptions);
router.get('/show/:id', verifyToken, PetController.getPetById);
router.post('/store', verifyToken, imageUpload.array('images'), PetController.store);

module.exports = router;