import React from "react"

import { Link, useParams } from 'react-router-dom'

import { AppContext } from "../../context/appContext"

import ShoppingItem from "../../components/ShoppingItem/ShoppingItem";

import { ChevronLeftIcon } from '@heroicons/react/24/solid'



function MyOrder() {

  const {totalOrders} = React.useContext(AppContext);

  
  const indexOrder = useParams();
  console.log(indexOrder)

  const latestOrder = totalOrders[0]
  const currentOrder = totalOrders.filter((order) => order.id === indexOrder.id)
  console.log(currentOrder)

  return (
    <>
      <div className='h-screen w-96'>
        <div className="relative flex items-center justify-center gap-4" >
          <Link to={"/my-orders"}>
            <ChevronLeftIcon className="absolute inset-0 my-auto left-0 w-4 h-4"></ChevronLeftIcon>
          </Link>
          {indexOrder.id!=='last' 
            ? <h1 className="font-semibold text-xl text-center">
            Your order
            </h1>
            : <h1 className="font-semibold text-xl text-center">
            Your last order
            </h1>}
        </div>
        
        <section className='px-4 flex-1 flex flex-col py-4 border-b border-black h-auto overflow-auto'>
              {indexOrder.id!=='last'
                ? currentOrder[0]?.productsList.map((item) =>
                  (
                    <ShoppingItem key={item.id} item={item} wasChecout={true}></ShoppingItem>
                  ))
                : latestOrder?.productsList.map((item) =>
                  (
                    <ShoppingItem key={item.id} item={item} wasChecout={true}></ShoppingItem>
                  ))
               }
            </section>
      </div>
      
    </>
  )
}

export default MyOrder
