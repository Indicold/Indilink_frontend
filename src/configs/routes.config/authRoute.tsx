/* The code is importing the `lazy` function from the `react` library and the `Routes` type from the
`@/@types/routes` module. */
import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

/* The `authRoute` constant is an array of route objects. Each route object represents a specific route
in the application. */
const authRoute: Routes = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('@/views/auth/SignIn')),
        authority: [],
    },
    {
        key: 'loginwithotp',
        path: `/sign-in-otp`,
        component: lazy(() => import('@/views/auth/LoginWithOTP')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/views/auth/SignUp')),
        authority: [],
    },

    {
        key: 'Terms',
        path: `/terms`,
        component: lazy(() => import('@/views/auth/Terms')),
        authority: [],
    },


    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@/views/auth/ForgotPassword')),
        authority: [],
    },
    {
        key: 'VerfyOtp',
        path: `/VerfyOtp`,
        component: lazy(() => import('@/views/auth/VerifyOTP')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/views/auth/ResetPassword')),
        authority: [],
    },
    {

        key: 'basicInformation',
        path: `/basic-information`,
        component: lazy(() => import('@/views/auth/BasicInformation')),
        authority: [],

    },
    {

        key: 'basicInformationSuccess',
        path: `/signup-success`,
        component: lazy(() => import('@/views/auth/BasicInformation/SuccessScreen')),
        authority: [],

    },
    {

        key: 'partner',
        path: `/partner-registration`,
        component: lazy(() => import('@/views/auth/Partner/NewMultistep')),
        authority: [],

    },
    {

        key: 'partner',
        path: `/partner-registration/:id`,
        component: lazy(() => import('@/views/auth/Partner/NewMultistep')),
        authority: [],

    },
    {

        key: 'investor',
        path: `/investor-registration`,
        component: lazy(() => import('@/views/auth/Investor/NewMultistep')),
        authority: [],

    },
]

export default authRoute
