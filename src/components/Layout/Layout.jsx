import PropTypes from 'prop-types'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
// import React from 'react'

function Layout({children}) {
    Layout.propTypes = {
        children: PropTypes.node.isRequired,
      }

    return (
        <div id='layout' className='h-[calc(100vh-64px)] overflow-auto relative flex flex-col mt-16 px-8 pt-8 pb-8 justify-start items-center'>
            {children}
            <ShoppingCart></ShoppingCart>
        </div>
    )
}

export default Layout