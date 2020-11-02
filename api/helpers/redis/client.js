
const asyncRedis = require('async-redis');

const port = process.env.REDIS_PORT
const host = process.env.REDIS_HOST || "127.0.0.1"


const redisClient = asyncRedis.createClient(process.env.REDISTOGO_URL || {port:port,host:host});

redisClient.on("connect",() => {
  console.log(`Redis : ${port} ${host}`);
})
redisClient.on('error', function(err) {
 
  console.log(port,host)
  // eslint-disable-next-line no-console
  console.log(`[Redis] Error ${err}`);
});


module.exports={redisClient};
