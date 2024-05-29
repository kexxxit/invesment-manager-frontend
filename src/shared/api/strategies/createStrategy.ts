import { IStrategy, IStrategyRequest } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest'

export const createStrategy = (strategy: IStrategyRequest): Promise<IStrategy> => {
    return apiInstance.post(`${BASE_URL}`, strategy)
}
