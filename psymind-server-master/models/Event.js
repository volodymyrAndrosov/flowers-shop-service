const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
	event: {
		type: String,
		required: true,
	},
	thoughts: {
		type: String,
		required: true,
	},
	emotions: {
		type: String,
		required: true,
	},
	clientId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('event', EventSchema);
