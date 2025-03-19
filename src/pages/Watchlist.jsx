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
    secondBtn: 'Share',
    thirdBtn: 'More',
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.coinlore.net/api/tickers/')
      setData(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData() // Загружаем данные сразу

    const interval = setInterval(() => {
      fetchData()
    }, 3000) // Обновление каждые 30 секунд

    return () => clearInterval(interval) // Очищаем интервал при размонтировании компонента
  }, [])

  useBodyClass()

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
        {loading ? <p>Loading...</p> : <CryptoTable data={data} btns={btns} />}
      </div>
    </div>
  )
}

export default Watchlist
