import React from 'react'
import { NavLink } from 'react-router-dom'

import { ShoppingCartIcon } from '@heroicons/react/24/solid'

import { AppContext } from '../../context/appContext';

function Navbar() {

    const {count,setActiveComponent, activeComponent} = React.useContext(AppContext);

    const openComponentString = 'shoppingCart'
    const openShoppingCart = () =>
    {
        if(activeComponent!==openComponentString)
        {
            setActiveComponent(openComponentString)
        } else
        {
            setActiveComponent(null)
        }
    }

    const navActiveStyle = 'underline underline-offset-4 decoration-2 decoration-black/60'

    return (
        <nav className='bg-white border-b-2 border-black/60 h-16 flex justify-between items-center fixed z-10 w-full font-light text-sm px-4 py-4 top-0'>
            <ul className='flex items-center gap-4'>
                <li className='font-semibold text-lg'>
                    <NavLink to='/' >
                        Get-It
                    </NavLink>
                </li>
                <li>
                    <NavLink  to='/' 
                    className={({isActive}) => isActive ? navActiveStyle : undefined} >
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink to="men's clothing"
                    className={({isActive}) => isActive ? navActiveStyle : undefined} >
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/electronics' 
                    className={({isActive}) => isActive ? navActiveStyle : undefined} >
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/jewelery' 
                    className={({isActive}) => isActive ? navActiveStyle : undefined} >
                        Jewelery
                    </NavLink>
                </li>
                <li>
                    <NavLink  to='/others'
                    className={({isActive}) => isActive ? navActiveStyle : undefined} >
                        Others
                    </NavLink>
                </li>
            </ul>
            
            <ul className='flex items-center gap-4'>
                <li className='text-black/60'>
                    user@example.com
                </li>
                <li>
                    <NavLink to='/my-orders' 
                    className={({isActive}) => isActive ? navActiveStyle : undefined} >
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/my-account' 
                    className={({isActive}) => isActive ? navActiveStyle : undefined} >
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-in' 
                    className={({isActive}) => isActive ? navActiveStyle : undefined} >
                        Sign In
                    </NavLink>
                </li>
                <li onClick={() => openShoppingCart()} className='w-16 flex justify-between items-center gap-1 cursor-pointer border p-2 rounded-lg border-black'>
                    <ShoppingCartIcon className='w-6 h-6'>
                    </ShoppingCartIcon>
                    <div>
                    {count}
                    </div> 
                </li>
            </ul>
        </nav>
    )
}

export default Navbar