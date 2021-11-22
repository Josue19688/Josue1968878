/*
    ruta:api/todo/:busqueda
*/


const {Router}= require('express');
const { buscarPublicacion, buscarUsuario } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');
const router=Router();

router.get('/publicacion/:publicacion',validarJWT,buscarPublicacion);
router.get('/usuario/:busqueda',validarJWT,buscarUsuario);





module.exports = router;