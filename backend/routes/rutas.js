const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productosController');
const recepcionistaController = require('../controllers/recepcionistaController');
const veterinarioController = require('../controllers/veterinarioController')
const facturaController = require('../controllers/facturaControllers');
const usuarioController = require('../controllers/usuarioController');

//Rutas para mascotas
router.post('/mascotas', mascotaController.agregarMascota);
router.get('/mascotas', mascotaController.verMascotas);
router.get('/mascotas/:id', mascotaController.verMascota);
router.put('/mascotas/:id', mascotaController.modificarMascota);
router.delete('/mascotas/:id', mascotaController.eliminarMascota);

//Rutas para clientes
router.post('/clientes', clienteController.agregarCliente);
router.get('/clientes', clienteController.verClientes);
router.get('/clientes/:id', clienteController.verCliente);
router.put('/clientes/:id', clienteController.modificarCliente);
router.delete('/clientes/:id', clienteController.eliminarCliente);

//Rutas para productos
router.post('/productos', productoController.agregarProducto);
router.get('/productos', productoController.verProductos);
router.get('/productos/:id', productoController.verProducto);
router.put('/productos/:id', productoController.modificarProducto);
router.delete('/productos/:id', productoController.eliminarProducto);

//Rutas para recepcionista
router.post('/recepcionistas', recepcionistaController.agregarRecepcionista);
router.get('/recepcionistas', recepcionistaController.verRecepcionistas);
router.get('/recepcionistas/:id', recepcionistaController.verRecepcionista);
router.put('/recepcionistas/:id', recepcionistaController.modificarRecepcionista);
router.delete('/recepcionistas/:id', recepcionistaController.eliminarRecepcionista);

//Rutas para veterinario
router.post('/veterinarios', veterinarioController.agregarVeterinario);
router.get('/veterinarios', veterinarioController.verVeterinarios);
router.get('/veterinarios/:id', veterinarioController.verVeterinario);
router.put('/veterinarios/:id', veterinarioController.modificarVeterinario);
router.delete('/veterinarios/:id', veterinarioController.eliminarVeterinario);

//Rutas para factura
router.post('/facturas', facturaController.agregarFactura); 
router.get('/facturas', facturaController.verFacturas); 
router.get('/facturas/:id', facturaController.verFactura);
router.put('/facturas/:id', facturaController.modificarFactura);
router.delete('/facturas/:id', facturaController.eliminarFactura);

//Rutas para usuario
router.post('/usuarios', usuarioController.agregarUsuario);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;