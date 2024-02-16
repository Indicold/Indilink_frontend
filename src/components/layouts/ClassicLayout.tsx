/* These lines of code are importing various components and hooks from different files. */
import Header from '@/components/template/Header'
import SideNavToggle from '@/components/template/SideNavToggle'
import MobileNav from '@/components/template/MobileNav'
import UserDropdown from '@/components/template/UserDropdown'
import SideNav from '@/components/template/SideNav'
import View from '@/views'
import { useNavigate } from 'react-router-dom'
import NotificationDropdown from '../template/NotificationDropdown/NotificationDropdown'
import { useTranslation } from 'react-i18next'
import BackButton from './smallComponents/Backbutton'
import useApiFetch from '@/store/customeHook/useApiFetch'
import { getToken } from '@/store/token'

/**
 * The `HeaderActionsStart` function returns a JSX element that includes the `MobileNav` and
 * `SideNavToggle` components.
 */
const HeaderActionsStart = () => {
    
    return (
        <>
            <MobileNav />
            <SideNavToggle />
        </>
    )
}




/**
 * The `HeaderActionsEnd` component is a React component that renders a language dropdown menu, a user
 * type dropdown menu, a notification dropdown, and a user dropdown.
 * @returns The `HeaderActionsEnd` component is returning a JSX fragment containing a select element
 * for language selection, a select element for user type selection, a `NotificationDropdown`
 * component, and a `UserDropdown` component.
 */
const HeaderActionsEnd = () => {
    /* `const navigate = useNavigate();` is using the `useNavigate` hook from the `react-router-dom`
    library to get the `navigate` function. This function can be used to programmatically navigate
    to different routes in the application. In this code, the `navigate` function is used to
    redirect the user to different dashboards based on the selected user type in the dropdown menu. */
    const navigate = useNavigate();

    /**
     * The handleChange function sets the user_type in localStorage based on the selected value and
     * navigates to a specific page.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input element.
     */
    const handleChange=(e:any)=>{
        if(e.target.value==1){
            localStorage.setItem('user_type','Partner')
            navigate('/partner-dashbord')
        }
        if(e.target.value==2){
          localStorage.setItem('user_type','Customer')
            navigate('/home')
        }
        if(e.target.value==3){
            localStorage.setItem('user_type','Investor')
            navigate('/investor-dashbord')
        }
    
    }

    /* The line `const { t, i18n }:any = useTranslation();` is using the `useTranslation` hook from the
    `react-i18next` library to get the `t` and `i18n` functions. */
    const { t, i18n }:any = useTranslation();
    let UserType:any=localStorage.getItem('user_type');

    /**
     * The function `handleLanguage` changes the language in an i18n library based on the value of the
     * target element.
     * @param {any} e - The parameter "e" is an event object. It is typically used in event handlers to
     * access information about the event that occurred, such as the target element that triggered the
     * event. In this case, it is used to access the value of the target element, which is expected to
     * be a language code
     */
    const handleLanguage=(e:any)=>{
        i18n.changeLanguage(e.target.value);
    }
    return (
        <>
          <select
                id="countries"
                onChange={(e:any)=>handleLanguage(e)}
                className="hidden lg:block md:block mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value='en' selected>English</option>
                <option value='hi' >Hindi</option>
                <option  value='nep' >Nepali</option>
            </select>
            {/* <h4>{t("first name")}</h4> */}
            <select
                id="countries"
                onChange={(e:any)=>handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value='1' >Partner</option>
                <option value='2' selected={UserType==='Customer'}>Customer</option>
                <option  value='3' selected={UserType==='Investor'}>Investor</option>
            </select>
            <NotificationDropdown  hoverable={false} />

            <UserDropdown hoverable={false} UserType={UserType} />
        </>
    )
}

/* The `ClassicLayout` function is a React component that returns a JSX element. It represents the
layout of the application and includes various components such as `SideNav`, `Header`, and `View`. */
const ClassicLayout = () => {
    const { token }: any = getToken()
    const { data: GetNdaStatusData }: any = useApiFetch(
        `auth/get_user_nda_status`,
        token
    )
    const ProfileData: any = GetNdaStatusData?.data[0]
    return (
        <div className="app-layout-classic bg-white flex flex-auto flex-col">
            <div className="flex flex-auto min-w-0">
                <SideNav />
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow dark:shadow-2xl"
                        headerStart={<HeaderActionsStart />}
                        headerEnd={<HeaderActionsEnd />}
                    />
                   {(ProfileData?.is_nda_signed == 0 || ProfileData?.is_nda_signed == 3) && <div className='p-2 text-[red]'>
                        <marquee>
                        Uploading NDA will enable additional features.
                        </marquee>
                        </div>}
                    <div className="h-full flex flex-auto flex-col">
                    {!(location?.pathname ==='/home' || location?.pathname ==='/partner-dashbord') && <BackButton />}
                        <View />
                    d</div>
                </div>
            </div>
        </div>
    )
}

export default ClassicLayout
