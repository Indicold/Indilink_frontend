/* The code is importing two things: */
import { createSlice } from '@reduxjs/toolkit'
import appConfig from '@/configs/app.config'

/**
 * The `LocaleState` type represents the state of the current language in a TypeScript application.
 * @property {string} currentLang - The `currentLang` property is a string that represents the current
 * language selected in the application.
 */
export type LocaleState = {
    currentLang: string
}

/* The code is initializing the initial state of the `LocaleState` type. It sets the `currentLang`
property to the value of `appConfig.locale`. `appConfig.locale` is likely a configuration value that
represents the default language for the application. */
const initialState: LocaleState = {
    currentLang: appConfig.locale,
}

/* The code `export const localeSlice = createSlice({ ... })` is creating a Redux slice using the
`createSlice` function from the `@reduxjs/toolkit` library. */
export const localeSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.currentLang = action.payload
        },
    },
})

/* `export const { setLang } = localeSlice.actions` is exporting the `setLang` action creator from the
`localeSlice` slice. This allows other parts of the application to import and use the `setLang`
action to dispatch a change in the current language. */
export const { setLang } = localeSlice.actions

/* `export default localeSlice.reducer` is exporting the reducer function from the `localeSlice` slice.
This allows other parts of the application to import and use the reducer to handle state updates
related to the current language. */
export default localeSlice.reducer
