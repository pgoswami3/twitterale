var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req,res,next){
	res.send('Go back and register');
});

// For twitter
var passportTwitter = require('../auth/twitter');

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback', passportTwitter.authenticate('twitter', {failedRedirect: '/login'}), function(req,res){
	res.render('tweet', {title : 'Twitter'});
});

module.exports = router;
