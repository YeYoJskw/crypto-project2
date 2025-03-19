import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.css'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchStartY, setTouchStartY] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    const handleTouchStart = event => {
      const touch = event.touches[0]
      setTouchStartX(touch.clientX)
      setTouchStartY(touch.clientY)
    }

    const handleTouchEnd = event => {
      if (touchStartX !== null) {
        const touchEndX = event.changedTouches[0].clientX
        const swipeDistance = touchEndX - touchStartX

        if (swipeDistance < -100) {
          setIsOpen(false) // Закрытие при свайпе влево
        } else if (
          swipeDistance > 100 &&
          touchStartX < 50 &&
          Math.abs(touchStartY - event.changedTouches[0].clientY) < 50
        ) {
          setIsOpen(true) // Открытие при свайпе вправо только если свайп начался в углу
        }
      }
      setTouchStartX(null)
      setTouchStartY(null)
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [touchStartX])

  const menuItems = [
    { name: 'Dashboard', img: '/img/user.svg', path: '/Dashboard' },
    { name: 'Portfolio', img: '/img/activity.svg', path: '/Portfolio' },
    { name: 'Trading', img: '/img/trade.svg', path: '/Trading' },
    { name: 'Watchlist', img: '/img/eye.svg', path: '/Watchlist' },
    { name: 'Academy', img: '/img/book.svg', path: '/Academy' },
    { name: 'Blockchain', img: '/img/menu.svg', path: '/Profile' },
    { name: 'Wallet', img: '/img/wallet-2.svg', path: '/Wallet' },
  ]

  return (
    <>
      <button className={styles.burgerMenu} onClick={() => setIsOpen(!isOpen)}>
        <span className={`${styles.burgerLine} ${isOpen ? styles.burgerLineOpen : ''}`}></span>
        <span className={`${styles.burgerLine} ${isOpen ? styles.burgerLineOpen : ''}`}></span>
        <span className={`${styles.burgerLine} ${isOpen ? styles.burgerLineOpen : ''}`}></span>
      </button>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <a className={styles.logoMenu}>
          <b>Q</b> BLOCKCHAIN
        </a>

        {isMobile && (
          <div className={styles.searchBlock}>
            <input className={styles.searchInput} type='text' placeholder='Search your coins...' />
            <button className={styles.searchButton}>
              <img src='/img/search.svg' className={styles.searchImgMenu} alt='' />
            </button>
          </div>
        )}

        <nav className={styles.menu}>
          {menuItems.map(item => (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.active : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {({ isActive }) => (
                <>
                  <div className={isActive ? styles.activeBoardImg : styles.boardImg}>
                    <img src={item.img} alt={item.name} />
                  </div>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className={styles.bottomMenu}>
          <div className={styles.menuItem} onClick={() => setIsOpen(false)}>
            <img className={styles.logoutImg} src='/img/logout.svg' alt='Logout' />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
