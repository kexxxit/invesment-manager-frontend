import React, { FC } from 'react'
import './faqPage.scss'
import { FAQ } from '../../../shared/consts'
import { FaqItem } from '../../../shared/ui/faqItem'

export const FaqPage: FC = () => {
    const faqItems = FAQ.map((elem, index) => (
        <FaqItem key={index} faqItem={elem} />
    ))

    return (
        <section className='faq'>
            <h2>Часто задаваемые вопросы</h2>
            <div className='faq__content'>{faqItems}</div>
        </section>
    )
}
