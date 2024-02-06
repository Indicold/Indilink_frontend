import React, { useState } from 'react'
import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useApiFetch from '@/store/customeHook/useApiFetch';
import { getToken } from '@/store/customeHook/token';
import KeyModal from './profileModal/KeyModal';
import KeyTable from './profileTables/keyTable';

// Defines the table header with column names.
const tableHead = {
    person_email: "Email Id",
    full_name:"Name",
    designation:"Designation",
    aadhar:"Aadhar",
contact_number: "Mob. No.",
// contract_name: "Contract Name",
  Action: "Action"
};
const KeyManagement = () => {
    const [data,setData]=useState<any>({
        full_name:"",
        person_email:"",
        designation:"",
        address:"",
        country_id:"",
        state_id:"",
        city_id:"",
        pin_code:"",
        aadhar:"",
        contact_number:"",
        platform_role_id:""

    })
    const {token}:any=getToken();
    const { data: ListOfKey, loading: LOKloading, error: LOKerror,refetch:fetchData } =
    useApiFetch<any>(`auth/key-mgmt`, token);
    const [modal,setModal]=useState<any>(false)
    
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handlesubmit = (e:any) => {
        navigate('/account-details')
    }
  return (
    <div className='lg:flex'>
    


        <div className="bg-white w-[100%] lg:flex shadow-2xl lg:p-8 ">
                {/* stepper start */}
                <div className=' w-[100%] p-8 lg:pl-0 lg:w-1/6'>
            

            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">                  
    <li className="mb-10 ml-6">            
    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
        <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">User Signup</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">Basic Information</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        
        <h6 className="font-medium leading-tight">Key Management Personal</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        
        <h6 className="font-medium leading-tight">Account Details</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
  
</ol>




            </div>
            {/* stepper end */}
            <div className='p-2 lg:ml-4 w-full lg:w-5/6'>
            {/* <ArrowBackIcon role='button' className='ms-3' onClick={()=>navigate(-1)} /> */}
            <h4 className="text-head-title text-center">Key Management Personal</h4>
        {modal && <KeyModal data={data} fetchData={fetchData} setModal={setModal} modal={modal} setData={setData} />}
            <div className='mt-8 text-end'>
                    
                            {/* <Button
                                block
                                // style={{borderRadius:"13px"}}
                                loading={isSubmitting}
                                // disabled={isDisabled}
                                variant="solid"
                                onClick={()=>setModal(true)}
                                className='m-auto rounded-xl p-2 shadow-lg '
                            >
                              
                                   + Add Key <br/> Management<br/> Personal
                                        </Button> */}
                                        {<button block loading={isSubmitting} variant="solid" onClick={()=>setModal(true)}  type="button" className="text-white  bg-[#23c94f] hover:bg-green-600 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">
                                            + Add Key Management Personal
                                            </button>}

                        </div>
                        {ListOfKey?.data && <KeyTable modal={modal} setModal={setModal} formData={data} setformData={setData} AllStore={ListOfKey?.data} tableHead={tableHead} />}
                
                <div className='lg:flex w-[100%] px-8 py-4 m-auto gap-4'>
                            <Button
                                style={{ borderRadius: '13px' }}
                                block
                                variant="solid"
                                type="button"
                                role='button'
                                onClick={()=>navigate(-1)}
                                className="indigo-btn !bg-gray-500 rounded-[30px]"
                            >
                                Prev
                            </Button>
                            <br />
                            <Button
                                block
                                style={{borderRadius:"13px"}}
                                loading={isSubmitting}
                                // disabled={isDisabled}
                                variant="solid"
                                onClick={handlesubmit}
                                className='indigo-btn rounded-xl shadow-lg'
                            >
                                Save & Next
                                        </Button>
                        </div>
                        </div>
        </div>
    </div>
  )
}

export default KeyManagement
