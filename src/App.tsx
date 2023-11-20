import { Provider } from 'react-redux'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import mockServer from './mock'
import appConfig from '@/configs/app.config'
import './locales'
import { useEffect } from 'react'
import { TokenInfo } from './store/customeHook/token'
import useAuth from './utils/hooks/useAuth'

const environment = process.env.NODE_ENV

/**
 * Set enableMock(Default false) to true at configs/app.config.js
 * If you wish to enable mock api
 */
if (environment !== 'production' && appConfig.enableMock) {
    mockServer({ environment })
}
function App() {
    // const {exp}:any=TokenInfo();
    // const { signOut } = useAuth()
    // useEffect(() => {
    //     // Function to check token expiration
        
    //       if (exp) {
    //         const now = new Date().getTime() / 1000; // Convert to seconds
          
    // console.log('TTTTTTTTTT8887',now,exp);
    //         if (1999685335 > exp) {
    //             signOut()
             
    //         }
    //       }
    
    
    
      
    //   }, []);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Theme>
                        <Layout />
                    </Theme>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App
