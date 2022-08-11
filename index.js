const express = require('express');
const path = require('path');
require('dotenv').config()

// App de Express
const app = express();

// Node server (Socket)
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Mensajes de sockets
io.on('connection', client => {
    console.log('Client connected')
    client.on('event', data => {
        console.log('event')
    });
    client.on('disconnect', () => {
        console.log('Client disconnected')
    });

    client.on('message', (payload) => {
        console.log('Message receive from backend', payload)

        io.emit('message', {server: 'Message receive'})
    });
});


// Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (error) => {
    if (error) throw new Error(error);
    console.log('Server running on port', process.env.PORT)
})