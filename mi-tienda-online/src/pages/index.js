import React, { useState, useEffect } from 'react'; // Importa React y los hooks
import FiltrarCategoria from './FiltrarCategoria';
import ListaProducto from './ListaProducto';
import DetalleProducto from './DetalleProducto';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/Index.module.css';

export default function ComponentePrincipal() { // Define función llamada ComponentePrincipal
  const [productos, setProductos] = useState([]); 
  // Define una variable de estado llamada productos
  // que contendrá una lista de productos, 
  // y una función setProductos que se utilizará para actualizar 
  // esa lista de productos cuando sea necesario. 
  // La inicialización de useState([]) establece productos como un array vacío
  const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(null); 
  // Define una variable de estado llamada idProductoSeleccionado, 
  // que tiene el ID del producto seleccionado, y una función setIdProductoSeleccionado que se usa
  // para actualizar ese ID cuando sea necesario, ejemplo: cuando el usuario seleccione un producto. 
  // Al inicializar useState(null), es que al inicio no hay ningún producto seleccionado.
  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(0);
  // Define una variable de estado llamada cantidadEnCarrito, que contendrá la cantidad de productos en el carrito,
  // y una función setCantidadEnCarrito que se utilizará para actualizar esa cantidad cuando sea necesario, 
  // por ejemplo, cuando el usuario agrega o elimina productos del carrito. 
  // Al inicializar useState(0), quiere decir que al inicio no hay ningún producto en el carrito (0)

  useEffect(() => {
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    // Obtiene los datos del carrito almacenados en la sesión utilizando sessionStorage.
    // Si no hay ningún dato de carrito almacenado, se asigna un array vacío como valor predeterminado
    const cantidadEnCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);
    // Recorre el array carrito, suma la cantidad de cada producto y devuelve la suma total
    setCantidadEnCarrito(cantidadEnCarrito);
    // Asigna a cantidadEnCarrito el valor calculado de la cantidad total de productos en el carrito.
  }, []);

  const verDetalle = (id) => { 
    // Función llamada verDetalle, que toma el ID de un producto para ver los detalles
    setIdProductoSeleccionado(id); // Actualiza el ID del producto
  };

  const manejarVolverAtras = () => {
    // Función llamada manejarVolverAtras
    setIdProductoSeleccionado(null); // Lo convierte en null, borra la info guardada
  }; // Hacer clic en un botón para volver a la lista de productos después de ver los detalles de un producto

  return (
    <div className={styles['contenedor']}>
      <Header cantidadEnCarrito={cantidadEnCarrito} />
      <main className={styles['contenido-principal']}>
        <h1 className={styles['titulo']}>Filtrar Productos por Categoría</h1>
        <FiltrarCategoria setProductos={setProductos} />
        {idProductoSeleccionado ? (
          <div>
            <DetalleProducto productId={idProductoSeleccionado} />
            {/* Muestra los detalles de un producto en específico */}
            <button className={styles['boton']} onClick={manejarVolverAtras}>Volver a la lista de productos</button>
          </div>
        ) : (
          <div>
            <ListaProducto productos={productos} verDetalle={verDetalle} /> 
            {/* Muestra la lista completa de productos */}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
