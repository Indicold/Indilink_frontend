import React from 'react'
import { useNavigate } from 'react-router-dom';

const InvestorDashbord = () => {
    const navigate = useNavigate()
    const handleChange = (e: any) => {
        if (e.target.value == 1) {
            localStorage.setItem('user_type', 'Partner')

            navigate('/partner-dashbord')
        }
        if (e.target.value == 2) {
            localStorage.setItem('user_type', 'Customer')

            navigate('/home')
        }
        if (e.target.value == 3) {
            localStorage.setItem('user_type', 'Investor')

            navigate('/investor-dashbord')
        }

    }
    return (
        <div>
            <div className='w-full flex justify-between'>
                <h2>Investor Dashboard</h2>
              
            </div>
        </div>
    )
}

export default InvestorDashbord
