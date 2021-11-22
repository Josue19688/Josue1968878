const {response}= require('express');
const fs = require('fs');
const path= require('path');
const {v4:uuidv4}= require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');



const fileUpload = async(req, res=response)=>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['usuarios', 'publicaciones','publicacionTitulo','publicacionSubtitulo'];

    if(!tiposValidos.includes(tipo)){
        return res.status(404).json({
            ok:false,
            msg:'El tipo seleccionado usuario o publicacion..'
        })
    }

    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({
            ok:false,
            msg:'No hay archivo seleccionado'
        });
    }

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length -1];


    const extencionesValidas = ['png','PNG','jpg','JPG','jpeg','JPEG'];
    if(!extencionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'El tipo de imagen no es valido..'
        })
    }

    const nombreArchivo =`${uuidv4()}.${extensionArchivo}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`;


    file.mv(path,(err)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                msg:'Error al mover la imagen'
            });
        }

            //este metodo nos servira para subir imagenes a varios modelos 
         actualizarImagen(tipo, id, nombreArchivo);
        return res.json({
            ok:true,
            msg:'Imagen subida exitosamente...'
        })
    })

}

//nos servira para mostrar cualquier imagen
const getImagen =(req, res=response)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-img.png`);
        res.sendFile(pathImg);
    }
   
}




module.exports={
    fileUpload,
    getImagen
}