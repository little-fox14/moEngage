const express = require('express');
const router = express.Router();
const List = require('../models/List.js');

// Create a list
router.post('/', async (req, res) => {
  const { name, responseCodes, imageLinks } = req.body;
  const list = new List({ name, responseCodes, imageLinks, createdAt: new Date() });
  await list.save();
  res.status(201).send('List saved');
});

// Get all lists
router.get('/', async (req, res) => {
  const lists = await List.find();
  res.json(lists);
});

// Delete a list
router.delete('/:id', async (req, res) => {
  await List.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Update a list
router.put('/:id', async (req, res) => {
  const { name, responseCodes, imageLinks } = req.body;
  await List.findByIdAndUpdate(req.params.id, { name, responseCodes, imageLinks });
  res.status(200).send('List updated');
});

module.exports = router;
