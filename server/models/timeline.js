var Twitter = require('twitter');
var config = require('../_config');
 
var client = new Twitter({
  accessTokenKey: config.twitter.accessTokenKey,
  accessTokenSecret: config.twitter.accessTokenSecret,
  consumerKey : config.twitter.consumerKey,
  consumerSecret : config.twitter.consumerSecret
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

module.exports = client;