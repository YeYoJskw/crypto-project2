import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import './Academy.css'
import CardRelease from '../components/CardRelease'
import Menu from '../components/Menu'
import MenuButtom from '../components/MenuButtom'
import useBodyClass from '../hooks/useBodyClass'

const Academy = () => {
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const cardsData = [
    {
      image: '/img/card-release.svg',
      level: 'Beginner',
      title: 'How you can transfer your fund balance?',
      date: 'Sep 2, 2022',
      duration: '10m',
      id: 1,
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      image: '/img/card-release2.svg',
      level: 'Beginner',
      title: 'What are other functions of crypto currencies?',
      date: 'Sep 2, 2022',
      duration: '15m',
      id: 2,
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      image: '/img/card-release3.svg',
      level: 'Advance',
      title: 'What are NFT games and how do they work?',
      date: 'Sep 2, 2022',
      duration: '5m',
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      id: 3,
    },
    {
      image: '/img/card-release4.svg',
      level: 'Advance',
      title: 'What is QuickSwap and how does it work?',
      date: 'Sep 2, 2022',
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: '5m',
      id: 4, // исправлен повторяющийся id
    },
    {
      image: '/img/card-release.svg',
      level: 'Beginner',
      title: 'How you can transfer your fund balance?',
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      date: 'Sep 2, 2022',
      duration: '10m',
      id: 5,
    },
    {
      image: '/img/card-release2.svg',
      level: 'Beginner',
      title: 'What are other functions of crypto currencies?',
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      date: 'Sep 2, 2022',
      duration: '15m',
      id: 6,
    },
    {
      image: '/img/card-release3.svg',
      level: 'Advance',
      title: 'What are NFT games and how do they work?',
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      date: 'Sep 2, 2022',
      duration: '5m',
      id: 7,
    },
    {
      image: '/img/card-release4.svg',
      level: 'Advance',
      title: 'What is QuickSwap and how does it work?',
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      date: 'Sep 2, 2022',
      duration: '5m',
      id: 8,
    },
  ]

  useEffect(() => {
    let timer
    if (isPlaying) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      setTime(0)
    }
    return () => clearInterval(timer)
  }, [isPlaying])

  const formatTime = seconds => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const secs = String(seconds % 60).padStart(2, '0')
    return `${hours}:${minutes}:${secs}`
  }

  const togglePlay = () => {
    setIsPlaying(prev => !prev)
  }

  useBodyClass()

  return (
    <div className='academy'>
      <MenuButtom />
      <Menu />
      <Header title={'Academy'} />
      <CardRelease content={cardsData} />
      <div className='content-academy'>
        <div className='live-Now'>
          <h1 className='title-cards-release'>Live Now</h1>
          <div className='laptop'>
            <img className='laptop-img' src='/img/laptop.svg' alt='' />
            <div className='audio-content'>
              <div className='top-audio'>
                <div className='you'>
                  <div className='avatar-audio'>K</div>
                  <span className='you-text'>You</span>
                </div>
                <div className='recording-content'>
                  <button className='recording'>
                    <div className='recording-center'></div>
                  </button>
                  <div className='recording-text'>Recording...</div>
                </div>
              </div>
              <div className='audio-track'>
                <div className='audio'>
                  <img className='audio-sound1' src='/img/audio1.svg' alt='' />
                  <img className='audio-sound' src='/img/audio2.svg' alt='' />
                  <img className='audio-sound' src='/img/audio2.svg' alt='' />
                  <img className='audio-sound' src='/img/audio2.svg' alt='' />
                  <span className='time-audio'>{formatTime(time)}</span>
                </div>
                <button className='play' onClick={togglePlay}>
                  <img
                    src={isPlaying ? '/img/pause_button.svg' : '/img/play-button-rounded.svg'}
                    alt='Play/Pause'
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='premium-block'>
          <img className='lines-img' src='/img/Looper-2.svg' alt='' />
          <img className='energy-img' src='/img/Energy.svg' alt='' />
          <p className='text-premium'>
            Individuals can make informed decisions, mitigate risks, and unlock opportunities in the
            rapidly evolving landscape of cryptocurrencies and decentralized finance.
          </p>
          <div className='get-premium'>
            <button className='get-premium-btn'>Get premium</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Academy
