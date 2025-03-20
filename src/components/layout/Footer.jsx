import React from 'react'
import './Footer.css'

const scrollToSections = id => {
  const elements = document.querySelectorAll(`#${id}`)
  if (elements.length > 0) {
    // Прокрутить к первому элементу
    elements[0].scrollIntoView({ behavior: 'smooth' })

    // Если элементов больше одного, прокрутить ко второму
    if (elements.length > 1) {
      setTimeout(() => {
        elements[1].scrollIntoView({ behavior: 'smooth' })
      }, 500) // Задержка для плавности прокрутки
    }
  }
}

const Footer = () => {
  return (
    <footer>
      <div className='foot'>
        <div className='about-us-block'>
          <a className='logo-footer' href='#'>
            Q BLOCKCHAIN
          </a>
          <p className='about-us'>
            Q BLOCKCHAIN is a Block Explorer and Analytics Platform for Q Platform
          </p>
          <a href='#'>
            <img src='/img/telegram.svg' alt='' />
          </a>
        </div>
        <nav className='links'>
          <button className='link' onClick={() => scrollToSections('top')}>
            Top Accounts
          </button>
          <button className='link' onClick={() => scrollToSections('blocks')}>
            Blocks
          </button>
          <button className='link' onClick={() => scrollToSections('blocks')}>
            Transactions
          </button>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
