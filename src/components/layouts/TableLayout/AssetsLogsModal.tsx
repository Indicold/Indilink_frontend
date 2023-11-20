/* The code is importing various components and functions from different files and libraries. */
import { Button } from '@/components/ui'
import React from 'react'
import AssetsLogsTable from './AssetsLogsTable'
import { getToken } from '@/store/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import DataNotFound from '../DataNotFound'
import LoaderSpinner from '@/components/LoaderSpinner'

const AssetsLogsModal = ({setModal,RowData}:any) => {
    const {token}:any=getToken(); // Extracting token for API call

    /* The code is using the `useApiFetch` custom hook to make an API call to fetch data related to
    asset logs. */
    const {
        data: AllStore,
        loading: StoreRLoad,
        error: allerr,
        refetch:fetchApi
    }: any = useApiFetch<any>(`partner/asset-logs/${RowData?.asset_id}`, token)
    
  /* The `return` statement is returning JSX code that will be rendered as HTML by React. */
  return (
    <>
   
    <div
    id="authentication-modal"
    tabIndex={-1}
    aria-hidden="true"
    className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
>
    <div className="my-auto relative w-full max-w-[1000px] max-h-full rounded-[13px]">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
                                onClick={() => setModal(false)}
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="text-center">Assets Logs</h3>
                    
               {AllStore?.data?.length>0 ? <AssetsLogsTable AllStore={AllStore?.data} fetchApi={fetchApi} /> :
               <DataNotFound title="No Title" url='/' />
               }
<div className='flex mt-4'>
            
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default AssetsLogsModal
