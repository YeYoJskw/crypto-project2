import React from 'react'
import './Swap.css'
import Menu from '../components/Menu'
import Header from '../components/Header'
import MenuBottom from '../components/MenuButtom'
import useBodyClass from '../hooks/useBodyClass'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Swap2block from './Swap2block'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Swap = () => {
  useBodyClass()

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [prices, setPrices] = useState({ ETH: 0, BTC: 0 })
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true)
  const [isRotating, setIsRotating] = useState(false)
  const swipeRef = useRef(null)
  const [isSwapped, setIsSwapped] = useState(false)
  const [firstInput, setFirstInput] = useState('')
  const [secondInput, setSecondInput] = useState('')
  const [isFirstInput, setIsFirstInput] = useState(true)
  const [exchangeRate, setExchangeRate] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [activeInput, setActiveInput] = useState('first')

  useEffect(() => {
    if (prices.BTC && prices.ETH) {
      setExchangeRate(isSwapped ? prices.BTC / prices.ETH : prices.ETH / prices.BTC)
    }
  }, [prices, isSwapped])

  const handleCopy = () => {
    navigator.clipboard.writeText('0xF09242467c484')
    setIsFading(true)
    setTimeout(() => {
      setIsFading(false)
    }, 1500)
  }

  const handleKeyDown = event => {
    const key = event.key

    if ((key >= '0' && key <= '9') || key === '.') {
      handleKeyPress(key)
    }

    if (key === 'Backspace') {
      if (activeInput === 'first') {
        const newFirstInput = firstInput.slice(0, -1)
        setFirstInput(newFirstInput || '') // Если поле пустое, ставим пустую строку
        setSecondInput(newFirstInput ? (parseFloat(newFirstInput) * exchangeRate).toFixed(6) : '') // Если пусто, ставим пустую строку
      } else {
        const newSecondInput = secondInput.slice(0, -1)
        setSecondInput(newSecondInput || '') // Если поле пустое, ставим пустую строку
        setFirstInput(newSecondInput ? (parseFloat(newSecondInput) / exchangeRate).toFixed(6) : '') // Если пусто, ставим пустую строку
      }
    }
  }

  const handleBackspace = () => {
    if (activeInput === 'first') {
      const newValue = firstInput.slice(0, -1) // Удаляем последний символ
      setFirstInput(newValue)
      setSecondInput(newValue ? (parseFloat(newValue) * exchangeRate).toFixed(6) : '')
    } else {
      const newValue = secondInput.slice(0, -1)
      setSecondInput(newValue)
      setFirstInput(newValue ? (parseFloat(newValue) / exchangeRate).toFixed(6) : '')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [firstInput, secondInput, isFirstInput])

  const handleKeyPress = value => {
    if (value === '.' && (activeInput === 'first' ? firstInput : secondInput).includes('.')) return

    if (activeInput === 'first') {
      const newValue = firstInput + value
      setFirstInput(newValue)
      setSecondInput((parseFloat(newValue) * exchangeRate).toFixed(6) || '')
    } else if (activeInput === 'second') {
      const newValue = secondInput + value
      setSecondInput(newValue)
      setFirstInput((parseFloat(newValue) / exchangeRate).toFixed(6) || '') // Убрал лишнюю скобку
    }
  } // Закрываем handleKeyPress

  const handleClickCoin = input => {
    handleSetActiveInput(input)
  }

  const handleSetActiveInput = input => {
    if (input === 'first') {
      setSecondInput('')
    } else {
      setFirstInput('')
    }
    setActiveInput(input)
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const fetchPrices = useCallback(async () => {
    try {
      const response = await axios.get('https://api.coinlore.net/api/tickers/?id=80,90')
      const ethData = response.data.data.find(coin => coin.id === '80')
      const btcData = response.data.data.find(coin => coin.id === '90')

      if (ethData && btcData) {
        setPrices({
          ETH: parseFloat(ethData.price_usd) || 0,
          BTC: parseFloat(btcData.price_usd) || 0,
        })
      }
    } catch (error) {
      console.error('Ошибка при загрузке курса:', error)
      setPrices({ ETH: 0, BTC: 0 })
    }
  }, [])

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 60000)
    return () => clearInterval(interval)
  }, [fetchPrices])

  const handleTouchStart = e => {
    const touchY = e.touches[0].clientY
    const swipeContainer = e.currentTarget.getBoundingClientRect()

    swipeRef.current = touchY - swipeContainer.top <= 80 ? touchY : null
  }

  const handleTouchEnd = e => {
    if (!swipeRef.current) return
    if (e.changedTouches[0].clientY - swipeRef.current > 50) {
      setIsKeyboardVisible(prev => !prev)
    }
  }

  useEffect(() => {
    if (activeInput === 'first') {
      setFirstInput('')
    } else if (activeInput === 'second') {
      setSecondInput('')
    }
  }, [activeInput])

  const handleClick = async () => {
    setIsRotating(true)
    await fetchPrices()
    setFirstInput('')
    setSecondInput('')
    setActiveInput('first')
    setTimeout(() => setIsRotating(false), 500)
  }

  const handleSwap = () => {
    setIsSwapped(!isSwapped)
  }

  return (
    <div className='SWAP'>
      <div className='header-swap'>
        <Header title={'Swap'} />
      </div>
      <Menu />
      <div className='menu-bottom-swap'>
        <MenuBottom />
      </div>
      <div className='swap-content'>
        <div className='background-swap-first'>
          <div className='first-block-swap'>
            <div className='background-header-swap'>
              <div className='header-swap-main'>
                <div className='title-swap'>Swap</div>
                <button className='retry-img' onClick={handleClick}>
                  <img
                    src='/img/material-symbols_refresh-rounded.svg'
                    alt='refresh'
                    className={isRotating ? 'rotate' : ''}
                  />
                </button>
              </div>
            </div>

            <div className='sell-buy'>
              {isSwapped ? (
                <div className='you-buy bottom-margin2'>
                  <div className='you-sell-content'>
                    <div className='content-sell-buy'>
                      <div className='title-you-sell'>You sell</div>
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
                      <div
                        className={`count-you-sell ${activeInput === 'second' ? 'active' : ''}`}
                        onClick={() => handleClickCoin('second')}
                      >
                        {secondInput || '0'}
                      </div>
                      <div className='price-you-sell'>
                        {prices.BTC ? prices.BTC.toFixed(2) : '...'} <span>USDT</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='you-sell bottom-margin2'>
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
                      <div
                        className={`count-you-buy ${activeInput === 'first' ? 'active' : ''}`}
                        onClick={() => handleClickCoin('first')}
                      >
                        {firstInput || '0'}
                      </div>
                      <div className='price-you-sell'>
                        {prices.ETH ? prices.ETH.toFixed(2) : '...'} <span>USDT</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button className='change-swap' onClick={handleSwap}>
                <img className='down-swap' src='/img/down-arrow-svgrepo-com.svg' alt='' />
              </button>

              {isSwapped ? (
                <div className='you-sell bottom-margin'>
                  <div className='you-sell-content'>
                    <div className='content-sell-buy'>
                      <div className='title-you-sell'>You buy</div>
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
                      <div
                        className={`count-you-buy ${activeInput === 'first' ? 'active' : ''}`}
                        onClick={() => handleClickCoin('first')}
                      >
                        {firstInput || '0'}
                      </div>
                      <div className='price-you-sell'>
                        {prices.ETH ? prices.ETH.toFixed(2) : '...'} <span>USDT</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='you-buy bottom-margin'>
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
                      <div
                        className={`count-you-sell ${activeInput === 'second' ? 'active' : ''}`}
                        onClick={() => handleClickCoin('second')}
                      >
                        {secondInput || '0'}
                      </div>
                      <div className='price-you-sell'>
                        {prices.BTC ? prices.BTC.toFixed(2) : '...'} <span>USDT</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button className={`swap-button ${firstInput || secondInput ? 'active' : ''}`}>
                <span className='one-swap'>SWAP</span> <span className='two-swap'>ETH</span>{' '}
                <span className='one-swap'>TO</span> <span className='two-swap'>BTC</span>
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
                        className={!isKeyboardVisible ? 'your-coins-address' : 'numpad-container'}
                      >
                        <div className='numpad'>
                          {[
                            ['1', '2', '3'],
                            ['4', '5', '6'],
                            ['7', '8', '9'],
                            [
                              '.',
                              '0',
                              <div className='delete-btn' onClick={handleBackspace}>
                                <img src='/img/next-svgrepo-com.svg' alt='' />
                              </div>,
                            ],
                          ].map((row, rowIndex) => (
                            <div key={rowIndex} className='row-pad'>
                              {row.map((key, keyIndex) => (
                                <button
                                  key={keyIndex}
                                  className='key'
                                  onClick={() => typeof key === 'string' && handleKeyPress(key)}
                                >
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
                              <button className='copy-btn' onClick={handleCopy}>
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
        </div>
        <div className='block-swap2'>
          <Swap2block />
        </div>
      </div>
    </div>
  )
}

export default Swap
