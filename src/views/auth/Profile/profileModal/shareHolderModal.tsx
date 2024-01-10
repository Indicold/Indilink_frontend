import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import useApiFetch from '@/store/customeHook/useApiFetch';
import { apiUrl, getToken } from '@/store/token';
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import usePostApi from '@/store/customeHook/postApi';
import { messageView, messageViewNew, validateEmail, validateMobile, validateSHForm } from '@/store/customeHook/validate';
import { ToastContainer } from 'react-toastify';
import usePutApi from '@/store/customeHook/putApi';
import { debounce } from 'lodash'
import { TokenInfo } from '@/store/customeHook/token';
const ShareHolderModal = ({companyDetails, modal, setModal, data, setData, formData, setformData,fetchShare }: any) => {
  const {company_id,company_name}:any=TokenInfo()
    const [isEmailValid, setIsEmailValid] = useState<any>(false)
    const [isMobileValid, setIsMobileValid] = useState<any>(false)
    const [phone, setPhone] = useState<any>('');
    const [error, setErrors] = useState<any>({})
    let { result: SHResponse, loading: SHLoading, sendPostRequest: SHPostDetails }: any = usePostApi(`auth/shareholder`);
    const { result: ShareUpadteResponse, loading: SULoading, sendPostRequest: PostShareUpdateDetails }: any = usePutApi(`auth/shareholder/${formData?.id}`);
    const validateEmailDebounced = debounce(validateEmail, 300)
    const validateMobileDebounced = debounce(validateMobile, 300)
    const isDisabled: any = false
    const handleChange = (e: any) => {
        const newdata: any = { ...formData };
        newdata[e.target.name] = e.target.value;
        if(e.target.name === 'shareholder_email'){
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail\.com$/.test(newdata?.shareholder_email)){
                validateEmailDebounced(e.target.value, setIsEmailValid)

            }
        }else if (e.target.name === 'phone_number') {
            if(e.target.value.replace(/[^0-9]/g, "").length > 0 && e.target.value.replace(/[^0-9]/g, "").length === 10)validateMobileDebounced(e.target.value.replace(/[^0-9]/g, ""), setIsMobileValid)
             setPhone(e.target.value.replace(/[^0-9]/g, ""))
        }
        setformData(newdata)
        if(error[e.target.name])validateSHForm(newdata, setErrors)
    }
