import React from 'react'
import './Swap.css'
import Menu from '../components/Menu'
import Header from '../components/Header'
import MenuBottom from '../components/MenuButtom'
import useBodyClass from '../hooks/useBodyClass'

const Swap = () => {
  useBodyClass()
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
          <div className='your-coins-address'>
            <div className='coin-address-block'>
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
            <div className='coin-address-block'>
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
            <div className='coin-address-block'>
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
          </div>
        </div>
        <div className='second-block-swap'>
          <button className='scan-img'>
            <img src='/img/uil_capture.svg' alt='' />
          </button>
          <img className='qr-code-swap' src='/img/QRcodeSwap.svg' alt='' />
          <div className='wallet-address-title'>Wallet address</div>
          <div className='wallet-address'>1LNXzm7G...5otzuZ5Ghu</div>
          <div className='btns-swap'>
            <button className='copy-address'>
              <img src='/img/copy-swap.svg' alt='' />
              Copy address
            </button>
            <button className='share-address'>
              <img src='/img/share-swap.svg' alt='' />
              Share address
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Swap
