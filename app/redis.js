/**
 * Created by jp on 29/09/17.
 */
const redis = require('redis');

var REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
var REDIS_PORT = process.env.REDIS_PORT || 6379;

//connect to redis
var client = redis.createClient(REDIS_PORT, REDIS_HOST);

var promiser = (resolve, reject) => {
  return (err, data) => {
    if(err) reject(err);
    resolve(data);
  };
};

var get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, promiser(resolve, reject));
  });
};

var hgetall = (key) => {
  return new Promise((resolve, reject) => {
    if(key === null) reject();
    client.hgetall(key, promiser(resolve, reject));
  });
};

var zrevrangebyscore = (key, max, min) => {
  return new Promise((resolve, reject) => {
    client.zrevrangebyscore(key, max, min, promiser(resolve, reject));
  });
};

module.exports.get = get;
module.exports.hgetall = hgetall;
module.exports.zrevrangebyscore = zrevrangebyscore;
module.exports.client = client;