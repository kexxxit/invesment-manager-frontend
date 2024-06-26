import { IOrderRequest, IOrderResponse } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/sandbox/order'

export const placeSandboxOrder = (order: IOrderRequest): Promise<IOrderResponse> => {
    return apiInstance.post(`${BASE_URL}`, order )
}
