const express = require('express');

const app = express();
app.use(express.json());

const PLANETS_INITIAL = [
  { id: 0, name: 'Mercury', currentPopulation: 0 },
  { id: 1, name: 'Venus', currentPopulation: 0 },
  { id: 2, name: 'Earth', currentPopulation: 100000 },
  { id: 3, name: 'Mars', currentPopulation: 0 },
];

let planets = PLANETS_INITIAL.map((p) => ({ ...p, currentPopulation: p.currentPopulation }));

let spacecrafts = [
  { id: 'prispax', name: 'Prispax', capacity: 10000, description: 'A vessel.', currentLocation: 2 },
];

app.get('/api/planets', (req, res) => {
  res.json(planets);
});

// Test helper: set planet population (for dispatch edge-case tests)
app.patch('/api/planets/:id', (req, res) => {
  const id = Number(req.params.id);
  const { currentPopulation } = req.body;
  if (currentPopulation == null || typeof currentPopulation !== 'number') {
    return res.status(400).json({ error: 'currentPopulation required' });
  }
  const p = planets.find((x) => x.id === id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  p.currentPopulation = currentPopulation;
  res.json(p);
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

// Dispatch spacecraft: move population from current planet to target, update spacecraft location
app.post('/api/dispatch', (req, res) => {
  const { spacecraftId, targetPlanetId } = req.body;
  if (!spacecraftId || targetPlanetId == null) {
    return res.status(400).json({ error: 'spacecraftId and targetPlanetId required' });
  }
  const craft = spacecrafts.find((s) => s.id === spacecraftId);
  if (!craft) return res.status(404).json({ error: 'Spacecraft not found' });
  const targetId = Number(targetPlanetId);
  if (craft.currentLocation === targetId) {
    return res.status(400).json({ error: 'Spacecraft is already at destination' });
  }
  const origin = planets.find((p) => p.id === craft.currentLocation);
  const dest = planets.find((p) => p.id === targetId);
  if (!origin || !dest) return res.status(400).json({ error: 'Invalid planet' });

  let transferred = Math.min(craft.capacity, origin.currentPopulation);
  origin.currentPopulation -= transferred;
  dest.currentPopulation += transferred;
  craft.currentLocation = targetId;
  res.json({ ok: true, transferred });
});

function resetSpacecrafts() {
  spacecrafts = [
    { id: 'prispax', name: 'Prispax', capacity: 10000, description: 'A vessel.', currentLocation: 2 },
  ];
}

function resetPlanets() {
  planets = PLANETS_INITIAL.map((p) => ({ ...p, currentPopulation: p.currentPopulation }));
}

function resetAll() {
  resetSpacecrafts();
  resetPlanets();
}

module.exports = { app, resetSpacecrafts, resetPlanets, resetAll };
