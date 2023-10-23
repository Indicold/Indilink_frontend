import { onkeyDown } from '@/store/customeHook/validate';
import React, { useState } from 'react'

const Invoice = () => {
    const [modal, setModal] = useState<any>(false);
    return (
        <>
          {modal &&  <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="my-auto relative w-full max-w-[500px] max-h-full rounded-[13px]">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="px-6 py-6">
                            <div className='visible'>

                                <div className='bg-black w-[100%] rounded-[6px] flex justify-between p-2 '>

                                    <div className='p-2'>

                                        <h5 className='text-white text-sm'>Invoice Details</h5>

                                    </div>
                                    <div className=' text-white  '>

                                        <button type="button"       onClick={()=>setModal(false)} className="bg-black rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">

                                            <span className="sr-only">Close menu</span>



                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">

                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />

                                            </svg>

                                        </button>

                                    </div>

                                </div>



                                <div className='w-[100%] bg-white mt-6 p-4 '>






                                </div>



                                <div className='w-[90%] p-2 m-auto text-center '>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="dropzone-file"
                                            className="flex h-[100px] flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                </p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="amount" className="block mb-2 text-sm font-medium
                                         text-gray-900 dark:text-white text-start mt-4">Ammount</label>
                                        <input type="number" onKeyDown={onkeyDown} id="amount"
                                            className="bg-gray-50 border border-gray-300 text-gray-900
             text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
              block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
               dark:focus:border-blue-500" placeholder="Enter your ammount here..." required />
                                    </div>


                                </div>





                                <div className='m-auto mt-7 text-center w-[100%]'>

                                    <button className='bg-green-600 p-4 w-[90%] rounded-3xl text-white '>Submit</button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            <div className='flex justify-between  h-[70px]'>

                <div className=''>

                    <h5><b>Invoice</b></h5>

                    <p>Please add the Invoice</p>

                </div>

                <div className=''>

                    <button type="button" 
                    onClick={()=>setModal(true)}
                        className="ml-auto mt-auto text-white 
            bg-green-700 hover:bg-green-800 focus:outline-none
             focus:ring-4 focus:ring-green-300 font-medium 
             rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2
              dark:bg-green-600 dark:hover:bg-green-700 
              dark:focus:ring-green-800"><b>+ Invoice</b></button>

                </div>

            </div>

            <div className=' bg-white  p-4  m-auto w-full h-full'>

                <img className='w-[28%]  m-auto' src="./img/images/indicoldside.png" alt="" />

                <h3 className='text-center p-2'>What is Lorem Ipsum?</h3>

                <p className='text-center m-auto p-2 w-[55%]'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, cupiditate a quibusdam. </p>

                <div className='flex justify-around'>

                    <div></div>

                    <div>

                        <button type="button"
                              onClick={()=>setModal(true)}
                            className=" text-white bg-green-700 hover:bg-green-800
                  focus:outline-none focus:ring-4 focus:ring-green-300 
                  font-medium rounded-full text-sm px-5 py-2.5 text-center 
                  mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 
                  dark:focus:ring-green-800"><b>+ Invoice</b></button>

                    </div>

                    <div></div>

                </div>

            </div>

        </>
    )
}

export default Invoice
