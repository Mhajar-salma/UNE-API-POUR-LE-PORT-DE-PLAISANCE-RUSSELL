const request = require('supertest');
const assert = require('assert');
const app = require('../app');

describe('Catways API', () => {
  let token;
  const testCatwayNumber = 999;

  before(async () => {
    const res = await request(app)
      .post('/users/authenticate')
      .send({ email: 'admin@port-russell.com', password: 'motdepasse123' });
    token = res.body.token;
  });

  it('devrait créer un nouveau catway', async () => {
    const res = await request(app)
      .post('/catways')
      .set('Authorization', `Bearer ${token}`)
      .send({ catwayNumber: testCatwayNumber, type: 'long', catwayState: 'bon état' });

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.catwayNumber, testCatwayNumber);
  });

  it('devrait lister tous les catways', async () => {
    const res = await request(app)
      .get('/catways')
      .set('Authorization', `Bearer ${token}`);

    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });

  it('devrait récupérer les détails du catway créé', async () => {
    const res = await request(app)
      .get(`/catways/${testCatwayNumber}`)
      .set('Authorization', `Bearer ${token}`);

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.catwayNumber, testCatwayNumber);
  });

  it("devrait modifier la description de l'état du catway", async () => {
    const res = await request(app)
      .put(`/catways/${testCatwayNumber}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ catwayState: 'nécessite une réparation' });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.catwayState, 'nécessite une réparation');
  });

  it('devrait supprimer le catway créé', async () => {
    const res = await request(app)
      .delete(`/catways/${testCatwayNumber}`)
      .set('Authorization', `Bearer ${token}`);

    assert.strictEqual(res.status, 200);
  });
});
