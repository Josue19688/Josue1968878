const {response}= require('express');
const Publicacion = require('../models/publicacion');
const Usuario =  require('../models/usuario');




const buscarPublicacion = async(req, res= response)=>{
    const busqueda = req.params.publicacion;
    const regex = new RegExp(busqueda,'i');


    const publicacion = await Publicacion.find({
        nombre:regex
    })

    return res.json({
        ok:true,
        publicacion
    })
}

const buscarUsuario = async(req, res=response)=>{
    const busqueda = req.params.busqueda;
   

    const regex = new RegExp(busqueda,'i');

    const usuario = await Usuario.find({
        nombre:regex
    })
        
    return res.json({
        ok:true,
        usuario
    })
    
   
}


module.exports = {
    buscarPublicacion,
    buscarUsuario
}