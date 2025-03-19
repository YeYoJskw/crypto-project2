import './Dashboard.css'
import Header from '../components/Header'
import TablePortfolio from '../components/TablePortfolio'
import './Portfolio.css'
import React from 'react'
import Menu from '../components/Menu'
import MenuButtom from '../components/MenuButtom'
import useBodyClass from '../hooks/useBodyClass'

const Portfolio = () => {
  const data = [
    {
      id: 1,
      name: 'Tether',
      symbol: 'Usdt',
      titleLogo: '/img/Tether.svg',
      price: '1.00',
      change24h: 2.34,
      balance: '3,56,000',
      avgBuy: 0.0,
      profitLoss: `+$${0.0}`,
    },
    {
      id: 2,
      name: 'Bitcoin',
      symbol: 'BTC',
      titleLogo: '/img/Frame 48100353.svg',
      price: '0.8802',
      change24h: 2.34,
      balance: '233',
      avgBuy: 0.0,
      profitLoss: `+$${0.0}`,
    },
    {
      id: 3,
      name: 'SushiSwap',
      symbol: 'Sushi',
      titleLogo: '/img/SushiSwap.svg',
      price: '0.8802',
      change24h: 2.34,
      balance: '10,45,688',
      avgBuy: 0.0,
      profitLoss: `+$${0.0}`,
    },
    {
      id: 4,
      name: 'Bitstamp',
      symbol: 'BIT',
      titleLogo: '/img/Bitstamp.svg',
      price: '0.8802',
      change24h: 2.34,
      balance: '10,45,688',
      avgBuy: 0.0,
      profitLoss: `+$${0.0}`,
    },
    {
      id: 5,
      name: 'Gemini',
      symbol: 'Gusd',
      titleLogo: '/img/Gemini.svg',
      price: '0.8802',
      change24h: 2.34,
      balance: '10,45,688',
      avgBuy: 0.0,
      profitLoss: `+$${0.0}`,
    },
    {
      id: 6,
      name: 'Medibloc',
      symbol: 'MED',
      titleLogo: '/img/Medibloc.svg',
      price: '0.8802',
      change24h: 2.34,
      balance: '10,45,688',
      avgBuy: 0.0,
      profitLoss: `+$${0.0}`,
    },
    {
      id: 7,
      name: 'Kucoin',
      symbol: 'KU',
      titleLogo: '/img/Kucoin.svg',
      price: '0.8802',
      change24h: 2.34,
      balance: '10,45,688',
      avgBuy: 0.0,
      profitLoss: `+$${0.0}`,
    },
  ]

  useBodyClass()

  return (
    <div>
      <MenuButtom />
      <Menu />
      <Header title={'Portfolio'}></Header>
      <div className='portfolio-content'>
        <div className='myCoins-block'>
          <div className='current-balance-block'>
            <div className='current-balance-text'>
              <i>Current balance</i>
            </div>
            <div className='current-balance'>$2,77,308.00</div>
            <div className='current-balance-profitBlock'>
              <div className='current-balance-profit'>-$1200.78 (-1.89%)</div>
              <div className='current-balance-time'>24H</div>
            </div>
          </div>

          <div className='buttons-coins'>
            <button className='button-edit'>
              <img src='/img/edit-2.svg' alt='' className='button-edit-icon' />
              <div className='button-edit-text'>Edit</div>
            </button>
            <button className='button-new-transaction'>
              <img src='/img/add-watchlist.svg' alt='' className='button-watchlist-icon' />
              <div className='button-transactions-text'>Add transaction</div>
            </button>
          </div>
        </div>
        <div className='quality-block'>
          <div>
            <div className='title-quality'>
              <i>All time profit</i>
            </div>
            <div className='quality-good'>2.52% (+$324.82)</div>
          </div>
          <div className='quality-coin'>
            <img src='/img/Tether.svg' alt='' />
            <div className='alone-quality'>
              <div className='title-quality'>
                <i>Best performer</i>
              </div>
              <div className='quality-good'>10.52% (+$627.82)</div>
            </div>
          </div>
          <div className='quality-coin'>
            <img src='/img/SushiSwap.svg' alt='' />
            <div className='alone-quality'>
              <div className='title-quality'>
                <i>Worst performer</i>
              </div>

              <div className='quality-bad'>1.23% (-$87.32)</div>
            </div>
          </div>
        </div>
        <div className='statistics'>
          <div className='chart-stat'>Chart</div>
          <div className='allocation-stat'>Allocation</div>
          <div className='statistics-stat'>Statistics</div>
        </div>
        <div className='coins-charts'>
          <div>
            <div className='Tether-chart'></div>
          </div>
          <div className='Sushi-charts'>
            <div className='Sushi-chart'></div>
            <div className='Sushi-chart'></div>
            <div className='Sushi-chart'></div>
            <div className='Sushi-chart'></div>
            <div className='Sushi-chart'></div>
          </div>
          <div className='Bitcoin-charts'>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
            <div className='Bitcoin-chart'></div>
          </div>
        </div>
        <div className='coins-chart-precent'>
          <div className='coin-chart-precent1'>
            <div className='circle-coin-chart1'></div>
            <div className='coin-name-precent'>Tether</div>
            <div className='coin-precent'>35.02%</div>
          </div>
          <div className='coin-chart-precent2'>
            <div className='circle-coin-chart2'></div>
            <div className='coin-name-precent'>Tether</div>
            <div className='coin-precent'>35.02%</div>
          </div>
          <div className='coin-chart-precent3'>
            <div className='circle-coin-chart3'></div>
            <div className='coin-name-precent'>Tether</div>
            <div className='coin-precent'>35.02%</div>
          </div>
        </div>
        <h1 className='your-holdings'>Your holdings</h1>
        <TablePortfolio data={data} />
      </div>
    </div>
  )
}

export default Portfolio
