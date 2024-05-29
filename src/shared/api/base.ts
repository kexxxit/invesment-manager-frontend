import axios, { AxiosInstance, AxiosResponse } from 'axios'

export const API_URL = 'http://localhost:5265/api/'
// export const API_URL = 'https://a26938-927f.x.d-f.pw/api/'

class ApiInstance {
    private axios: AxiosInstance

    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            timeout: 120000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
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

    async put<T, U>(endpoint: string, data: T): Promise<U> {
        const response: AxiosResponse<U> = await this.axios.put(endpoint, data);
        return response.data;
    }

    async delete(endpoint: string, params: object = {}): Promise<void> {
        await this.axios.delete(endpoint, {
            ...params,
        });
    }
    
}

export const apiInstance = new ApiInstance()
