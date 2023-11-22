/* The code is importing the necessary dependencies for the component. */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import img from "../../../public/img/images/indicoldside.png"

/* The code defines a functional component called `DataNotFound`. It takes two props, `title` and
`url`, which are of type `any`. */
const DataNotFound = ({title,url}:any) => {
    /* `const navigate:any=useNavigate();` is assigning the `useNavigate()` hook to the `navigate`
    variable. The `useNavigate()` hook is used for programmatic navigation in React Router. It
    returns a navigate function that can be used to navigate to different routes programmatically.
    In this case, the `navigate` function is being used in the `onClick` event handler of a button
    to navigate to a specific URL when the button is clicked. */
    const navigate:any=useNavigate();
    return (

        <>
            <div className='flex justify-between  h-[70px]'>
                <div className=''>
                    {/* <h5><b>Asset Search</b></h5> */}
                    {/* <p>Please add the assets</p> */}
                </div>
                {!(title==='Notification' || title==='No Title') && <div> 
                         <button type="button" className=" text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>navigate(url)}><b>+ {title}</b></button>
                    </div>}
            </div>

            <div className=' bg-white  p-4  m-auto w-full h-full'>
                <img className='w-[28%]  m-auto' src={img} alt="" />
                <h3 className='text-center p-2'>No Data Available</h3>
                <p className='text-center m-auto p-2 w-[55%]'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, cupiditate a quibusdam. </p>
                <div className='flex justify-around'>
                    <div></div>
                   {!(title==='Notification' || title==='No Title') && <div> 
                         <button type="button" className=" text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>navigate(url)}><b>+ {title}</b></button>
                    </div>}
                    <div></div>
                </div>
                {/* <div className='ml-[30%]'>0.00</div> */}
               </div>

            

              

     
        </>
    )
}

export default DataNotFound
