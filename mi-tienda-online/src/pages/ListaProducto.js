import React from 'react';
import styles from '../styles/ListaProducto.module.css';

export default function ListaProducto({ productos, verDetalle }) {
  //Función llamada ListaProducto, tiene dos props, 1. productos. 2. verDetalle.
  //Lista de productos a mostrar y y la función para ver los detalles de un producto
  return (
    <div className={styles['lista-producto']}>
      <h2>Productos</h2>
      <ul className={styles['lista-producto__lista']}>
        {productos.map(producto => (//Para cada elemento almacenado, crea un nuevo elemento <li> en la lista.
          <li key={producto.id} className={styles['lista-producto__item']}>
            <img src={producto.image} alt={producto.title} className={styles['lista-producto__imagen']} />
            <div className={styles['lista-producto__info']}>
              <h3 className={styles['lista-producto__titulo']}>{producto.title}</h3>
              <button className={styles['lista-producto__boton']} onClick={() => verDetalle(producto.id)}>Ver detalle del producto</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
