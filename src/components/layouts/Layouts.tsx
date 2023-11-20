import { useMemo, lazy, Suspense, useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import { useAppSelector } from '@/store'
import {
    LAYOUT_TYPE_CLASSIC,
    LAYOUT_TYPE_BLANK,
} from '@/constants/theme.constant'
import useAuth from '@/utils/hooks/useAuth'
import useLocale from '@/utils/hooks/useLocale'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'; // Import jwt_decode library
import { TokenInfo } from '@/store/customeHook/token'
import { AnyCnameRecord } from 'dns'

const layouts = {
    [LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
    [LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
}

const Layout = () => {
    const layoutType = useAppSelector((state) => state.theme.layout.type)
    const { authenticated } = useAuth()
    const { signOut } = useAuth()
    const navigate:any=useNavigate();
    useLocale()

    const AppLayout = useMemo(() => {
        if (authenticated) {
            return layouts[layoutType]
        }
        return lazy(() => import('./AuthLayout'))
    }, [layoutType, authenticated])
    const token:any=localStorage.getItem('access_token') || null;

    useEffect(() => {
        // Function to check token expiration
        if (token) {
            const now = new Date().getTime() / 1000; // Convert to seconds
      
            try {
              // Decode the token
              const decodedToken :any= jwt_decode(token);
              const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
              console.log('TTTTTTTTTT8887', now,expirationTime);
      
              if (now > expirationTime) {
                console.error('Token is expired');
                signOut(); // Log out the user if the token is expired
                navigate('/')
              }
            } catch (error:any) {
              console.error('Error decoding token:', error.message);
              // Handle the error, e.g., log out the user or perform other actions
              signOut();
            }
          }
        }, [token, signOut]);
      

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
