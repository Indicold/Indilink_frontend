import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import useApiFetch from '@/store/customeHook/useApiFetch';
import { apiUrl, getToken } from '@/store/token';
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import usePostApi from '@/store/customeHook/postApi';
import { messageView, validateSHForm } from '@/store/customeHook/validate';
import { ToastContainer } from 'react-toastify';
import usePutApi from '@/store/customeHook/putApi';

const ShareHolderModal = ({ modal, setModal, data, setData, formData, setformData,fetchShare }: any) => {

    const [error, setErrors] = useState<any>({})
    let { result: SHResponse, loading: SHLoading, sendPostRequest: SHPostDetails }: any = usePostApi(`${apiUrl}/auth/shareholder`);
    const { result: ShareUpadteResponse, loading: SULoading, sendPostRequest: PostShareUpdateDetails }: any = usePutApi(`${apiUrl}/auth/shareholder/${formData?.id}`);

    const isDisabled: any = false
    const handleChange = (e: any) => {
        const newdata: any = { ...formData };
        newdata[e.target.name] = e.target.value;
        setformData(newdata)
        console.log("changed", newdata)
    }
    const handlesubmit = () => {
        if (validateSHForm(formData, setErrors)) {
            if (formData?.type === 'Edit') {
                const body:any={
                    full_name:formData?.full_name,
                    percentage_holding:formData?.percentage_holding,
                    address:formData?.address,
                    phone_number:formData?.phone_number,
                    shareholder_email:formData?.shareholder_email,
                    designation:formData?.designation,
                    din_number:formData?.din_number,
                    authorized_signatory:formData?.authorized_signatory
                }
                PostShareUpdateDetails(body)
            } else {
                SHPostDetails(formData)
            }

        }
    }
    useEffect(() => {
        if (SHResponse) {
            messageView(SHResponse?.message)

            if (SHResponse?.status === 200) {
                localStorage.setItem("shareholder_ids", JSON.stringify([...data?.shareholder_ids, SHResponse?.data?.id]))
                setData({ ...data, shareholder_ids: [...data?.shareholder_ids, SHResponse?.data?.id] })
                setModal(false)
            }
            fetchShare()

        }
    }, [SHResponse, SHResponse?.message])
    useEffect(() => {
        if (ShareUpadteResponse) {
            messageView(ShareUpadteResponse?.message)

            if (ShareUpadteResponse?.status === 200) {
                localStorage.setItem("shareholder_ids", JSON.stringify([...data?.shareholder_ids, ShareUpadteResponse?.data?.id]))
                setData({ ...data, shareholder_ids: [...data?.shareholder_ids, ShareUpadteResponse?.data?.id] })
                setModal(false)
            }
            fetchShare()
        }
    }, [ShareUpadteResponse, ShareUpadteResponse?.message])
    console.log("RESSSSS", data);
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
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
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

                                        <div className="flex">
                                            <FormItem
                                                label="Share Holder Name"
                                                className="rounded-lg pl-[22px] w-1/2"
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="full_name"
                                                    value={formData?.full_name}
                                                    placeholder="Share Holder Name"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.full_name}
                                                </p>
                                            </FormItem>
                                            <FormItem
                                                label="Share Holder Percentage"
                                                className="rounded-lg pl-[22px] w-1/2"
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
                                        <div className="flex">
                                            <FormItem
                                                label="Share Holder Address"
                                                className="rounded-lg pl-[22px] w-1/2"
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
                                                className="rounded-lg pl-[22px] w-1/2"
                                            >
                                                <Field
                                                    disabled={formData?.isdisabled}
                                                    type="number"
                                                    autoComplete="off"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="phone_number"
                                                    value={formData?.phone_number}
                                                    placeholder="Share Holder Phone Number"
                                                    component={Input}
                                                />
                                                <p className='text-[red]'>
                                                    {error && error?.phone_number}
                                                </p>
                                            </FormItem>
                                        </div>
                                        <div className="flex">
                                            <FormItem
                                                label="Share Holder Email address"
                                                className="rounded-lg pl-[22px] w-1/2"
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
                                                <p className='text-[red]'>
                                                    {error && error?.shareholder_email}
                                                </p>
                                            </FormItem>
                                            <FormItem
                                                label="Share Holder Designation"
                                                className="rounded-lg pl-[22px] w-1/2"
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
                                        <div className="flex">
                                            <FormItem
                                                label="DIN Number"
                                                className="rounded-lg pl-[22px] w-1/2"
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
                                                className="rounded-lg pl-[22px] w-1/2"
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
                                                disabled={formData?.type === 'View'}
                                                variant="solid"
                                                onClick={handlesubmit}
                                                className='indigo-btn mt-4 !w-[30%] mx-auto rounded-xl shadow-lg'
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
