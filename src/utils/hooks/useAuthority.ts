/* The code is importing the `useMemo` hook from the `react` library and the `isEmpty` function from
the `lodash/isEmpty` module. */
import { useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'

/**
 * The function `useAuthority` checks if the user's authority matches any of the specified roles.
 * @param {string[]} userAuthority - An array of strings representing the authorities/roles of the
 * user.
 * @param {string[]} authority - An array of strings representing the roles or authorities that are
 * required for a certain action or access.
 * @param [emptyCheck=false] - The `emptyCheck` parameter is a boolean flag that determines whether the
 * function should return a specific value when either the `authority` or `userAuthority` arrays are
 * empty. If `emptyCheck` is `true`, the function will return `false` in such cases. If `emptyCheck`
 * @returns a boolean value. If any of the following conditions are met, it returns the negation of the
 * `emptyCheck` parameter:
 * - `authority` is empty
 * - `userAuthority` is empty
 * - `authority` is undefined
 */
function useAuthority(
    userAuthority: string[] = [],
    authority: string[] = [],
    emptyCheck = false
) {
    /* The code is using the `useMemo` hook to memoize the result of a function. */
    const roleMatched = useMemo(() => {
        return authority.some((role) => userAuthority.includes(role))
    }, [authority, userAuthority])

    if (
        isEmpty(authority) ||
        isEmpty(userAuthority) ||
        typeof authority === 'undefined'
    ) {
        return !emptyCheck
    }

    return roleMatched
}

export default useAuthority
