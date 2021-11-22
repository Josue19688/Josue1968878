const {Router}= require('express');
const {check} = require('express-validator');
const { getPublicacion, 
    crearPublicacion,
    actualizarPublicacion,
    eliminarPublicacion } = require('../controllers/publicacion');
const {validarCampos}=require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router=Router();


router.get('/',validarJWT,getPublicacion);
router.post('/',
validarJWT,
[
    check('nombre','El nombre es obligatorio..').not().isEmpty(),
    check('categoria','La categoria es obligatorio').not().isEmpty(),
    check('titulo','El titulo es obligatorio..').not().isEmpty(),
    check('subtitulo','El subtitulo es obligatorio').not().isEmpty(),
    check('img','Imagen es obligatorio').not().isEmpty(),
    check('imgTitulo','Imagen es obligatorio').not().isEmpty(),
    check('imgSubtitulo','Imagen es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion es obligatorio').not().isEmpty(),
    validarCampos
],crearPublicacion);
router.put('/:id',
validarJWT,
[
    check('nombre','El nombre es obligatorio..').not().isEmpty(),
    check('categoria','La categoria es obligatorio').not().isEmpty(),
    check('titulo','El titulo es obligatorio..').not().isEmpty(),
    check('subtitulo','El subtitulo es obligatorio').not().isEmpty(),
    check('img','Imagen es obligatorio').not().isEmpty(),
    check('imgTitulo','Imagen es obligatorio').not().isEmpty(),
    check('imgSubtitulo','Imagen es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion es obligatorio').not().isEmpty(),
    validarCampos
],actualizarPublicacion);
router.delete('/:id',validarJWT, eliminarPublicacion);



module.exports=router;