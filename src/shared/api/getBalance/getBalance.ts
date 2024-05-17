import { AccountBalance, IBond } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/accounts/'

export const getBalance = (accountId: string): Promise<AccountBalance> => {
    return apiInstance.get(`${BASE_URL}${accountId}/balance`)
}
