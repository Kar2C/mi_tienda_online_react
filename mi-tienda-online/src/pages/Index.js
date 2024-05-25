import React, { useState, useEffect } from 'react'; //importa React ylos hooks
import FiltrarCategoria from './FiltrarCategoria'
import ListaProducto from './ListaProducto';
import DetalleProducto from './DetalleProducto';
import Header from './Header';
import Footer from './Footer';
import styles from '../pages/styles/Index.module.css';

export default function MainComponent() { //Define función llamada MainComponent
  const [productos, setProductos] = useState([]); 
  //se una  define unavariable de estado llamada productos
  //que contendrá una lista de productos, 
  // y una función setProductos que se utilizará para actualizar 
  //esa lista de productos cuando sea necesario. 
  //La inicialización de useState([]) establece productos como un array vacío
  const [selectedProductId, setSelectedProductId] = useState(null); 
  //se deifne una variable de estado llamada selectedProductId, 
  //que tiene el ID del producto seleccionado, y una función setSelectedProductId que se usaa
  // para actualizar ese ID cuando sea necesario, ejemplo: cuando el usuario seleccione un produto. 
  //Al inicializar useState(null), es que al inicio no hay ningún producto seleccionado.
  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(0);
  //se define una variable de estado llamada cantidadEnCarrito, que contendrá la cantidad de productos en el carrito,
  // y una función setCantidadEnCarrito que se utilizará para actualizar esa cantidad cuando sea necesario, 
  //por ejemplo, cuando el usuario agrega o elimina productos del carrito. 
  //Al inicializar useState(0), quiere decir que al inicio no hay ningún producto en el carrito (0)

  useEffect(() => {
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    //Obtiene los datos del carrito almacenados en la sesión utilizando sessionStorage.
    // Si no hay ningún dato de carrito almacenado, se asigna un array vacío como valor predeterminado
    const cantidadEnCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);
    // recorre el array carrito, suma la cantidad de cada producto y devuelve la suma total
    setCantidadEnCarrito(cantidadEnCarrito);
    //Asigna a cantidadEnCarrito el valor calculado de la cantidad total de productos en el carrito.
  }, []);

  const verDetalle = (id) => { 
    //FUnción lamada, ver detalle, que toma el Id de un producto para ver los detalles
    setSelectedProductId(id); //actualiza el id del producto
  };

  const handleGoBack = () => {
    //funcion llamda handleGoBack
    setSelectedProductId(null); //lo convierte en null, borra la info guardada
  }; //hacer clic en un botón para volver a la lista de productos después de ver los detalles de un producto

  return (
    <div className={styles.container}>
      <Header cantidadEnCarrito={cantidadEnCarrito} />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Filtrar Productos por Categoría</h1>
        <FiltrarCategoria setProductos={setProductos} />
        {selectedProductId ? (
          <div>
            <DetalleProducto productId={selectedProductId} />
            {/* muestra los detalles de un producto en especifico */}
            <button className={styles.button} onClick={handleGoBack}>Volver a la lista de productos</button>
          </div>
        ) : (
          <div>
            <ListaProducto productos={productos} verDetalle={verDetalle} /> 
            {/* muestra la lista completa de productos */}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}