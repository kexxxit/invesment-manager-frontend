import { IPortfolio } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/portfolio/'

export const getPortfolio = (accountId: string): Promise<IPortfolio> => {
    return apiInstance.get(`${BASE_URL}${accountId}`)
}
