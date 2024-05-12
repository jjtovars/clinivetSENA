// utilidades.js

const buscarDatosExistentes = async (modelos, identificacion, correo) => {
    for (const modelo of modelos) {
        const datosExistentes = await modelo.findOne({ 
            $or: [
                { identificacion },
                { correo }
            ]
        });

        if (datosExistentes) {
            return datosExistentes;
        }
    }

    return null;
};

module.exports = buscarDatosExistentes;
