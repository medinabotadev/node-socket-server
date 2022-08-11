const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()

// Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.listen(process.env.PORT, (error) =>{
    if(error) throw new Error(error);
    console.log('Servidor corriendo en puerto', process.env.PORT)
})