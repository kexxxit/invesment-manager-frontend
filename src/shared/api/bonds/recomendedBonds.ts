import { IBond } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/bonds'

export const getBonds = (
    search?: string,
    riskLevel?: number,
    sector?: string
): Promise<IBond[]> => {
    const params = {
        search,
        riskLevel,
        sector,
    }
    console.log(params)
    return apiInstance.get(`${BASE_URL}`, { params })
}
