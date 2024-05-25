import React from 'react';
import styles from '../pages/styles/ListaProducto.module.css';

export default function ProductList({ productos, verDetalle }) {
  //Función llamada productList, tiene dos props, 1. productos. 2. verDetalle.
  //Lista de productos a mostrar y y la función para ver los detalles de un productoo
  return (
    <div className={styles.container}>
      <h2>Productos</h2>
      <ul className={styles.productList}>
        {productos.map(producto => (//Para cada elemento almacenado, crea un nuevo elemento <li> en la lista.
          <li key={producto.id} className={styles.productItem}>
            <img src={producto.image} alt={producto.title} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h3>{producto.title}</h3>
              <button className={styles.button} onClick={() => verDetalle(producto.id)}>Ver detalle del producto</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}