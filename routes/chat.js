const express = require('express');
const router = express.Router();
const User = require('../models/users');

/* GET Chat page. */
router.get('/', function(req, res, next) {
    res.render('chat',{user:req.user,title:'Sohbetler'});
});

module.exports = router;
