/**
 * Created by jp on 29/09/17.
 */
const express = require('express'),
  socketio = require('socket.io');

var app = express();
var server = app.listen(3000);
var io = socketio(server);

app.use(express.static('static'));

app.use(express.static('static'));

io.on('connection', (socket) => {
  socket.broadcast.emit('user.events', 'Someone has joined!');
  socket.on('name', (name) => {
    console.log(name + ' says hello!');
    socket.broadcast.emit('name', name);
  });
});
// Ao executar este código é necessário estar no diretório deste app por causa do static do express