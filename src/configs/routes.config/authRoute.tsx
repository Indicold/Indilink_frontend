import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

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
]

export default authRoute
