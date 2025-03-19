import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import './App2.css'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Academy from './pages/Academy'
import Watchlist from './pages/Watchlist'
import Trading from './pages/Trading'
import HomeBlockchain from './pages/HomeBlockchain'
import Second from './pages/Second'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/Dashboard' replace />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Portfolio' element={<Portfolio />} />
        <Route path='/Watchlist' element={<Watchlist />} />
        <Route path='/Academy' element={<Academy />} />
        <Route path='/Trading' element={<Trading />} />
        <Route path='/Profile' element={<Second />} />
        <Route path='/Wallet' element={<HomeBlockchain />} />
      </Routes>
    </Router>
  )
}

export default App
