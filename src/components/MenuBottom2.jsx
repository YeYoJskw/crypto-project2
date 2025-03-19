import React from 'react'
import { Link } from 'react-router-dom'
import './MenuBottom.css'

const MenuBottom2 = () => {
  return (
    <div className='menu-bottom'>
      <div className='menu-content'>
        <div className='menu-bottom-button'>
          <Link to='/Wallet' className='menu-bottom-link'>
            BLOCKS
          </Link>
        </div>
        <div className='menu-bottom-button'>
          <Link to='/Profile' className='menu-bottom-link'>
            CHAINS
          </Link>
        </div>
        <div className='menu-bottom-button'>
          <Link to='/Profile' className='menu-bottom-link'>
            TRANSFERS
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MenuBottom2
