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
contract_name: "Contract Name",
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
    <div className='lg:flex '>
    


        <div className="bg-white w-[100%] lg:flex shadow-2xl p-8 ">
                {/* stepper start */}
                <div className=' w-[100%] pl-[10%] md:pl-3 lg:pl-0 lg:w-1/6'>
            

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
            <div>
            {/* <ArrowBackIcon role='button' className='ms-3' onClick={()=>navigate(-1)} /> */}
            <h4 className="text-head-title text-center">Key Management Personal</h4>
        {modal && <KeyModal data={data} fetchData={fetchData} setModal={setModal} modal={modal} setData={setData} />}
            <div className='mt-8 text-center'>
                    
                            <Button
                                block
                                style={{borderRadius:"13px"}}
                                loading={isSubmitting}
                                // disabled={isDisabled}
                                variant="solid"
                                onClick={()=>setModal(true)}
                                className='indigo-btn lg:!w-[40%] !w-[80%] m-auto rounded-xl shadow-lg me-1'
                            >
                              
                                   + Add Key Management Personal
                                        </Button>

                        </div>
                        {ListOfKey?.data && <KeyTable modal={modal} setModal={setModal} formData={data} setformData={setData} AllStore={ListOfKey?.data} tableHead={tableHead} />}
                <div className='flex gap-6 pl-8 pr-8'>
                            <Button
                                style={{ borderRadius: '13px' }}
                                block
                                variant="solid"
                                type="button"
                                role='button'
                                onClick={()=>navigate(-1)}
                                className="indigo-btn !bg-gray-500 m-4 rounded-[30px]"
                            >
                                Prev
                            </Button>
                            <Button
                                block
                                style={{borderRadius:"13px"}}
                                loading={isSubmitting}
                                // disabled={isDisabled}
                                variant="solid"
                                onClick={handlesubmit}
                                className='indigo-btn mt-4 rounded-xl shadow-lg'
                            >
                                Save 
                                        </Button>
                        </div>
                        </div>
        </div>
    </div>
  )
}

export default KeyManagement
