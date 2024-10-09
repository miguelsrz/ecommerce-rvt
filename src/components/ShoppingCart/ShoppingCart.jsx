// import React from 'react'
// import { BeakerIcon } from '@heroicons/react/24/solid'
 import { Link } from 'react-router-dom'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { AppContext } from '../../context/appContext'
import ShoppingItem from '../ShoppingItem/ShoppingItem';


function ShoppingCart () {
  
  const {checkoutOrder,setActiveComponent, activeComponent, cartItems, count, totalCurrentOrder} = useContext(AppContext);

  const todaysDate = new Date().toLocaleString().split(',')[0]
  
  const closeProductDetail = () =>
  {
    setActiveComponent(null)
  }

  const handleCheckout = () =>
  {
    const newOrder = 
    {
      date: todaysDate,
      productsList: cartItems,
      totalProducts: count,
      totalPrice: totalCurrentOrder,
    }
    checkoutOrder(newOrder)
    setActiveComponent(null)
  }

  if(activeComponent===null)
  {
    document.querySelector('#layout').classList.remove('overflow-hidden')
  }


  if(activeComponent==='shoppingCart')
  {
    document.querySelector('#layout').classList.add('overflow-hidden')
    return (
    
      <div className="w-full h-full fixed top-0">
          <div onClick={()=> closeProductDetail()} className="w-full h-full bg-black/35">
          </div>
  
          <aside  className="flex flex-col py-4 border-l-2 border-black/60 w-[70%] max-w-[400px] h-[calc(100vh-64px)] bg-white z-10 fixed bottom-0 right-0">
            <div className="mx-4 pb-4 relative flex justify-center items-center  border-b border-black">
              <XMarkIcon onClick={()=>closeProductDetail()} className='hover:rotate-90 transition-all duration-200 absolute left-0 top-0.5  w-8 h-8 cursor-pointer'/>
              <h1 className="font-medium text-2xl ">Shopping Cart</h1>
            </div>

            <section className='px-4 flex-1 flex flex-col mb-4 py-4 border-b border-black h-auto overflow-auto'>
              {cartItems.map((item) =>
              (
                <ShoppingItem key={item.id } item={item} wasChecout={false}></ShoppingItem>
              ))}

            </section>
            
            <section className='px-4 flex flex-col gap-4'>
              <div className='w-full flex justify-between p-4 bg-gray-200 rounded-lg'>
                <div>
                  <p className='text-sm font-medium'>
                    {todaysDate}
                  </p>
                  <p>
                    {count} Product(s)
                  </p>
                </div>
                <h1 className='flex items-center font-semibold text-xl'>
                  $ {totalCurrentOrder}
                </h1>
                
              </div>
              <Link to={count!==0 && '/my-orders/last'}>
                <button onClick={() => handleCheckout()} type='button' className='w-full bg-gray-300 h-16 rounded-lg font-semibold text-lg'>
                  Checkout
                </button>
              </Link>

            </section>
            
          </aside>
      </div>
    )
  } else
  {
    return null
  }
  
}

export default ShoppingCart
