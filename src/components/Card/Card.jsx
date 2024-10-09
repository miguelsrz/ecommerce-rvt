import React from 'react'
import { AppContext } from '../../context/appContext';
import { CheckIcon } from '@heroicons/react/24/solid'

function Card({item}) {

  const {isAlreadyAdded, setInfoProductDetail,setActiveComponent, capitalizeFirstLetter, addItemToCart} = React.useContext(AppContext);

  const isItemAlreadyAdded = isAlreadyAdded(item);
  
  const openProductDetail = () =>
  {
    setInfoProductDetail(item)
    setActiveComponent('productDetail')
  }

  const addedToCart = (e) =>
  {
    e.stopPropagation()
    setActiveComponent('shoppingCart')

    if(!isItemAlreadyAdded)
    {
      addItemToCart(item)
    } 
  }


  return (
    <div onClick={() => openProductDetail()} className='p-4 shadow-lg border w-full h-max  bg-white cursor-pointer flex flex-col'>
        <figure className='relative mb-2 w-full h-56 sm:h-72'>
            <img loading='lazy' className="rounded-lg w-full h-full object-contain" src={item?.images[0]} alt={item?.title} />
            {!isItemAlreadyAdded 
            ? <button onClick={(e) => addedToCart(e)} className='border-2 border-transparent hover:border-black pb-1.5 pl text-2xl font-bold absolute top-2 right-2 flex justify-center items-center bg-gray-200 w-8 h-8 rounded-full'>
                +
              </button>
            :<button onClick={(e) => addedToCart(e)} className='border-2 border-transparent hover:border-black p-1 pl  font-bold absolute top-2 right-2 flex justify-center items-center bg-green-200 w-8 h-8 rounded-full'>
                <CheckIcon></CheckIcon>
              </button>
            }
            <span className=' text-sm font-semibold absolute bottom-2 left-2 px-2 bg-gray-200  rounded-lg text-black'>
              {capitalizeFirstLetter(item?.category)}
            </span>
        </figure>
        <p className="flex flex-col justify-start h-14">
            <span className=" text-sm font-light  w-full text-ellipsis overflow-hidden whitespace-nowrap">{item?.title}</span>
            <span className="pt-1 mt-1 border-black/60 border-t text-lg font-medium w-full">$ {item?.price}</span>
        </p>
        
    </div>
  )
}

export default Card