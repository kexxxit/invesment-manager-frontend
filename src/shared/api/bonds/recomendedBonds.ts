import { IBond } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/bonds'

export const getBonds = (): Promise<IBond[]> => {
    return apiInstance.get(`${BASE_URL}`)
}
