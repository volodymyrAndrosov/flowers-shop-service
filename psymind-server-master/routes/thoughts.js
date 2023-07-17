const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const Thought = require('../models/Thought');
const questions = require('../questions');

router.post('/getthoughts', async (req, res) => {
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
    const thoughts = await Thought.find({ clientId: isVerified._id });
    res.status(200).json(thoughts);
  } catch (e) {
    res.status(400).send('server error');
    console.log(e);
  }
});

router.post('/thought', async (req, res) => {
  let isVerified;
  try {
    isVerified = await jwt.verify(req.body.token, secretKey);
  } catch (e) {
    res.status(500).send('invalid token');
    console.log(e);
    return;
  }

  try {
    const { name } = req.body.thought;
    let newThought = new Thought({
      name,
      questions,
      clientId: isVerified._id,
    });
    await newThought.save();
    const thoughts = await Thought.find({ clientId: isVerified._id });

    res.status(200).json(thoughts);
  } catch (e) {
    res.status(400).send('server error');
    console.log(e);
  }
});

router.put('/thought', async (req, res) => {
  let isVerified;
  try {
    isVerified = await jwt.verify(req.body.token, secretKey);
  } catch (e) {
    res.status(500).send('invalid token');
    console.log(e);
    return;
  }

  try {
    const { _id } = req.body.thought;
    await Thought.findByIdAndUpdate(_id, req.body.thought);
    const thoughts = await Thought.find({ clientId: isVerified._id });
    res.status(200).json(thoughts);
  } catch (e) {
    res.status(400).send('server error');
    console.log(e);
  }
});

router.post('/removethought', async (req, res) => {
  let isVerified;
  try {
    isVerified = await jwt.verify(req.body.token, secretKey);
  } catch (e) {
    res.status(500).send('invalid token');
    console.log(e);
    return;
  }

  try {
    const thoughtId = req.body.thoughtId;
    await Thought.findByIdAndDelete(thoughtId);
    const thoughts = await Thought.find({ clientId: isVerified._id });
    res.status(200).json(thoughts);
  } catch (e) {
    res.status(400).send('server error');
    console.log(e);
  }
});

module.exports = router;
