/* The code is importing two things from different modules: */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

/**
 * The above type represents the state of a user, including their first name, last name, password,
 * confirm password, email, phone number, term condition, and GST.
 * @property {string} first_name - A string representing the first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {string} password - The password property is a string that represents the user's password.
 * @property {string} confirm_password - A string representing the user's confirmation password.
 * @property {string} email - A string representing the user's email address.
 * @property {string} phone_number - The `phone_number` property is a string that represents the user's
 * phone number.
 * @property {String} term_condition - This property represents whether the user has agreed to the
 * terms and conditions. It is of type `String`.
 * @property {String} gst - The "gst" property in the UserState type represents the Goods and Services
 * Tax (GST) number of the user.
 */
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

/* The `initialState` constant is initializing the initial state of the `UserState` type. It sets all
the properties of the `UserState` type to empty strings. This means that when the Redux store is
initialized, the `UserState` will have empty values for all its properties. */
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

/* The code `const userSlice = createSlice({ ... })` is creating a Redux slice for managing the user
state. */
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

/* `export const { setUser } = userSlice.actions` is exporting the `setUser` action creator from the
`userSlice` slice. */
export const { setUser } = userSlice.actions

/* `export default userSlice.reducer` is exporting the reducer function from the `userSlice` slice.
This allows other parts of the codebase to import and use this reducer function when creating the
Redux store. The reducer function is responsible for handling actions and updating the state of the
`UserState` based on those actions. */
export default userSlice.reducer
