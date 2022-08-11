const { io } = require('../index');

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