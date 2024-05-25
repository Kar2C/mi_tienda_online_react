import React from 'react'; //Importa la biblioteca React
import { useRouter } from 'next/router'; //Importa un hook de Next.js que permite acceder al enrutador
import styles from '../pages/styles/Header.module.css'; 

export default function Header({ cantidadEnCarrito }) { 
  //Función llamada Header,  que acepta una prop cantidadEnCarrito que es la cantidad de productos en el carrito
  // Las props son valores que un componente recibe de su componente padre
  const router = useRouter(); //se obtiene el objeto router 

  const manejoCarrito = () => {
    router.push('/Cart');
  };
  //Define una función manejoCarrito
  //que utiliza el método push del router para 
  //navegar a la página del carrito (/Cart) cuando se llama.


  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Mi Tienda Online</h1>
      <div className={styles.cartContainer}>
        <button className={styles.cartButton} onClick={manejoCarrito}> {/* Llama a manejoCarrito */}
          <span className={styles.cartIcon}>🛒</span> 
          <span className={styles.cartCount}>{cantidadEnCarrito}</span> {/* Se obtiene la cantidad de productos en el carrito */}
        </button>
      </div>
    </header>
  );
}
