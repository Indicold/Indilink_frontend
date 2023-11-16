/* The code is importing various modules and functions from different files. */
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '@/utils/hooks/useAuth'

/* `const { unAuthenticatedEntryPath } = appConfig` is destructuring the `unAuthenticatedEntryPath`
property from the `appConfig` object. It allows you to directly access the value of
`unAuthenticatedEntryPath` without having to use `appConfig.unAuthenticatedEntryPath` every time. */
const { unAuthenticatedEntryPath } = appConfig

/**
 * The `ProtectedRoute` component checks if the user is authenticated and redirects them to the login
 * page if not, otherwise it renders the child components.
 * @returns If the user is not authenticated, a `Navigate` component is being returned with a `to` prop
 * that redirects the user to the `unAuthenticatedEntryPath` with the current `location.pathname`
 * appended as a query parameter.
 */
const ProtectedRoute = () => {
    const { authenticated } = useAuth()

    const location = useLocation()

    if (!authenticated) {
        return (
            <Navigate
                replace
                to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
            />
        )
    }

    return <Outlet />
}

export default ProtectedRoute // Exporting component to use in other files
