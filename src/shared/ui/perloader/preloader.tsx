import React from 'react'
import PreloaderGif from '../../assets/icons/1496.gif'
import './preloader.scss'

export const Preloader = () => {
  return (
    <div className='preloader'>
        <img className='preloader__gif' src={PreloaderGif} alt='' />
    </div>
  )
}
