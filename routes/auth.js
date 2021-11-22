const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos}=require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {login, renewToken}=require('../controllers/auth');

const router=Router();

router.post('/',[
    check('email','El correo es obligatorio..').not().isEmpty().isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],login);

router.get('/renew',validarJWT,renewToken);


module.exports = router;