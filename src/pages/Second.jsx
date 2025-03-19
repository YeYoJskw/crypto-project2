import React from 'react'
import HeaderSecond from '../components/layout/HeaderSecond'
import Table2 from '../components/Table2'
import '../components/second.css'
import MenuBottom from '../components/MenuButtom'
import Menu from '../components/Menu'
import useBodyClass from '../hooks/useBodyClass'
import Footer from '../components/layout/Footer'

const Second = () => {
  const tableData = [
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'IN',
      message: 'TNw6v3yHUifFIkbW...',
    },
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'OUT',
      message: 'TNw6v3yHUifFIkbW...',
    },
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'IN',
      message: 'TNw6v3yHUifFIkbW...',
    },
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'IN',
      message: 'TNw6v3yHUifFIkbW...',
    },
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'IN',
      message: 'TNw6v3yHUifFIkbW...',
    },
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'OUT',
      message: 'TNw6v3yHUifFIkbW...',
    },
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'IN',
      message: 'TNw6v3yHUifFIkbW...',
    },
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'IN',
      message: 'TNw6v3yHUifFIkbW...',
    },
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'IN',
      message: 'TNw6v3yHUifFIkbW...',
    },
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'IN',
      message: 'TNw6v3yHUifFIkbW...',
    },
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'IN',
      message: 'TNw6v3yHUifFIkbW...',
    },
    {
      timeAgo: '3 hrs ago',
      from: 'EQCn7gbyTKrQl3XE6U4cngG9...',
      to: 'EQCudP0_Xu7qi-aCUTCNsjXHv...',
      ton: 25,
      status: 'IN',
      message: 'TNw6v3yHUifFIkbW...',
    },
  ]
  useBodyClass()
  return (
    <div className='BLOCKCHAIN'>
      <HeaderSecond />
      <div className='container'>
        <div>
          <Menu />
          <MenuBottom />

          <div>
            <div className='QR-block'>
              <img className='qr-code' src='/img/QR.svg' alt='' />
              <div className='qr-content'>
                <div className='qr-address qr-data'>
                  <span className='qr-label'>Address</span>
                  <span className='qr-value'>EQCuCUTCNsq2Wcmbg2oN-Jg</span>
                </div>
                <div className='qr-balance qr-data'>
                  <span className='qr-label'>Balance</span>
                  <span className='qr-value'>
                    1,456.97307686 TON <span className='qr-subvalue'>(≈ $4,132.31)</span>
                  </span>
                </div>
                <div className='qr-lastActive qr-data'>
                  <span className='qr-label'>Last activity</span>
                  <span className='qr-value'>3 hrs ago</span>
                </div>
                <div className='qr-workId qr-data'>
                  <span className='qr-label'>Workchain ID</span>
                  <span className='qr-value'>0</span>
                </div>
                <div className='qr-BlockId qr-data'>
                  <span className='qr-label'>Blockchain ID</span>
                  <span className='qr-value'>mainnet</span>
                </div>
                <div className='qr-Raw qr-data'>
                  <span className='qr-label'>Raw</span>
                  <span className='qr-value'>
                    0:AE74FD3F5EEEEA8BE68251308DB235C7BE2F0F34D2F79467EAD967266E0DA837
                  </span>
                </div>
              </div>
            </div>
            <h1 className='recent-history'>Recent history</h1>
          </div>
        </div>
        <Table2 data={tableData} />
      </div>
      <Footer />
    </div>
  )
}

export default Second
