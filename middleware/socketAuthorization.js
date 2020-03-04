const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportSocketio = require('passport.socketio');
const redisStore = require('../helper/redis');


function onAuthorizeSuccess(data, accept){
    console.log('successful connection to socket.io');
    // The accept-callback still allows us to decide whether to
    // accept the connection or not.
    accept(null, true);

}

function onAuthorizeFail(data, message, error, accept){
    // error indicates whether the fail is due to an error or just a unauthorized client
    if(error){
        throw new Error(message);
    } else {
        console.log("onAuthorizeFail: " + message);
        // the same accept-method as above in the success-callback
        accept(null, false);
    }
}

module.exports = passportSocketio.authorize({
    passport:passport,
    cookieParser: cookieParser,       // the same middleware you registrer in express
    key:          'express.sid',       // the name of the cookie where express/connect stores its session_id
    secret:       process.env.SESSION_SECRET_KEY,    // the session_secret to parse the cookie
    store:        redisStore,        // we NEED to use a sessionstore. no memorystore please
    success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
    fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
});
