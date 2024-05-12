import React, { Fragment, useState, useEffect } from 'react';
import styles from './style/UpdateClientes.module.css'; // Importa los estilos CSS como un objeto
import HeaderUpdate from './HeaderUpdate';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateClientes = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({
    identificacion: '',
    nombres: '',
    apellidos: '',
    departamento: '',
    ciudad: '',
    direccion: '',
    telefono: '',
    correo: ''
  });

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:10000/api/clinivetsena/clientes/${id}`);
        setCliente(response.data);
      } catch (error) {
        console.error('Error al obtener cliente:', error);
      }
    };

    fetchCliente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:10000/api/clinivetsena/clientes/${id}`, cliente);
      // Mostrar alerta
      alert('Cliente guardado exitosamente');
      // Redirigir al usuario a la página de clientes después de la actualización
      window.location.href = '/clientes';
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
    }
  };

  return (
    <Fragment>
      <HeaderUpdate />
      <div className={styles.container__formulario}>
        <h2 className={styles.form__title}>EDITAR CLIENTE</h2>
        <form className={styles.form__container} onSubmit={handleSubmit}>
          <label htmlFor="identificacion" className={styles.form__label}>Identificación</label>
          <input type="number" id="identificacion" name="identificacion" value={cliente.identificacion} className={styles.form__input} onChange={handleChange} />

          <label htmlFor="nombres" className={styles.form__label}>Nombres</label>
          <input type="text" id="nombres" name="nombres" value={cliente.nombres} className={styles.form__input} onChange={handleChange} required />

          <label htmlFor="apellidos" className={styles.form__label}>Apellidos</label>
          <input type="text" id="apellidos" name='apellidos' value={cliente.apellidos} className={styles.form__input} onChange={handleChange} required />

          <label htmlFor="departamento" className={styles.form__label}>Departamento</label>
          <input type="text" id="departamento" name='departamento' value={cliente.departamento} className={styles.form__input} onChange={handleChange} required/>

          <label htmlFor="ciudad" className={styles.form__label}>Ciudad</label>
          <input type="text" id="ciudad" name='ciudad' value={cliente.ciudad} className={styles.form__input} onChange={handleChange} required/>

          <label htmlFor="direccion" className={styles.form__label}>Dirección</label>
          <input type="text" id="direccion" name='direccion' value={cliente.direccion} className={styles.form__input} onChange={handleChange} required/>

          <label htmlFor="telefono" className={styles.form__label}>Teléfono</label>
          <input type="text" id="telefono" name='telefono' value={cliente.telefono} className={styles.form__input} onChange={handleChange} required/>

          <label htmlFor="email" className={styles.form__label}>Email</label>
          <input type="email" id="correo" name='correo' value={cliente.correo} className={styles.form__input + ' ' + styles['form__input--ultimo']} onChange={handleChange} required/>
          
          <a href='/clientes'><input type="submit" value="GUARDAR" className={styles['form__container--btn']}/></a>
        </form>
        <img src='/images/editarcliente.svg' alt="" className={styles.form__imagen} />
      </div>
    </Fragment>
  );
};

export default UpdateClientes;
