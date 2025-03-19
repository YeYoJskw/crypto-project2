import React from 'react'
import './CryptoTable.css'
import './TablePortfolio.css'

const TablePortfolio = ({ data }) => {
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
          {data.map(coin => (
            <tr key={coin.id}>
              <td className='names-portfolio'>
                <div className='coins-name-td'>
                  <img src={coin.titleLogo} alt='' />
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
                    <img src='/img/menu-table.svg' alt='' />
                  </div>
                  <div className='setting-table'>
                    <img src='/img/setting.svg' alt='' />
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
