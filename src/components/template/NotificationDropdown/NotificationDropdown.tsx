/* These are import statements in TypeScript React. They are used to import various components, hooks,
icons, and utility functions from different files and libraries. */
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout, HiOutlineUser, AiFillBell } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import { Divider } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import useApiFetch from '@/store/customeHook/useApiFetch'
import { apiUrl, getToken } from '@/store/token'
import { messageView } from '@/store/customeHook/validate'
import { ToastContainer } from 'react-toastify'

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

const _NotificationDropdown = ({ className }: CommonProps) => {
    const { token }: any = getToken();
    const { data: ListOfNotification, loading: Notificationloading, error: PCerror } =
    useApiFetch<any>(`master/notifications`, token);

    const { signOut } = useAuth()
    
const navigate:any=useNavigate();

    /* The `UserAvatar` constant is a JSX element that represents the avatar or icon for the user in
    the notification dropdown. It consists of a `Stack` component from the Material-UI library,
    which is used to stack multiple components horizontally or vertically. */
    const UserAvatar = (
        <Stack spacing={2} direction="row" role="button">
            <Badge badgeContent={ListOfNotification?.data?.length} className='!m-4' color="secondary">
                <NotificationsIcon className='!text-[30px]' color="action" />
            </Badge>

        </Stack>
    )
    const handleViewAll = () => {
        navigate('/notification')
    }
    function calculateTimeDifference(targetDate) {
        const currentDate = new Date();
        const target = new Date(targetDate);

        // Calculate the time difference in milliseconds
        const timeDifference = target - currentDate;

        if (timeDifference < 0) {
            return "Target date has passed";
        }

        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return {
            days,
            hours,
            minutes,
        };
    }

// Example usage:
const targetDate = "2023-09-15T05:11:27.000Z";
const timeDifference = calculateTimeDifference(targetDate);

console.log("Time Difference:");
console.log(`${timeDifference.days} days`);
console.log(`${timeDifference.hours} hours`);
console.log(`${timeDifference.minutes} minutes`);

    return (
        <div>
            <ToastContainer />
            <Dropdown
                menuStyle={{ minWidth: 340 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                    <Dropdown.Item variant="header" className='mt-2 px-6 font-bold text-base text-gray-800'>
                        Notification
                    </Dropdown.Item>
                    <Dropdown.Item variant="divider" />
                    {ListOfNotification?.data?.slice(0,4).map((item:any,index:any)=>(
     <Dropdown.Item variant="header">
     <div className="flex items-center">
     <div className="mt-2 px-6  bg-white rounded-lg w-full">
<div className=" inline-flex items-center justify-between w-full">
<div className="inline-flex items-center">
<img
src="https://cdn-icons-png.flaticon.com/128/763/763812.png"
alt="Training Icon"
className="w-6 h-6 mr-3"
/>
<h3 className="font-bold text-base text-gray-800">{item?.name}</h3>
</div>
<p className="text-xs text-gray-500">{item?.created_at}</p>
</div>
<p className="mt-1 text-sm">
Hey! Do you remember about choosing your training regime?
</p>
</div>
     </div>
 </Dropdown.Item>
                    ))}
           
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
              {ListOfNotification?.data?.length>0 &&  <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2 text-end"
                    onClick={handleViewAll}
                >

                    <span className='text-end'>View All</span>
                </Dropdown.Item>}
            </Dropdown>
        </div>
    )
}

const NotificationDropdown = withHeaderItem(_NotificationDropdown)

export default NotificationDropdown
