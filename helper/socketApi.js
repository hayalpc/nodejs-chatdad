const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');

const io = socketio();

const socketApi = {
    io:io
};

io.use(socketAuthorization);

/**
 * @type {Users}
 */
const Users = require('../src/lib/Users');
const Rooms = require('../src/lib/Rooms');

/**
 * Redis adapter
 */
const redisAdapter = require('socket.io-redis');

io.adapter(redisAdapter({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pass: process.env.REDIS_PASS
}));

io.on('connection',(socket)=>{
    console.log('user connected ' + socket.request.user.name);
    Users.upsert(socket.id,socket.request.user);

    socket.on('newRoom',roomName =>{
        Rooms.upsert(roomName,socket.request.user._id);
        Rooms.list(rooms=>{
            io.emit('roomList',rooms);
        });
    });

    Users.list(users=>{
        io.emit('onlineList',users);
    });

    Rooms.list(rooms=>{
        io.emit('roomList',rooms);
    });

    socket.on('disconnect',(data)=>{
        console.log('user disconnected ' + socket.request.user.name);
        Users.remove(socket.request.user._id);

        Users.list(users=>{
            io.emit('onlineList',users);
        });
    });
});



module.exports = socketApi;