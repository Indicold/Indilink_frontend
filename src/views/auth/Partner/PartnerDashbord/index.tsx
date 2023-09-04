import Chatbot from '@/components/Chatbot'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PartnerDashbord = () => {
    const navigate=useNavigate()
    const handleChange=(e:any)=>{
        if(e.target.value==1){
            navigate('/partner_dashbord')
            localStorage.setItem('user_type','Partner')
        }
        if(e.target.value==2){
          localStorage.setItem('user_type','Customer')
            navigate('/home')
        }
        if(e.target.value==3){
            navigate('/investor-dashbord')
            localStorage.setItem('user_type','Investor')
        }

    }
  return (
    <div>
    <div className='w-full flex justify-between'>
                <h2 className='text-start'>Partner Dashboard</h2>
               
            </div>
            <Chatbot />
    </div>
  )
}

export default PartnerDashbord
