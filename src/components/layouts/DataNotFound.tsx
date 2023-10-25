import React from 'react'

const DataNotFound = () => {
    return (

        <>
            <div className='bg-white w-full h-full p-6'>
                <div >
                <h1>Invoice</h1>
                </div>

                <div className='mt-4'>
                    <h4 className='text-gray-400'><b>Your Company*</b></h4>
                    <p className='text-gray-400'>Ypur First Name and Last Name</p>
                    <p className='text-gray-400'>Company Website</p>
                    <p className='text-gray-400'>company Address</p>
                    <p className='text-gray-400'>City, State ZIP</p>
                    <p className='text-gray-400'>Country</p>
                    <p className='text-gray-400'>Phone No*</p>
                    <p className='text-gray-400'>Email Addeess</p>
                    
                </div>

            <div className='flex justify-between' >
                <div className='mt-4'>
                    <h4 className='text-gray-400'><b>Client Company*</b></h4>
                    <p className='text-gray-400'>Client Name</p>
                    <p className='text-gray-400'>Client Address</p>
               
                    <p className='text-gray-400'>City, State ZIP</p>
                    <p className='text-gray-400'>Country</p>
                   
                    
                </div>

                <div className='mt-16'>
                    <p className='text-black text-center '>Invoice No:  .  <span> ###</span></p>
                    <p className='text-black text-center '>Invoice Date:   . <span> ###</span></p>
                    <p className='text-black text-center '>Due Date:   . <span> ###</span></p>
                </div>
                </div>

              

                            
<div className="relative overflow-x-auto mt-6">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                ID
                </th>
                <th scope="col" className="px-6 py-3">
                Description
                </th>
                <th scope="col" className="px-6 py-3">
                Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                Quantity
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    01
                </th>
                <td className="px-6 py-4">
                    Item Discription
                </td>
                <td className="px-6 py-4">
                    1
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
     
          
        </tbody>
    </table>
</div>

            <div className='w-[100%] m-auto'>
            <button type="button" className="w-[100%] m-auto text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add more +</button>
            </div>



            <div className='mt-6'>

               <div className='flex mt-2 text-black'>
                <div><b>Subtotal:</b></div>
                <div className='ml-[30%]'>0.00</div>
               </div>

               <div className='flex mt-2 text-black'>
                <div ><b>Tax:</b></div>
                <div className='ml-[30%]'>0%</div>
               </div>

               <div className='flex mt-2 text-black'>
                <div className='text-black'><b>Discount:</b></div>
                <div className='ml-[30%]'>0%</div>
               </div>

               <hr />

               <div className='flex mt-2 text-black'>
                <div><b className='text-black'>Total:</b>
                </div>
                <div className='ml-[30%]'>0.00</div>
               </div>

            </div>
            

              
            </div>

     
        </>
    )
}

export default DataNotFound
