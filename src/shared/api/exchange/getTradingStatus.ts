import { apiInstance } from '../base'

const BASE_URL = 'invest/tradingStatus'

export const getTradingStatus = (): Promise<boolean> => {
    return apiInstance.get(`${BASE_URL}`)
}
