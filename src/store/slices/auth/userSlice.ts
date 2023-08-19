import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    first_name: string
    last_name: string
    password: string
    confirm_password: string
    email: string
    phone_number: string
    term_condition:String
    gst:String
}

const initialState: UserState = {
    first_name: '',
    last_name: '',
    password: '',
    confirm_password:'',
    email:'',
    phone_number:'',
    term_condition:'',
    gst:''



}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.first_name = action.payload?.first_name
            state.last_name = action.payload?.last_name
            state.password = action.payload?.password
            state.email = action.payload?.email
            state.phone_number = action.payload?.phone_number
            state.term_condition = action.payload?.term_condition
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
