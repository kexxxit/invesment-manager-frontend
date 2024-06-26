import { IOrderRequest, IOrderResponse } from '../../types'
import { apiInstance } from '../base'

const BASE_URL = 'invest/order'

export const placeOrder = (order: IOrderRequest): Promise<IOrderResponse> => {
    return apiInstance.post(`${BASE_URL}`, order )
}
