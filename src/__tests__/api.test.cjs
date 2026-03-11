const request = require('supertest');
const { app, resetSpacecrafts } = require('./testServer.cjs');

describe('API (Supertest)', () => {
  beforeEach(() => {
    resetSpacecrafts();
  });

  describe('GET /api/planets', () => {
    it('returns list of planets', async () => {
      const res = await request(app).get('/api/planets');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('currentPopulation');
    });

    it('includes Earth with population', async () => {
      const res = await request(app).get('/api/planets');
      const earth = res.body.find((p) => p.name === 'Earth');
      expect(earth).toBeDefined();
      expect(earth.currentPopulation).toBe(100000);
    });
  });

  describe('GET /api/spacecrafts', () => {
    it('returns list of spacecraft', async () => {
      const res = await request(app).get('/api/spacecrafts');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.some((s) => s.id === 'prispax')).toBe(true);
    });
  });

  describe('GET /api/spacecrafts/:id', () => {
    it('returns spacecraft by id', async () => {
      const res = await request(app).get('/api/spacecrafts/prispax');
      expect(res.status).toBe(200);
      expect(res.body.id).toBe('prispax');
      expect(res.body.name).toBe('Prispax');
      expect(res.body.capacity).toBe(10000);
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).get('/api/spacecrafts/nonexistent');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/spacecrafts', () => {
    it('creates a new spacecraft', async () => {
      const res = await request(app)
        .post('/api/spacecrafts')
        .send({ name: 'NewShip', capacity: 100, description: 'Test vessel' });
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('NewShip');
      expect(res.body.capacity).toBe(100);
      expect(res.body).toHaveProperty('id');
      expect(res.body.currentLocation).toBe(2);
    });

    it('returns 400 when name is missing', async () => {
      const res = await request(app)
        .post('/api/spacecrafts')
        .send({ capacity: 100, description: 'No name' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when description is missing', async () => {
      const res = await request(app)
        .post('/api/spacecrafts')
        .send({ name: 'Ship', capacity: 100 });
      expect(res.status).toBe(400);
    });

    it('returns 400 when capacity is missing', async () => {
      const res = await request(app)
        .post('/api/spacecrafts')
        .send({ name: 'Ship', description: 'A ship' });
      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /api/spacecrafts/:id', () => {
    it('deletes spacecraft and returns 204', async () => {
      const res = await request(app).delete('/api/spacecrafts/prispax');
      expect(res.status).toBe(204);
      const list = await request(app).get('/api/spacecrafts');
      expect(list.body.some((s) => s.id === 'prispax')).toBe(false);
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).delete('/api/spacecrafts/nonexistent');
      expect(res.status).toBe(404);
    });
  });
});
