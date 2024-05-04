import React, { useState, useEffect, useRef } from 'react'
import './slider.scss'
import { IconButton } from '../iconButton'
import Arrow from '../../assets/icons/arrow.svg'

type Props = {
    children: React.ReactNode[]
    contentIsLoading: boolean
}

const SLIDER_INTERVAL = 10000

export const Slider: React.FC<Props> = ({ children, contentIsLoading }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const sliderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % children.length)
        }, SLIDER_INTERVAL)

        return () => {
            clearInterval(interval)
        }
    }, [children.length])

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`
        }
    }, [currentSlide])

    const handlePrevClick = () => {
        setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + children.length) % children.length
        )
    }

    const handleNextClick = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % children.length)
    }

    const sliderContent = children.map((child, index) => (
        <div className='slider__slide' key={index}>
            {child}
        </div>
    ))

    return (
        <div className='slider'>
            <div
                className='slider__arrow slider__arrow--left'
                onClick={handlePrevClick}>
                <IconButton svg={Arrow} />
            </div>
            <div className='slider__wrapper' ref={sliderRef}>
                {contentIsLoading ? 'Загрузка...' : sliderContent}
            </div>
            <div
                className='slider__arrow slider__arrow--right'
                onClick={handleNextClick}>
                <IconButton svg={Arrow} />
            </div>
            <div className='slider__dots'>
                {children.map((_, index) => (
                    <div
                        key={index}
                        className={`slider__dot ${index === currentSlide ? 'slider__dot--active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}
