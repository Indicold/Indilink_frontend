/* The line `import { useState, useEffect } from 'react'` is importing the `useState` and `useEffect`
hooks from the `react` library. These hooks are used to manage state and perform side effects in
React functional components. */
import { useState, useEffect } from 'react'

export default function useWindowSize() {
    /* This line is declaring a state variable called `windowSize` and a function called
    `setWindowSize` to update the state. The initial value of `windowSize` is an object with `width`
    and `height` properties set to `undefined`. The `useState` hook is used to manage the state of
    `windowSize` and `setWindowSize` is used to update the state. */
    const [windowSize, setWindowSize] = useState<{
        width?: number
        height?: number
    }>({
        width: undefined,
        height: undefined,
    })

    /* The `useEffect` hook is used to perform side effects in functional components. In this case, the
    `useEffect` hook is being used to add an event listener for the `resize` event on the window
    object. */
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}
