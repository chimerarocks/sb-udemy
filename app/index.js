/**
 * Created by jp on 28/09/17.
 */

const express = require('express'),
  process = require('process'),
  redis = require('./redis.js');

var app = express();
//setup redis data
redis.client.flushall();
redis.client.hmset('dog:1', ['name', 'gizmo', 'age', '5']);
redis.client.hmset('dog:2', ['name', 'dexter', 'age', '6']);
redis.client.hmset('dog:3', ['name', 'fido', 'age', '5']);
//we are using name like username, unique
redis.client.set('dog:name:gizmo', 'dog:1');
redis.client.set('dog:name:dexter', 'dog:2');
redis.client.set('dog:name:fido', 'dog:3');

app.use((req, res, next) => {
  console.time('request');
  next();
});

app.get('/dog/name/:name', (req, res) => {
  var now = Date.now();
  redis.client.zadd('dog:last-lookup', [now, 'dog:name:' + req.params.name]);
  //first find the id
  redis.get('dog:name:' + req.params.name)
    .then((data) => {
      redis.client.hset(data, 'last-lookup', now);
      return data;
    })
    .then(redis.hgetall)
    .then((data) => res.send(data));
  console.timeEnd('request');
});

app.get('/dog/any', (req, res) => {
  redis.zrevrangebyscore('dog:last-lookup', '+inf', '-inf')
    .then((data) => Promise.all(data.map(redis.get)))
    .then((data) => { console.log('any: ', data); return Promise.all(data.map(redis.hgetall))})
    .then((data) => res.send(data));
  console.timeEnd('request');
});

app.get('/dog/latest', (req, res) => {
  var now = Date.now();
  var minuteAgo = now - 60000;
  redis.zrevrangebyscore('dog:last-lookup', now, minuteAgo)
    .then((data) => Promise.all(data.map(redis.get)))
    .then((data) => Promise.all(data.map(redis.hgetall)))
    .then((data) => res.send(data));
  console.timeEnd('request');
});

// a porta está sendo o argumento para que possa ser criada duas instâncias com portas diferentes
// então rode cada aplicação separadamente com node index.js [porta], não pelo docker-compose

// #start redis server
// docker run --name packt-redis -p 16379:6379 -d redis:3.2.4

// #start node app
// REDIS_PORT=16749 REDIS_HOST=127.0.0.1 node app/index [porta]

app.listen(process.argv[2]);