import { useState, useEffect } from 'react'
import './Header.css'

const emojis = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😊',
  '😎',
  '🥳',
  '😇',
  '😍',
  '🤩',
  '😻',
  '💖',
  '🎉',
  '🚀',
  '✨',
  '🔥',
  '🌟',
  '💯',
  '👏',
  '👍',
  '🙌',
  '💪',
  '🎶',
  '🎊',
  '🥂',
  '🍀',
  '🍕',
  '🍫',
  '🌞',
]

const Header = ({ title, isMobile }) => {
  const [activeUsers, setActiveUsers] = useState(0)
  const [randomEmoji, setRandomEmoji] = useState('')

  useEffect(() => {
    const generateRandomUsers = () => {
      return Math.floor(Math.random() * (271383 - 36790 + 1)) + 36790
    }
    setActiveUsers(generateRandomUsers())

    const randomIndex = Math.floor(Math.random() * emojis.length)
    setRandomEmoji(emojis[randomIndex])
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
          <div className='profile-user emoji-avatar'>{randomEmoji}</div>
        </div>
      </header>
    </div>
  )
}

export default Header
