const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); // caso o teste não possa ser influenciado pelo teste anterior
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //.set('authorization', '') 
            .send({
                name: "Miau AuAu",
                email: "contact@miauauau.com.br",
                whatsapp: "62000000000",
                city: "Goiânia",
                uf: "GO"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})