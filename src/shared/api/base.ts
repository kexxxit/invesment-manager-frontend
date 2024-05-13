import axios, { AxiosInstance, AxiosResponse } from 'axios'

export const API_URL = 'http://localhost:5265/api/'

class ApiInstance {
    private axios: AxiosInstance

    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            timeout: 120000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    async get<T>(endpoint: string, params: object = {}): Promise<T> {
        const response: AxiosResponse<T> = await this.axios.get(endpoint, {
            ...params,
        })
        return response.data
    }

    async post<T, U>(endpoint: string, data: T): Promise<U> {
        const response: AxiosResponse<U> = await this.axios.post(endpoint, data)
        return response.data
    }
}

export const apiInstance = new ApiInstance()
