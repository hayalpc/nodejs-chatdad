const express = require('express');
const router = express.Router();
const User = require('../models/users');

/* GET home page. */
router.get('/', (req, res, next) => {
    if(!req.user)
        res.render('index', { title: 'ChatDad Login' });
    else
        res.redirect('/chat');
});

module.exports = router;
