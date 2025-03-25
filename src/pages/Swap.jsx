import React from 'react'
import './Swap.css'
import Menu from '../components/Menu'
import Header from '../components/Header'
import MenuBottom from '../components/MenuButtom'
import useBodyClass from '../hooks/useBodyClass'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Swap2block from './Swap2block'
import { Link } from 'react-router-dom'

const Swap = () => {
  useBodyClass()

  const isMobile = window.innerWidth <= 768

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true)
  const swipeRef = useRef(null)

  const handleTouchStart = e => {
    const touchY = e.touches[0].clientY
    const swipeContainer = e.currentTarget.getBoundingClientRect()

    if (touchY - swipeContainer.top <= 80) {
      swipeRef.current = touchY
    } else {
      swipeRef.current = null // Блокируем свайп
    }
  }

  const handleTouchEnd = e => {
    if (!swipeRef.current) return

    const touchEndY = e.changedTouches[0].clientY
    const swipeDistance = touchEndY - swipeRef.current

    if (swipeDistance > 50) {
      setIsKeyboardVisible(prev => !prev) // Меняем блок только при свайпе вниз
    }
  }

  return (
    <div className='SWAP'>
      <div className='header-swap'>
        <Header title={'Swap'} />
      </div>
      <Menu />
      <MenuBottom />
      <div className='swap-content'>
        <div className='first-block-swap'>
          <button className='retry-img'>
            <img src='/img/material-symbols_refresh-rounded.svg' alt='' />
          </button>
          <div className='sell-buy'>
            <div className='you-sell'>
              <div className='you-sell-content'>
                <div className='content-sell-buy'>
                  <div className='title-you-sell'>You sell</div>
                  <div className='coin-swap'>
                    <img src='/img/ETH.svg' alt='' />
                    <div className='name-coin-sell'>ETH</div>
                    <button className='down-swap'>
                      <img src='/img/material-symbols_keyboard-arrow-down-rounded.svg' alt='' />
                    </button>
                  </div>
                  <div className='underName-coin-sell'>Ethereum</div>
                </div>
                <div className='second-block-youSell'>
                  <div className='balance-you-sell'>
                    Balance: 0.382 <span>MAX</span>
                  </div>
                  <div className='count-you-sell'>0</div>
                  <div className='price-you-sell'>
                    1 688.23 <span>USDT</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='you-buy'>
              <div className='you-sell-content'>
                <div className='content-sell-buy'>
                  <div className='title-you-sell'>You buy</div>
                  <div className='coin-swap'>
                    <img src='/img/BTC.svg' alt='' />
                    <div className='name-coin-sell'>BTC</div>
                    <button className='down-swap'>
                      <img src='/img/material-symbols_keyboard-arrow-down-rounded.svg' alt='' />
                    </button>
                  </div>
                  <div className='underName-coin-sell'>Bitcoin</div>
                </div>
                <div className='second-block-youSell'>
                  <div className='balance-you-sell'>
                    Balance: 0 <span>MAX</span>
                  </div>
                  <div className='count-you-sell'>0</div>
                  <div className='price-you-sell'>
                    98 688.23 <span>USDT</span>
                  </div>
                </div>
              </div>
            </div>
            <button className='swap-button'>
              <span>SWAP</span> ETH <span>TO</span> BTC
            </button>
          </div>
          <div className='your-coins-container'>
            {isMobile ? (
              <div
                className='swipe-container'
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode='wait'>
                  {isKeyboardVisible ? (
                    <motion.div
                      key='keyboard'
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: '100%', opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className='your-coins-address'
                    >
                      <div className='numpad'>
                        {[
                          ['1', '2', '3'],
                          ['4', '5', '6'],
                          ['7', '8', '9'],
                          ['.', '0', '⌫'],
                        ].map((row, rowIndex) => (
                          <div key={rowIndex} className='row-pad'>
                            {row.map(key => (
                              <button key={key} className='key'>
                                {key}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key='addresses'
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: '100%', opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className='your-coins-address'
                    >
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className='coin-address-block'>
                          <div className='coin-address-data'>
                            <div className='your-coin-address'>Your Ethereum address</div>
                            <div className='address-coin'>0xF09242467c484</div>
                            <div className='coin-balance-swap'>
                              <img className='logo-coin-address' src='/img/ETHmini.svg' alt='' />
                              <div className='balance-coin-address'>
                                Balance: <span>0.939 ETH</span>
                              </div>
                            </div>
                          </div>
                          <div className='coin-address-btns'>
                            <button className='qr-btn'>
                              <Link to='/swap-profile'>
                                <img className='copy-swap' src='/img/carbon_qr-code.svg' alt='' />
                              </Link>
                            </button>
                            <button className='copy-btn'>
                              <img className='copy-swap' src='/img/copy-swap.svg' alt='' />
                            </button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Для десктопа клавиатура не отображается
              <motion.div
                key='addresses'
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className='your-coins-address'
              >
                {[...Array(3)].map((_, index) => (
                  <div key={index} className='coin-address-block'>
                    <div className='coin-address-data'>
                      <div className='your-coin-address'>Your Ethereum address</div>
                      <div className='address-coin'>0xF09242467c484</div>
                      <div className='coin-balance-swap'>
                        <img className='logo-coin-address' src='/img/ETHmini.svg' alt='' />
                        <div className='balance-coin-address'>
                          Balance: <span>0.939 ETH</span>
                        </div>
                      </div>
                    </div>
                    <div className='coin-address-btns'>
                      <button className='qr-btn'>
                        <img className='copy-swap' src='/img/carbon_qr-code.svg' alt='' />
                      </button>
                      <button className='copy-btn'>
                        <img className='copy-swap' src='/img/copy-swap.svg' alt='' />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        <div className='block-swap2'>
          <Swap2block />
        </div>
      </div>
    </div>
  )
}

export default Swap
