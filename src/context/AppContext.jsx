// import { ShoppingCartIcon } from '@heroicons/react/24/solid'

import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';

import { apiUrl} from '../api/fakeStoreAPI'

export const AppContext = React.createContext();

export function AppProvider ({children})
{

  console.log('RENDER')
  // Others - Non related functions to the App
  // #region
  const capitalizeFirstLetter = (string) =>
    {
     
      return string.charAt(0).toUpperCase() + string.slice(1);
    } 

  const normalizeString = (string) =>
      {
        string = string || "";
        string = string.toLocaleLowerCase(); // A minusculas
        string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remover acentos
        string = string.trim(); // Quita espacios al inicio y al final
        return string;
      }
  
  //#endregion

  // Estado - Cual aside/modal abrir
  const [activeComponent, setActiveComponent] = useState('');
 
  // Traer productos de API
  const [items, setItems] = React.useState(null)

  useEffect(() =>
  {
    const fetchData = async () =>
    {
       try{
            const response = await fetch(`${apiUrl}`);
            if(!response.ok)
            {
              throw new Error(response.statusText);
            }
            const data = await response.json();
            setItems(data.products);
        }catch(error)
        {
          console.error(`Oh no! An error ocurred: ${error}`);
        }
    }
    fetchData();
  },[])

  const [searchTitle, setSearchTitle] = useState('');

  const [categoryFilter, setCategoryFilter] = useState('');
  console.log(categoryFilter)

  const filterSearch = items?.filter((product) =>
  {
    const productCategory = normalizeString(product.category)

    if(productCategory === categoryFilter || categoryFilter==='')
    {
      const productTitle = normalizeString(product.title);
      const searchValue = normalizeString(searchTitle)
      return productTitle.includes(searchValue)
    }
  })

  // const filterSearch = items?.filter((product) =>
  // {
  //   console.log(product)
  // })

  // Ordenes totales realizadas
  const {item:totalOrders, saveItem:setTotalOrders} = useLocalStorage('totalOrders',[])

  const checkoutOrder = (order) =>
  {
    const newOrderID = totalOrdersGenerateID();
    const newOrder = {id: newOrderID, ...order}
    const newTotalOrders = [newOrder,...totalOrders];

    setTotalOrders(newTotalOrders);
    setCartItems([]);

  }

  const totalOrdersGenerateID = () =>
  {
    const newID = crypto.randomUUID()
    return newID
  }

  // Items en el carrito de compras
  const {item:cartItems, saveItem:setCartItems} = useLocalStorage('currentShoppingCart',[])

  const updateCartItems = (newItem) => // Actualiza los items en el carrito
    {
      const newCartItems = cartItems.map((item) =>
        {
          if(item.id === newItem.id)
          {

            item = newItem
            return item
          }else
          {
            return item
          }
        })
      setCartItems(newCartItems)
    }
  
  const addItemToCart = (item) => // Añade item al carrito
  {
    const newCarItem = {
      ...item,
      count: 1

    }
    const newCartItems = [newCarItem,...cartItems];
    setCartItems(newCartItems)

  }

  const removeItemFromCart = (id,e) => // Elimina item del carrito
  {
    e.stopPropagation();
    const newCartItems = cartItems.filter(item => item.id!==id );
    setCartItems(newCartItems)
  }

  const itemChangeAmount = (operation,item,e) => // Si el item esta en el carrito, se puede especificar la cantidad a agregar, agregando o quitando
  {
    e.stopPropagation()
    let newCount = item.count;

    switch (operation) {
      case 'add':
        newCount += 1
        break;
      case 'substract':
        newCount -= 1
        break;
      default:
        console.log('...')
    }


    const newItem = {...item, count:newCount}
    updateCartItems(newItem)
  }


  // Informacion de Items en Carro
  const [count, setCount] = useState(0); // CONTADOR
  const [totalCurrentOrder, setTotalCurrentOrder] = useState(0);

  useEffect(()=> // El contador es en base a cuando se actualice el estado cartItems, de esta manera de cualquier manera que se actualice el carrito, se actualiza el contador
  {
    const updateCount = () =>
      {
        const totalItems = cartItems.reduce((total,item) => total + item.count,0)

        setCount(totalItems)  
      }
      
    const totalPriceCartItems = () =>
    {
      const arrayTotalEachProduct = cartItems.map((item) => item.price * item.count)
      const newTotalCurrentOrder = (arrayTotalEachProduct.reduce((total,item) => total +=item,0)).toFixed(2)
      
      setTotalCurrentOrder(newTotalCurrentOrder);
    }

    updateCount()
    totalPriceCartItems()
  },[cartItems])
  
  const isAlreadyAdded = (item) => cartItems.some(cartItem => cartItem.id === item.id)


  // Obtener informacion del item para su ProductDetail
  const [infoProductDetail, setInfoProductDetail] = useState(null)

 

  
  return(
    <AppContext.Provider value={
      {capitalizeFirstLetter, // Others


      filterSearch, // Filtro de busquedas
      setCategoryFilter,

      searchTitle, // Filtro por titulo
      setSearchTitle,

      activeComponent, // Estado - Componente activo (Modal, aside)
      setActiveComponent,

      checkoutOrder, // Ordenes totales
      totalOrders,

      cartItems, // Productos del carro
      setCartItems,
      addItemToCart,
      removeItemFromCart,
      itemChangeAmount,

      count, // Informacion de items en carrito
      setCount,
      totalCurrentOrder, 
      setTotalCurrentOrder,
      isAlreadyAdded,


      infoProductDetail, // Info del product detail
      setInfoProductDetail}
    }>
      {children}
    </AppContext.Provider>
  )
}
