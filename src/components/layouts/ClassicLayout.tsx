import Header from '@/components/template/Header'
import SideNavToggle from '@/components/template/SideNavToggle'
import MobileNav from '@/components/template/MobileNav'
import UserDropdown from '@/components/template/UserDropdown'
import SideNav from '@/components/template/SideNav'
import View from '@/views'
import { useNavigate } from 'react-router-dom'
import NotificationDropdown from '../template/NotificationDropdown/NotificationDropdown'
import { useTranslation } from 'react-i18next'

const HeaderActionsStart = () => {
    return (
        <>
            <MobileNav />
            <SideNavToggle />
        </>
    )
}




const HeaderActionsEnd = () => {
    const navigate = useNavigate();
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
    const { t, i18n }:any = useTranslation();
    let UserType:any=localStorage.getItem('user_type');
    const handleLanguage=(e:any)=>{
        i18n.changeLanguage(e.target.value);
    }
    return (
        <>
          <select
                id="countries"
                onChange={(e:any)=>handleLanguage(e)}
                className="mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value='en' selected>English</option>
                <option value='hi' >Hindi</option>
                <option  value='GB' >German</option>
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

const ClassicLayout = () => {
    return (
        <div className="app-layout-classic flex flex-auto flex-col">
            <div className="flex flex-auto min-w-0">
                <SideNav />
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow dark:shadow-2xl"
                        headerStart={<HeaderActionsStart />}
                        headerEnd={<HeaderActionsEnd />}
                    />
                    <div className="h-full flex flex-auto flex-col">
                        <View />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassicLayout
