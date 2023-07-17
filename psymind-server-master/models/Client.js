const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isPsychologist: {
		type: Boolean,
		required: true,
	},
	chainedAccounts: {
		type: [],
		required: true,
	},
});

module.exports = mongoose.model('client', ClientSchema);
