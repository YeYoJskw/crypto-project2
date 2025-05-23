import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode } from 'swiper/modules'
import './CardsCarousel.css'

const CardsCarousel = ({ coins }) => {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={14}
      freeMode={true}
      modules={[FreeMode]}
      className='cards-carouse'
    >
      {coins.map((coin, index) => (
        <SwiperSlide key={index} className='topCoin-card'>
          <img className='graph-topCard' src='/img/graph.svg' alt='' />
          <div className='topCoin-content'>
            <div className='images-topCard'>
              <img className='img-top-card' src={coin.logo} alt='' />
              <button>
                <img className='maximize' src='/img/maximizeDef.svg' alt='' />
              </button>
            </div>
            <div className='name-top-card'>{coin.title}</div>
            <div className='price-top-card'>{coin.price}</div>
            <div className='changes'>
              <div className={`${parseFloat(coin.precent) >= 0 ? 'percent-green' : 'percent-red'}`}>
                {coin.precent}
              </div>
              <div className='time-top-card'>{coin.time}</div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CardsCarousel
