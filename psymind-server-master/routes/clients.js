const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

router.put('/isclient', async (req, res) => {
	const token = req.body.token;
	try {
		const isVerified = await jwt.verify(token, secretKey);
		const client = await Client.findById(isVerified._id);
		if (client) {
			res.json({
				isClient: true,
				userName: client.name,
				isPsychologist: client.isPsychologist,
				chainedAccounts: client.chainedAccounts,
			});
		} else {
			res.json({ isClient: false });
		}
	} catch (e) {
		res.status(500).send('invalid');
		console.log(e);
	}
});

router.post('/register', async (req, res) => {
	try {
		let { name, email, password, isPsychologist } = req.body;
		const clientEmail = await Client.findOne({ email });
		const clientName = await Client.findOne({ name });

		if (clientEmail) {
			return res.json({ error: 'email already exist' });
		}
		if (clientName) {
			return res.json({ error: 'name already exist' });
		}

		const salt = await bcrypt.genSalt(10);
		password = await bcrypt.hash(password, salt);

		const newClient = new Client({
			name,
			email,
			password,
			isPsychologist,
			chainedAccounts: [],
		});
		const doc = await newClient.save();
		const token = jwt.sign({ _id: doc._id }, secretKey);

		res.json({
			token,
			userName: doc.name,
			isPsychologist: doc.isPsychologist,
			chainedAccounts: doc.chainedAccounts,
		});
	} catch (e) {
		res.status(500).json({ error: 'SERVER ERROR' });
		console.log(e);
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const client = await Client.findOne({ email });

		if (!client) {
			return res.json({ error: 'wrong email' });
		}

		const validPassword = await bcrypt.compare(password, client.password);
		if (!validPassword) {
			return res.json({ error: 'wrong password' });
		}
		const token = jwt.sign({ _id: client._id }, secretKey);

		res.json({
			token,
			userName: client.name,
			isPsychologist: client.isPsychologist,
			chainedAccounts: client.chainedAccounts,
		});
	} catch (e) {
		res.status(500).json({ error: 'SERVER ERROR' });
		console.log(e);
	}
});

module.exports = router;
