const request = require('supertest');
const assert = require('assert');
const app = require('../app');

describe('Users API', () => {
  let token;
  let createdUserId;

  before(async () => {
    const res = await request(app)
      .post('/users/authenticate')
      .send({ email: 'admin@port-russell.com', password: 'motdepasse123' });
    token = res.body.token;
  });

  it('devrait créer un nouvel utilisateur', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test User',
        email: `testuser_${Date.now()}@example.com`,
        password: 'motdepasse456',
      });

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.name, 'Test User');
    createdUserId = res.body._id;
  });

  it('devrait modifier l\'utilisateur créé', async () => {
    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test User Modifié',
        email: `testuser_modifie_${Date.now()}@example.com`,
      });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.name, 'Test User Modifié');
  });

  it('devrait supprimer l\'utilisateur créé', async () => {
    const res = await request(app)
      .delete(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`);

    assert.strictEqual(res.status, 200);
  });
});
