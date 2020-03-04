const redisClient = require('../redisClient');

function Rooms() {
    this.client = redisClient.getClient();
}

Rooms.prototype.upsert = function (roomName, userId) {
    let roomId = Math.random().toString(36).substr(7);
    this.client.hset(
        'rooms',
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

Rooms.prototype.list = function (callback) {

    this.client.hgetall('rooms', function (err, rooms) {
        let active = [];
        if (err) {
            console.log(err);
            return callback([]);
        }
        for (let room in rooms) {
            active.push(JSON.parse(rooms[room]));
        }
        return callback(active);
    });
};

module.exports = new Rooms();
