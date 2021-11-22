const fs = require('fs');
const Usuario = require('../models/usuario');
const Publicacion = require('../models/publicacion');


const actualizarImagen =async (tipo, id,  nombreArchivo)=>{

    switch(tipo){
        case 'usuarios':
            //relacionamos solo una imagen el usuario y la vamos a reemplazar si ya existe una 
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }
            const pathViejo =`./uploads/usuarios/${usuario.img}`;

            if(fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo);
            }
            
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;
        case 'publicacionTitulo':
            //imagen titulo
            const publicacion =  await Publicacion.findById(id);
            if(!publicacion){
                return false;
            }

            const pathPublicacionViejo =`./uploads/publicacionTitulo/${publicacion.imgTitulo}`;
            if(fs.existsSync(pathPublicacionViejo)){
                fs.unlinkSync(pathPublicacionViejo);
            }

            publicacion.imgTitulo=nombreArchivo;
            await publicacion.save();
            return true;

            break;
        case 'publicacionSubtitulo':
                //imagen titulo
                const publicacion1 =  await Publicacion.findById(id);
                if(!publicacion1){
                    return false;
                }
    
                const pathPublicacionViejo2 =`./uploads/publicacionSubtitulo/${publicacion1.imgSubtitulo}`;
                if(fs.existsSync(pathPublicacionViejo2)){
                    fs.unlinkSync(pathPublicacionViejo2);
                }
    
                publicacion1.imgSubtitulo=nombreArchivo;
                await publicacion1.save();
                return true;
    
                break;
        case 'publicaciones':
            //imagen principal de la publicacion
            const publicacionPrincipal =  await Publicacion.findById(id);
            if(!publicacionPrincipal){
                return false;
            }

            const pathPublicacionViejoPrincipal =`./uploads/publicaciones/${publicacionPrincipal.img}`;
            if(fs.existsSync(pathPublicacionViejoPrincipal)){
                fs.unlinkSync(pathPublicacionViejoPrincipal);
            }

            publicacionPrincipal.img=nombreArchivo;
            await publicacionPrincipal.save();
            return true;

            break;
        default:
            break;
    }

}


module.exports={
    actualizarImagen
}