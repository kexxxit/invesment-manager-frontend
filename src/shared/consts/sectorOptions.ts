import { IOption } from '../types'
import { DEFAULT_DROPDOWN_VALUE } from './dropdownDefaultValue'

export const SECTOR_OPTIONS: IOption[] = [
    { 
        value: DEFAULT_DROPDOWN_VALUE, 
        label: 'Отрасль' },
    {
        value: 'government',
        label: 'Государственные бумаги',
    },
    {
        value: 'health_care',
        label: 'Здравоохранение',
    },
    {
        value: 'consumer',
        label: 'Потребительские товары',
    },
    {
        value: 'it',
        label: 'Информационные технологии',
    },
    {
        value: 'industrials',
        label: 'Машиностроение и транспорт',
    },
    {
        value: 'energy',
        label: 'Энергетика',
    },
    {
        value: 'utilities',
        label: 'Электроэнергетика',
    },
    {
        value: 'financial',
        label: 'Финансовый сектор',
    },
    {
        value: 'telecom',
        label: 'Телекоммуникации',
    },
    {
        value: 'real_estate',
        label: 'Недвижимость',
    },
    {
        value: 'materials',
        label: 'Сырьевая промышленность',
    },
    {
        value: 'municipal',
        label: 'Регионы',
    },
    {
        value: 'other',
        label: 'Другое',
    },
]
