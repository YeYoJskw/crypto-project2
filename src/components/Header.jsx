import { useState, useEffect } from 'react'
import './Header.css'

const Header = ({ title, isMobile }) => {
  const [activeUsers, setActiveUsers] = useState(0)

  useEffect(() => {
    const generateRandomUsers = () => {
      return Math.floor(Math.random() * (271383 - 36790 + 1)) + 36790
    }

    setActiveUsers(generateRandomUsers())
  }, []) // Запустится один раз при загрузке

  return (
    <div>
      <div className='background-header'></div>
      <header className='header'>
        <div className='name-page'>
          <div className='title-page'>{title}</div>
          <div className='updatedOn'>
            <i>
              Active users: <span className='active-users'>{activeUsers}</span>
            </i>
          </div>
        </div>
        <div className='header-user'>
          {!isMobile && (
            <div className='search-block'>
              <input className='search-input' type='text' placeholder='Search your coins...' />
              <button className='search-button2'>
                <img src='/img/search.svg' className='search-img' alt='' />
              </button>
            </div>
          )}
          <button className='notifications'>
            <img className='notification-img' src='/img/notification-bing.svg' alt='' />
          </button>
          <div className='profile-user'>
            <img src='/img/avatar-user.svg' className='avatar-user' alt='' />
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
