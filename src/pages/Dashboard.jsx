import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Dashboard.css'
import Header from '../components/Header'
import CardsCarousel from '../components/CardsCarousel'
import Menu from '../components/Menu'
import MenuButtom from '../components/MenuButtom'
import axios from 'axios'
import useBodyClass from '../hooks/useBodyClass'

const Dashboard = () => {
  const [isExpanded1, setIsExpanded1] = useState(false)
  const [isExpanded2, setIsExpanded2] = useState(false)
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPrice, setShowPrice] = useState(false) // Состояние для переключения между процентом и ценой

  const fetchCoins = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get('https://api.coinlore.net/api/tickers/')
      setCoins(response.data.data)
    } catch (err) {
      setError('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoins()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPrice(prevState => !prevState) // Меняем состояние каждые 6 секунд
    }, 6000) // 6000 миллисекунд = 6 секунд

    return () => clearInterval(interval) // Очищаем интервал при размонтировании компонента
  }, [])

  useBodyClass()

  return (
    <div className='Dashboard-main'>
      <MenuButtom />
      <Menu />
      <Header title={'Dashboard'} />
      <div id='top'></div>
      <div className='prices-block'>
        <h3 className='title-prices'>
          <i>Today's prices by marketcap</i>
        </h3>
        <div className='prices'>
          <div className='cards-prices'>
            {/* Trending */}
            <motion.div
              className={isExpanded1 ? 'card-prices-opened' : 'card-prices-closed'}
              animate={{ height: isExpanded1 ? 'auto' : 150 }}
              transition={{ duration: 0.4 }}
            >
              <div className='top-card-prices'>
                <h2 className='trending-title'>🔥 Trending</h2>
                <button className='seeAll-prices' onClick={() => setIsExpanded1(!isExpanded1)}>
                  {isExpanded1 ? 'Show less' : 'See all'}
                </button>
              </div>
              {error && <p className='error-text'>{error}</p>}

              <AnimatePresence>
                {coins.slice(0, isExpanded1 ? 10 : 3).map((coin, index) => (
                  <motion.div
                    className='coin-trending'
                    key={coin.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className='coin-content'>
                      <div className='index-coin'>{index + 1}</div>
                      <img
                        src={`https://www.coinlore.com/img/${coin.nameid}.png`}
                        alt={coin.name}
                        className='img-coin'
                      />
                      <div className='name-coin-prices'>{coin.name}</div>
                      <div className='subname-coin-prices'>{coin.symbol}</div>
                    </div>
                    <motion.div
                      className={`percent ${
                        showPrice
                          ? coin.percent_change_24h >= 0
                            ? 'text-green'
                            : 'text-red'
                          : 'text-blue'
                      }`}
                      key={showPrice ? coin.percent_change_24h : coin.price_usd} // Ключ для анимации
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {showPrice ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {`${coin.percent_change_24h}%`}
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {`$ ${Number(coin.price_usd).toLocaleString('en-US')}`}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Recently Added */}
            <motion.div
              className={isExpanded2 ? 'card-prices-opened' : 'card-prices-closed'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className='top-card-prices'>
                <h2 className='trending-title'>⌛ Recently added</h2>
                <button className='seeAll-prices' onClick={() => setIsExpanded2(!isExpanded2)}>
                  {isExpanded2 ? 'Show less' : 'See all'}
                </button>
              </div>
              {error && <p className='error-text'>{error}</p>}

              <AnimatePresence>
                {coins.slice(0, isExpanded2 ? 10 : 3).map((coin, index) => (
                  <motion.div
                    className='coin-trending'
                    key={coin.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className='coin-content'>
                      <div className='index-coin'>{index + 1}</div>
                      <img
                        src={`https://www.coinlore.com/img/${coin.nameid}.png`}
                        alt={coin.name}
                        className='img-coin'
                      />
                      <div className='name-coin-prices'>{coin.name}</div>
                      <div className='subname-coin-prices'>{coin.symbol}</div>
                    </div>
                    <motion.div
                      className={`percent ${
                        showPrice
                          ? coin.percent_change_24h >= 0
                            ? 'text-green'
                            : 'text-red'
                          : 'text-blue'
                      }`}
                      key={showPrice ? coin.percent_change_24h : coin.price_usd} // Ключ для анимации
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {showPrice ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {`${coin.percent_change_24h}%`}
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {`$ ${Number(coin.price_usd).toLocaleString('en-US')}`}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
        <h1 className='title-top-cards'>Top coins</h1>
      </div>
      <div
        className={
          isExpanded1 && isExpanded2
            ? 'cards-carousel3'
            : isExpanded1 || isExpanded2
            ? 'cards-carousel2'
            : 'cards-carousel1'
        }
      >
        <CardsCarousel
          coins={[
            {
              logo: '/img/CompoundBadge.svg',
              title: 'Compound',
              price: '$27,308.00',
              precent: '+8250%',
              time: 'All time',
            },
            {
              logo: '/img/Shibainu.svg',
              title: 'Bitcoin',
              price: '$0.0008827',
              precent: '+660910%',
              time: 'All time',
            },
            {
              logo: '/img/Thetafuel.svg',
              title: 'Ethereum',
              price: '$0.04276',
              precent: '-151%',
              time: 'All time',
            },
            {
              logo: '/img/CompoundBadge.svg',
              title: 'Cardano',
              price: '$2.30',
              precent: '+180%',
              time: '3 months',
            },
            {
              logo: '/img/CompoundBadge.svg',
              title: 'Polkadot',
              price: '$35.00',
              precent: '+90%',
              time: '1 month',
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Dashboard
