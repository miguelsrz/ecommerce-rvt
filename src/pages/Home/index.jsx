import { lazy, Suspense, useContext, useEffect } from 'react';
import { AppContext } from '../../context/appContext';

const Card = lazy(() => import('../../components/Card/Card'))

import ProductDetail from '../../components/ProductDetail/ProductDetail';
import Searchbar from '../../components/Searchbar/Searchbar';
import { useParams } from 'react-router-dom';


function Home() {

  const {category} = useParams();

  const {filterSearch, setCategoryFilter} = useContext(AppContext)

  useEffect(()=> 
    {
      if(!category)
      {
        setCategoryFilter('')
      } else
      {
        setCategoryFilter(category)
      }

    }, [category])

  const areItemsToRender = (filterSearch?.length != 0)

  return (
    <>
      <div className='mb-4'>
        <h1 className='text-xl font-semibold'>Exclusive Products</h1>
      </div>

    <Searchbar></Searchbar>

     <section className='relative h-full pb-4 grid h-max gap-4 grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-xl'>
        {areItemsToRender 
          ? filterSearch?.map((item)=>
          (<Suspense key={item.id}> 
            <Card  item={item}/> 
          </Suspense> ))
          : <p className='font-semibold absolute inset-x-0 text-center'>No results found...</p>}
        {
        }
      </section>
      <ProductDetail></ProductDetail>
    </>
     
  )
}

export default Home
