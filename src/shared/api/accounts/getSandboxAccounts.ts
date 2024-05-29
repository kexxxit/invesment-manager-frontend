import { IAccount } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/sandbox'

export const getSandboxAccounts = (): Promise<{ accounts: IAccount[] }> => {
    return apiInstance.get(`${BASE_URL}`)
}
