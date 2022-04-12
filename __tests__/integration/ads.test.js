require('dotenv').config();
const request = require('supertest');
const app = require('../../app');

/* expect.assertions(3); */

describe('/ads Testeando ads', () => {
  let token;

  it('Post Debe devolver token', async () => {
    expect.assertions(1);
    const response = await request(app)
      .post('/apiv1/login')
      .send({ email: 'user@example.com', password: '1234' });

    token = response.body.token;

    expect(response.statusCode).toBe(200);
  });

  it('GET Debe devolver 2 ads o más y tener la propiedad results', async () => {
    expect.assertions(3);
    const response = await request(app)
      .get('/apiv1/ads')
      .set('Authorization', token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('results');
    expect(response.body.results.length).toBeGreaterThanOrEqual(2);
  });

  it('GET Debe devolver tags y tener la propiedad results', async () => {
    expect.assertions(2);
    const response = await request(app)
      .get('/apiv1/ads/tagslist')
      .set('Authorization', token);

    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('results');
  });

  it('Post Debe insertar un ad', async () => {
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
