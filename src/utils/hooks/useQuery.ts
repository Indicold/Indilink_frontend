/* The code is importing the `useMemo` hook from the `react` library and the `useLocation` hook from
the `react-router-dom` library. These hooks are used in the `useQuery` function to create a memoized
instance of the `URLSearchParams` object based on the current search query parameters in the URL. */
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * The function `useQuery` returns a `URLSearchParams` object based on the current search query
 * parameters in the URL.
 * @returns an instance of the URLSearchParams class.
 */
export default function useQuery(): URLSearchParams {
    const { search } = useLocation()
    return useMemo(() => new URLSearchParams(search), [search])
}
