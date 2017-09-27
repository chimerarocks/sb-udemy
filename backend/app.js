/**
 * Created by jp on 27/09/17.
 */

const express = require('express');
const restful = require('node-restful');
const server = express();
const mongoose = restful.mongoose;
const bodyParser = require('body-parser');
const cors = require('cors');

// Database
mongoose.Promise = global.Promise;

/** Aqui no endereço pode-se observar que foi mapeado para 'db' que é o nome do service no docker-compose */
mongoose.connect('mongodb://db/mydb');

// Teste
server.get('/', (req, res, next) => res.send('Backend'));

// Start Server
server.listen(3000);