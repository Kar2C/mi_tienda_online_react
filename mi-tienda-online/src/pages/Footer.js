import React from 'react';
import styles from '../styles/Footer.module.css';

export default function Footer() { //Función llamada Footer
  return (
    <footer className={styles['pie-de-pagina']}>
      <p className={styles['pie-de-pagina__texto']}>2024</p>
    </footer>
  );
}
