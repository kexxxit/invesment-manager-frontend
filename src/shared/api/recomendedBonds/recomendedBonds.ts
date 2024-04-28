import { IBond } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'bonds/recomended'

export const getRecomendedBonds = (): Promise<IBond[]> => {
    return apiInstance.get(`${BASE_URL}`)
}
