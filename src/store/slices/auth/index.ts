import { combineReducers } from '@reduxjs/toolkit'
import session, { SessionState } from './sessionSlice'
import user, { UserState } from './userSlice'
import details from "../Authentication/userDetails"
import {apiGstDetailsReducer} from "../Authentication/userRegister"
import {apiGetAuthOtpReducer} from "../Authentication/userGetOtp"
import {apiPostverifyOtpReducer} from "../Authentication/userVerifyOtp"
import {apiLoginPostReducer} from "../Authentication/userLogin"
const reducer = combineReducers({
    session,
    user,
    details,
    apiGstDetailsReducer,
    apiGetAuthOtpReducer,
    apiPostverifyOtpReducer,
    apiLoginPostReducer,
    
    
})

export type AuthState = {
    session: SessionState
    user: UserState
}

export * from './sessionSlice'
export * from './userSlice'

export default reducer
