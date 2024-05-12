const Usuario = require('../models/usuario');
const Recepcionista = require('../models/recepcionista');
const Veterinario = require('../models/veterinario');

exports.agregarUsuario = async(req,res) => {

    try {

        // Verificar si el usuario ya está registrado como recepcionista
        const recepcionistaExistente = await Recepcionista.findOne({ correo: req.body.correoUsuario });
        if (!recepcionistaExistente) {
            // Verificar si el usuario ya está registrado como veterinario
            const veterinarioExistente = await Veterinario.findOne({ correo: req.body.correoUsuario });
            if (!veterinarioExistente) {
                return res.status(400).send('El correo no está registrado en el sistema de empleados');
                
            }
        }

        // Verificar si el correo ya está registrado como usuario
        const usuarioExistente = await Usuario.findOne({ correoUsuario: req.body.correoUsuario });
        if (usuarioExistente) {
            return res.status(400).send('El correo ya está registrado como usuario');
        }

        // Verificar que el rol sea válido
        const rolesPermitidos = ['Administrador', 'Veterinario', 'Recepcionista'];
        if (!rolesPermitidos.includes(req.body.rol)) {
            return res.status(400).send('Rol no válido. Los roles permitidos son: Administrador, Veterinario, Recepcionista');
        }
        
        let crearUsuario;
        crearUsuario = new Usuario(req.body);
        await crearUsuario.save();
        res.json(crearUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al agregar un usuario')
    }
}

exports.loginUsuario = async(req,res) => {
    // const { username, password } = req.body;
    try {
        const usuario = await Usuario.findOne({correoUsuario: req.body.correoUsuario});
        if (!usuario) {
            return res.status(401).json({ message: 'El usuario no está registrado' });
        }
        if (usuario.password !== req.body.password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        
        if(usuario.rol !== req.body.rol){
            return res.status(401).json({ message: 'Este no es el rol para este usuario' });
        }
        
        res.json({ message: 'Autenticación satisfactoria' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

