const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { mongodb } = require('./config');
const tables = require('./routes/tables');
const clients = require('./routes/clients');
const beliefs = require('./routes/beliefs');
const thoughts = require('./routes/thoughts');
const events = require('./routes/events');
const chainedAccounts = require('./routes/chainedAccounts');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/tables', tables);
app.use('/api/clients', clients);
app.use('/api/beliefs', beliefs);
app.use('/api/thoughts', thoughts);
app.use('/api/events', events);
app.use('/api/chainedAccounts', chainedAccounts);

mongoose
	.connect(mongodb, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Now connected to MongoDB!'))
	.catch((err) => console.error('Something went wrong', err));

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
