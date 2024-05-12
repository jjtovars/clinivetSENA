const request = require('supertest');
const { app, server } = require('../src/index');

describe('Pruebas para las rutas de clientes', () => {

    test('Debería devolver un status code 200 al obtener la lista de clientes', async() => {
        const response = await request(app).get('/api/clinivetsena/clientes');
        expect(response.status).toBe(200);
    });

    test('Debería devolver datos de clientes al obtener la lista de clientes', async () => {
        const response = await request(app).get('/api/clinivetsena/clientes');
        expect(response.body.length).toBeGreaterThan(0); // Verifica que la respuesta contenga al menos un cliente
        expect(response.body[0]).toHaveProperty('identificacion'); // Verifica que cada cliente tenga una propiedad de identificación
    });

    test('Debería devolver un formato JSON al obtener la lista de clientes', async () => {
        const response = await request(app).get('/api/clinivetsena/clientes');
        expect(response.headers['content-type']).toMatch(/application\/json/); // Verifica que el tipo de contenido sea JSON
    });

    test('Debería devolver los datos correctos de los clientes al obtener la lista de clientes', async () => {
        const response = await request(app).get('/api/clinivetsena/clientes');
        const clientes = response.body;
    
        // Verifica que la respuesta contenga al menos un cliente
        expect(clientes.length).toBeGreaterThan(0);
    
        // Verifica que cada cliente tenga las propiedades esperadas
        clientes.forEach(cliente => {
            expect(cliente).toHaveProperty('identificacion');
            expect(cliente).toHaveProperty('nombres');
            expect(cliente).toHaveProperty('apellidos');
            expect(cliente).toHaveProperty('departamento');
            expect(cliente).toHaveProperty('ciudad');
            expect(cliente).toHaveProperty('direccion');
            expect(cliente).toHaveProperty('telefono');
            expect(cliente).toHaveProperty('correo');
        });
    });





    test('Debería agregar un nuevo cliente si no existe identificación ni correo previamente registrados', async () => {
        // Mock de datos de solicitud para un nuevo cliente
        const nuevoCliente = {
            identificacion: '1234567890',
            nombres: 'Juan',
            apellidos: 'Pérez',
            departamento: 'Antioquia',
            ciudad: 'Medellín',
            direccion: 'Calle 123',
            telefono: '123456789',
            correo: 'juan@example.com'
        };
    
        // Simula una solicitud POST para agregar un nuevo cliente
        const response = await request(app)
            .post('/api/clinivetsena/clientes')
            .send(nuevoCliente);
    
        // Verifica que se devuelva un status code 200
        expect(response.status).toBe(200);
    
        // Verifica que la respuesta contenga los datos del nuevo cliente agregado
        expect(response.body).toMatchObject(nuevoCliente);
    });
    
    
    test('Debería devolver un mensaje de error si ya existe un cliente con la misma identificación', async () => {
        // Mock de datos de solicitud para un cliente con identificación existente
        const clienteExistente = {
            identificacion: '1234567890',
            nombres: 'María',
            apellidos: 'Gómez',
            departamento: 'Antioquia',
            ciudad: 'Medellín',
            direccion: 'Carrera 456',
            telefono: '987654321',
            correo: 'maria@example.com'
        };
    
        // Simula una solicitud POST para agregar un cliente con una identificación ya existente
        const response = await request(app)
            .post('/api/clinivetsena/clientes')
            .send(clienteExistente);
    
        // Verifica que se devuelva un status code 400
        expect(response.status).toBe(400);
    
        // Verifica que se devuelva el mensaje de error correcto
        expect(response.text).toBe('La identificación propocionada ya ha sido registrada');
    });
    

});
