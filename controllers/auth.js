const {response}=require('express');
const bcrypt = require('bcryptjs');
const Usuario=require('../models/usuario');
const {generarJWT}=require('../helpers/jwt');


const login =async(req, res=response)=>{

    const {email, password} = req.body;

    try {

        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(404).json({
                ok:false,
                msg:'Correo o contraseña incorrectos'
            })
        }

        const validPassword = bcrypt.compareSync(password,usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Correo o contraseña incorrectos'
            })
        }
        
        const token =  await generarJWT(usuario.id);


        return res.json({
            ok:true,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Credenciales invalidas..'
        })
    }
}

//renovamos el token para que el usuario no pierda su sesion
const renewToken=async(req, res=response)=>{
    const uid = req.uid;
    const token =  await generarJWT(uid);
    res.json({
        ok:true,
        token
    })
}





module.exports ={
    login,
    renewToken
}