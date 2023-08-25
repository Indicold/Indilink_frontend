import { getToken } from "@/store/customeHook/token"
import UserTypeModal from "./auth/UserTypeModal"
import { useState } from "react"
import BussinessTypeModal from "./auth/BussinessTypeModal"

const Home = () => {
    const [authModal,setAuthModal]=useState<any>(true)
    const {token}=getToken()
    return(
        <>
        {authModal ?  <UserTypeModal setAuthModal={setAuthModal}/>:<BussinessTypeModal setAuthModal={setAuthModal}/> }
      
<h1>Home</h1>
        </>
    )
}

export default Home
