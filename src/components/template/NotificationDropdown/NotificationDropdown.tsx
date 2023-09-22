import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout, HiOutlineUser,AiFillBell } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import { Divider } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = []

const _NotificationDropdown = ({ className }: CommonProps) => {

    const { signOut } = useAuth()
const navigate:any=useNavigate();
    const UserAvatar = (
        <Stack spacing={2} direction="row" role="button">
        <Badge badgeContent={4} className='!m-4' color="secondary">
          <NotificationsIcon className='!text-[30px]'  color="action" />
        </Badge>
    
      </Stack>
    )
const handleViewAll=()=>{
    navigate('/notification')
}
    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 340 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                    <Dropdown.Item variant="header" className='mt-2 px-6 font-bold text-base text-gray-800'>
                        Notification
                    </Dropdown.Item>
                    <Dropdown.Item variant="divider" />
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
          <h3 className="font-bold text-base text-gray-800">Training</h3>
        </div>
        <p className="text-xs text-gray-500">2 min ago</p>
      </div>
      <p className="mt-1 text-sm">
        Hey! Do you remember about choosing your training regime?
      </p>
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
                {/* <Dropdown.Item variant="divider" /> */}
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2 text-end"
                    onClick={handleViewAll}
                >
                   
                    <span className='text-end'>View All</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

const NotificationDropdown = withHeaderItem(_NotificationDropdown)

export default NotificationDropdown
