/**
 * Minimal Express server for Supertest API tests.
 * Uses in-memory data (no localStorage) so it runs in Node.
 */
const express = require('express');

const app = express();
app.use(express.json());

const planets = [
  { id: 0, name: 'Mercury', currentPopulation: 0 },
  { id: 1, name: 'Venus', currentPopulation: 0 },
  { id: 2, name: 'Earth', currentPopulation: 100000 },
  { id: 3, name: 'Mars', currentPopulation: 0 },
];

let spacecrafts = [
  { id: 'prispax', name: 'Prispax', capacity: 10000, description: 'A vessel.', currentLocation: 2 },
];

app.get('/api/planets', (req, res) => {
  res.json(planets);
});

app.get('/api/spacecrafts', (req, res) => {
  res.json(spacecrafts);
});

app.get('/api/spacecrafts/:id', (req, res) => {
  const craft = spacecrafts.find((s) => s.id === req.params.id);
  if (!craft) return res.status(404).json({ error: 'Not found' });
  res.json(craft);
});

app.post('/api/spacecrafts', (req, res) => {
  const { name, capacity, description } = req.body;
  if (!name || capacity == null || !description) {
    return res.status(400).json({ error: 'Missing name, capacity, or description' });
  }
  const id = 'test-' + Date.now();
  const newCraft = {
    id,
    name,
    capacity: Number(capacity),
    description,
    currentLocation: 2,
  };
  spacecrafts.push(newCraft);
  res.status(201).json(newCraft);
});

app.delete('/api/spacecrafts/:id', (req, res) => {
  const idx = spacecrafts.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  spacecrafts.splice(idx, 1);
  res.status(204).send();
});

function resetSpacecrafts() {
  spacecrafts = [
    { id: 'prispax', name: 'Prispax', capacity: 10000, description: 'A vessel.', currentLocation: 2 },
  ];
}

module.exports = { app, resetSpacecrafts };
