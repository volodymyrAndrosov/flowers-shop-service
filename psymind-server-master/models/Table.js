const mongoose = require('mongoose');

const TableSchema = mongoose.Schema({
	rows: {
		type: [],
		required: true,
	},
	clientId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('table', TableSchema);
