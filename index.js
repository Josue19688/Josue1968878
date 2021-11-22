const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {dbConnection} = require('./database/config');


const app = express();

dbConnection();


app.use(cors());
app.use(express.json());
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/publicacion',require('./routes/publicacion'));
app.use('/api/uploads',require('./routes/uploads'));
app.use('/api/todo',require('./routes/busquedas'));//para buscar publicacion

app.listen(process.env.PORT,()=>{
    console.log('Servidor Corriendo en el puerto',process.env.PORT);
})