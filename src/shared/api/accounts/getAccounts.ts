import { IAccount } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/accounts'

export const getAccounts = (): Promise<{ accounts: IAccount[] }> => {
    return apiInstance.get(`${BASE_URL}`)
}
