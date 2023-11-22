/* The code is importing the `BaseService` module from the file `BaseService.ts` located in the same
directory as the current file. It is also importing the types `AxiosRequestConfig`, `AxiosResponse`,
and `AxiosError` from the `axios` library. */
import BaseService from './BaseService'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

/* The `ApiService` object is defining a method called `fetchData` that takes in a parameter `param` of
type `AxiosRequestConfig<Request>`. This method is responsible for making an HTTP request using the
`BaseService` module. */
const ApiService = {
    fetchData<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>
    ) {
        return new Promise<AxiosResponse<Response>>((resolve, reject) => {
            BaseService(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
}

export default ApiService
