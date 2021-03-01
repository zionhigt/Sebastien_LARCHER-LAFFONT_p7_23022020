const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);
router.get('/signout', userCtrl.signout);
router.get('/profil', auth, userCtrl.getUserProfil);
router.put('/profil',auth,  multer, userCtrl.setUserProfil);
// router.options('/signin', userCtrl.debug);


module.exports = router;