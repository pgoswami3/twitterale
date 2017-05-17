var passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy,
	User = require('../models/user'),
	config = require('../_config'),
	init = require('./init');

passport.use(new TwitterStrategy({
	consumerKey : config.twitter.consumerKey,
	consumerSecret : config.twitter.consumerSecret,
	callbackURL: config.twitter.callbackURL
	},
	function(accessToken, refreshToken, profile, done){
		var searchQuery = {
			name: profile.displayName
		};

		var updates = {
			name: profile.displayName,
			someID : profile.id
		};

		var options = {
			upsert : true
		};

		// update the user if exists or add a new one
		User.findOneAndUpdate(searchQuery, updates, options, function(err,user){
			if(err)
				return done(err);
			else
				return done(null, user);
		});
	}
));

// serialize user into the session
init();

module.exports = passport;