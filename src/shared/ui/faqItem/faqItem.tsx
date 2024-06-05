import React, { FC, useState } from 'react'
import './faqItem.scss'
import Arrow from '../../assets/icons/arrow.svg'

interface IFaqItemProps {
    faqItem: { question: string; answer: string }
}

export const FaqItem: FC<IFaqItemProps> = ({ faqItem }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleAnswer = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='faq-item'>
            <div className='faq-item__question' onClick={toggleAnswer}>
                {faqItem.question}
                <img
                    src={Arrow}
                    alt={Arrow}
                    className={`faq-item__question-icon faq-item__question-icon${isOpen ? '--open' : '--close'}`}
                />
            </div>
            {isOpen && <div className='faq-item__answer'>{faqItem.answer}</div>}
        </div>
    )
}
