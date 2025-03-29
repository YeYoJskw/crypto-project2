import React from 'react'
import './Swap.css'
import Menu from '../components/Menu'
import Header from '../components/Header'
import MenuBottom from '../components/MenuButtom'
import useBodyClass from '../hooks/useBodyClass'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Swap2block from './Swap2block'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Swap = () => {
  useBodyClass()

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
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
  const [coins, setCoins] = useState([])
  const [selectedCoins, setSelectedCoins] = useState([
    { id: null, name: '', symbol: '' },
    { id: null, name: '', symbol: '' },
  ])
  const [openDropdown1, setOpenDropdown1] = useState(false)
  const [openDropdown2, setOpenDropdown2] = useState(false)
  const [openDropdown3, setOpenDropdown3] = useState(false)
  const [openDropdown4, setOpenDropdown4] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  const dataCoin = [
    {
      yourCoinAddress: 'Your Solana address',
      addressWallet: '9uYdV3L4ZwTx9o2qzF2fJtnsKq5NkRtY3uwTfTSkD3eB',
      balance: '0.939 SOL',
    },
    {
      yourCoinAddress: 'Your Ethereum address',
      addressWallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      balance: '0.939 ETH',
    },
    {
      yourCoinAddress: 'Your Bitcoin address',
      addressWallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      balance: '0.939 BTC',
    },
    {
      yourCoinAddress: 'Your BNB address',
      addressWallet: '0x28C6c06298d514Db089934071355E5743bf21d60',
      balance: '0.939 BNB',
    },
    {
      yourCoinAddress: 'Your Tether address',
      addressWallet: 'TSmu9uGvRjTZgmVwK8qeqgFM3HKNKDmLAd',
      balance: '0.939 USDT',
    },
    {
      yourCoinAddress: 'Your Polygon address',
      addressWallet: '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819',
      balance: '0.939 MATIC',
    },
    {
      yourCoinAddress: 'Your Litecoin address',
      addressWallet: 'LcHKZ8u6v8XyR47e7tBEYcKsaRR3kmaWmV',
      balance: '0.939 LTC',
    },
    {
      yourCoinAddress: 'Your Dogecoin address',
      addressWallet: 'D9nWnZxC5fZ1dpUpNg2vZsPaMPkmkK42Xe',
      balance: '0.939 DOGE',
    },
    {
      yourCoinAddress: 'Your XRP Ledger address',
      addressWallet: 'rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh',
      balance: '0.939 XRP',
    },
    {
      yourCoinAddress: 'Your Avalanche address',
      addressWallet: '0x45fC6b9d8b47D5C7813F1E1F69c61e30Ff0FfF1e',
      balance: '0.939 AVAX',
    },
  ]

  const handleClickDropdown = dropdownId => {
    switch (dropdownId) {
      case 1:
        setOpenDropdown1(prev => !prev)
        break
      case 2:
        setOpenDropdown2(prev => !prev)
        break
      case 3:
        setOpenDropdown3(prev => !prev)
        break
      case 4:
        setOpenDropdown4(prev => !prev)
        break
      default:
        break
    }
  }

  const handleKeyPress = value => {
    if (value === '.' && (activeInput === 'first' ? firstInput : secondInput).includes('.')) return

    if (activeInput === 'first') {
      let newValue = firstInput + value

      if (newValue === '0') {
        newValue = '0.'
      }

      setFirstInput(newValue)
      setSecondInput((parseFloat(newValue) * exchangeRate).toFixed(6) || '')
    } else if (activeInput === 'second') {
      let newValue = secondInput + value

      if (newValue === '0') {
        newValue = '0.'
      }

      setSecondInput(newValue)
      setFirstInput((parseFloat(newValue) / exchangeRate).toFixed(6) || '')
    }
  }

  const handleClickOutside = event => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setOpenDropdown1(false)
      setOpenDropdown2(false)
      setOpenDropdown3(false)
      setOpenDropdown4(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText('0xF09242467c484')
    setIsFading(true)
    setTimeout(() => {
      setIsFading(false)
    }, 1500)
  }

  const fetchCoins = async () => {
    try {
      const response = await axios.get('https://api.coinlore.net/api/tickers/')
      const topCoins = response.data.data.slice(0, 10) // Берем 10 топовых монет

      const formattedCoins = topCoins.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: parseFloat(coin.price_usd).toFixed(2),
      }))

      setCoins(formattedCoins)

      if (!selectedCoins[0].id) {
        setSelectedCoins(prev => {
          const newSelectedCoins = [...prev]
          newSelectedCoins[0] = formattedCoins[0]
          return newSelectedCoins
        })
      }
      if (!selectedCoins[1].id) {
        setSelectedCoins(prev => {
          const newSelectedCoins = [...prev]
          newSelectedCoins[1] = formattedCoins[1]
          return newSelectedCoins
        })
      }
    } catch (error) {
      console.error('Ошибка загрузки монет:', error)
    }
  }

  const handleKeyDown = event => {
    const key = event.key

    if ((key >= '0' && key <= '9') || key === '.') {
      handleKeyPress(key)
    }

    if (key === 'Backspace') {
      if (activeInput === 'first') {
        const newFirstInput = firstInput.slice(0, -1)
        setFirstInput(newFirstInput || '')
        setSecondInput(newFirstInput ? (parseFloat(newFirstInput) * exchangeRate).toFixed(6) : '') // Если пусто, ставим пустую строку
      } else {
        const newSecondInput = secondInput.slice(0, -1)
        setSecondInput(newSecondInput || '')
        setFirstInput(newSecondInput ? (parseFloat(newSecondInput) / exchangeRate).toFixed(6) : '') // Если пусто, ставим пустую строку
      }
    }
  }

  const handleSelectCoin = (coin, index) => {
    const updatedSelectedCoins = [...selectedCoins]
    updatedSelectedCoins[index] = coin
    setSelectedCoins(updatedSelectedCoins)
  }

  const handleBackspace = () => {
    if (activeInput === 'first') {
      const newValue = firstInput.slice(0, -1)
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
    fetchCoins()
  }, [])

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
    await fetchCoins()
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
                      <div className='title-you-sell'>You buy1</div>
                      <div>
                        <div className='coin-swap'>
                          <img
                            src={`https://www.coinlore.com/img/${selectedCoins[0].name
                              .toLowerCase()
                              .replace(/ /g, '-')}.png`}
                            alt=''
                            className='coin-logo-swap'
                          />

                          <div className='name-coin-sell'>{selectedCoins[0]?.symbol || '...'}</div>
                          <button
                            className='down-swap'
                            onClick={e => {
                              e.stopPropagation()
                              handleClickDropdown(1)
                            }}
                            ref={buttonRef}
                          >
                            <img
                              src='/img/material-symbols_keyboard-arrow-down-rounded.svg'
                              alt=''
                            />
                          </button>

                          {openDropdown1 && (
                            <div ref={dropdownRef} className='dropdown'>
                              <div className='dropdown-list'>
                                {coins.map(coin => (
                                  <div
                                    key={coin.id}
                                    className='dropdown-item'
                                    onClick={() => handleSelectCoin(coin, 0)}
                                  >
                                    <img
                                      alt=''
                                      src={`https://www.coinlore.com/img/${coin.name
                                        .toLowerCase()
                                        .replace(/ /g, '-')}.png`}
                                    />
                                    <div className='name-coin-swap'>{coin.symbol}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='underName-coin-sell'>{selectedCoins[0]?.name}</div>
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
                        {selectedCoins[0]?.price ? selectedCoins[0].price : '...'} <span>USDT</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='you-sell bottom-margin2'>
                  <div className='you-sell-content'>
                    <div className='content-sell-buy'>
                      <div className='title-you-sell'>You sell2</div>

                      <div className='coin-swap'>
                        <img
                          src={`https://www.coinlore.com/img/${selectedCoins[1].name
                            .toLowerCase()
                            .replace(/ /g, '-')}.png`}
                          alt=''
                          className='coin-logo-swap'
                        />
                        <div className='name-coin-sell'>{selectedCoins[1]?.symbol || '...'}</div>
                        <button
                          className='down-swap'
                          onClick={e => {
                            e.stopPropagation()
                            handleClickDropdown(2)
                          }}
                          ref={buttonRef}
                        >
                          <img src='/img/material-symbols_keyboard-arrow-down-rounded.svg' alt='' />
                        </button>

                        {openDropdown2 && (
                          <div ref={dropdownRef} className='dropdown'>
                            <div className='dropdown-list'>
                              {coins.map(coin => (
                                <div
                                  key={coin.id}
                                  className='dropdown-item'
                                  onClick={() => handleSelectCoin(coin, 1)}
                                >
                                  <img
                                    alt=''
                                    src={`https://www.coinlore.com/img/${coin.name
                                      .toLowerCase()
                                      .replace(/ /g, '-')}.png`}
                                  />
                                  <div className='name-coin-swap'>{coin.symbol}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className='underName-coin-sell'>{selectedCoins[1]?.name}</div>
                    </div>

                    <div className='second-block-youSell'>
                      <div className='balance-you-sell'>
                        Balance: 0 <span>MAX</span>
                      </div>
                      <div
                        className={`count-you-sell ${activeInput === 'first' ? 'active' : ''}`}
                        onClick={() => handleClickCoin('first')}
                      >
                        {secondInput || '0'}
                      </div>
                      <div className='price-you-sell'>
                        {selectedCoins[1]?.price ? selectedCoins[1].price : '...'} <span>USDT</span>
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
                      <div className='title-you-sell'>You sell3</div>
                      <div>
                        <div className='coin-swap'>
                          <img
                            src={`https://www.coinlore.com/img/${selectedCoins[1].name
                              .toLowerCase()
                              .replace(/ /g, '-')}.png`}
                            alt=''
                            className='coin-logo-swap'
                          />

                          <div className='name-coin-sell'>{selectedCoins[1]?.symbol || '...'}</div>
                          <button
                            className='down-swap'
                            onClick={e => {
                              e.stopPropagation()
                              handleClickDropdown(3)
                            }}
                            ref={buttonRef}
                          >
                            <img
                              src='/img/material-symbols_keyboard-arrow-down-rounded.svg'
                              alt=''
                            />
                          </button>

                          {openDropdown3 && (
                            <div ref={dropdownRef} className='dropdown'>
                              <div className='dropdown-list'>
                                {coins.map(coin => (
                                  <div
                                    key={coin.id}
                                    className='dropdown-item'
                                    onClick={() => handleSelectCoin(coin, 1)}
                                  >
                                    <img
                                      alt=''
                                      src={`https://www.coinlore.com/img/${coin.name
                                        .toLowerCase()
                                        .replace(/ /g, '-')}.png`}
                                    />
                                    <div className='name-coin-swap'>{coin.symbol}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='underName-coin-sell'>{selectedCoins[1]?.name}</div>
                    </div>

                    <div className='second-block-youSell'>
                      <div className='balance-you-sell'>
                        Balance: 0 <span>MAX</span>
                      </div>
                      <div
                        className={`count-you-sell ${activeInput === 'first' ? 'active' : ''}`}
                        onClick={() => handleClickCoin('first')}
                      >
                        {secondInput || '0'}
                      </div>
                      <div className='price-you-sell'>
                        {selectedCoins[1]?.price ? selectedCoins[1].price : '...'} <span>USDT</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='you-buy bottom-margin'>
                  <div className='you-sell-content'>
                    <div className='content-sell-buy'>
                      <div className='title-you-sell'>You buy4</div>
                      <div>
                        <div className='coin-swap'>
                          <img
                            src={`https://www.coinlore.com/img/${selectedCoins[0].name
                              .toLowerCase()
                              .replace(/ /g, '-')}.png`}
                            alt=''
                            className='coin-logo-swap'
                          />

                          <div className='name-coin-sell'>{selectedCoins[0]?.symbol || '...'}</div>
                          <button
                            className='down-swap'
                            onClick={e => {
                              e.stopPropagation()
                              handleClickDropdown(4)
                            }}
                            ref={buttonRef}
                          >
                            <img
                              src='/img/material-symbols_keyboard-arrow-down-rounded.svg'
                              alt=''
                            />
                          </button>

                          {openDropdown4 && (
                            <div ref={dropdownRef} className='dropdown'>
                              <div className='dropdown-list'>
                                {coins.map(coin => (
                                  <div
                                    key={coin.id}
                                    className='dropdown-item'
                                    onClick={() => handleSelectCoin(coin, 0)}
                                  >
                                    <img
                                      alt=''
                                      src={`https://www.coinlore.com/img/${coin.name
                                        .toLowerCase()
                                        .replace(/ /g, '-')}.png`}
                                    />
                                    <div className='name-coin-swap'>{coin.symbol}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='underName-coin-sell'>{selectedCoins[0]?.name}</div>
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
                        {selectedCoins[0]?.price ? selectedCoins[0]?.price : '...'}{' '}
                        <span>USDT</span>
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
                        {dataCoin.map(coin => (
                          <div key={coin.index} className='coin-address-block'>
                            <div className='coin-address-data'>
                              <div className='your-coin-address'>{coin.yourCoinAddress}</div>
                              <div className='address-coin'>{coin.addressWallet}</div>
                              <div className='coin-balance-swap'>
                                <img className='logo-coin-address' src='/img/ETHmini.svg' alt='' />
                                <div className='balance-coin-address'>
                                  Balance: <span>{coin.balance}</span>
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
                <motion.div
                  key='addresses'
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className='your-coins-address'
                >
                  {dataCoin.map(coin => (
                    <div key={coin.index} className='coin-address-block'>
                      <div className='coin-address-data'>
                        <div className='your-coin-address'>{coin.yourCoinAddress}</div>
                        <div className='address-coin'>{coin.addressWallet}</div>
                        <div className='coin-balance-swap'>
                          <img className='logo-coin-address' src='/img/ETHmini.svg' alt='' />
                          <div className='balance-coin-address'>
                            Balance: <span>{coin.balance}</span>
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
