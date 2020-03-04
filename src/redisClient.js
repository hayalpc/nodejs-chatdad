const redis = require('redis');

const getClient = ()=>{
    return redis.createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        no_ready_check: true
    });
};
module.exports.getClient = getClient;