import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import useApiFetch from '@/store/customeHook/useApiFetch';
import { apiUrl, getToken } from '@/store/token';
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { messageView, messageViewNew, onkeyDownBankacNum, onkeyDownBankifscCode, onkeyDownforSpecialCharcter, validateAccountForm, validateBranchForm, validateKeyForm } from '@/store/customeHook/validate';
import usePostApi from '@/store/customeHook/postApi';
import { ToastContainer } from 'react-toastify';
import usePutApi from '@/store/customeHook/putApi';
import axios from 'axios';
const AccountModal = ({ data, setData, modal, setModal, fetchData }: any) => {
    const navigate: any = useNavigate();
    const [error, setErrors] = useState<any>({})
    const { token }: any = getToken();
    const { data: ListOfCountry, loading: LCloading, error: LCerror } =
        useApiFetch<any>(`master/get-countries`, token);
    const { data: ListOfState, loading: LSloading, error: LSerror } =
        useApiFetch<any>(`master/get-state-by-Id/${data?.country_id}`, token);

    const { data: ListOfcity, loading: Lcloading, error: Lcerror } =
        useApiFetch<any>(`master/get-city-by-countryId/${data?.country_id}`, token);

    const { data: ListOfRole, loading: LORloading, error: LORerror } =
        useApiFetch<any>(`master/profile/get-platform-roles`, token);
    let { result: Accountesponse, loading: AccountLoading, sendPostRequest: AccountPostDetails }: any = usePostApi(`auth/account-detail`);
    let { result: AccountUpdateesponse, loading: AccountUpdateLoading, sendPostRequest: AccountUpdatePost }: any = usePutApi(`auth/account-detail/${data?.id}`);

    const handleChange = (e: any) => {
        const newdata: any = { ...data };
        if (e.target.name === 'cancelled_cheque') {
            newdata[e.target.name] = e.target.files[0];
        } else {
            newdata[e.target.name] = e.target.value;
        }

        setData(newdata)
        if(error[e.target.name])validateAccountForm(newdata, setErrors);
        
    }
    const handlesubmit = () => {
        if (validateAccountForm(data, setErrors)) {
            let formdata = new FormData();
            formdata.append("account_name", data?.account_name);
            formdata.append("account_number", data?.account_number);
            formdata.append("bank_name", data?.bank_name);
            formdata.append("bank_ifsc", data?.bank_ifsc);
            formdata.append("branch_name", data?.branch_name);
            formdata.append("is_default", "0");
            formdata.append("cancelled_cheque", data?.cancelled_cheque);
            if (data?.type === 'Edit') {
                fetch(`${apiUrl}/auth/account-detail/${data?.id}`, {
                    method: 'PUT',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                    body: formdata,
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error('Network response was not ok');
                      }
                      return response.json(); // or response.text() depending on the response content type
                    })
                    .then((data) => {
                        messageViewNew(data)
                        if(data?.status==200){
                            fetchData()
                            setModal(false)
                        }
                        fetchData()
                      // Handle the response data here
                    })
                    .catch((error) => {
                      // Handle any errors here
                      console.error('Error:', error);
                    });
                // AccountUpdatePost(data)

            } else {
                fetch(`${apiUrl}/auth/account-detail`, {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                    body: formdata,
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error('Network response was not ok');
                      }
                      return response.json(); // or response.text() depending on the response content type
                    })
                    .then((data) => {
                        messageViewNew(data)
                        if(data?.status==200){
                            fetchData()
                            setModal(false)
                        }
                        fetchData()
                      // Handle the response data here
                    })
                    .catch((error) => {
                      // Handle any errors here
                      console.error('Error:', error);
                    });
                  
                // AccountPostDetails(formdata)
            }

        }
    }
  
    useEffect(() => {
        messageViewNew(Accountesponse)
        if (Accountesponse?.status == 200) {
            fetchData()
            setTimeout(() => {
                setModal(false)
                fetchData()

            }, 2000)
        }
    }, [Accountesponse?.status])
    useEffect(() => {
        messageViewNew(AccountUpdateesponse)
        if (AccountUpdateesponse?.status == 200) {
            fetchData()
            setTimeout(() => {
                setModal(false)
                fetchData()

            }, 2000)
        }
    }, [AccountUpdateesponse?.status])

    return (
        <div>
            <div>
                <ToastContainer />
                <div
                    id="authentication-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="my-auto relative w-full max-w-[800px] max-h-full rounded-[13px]">
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
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div>
                                <h4 className="text-head-title pt-4 text-center">Account Details</h4>
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
                                                    label="Account Name"
                                                    className="pl-3  w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                    asterisk={true}
                                                >
                                                    <Field
                                                        disabled={data?.isdisabled}
                                                        type="text"
                                                        autoComplete="off"
                                                        onChange={(e: any) =>
                                                            handleChange(e)
                                                        }
                                                        name="account_name"
                                                        value={data?.account_name}
                                                        onKeyDown={onkeyDownforSpecialCharcter}
                                                        placeholder="Account Name"
                                                        component={Input}
                                                    />
                                                    <p className='text-[red] text-p-error-hight'>{error && error.account_name}</p>
                                                </FormItem>
                                                <FormItem
                                                    label="Account Number"
                                                    className="pl-3  w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                    asterisk={true}
                                                >
                                                    <Field
                                                        disabled={data?.isdisabled}
                                                        type="number"
                                                        autoComplete="off"
                                                        onChange={(e: any) =>
                                                            handleChange(e)
                                                        }
                                                        name="account_number"
                                                        value={data?.account_number}
                                                        placeholder="Account Number"
                                                        component={Input}
                                                        onKeyDown={onkeyDownBankacNum}
                                                    />
                                                    <p className='text-[red] text-p-error-hight'>{error && error.account_number}</p>
                                                </FormItem>
                                            </div>
                                            <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%] md:flex lg:flex">
                                                <FormItem
                                                    label="Bank Name"
                                                    className="pl-3  w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                    asterisk={true}
                                                >
                                                    <Field
                                                        disabled={data?.isdisabled}
                                                        type="text"
                                                        autoComplete="off"
                                                        onChange={(e: any) =>
                                                            handleChange(e)
                                                        }
                                                        onKeyDown={onkeyDownforSpecialCharcter}
                                                        name="bank_name"
                                                        value={data?.bank_name}
                                                        placeholder="Bank Name"
                                                        component={Input}
                                                    />
                                                    <p className='text-[red] text-p-error-hight'>{error && error.bank_name}</p>
                                                </FormItem>
                                                <FormItem
                                                    label="Bank IFSC Code"
                                                    className="pl-3  w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                    asterisk={true}
                                                >
                                                    <Field
                                                        disabled={data?.isdisabled}
                                                        type="text"
                                                        autoComplete="off"
                                                        onChange={(e: any) =>
                                                            handleChange(e)
                                                        }
                                                        name="bank_ifsc"
                                                        value={data?.bank_ifsc}
                                                        placeholder="Bank IFSC Code"
                                                        component={Input}
                                                        onKeyDown={onkeyDownforSpecialCharcter}
                                                    />
                                                    <p className='text-[red] text-p-error-hight'>{error && error.bank_ifsc}</p>
                                                </FormItem>
                                            </div>
                                            <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%] md:flex lg:flex">
                                                <FormItem
                                                    label="Branch Name"
                                                    className="pl-3  w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                    asterisk={true}
                                                >
                                                    <Field
                                                        disabled={data?.isdisabled}
                                                        type="text"
                                                        autoComplete="off"
                                                        onChange={(e: any) =>
                                                            handleChange(e)
                                                        }
                                                        onKeyDown={onkeyDownforSpecialCharcter}
                                                        name="branch_name"
                                                        value={data?.branch_name}
                                                        placeholder="Branch Name"
                                                        component={Input}
                                                    />
                                                    <p className='text-[red] text-p-error-hight'>{error && error.branch_name}</p>
                                                </FormItem>
                                                <FormItem
                                                    label="Cancel Cheque"
                                                    className="pl-3  w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                                    asterisk={true}
                                                >
                                                    <Field
                                                   disabled={data?.isdisabled}
                                                        multiple
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        className="w-full"
                                                        autoComplete="off"
                                                        onChange={(e: any) =>
                                                            handleChange(e)
                                                        }
                                                        name="cancelled_cheque"
                                                        placeholder="GST Number"
                                                        component={Input}
                                                    />


                                                    <p className="text-[red]  text-p-error-hight">
                                                        {error && error.cancelled_cheque}
                                                    </p>
                                                </FormItem>
                                            </div>
                                            <div className='flex gap-8 lg:pl-20 lg:pr-20 pl-10 pr-10'>
                                                <Button
                                                    style={{ borderRadius: '13px' }}
                                                    block
                                                    variant="solid"
                                                    type="button"
                                                    role='button'
                                                    onClick={() => setModal(false)}
                                                    className="indigo-btn !bg-gray-500 m-4 mx-auto rounded-[30px]"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    block
                                                    style={{ borderRadius: "13px" }}
                                                    // loading={isSubmitting}
                                                    disabled={data?.isdisabled}
                                                    variant="solid"
                                                    onClick={handlesubmit}
                                                    className='indigo-btn mt-4 mx-auto rounded-xl shadow-lg'
                                                >
                                                    Save

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
        </div>
    )
}

export default AccountModal
