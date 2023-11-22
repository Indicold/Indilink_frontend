/* The `import` statement is used to import specific functions or objects from a module. In this case,
it is importing the `useRef`, `useEffect`, and `useMemo` functions from the 'react' module. These
functions are part of the React library and are used for managing state and side effects in React
components. */
import { useRef, useEffect, useMemo } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
function useCallbackRef<T extends (...args: any[]) => any>(
    cb: T | undefined
): T {
    /* The line `const cbRef = useRef(cb)` is creating a mutable reference to the `cb` variable. The
    `useRef` function is a built-in React hook that returns a mutable ref object. In this case, the
    ref object is initialized with the value of the `cb` variable. This allows the value of `cb` to
    be accessed and updated within the component's lifecycle. */
    const cbRef = useRef(cb)

    /* The `useEffect` hook is used to perform side effects in a React component. In this case, the
    `useEffect` hook is being used to update the value of the `cbRef.current` variable whenever the
    `cb` variable changes. */
    useEffect(() => {
        cbRef.current = cb
    })

    /* The `return useMemo(() => ((...args) => cbRef.current?.(...args)) as T, [])` statement is
    returning a memoized version of the callback function. */
    return useMemo(() => ((...args) => cbRef.current?.(...args)) as T, [])
}

export default useCallbackRef
