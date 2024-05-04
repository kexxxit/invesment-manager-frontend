import { apiInstance } from '../base'

const BASE_URL = 'auth'

interface AuthData {
    "Token": string
}

export const authorize = (data: AuthData): Promise<{}> => {
    return apiInstance.post(`${BASE_URL}`, data)
}

export const isAutorized = (): Promise<{}> => {
    return apiInstance.get(`${BASE_URL}`)
}