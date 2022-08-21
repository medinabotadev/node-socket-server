const express = require('express');
const path = require('path');
require('dotenv').config()

// App de Express
const app = express();

// Node server (Socket)
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');

// Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (error) => {
    if (error) throw new Error(error);
    console.log('Server running on port', process.env.PORT)
})