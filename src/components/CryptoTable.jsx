import React from 'react'
import './CryptoTable.css'

const CryptoTable = ({ data, btns }) => {
  return (
    <div className='crypto-table-container'>
      <div className='crypto-table-buttons'>
        <div className='crypto-table-buttonsContent'>
          <button className='btn-add'>
            <img src='/img/add-coins.svg' alt='' />
            {btns?.firstBtn || 'Add'}
          </button>
          <button className='btn-share'>
            <img src='/img/share.svg' alt='' />
            {btns?.secondBtn || 'Share'}
          </button>
          <button className='btn-more'>
            <img src='/img/more.svg' alt='' />
            {btns?.thirdBtn || 'More'}
          </button>
        </div>
      </div>
      <table className='crypto-table'>
        <thead>
          <tr>
            <th className='stars-th'>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24H</th>
            <th>7D</th>
            <th>Market Cap</th>
            <th>Volume</th>
            <th>Last 7 days</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((coin, index) => (
              <tr key={coin.id}>
                <td className='stars'>
                  <img src='/img/star.svg' alt='' />
                  {coin.coins}
                </td>
                <td>{index + 1}</td>
                <td>
                  <div className='coins-name-td'>
                    <img
                      className='logo-coin'
                      src={`https://www.coinlore.com/img/${coin.nameid}.png`}
                      alt={coin.name}
                    />
                    <div className='coin-name-td'>
                      <span className='coin-name'>{coin.name}</span>
                      <span className='coin-symbol'>{coin.symbol.toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td>${parseFloat(coin.price_usd).toFixed(2)}</td>
                <td className={coin.percent_change_24h >= 0 ? 'text-green' : 'text-red'}>
                  {coin.percent_change_24h}%
                </td>
                <td className={coin.percent_change_7d >= 0 ? 'text-green' : 'text-red'}>
                  {coin.percent_change_7d}%
                </td>
                <td>${parseFloat(coin.market_cap_usd).toLocaleString()}</td>
                <td>${parseFloat(coin.volume24).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='7'>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CryptoTable
