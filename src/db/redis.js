const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');
// Create a new client
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
// Connect to redis
async function connect() {
    await redisClient.connect()
        .then(() => { console.log('connect to redis server success'); })
        .catch(err => { console.error(err); });
}
connect();
// Set a key
async function set(key, val) {
    let objVal;
    if (typeof val === 'object') {
        objVal = JSON.stringify(val);
    } else {
        objVal = val;
    }
    await redisClient.set(key, objVal)
        .then(val => { console.log('succes set a key'); })
        .catch(err => { console.error(err); });
}
// Get a key
async function get(key) {
    try {
        const val = await redisClient.get(key);
        if (val === null) {
            return null;
        }
        return JSON.parse(val);
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = {
    set,
    get
}
