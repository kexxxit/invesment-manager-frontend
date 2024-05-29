import { apiInstance } from '../base'

const BASE_URL = 'invest/keyRate'

export const getKeyRate = (): Promise<number> => {
    return apiInstance.get(`${BASE_URL}`)
}