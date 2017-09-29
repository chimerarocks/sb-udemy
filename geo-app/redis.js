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

var aroundLoc = (long, lat, miles) => {
  return new Promise((resolve, reject) => {
    client.georadius('places', long, lat, miles, 'mi', 'WITHDIST', promiser(resolve, reject));
  });
};

var aroundSB = (miles) => {
  return new Promise((resolve, reject) => {
    client.georadiusbymember('places', "South Bend", miles, 'mi', 'WITHDIST', promiser(resolve, reject));
  });
};

module.exports.aroundLoc = aroundLoc;
module.exports.aroundSB = aroundSB;
module.exports.client = client;