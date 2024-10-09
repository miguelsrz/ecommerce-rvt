// import React from 'react'
// import { BeakerIcon } from '@heroicons/react/24/solid'
 
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { AppContext } from '../../context/appContext'


function ProductDetail () {
  
  const {addItemToCart, isAlreadyAdded,infoProductDetail, setInfoProductDetail, activeComponent, setActiveComponent, capitalizeFirstLetter} = useContext(AppContext);


  const closeProductDetail = () =>
  {
    document.querySelector('#layout').classList.remove('overflow-hidden')
    setInfoProductDetail(null)
    setActiveComponent(null)
  }

  const addItem = () =>
  {
    addItemToCart(infoProductDetail)
    setActiveComponent('shoppingCart')
  }

  const viewCart = () =>
  {
    setInfoProductDetail(null)
    setActiveComponent('shoppingCart')
  }

  if(activeComponent==='productDetail')
  {
    const isItemAlreadyAdded = isAlreadyAdded(infoProductDetail);
    document.querySelector('#layout').classList.add('overflow-hidden');

    return (
    
      <div className="w-full h-full fixed top-0">
          <div onClick={()=>closeProductDetail()} className="w-full h-full bg-black/35">
          </div>
  
          <aside className="flex flex-col p-4 border-l-2 border-black/60 w-[70%] max-w-[400px] h-[calc(100vh-64px)] bg-white z-10 fixed bottom-0 right-0">
            <div className="pb-4 relative flex justify-center items-center  border-b border-black">
              <XMarkIcon onClick={()=>closeProductDetail()} className='hover:rotate-90 transition-all duration-200 absolute left-0 top-0.5  w-8 h-8 cursor-pointer'/>
              <h1 className="font-medium text-2xl ">Product Details</h1>
            </div>

            <figure className='my-6 h-72'>
              <img className='w-full h-full object-contain' src={infoProductDetail.images[0]} alt={infoProductDetail.title}/>
            </figure>

            <section className='flex-1 flex flex-col mb-4 py-4 border-y border-black h-auto overflow-auto'>
              <div className='flex flex-col gap-0 pb-4 border-b border-black'>
                <p className='font-semibold'>
                  $ {infoProductDetail.price}  
                </p> 
                <h1 className='font-semibold text-2xl'>
                  {infoProductDetail.title}
                </h1>
              </div>
              <p className='mt-4 text-balance'>
                {capitalizeFirstLetter(infoProductDetail.description)}
              </p>
            </section>

            {!isItemAlreadyAdded 
            ? <button onClick={()=> addItem()} type='button' className='w-full bg-gray-300 h-16 rounded-lg font-semibold text-lg'>
              Add to cart
            </button>
            : <button onClick={()=> viewCart()} type='button' className='w-full bg-green-200 h-16 rounded-lg font-semibold text-lg'>
              Product in cart
              </button>}
            
          </aside>
      </div>
    )
  } else
  {
    return null
  }
  
}

export default ProductDetail
