import React from "react";
import { Link } from 'react-router-dom'

import { AppContext } from "../../context/appContext";
import OrdersCard from "../../components/OrdersCard/OrdersCard";

function MyOrders() {

  const {totalOrders} = React.useContext(AppContext);

  return (
    <>
      <div className='flex flex-col justify-start overflow-hidden'>
        <h1 className="font-semibold text-xl text-center h-max">
        Your orders history
        </h1>
        <section className='flex-1 w-96   flex flex-col mb-4  border-b border-black overflow-auto'>
              <div className="px-4 py-4">
                {totalOrders?.map((order) =>
                (
                  <Link key={order.id} to={`/my-orders/${order.id}`}> 
                    <OrdersCard order={order}></OrdersCard>
                  </Link>
                ))}
              </div>
              
        </section>
        <p className="font-semibold text-xl h-max">
          TOTAL ORDERS: {totalOrders.length}
        </p>
      </div>
      
    </>
  )
}

export default MyOrders
