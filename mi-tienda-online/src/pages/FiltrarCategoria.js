import React, { useEffect, useState } from 'react';
import styles from '../pages/styles/FiltrarCategoria.module.css'

export default function FiltarCategoria({ setProductos }) { 
  //Función llamda CategoryFilter, usa el prop setProductos que actualiza la lista de productos fuando se seleccione una categorira 
  const [categorias, setCategorias] = useState([]);
  //categorias almacena el api
  //setCategorias actualiza el estado de categorias 
  //useState([]) inicializa categorias con un array vacio
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  //categoriaSeleccionada almaecan la categoria seleccionada por el usuarii
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

  const filtrarPorCategoria = (categoria) => { //función que toma categria que es la categoria seleccionada por el usuario
    const url = categoria === 'Todos'
      ? 'https://fakestoreapi.com/products'
      : `https://fakestoreapi.com/products/category/${categoria}`;
      //es una validación ternaria. si... si no ...
    
    fetch(url) //obtiene el valor de la categoria seleccionada
      .then(res => res.json())
      .then(json => setProductos(json))
      .catch(err => console.error('Error fetching products:', err));
  };

  const handleChange = (e) => { //funcion que toma a 'e' para manejar el manejo del cambio
    const categoria = e.target.value; //se obtiene el valor de la categoria seleccionada en el select
    setCategoriaSeleccionada(categoria); //Actualiza la categoria seleccionada
    if (categoria) {
      filtrarPorCategoria(categoria);
    } else {
      setProductos([]); // Limpiar los productos si no hay categoría seleccionada llamando a setProductos
    }
  };

  return (
    <div className={styles['select-container']}>
      <select value={categoriaSeleccionada} onChange={handleChange}>
        <option value=''>Selecciona una Categoría</option>
        {categorias.map(categoria => (
          <option key={categoria} value={categoria}>{categoria}</option>
        ))}
      </select>
    </div>
  );
}