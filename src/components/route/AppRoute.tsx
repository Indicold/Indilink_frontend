/* The code is importing various dependencies and functions from different modules and libraries. */
import { useEffect, useCallback } from 'react'
import {
    setLayout,
    setPreviousLayout,
    setCurrentRouteKey,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import { useLocation } from 'react-router-dom'
import type { LayoutType } from '@/@types/theme'
import type { ComponentType } from 'react'

/**
 * The above type defines the props for a route in a TypeScript React application, including the
 * component to render, the route key, and an optional layout.
 * @property component - The component property is of type ComponentType<T>, which means it expects a
 * React component as its value. The component will receive a generic type T as its props.
 * @property {string} routeKey - A string that represents the key or identifier for the route. This can
 * be used to uniquely identify and reference the route in the application.
 * @property {LayoutType} layout - The `layout` property is an optional property that specifies the
 * layout type for the route. It is of type `LayoutType`.
 */
export type AppRouteProps<T> = {
    component: ComponentType<T>
    routeKey: string
    layout?: LayoutType
}

/**
 * The `AppRoute` function is a TypeScript React component that handles routing and layout changes in a
 * Redux-powered application.
 * @param  - - `component: Component` is the component that will be rendered for the route.
 */
const AppRoute = <T extends Record<string, unknown>>({
    component: Component,
    routeKey,
    ...props
}: AppRouteProps<T>) => {
    /* `const location = useLocation()` is a React Hook that returns the current location object. The
    location object represents where the app is currently rendered. It contains information about
    the current URL, including the pathname, search, and hash. */
    const location = useLocation()

    /* `const dispatch = useAppDispatch()` is a React Hook that returns a dispatch function from the
    Redux store. The dispatch function is used to dispatch actions to update the state in the Redux
    store. It allows components to interact with the store and trigger state changes. */
    const dispatch = useAppDispatch()

    /* `const layoutType = useAppSelector((state) => state.theme.layout.type)` is using the
    `useAppSelector` hook from the Redux store to select the `layout.type` property from the `theme`
    slice of the application state. */
    const layoutType = useAppSelector((state) => state.theme.layout.type)

    /* The code `const previousLayout = useAppSelector((state) => state.theme.layout.previousType)` is
    using the `useAppSelector` hook from the Redux store to select the `previousType` property from
    the `layout` slice of the `theme` slice in the application state. */
    const previousLayout = useAppSelector(
        (state) => state.theme.layout.previousType
    )

    /* The `handleLayoutChange` function is a callback function that is created using the `useCallback`
    hook. It is responsible for handling the layout change when the route changes. */
    const handleLayoutChange = useCallback(() => {
        dispatch(setCurrentRouteKey(routeKey))

        if (props.layout && props.layout !== layoutType) {
            dispatch(setPreviousLayout(layoutType))
            dispatch(setLayout(props.layout))
        }

        if (!props.layout && previousLayout && layoutType !== previousLayout) {
            dispatch(setLayout(previousLayout))
            dispatch(setPreviousLayout(''))
        }
    }, [dispatch, layoutType, previousLayout, props.layout, routeKey])

    /* The `useEffect` hook is used to perform side effects in a React component. In this case, it is
    used to call the `handleLayoutChange` function whenever the `location` or `handleLayoutChange`
    dependencies change. */
    useEffect(() => {
        handleLayoutChange()
    }, [location, handleLayoutChange])

    return <Component {...(props as T)} />
}

export default AppRoute
