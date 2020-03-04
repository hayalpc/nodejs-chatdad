const redisClient = require('../redisClient');

function Messages() {
    this.client = redisClient.getClient();
}

Messages.prototype.upsert = function (roomId, userId) {
    this.client.hset(
        'Messages',
        '@Room:' + roomId,
        JSON.stringify({
            id: '@Room:' + roomId,
            roomName,
            creater: userId,
            when: Date.now()
        }),
        err => {
            if (err)
                console.log(err);
        }
    );
};



module.exports = new Messages();