console.log("companyDetails",companyDetails);

    const handlesubmit = () => {
        if (validateSHForm(formData, setErrors) && (isEmailValid === 'Eligible' || isEmailValid === false) && (isMobileValid === 'Eligible' || isMobileValid === false)) {
            if (formData?.type === 'Edit') {
                const object:any={
                    ...formData,
                    company_id:company_id?.toString(),
                    company_name:company_name || "indicold",
                    full_name:`${formData?.fname} ${formData?.lname}`,
                    firm_type:companyDetails?.data[0]?.firm_type
                }
                PostShareUpdateDetails(object)
                
            } else {
                const object:any={
                    ...formData,
                    company_id:company_id?.toString(),
                    company_name:company_name || "indicold",
                    full_name:`${formData?.fname} ${formData?.lname}`,
                    firm_type:companyDetails?.data[0]?.firm_type
                }
                SHPostDetails(object)
            }

        }
    }
    useEffect(() => {
        if (SHResponse) {
            messageViewNew(SHResponse)

            if (SHResponse?.status === 200) {
                fetchShare()
                localStorage.setItem("shareholder_ids", JSON.stringify([...data?.shareholder_ids, SHResponse?.data?.id]))
                setData({ ...data, shareholder_ids: [...data?.shareholder_ids, SHResponse?.data?.id] })
                setModal(false)
            }
            fetchShare()

        }
    }, [SHResponse, SHResponse?.message])
    useEffect(() => {
        if (ShareUpadteResponse) {
            messageViewNew(ShareUpadteResponse)

            if (ShareUpadteResponse?.status === 200) {
                localStorage.setItem("shareholder_ids", JSON.stringify([...data?.shareholder_ids, ShareUpadteResponse?.data?.id]))
                setData({ ...data, shareholder_ids: [...data?.shareholder_ids, ShareUpadteResponse?.data?.id] })
                setModal(false)
            }
            fetchShare()
        }
    }, [ShareUpadteResponse, ShareUpadteResponse?.message])
    
    return (
        <div>
            <ToastContainer />
            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="my-auto relative w-full max-w-[600px] max-h-full rounded-[13px]">
                    <div className="relative bg-white rounded-lg pt-4 pb-4 shadow dark:bg-gray-700">
                        <button
                            onClick={() => setModal(false)}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            formData-modal-hide="authentication-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div>
                            <h5 className="text-head-title text-center m-4 mt-4">Share Holder Information </h5>
                            <Formik
                                initialValues={{ field: true }}
                                onSubmit={() =>
                                    console.log('Submited via my onSubmit function')
                                }
                            >
                                <Form className="py-2 multistep-form-step">
                                    <FormContainer>
                                    <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%] md:flex lg:flex">
                                            <FormItem
                                                label="Share Holder First Name"
                                                className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                // className="rounded-lg pl-[22px] w-1/2"
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="fname"
                                                    value={formData?.fname}
                                                    placeholder="Share Holder First Name"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.fname}
                                                </p>
                                            </FormItem>
                                            <FormItem
                                                label="Share Holder Last Name"
                                                className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="lname"
                                                    value={formData?.lname}
                                                    placeholder="Share Holder Last Name"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.lname}
                                                </p>
                                            </FormItem>
                                        </div>
                                        <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%] md:flex lg:flex">
                                       {!(formData?.type ==="Edit" || formData?.type ==="View") && <FormItem
                                                label="Password"
                                                className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                asterisk={true}
                                           >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="password"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="password"
                                                    value={formData?.password}
                                                    placeholder="Password"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.password}
                                                </p>
                                            </FormItem>}
                                            <FormItem
                                                label="Share Holder Percentage"
                                                className={`rounded-lg  ${(formData?.type ==="Edit" || formData?.type ==="View")? 'pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto':'pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto' }`}
                                                // className={`rounded-lg  ${(formData?.type ==="Edit" || formData?.type ==="View")? 'w-full pl-[22px]':'w-1/2 pl-[22px]' }`}
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="number"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="percentage_holding"
                                                    value={formData?.percentage_holding}
                                                    placeholder="Share Holder Percentage"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.percentage_holding}
                                                </p>
                                            </FormItem>
                                        </div>
                                        <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%] md:flex lg:flex">
                                            <FormItem
                                                label="Share Holder Address"
                                                className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                // className="rounded-lg pl-[22px] w-1/2"
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="address"
                                                    value={formData?.address}
                                                    placeholder="Share Holder Address"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.address}
                                                </p>
                                            </FormItem>
                                            <FormItem
                                                label="Share Holder Phone Number"
                                                className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                // className="rounded-lg pl-[22px] w-1/2"
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="number"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="phone_number"
                                                    value={formData?.phone_number?.slice(0,10)}
                                                    placeholder="Share Holder Phone Number"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {isMobileValid ? isMobileValid : error?.phone_number}
                                                    {/* {error && error?.phone_number} */}
                                                </p>
                                            </FormItem>
                                        </div>
                                        <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%] md:flex lg:flex">
                                            <FormItem
                                                label="Share Holder Email address"
                                                className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                // className="rounded-lg pl-[22px] w-1/2"
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="shareholder_email"
                                                    value={formData?.shareholder_email}
                                                    placeholder="Share Holder Email address"
                                                    component={Input}
                                                />
                                                 <p className="text-[red] normal-case">
                                    {isEmailValid ? isEmailValid : error?.shareholder_email}
                                </p>
                                               
                                            </FormItem>
                                            <FormItem
                                                label="Share Holder Designation"
                                                className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                // className="rounded-lg pl-[22px] w-1/2"
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="designation"
                                                    value={formData?.designation}
                                                    placeholder="Share Holder Designation"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.designation}
                                                </p>
                                            </FormItem>
                                        </div>
                                        <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%] md:flex lg:flex">
                                            <FormItem
                                                label="DIN Number"
                                                className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                // className="rounded-lg pl-[22px] w-1/2"
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="din_number"
                                                    value={formData?.din_number}
                                                    placeholder="DIN Number"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.din_number}
                                                </p>
                                            </FormItem>
                                            <FormItem
                                                label="Authorised Signatory"
                                                className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                // className="rounded-lg pl-[22px] w-1/2"
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="authorized_signatory"
                                                    value={formData?.authorized_signatory}
                                                    placeholder="Authorised Signatory"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.authorized_signatory}
                                                </p>
                                            </FormItem>
                                        </div>
                                        {/* <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%] md:flex lg:flex">
                                            <FormItem
                                                label="Password"
                                                className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="password"
                                                    value={formData?.password}
                                                    placeholder="Password"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.password}
                                                </p>
                                            </FormItem>
                                        
                                        </div> */}
                                        <div className='m-auto mt-2 rounded-md p-2 gap-6 w-[80%] md:flex lg:flex'>
                                            <Button
                                                style={{ borderRadius: '13px' }}
                                                block
                                                variant="solid"
                                                type="button"
                                                role='button'
                                                onClick={() => setModal(false)}
                                                className="!lg:w:1/2 sm:w:1/2 md:w:1/2 indigo-btn !bg-gray-500 indigo-btn mt-4 mx-auto rounded-xl shadow-lg"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                block
                                                style={{ borderRadius: "13px" }}
                                                // loading={isSubmitting}
                                                disabled={formData?.type === 'View'}
                                                variant="solid"
                                                onClick={handlesubmit}
                                                className='indigo-btn mt-4 w-[100%] lg:w:1/2 mx-auto rounded-xl shadow-lg'
                                            >
                                                {formData?.type === 'Edit'
                                                    ? 'Update'
                                                    : 'Save'}
                                            </Button>
                                        </div>
                                    </FormContainer>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ShareHolderModal
