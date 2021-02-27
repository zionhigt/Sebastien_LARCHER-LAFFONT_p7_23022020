const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);
router.get('/signout', userCtrl.signout);
router.get('/profil', userCtrl.getUserProfil);
// router.options('/signin', userCtrl.debug);


module.exports = router;