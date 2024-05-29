import React, { useEffect, useState } from 'react';
import styles from '../styles/FiltrarCategoria.module.css';

export default function FiltrarCategoria({ setProductos }) { 
  //Función llamda FiltrarCategoria, usa el prop setProductos que actualiza la lista de productos cuando se seleccione una categoría 
  const [categorias, setCategorias] = useState([]);
  //categorias almacena el api
  //setCategorias actualiza el estado de categorias 
  //useState([]) inicializa categorias con un array vacio
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  //categoriaSeleccionada almacena la categoría seleccionada por el usuario
  //setCategoriaSeleccionada actualiza el estado
  //useState('') cadena vacia

  // Obtener las categorías cuando el componente se monta
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setCategorias(['Todos', ...json])) // Agregar opción "Todos" al inicio de la lista
      .catch(err => console.error('Error fetching categories:', err));
  }, []);
  //este efecto se encarga de realizar una solicitud HTTP para obtener la lista de categorías de productos
  //actualiza el estado del componente con estas categorías, incluyendo la opción "Todos" al principio de la lista

  const filtrarPorCategoria = (categoria) => { //función que toma categoría que es la categoría seleccionada por el usuario
    const url = categoria === 'Todos'
      ? 'https://fakestoreapi.com/products'
      : `https://fakestoreapi.com/products/category/${categoria}`;
      //es una validación ternaria. si... si no ...
    
    fetch(url) //obtiene el valor de la categoría seleccionada
      .then(res => res.json())
      .then(json => setProductos(json))
      .catch(err => console.error('Error fetching products:', err));
  };

  const handleChange = (e) => { //función que toma a 'e' para manejar el manejo del cambio
    const categoria = e.target.value; //se obtiene el valor de la categoría seleccionada en el select
    setCategoriaSeleccionada(categoria); //Actualiza la categoría seleccionada
    if (categoria) {
      filtrarPorCategoria(categoria);
    } else {
      setProductos([]); // Limpiar los productos si no hay categoría seleccionada llamando a setProductos
    }
  };

  return (
    <div className={styles['filtrar-categoria__contenedor']}>
      <select 
        value={categoriaSeleccionada} 
        onChange={handleChange} 
        className={styles['filtrar-categoria__select']}
      >
        <option value=''>Selecciona una Categoría</option>
        {categorias.map(categoria => (
          <option key={categoria} value={categoria}>{categoria}</option>
        ))}
      </select>
    </div>
  );
}
