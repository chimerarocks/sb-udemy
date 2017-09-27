/**
 * Created by jp on 27/09/17.
 */

const express = require('express');
const restful = require('node-restful');
const server = express();
const mongoose = restful.mongoose;
const bodyParser = require('body-parser');

/** o Cors será necessário para que o front end que está em outro container possa acessar o backend*/
const cors = require('cors');

// Database
mongoose.Promise = global.Promise;

/** Aqui no endereço pode-se observar que foi mapeado para 'db' que é o nome do service no docker-compose */
mongoose.connect('mongodb://db/mydb');

// Middlewares
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cors());

// ODM
const Client = restful.model('Client', {
  name: { type: String, required: true }
});

// Rest API
Client.methods(['get', 'post', 'put', 'delete']);
Client.updateOptions({new: true, runValidators: true});

// Routes
Client.register(server, '/clients');

// Start Server
server.listen(3000);