import React, { Fragment, useState } from 'react';
import axios from 'axios';
import styles from './style/Login.module.css'; // Importa los estilos CSS como un objeto
import HeaderLogin from './HeaderLogin';
import config from '../../config';

const Login = () => {
    const [formData, setFormData] = useState({
        correoUsuario: "",
        password: "",
        rol: ""
    });
    const [errorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${config.api.URL}/api/clinivetsena/login`, formData);
            if (response.data.message === 'Autenticación satisfactoria') {
                alert('Acceso exitoso');
                window.location.href = '/menurecepcionistas';
            } else {
                alert("Contraseña o correo inválidos");
            }
        } catch (error) {
            alert("Contraseña o correo inválidos");
        }
    };

    return (
        <Fragment>

            <HeaderLogin/>

            <div className={styles.container__formulario}> {/* Usa los estilos CSS a través del objeto 'styles' */}
                <img className={styles.imagen__form} src='/images/imagenLogin.png' alt="Imagen mascota CliniVet SENA"/>
                <form className={styles.form__container} onSubmit={handleSubmit}>
                    <div className={styles.container__title}>
                        <h2 className={styles.form__title}>LOGIN</h2>
                        <div className={styles.linea__form}></div>                       
                    </div>
                    {errorMessage && <div className={styles["error-message"]}>{errorMessage}</div>}
                    <select id="rol" name="rol" className={styles.form__input} onChange={handleChange}>
                        <option value="" disabled selected>Selecciona tu rol</option>
                        <option value="Veterinario">Veterinario</option>
                        <option value="Recepcionista">Recepcionista</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                    <input type="text" placeholder="Correo electrónico" className={styles.form__input} name="correoUsuario" onChange={handleChange}/>
                    <input type="password" placeholder="Contraseña" className={styles.form__input} name="password" onChange={handleChange}/>
                    <input type="submit" value="INICIAR SESIÓN" className={styles["form__container--btn"]}/>
                </form>
            </div>

        </Fragment>
    );
}

export default Login;

