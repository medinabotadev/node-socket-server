const { io } = require('../index');
const Candidates = require('../models/candidates');
const Candidate = require('../models/candidate');

const candidates = new Candidates();
candidates.addCandidate(new Candidate('Medina'));
candidates.addCandidate(new Candidate('Gonzalez'));
candidates.addCandidate(new Candidate('Robens'));
candidates.addCandidate(new Candidate('Mendoza'));
candidates.addCandidate(new Candidate('Trump'));

// Mensajes de sockets
io.on('connection', client => {
    console.log('Client connected')
    client.emit('active-candidates', candidates.getCandidates());
    // client.on('event', data => {
    //     console.log('event')
    // });
    client.on('disconnect', () => {
        console.log('Client disconnected')
    });

    // client.on('message', (payload) => {
    //     console.log('Message receive from backend', payload)

    //     io.emit('message', { server: 'Message receive' })
    // });

    // client.on('emit-message', (payload) => {
    //     // io.emit('new-message', payload); // emit to all clients
    //     client.broadcast.emit('new-message', payload); // emite a todos menos al que emitio
    // })

    client.on('vote-candidate', (payload) => {
        candidates.voteCandidate(payload.id);
        io.emit('active-candidates', candidates.getCandidates());
    });

    client.on('add-candidate', (payload) => {
        const newCandidate = new Candidate(payload.name)
        candidates.addCandidate(newCandidate);
        io.emit('active-candidates', candidates.getCandidates());
    });

    client.on('delete-candidate', (payload) => {
        candidates.deleteCandidate(payload.id);
        io.emit('active-candidates', candidates.getCandidates());
    });
});