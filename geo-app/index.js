/**
 * Created by jp on 28/09/17.
 */

const express = require('express'),
  process = require('process'),
  redis = require('./redis.js');

var app = express();
//setup redis data
redis.client.flushall();
redis.client.geoadd('places', 86.2520, 41.6764, "South Bend");
redis.client.geoadd('places', 85.9767, 41.6820, "Elkhart");
redis.client.geoadd('places', 87.6298, 41.8781, "Chicago");

app.get('/aroundsb/:miles', (req, res) => {
  redis.aroundSB(parseInt(req.params.miles))
    .then((data) => res.send(data));
});

app.get('/around/:long/:lat/:miles', (req, res) => {
  redis.aroundLoc(req.params.long, req.params.lat, parseInt(req.params.miles))
    .then((data) => res.send(data));
});

// a porta está sendo o argumento para que possa ser criada duas instâncias com portas diferentes
// então rode cada aplicação separadamente com node index.js [porta], não pelo docker-compose

// #start redis server
// docker run --name packt-redis -p 16379:6379 -d redis:3.2.4

// #start node app
// REDIS_PORT=16749 REDIS_HOST=127.0.0.1 node app/index [porta]

app.listen(process.argv[2]);