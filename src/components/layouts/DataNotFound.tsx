import React from 'react'

const DataNotFound = () => {
    return (

        <>
            <div className='flex justify-between  h-[70px]'>
                <div className=''>
                    <h5><b>Asset Search</b></h5>
                    <p>Please add the assets</p>
                </div>
                <div className=''>
                    <button type="button" className="ml-auto mt-auto text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><b>+ Create Query</b></button>
                </div>
            </div>

            <div className=' bg-white  p-4  m-auto w-full h-full'>
                <img className='w-[28%]  m-auto' src="./img/images/indicoldside.png" alt="" />
                <h3 className='text-center p-2'>What is Lorem Ipsum?</h3>
                <p className='text-center m-auto p-2 w-[55%]'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, cupiditate a quibusdam. </p>
                <div className='flex justify-around'>
                    <div></div>
                    <div> 
                         <button type="button" className=" text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><b>+ Create Query</b></button>
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default DataNotFound
