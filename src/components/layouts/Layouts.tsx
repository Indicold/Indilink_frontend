/* The code is importing various dependencies and custom hooks for the React component. Here is a
breakdown of each import statement: */
import { useMemo, lazy, Suspense, useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import { useAppSelector } from '@/store'
import {
    LAYOUT_TYPE_CLASSIC,
    LAYOUT_TYPE_BLANK,
} from '@/constants/theme.constant'
import useAuth from '@/utils/hooks/useAuth' // Importing custom authentication hook
import useLocale from '@/utils/hooks/useLocale'
import { useNavigate } from 'react-router-dom' // For handling navigation
import jwt_decode from 'jwt-decode'; // Import jwt_decode library
import { TokenInfo } from '@/store/customeHook/token'
import { AnyCnameRecord } from 'dns'

/* The `layouts` constant is an object that maps layout types to lazy-loaded components. It uses the
`lazy` function from React to dynamically import the components when they are needed. */
const layouts = {
    [LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
    [LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
}

/**
 * The `Layout` component is a React component that renders different layouts based on the user's
 * authentication status and token expiration.
 */
const Layout = () => {
    /* The line `const layoutType = useAppSelector((state) => state.theme.layout.type)` is using the
    `useAppSelector` hook to access the `layout.type` property from the Redux store. */
    const layoutType = useAppSelector((state) => state.theme.layout.type)
    const { authenticated } = useAuth() // Extracting authenticated value to check whether the user is authenticated or not
    const { signOut } = useAuth() // Extracting custom signOut function
    const navigate:any=useNavigate();
    useLocale()

    /* The `const AppLayout = useMemo(() => {...})` block is using the `useMemo` hook to memoize the
    value of `AppLayout`. */
    const AppLayout = useMemo(() => {
        if (authenticated) {
            return layouts[layoutType]
        }
        return lazy(() => import('./AuthLayout'))
    }, [layoutType, authenticated])

    const token:any=localStorage.getItem('access_token') || null;

    /* The `useEffect` hook in the code is used to perform side effects in the component. In this case,
    it is used to check the expiration of a token and perform actions accordingly. */
    useEffect(() => {
        // Check if the token is valid
        if (token) {
            const now = new Date().getTime() / 1000; // Convert to seconds
      
            try {
              // Decode the token
              const decodedToken :any= jwt_decode(token);
              const expirationTime = decodedToken.exp; // Convert seconds to milliseconds
      console.log("TTTTTTTTTTTautologout",expirationTime,now,now > expirationTime);
      
              if (now > expirationTime) {
                console.error('Token is expired');
                signOut(); // Log out the user if the token is expired
                navigate('/')
              }
            } catch (error:any) {
              // Handle the error, e.g., log out the user or perform other actions
              signOut();
            }
          }
        }, [token, signOut]);
      

    /* The `return` statement in the code is returning a JSX element. */
    return (
        <Suspense
            fallback={
                <div className="flex flex-auto flex-col h-[100vh]">
                    <Loading loading={true} />
                </div>
            }
        >
            <AppLayout />
        </Suspense>
    )
}

export default Layout
