import { getToken } from "@/store/customeHook/token"
import UserTypeModal from "./auth/UserTypeModal"
import { useState } from "react"
import BussinessTypeModal from "./auth/BussinessTypeModal"
import { useNavigate } from "react-router-dom"
import CardLayout from "@/components/layouts/Dashbord/CardLayout"
import { useTranslation } from 'react-i18next'

const Home = () => {
    const [authModal,setAuthModal]=useState<any>(true)
    const {token}=getToken()
    const navigate=useNavigate()
    const handleChange=(e:any)=>{
        if(e.target.value==1){
            navigate('/partner-dashbord');
            localStorage.setItem('user_type','Partner')
        }
        if(e.target.value==2){
            navigate('/home')
            localStorage.setItem('user_type','Customer')
        }
        if(e.target.value==3){
            navigate('/investor-dashbord')
            localStorage.setItem('user_type','Investor')
        }

    }

    const { t, i18n }:any = useTranslation();
    return(
        <>
        {authModal && !localStorage.getItem('user_type') && <UserTypeModal setAuthModal={setAuthModal}/> }
      
     
            <CardLayout title=  {t("Customer Dashboard")}/>
        </>
    )
}

export default Home
