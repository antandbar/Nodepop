require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Ad = require('../../models/Ad');
const adsData = require('../../scripts/initDB.ads.json');

beforeEach(async () => {
  // borrar todos los documentos de anuncios que haya en la colección
  await Ad.deleteMany();
  // crear anuncios iniciales
  await Ad.insertMany(adsData);
  // borrar todos los documentos de usuarios que haya en la colección
  await User.deleteMany();
  // crear usuarios
  await User.insertMany([
    {
      email: 'admin@example.com',
      password: await User.hashPassword('1234'),
      rol: 'admin',
    },
    {
      email: 'user@example.com',
      password: await User.hashPassword('1234'),
      rol: 'user',
    },
  ]);
});

describe('/ads testing ads', () => {
  let token;

  it('Post must return token', async () => {
    expect.assertions(1);
    const response = await request(app)
      .post('/apiv1/login')
      .send({ email: 'user@example.com', password: '1234' });

    token = response.body.token;

    expect(response.statusCode).toBe(200);
  });

  describe('GET /ads', () => {
    it('GET must check the number of ads and have the results property', async () => {
      expect.assertions(3);
      const response = await request(app)
        .get('/apiv1/ads')
        .set('Authorization', token);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('results');
      expect(response.body.results).toHaveLength(adsData.length);
    });

    it('GET must return that the name of one of the ads is Bicicleta', async () => {
      expect.assertions(2);
      const response = await request(app)
        .get('/apiv1/ads')
        .set('Authorization', token);

      expect(response.statusCode).toBe(200);
      const names = response.body.results.map(ads => ads.name);
      expect(names).toContain('Bicicleta');
    });
  });

  it('GET must return ok and have the results property', async () => {
    expect.assertions(2);
    const response = await request(app)
      .get('/apiv1/ads/tagslist')
      .set('Authorization', token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('results');
  });

  it('Post must insert an ad', async () => {
    expect.assertions(2);
    const response = await request(app)
      .post('/apiv1/ads')
      .set('Authorization', token)
      .send({
        name: 'Auriculares',
        sale: true,
        price: 30,
        photo: 'Auriculares.jpg',
        tags: ['lifestyle', 'reading'],
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('result');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
