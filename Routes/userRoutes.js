const {Router} = require('express')
const {signUp, signIn} = require('../Controller/userController')

const router = Router();

router.post('/signUp', signUp);

router.post('/signIn', signIn);

module.exports = router;