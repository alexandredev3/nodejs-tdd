import request from 'supertest';

import app from '../../src/app';
// precisamos pegar o arquivo que referencia o express.

import truncate from '../utils/truncate';
import factory from '../factories';

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });
  // Ele vai executar depois de cada teste.

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    });

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '12345678',
    });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    });

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '387223',
    });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    });

    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: '12345678',
    });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    });

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    // E dessa forma que colocamos um header nos testes.
    // generateToken: e aquele token que e generado no model de user.

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes whithout jwt token', async () => {
    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    });

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 1245543`);

    expect(response.status).toBe(401);
  });
});
