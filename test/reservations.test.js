const request = require('supertest');
const assert = require('assert');
const app = require('../app');

describe('Reservations API', () => {
  let token;
  let createdReservationId;
  const testCatwayNumber = 1;

  before(async () => {
    const res = await request(app)
      .post('/users/authenticate')
      .send({ email: 'admin@port-russell.com', password: 'motdepasse123' });
    token = res.body.token;
  });

  it('devrait créer une nouvelle réservation', async () => {
    const res = await request(app)
      .post(`/catways/${testCatwayNumber}/reservations`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        clientName: 'Jean Dupont',
        boatName: 'Le Mouette',
        checkIn: '2026-08-01',
        checkOut: '2026-08-10',
      });

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.clientName, 'Jean Dupont');
    createdReservationId = res.body._id;
  });

  it('devrait lister toutes les réservations d\'un catway', async () => {
    const res = await request(app)
      .get(`/catways/${testCatwayNumber}/reservations`)
      .set('Authorization', `Bearer ${token}`);

    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });

  it('devrait récupérer les détails de la réservation créée', async () => {
    const res = await request(app)
      .get(`/catways/${testCatwayNumber}/reservations/${createdReservationId}`)
      .set('Authorization', `Bearer ${token}`);

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.clientName, 'Jean Dupont');
  });

  it('devrait supprimer la réservation créée', async () => {
    const res = await request(app)
      .delete(`/catways/${testCatwayNumber}/reservations/${createdReservationId}`)
      .set('Authorization', `Bearer ${token}`);

    assert.strictEqual(res.status, 200);
  });
});
