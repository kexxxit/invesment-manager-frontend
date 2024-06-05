import { IPortfolio } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/sandbox/portfolio/'

export const getSandboxPortfolio = (accountId: string): Promise<IPortfolio> => {
    return apiInstance.get(`${BASE_URL}${accountId}`)
}
