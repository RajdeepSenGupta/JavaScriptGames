var express = require('express');
var socket = require('socket.io');

var app = express();
var port = 3000;
var server = app.listen(port);
var io = socket(server);

app.use(express.static('app'));
console.log("Server is running on port: " + port);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('New connection: ' + socket.id);

    socket.on('liveEventData', (data) => {
        socket.broadcast.emit('liveEventData', data);
    });
    
    socket.on('movementEventData', (data) => {
        socket.broadcast.emit('movementEventData', data);
	});

    socket.on('stopMovementEventData', (data) => {
        socket.broadcast.emit('stopMovementEventData', data);
    });

    socket.on('startEventData', (data) => {
        socket.broadcast.emit('startEventData', data);
    });
    
    socket.on('resetGameEventData', (data) => {
        socket.broadcast.emit('resetGameEventData', data);
    });
    
    socket.on('resetScoreEventData', (data) => {
        socket.broadcast.emit('resetScoreEventData', data);
    });
}