import { DEFAULT_DROPDOWN_VALUE } from "../consts";
import { IOption } from "../types";

export const RATING_OPTIONS: IOption[] = [
    { value: DEFAULT_DROPDOWN_VALUE, label: 'Рейтинг' },
    { value: '1', label: 'Высокий' },
    { value: '2', label: 'Средний' },
    { value: '3', label: 'Низкий' },
]