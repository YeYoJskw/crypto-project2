import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Menu from '../components/Menu'
import MenuBottom from '../components/MenuButtom'
import CryptoTable from '../components/CryptoTable'
import './Trading.css'
import axios from 'axios'
import useBodyClass from '../hooks/useBodyClass'

const Trading = () => {
  const btns = {
    firstBtn: 'Add coins',
    secondBtn: 'Stars',
    thirdBtn: 'Capital',
  }

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortType, setSortType] = useState(null) // Состояние для сортировки

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.coinlore.net/api/tickers/')
      let sortedData = response.data.data

      if (sortType === 'stars') {
        sortedData = sortedData.sort((a, b) => (b.coins || 0) - (a.coins || 0))
      } else if (sortType === 'capital') {
        sortedData = sortedData.sort((a, b) => b.price_usd - a.price_usd)
      }

      setData(sortedData)
      setLoading(false)
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 300) // Обновление каждые 30 секунд

    return () => clearInterval(interval)
  }, [sortType]) // Перезагружаем при смене сортировки

  useBodyClass()

  const handleSort = type => {
    setSortType(prevType => (prevType === type ? null : type)) // Тоггл сортировки
  }

  return (
    <div className='Trading'>
      <div className='Watchlist-content'>
        <div className='myCoins-block'>
          <div className='primary-block'>
            <div className='primary'>Primary</div>
            <div className='coins-list'>Coins list</div>
          </div>

          <div className='buttons-coins'>
            <button className='button-edit button-interest'>
              <img src='/img/edit-2.svg' alt='' className='button-edit-icon' />
              <div className='button-edit-text'>Interest</div>
            </button>
            <button className='button-new-watchlist'>
              <img src='/img/add-watchlist.svg' alt='' className='button-watchlist-icon' />
              <div className='button-watchlist-text'>New watchlist</div>
            </button>
          </div>
        </div>
        <Menu />
        <Header title={'Trading'} />

        <CryptoTable data={data} btns={btns} onSort={handleSort} activeSort={sortType} />
      </div>
      <MenuBottom />
    </div>
  )
}

export default Trading
