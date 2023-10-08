import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SuccessScreen = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(()=>{
            navigate('/sign-in')
        }, 5000)
    })
  return (
    <div>
      <div className="bg-white w-5/6">
                <h4 className="mb-2 text-head-title text-center p-4">
                    Registration Successfull
                </h4>
                <div>
                    <p className='text-center'>Account Registration is successfull. You will be redirected to sign in page within few seconds.</p>
                </div>
            </div>
    </div>
  )
}

export default SuccessScreen
