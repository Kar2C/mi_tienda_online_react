DetalleProducto.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; //accede a la info de la ruta actual
import styles from '../pages/styles/DetalleProducto.module.css'; // Importa el archivo CSS Module

export default function DetalleProducto ({ productId }) { //función llamada DetalleProducto que recibe un prop
  const [producto, setProducto] = useState(null);
  //e define producto que inicialmente esta en null, almacena la ifno del producto seleccionado, setProducto actualizara el valor del estado
  const [cantidad, setCantidad] = useState(1);
  //define cantidad que inicializa en 1, en este se almacenaran y actualizaran los estados del Set, 
  //es decir, la cantidad de productos que el usuario quiere agregar al carrrritooo
  const [mensaje, setMensaje] = useState('');
  //Define el estado mensaje que inicialmente es una cadena de texto vacia, usado parqa mostrar el texto de confrimación
  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(0);
  //estado llamado cantidadEnCarrito que inicia en 0, este almacena la cantidad total de productos en el carrito
  const router = useRouter();//acceso al objeto de enrutamiento, que puede utilizarse para obtener información sobre la ruta actual

  useEffect(() => {
    if (productId) { //si tiene un valor aceptable
      fetch(`https://fakestoreapi.com/products/${productId}`)//se le asigna el Id del producto para mostrar los correspondientes
        .then(res => res.json())
        .then(json => setProducto(json))//actualiza el estado de producto
        .catch(err => console.error('Error fetching product details:', err));
    }
  }, [productId]);// se ejecutará nuevamente cada vez que el valor de productId cambie

  useEffect(() => {
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || []; //Se obtiene la información del carrito almacenada en el sessionStorage
    const cantidadEnCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);//calcula la cantidad total de productos en el carrito sumando las cantidades de cada producto en el carrito.
    setCantidadEnCarrito(cantidadEnCarrito); //se le asigna el valor anterior a este nuevo
  }, []); //calcula la cantidad total de productos en el caritoou

  if (!producto) return <p>Cargando detalles del producto...</p>; //Este es un guard clause que se utiliza para mostrar un mensaje de carga mientras los datos del producto aún no están disponibles
  //la condición verifica si producto es null

  //----

  const handleAddToCart = () => { //función llamada handleAddToCart, maneja la acción de agregar algo al carrito
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];//Se obtiene la información del carrito almacenada en el sessionStorage
    const productIndex = carrito.findIndex(item => item.id === producto.id);
    //busca en el array carrito un elemento que tenga el mismo id que el producto actual (producto.id)
    //findIndex recorre cada elemento en carrito.
    //Para cada item en carrito, evalúa item.id === producto.id.
    //Si encuentra un item cuyo id coincide con producto.id, findIndex devuelve el índice de ese item en el array.
    //Si no encuentra ningún item que coincida, findIndex devuelve -1.

    if (productIndex > -1) {
      carrito[productIndex].cantidad += cantidad;
      //Si productIndex es mayor que -1 (es decir, el producto ya está en el carrito), actualiza la cantidad de ese producto.
      //incrementa la cantidad actual del producto en el carrito por la cantidad especificada.
    } else {
      carrito.push({ ...producto, cantidad })
      //Agrega un nuevo producto al carrito;
    }

    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    //Almacenar los productos del carrito en el sessionStorage
    setCantidadEnCarrito(prevCantidad => prevCantidad + cantidad);
    //Actualizar la cantidad total de productos en el carrito.
    setMensaje(`Se agregaron ${cantidad} ${cantidad === 1 ? 'artículo' : 'artículos'} al carrito.`);
    //actualiza el esstado de mensaje
    //validación ternaria
    //Actualizar el mensaje que se muestra al usuario para informar sobre la acción de agregar productos al carrito.
  };

  return (
    <div className={styles.container}>
      <h1>{producto.title}</h1>
      <p>{producto.description}</p>
      <p>Precio: ${producto.price}</p>
      <img src={producto.image} alt={producto.title} />
      <div>
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          id="cantidad"
          type="number"
          value={cantidad} //controlado por el estado cantidad
          onChange={(e) => setCantidad(parseInt(e.target.value))}
          //eventos onChange que convierte el valor del campo de entrada a un número entero 
          //y lo establece como el nuevo valor del estado cantidad
          min="1"
        />
        <button onClick={handleAddToCart}>Agregar al carrito</button>
      </div>
      {mensaje && ( //si mensaje tiene un valor verdadero, se ejecuta lo de los parentesis
        <div>
          <p>{mensaje}</p>
        </div>
      )}
      <p>En el carrito: {cantidadEnCarrito} {cantidadEnCarrito === 1 ? 'artículo' : 'artículos'}</p>
    </div>
  );
}