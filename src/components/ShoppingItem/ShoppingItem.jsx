
import { useContext } from "react"
import { AppContext } from "../../context/appContext"

function ShoppingItem({item,wasChecout}) {
    
    const {capitalizeFirstLetter, setInfoProductDetail, setActiveComponent, removeItemFromCart, itemChangeAmount} = useContext(AppContext)

    const viewProduct = (e) =>
    {
        if(!e.target.closest('#itemAmountWidget'))
        {
            setActiveComponent('productDetail');
            setInfoProductDetail(item);
        }
        
    }

    const countAdd = (e) =>
    {
        itemChangeAmount('add',item,e);
    }

    const countSubstract = (e) =>
    {
        itemChangeAmount('substract',item,e);
    }

    const deleteItem = (e) =>
    {
        removeItemFromCart(item.id,e);
    }

   return (
    <article onClick={!wasChecout ? (e)=> viewProduct(e) : undefined} className='hover:bg-zinc-200 cursor-pointer flex w-full py-4 border-b last-of-type:border-transparent border-black'>
        <figure className='h-[100px] w-[75px]  mx-2'>
              <img className='w-full h-full object-contain' src={item.images[0]} alt={item.title}/>
        </figure>
        <div className='w-[calc(100%-91px)] flex flex-col justify-between border-l pl-4 border-black'>
                <section>
                    <div className="flex items-center gap-2">
                        <p className='font-semibold text-lg'>
                        $ {item.price}
                        </p>
                        <p className='text-black/50 font-semibold text-sm pl-2 border-l border-black'>
                            {capitalizeFirstLetter(item.category)}
                        </p>
                    </div>
                    
                    <h1 className='font-semibold text-sm overflow-hidden text-ellipsis whitespace-nowrap'>
                    {item.title}
                    </h1>
                </section>


                {!wasChecout && <section id="itemAmountWidget" className="flex justify-start gap-4">
                    <div  className="flex justify-between items-center w-3/5 border border-black">
                        <button onClick={(e) => countSubstract(e)} disabled={item.count<=1 ? true : false}  className="w-8 h-8 bg-gray-300 border-r border-black disabled:bg-black">-</button>
                        <p className="cursor-default bg-white flex-1 h-full flex justify-center items-center" >{item.count}</p>
                        <button onClick={(e) => countAdd(e)} className="w-8 h-8 bg-gray-300 border-l border-black">+</button>
                    </div>
                    <button onClick={(e) => deleteItem(e)} className="w-8 h-8 bg-red-600"></button>
                </section>}
        </div>
        
    </article>
  )
}

export default ShoppingItem