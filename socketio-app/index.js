/**
 * Created by jp on 29/09/17.
 */
const express = require('express'),
  socketio = require('socket.io');

var app = express();
var server = app.listen(3000);
var io = socketio(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  console.log('A socket is now open');
  console.log(socket);
});

// Ao executar este código é necessário estar no diretório deste app por causa do static do express