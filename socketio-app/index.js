/**
 * Created by jp on 29/09/17.
 */
const express = require('express'),
  socketio = require('socket.io');

var app = express();
var server = app.listen(3000);
var io = socketio(server);

app.use(express.static('static'));

/**
 * a diferença entre socket e io é que o socket se refere somente ao socket que emitiu o evento
 * , enquanto o io é o servidor então ele emitirá a todos os sockets
 */
io.on('connection', (socket) => {
  socket.on('name', (name) => {
    console.log(name + ' says hello!');
    io.emit('name', name);
  });
});
// Ao executar este código é necessário estar no diretório deste app por causa do static do express