const mongoose = require('mongoose');

const BeliefSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	forr: {
		type: [],
	},
	against: {
		type: [],
	},
	clientId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('belief', BeliefSchema);
