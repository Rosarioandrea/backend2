import chai from 'chai';
import supertest from 'supertest';
import app from '../index.js';

const expect = chai.expect;
const request = supertest(app);

describe('Users API', () => {
  it('debe devolver 200 y un array de usuarios', async () => {
    const res = await request.get('/api/users');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('debe fallar al crear un usuario sin datos necesarios', async () => {
    const res = await request.post('/api/users').send({});
    expect(res.status).to.be.oneOf([400, 422]);
  });
});

