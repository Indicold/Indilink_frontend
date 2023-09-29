import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import useApiFetch from '@/store/customeHook/useApiFetch';
import { getToken } from '@/store/token';
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BasicInfo = () => {
    const isDisabled:any = true;
    const data:any = {}
    const handleChange = (e:any) => {
        console.log("changed", e)
    }
    const handlesubmit = (e:any) => {
        console.log("Submitted")
        navigate('/key-management')
    }
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {token}:any=getToken()
    const { data: ListOfCountry, loading: LCloading, error: LCerror } =
    useApiFetch<any>(`master/get-countries`, token);
    const { data: ListOfState, loading: LOSloading, error: LOSerror } =
        useApiFetch<any>(`master/get-state-by-countryId/${data?.country_id}`, token);
    const [branch, setBranch] = useState(false)
    const [partner, setPartner] = useState(1)
    const [shareHolder, setShareHolder] = useState(1)
    const firmType = 'Private Limited'
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
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
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

            {/* main component */}
        <div className="mb-4 w-5/6 bg-white">
            <ArrowBackIcon className='ms-3' onClick={()=>navigate(-1)} />
            <h4 className="text-head-title text-center">Basic Information</h4>
            {/* pre filled common form */}
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
                                label="Firm Registered Country"
                                className="mx-auto w-1/2 rounded-lg pl-[22px]"
                            >
                                <select
                                         disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="country_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCountry && ListOfCountry?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === data?.country_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                {/* <p className="text-[red]">
                                    {errors && errors.permit_validity}
                                </p> */}
                            </FormItem>
                            <FormItem
                                label="Firm Registered State"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <select
                                    disabled={isDisabled}
                                    onChange={(e: any) => handleChange(e)}
                                    name="state_id"
                                    className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                >
                                    <option>Select</option>
                                    {ListOfState && ListOfState?.data?.map((item: any, index: any) => (
                                        <option value={item?.id} selected={item?.id === data?.state_id}>{item?.name}</option>

                                    ))}
                                </select>
                                {/* <p className="text-[red]">
                                    {errors && errors.pucc_validity}
                                </p> */}
                            </FormItem>
                            {/* <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="PUCC valid Till Date"
                                    component={Input}
                                /> */}
                        </div>
                        <div className="flex">
                        <FormItem
                                label="Firm Registered Address"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Firm Registered Address"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Firm Registered PIN Code"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Firm Registered PIN Code"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className="flex">
                        <FormItem
                                label="GST Number"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="GST Number"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                    </FormContainer>
                </Form>
            </Formik>

            {/* share holder details */}
            {firmType==='Private Limited' &&
            <>
                {Array.from({ length: shareHolder }, (_, index) => (<><h4 className="text-head-title text-center">Share Holder Information {index+1}</h4>
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
                                label="Share Holder Name"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Share Holder Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Share Holder Percentage"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Share Holder Percentage"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className="flex">
                        <FormItem
                                label="Share Holder Address"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Share Holder Address"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Share Holder Phone Number"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Share Holder Phone Number"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className="flex">
                            <FormItem
                                label="Share Holder Email address"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Share Holder Email address"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Share Holder Designation"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Share Holder Designation"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className="flex">
                            <FormItem
                                label="DIN Number"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="DIN Number"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Authorised Signatory"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={isDisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Authorised Signatory"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                    </FormContainer>
                </Form>
                </Formik></>))}
                
                <button className='w-full bg-gray-400 rounded-lg py-2 mb-4' onClick={()=>setShareHolder(partner+1)}>+ Add Another Share Holder</button>
            </>}

            {/* partner details */}
            {firmType==='Partnership' &&
            <>
                {Array.from({ length: partner }, (_, index) => (<><h4 className="text-head-title text-center">Partner Information {index+1}</h4>
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
                                label="Partner Name"
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
                                    placeholder="Partner Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Partner Percentage"
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
                                    placeholder="Partner Percentage"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className="flex">
                        <FormItem
                                label="Partner Address"
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
                                    placeholder="Partner Address"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Partner Phone Number"
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
                                    placeholder="Partner Phone Number"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className="flex">
                            <FormItem
                                label="Partner Email address"
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
                                    placeholder="Partner Email address"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Partner Designation"
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
                                    placeholder="Partner Designation"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className="flex">
                            <FormItem
                                label="DIN Number"
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
                                    placeholder="DIN Number"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Authorised Signatory"
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
                                    placeholder="Authorised Signatory"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                    </FormContainer>
                </Form>
                </Formik></>))}
                
                <button className='w-full bg-gray-400 rounded-lg py-2 mb-4' onClick={()=>setPartner(partner+1)}>+ Add Another Partner</button>
            </>}

            {/* branch details */}
            <div>
                {branch && <>
                <h4 className="text-head-title text-center">Branch Information</h4>
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
                            <FormItem
                                label="Branch Address"
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
                                    placeholder="Branch Address"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className="flex">
                        <FormItem
                                label="Branch GST"
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
                                    placeholder="Branch GST"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Branch Head"
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
                                    placeholder="Branch Head"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className="flex">
                        <FormItem
                                label="Branch Email Address"
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
                                    placeholder="Branch Email Address"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Branch Phone Number"
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
                                    placeholder="Branch Phone Number"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                    </FormContainer>
                </Form>
                </Formik>
                </>}
                <button className='w-full bg-gray-400 rounded-lg py-2' onClick={()=>setBranch(!branch)}>+ Add Branch Details</button>
            </div>

            {/* final submit button */}
            <div className='flex'>
            <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        disabled
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
        </div>
    </div>
  )
}

export default BasicInfo
