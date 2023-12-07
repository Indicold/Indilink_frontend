import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import useApiFetch from '@/store/customeHook/useApiFetch';
import { apiUrl, getToken } from '@/store/token';
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { messageView, validateBranchForm } from '@/store/customeHook/validate';
import usePostApi from '@/store/customeHook/postApi';
import { ToastContainer } from 'react-toastify';
import usePutApi from '@/store/customeHook/putApi';
const BranchsModal = ({ modal, setModal, data, setData,formData,setformData,fetchBranch }: any) => {

    const [error, setErrors] = useState<any>({})
    let { result: BranchResponse, loading: SHLoading, sendPostRequest: SHPostDetails }: any = usePostApi(`auth/branch`);
    const { result: BranchUpadteResponse, loading: BULoading, sendPostRequest: PostBranchUpdateDetails }: any = usePutApi(`auth/branch/${formData?.id}`);
    const [phone, setPhone] = useState(formData?.branch_phone || '')

    const isDisabled: any = false;
    const handleChange = (e: any) => {
        const newdata: any = { ...formData };
        if(e.target.name === 'branch_phone') {
            if(e.target.value.length<=10)  {
                newdata[e.target.name] = e.target.value
                setPhone(e.target.value);
            }
        } else {
            newdata[e.target.name] = e.target.value;
        }
        setformData(newdata)
        if(error[e.target.name])validateBranchForm(newdata, setErrors)
    }
    const handlesubmit = () => {
        if (validateBranchForm(formData, setErrors)) {
            if (formData?.type === 'Edit') {
                PostBranchUpdateDetails(formData)
            }else{
                SHPostDetails(formData)
            }
         
        }
    }
    useEffect(() => {
        if (BranchResponse) {
            messageView(BranchResponse?.message)

            if (BranchResponse?.status === 200) {
                localStorage.setItem("branch_ids", JSON.stringify([...data?.branch_ids, BranchResponse?.data?.id]))
                setData({ ...data, branch_ids: [...data?.branch_ids, BranchResponse?.data?.id] })
                setModal(false)
            }
            fetchBranch()
        }
    }, [BranchResponse, BranchResponse?.message]);
    useEffect(() => {
        if (BranchUpadteResponse) {
            messageView(BranchUpadteResponse?.message)

            if (BranchUpadteResponse?.status === 200) {
                localStorage.setItem("shareholder_ids", JSON.stringify([...data?.branch_ids, BranchUpadteResponse?.data?.id]))
                setData({ ...data, branch_ids: [...data?.branch_ids, BranchUpadteResponse?.data?.id] })
                setModal(false)
            }
            fetchBranch()
        }
    }, [BranchUpadteResponse, BranchUpadteResponse?.message])
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
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            onClick={() => setModal(false)}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            formformData-modal-hide="authentication-modal"
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
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div>
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
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="name"
                                                    value={formData?.name}
                                                    placeholder="Branch Name"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.name}
                                                </p>
                                            </FormItem>
                                            <FormItem
                                                label="Branch Address"
                                                className="rounded-lg pl-[22px] w-1/2"
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
                                                    placeholder="Branch Address"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.address}
                                                </p>
                                            </FormItem>
                                        </div>
                                        <div className="flex">
                                            <FormItem
                                                label="Branch GST"
                                                className="rounded-lg pl-[22px] w-1/2"
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="branch_gst"
                                                    value={formData?.branch_gst}
                                                    placeholder="Branch GST"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.branch_gst}
                                                </p>
                                            </FormItem>
                                            <FormItem
                                                label="Branch Head"
                                                className="rounded-lg pl-[22px] w-1/2"
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="branch_email"
                                                    value={formData?.branch_email}
                                                    placeholder="Branch Head"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.branch_email}
                                                </p>
                                            </FormItem>
                                        </div>
                                        <div className="flex">
                                            <FormItem
                                                label="Branch Email Address"
                                                className="rounded-lg pl-[22px] w-1/2"
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="branch_head"
                                                    value={formData?.branch_head}
                                                    placeholder="Branch Email Address"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.branch_head}
                                                </p>
                                            </FormItem>
                                            <FormItem
                                                label="Branch Phone Number"
                                                className="rounded-lg pl-[22px] w-1/2"
                                                asterisk={true}
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="number"
                                                    maxLength={10}
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="branch_phone"
                                                    value={phone}
                                                    placeholder="Branch Phone Number"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.branch_phone}
                                                </p>
                                            </FormItem>
                                        </div>
                                        <div className='flex'>
                                            <Button
                                                style={{ borderRadius: '13px' }}
                                                block
                                                variant="solid"
                                                type="button"
                                                role='button'
                                                onClick={() => setModal(false)}
                                                className="indigo-btn !w-[200px] !bg-gray-500 m-4 mx-auto rounded-[30px]"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                block
                                                style={{ borderRadius: "13px" }}
                                                // loading={isSubmitting}
                                                disabled={formData?.isdisabled}
                                                variant="solid"
                                                onClick={handlesubmit}
                                                className='indigo-btn mt-4 !w-[30%] mx-auto rounded-xl shadow-lg'
                                            >
                                                Save & Next
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

export default BranchsModal
