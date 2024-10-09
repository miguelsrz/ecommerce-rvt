

function OrdersCard({order}) {
    
    // const {setInfoProductDetail} = useContext(AppContext)



   return (
    <article className='hover:bg-zinc-200 cursor-pointer flex w-full py-4 border-b last-of-type:border-transparent border-black'>
        <div className='w-full flex flex-col justify-between border-l pl-4 border-black'>
                <section>
                    <div className="w-full flex items-center gap-2 border-b border-black mb-2 ">
                        <p className='w-[120px] font-semibold text-base'>
                        Date: {order.date}
                        </p>
                        <p className='flex-1 text-black/50 font-semibold text-sm pl-2 border-l border-black whitespace-nowrap text-ellipsis overflow-hidden'>
                        ID: {order.id}
                        </p>
                    </div>
                    
          
                    <p className='font-semibold text-sm'>
                    Products: {order.totalProducts}
                    </p>

                    <p className="font-semibold">
                    Total: $ {order.totalPrice}
                    </p>
           
                    
                </section>
        </div>
    </article>
  )
}

export default OrdersCard