import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

/**
 * The SuccessScreen component displays a success message for a registration process and automatically
 * redirects the user to the sign-in page after 5 seconds.
 * @returns The SuccessScreen component is returning a div element containing a div with the class
 * "bg-white w-5/6". Inside this div, there is an h4 element with the class "mb-2 text-head-title
 * text-center p-4" displaying the text "Registration Successful". Below the h4 element, there is a
 * paragraph element displaying the text "Account Registration is successful. You will be
 */
const SuccessScreen = () => {
    const navigate = useNavigate(); // For handling navigation
    useEffect(() => {
        setTimeout(()=>{
            navigate('/partner-dashbord')
        }, 5000)
    })
  return (
    <div>
      <div className="bg-white w-5/6 shadow-2xl">
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
