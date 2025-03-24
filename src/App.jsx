import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import './App2.css'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Academy from './pages/Academy'
import Watchlist from './pages/Watchlist'
import HomeBlockchain from './pages/HomeBlockchain'
import Second from './pages/Second'
import Swap from './pages/Swap'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/board' replace />} />
        <Route path='/board' element={<Dashboard />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/watch' element={<Watchlist />} />
        <Route path='/academy' element={<Academy />} />
        <Route path='/swap' element={<Swap />} />
        <Route path='/wallet' element={<Second />} />
        <Route path='/blockchain' element={<HomeBlockchain />} />
      </Routes>
    </Router>
  )
}

export default App
