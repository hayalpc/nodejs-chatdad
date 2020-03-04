const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();


const routes = require('./routes/index');
const auth = require('./routes/auth');
const chat = require('./routes/chat');

const app = express();

//helpers
const db = require('./helper/db')();
const redisStore = require('./helper/redis');

//middleware
const isAuthenticaed = require('./middleware/isAuthenticated');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    key:          'express.sid',       // the name of the cookie where express/connect stores its session_id
    store: redisStore,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:14*24*3600000}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/auth', auth);
app.use('/chat',isAuthenticaed, chat);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
