// test.ts
import request from 'supertest';
import { app } from '../app'; 

describe('Rutas de Tutor', () => {
    it('debería consultar todos los tutores', async () => {
        const response = await request(app).get('/tutor');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('debería consultar un tutor por ID', async () => {
        const response = await request(app).get('/tutor/1'); 
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
    });

    it('debería crear un nuevo tutor', async () => {
        const response = await request(app).post('/tutor').send({
            name: 'Nuevo Tutor',
            identificacion: 123456,
            experticia: 'Matemáticas'
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Tutor creado exitosamente');
    });

    it('debería modificar un tutor existente', async () => {
        const response = await request(app).put('/tutor/1').send({
            name: 'Tutor Modificado',
            identificacion: 654321,
            experticia: 'Física'
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Tutor con ID 1 ha sido actualizado.');
    });

    it('debería eliminar un tutor existente', async () => {
        const response = await request(app).delete('/tutor/10');
        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Tutor con ID 10 ha sido eliminado junto con sus tutorías.');
    });
});

describe('Rutas de Tutorados', () => {
    it('debería consultar todos los tutorados', async () => {
        const response = await request(app).get('/tutorado');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('debería consultar un tutorado por ID', async () => {
        const response = await request(app).get('/tutorado/3'); 
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
    });

    it('debería crear un nuevo tutorado', async () => {
        const response = await request(app).post('/tutorado').send({
            name: 'Nuevo Tutorado',
            identificacion: 123456
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Tutorado creado exitosamente');
    });

    it('debería modificar un tutorado existente', async () => {
        const response = await request(app).put('/tutorado/5').send({
            name: 'Tutorado Modificado',
            identificacion: 654321
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Tutorado con ID 5 ha sido actualizado.');
    });

    it('debería eliminar un tutorado existente', async () => {
        const response = await request(app).delete('/tutorado/3');
        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Tutorado con ID 3 ha sido eliminado, junto con sus tutorías.');
    });
});

describe('Rutas de Tutorías', () => {
    it('debería consultar todas las tutorías', async () => {
        const response = await request(app).get('/tutoria');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('debería consultar una tutoría por ID', async () => {
        const response = await request(app).get('/tutoria/1'); 
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
    });

    it('debería crear una nueva tutoría', async () => {
        const response = await request(app).post('/tutoria').send({
            asignatura: 'Matemáticas',
            numero_horas: 2,
            fecha: '2024-10-05',
            hora: '10:00AM',
            tutorId: 1, 
            tutoradoId: 1
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Tutoría creada exitosamente');
    });

    it('debería modificar una tutoría existente', async () => {
        const response = await request(app).put('/tutoria/1').send({
            asignatura: 'Ciencias',
            numero_horas: 3,
            fecha: '2024-10-06',
            hora: '11:00AM'
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toContain('La tutoria 1 ha sido actualizado.');
    });

    it('debería eliminar una tutoría existente', async () => {
        const response = await request(app).delete('/tutoria/1');
        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Tutoria 1 a sido eliminados.');
    });
});
