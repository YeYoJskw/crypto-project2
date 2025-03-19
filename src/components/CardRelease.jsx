import React, { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import './CardsCarousel.css'
import './CardRelease.css'

const CardRelease = ({ content }) => {
  const [loaded, setLoaded] = useState(false)
  const swiperRef = useRef(null)
  const videoRefs = useRef([])
  const [playingVideo, setPlayingVideo] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showControls, setShowControls] = useState(
    Object.fromEntries(content.map((_, index) => [index, true]))
  )

  useEffect(() => {
    setTimeout(() => setLoaded(true), 50)

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const handleDocumentClick = event => {
      if (!event.target.closest('.video-wrapper') && !event.target.closest('.play-card-img')) {
        if (playingVideo !== null) {
          const video = videoRefs.current[playingVideo]
          if (video) {
            video.pause()
            setPlayingVideo(null)
            setShowControls(prev => ({ ...prev, [playingVideo]: true }))
          }
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
      window.removeEventListener('resize', handleResize)
    }
  }, [playingVideo])

  const togglePlay = index => {
    const video = videoRefs.current[index]

    if (playingVideo === index) {
      video.pause()
      setPlayingVideo(null)
      setShowControls(prev => ({ ...prev, [index]: true })) // Показываем кнопку при паузе
    } else {
      video.play()
      setPlayingVideo(index)
      setShowControls(prev => ({ ...prev, [index]: false })) // Скрываем кнопку при воспроизведении

      setTimeout(() => {
        if (videoRefs.current[index] && !videoRefs.current[index].paused) {
          setShowControls(prev => ({ ...prev, [index]: false })) // Продолжаем скрывать кнопку через 3 секунды
        }
      }, 3000)
    }
  }

  const handleShowControls = index => {
    setShowControls(prev => ({ ...prev, [index]: true }))
    setTimeout(() => {
      if (playingVideo === index && videoRefs.current[index] && !videoRefs.current[index].paused) {
        setShowControls(prev => ({ ...prev, [index]: false }))
      }
    }, 3000)
  }

  return (
    <div>
      <div className='title-release'>
        <h1 className='title-cards-release'>Latest release</h1>
      </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={'auto'}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className='cards-carousel4'
        onSlideChange={() => setPlayingVideo(null)}
      >
        {content.map((data, index) => (
          <SwiperSlide key={data.id} className={`card-release ${loaded ? 'loaded' : ''}`}>
            <div
              className='video-container'
              onMouseMove={() => handleShowControls(index)}
              onClick={() => handleShowControls(index)}
            >
              <div className='video-wrapper'>
                <img
                  src={data.image}
                  alt='Card Poster'
                  className={`video-poster ${playingVideo === index ? 'hidden' : ''} ${
                    isMobile ? 'mobile-hidden' : ''
                  }`}
                />
                <video
                  ref={el => (videoRefs.current[index] = el)}
                  className={`video-element ${isMobile ? 'mobile-hidden' : ''}`}
                  src={data.video}
                  onPause={() => {
                    setPlayingVideo(null)
                    setShowControls(prev => ({ ...prev, [index]: true })) // Показываем кнопку при паузе
                  }}
                  playsInline
                />
              </div>

              {showControls[index] && (
                <button
                  className={playingVideo === index ? 'play-card-img' : 'pause-card-img'}
                  onClick={e => {
                    e.stopPropagation()
                    togglePlay(index)
                  }}
                >
                  <img
                    className={playingVideo === index ? 'play-img' : 'pause-img'}
                    src={
                      playingVideo === index ? '/img/pause-button-svgrepo-com.svg' : '/img/play.svg'
                    }
                    alt='Toggle Play'
                  />
                </button>
              )}
            </div>

            <div className='card-release-content'>
              <div className='title-card-release'>{data.title}</div>
              <div className='times-card-release'>
                <div className='date-card-release'>{data.date}</div>
                <div className='time-card-release'>{data.duration}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CardRelease
