/* These lines are importing two modules: `useAuthority` from the `useAuthority` file in the
`utils/hooks` directory, and `CommonProps` from the `common` module in the `@types` directory. */
import useAuthority from '@/utils/hooks/useAuthority'
import type { CommonProps } from '@/@types/common'

/* The `interface AuthorityCheckProps` is defining the props that can be passed to the `AuthorityCheck`
component. It extends the `CommonProps` interface, which means it inherits all the properties
defined in the `CommonProps` interface. Additionally, it adds two new properties: `userAuthority`
and `authority`, both of which are arrays of strings. These properties can be used to pass the
user's authority and the required authority to the `AuthorityCheck` component. */
interface AuthorityCheckProps extends CommonProps {
    userAuthority: string[]
    authority: string[]
}

/**
 * The AuthorityCheck component checks if the user's authority matches the required authority and
 * renders its children if there is a match.
 * @param {AuthorityCheckProps} props - The `props` parameter is an object that contains the properties
 * passed to the `AuthorityCheck` component.
 */
const AuthorityCheck = (props: AuthorityCheckProps) => {
    const { userAuthority = [], authority = [], children } = props

    const roleMatched = useAuthority(userAuthority, authority)

    return <>{roleMatched ? children : null}</>
}

export default AuthorityCheck
