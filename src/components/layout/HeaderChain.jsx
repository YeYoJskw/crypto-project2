import React from 'react'
import './HeaderChain.css'
import { useNavigate } from 'react-router-dom'
import Menu from '../Menu'

const HeaderChain = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='background-header2'></div>
      <header className='header2'>
        <Menu />
        <a className='logo-header' onClick={() => navigate('/Wallet')}>
          <b>Q</b> BLOCKCHAIN
        </a>
        <nav>
          <ul>
            <li>
              <a href='#'>Top</a>
            </li>
            <li>
              <a href='#'>Blocks</a>
            </li>
            <li>
              <a href='#'>Transactions</a>
            </li>
          </ul>
          <button onClick={() => navigate('/Profile')} className='button-header'>
            Explorer
          </button>
        </nav>
      </header>
    </div>
  )
}

export default HeaderChain
