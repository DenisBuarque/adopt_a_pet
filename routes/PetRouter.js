const express = require('express');
const router = express.Router();
// controllers
const PetController = require('../controllers/PetController');
//helpers
const verifyToken = require('../helpers/verifyToken');
const { imageUpload } = require('../helpers/imageUpload');

router.get('/', PetController.getAll);
router.post('/search/:query', PetController.searchPet);
router.get('/like/:id', verifyToken, PetController.likeUser);
router.get('/mypets', verifyToken, PetController.getMyPets);
router.post('/schedulevisit/:id', verifyToken, PetController.scheduleVisit);
router.get('/myvisits', verifyToken, PetController.getMyVisits);
router.get('/myadoptions', verifyToken, PetController.getMyAdoptions);
router.get('/show/:id', verifyToken, PetController.getPetById);
router.get('/detail/:id', PetController.petShow);
router.post('/store', verifyToken, imageUpload.array('images'), PetController.store);
router.patch('/update/:id', verifyToken, imageUpload.array('images'), PetController.update);
router.patch('/schedule/:id', verifyToken, PetController.schedule);
router.patch('/conclude/adoption/:id', verifyToken, PetController.concludeAdoption);
router.delete('/delete/:id', verifyToken, PetController.delete);

module.exports = router;