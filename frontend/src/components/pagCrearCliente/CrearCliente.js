import React, { Fragment, useState } from 'react';
import HeaderCrearCliente from './HeaderCrearCliente';
import axios from 'axios';
import styles from './style/NewCliente.module.css'; // Importa los estilos CSS como un objeto

const CrearCliente = () => {
    const [formData, setFormData] = useState({
        identificacion: '',
        nombres: '',
        apellidos: '',
        departamento: '',
        ciudad: '',
        direccion: '',
        telefono: '',
        correo: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:10000/api/clinivetsena/clientes', formData);
            alert('Cliente creado exitosamente!!!');
            window.location.href = '/clientes';
        } catch (error) {
            console.log('Error al crear cliente: ', error);
        }
    };

    return (
        <Fragment>
            <HeaderCrearCliente />
            <div className={styles.container__formulario}>
                <h2 className={styles.form__title}>REGISTRO DE CLIENTE</h2>
                <form className={styles.form__container} onSubmit={handleSubmit}>
                    <label htmlFor="identificacion" className={styles.form__label}>Identificación</label>
                    <input type="number" id="identificacion" placeholder="Digite la identificacion" className={styles.form__input} onChange={handleChange} />

                    <label htmlFor="nombres" className={styles.form__label}>Nombres</label>
                    <input type="text" id="nombres" placeholder="Digite los nombres" className={styles.form__input} onChange={handleChange} />

                    <label htmlFor="apellidos" className={styles.form__label}>Apellidos</label>
                    <input type="text" id="apellidos" placeholder="Digite los apellidos" className={styles.form__input} onChange={handleChange} />

                    <label htmlFor="departamento" className={styles.form__label}>Departamento</label>
                    <input type="text" id="departamento" placeholder="Digite el departamento de residencia" className={styles.form__input} onChange={handleChange} />

                    <label htmlFor="ciudad" className={styles.form__label}>Ciudad</label>
                    <input type="text" id="ciudad" placeholder="Digite la ciudad de residencia" className={styles.form__input} onChange={handleChange} />

                    <label htmlFor="direccion" className={styles.form__label}>Dirección</label>
                    <input type="text" id="direccion" placeholder="Digite la direccion de residencia" className={styles.form__input} onChange={handleChange} />

                    <label htmlFor="telefono" className={styles.form__label}>Teléfono</label>
                    <input type="text" id="telefono" placeholder="Digite el teléfono" className={styles.form__input} onChange={handleChange} />

                    <label htmlFor="email" className={`${styles.form__label} ${styles['form__input--ultimo']}`}>Email</label>
                    <input type="correo" id="correo" placeholder="Digite el email" className={styles.form__input} onChange={handleChange} />


                    <input type="submit" value="GUARDAR" className={styles['form__container--btn']} />
                </form>

                <img src='/images/nuevocliente.svg' alt="" className={styles.form__imagen} />

            </div>
        </Fragment>
    );
}

export default CrearCliente;
