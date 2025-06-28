import chai from 'chai';
import supertest from 'supertest';
import app from '../index.js'; 

const expect = chai.expect;
const request = supertest(app);

describe('Pets API', () => {
  it('debe devolver status 200 y un array de mascotas', async () => {
    const res = await request.get('/api/pets');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('debe crear una nueva mascota', async () => {
    const petData = {
      name: 'Firulais',
      specie: 'Perro',
      age: 3
    };
    const res = await request.post('/api/pets').send(petData);
    expect(res.status).to.equal(201);
    expect(res.body._id).to.exist;
    expect(res.body.name).to.equal('Firulais');
  });
});