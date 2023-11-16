/* The code is importing the necessary hooks and functions from the React library. */
import { useState, useCallback, useRef, useEffect } from 'react'
import useCallbackRef from './useCallbackRef'

/**
 * The type `UseControllableStateParams` is a generic type that represents the parameters for a hook
 * that manages a controllable state.
 * @property {T} prop - The `prop` property is an optional parameter of type `T`. It represents the
 * current value of the state.
 * @property {T} defaultProp - The `defaultProp` property is an optional parameter that specifies the
 * default value for the `prop` property. If the `prop` property is not provided or is `undefined`, the
 * `defaultProp` value will be used as the initial value for the state.
 * @property onChange - The `onChange` property is a function that will be called whenever the state
 * value changes. It takes the new state value as an argument.
 */
type UseControllableStateParams<T> = {
    prop?: T
    defaultProp?: T
    onChange?: (state: T) => void
}

/**
 * The `useUncontrolledState` function is a TypeScript function that helps manage uncontrolled state by
 * synchronizing the value with an onChange callback.
 * @param  - - `defaultProp`: The initial value for the uncontrolled state.
 * @returns The function `useUncontrolledState` returns the `uncontrolledState`, which is an array
 * containing the current value and a function to update the value.
 */
function useUncontrolledState<T>({
    defaultProp,
    onChange,
}: Omit<UseControllableStateParams<T>, 'prop'>) {
    const uncontrolledState = useState(defaultProp)
    const [value] = uncontrolledState
    const prevValueRef = useRef(value)
    const handleChange = useCallbackRef(onChange)

    useEffect(() => {
        if (prevValueRef.current !== value) {
            handleChange(value as T)
            prevValueRef.current = value
        }
    }, [value, prevValueRef, handleChange])

    return uncontrolledState
}

/**
 * The `useControllableState` function is a TypeScript function that allows for the creation of a
 * controlled or uncontrolled state value, with an optional onChange callback.
 * @param  - - `prop`: The controlled value of the state. If this is defined, the state is considered
 * controlled and its value is determined by this prop.
 * @returns The function `useControllableState` returns a tuple containing two values: `value` and
 * `setValue`.
 */
function useControllableState<T>({
    prop,
    defaultProp,
    onChange = () => {
        // empty callback
    },
}: UseControllableStateParams<T>) {
    const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
        defaultProp,
        onChange,
    })
    const isControlled = prop !== undefined
    const value = isControlled ? prop : uncontrolledProp
    const handleChange = useCallbackRef(onChange)

    const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
        useCallback(
            (nextValue) => {
                const setter = nextValue as (prevState?: T) => T
                if (isControlled) {
                    const value =
                        typeof nextValue === 'function'
                            ? setter(prop)
                            : nextValue
                    if (value !== prop) {
                        handleChange(value as T)
                    }
                } else {
                    setUncontrolledProp(nextValue)
                }
            },
            [isControlled, prop, setUncontrolledProp, handleChange]
        )

    return [value, setValue] as const
}

export default useControllableState
