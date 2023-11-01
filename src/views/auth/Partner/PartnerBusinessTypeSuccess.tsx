import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PartnerBusinessTypeSuccess = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(()=>{
            navigate('/admin-assets')
        }, 7000)
    })
    return (
        <div className='flex'>
            <div className='w-1/6'>
            

            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">                  
    <li className="mb-10 ml-6">            
        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">Asset Specifications</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight pt-2">Compliance Details</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>

</ol>




            </div>
            <div className="bg-white w-5/6">
                <h4 className="mb-2 text-head-title text-center p-4">
                    Registration Successfull
                </h4>
                <div>
                    <p className='text-center'>Asset Registration is successfull. You will be redirected to asset list page within few seconds.</p>
                </div>
            </div>
        </div>
    )
}

export default PartnerBusinessTypeSuccess
