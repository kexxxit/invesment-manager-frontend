import { IBondEvent } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/bonds/'

export const getBondEvents = (bondId: string): Promise<IBondEvent[]> => {
    return apiInstance.get(`${BASE_URL}${bondId}/events`)
}
