/* These lines of code are importing various modules and functions from different files. */
import { Navigate, Outlet } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import useAuth from '@/utils/hooks/useAuth'

/* `const { authenticatedEntryPath } = appConfig` is destructuring the `authenticatedEntryPath`
property from the `appConfig` object. It allows you to directly access the value of
`authenticatedEntryPath` without having to use `appConfig.authenticatedEntryPath`. */
const { authenticatedEntryPath } = appConfig

/**
 * The PublicRoute component checks if the user is authenticated and either redirects them to the
 * authenticated entry path or renders the child components.
 * @returns The `PublicRoute` component returns either a `Navigate` component or an `Outlet` component.
 * If the user is authenticated, it returns a `Navigate` component with the `to` prop set to the
 * `authenticatedEntryPath` variable. If the user is not authenticated, it returns an `Outlet`
 * component.
 */
const PublicRoute = () => {
    const { authenticated } = useAuth()

    return authenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />
}

export default PublicRoute
