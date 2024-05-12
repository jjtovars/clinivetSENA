import React, { Fragment } from 'react';
import styles from './styles/MenuRecepcionistas.module.css'; // Importa los estilos CSS como un objeto
import HeaderLogin from '../pagLogin/HeaderLogin';

const MenuRecepcionistas = () => {
  return (
    <Fragment>

    <HeaderLogin/>

      <section className={styles.container__menu}>
        <a href="/clientes"><img className={`${styles.card__menu} ${styles.card__img}`} src="/images/cardClientes.svg" alt="Card Clientes"/></a>
        <a href="/"><img className={`${styles.card__menu} ${styles.card__img}`} src="/images/cardMascotas.svg" alt="Card Mascotas"/></a>
        <a href="/"><img className={`${styles.card__menu} ${styles.card__img}`} src="/images/cardFacturacion.svg" alt="Card Facturación"/></a>
        <a href="/"><img className={`${styles.card__menu} ${styles.card__img}`} src="/images/cardCitas.svg" alt="Card Citas"/></a>
        <a href="/"><img className={`${styles.card__menu} ${styles.card__img}`} src="/images/cardVenta.svg" alt="Card Venta"/></a>
      </section>
    </Fragment>
  );
}

export default MenuRecepcionistas;
