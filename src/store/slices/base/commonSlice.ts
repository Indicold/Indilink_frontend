/* The code is importing two things from different modules: */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

/**
 * The above type defines a common state object with a property for the current route key.
 * @property {string} currentRouteKey - A string representing the key of the current route.
 */
export type CommonState = {
    currentRouteKey: string
}

/* The code is defining and exporting a constant variable named `initialState` of type `CommonState`.
It is initializing the `currentRouteKey` property of the `initialState` object to an empty string.
This `initialState` object represents the initial state of the `commonSlice` reducer. */
export const initialState: CommonState = {
    currentRouteKey: '',
}

/* The code is creating a slice using the `createSlice` function from the `@reduxjs/toolkit` module. */
export const commonSlice = createSlice({
    name: `${SLICE_BASE_NAME}/common`,
    initialState,
    reducers: {
        setCurrentRouteKey: (state, action: PayloadAction<string>) => {
            state.currentRouteKey = action.payload
        },
    },
})

/* `export const { setCurrentRouteKey } = commonSlice.actions` is exporting the `setCurrentRouteKey`
action creator from the `commonSlice` slice. */
export const { setCurrentRouteKey } = commonSlice.actions

/* `export default commonSlice.reducer` is exporting the reducer function from the `commonSlice` slice
as the default export of the module. This allows other modules to import and use the reducer
function when configuring the Redux store. */
export default commonSlice.reducer
