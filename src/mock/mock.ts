/* These lines of code are importing various modules and functions that are needed for setting up a
mock server using MirageJS. */
import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'

import { signInUserData } from './data/authData'

import { authFakeApi } from './fakeApi'

/* `const { apiPrefix } = appConfig` is destructuring the `apiPrefix` property from the `appConfig`
object. It allows you to directly access the `apiPrefix` value without having to use
`appConfig.apiPrefix`. */
const { apiPrefix } = appConfig

/**
 * The `mockServer` function creates a mock server with specified environment and routes, and loads
 * seed data for sign-in user.
 * @param  - - `environment`: The environment in which the server is being created. It defaults to
 * `'test'`.
 * @returns The `mockServer` function is returning the result of calling the `createServer` function.
 */
export function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                const isExternal = request.url.startsWith('http')
                return isExternal
            })
            this.passthrough()

            authFakeApi(this, apiPrefix)
        },
    })
}
