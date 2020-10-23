
const asyncRedis = require('async-redis');


const host = "127.0.0.1"
const port =6379
//const redisClient = asyncRedis.createClient({host:'redis'});
const redisClient = asyncRedis.createClient();

redisClient.on("connect",() => {
  console.log(`Redis: ${host}:${port}`);
})
redisClient.on('error', function(err) {
  // eslint-disable-next-line no-console
  console.log(`[Redis] Error ${err}`);
});


module.exports={redisClient};
