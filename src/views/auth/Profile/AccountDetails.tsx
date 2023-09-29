import React, { useState } from 'react'
import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AccountDetails = () => {
    const data:any = {}
    const handleChange = (e:any) => {
        console.log("changed")
    }
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();
    const handlesubmit = (e:any) => {
        console.log("submitted")
    }
  return (
    <div className='flex'>
        {/* stepper start */}
            <div className='w-1/6'>
            

            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">                  
    <li className="mb-10 ml-6">            
    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
        <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">User Signup</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">Basic Information</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
        
        <h6 className="font-medium leading-tight">Key Management Personnel</h6>
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
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        
        <h6 className="font-medium leading-tight">Document Uploads</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
</ol>




            </div>
            {/* stepper end */}


        <div className="mb-4 w-5/6 bg-white">
            <ArrowBackIcon role='button' className='ms-3' onClick={()=>navigate(-1)} />
            <h4 className="text-head-title text-center">Account Details</h4>
            <Formik
                initialValues={{ field: true }}
                onSubmit={() =>
                    console.log('Submited via my onSubmit function')
                }
            >
                <Form className="py-2 multistep-form-step">
                    <FormContainer>
                        
                        <div className="flex">
                        <FormItem
                                label="Account Name"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    // disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Account Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Account Number"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    // disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Account Number"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className="flex">
                        <FormItem
                                label="Bank Name"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    // disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Bank Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Bank IFSC Code"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    // disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Bank IFSC Code"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className="flex">
                        <FormItem
                                label="Branch Name"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    // disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Branch Name"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className='flex'>
                            <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        role='button'
                                        onClick={()=>navigate(-1)}
                                        className="indigo-btn !w-[200px] !bg-gray-500 m-4 mx-auto rounded-[30px]"
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
                                className='indigo-btn mt-4 !w-[30%] mx-auto rounded-xl shadow-lg'
                            >
                                {isSubmitting
                                    ? 'Saving...'
                                    : 'Save & Next'}
                                        </Button>
                        </div>
                    </FormContainer>
                </Form>
                </Formik>
        </div>
    </div>
  )
}

export default AccountDetails
