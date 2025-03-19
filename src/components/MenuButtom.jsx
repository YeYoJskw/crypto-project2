import React from 'react'
import './MenuBottom.css'
import { NavLink } from 'react-router-dom'

const MenuBottom = () => {
  return (
    <div>
      <div className='menu-bottom'>
        <div className='menu-content'>
          <div className='menu-bottom-button'>
            <NavLink
              to='/Dashboard'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/user.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/Portfolio'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/activity.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/Trading'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/trade.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/Watchlist'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/eye.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/Academy'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/book.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/Profile'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/menu.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/Wallet'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/wallet-2.svg' alt='' />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuBottom
