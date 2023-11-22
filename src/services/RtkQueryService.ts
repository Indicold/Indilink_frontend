/* These lines of code are importing various dependencies and types that are needed for the
implementation of the `RtkQueryService` module. */
import { createApi } from '@reduxjs/toolkit/query/react'
import BaseService from './BaseService'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'

/**
 * The below function is a TypeScript implementation of a base query function for making HTTP requests
 * using Axios.
 * @returns The function `axiosBaseQuery` returns a `BaseQueryFn` function.
 */
const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
    > =>
    async (request) => {
        try {
            const response = BaseService(request)
            return response
        } catch (axiosError) {
            const err = axiosError as AxiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

/* The code `const RtkQueryService = createApi({ reducerPath: 'rtkApi', baseQuery: axiosBaseQuery(),
endpoints: () => ({}) })` is creating an instance of the `createApi` function from the
`@reduxjs/toolkit/query/react` package. */
const RtkQueryService = createApi({
    reducerPath: 'rtkApi',
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
})

export default RtkQueryService
