import { IBond } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/bonds/'

export const getBondById = (bondId: string): Promise<IBond> => {
    return apiInstance.get(`${BASE_URL}${bondId}`)
}
