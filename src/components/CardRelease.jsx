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
  const videoRefs = useRef([]) // Ссылки на видео
  const [playingVideo, setPlayingVideo] = useState(null) // Текущее воспроизводимое видео
  const [isMobile, setIsMobile] = useState(false) // Для определения мобильного устройства

  useEffect(() => {
    setTimeout(() => setLoaded(true), 50)

    // Проверяем ширину экрана
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // Устанавливаем isMobile в true, если ширина экрана <= 768px
    }

    handleResize() // Изначальная проверка
    window.addEventListener('resize', handleResize) // Слушаем изменения размера окна

    // Добавляем обработчик кликов на документ для паузы видео
    const handleDocumentClick = event => {
      // Если клик был не по видео или кнопке, ставим видео на паузу
      if (!event.target.closest('.video-wrapper') && !event.target.closest('.play-card-img')) {
        if (playingVideo !== null) {
          const video = videoRefs.current[playingVideo]
          if (video) {
            video.pause()
            setPlayingVideo(null) // Сбрасываем воспроизводимое видео
          }
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick) // Очистка обработчика
      window.removeEventListener('resize', handleResize) // Очистка обработчика изменения размера
    }
  }, [playingVideo]) // Срабатывает, когда изменяется текущее воспроизводимое видео

  // Функция Play/Pause
  const togglePlay = index => {
    const video = videoRefs.current[index]

    if (playingVideo === index) {
      video.pause()
      setPlayingVideo(null) // Останавливаем видео
    } else {
      video.play()
      setPlayingVideo(index) // Запоминаем текущее видео
    }
  }

  // Функция для обновления состояния слайдера при смене слайда
  const handleSlideChange = () => {
    if (playingVideo !== null) {
      const video = videoRefs.current[playingVideo]
      if (video) {
        video.pause() // Ставим видео на паузу при смене слайда
        setPlayingVideo(null) // Сбрасываем текущее воспроизводимое видео
      }
    }
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
        onSlideChange={handleSlideChange} // Слушаем смену слайда
      >
        {content.map((data, index) => (
          <SwiperSlide key={data.id} className={`card-release ${loaded ? 'loaded' : ''}`}>
            <div className='video-container'>
              {/* Обертка для видео + постер */}
              <div className='video-wrapper'>
                {/* Постер */}
                <img
                  src={data.image}
                  alt='Card Poster'
                  className={`video-poster ${playingVideo === index ? 'hidden' : ''} ${
                    isMobile ? 'mobile-hidden' : ''
                  }`}
                />

                {/* Видео */}
                <video
                  ref={el => (videoRefs.current[index] = el)}
                  className={`video-element ${isMobile ? 'mobile-hidden' : ''}`}
                  src={data.video}
                  onPause={() => setPlayingVideo(null)}
                  controls={false} // Без стандартных контролов
                  playsInline // Для предотвращения полноэкранного режима на мобильных устройствах
                />
              </div>

              {/* Кнопка Play/Pause */}
              <button
                className={playingVideo === index ? 'play-card-img' : 'pause-card-img'}
                onClick={e => {
                  e.stopPropagation() // Предотвращаем всплытие клика, чтобы не ставить на паузу при клике на кнопку
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
