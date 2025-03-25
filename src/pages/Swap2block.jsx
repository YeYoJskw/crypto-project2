import React from 'react'
import './Swap2block.css'
import useBodyClass from '../hooks/useBodyClass'
import { Link } from 'react-router-dom'

const Swap2block = () => {
  useBodyClass()
  return (
    <div className='second-block-swap'>
      <div className='second-block-swapContent'>
        <div className='header-swap-2'>
          <button className='back-img'>
            <Link to={'/swap'}>
              <img src='/img/arrow-down-sign-to-navigate.svg' alt='' />
            </Link>
          </button>
          <h1 className='receive'>Receive</h1>
          <button className='scan-img'>
            <img src='/img/uil_capture.svg' alt='' />
          </button>
        </div>
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
  )
}

export default Swap2block
