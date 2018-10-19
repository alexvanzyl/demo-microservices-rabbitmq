const request = require('supertest');
const mongoose = require('mongoose');
const { User } = require('../../src/user/model');

let server;

describe('/api/users', () => {
  beforeEach(() => { server = require('../../src/index') })
  afterEach(async () => {
    await server.close();
    await User.remove({});
  });

  it('should return 400 if invalid user is registered', async () => {
    const invalidUser = {
      email: '',
      password: '',
    };

    const res = await request(server)
      .post('/api/users/register')
      .send(invalidUser);

    expect(res.status).toBe(400);
  });
});
