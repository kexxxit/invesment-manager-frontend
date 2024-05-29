import { IOption } from '../types'
import { DEFAULT_DROPDOWN_VALUE } from './dropdownDefaultValue'

export const STRATEGY_OPTIONS: IOption[] = [
    {
        value: DEFAULT_DROPDOWN_VALUE,
        label: 'Стратегия',
    },
    {
        value: '1',
        label: 'Лестница',
    },
    {
        value: '2',
        label: 'Штанга',
    },
]
