var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var config = require('../_config');
var $ = require('jquery');
var textOnly = [];
var arr = [];
var q = [];

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
            var joinq = (tweets[i].text).split(" ");
            arr.push(joinq);
          }
          textOnly = Array.prototype.concat.apply([], arr);
          var unique = textOnly.filter(function(elem, pos) {
            return textOnly.indexOf(elem) == pos;
          });
          console.log(JSON.stringify(unique));
          
      		res.status(200).render('tweet', { title: 'Twitterale', tweets: tweets, textOnly: unique });
    	}
    	else {
      		res.status(500).json({ title: 'Error!', error: error });
    	}
  	});
});

router.post('/tweet', function(req, res){
  res.render('wordcloud', {textOnly: unique});
});
router.get('/wordcloud', function(req, res){
  res.render('wordcloud');
});

module.exports = router;
