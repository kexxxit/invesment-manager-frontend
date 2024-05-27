import { IStrategy } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest'

interface IStrategyList {
    automatedTasksList: IStrategy[]
}

export const getStrategies = (): Promise<IStrategyList> => {
    return apiInstance.get(`${BASE_URL}`)
}
