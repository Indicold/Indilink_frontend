/* These import statements are importing various components, hooks, and icons from different files and
libraries. Here is a breakdown of what each import statement is doing: */
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'
import { TokenInfo } from '@/store/customeHook/token'

/**
 * The above type represents a dropdown list item in a TypeScript React application, containing a
 * label, path, and icon.
 * @property {string} label - A string that represents the label or display text for the dropdown list
 * item. This is typically the text that is shown to the user in the dropdown menu.
 * @property {string} path - The `path` property in the `DropdownList` type represents the path or URL
 * that the dropdown list item should navigate to when clicked. It is of type `string`.
 * @property icon - The `icon` property in the `DropdownList` type represents a JSX element. JSX is a
 * syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript code.
 * In this case, the `icon` property is expected to be a JSX element, which can be a component or
 */
type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = []

/* The `const _UserDropdown` is a functional component that represents a user dropdown menu in a
TypeScript React application. It takes two props, `className` and `UserType`, which are of type
`any`. */
const _UserDropdown = ({ className,UserType }:any) => {
    /* The line `const {aud}:any=TokenInfo()` is using destructuring assignment to extract the `aud`
    property from the result of the `TokenInfo()` function. The `TokenInfo()` function likely
    returns an object that contains the `aud` property. */
    const {aud}:any=TokenInfo()

    /* `const { signOut } = useAuth()` is using destructuring assignment to extract the `signOut`
    function from the result of the `useAuth()` hook. The `useAuth()` hook likely returns an object
    that contains the `signOut` function. By using destructuring assignment, we can directly assign
    the `signOut` function to a variable named `signOut`, making it easier to use in the code. */
    const { signOut } = useAuth()

    /* The `const UserAvatar` is a JSX element that represents the user avatar and user information
    displayed in the dropdown menu. */
    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            <Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
            <div className="hidden md:block">
                <div className="text-xs capitalize">{UserType}</div>
                {/* <div className="font-bold">{aud ? aud :"N/A"}</div> */}
            </div>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <NavLink to='/profile'>
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" icon={<HiOutlineUser />} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                            {aud && aud}
                            </div>
                            {/* <div className="text-xs">user01@mail.com</div> */}
                        </div>
                    </div>
                    </NavLink>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="mb-1 px-0"
                    >
                        <Link 
                            className="flex h-full w-full px-2" 
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                ))}
                {/* <Dropdown.Item variant="divider" /> */}
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                    onClick={signOut}
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>Sign Out</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

/* The line `const UserDropdown = withHeaderItem(_UserDropdown)` is creating a new component called
`UserDropdown` by wrapping the `_UserDropdown` component with the `withHeaderItem` higher-order
component (HOC). */
const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
