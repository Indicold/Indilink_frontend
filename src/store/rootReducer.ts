/* The code is importing various modules and types from the Redux library and other files in the
project. */
import { combineReducers, CombinedState, AnyAction, Reducer } from 'redux'
import auth, { AuthState } from './slices/auth'
import base, { BaseState } from './slices/base'
import locale, { LocaleState } from './slices/locale/localeSlice'
import theme, { ThemeState } from './slices/theme/themeSlice'
import RtkQueryService from '@/services/RtkQueryService'

export type RootState = CombinedState<{
    auth: CombinedState<AuthState>
    base: CombinedState<BaseState>
    locale: LocaleState
    theme: ThemeState
    /* eslint-disable @typescript-eslint/no-explicit-any */
    [RtkQueryService.reducerPath]: any
}>

/* The `AsyncReducers` interface is defining a type for an object that contains dynamic reducers. */
export interface AsyncReducers {
    [key: string]: Reducer<any, AnyAction>
}

/* The `staticReducers` constant is an object that contains the static reducers used in the Redux
store. Each property in the object represents a slice of the state and its corresponding reducer
function. */
const staticReducers = {
    auth,
    base,
    locale,
    theme,
    [RtkQueryService.reducerPath]: RtkQueryService.reducer,
}

/**
 * The `rootReducer` function combines static and async reducers to create a single reducer function
 * for the Redux store.
 * @param {AsyncReducers} [asyncReducers] - The `asyncReducers` parameter is an object that contains
 * dynamically loaded reducers. These reducers are loaded asynchronously and added to the root reducer
 * at runtime.
 * @returns The `rootReducer` function is being returned.
 */
const rootReducer =
    (asyncReducers?: AsyncReducers) =>
    (state: RootState, action: AnyAction) => {
        const combinedReducer = combineReducers({
            ...staticReducers,
            ...asyncReducers,
        })
        return combinedReducer(state, action)
    }

/* The `export default rootReducer` statement is exporting the `rootReducer` function as the default
export of this module. This allows other modules to import and use the `rootReducer` function when
creating the Redux store. */
export default rootReducer
