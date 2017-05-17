var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a user
var User = new Schema({
	name : String,
	someID : String
});

module.exports = mongoose.model('users',User);