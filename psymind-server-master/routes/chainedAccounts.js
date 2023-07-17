const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');
const { secretKey } = require('../config');

router.post('/chainedAccount', async (req, res) => {
	let userId;
	try {
		userId = await jwt.verify(req.body.token, secretKey)._id;
	} catch (e) {
		res.status(500).send('invalid token');
		console.log(e);
		return;
	}
	try {
		const newChainedAccountId = await jwt.verify(
			req.body.newChainedAccount.token,
			secretKey
		)._id;
		if (newChainedAccountId) {
			let user = await Client.findById(userId);
			let newChainedAccount = await Client.findById(newChainedAccountId);
			if (
				user.chainedAccounts.find(
					(account) => account.email === newChainedAccount.email
				)
			) {
				return res.status(400).send('user already exists');
			}
			newChainedAccount = await Client.findByIdAndUpdate(newChainedAccountId, {
				chainedAccounts: [
					...newChainedAccount.chainedAccounts,
					{
						name: user.name,
						email: user.email,
						token: jwt.sign({ _id: user._id }, 'PrivateKey'),
					},
				],
			});
			await Client.findByIdAndUpdate(user, {
				chainedAccounts: [
					...user.chainedAccounts,
					{
						name: newChainedAccount.name,
						email: newChainedAccount.email,
						token: jwt.sign({ _id: newChainedAccount._id }, 'PrivateKey'),
					},
				],
			});
			user = await Client.findById(userId);
			res.status(200).json({
				chainedAccounts: user.chainedAccounts,
			});
		} else {
			res.status(400).send('bad token');
		}
	} catch (e) {
		res.status(500).send('server error');
		console.log(e);
	}
});

router.post('/removeChainedAccount', async (req, res) => {
	let userId;
	try {
		userId = await jwt.verify(req.body.token, secretKey)._id;
	} catch (e) {
		res.status(500).send('invalid token');
		console.log(e);
		return;
	}
	try {
		if (userId) {
			let user = await Client.findById(userId);
			let oldChainedAccount = await Client.findOne({ email: req.body.email });

			let newChainedAccounts = [...oldChainedAccount.chainedAccounts];
			newChainedAccounts.splice(
				newChainedAccounts.findIndex((acc) => acc.email === user.email),
				1
			);
			await Client.findByIdAndUpdate(oldChainedAccount._id, {
				chainedAccounts: newChainedAccounts,
			});

			newChainedAccounts = [...user.chainedAccounts];
			newChainedAccounts.splice(
				newChainedAccounts.findIndex((acc) => acc.email === req.body.email),
				1
			);
			await Client.findByIdAndUpdate(user, {
				chainedAccounts: newChainedAccounts,
			});
			user = await Client.findById(userId);
			res.status(200).json({
				chainedAccounts: user.chainedAccounts,
			});
		} else {
			res.status(400).send('bad token');
		}
	} catch (e) {
		res.status(500).send('server error');
		console.log(e);
	}
});

module.exports = router;
