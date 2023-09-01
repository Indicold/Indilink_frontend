import { Button } from '@/components/ui'
import React, { useEffect, useState } from 'react'
import { CiImageOn } from "react-icons/ci"
import { useNavigate } from 'react-router-dom'
const UserTypeModal = ({ setAuthModal }) => {
  const [modal, setModal] = useState(true)
  const navigate = useNavigate()
  const [Bussiness, setBussiness] = useState('')
  const handleUserType = (value: any) => {
    setBussiness(value)
    if (value == 'Investor') {
      navigate('/investor-dashbord')
      localStorage.setItem('user_type','Investor')

    }
    if (value == 'Partner') {
      navigate('/partner-dashbord')
      localStorage.setItem('user_type','Partner')

    }
    if (value == 'Customer') {
      navigate('/home')
      localStorage.setItem('user_type','Customer')
      setAuthModal(false)
    }
  }
 
  return (
    <div>
      {modal && <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="my-auto otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-[800px] mt-[150px] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <button onClick={() => setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button> */}
            <div className="px-6 py-6 lg:px-8">
              <h4 className="text-head-title  mb-4">Choice on UserType </h4>
              <p>You may also change later</p>

              <div className="flex justify-around grid grid-cols-3 grid-flow-col gap-2">
                <div role="button" onClick={() => handleUserType('Partner')} style={{ backgroundColor: `${Bussiness == 'Partner' ? "#CBD9D4" : ""}` }} className="m-4 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <CiImageOn className='text-6xl mx-auto' />
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Partner
                  </h5>
                  <p>
                    sample Caption
                  </p>


                </div>
                <div role="button" onClick={() => handleUserType('Customer')} style={{ backgroundColor: `${Bussiness == 'Customer' ? "#CBD9D4" : ""}` }} className="m-4 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <CiImageOn className='text-6xl mx-auto' />
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Customer
                  </h5>

                  <p>
                    sample Caption
                  </p>

                </div>
                <div role="button" onClick={() => handleUserType('Investor')} style={{ backgroundColor: `${Bussiness == 'Investor' ? "#CBD9D4" : ""}` }} className="m-4 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <CiImageOn className='text-6xl mx-auto' />
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Investor
                  </h5>

                  <p>
                    sample Caption
                  </p>

                </div>
              </div>
              {/* <div className='flex'>
                <Button
                  style={{ borderRadius: "13px" }}
                  block
                  variant="solid"
                  type="button"
                  onClick={() => setAuthModal(false)}
                  className='indigo-btn w-[300px] mx-auto rounded-[30px]'
                >
                  Next
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default UserTypeModal
