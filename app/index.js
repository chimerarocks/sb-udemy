/**
 * Created by jp on 28/09/17.
 */

const express = require('express'),
  process = require('process'),
  redis = require('redis');

var app = express();

var REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
var REDIS_PORT = process.env.REDIS_PORT || 6379;

//connect to redis
var redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);
var publishClient = redis.createClient(REDIS_PORT, REDIS_HOST);
redisClient.on("message", (channel, message) => {
  console.log(message);
});

redisClient.subscribe('REQUESTS');

app.get('/', (req, res) => {
  publishClient.publish('REQUESTS', `Request on ${req.socket.localPort} for ${req.url}`);
  console.log(`Local log for ${req.url}`);
  res.end();
});

// app.listen(8080);
// a porta está sendo o argumento para que possa ser criada duas instâncias com portas diferentes
// então rode cada aplicação separadamente com node index.js [porta], não pelo docker-compose

// #start redis server
// docker run --name packt-redis -p 16379:6379 -d redis:3.2.4

// #start node app
// REDIS_PORT=16749 REDIS_HOST=127.0.0.1 node app/index [porta]

app.listen(process.argv[2]);