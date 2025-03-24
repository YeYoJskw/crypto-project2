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

  const highlightMatch = (text, query) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, 'gi')
    return text
      .split(regex)
      .map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? <b key={index}>{part}</b> : part
      )
  }

  return (
    <div>
      <div className='background-header2'></div>
      <header id='header' className='header2'>
        <a className='logo-header' onClick={() => navigate('/blockchain')}>
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
                    className='input-prompt'
                    onClick={() => {
                      setSearchQuery(tx.hash)
                      setIsDropdownOpen(false)
                    }}
                  >
                    <div className='from-input'>From:</div>{' '}
                    <div>{highlightMatch(tx.from, searchQuery)}</div>
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
