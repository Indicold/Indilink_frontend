/* The code is importing three functions from different modules: */
import { useRef } from 'react'
import uniqueId from 'lodash/uniqueId'
import createUID from '../utils/createUid'

/**
 * The `useUniqueId` function generates a unique ID using a prefix and length, and returns the same ID
 * across re-renders of a component.
 * @param [prefix] - The prefix parameter is a string that is used as a prefix for the generated unique
 * ID. It is optional and defaults to an empty string if not provided.
 * @param [len=10] - The `len` parameter is the length of the unique identifier that will be generated.
 * It is an optional parameter with a default value of 10.
 * @returns The function `useUniqueId` returns the current value of the `idRef.current` reference.
 */
export default function useUniqueId(prefix = '', len = 10) {
    /* `const idRef = useRef<string>()` is creating a reference to a value that persists across
    re-renders of the component. In this case, it is creating a reference to a string value. */
    const idRef = useRef<string>()

    /* The `if` statement checks if the `idRef.current` value is falsy (i.e., undefined or null). If it
    is falsy, it means that the `idRef.current` has not been assigned a value yet. */
    if (!idRef.current) {
        idRef.current = `${uniqueId(prefix)}-${createUID(len)}`
    }

    return idRef.current
}
