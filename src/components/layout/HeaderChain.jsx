import React from 'react'
import './HeaderChain.css'
import { useNavigate } from 'react-router-dom'
import Menu from '../Menu'

const scrollToSection = id => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const HeaderChain = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Menu />
      <div className='background-header2'></div>
      <header id='header' className='header2'>
        <a className='logo-header' onClick={() => navigate('/blockchain')}>
          <b>Q</b> BLOCKCHAIN
        </a>
        <nav>
          <ul>
            <li>
              <button className='link' onClick={() => scrollToSection('header')}>
                Top
              </button>
            </li>
            <li>
              <button className='link' onClick={() => scrollToSection('blocks')}>
                Blocks
              </button>
            </li>
            <li>
              <button className='link' onClick={() => scrollToSection('transactions')}>
                Transactions
              </button>
            </li>
          </ul>
          <button onClick={() => navigate('/wallet')} className='button-header'>
            Explorer
          </button>
        </nav>
      </header>
    </div>
  )
}

export default HeaderChain
