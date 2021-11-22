const {Schema, model} = require('mongoose');


const PublicacionSchema= Schema({
    nombre:{
        type:String,
        require:true
    },
    categoria:{
        type:String,
        require:true
    },
    titulo:{
        type:String,
        require:true
    },
    subtitulo:{
        type:String,
        require:true
    },
    img:{
        type:String
    },
    imgTitulo:{
        type:String
    },
    imgSubtitulo:{
        type:String
    },
    descripcion:{
        type:String
    },
    usuario:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }
},{collection:'Publicacion'});
PublicacionSchema.method('toJSON',function(){
    const {__v, ...object}=this.toObject();
    
    return object;
})
module.exports = model('Publicacion', PublicacionSchema);