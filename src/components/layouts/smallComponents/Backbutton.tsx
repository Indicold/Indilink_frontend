import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
const BackButton = () => {
    const navigate:any=useNavigate();
  return (
    <div className='ml-8 mt-4'>
        <button onClick={()=>navigate(-1)} className='flex bg-white rounded-lg p-2 class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
      <ArrowBackIcon className='mr-2'/>    <p className='text-center mt-1'>Previous Page</p>
      </button>
    </div>
  )
}

export default BackButton