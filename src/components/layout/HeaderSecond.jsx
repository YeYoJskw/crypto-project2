import React from 'react'
import './HeaderSecond.css'
import { useNavigate } from 'react-router-dom'

const HeaderSecond = () => {
  const navigate = useNavigate()

  return (
    <header className='header2'>
      <a className='logo-header' onClick={() => navigate('/Wallet')}>
        <b>Q</b> BLOCKCHAIN
      </a>
      <form className='form-search-header' action=''>
        <select className='filter-dropdown-header'>
          <option value='option1'>ALL FILTERS</option>
          <option value='option2'>SOLANA BLOCKCHAIN</option>
          <option value='option3'>TON BLOCKCHAIN</option>
          <option value='option4'>Q BLOCKCHAIN</option>
        </select>
        <div>
          <input type='text' className='search-field-header' placeholder='Search by Address ' />
          <button className='search-button-header'>
            <img src='/img/search.svg' alt='' />
          </button>
        </div>
      </form>
    </header>
  )
}

export default HeaderSecond
