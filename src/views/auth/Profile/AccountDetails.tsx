import React, { useState } from 'react'
import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountModal from './profileModal/AccountModal';
import useApiFetch from '@/store/customeHook/useApiFetch';
import { getToken } from '@/store/customeHook/token';
import AccountTable from './profileTables/accountTable';
const tableHead = {
    email: "Email ID",
    account_name: "Account Name",
    account_number: "Account Number",
    // is_deleted: "Is Deleted",
    // is_deletedBy: "Is Deleted By",
    bank_name: "Bank Name",
    bank_ifsc: "IFSC Code",
    branch_name: "Branch",
    is_default:"Default",
    Action: "Action"
  };
const AccountDetails = () => {
    const [modal, setModal] = useState<any>(false);
    const [data, setData] = useState<any>({
        account_name: "",
        account_number: "",
        bank_name: "",
        bank_ifsc: "",
        branch_name: ""

    })
    const { token }: any = getToken();
    const { data: accountList, loading: AccountListloading, error: Alerror, refetch: fetchData } =
        useApiFetch<any>(`auth/account-details`, token);

    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();
    const handlesubmit = (e: any) => {
        if(localStorage.getItem('user_type')==='Partner'){
            navigate('/partner-dashbord')
        }else if(localStorage.getItem('user_type')==='Customer'){
            navigate('/home')
        }else{
            navigate('/investor-dashbord')
        }
 
    }
    return (
        <div className='lg:flex'>
        

            <div className="bg-white w-[100%] flex p-8 shadow-2xl">
                    {/* stepper start */}
            <div className=' w-[100%] pl-[10%] md:pl-3 lg:pl-0 lg:w-1/6'>


<ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
            </svg>
        </span>
        <h6 className="font-medium leading-tight">User Signup</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
            </svg>
        </span>
        <h6 className="font-medium leading-tight">Basic Information</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
            </svg>
        </span>

        <h6 className="font-medium leading-tight">Key Management Personal</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
        </span>

        <h6 className="font-medium leading-tight">Account Details</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>

</ol>




</div>
{/* stepper end */}
<div className='w-5/6'>

                {/* <ArrowBackIcon role='button' className='ms-3' onClick={() => navigate(-1)} /> */}
                <h4 className="text-head-title text-center">Account Details</h4>
                {modal && <AccountModal data={data} setModal={setModal} modal={modal} setData={setData}  fetchData={fetchData} />
                }            <div className='flex'>
                    <Button
                        style={{ borderRadius: '13px' }}
                        block
                        variant="solid"
                        type="button"
                        role='button'
                        onClick={() => {
                            setModal(true);
                            setData({})
                        }}
                        className="indigo-btn !w-[200px] !bg-gray-500 m-4 ml-auto rounded-[30px]"
                    >
                        + Add Account
                    </Button>

                </div>
                {accountList?.data && <AccountTable fetchData={fetchData} modal={modal} setModal={setModal} formData={data} setformData={setData} AllStore={accountList?.data} tableHead={tableHead} />}
                <div className='flex pl-6 pr-6 gap-6'>
                    <Button
                        style={{ borderRadius: '13px' }}
                        block
                        variant="solid"
                        type="button"
                        role='button'
                        onClick={() => navigate(-1)}
                        className="indigo-btn  !bg-gray-500 m-4 mx-auto rounded-[30px]"
                    >
                        Prev
                    </Button>
                    <Button
                        block
                        style={{ borderRadius: "13px" }}
                        loading={isSubmitting}
                        // disabled={isDisabled}
                        variant="solid"
                        onClick={handlesubmit}
                        className='indigo-btn mt-4 mx-auto rounded-xl shadow-lg'
                    >
                        {isSubmitting
                            ? 'Saving...'
                            : 'Save & Next'}
                    </Button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default AccountDetails
