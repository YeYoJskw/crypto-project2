import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './HeaderSecond.css'

const HeaderSecond = ({ transactions }) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredResults, setFilteredResults] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = transactions.filter(
        tx =>
          tx.hash?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          tx.block?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          tx.from?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          tx.to?.toLowerCase()?.includes(searchQuery.toLowerCase())
      )
      setFilteredResults(filtered)
      setIsDropdownOpen(true)
    } else {
      setFilteredResults([])
      setIsDropdownOpen(false)
    }
  }, [searchQuery, transactions])

  // Функция для закрытия меню при клике вне него
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div>
      <div className='background-header2'></div>
      <header id='header' className='header2'>
        <a className='logo-header' onClick={() => navigate('/Wallet')}>
          <b>Q</b> BLOCKCHAIN
        </a>
        <form className='form-search-header' action=''>
          <select className='filter-dropdown-header'>
            <option value='option1'>BLOCKCHAIN</option>
            <option value='option2'>SOLANA</option>
            <option value='option3'>TON</option>
            <option value='option4'>Q</option>
          </select>
          <div className='search-wrapper' ref={dropdownRef}>
            <input
              type='text'
              className='search-field-header'
              placeholder='Search by Address / Txn Hash / Block'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {isDropdownOpen && filteredResults.length > 0 && (
              <ul className='search-suggestions'>
                {filteredResults.map(tx => (
                  <li
                    key={tx.hash}
                    onClick={() => {
                      setSearchQuery(tx.hash)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {`From: ${tx.from}`}
                  </li>
                ))}
              </ul>
            )}
            <button className='search-button-header'>
              <img src='/img/search.svg' alt='' />
            </button>
          </div>
        </form>
      </header>
    </div>
  )
}

export default HeaderSecond
