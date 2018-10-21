const request = require('supertest');
const { User } = require('../../src/user/model');

let server;

describe('/api/users', () => {
  beforeEach(() => { server = require('../../src/index') });
  afterEach(async () => {
    await server.close();
    await User.remove({});
  });

  describe('POST /register', () => {
    let testUser;

    const exec = async () => request(server)
      .post('/api/users/register')
      .send(testUser);

    beforeEach(() => {
      testUser = {
        email: 'john@doe.com',
        password: 'somepassword',
      };
    });

    it('should create a new user on successful registration', async () => {
      const res = await exec();
      const user = await User.find({ email: testUser.email });

      expect(res.status).toBe(200);
      expect(user).not.toBeNull();
    });

    it('should return 400 if invalid user is registered', async () => {
      testUser = {
        email: '',
        password: '',
      };
      const res = await exec();

      expect(res.status).toBe(400);
    });
  });
});
