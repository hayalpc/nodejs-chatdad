const redisClient = require('../redisClient');

function Users() {
    this.client = redisClient.getClient();
}

Users.prototype.remove = function (userId) {
    this.client.hdel(
        'online',
        userId,
        (err) => {
            if (err)
                console.log(err);
        }
    );
};

Users.prototype.upsert = function (connectionId, meta) {
    this.client.hset(
        'online',
        meta._id,
        JSON.stringify({
            connectionId,
            meta,
            when: Date.now()
        }),
        err => {
            if (err)
                console.log(err);
        }
    );
};

Users.prototype.list = function (callback) {
    this.client.hgetall('online', function (err, users) {
        let active = [];
        if (err) {
            console.log(err);
            return callback([]);
        }
        for (let user in users) {
            active.push(JSON.parse(users[user]));
        }
        return callback(active);
    });
};

Users.prototype.sendList
module.exports = new Users();
