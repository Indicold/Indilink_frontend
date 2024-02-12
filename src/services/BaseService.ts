/* These lines of code are importing various dependencies and constants that are used in the code. */
import axios from 'axios'
import appConfig from '@/configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/constants/api.constant'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import store, { signOutSuccess } from '../store'

const unauthorizedCode = [401]

/* The code `const BaseService = axios.create({ timeout: 60000, baseURL: appConfig.apiPrefix })` is
creating an instance of the Axios library with some default configuration options. */
const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
})

/* The `BaseService.interceptors.request.use()` function is an interceptor that is executed before
sending a request. It takes two callback functions as arguments: the first one is called if the
request is successful, and the second one is called if there is an error. */
BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let accessToken = (persistData as any)?.auth?.session?.token

        if (!accessToken) {
            const { auth } = store.getState()
            accessToken = auth.session.token
        }

        if (accessToken) {
            config.headers[
                REQUEST_HEADER_AUTH_KEY
            ] = `${TOKEN_TYPE}${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/* The `BaseService.interceptors.response.use()` function is an interceptor that is executed after
receiving a response from the server. It takes two callback functions as arguments: the first one is
called if the response is successful, and the second one is called if there is an error. */
BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(signOutSuccess())
        }

        return Promise.reject(error)
    }
)

export default BaseService
