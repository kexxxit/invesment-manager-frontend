import { IBond } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/bonds'

export const getBonds = (
    search?: string,
    riskLevel?: number,
    sector?: string,
    sortBy?: string
): Promise<IBond[]> => {
    const params = {
        search,
        riskLevel,
        sector,
        sortBy
    }
    console.log(params)
    return apiInstance.get(`${BASE_URL}`, { params })
}
