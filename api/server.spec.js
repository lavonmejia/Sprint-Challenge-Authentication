const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
  describe('GET /api/jokes', () => {
    it('returns 400 BAD', () => {
      return request(server)
        .get('/api/jokes')
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it("should return no credentials provided", async () => {
      const res = await request(server).get('/api/jokes');
      expect(res.body).toEqual({ "message": "no credentials provided" });
    });

    it('returns JSON', done => {
      request(server)
        .get('/api/jokes')
        .then(res => {
          expect(res.type).toMatch(/json/i);
          done();
        });
    });
  });
});

describe('server.js', () => {
  describe('POST /api/auth/register', () => {
    it('returns 500 Nothing Provided', () => {
      return request(server)
        .post('/api/auth/register')
        .then(res => {
          expect(res.status).toBe(500);
        });
    });


    it('returns a JSON TOKEN', async () => {
      beforeEach(async () => {
          await db('users').truncate();
      });
      return request(server)
        .post('/api/auth/register')
        .send({
          "username": "bettie",
          "password": "doesthiswork"
        })
        .set( "Content-Type","application/json")
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });
});

