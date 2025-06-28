import chai from 'chai';
import supertest from 'supertest';
import app from '../index.js';

const expect = chai.expect;
const request = supertest(app);

describe('Adoptions API', () => {
  it('debe devolver todas las adopciones', async () => {
    const res = await request.get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('debe registrar una adopción', async () => {
    const adoptionData = {
      userId: 'USER_ID_AQUI',
      petId: 'PET_ID_AQUI'
    };
    const res = await request.post('/api/adoptions').send(adoptionData);
    expect(res.status).to.be.oneOf([201, 400]); 
  });
});
