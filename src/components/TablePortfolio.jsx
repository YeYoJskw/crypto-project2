import React, { useEffect, useState } from 'react'
import './CryptoTable.css'
import './TablePortfolio.css'

const TablePortfolio = () => {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coinlore.net/api/tickers/')
        const data = await response.json()

        // Преобразуем данные под текущую таблицу
        const formattedData = data.data.map(coin => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          price: parseFloat(coin.price_usd).toFixed(2),
          change24h: parseFloat(coin.percent_change_24h).toFixed(2),
          titleLogo: `https://www.coinlore.com/img/${coin.nameid}.png`,
          balance: Math.random().toFixed(2), // Заглушка, можно заменить на реальные данные
          avgBuy: (parseFloat(coin.price_usd) * 0.95).toFixed(2), // Заглушка, для примера
          profitLoss: `${(Math.random() * 10 - 5).toFixed(2)}%`, // Заглушка, можно заменить
        }))

        setCoins(formattedData)
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Обновлять каждые 30 секунд

    return () => clearInterval(interval) // Очистка интервала при размонтировании
  }, [])

  return (
    <div className='portfolio-table-container'>
      <table className='crypto-table'>
        <thead>
          <tr>
            <th className='name-portfolio-th'>Assets</th>
            <th className='price-th'>Price</th>
            <th className='hours-th'>24H</th>
            <th className='balance-th'>Balance</th>
            <th className='days-th'>Avg buy</th>
            <th className='market-th'>Profit/Loss</th>
            <th className='volume-th'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(coin => (
            <tr key={coin.id}>
              <td className='names-portfolio'>
                <div className='coins-name-td'>
                  <img className='logo-coin' src={coin.titleLogo} alt={coin.name} />
                  <div className='coin-name-td'>
                    <span className='coin-name'>{coin.name}</span>
                    <span className='coin-symbol'>{coin.symbol.toUpperCase()}</span>
                  </div>
                </div>
              </td>
              <td>${coin.price}</td>
              <td className={coin.change24h >= 0 ? 'text-green' : 'text-red'}>{coin.change24h}%</td>
              <td>{coin.balance}</td>
              <td>${coin.avgBuy}</td>
              <td>{coin.profitLoss}</td>
              <td>
                <button className='action-btns'>
                  <div className='menu-table'>
                    <img src='/img/menu-table.svg' alt='menu' />
                  </div>
                  <div className='setting-table'>
                    <img src='/img/setting.svg' alt='settings' />
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablePortfolio
