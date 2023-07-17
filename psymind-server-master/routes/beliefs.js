const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const Belief = require('../models/Belief');

router.post('/getbeliefs', async (req, res) => {
	const token = req.body.token;
	let isVerified;

	try {
		isVerified = await jwt.verify(token, secretKey);
	} catch (e) {
		res.status(500).send('invalid token');
		console.log(e);
		return;
	}

	try {
		const beliefs = await Belief.find({ clientId: isVerified._id });
		res.status(200).json(beliefs);
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

router.post('/belief', async (req, res) => {
	let isVerified;
	try {
		isVerified = await jwt.verify(req.body.token, secretKey);
	} catch (e) {
		res.status(500).send('invalid token');
		console.log(e);
		return;
	}

	try {
		const { name, forr, against } = req.body.belief;
		let newBelief = new Belief({
			name,
			forr,
			against,
			clientId: isVerified._id,
		});
		await newBelief.save();
		const beliefs = await Belief.find({ clientId: isVerified._id });

		res.status(200).json(beliefs);
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

router.put('/belief', async (req, res) => {
	let isVerified;
	try {
		isVerified = await jwt.verify(req.body.token, secretKey);
	} catch (e) {
		res.status(500).send('invalid token');
		console.log(e);
		return;
	}

	try {
		const { id } = req.body.belief;
		await Belief.findByIdAndUpdate(id, req.body.belief);
		const beliefs = await Belief.find({ clientId: isVerified._id });
		res.status(200).json(beliefs);
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

router.post('/removebelief', async (req, res) => {
	let isVerified;
	try {
		isVerified = await jwt.verify(req.body.token, secretKey);
	} catch (e) {
		res.status(500).send('invalid token');
		console.log(e);
		return;
	}

	try {
		const beliefId = req.body.beliefId;
		await Belief.findByIdAndDelete(beliefId);
		const beliefs = await Belief.find({ clientId: isVerified._id });
		res.status(200).json(beliefs);
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

module.exports = router;
