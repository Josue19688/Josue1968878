
const {response}= require('express');
const bcrypt = require('bcryptjs');
const {generarJWT}=require('../helpers/jwt');
const Usuario = require('../models/usuario');



const obtenerUsuariosController = async(req, res)=>{
    const desde =Number( req.query.desde)||0;
    const uid = req.uid;

    
    try {
        const usuario = await Usuario.findById(uid);
        if(usuario){
            const {role}=usuario;
            if(role==='USER_ADMIN' || role==='USER_ROLE'){
               

                const [usuario, total]=await Promise.all([
                    Usuario.find()
                            .skip(desde)
                            .limit(5),
                    Usuario.count()
                ])

                res.json({
                    ok:true,
                    usuario,
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
const crearUsuario = async(req, res=response)=>{
    const uid = req.uid;
    const {email, password} =  req.body;

    
  
    try {


        const usuarioRole = await Usuario.findById(uid);
        if(usuarioRole){
            const {role}=usuarioRole;
            if(role==='USER_ADMIN' || role==='USER_ROLE'){

                const existeEmail = await Usuario.findOne({email});

                if(existeEmail){
                    return res.status(400).json({
                        ok:false,
                        msg:'El correo ya esta registrado'
                    })
                }
                const usuario = new Usuario(req.body);
        
                const salt = bcrypt.genSaltSync();
                usuario.password = bcrypt.hashSync(password,salt);
        
                await usuario.save();
        
                const token =  await generarJWT(usuario.id);
                
                res.json({
                    ok:true,
                    usuario,
                    token
                })
            }else{
                return res.status(400).json({
                    ok:false,
                    msg:'El usuario no tiene permisos...'
                })
            }
        }

       
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error inesperado...revisar logs'
        })
    }
   
}
const actualizarUsuario = async(req, res=response)=>{
    const id = req.uid;

    const uid = req.params.id;
    try {

        const usuario = await Usuario.findById(id);
        if(usuario){
            const {role}=usuario;
            if(role==='USER_ADMIN'){

                const usuarioDB = await Usuario.findById(uid);

                if(!usuarioDB){
                    return res.status(400).json({
                        ok:false,
                        msg:'No existe el usuario'
                    })
                }
        
                const{password, google, email, ...campos} = req.body;
                if(usuarioDB.email!==email){
                   
                    const existeEmail = await Usuario.findOne({email});
                    if(existeEmail){
                        return res.status(400).json({
                            ok:false,
                            msg:'Ya existe un usuario con el correo..'
                        })
                    }
                }
                campos.email=email;
               
                const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new :true});
        
                res.json({
                    ok:true,
                    usuario:usuarioActualizado
                })

            }else{
                return res.status(400).json({
                    ok:false,
                    msg:'El usuario no tiene permisos...'
                })
            }
        }

       
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error inesperado, revisar los logs'
        })
    }
}
const eliminarUsuario = async(req, res=response)=>{
    const uid = req.uid;
    const id = req.params.id;

    try {

        const usuario = await Usuario.findById(uid);
        if(usuario){
            const {role}=usuario;
            if(role==='USER_ADMIN'){


                const usuario = await Usuario.findById(id);
                if(!usuario){
                    return res.status(400).json({
                        ok:false,
                        msg:'No existe el usuario'
                    })
                }

                await Usuario.findByIdAndDelete(id);
                return res.json({
                    ok:true,
                    msg:'Usuario Eliminado',
                    id
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
            msg:'No se pudo eliminar el registro'
        })
    }
    
}


module.exports = {
    obtenerUsuariosController,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}