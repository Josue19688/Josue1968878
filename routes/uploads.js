/*
    ruta:api/uploads/:idUsuario/img
    ruta:api/uploads/:publicacion/img
*/


const {Router}= require('express');
const expressFileUpload=require('express-fileupload');
const { fileUpload, getImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');
const router=Router();


router.use(expressFileUpload());

router.put('/:tipo/:id',validarJWT,fileUpload);//subir imagenes
router.get('/:tipo/:foto',validarJWT,getImagen);//obtener imagenes






module.exports = router;