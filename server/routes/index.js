var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var config = require('../_config');
var textOnly = [];

// Authentication for twitter
var passportTwitter = require('../auth/twitter');
var client = new Twitter({
	consumer_key: config.twitter.consumerKey,
  	consumer_secret: config.twitter.consumerSecret,
  	access_token_key: config.twitter.accessTokenKey,
  	access_token_secret: config.twitter.accessTokenSecret
});


router.get('/', function(req, res, next){
  res.render('index', { title: 'Twitterale' });
});

router.get('/login', function(req,res,next){
	res.send('Stop being a smartass');
});



router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback', passportTwitter.authenticate('twitter', 
{ successRedirect: '/tweet', failureRedirect: '/error' }));

router.get('/tweet', function(req, res){
	if (passportTwitter.authenticate('twitter'))
		client.get('statuses/user_timeline', function(error, tweets, response) {
    	if (!error) {
          for (var i=0; i<tweets.length; i++){
            textOnly.push(tweets[i].text);
          }
          //express.locals.textOnly = textOnly; // not a good idea!
          
      		res.status(200).render('tweet', { title: 'Twitterale', tweets: tweets });
    	}
    	else {
      		res.status(500).json({ title: 'Error!', error: error });
    	}
  	});
});

router.get('/wordcloud', function(req, res){
  res.render('wordcloud');
});

module.exports = router;
