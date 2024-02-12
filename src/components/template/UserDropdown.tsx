/* These import statements are importing various components, hooks, and icons from different files and
libraries. Here is a breakdown of what each import statement is doing: */
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi'
import { FaUser } from "react-icons/fa";

import type { CommonProps } from '@/@types/common'
import { TokenInfo } from '@/store/customeHook/token'
import { useState } from 'react'

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
    const navigate:any=useNavigate();
    /* `const { signOut } = useAuth()` is using destructuring assignment to extract the `signOut`
    function from the result of the `useAuth()` hook. The `useAuth()` hook likely returns an object
    that contains the `signOut` function. By using destructuring assignment, we can directly assign
    the `signOut` function to a variable named `signOut`, making it easier to use in the code. */
    const { signOut } = useAuth()
    const [popupmodel ,setPopupmodal] = useState(false);

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

    const openmodal = () =>{
        setPopupmodal(true)
    }

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" icon={<HiOutlineUser />} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                            {aud && aud}
                            </div>
                            {/* <div className="text-xs">user01@mail.com</div> */}
                        </div>
                    </div>
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
                   <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                    onClick={()=>navigate('/profile')}
                >
                    <span className="text-xl opacity-50">
                        <FaUser />
                    </span>
                    <span>Profile</span>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                    // onClick={signOut}
                    onClick={openmodal}
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>Sign Out</span>
                    
                   
                </Dropdown.Item>
            </Dropdown>
            <div id="popup-modal" className={`${popupmodel?'':'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex bg-[#f7f5f3cc]`}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" onClick={() =>setPopupmodal(false) } className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Sign Out this Page?</h3>
                <button onClick={signOut} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                    Yes, I'm sure
                </button>
                <button onClick={() =>setPopupmodal(false) } data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>
                    </div>
        </div>
        
    )
}

/* The line `const UserDropdown = withHeaderItem(_UserDropdown)` is creating a new component called
`UserDropdown` by wrapping the `_UserDropdown` component with the `withHeaderItem` higher-order
component (HOC). */
const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
