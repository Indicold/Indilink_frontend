/* The first line `import 'react-toastify/dist/ReactToastify.css';` is importing the CSS file for the
React Toastify library. This CSS file contains the styles needed to display toast notifications. */
import 'react-toastify/dist/ReactToastify.css';
import { payloadSearchCustomer } from '@/views/auth/Customer/StoreSearch';
const ThankYouModal = ({message,setModal,setFormData}:any) => {
  
  /* The `return` statement is returning JSX (JavaScript XML) code, which is used to define the
  structure and content of a React component. */
  return (
    <div>
           {message?.status && <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="my-auto otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-[400px] !my-auto max-h-full">
          <div className="relative bg-white rounded-lg shadow-lg !border-1 border-black	 dark:bg-gray-700">
            <button onClick={() =>{ setModal(false); setFormData(payloadSearchCustomer)}} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            { message?.status===200 ? <div className="px-6 py-6 lg:px-8">
              <h3 className="text-head-title  mb-2 text-center">Thank You for Query ! </h3>
              <p className='text-center'>{message?.data}</p>

              <div className="flex justify-around grid grid-cols-3 grid-flow-col gap-2">
            


              </div>
          
            
            </div> :
               <div className="px-6 py-6 lg:px-8">
               <h3 className="text-head-title  mb-2 text-center">Some Error</h3>
               <p className='text-center'>{message?.data}</p>
 
               <div className="flex justify-around grid grid-cols-3 grid-flow-col gap-2">
             
 
 
               </div>
           
             
             </div>
            }

          </div>
        </div>
      </div>}
    </div>
  )
}

export default ThankYouModal
