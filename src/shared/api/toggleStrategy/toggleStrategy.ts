import { apiInstance } from "../base"

export interface IToggleResponse {
    taskId: string
    isEnabled: boolean
}

const BASE_URL = 'invest/toggle/'

export const toggleStrategy = (id: string) : Promise<IToggleResponse> => {
    return apiInstance.put(`${BASE_URL}${id}`, {})
}