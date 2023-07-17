const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const Event = require('../models/Event');

router.post('/getevents', async (req, res) => {
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
		const events = await Event.find({ clientId: isVerified._id });
		res.status(200).json(events);
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

router.post('/event', async (req, res) => {
	let isVerified;
	try {
		isVerified = await jwt.verify(req.body.token, secretKey);
	} catch (e) {
		res.status(500).send('invalid token');
		console.log(e);
		return;
	}

	try {
		const { event, thoughts, emotions } = req.body;
		let newEvent = new Event({
			event,
			thoughts,
			emotions,
			clientId: isVerified._id,
		});
		await newEvent.save();
		const events = await Event.find({ clientId: isVerified._id });

		res.status(200).json(events);
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

router.put('/event', async (req, res) => {
	let isVerified;
	try {
		isVerified = await jwt.verify(req.body.token, secretKey);
	} catch (e) {
		res.status(500).send('invalid token');
		console.log(e);
		return;
	}

	try {
		const { id } = req.body.event;
		await Event.findByIdAndUpdate(id, req.body.event);
		const events = await Event.find({ clientId: isVerified._id });
		res.status(200).json(events);
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

router.post('/removeevent', async (req, res) => {
	let isVerified;
	try {
		isVerified = await jwt.verify(req.body.token, secretKey);
	} catch (e) {
		res.status(500).send('invalid token');
		console.log(e);
		return;
	}

	try {
		const eventId = req.body.eventId;
		await Event.findByIdAndDelete(eventId);
		const events = await Event.find({ clientId: isVerified._id });
		res.status(200).json(events);
	} catch (e) {
		res.status(400).send('server error');
		console.log(e);
	}
});

module.exports = router;
