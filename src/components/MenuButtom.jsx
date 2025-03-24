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
              to='/board'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/user.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/portfolio'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/activity.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/swap'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/trade.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/watch'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/eye.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/academy'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/book.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/blockchain'
              className={({ isActive }) =>
                isActive ? 'menu-bottom-link active' : 'menu-bottom-link'
              }
            >
              <img src='/img/menu.svg' alt='' />
            </NavLink>
          </div>
          <div className='menu-bottom-button'>
            <NavLink
              to='/wallet'
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
