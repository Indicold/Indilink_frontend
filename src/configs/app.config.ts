/**
 * The above type represents the configuration options for an application, including API prefix, entry
 * paths for authenticated and unauthenticated users, tour path, locale, and whether to enable mock
 * data.
 * @property {string} apiPrefix - The prefix to be added to all API endpoints.
 * @property {string} authenticatedEntryPath - The authenticatedEntryPath property is a string that
 * represents the path to the entry point of the application for authenticated users.
 * @property {string} unAuthenticatedEntryPath - The `unAuthenticatedEntryPath` property is the path
 * that the user will be redirected to if they are not authenticated or logged in.
 * @property {string} tourPath - The `tourPath` property is a string that represents the path to the
 * tour feature in your application. This could be a URL or a route path within your application.
 * @property {string} locale - The `locale` property represents the language or region setting for the
 * application. It is a string that specifies the desired locale, such as "en-US" for English (United
 * States) or "fr-FR" for French (France).
 * @property {boolean} enableMock - A boolean value indicating whether to enable mock data for testing
 * purposes.
 */
export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

/* The `const appConfig: AppConfig = { ... }` statement is creating a constant variable named
`appConfig` and assigning it an object value. The object has properties that match the structure
defined by the `AppConfig` type. Each property is assigned a specific value, such as `apiPrefix:
'/api'`, `authenticatedEntryPath: '/home'`, etc. This object represents the configuration options
for an application, with each property specifying a different setting or path. */
const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: true,
}

/* `export default appConfig` is exporting the `appConfig` object as the default export of the module.
This means that when another module imports this module, they can access the `appConfig` object
directly without having to specify its name. For example, in another module, you can import the
`appConfig` object like this: */
export default appConfig
