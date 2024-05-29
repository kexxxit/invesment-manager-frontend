import { apiInstance } from "../base"

const BASE_URL = 'invest/delete/'

export const deleteStrategy = (id: string) => {
    return apiInstance.delete(`${BASE_URL}${id}`)
}