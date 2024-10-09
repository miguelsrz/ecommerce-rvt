import { useContext } from "react"
import { AppContext } from "../../context/appContext"

function Searchbar() {

    const {setSearchTitle} = useContext(AppContext);

    const handleSearchBar = (event) =>
    {
        setSearchTitle(event.target.value)
    }

  return (
    <input className='focus:outline-none border border-black w-1/2 max-w-[450px] py-2 px-4 mb-4' 
    type='text' placeholder='Search products...' onChange={(event)=>handleSearchBar(event)}/>
  )
}

export default Searchbar