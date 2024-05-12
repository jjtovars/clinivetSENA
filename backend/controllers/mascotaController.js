const Mascota = require('../models/mascota');

//Metodo POST
exports.agregarMascota = async(req,res) => {

    try {
        let crearMascota;
        crearMascota = new Mascota(req.body);
        await crearMascota.save();
        res.json(crearMascota);
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al agregar la mascota');
    }
};

//Metodo GET
exports.verMascotas = async(req,res) => {

    try {
        const mascotas = await Mascota.find();
        res.json(mascotas);
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al ver las mascotas');
    }
}

//Metodo GET BY ID
exports.verMascota = async(req,res) => {

    try {

        if(req.params.id.length != 24){
            return res.status(400).send('Longitud del id invalido');
        }

        const mascota = await Mascota.findById(req.params.id);
        if(!mascota){
            return res.status(404).send('Mascota no encontrada');
        }
        res.json(mascota);
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al ver la mascota');
    };
};

//Metodo PUT
exports.modificarMascota = async(req,res) => {

    try {

        if(req.params.id.length !== 24){
            return res.status(400).send('Longitud del Id invalido')
        }

        const mascota = await Mascota.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!mascota){
            return res.status(404).send('Mascota no encontrada')
        }
        res.json(mascota);
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al modificar la mascota');
    }
}

exports.eliminarMascota = async(req,res) => {
    
    try {
        
        if(req.params.id.length !== 24){
            return res.status(400).send('Longitud del Id invalido')
        }

        const mascota = await Mascota.findByIdAndDelete(req.params.id);
        if(!mascota){
            return res.status(404).send('Mascota no encontrada');
        };
        res.send("Mascota eliminada exitosamente!!!");
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al eliminar la mascota');
    }
}