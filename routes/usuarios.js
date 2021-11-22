/*
 Ruta:/api/usuarios
*/

const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos}=require('../middlewares/validar-campos');

const { obtenerUsuariosController, 
        crearUsuario,
        actualizarUsuario,
        eliminarUsuario } = require('../controllers/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');


const router=Router();


router.get('/',validarJWT,obtenerUsuariosController);
router.post('/',validarJWT,[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('password','El password es necesario').not().isEmpty(),
    check('email','El correo es necesario..').not().isEmpty().isEmail(),
    validarCampos
],crearUsuario);
router.put('/:id',validarJWT,[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('email','El correo es necesario..').not().isEmpty().isEmail(),
    check('role','El rol es obligatorio').not().isEmpty(),
    validarCampos
],actualizarUsuario);
router.delete('/:id',validarJWT,eliminarUsuario);




module.exports = router;