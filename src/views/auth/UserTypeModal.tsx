/**
 * The UserTypeModal component is a modal that allows the user to select their user type (Partner,
 * Customer, or Investor) and navigate to the corresponding dashboard page.
 * @param  - 1. `setAuthModal`: A function that sets the state of the authentication modal.
 * @returns The UserTypeModal component is being returned.
 */
import { Button } from '@/components/ui'
import usePostApi from '@/store/customeHook/postApi'
import React, { useEffect, useState } from 'react'
import { CiImageOn } from "react-icons/ci"
import { useNavigate } from 'react-router-dom'
const UserTypeModal = ({ setAuthModal }:any) => {
  const [modal, setModal] = useState(true)
  const navigate = useNavigate()
  const [Bussiness, setBussiness] = useState('');
  let {
    result:UserResponse,
    loading,
    sendPostRequest: PostDefaultUserType,
  }: any = usePostApi(`partner/updateUsertype`);
  /**
   * The function `handleUserType` sets the user type based on the input value and performs different
   * actions depending on the user type.
   * @param {any} value - The value parameter is the user type selected by the user. It can be one of
   * three values: 'Investor', 'Partner', or 'Customer'.
   */
  const handleUserType = (value: any) => {
    setBussiness(value)
    if (value == 'Investor') {
      PostDefaultUserType({usertype:3})
      navigate('/investor-dashbord')
      localStorage.setItem('user_type','Investor')

    }
    if (value == 'Partner') {
      PostDefaultUserType({usertype:1})
      navigate('/partner-dashbord')
      localStorage.setItem('user_type','Partner')

    }
    if (value == 'Customer') {
      PostDefaultUserType({usertype:2})
      navigate('/home')
      localStorage.setItem('user_type','Customer')
      setAuthModal(false)
    }
  }
 
  return (
    <div className=' '>
      {modal && <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="invisible md:visible lg:visible bg-emerald-50 my-auto otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-[70%] h-[400px]  max-w-[800px] mt-[50px] max-h-full">
          <div className="relative h-[400px] rounded-[20px] shadow dark:bg-gray-700 px-4-py-4 bg-gray-50">
            {/* <button onClick={() => setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button> */}
            <div className="px-6 py-6 lg:px-8">
              <h4 className="text-head-title text-center py-6 mb-4">Choice on UserType </h4>
              <p className=' w-[80%] ml-[10%] text-center -mt-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore natus optio, officia porro est laudantium praesentium animi veniam et! Non voluptates mollitia at repellat aliquid veniam excepturi odit magni deleniti?</p>

              <div className="justify-around grid grid-cols-3 grid-flow-col gap-2">
                <div role="button" onClick={() => handleUserType('Partner')} style={{ backgroundColor: `${Bussiness == 'Partner' ? "#CBD9D4" : ""}` }} className="m-4 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:bg-gray-200 transition-all duration-1000 dark:bg-neutral-700">
                  {/* <CiImageOn className='text-6xl mx-auto' /> */}
                  <img className='w-[100px] mx-auto' src="https://cdn-icons-png.flaticon.com/128/10071/10071359.png" alt="" />
                  <h5 className="mb-2 my-2 text-center text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Partner
                  </h5>
                  {/* <p>
                    sample Caption
                  </p> */}


                </div>
                <div role="button" onClick={() => handleUserType('Customer')} style={{ backgroundColor: `${Bussiness == 'Customer' ? "#CBD9D4" : ""}` }} className="m-4 block rounded-lg bg-white p-6 shadow-lg transition-all duration-1000 hover:bg-gray-200 dark:bg-neutral-700">
                  {/* <CiImageOn className='text-6xl mx-auto' />
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Customer
                  </h5> */}
                   <img className='w-[100px] mx-auto' src="https://cdn-icons-png.flaticon.com/128/10071/10071359.png" alt="" />
                  <h5 className="mb-2 my-2 text-center text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Customer
                  </h5>
{/* 
                  <p>
                    sample Caption
                  </p> */}

                </div>
                <div role="button" onClick={() => handleUserType('Investor')} style={{ backgroundColor: `${Bussiness == 'Investor' ? "#CBD9D4" : ""}` }} className="m-4 block rounded-lg bg-white p-6 transition-all duration-1000 hover:bg-gray-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  {/* <CiImageOn className='text-6xl mx-auto' />
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Investor
                  </h5>

                  <p>
                    sample Caption
                  </p> */}
                   <img className='w-[100px] mx-auto' src="https://cdn-icons-png.flaticon.com/128/10071/10071359.png" alt="" />
                  <h5 className="mb-2 my-2 text-center text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  Investor
                  </h5>

                </div>
              </div>
            </div>
          </div>
        </div>



        



      </div>}

                    {/* Responsive */}

      {modal && <div id="authentication-modal" className="bg-gray-100  visible lg:invisible md:invisible my-auto otp-modal fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto ">
                   
                   <div className=' bg-gray-100 '>


                  <div className='bg-black flex justify-between p-2 '>
                    <div className='p-2'>
                      <h5 className='text-white text-sm'>Select Query Type</h5>
                    </div>
                    <div className=' text-white  '>
                    <button type="button" className="bg-black rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Close menu</span>

              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
                    </div>
                  </div>

<div className='p-2'>
<div onClick={() => handleUserType('Partner')} className='w-[100%] flex mt-2   p-4 rounded-md bg-white'>
                           <div className=' '>
                             <img className='w-[120px]' src="https://cdn-icons-png.flaticon.com/128/10071/10071359.png" alt="" />
                           </div>
                           <div>
                             <h5>Partner</h5>
                             
                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse pariatur temporibus.</p>
                           
                         
                           </div>
                           </div>
       
                           <div onClick={() => handleUserType('Customer')} className='w-[100%] flex p-4 mt-6 rounded-md bg-white'>
                           <div className=' '>
                             <img className='w-[120px]  mx-auto' src="https://cdn-icons-png.flaticon.com/128/10071/10071359.png" alt="" />
                           </div>
                           <div>
                             <h5>Customer</h5>
                             
                             <p className='text-align'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse pariatur temporibus.</p>
                           
                         
                           </div>
                           </div>
       
       
                           <div onClick={() => handleUserType('Investor')} className='w-[100%] flex mt-6 p-4 rounded-md bg-white'>
                           <div className=''>
                             <img className='w-[120px]  mx-auto' src="https://cdn-icons-png.flaticon.com/128/10071/10071359.png" alt="" />
                           </div>
                           <div>
                             <h5>Investor</h5>
                             
                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse pariatur temporibus.</p>
                           
                         
                           </div>
                           </div>
</div>

                           {/* button component */}

       {/* <div className='grid justify-items-end w-[100%] '>
       <div className=''>
         
       <button type="button" className= "mt-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-md px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Continue</button>
       
       </div>
                          
       </div> */}
       
       
       
       
                   </div>
       
       
               </div>}
      
    </div>
  )
}

export default UserTypeModal
