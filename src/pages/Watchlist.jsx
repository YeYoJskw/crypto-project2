import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import './Watchlist.css'
import CryptoTable from '../components/CryptoTable'
import Menu from '../components/Menu'
import MenuButtom from '../components/MenuButtom'
import axios from 'axios'
import useBodyClass from '../hooks/useBodyClass'

const Watchlist = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const btns = {
    firstBtn: 'Add coins',
    secondBtn: 'Stars',
    thirdBtn: 'Capital',
  }

  const [sortType, setSortType] = useState(null)

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
  }, [sortType])

  useBodyClass()

  const handleSort = type => {
    setSortType(prevType => (prevType === type ? null : type)) // Тоггл сортировки
  }

  return (
    <div>
      <Header title={'Watchlist'} />
      <Menu />
      <MenuButtom />
      <div className='Watchlist-content'>
        <div className='myCoins-block'>
          <div className='primary-block'>
            <div className='primary'>Primary</div>
            <div className='coins-list'>
              My coins list
              <img src='/img/arrow-down-coins.svg' alt='' className='coins-list-img' />
            </div>
          </div>

          <div className='buttons-coins'>
            <button className='button-edit'>
              <img src='/img/edit-2.svg' alt='' className='button-edit-icon' />
              <div className='button-edit-text'>Edit</div>
            </button>
            <button className='button-new-watchlist'>
              <img src='/img/add-watchlist.svg' alt='' className='button-watchlist-icon' />
              <div className='button-watchlist-text'>New watchlist</div>
            </button>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CryptoTable data={data} btns={btns} onSort={handleSort} activeSort={sortType} />
        )}
      </div>
    </div>
  )
}

export default Watchlist
