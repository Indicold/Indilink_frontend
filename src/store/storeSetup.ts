/* 
* This code is setting up and configuring a Redux store using Redux Toolkit and Redux Persist. 
*/
import {
    configureStore,
    Action,
    Reducer,
    AnyAction,
    Store,
} from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import rootReducer, { RootState, AsyncReducers } from './rootReducer'
import RtkQueryService from '@/services/RtkQueryService'

/* eslint-disable @typescript-eslint/no-explicit-any */
const middlewares: any[] = [RtkQueryService.middleware]

/* The `persistConfig` object is used to configure the Redux Persist library. It specifies how the
Redux store should be persisted and rehydrated. */
const persistConfig = {
    key: PERSIST_STORE_NAME,
    keyPrefix: '',
    storage,
    whitelist: ['auth', 'locale'],
}

/* The `interface CustomStore` is extending the `Store` interface from Redux. It adds an optional
property `asyncReducers` of type `AsyncReducers`. */
interface CustomStore extends Store<RootState, AnyAction> {
    asyncReducers?: AsyncReducers
}

/* The code is creating a Redux store using the `configureStore` function from Redux Toolkit. */
const store: CustomStore = configureStore({
    reducer: persistReducer(persistConfig, rootReducer() as Reducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(middlewares),
    devTools: process.env.NODE_ENV === 'development',
})

store.asyncReducers = {}

/* `export const persistor = persistStore(store)` is creating a persistor object using the
`persistStore` function from the Redux Persist library. The persistor object is responsible for
persisting and rehydrating the Redux store. It takes the Redux store as an argument and returns the
persistor object. */
export const persistor = persistStore(store)

/**
 * The `injectReducer` function is used to dynamically add a reducer to the Redux store and update the
 * store's root reducer.
 * @param {string} key - The key is a string that represents the name or identifier of the reducer. It
 * is used to associate the reducer with a specific slice of the application state.
 * @param reducer - The `reducer` parameter is a function that takes the current state and an action as
 * arguments, and returns the new state based on the action. It is responsible for updating the state
 * of the application based on the actions dispatched.
 * @returns The `store` object is being returned.
 */
export function injectReducer<S>(key: string, reducer: Reducer<S, Action>) {
    if (store.asyncReducers) {
        if (store.asyncReducers[key]) {
            return;
        }
        store.asyncReducers[key] = reducer
        store.replaceReducer(
            persistReducer(
                persistConfig,
                rootReducer(store.asyncReducers) as Reducer
            )
        )
    }
    persistor.persist()
    return store
}

export type AppDispatch = typeof store.dispatch

/* `export default store` is exporting the `store` object as the default export of the module. This
allows other modules to import the `store` object using the `import` statement. For example, in
another module, you can import the `store` object like this: */
export default store
