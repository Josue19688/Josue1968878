
const {response}=require('express');
const Usuario =  require('../models/usuario');
const Publicacion = require('../models/publicacion');



const getPublicacion =async(req, res=response)=>{
    const desde =Number( req.query.desde)||0;
    const uid = req.uid;
    try {

        const usuario = await Usuario.findById(uid);
        if(usuario){
            const {role}=usuario;
            if(role==='USER_ADMIN'){
                // const publicacion =await Publicacion.find()
                //                                     .skip(desde)
                //                                     .limit(5);
                // const total =await Publicacion.count();
                const [publicacion, total] = await Promise.all([
                    Publicacion.find()
                                .skip(desde)
                                .limit(5),

                    Publicacion.count()
                ])

                return res.json({
                    ok:true,
                    publicacion,
                    total
                })
            }else{
                return res.status(400).json({
                    ok:false,
                    msg:'El usuario no tiene permisos...'
                })
            }
        }
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'Datos no encontrados..'
        })
    }
   

}

const crearPublicacion=async(req, res=response)=>{
    const uid = req.uid;
    const publicacion = new Publicacion({
        usuario:uid,
        ...req.body
    })
    try {
        const usuario = await Usuario.findById(uid);
        if(usuario){
            const {role}=usuario;
            if(role==='USER_ADMIN' || role==='USER_ROLE'){
                const publicacionDB = await publicacion.save();

                return res.json({
                    ok:true,
                    publicacionDB
                })
            }else{
                return res.status(400).json({
                    ok:false,
                    msg:'El usuario no tiene permisos...'
                })
            }
        }
 
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'No se creo la publicacion..'
        })
    }
}


const actualizarPublicacion=async(req, res=response)=>{
    const id = req.params.id;
    const uid = req.uid;
   
    try {

        const usuario = await Usuario.findById(uid);
        if(usuario){
            const {role}=usuario;
            if(role==='USER_ADMIN' || role==='USER_ROLE'){
                const publicacion = await Publicacion.findById(id);

                if(!publicacion){
                    return res.status(404).json({
                        ok:false,
                        msg:'Registro no encontrado'
                    })
                }
                const campos = req.body;
                const publicacionActualizada = await Publicacion.findByIdAndUpdate(id,campos,{new:true});


                return res.json({
                    ok:true,
                    msg:'se actualizo la publicacion',
                    publicacionActualizada,
                    usuario:uid
                })
            }else{
                return res.status(400).json({
                    ok:false,
                    msg:'El usuario no tiene permisos...'
                })
            }
        }
        
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'No se actualizo la publicacion..'
        })
    }
}


const eliminarPublicacion=async(req, res=response)=>{
    const id = req.params.id;
    const uid = req.uid;
    try {

        const usuario = await Usuario.findById(uid);
        if(usuario){
            const {role}=usuario;
            if(role==='USER_ADMIN'){

                const publicacion = await Publicacion.findById(id);

                if(!publicacion){
                    return res.status(404).json({
                        ok:false,
                        msg:'Registro no encontrado'
                    })
                }
                await Publicacion.findByIdAndDelete(id);

                return res.json({
                    ok:true,
                    msg:'Publicacion Eliminada',
                    uid
                })
            }else{
                return res.status(400).json({
                    ok:false,
                    msg:'El usuario no tiene permisos...'
                })
            }
        }
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:'No se elimino la publicacion...'
        })
    }
}

module.exports={
    getPublicacion,
    crearPublicacion,
    actualizarPublicacion,
    eliminarPublicacion
}