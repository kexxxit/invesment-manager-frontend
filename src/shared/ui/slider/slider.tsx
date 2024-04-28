import React, { useState, useEffect, useRef } from 'react'
import './slider.scss'

type Props = {
    children: React.ReactNode[]
}

const SLIDER_INTERVAL = 10000

export const Slider: React.FC<Props> = ({ children }) => {
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

    return (
        <div className='slider'>
            <div
                className='slider__arrow slider__arrow--left'
                onClick={handlePrevClick}>
                &lt;
            </div>
            <div className='slider__wrapper' ref={sliderRef}>
                {children.map((child, index) => (
                    <div className='slider__slide' key={index}>
                        {child}
                    </div>
                ))}
            </div>
            <div
                className='slider__arrow slider__arrow--right'
                onClick={handleNextClick}>
                &gt;
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
