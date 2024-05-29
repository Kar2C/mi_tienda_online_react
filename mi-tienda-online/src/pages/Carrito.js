import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; //permite navegar entre tutas
import styles from '../styles/Carrito.module.css'
import Header from './Header';
import Footer from './Footer';

export default function Carrito() {//define la función Carrito
  const [carrito, setCarrito] = useState([]);
  //El estado carrito almacena los productos en este
  //setCarrito actualiza el estado de carrito
  //inicia en un array vacio
  const router = useRouter(); 
  //acceso al objeto de enrutamiento, que puede utilizarse para obtener información sobre la ruta actual
  
  useEffect(() => {
    const storedCarrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    //accede al almacenamiento de sesión para obtener el contenido del carrito almacenado.
    setCarrito(storedCarrito);//se actualiza el estado del carrito 
  }, []);

  const handleVolver = () => {
    router.push('/');
  }; //handleVolver se encarga de redirigir al usuario a la página principal cuando hace clic en un botón de "volver"

  const handleRemoveItem = (productId, removeAll = false) => {
    //función llamada handleRemoveItem
    //productId: El ID del producto que se quiere eliminar del carrito
    //removeAll: parametro para saber si se elimina uno o todos
    let updatedCarrito;//variable que almacenará el carrito actualizado después de realizar las operaciones de eliminación

    if (removeAll) { //verifica si la función handleRemoveItem fue llamada con el argumento removeAll establecido en true
      updatedCarrito = carrito.filter(item => item.id !== productId);
      //Si removeAll es true, esta línea crea un nuevo array updatedCarrito que contiene 
      //todos los productos cuyo id no coincide con productId. 
      //Es decir, elimina el producto del carrito.
    } else {
      updatedCarrito = carrito.map(item => 
        //se filtra el array resultante para eliminar cualquier item cuya cantidad sea 0 o menos.
        //toma un parámetro item, representando cada producto en el carrito.
        item.id === productId && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item
        //condición ternaria
        // Verifica si el id del producto actual (item.id) coincide con el productId del producto que se quiere modificar.
        //item.cantidad > 1: Verifica si la cantidad del producto (item.cantidad) es mayor que 1.
        //si es verdad --> Si las condiciones del operador ternario son verdaderas, se crea un nuevo objeto que es una copia del item original, pero con la cantidad (cantidad) disminuida en 1.
        //si es falso, devuelve el item sin modificación
      ).filter(item => item.cantidad > 0); 
      //se filtra el array resultante para eliminar cualquier item cuya cantidad sea 0 o menos.
    }

    setCarrito(updatedCarrito);//actualiza el estado del carrito
    sessionStorage.setItem('carrito', JSON.stringify(updatedCarrito));
    //guarda el estado actualizado del carrito en el almacenamiento de la sesión del navegador
  };

  const cantidadEnCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);
  //Esta línea de código calcula la cantidad total de todos los productos en el carrito.
  //Suma la cantidad del producto actual (item.cantidad) al acumulador (total).

  return (
    <div>
      <Header cantidadEnCarrito={cantidadEnCarrito} />
      {/* se le asigna la cantidad de elementos en el carrito */}
      <div className={styles['carrito__container']}>
        <h1 className={styles['carrito__title']}>Carrito de Compras</h1>
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <ul className={styles['carrito__list']}>
            {carrito.map(item => (
              <li key={item.id} className={styles['carrito__item']}>
                {item.title} - Cantidad: {item.cantidad}
                <button onClick={() => handleRemoveItem(item.id, false)} className={styles['carrito__button']}>Eliminar uno</button>
                <button onClick={() => handleRemoveItem(item.id, true)} className={styles['carrito__button']}>Eliminar todo</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleVolver} className={styles['carrito__button']}>Volver a la página de inicio</button>
      </div>
      <Footer />
    </div>
  );
}
