/**
 * Created by jp on 29/09/17.
 */
const redis = require('redis');

var REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
var REDIS_PORT = process.env.REDIS_PORT || 6379;

//connect to redis
var client = redis.createClient(REDIS_PORT, REDIS_HOST);

var get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if(err) reject(err);
      resolve(data);
    });
  });
};

var hgetall = (key) => {
  return new Promise((resolve, reject) => {
    if(key === null) reject();
    client.hgetall(key, (err, data) => {
      if(err) reject(err);
      resolve(data);
    });
  });
};

var lrange = (key) => {
  return new Promise((resolve, reject) => {
    client.lrange(key, [0, -1], (err, data) => {
      if(err) reject(err);
      resolve(data);
    });
  });
};

module.exports.get = get;
module.exports.hgetall = hgetall;
module.exports.lrange = lrange;
module.exports.client = client;