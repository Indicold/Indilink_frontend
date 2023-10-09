import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import useApiFetch from '@/store/customeHook/useApiFetch';
import { apiUrl, getToken } from '@/store/token';
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { messageView, validateBranchForm, validateKeyForm } from '@/store/customeHook/validate';
import usePostApi from '@/store/customeHook/postApi';
import { ToastContainer } from 'react-toastify';
import usePutApi from '@/store/customeHook/putApi';
const KeyModal = ({data,setData,modal,setModal,fetchData}:any) => {
    const navigate:any=useNavigate();
    const [error,setErrors]=useState<any>({})
    const {token}:any=getToken();
    const { data: ListOfCountry, loading: LCloading, error: LCerror } =
    useApiFetch<any>(`master/get-countries`, token);
    const { data: ListOfState, loading: LSloading, error: LSerror } =
    useApiFetch<any>(`master/get-state-by-Id/${data?.country_id}`, token);

    const { data: ListOfcity, loading: Lcloading, error: Lcerror } =
    useApiFetch<any>(`master/get-city-by-countryId/${data?.country_id}`, token);

    const { data: ListOfRole, loading: LORloading, error: LORerror } =
    useApiFetch<any>(`master/profile/get-platform-roles`, token);
    let { result: Keyesponse, loading: KeyLoading, sendPostRequest: KeyPostDetails }: any = usePostApi(`auth/key-mgmt`);
    let { result: KeyUpdateesponse, loading: KeyUpdateLoading, sendPostRequest: KeyUpdatePost }: any = usePutApi(`auth/key-mgmt/${data?.id}`);
    
    const handleChange = (e:any) => {
        const newdata:any={...data};
        newdata[e.target.name]=e.target.value;
        setData(newdata)
        console.log("changed")
    }
    const handlesubmit=()=>{
        if(validateKeyForm(data,setErrors)){
            if(data?.type==='Edit'){
                console.log("huyt")
                KeyUpdatePost(data)
            }else{
               
                KeyPostDetails(data)
            }
            fetchData()
        }
    }
    console.log("FFFFFFF",data);
    useEffect(()=>{
        messageView(Keyesponse?.message)
        if(Keyesponse?.status==200){
            setData({})
            fetchData()
            setTimeout(()=>{
         setModal(false)

            },2000)
        }
    },[Keyesponse?.status])
    useEffect(()=>{
        messageView(KeyUpdateesponse?.message)
        if(KeyUpdateesponse?.status==200){
            fetchData()
            setTimeout(()=>{
         setModal(false)

            },2000)
        }
    },[KeyUpdateesponse?.status])
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
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div>
                        <h4 className="text-head-title text-center">Key Management Personnel</h4>
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
                                label="Name"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={data?.isdisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="full_name"
                                    value={data?.full_name}
                                    placeholder="Name"
                                    component={Input}
                                />
                                   <p className="text-[red]">
                                        {error && error.full_name}
                                    </p>
                            </FormItem>
                            <FormItem
                                label="Email Address"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={data?.isdisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="person_email"
                                    value={data?.person_email}
                                    placeholder="Email Address"
                                    component={Input}
                                />
                                 <p className="text-[red]">
                                        {error && error.person_email}
                                    </p>
                            </FormItem>
                        </div>
                        <div className="flex">
                        <FormItem
                                label="Designation"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={data?.isdisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="designation"
                                    value={data?.designation}
                                    placeholder="Designation"
                                    component={Input}
                                />
                                <p className="text-[red]">
                                        {error && error.designation}
                                    </p>
                            </FormItem>
                            <FormItem
                                label="Address"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={data?.isdisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="address"
                                    value={data?.address}
                                    placeholder="Address"
                                    component={Input}
                                />
                                  <p className="text-[red]">
                                        {error && error.address}
                                    </p>
                            </FormItem>
                        </div>
                        <div className="flex">
                        
                            <div className="flex">
                            <FormItem
                                    label="City"
                                    className="rounded-lg pl-[22px] !w-1/2"
                                >

                                            <select
                                        disabled={data?.isdisabled}
                                        onChange={(e: any) => handleChange(e)}
                                        name="city_id"
                                        className="h-11 border w-[175px] input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                    >
                                        <option>Select</option>
                                        {ListOfcity && ListOfcity?.data?.map((item: any, index: any) => (
                                            <option value={item?.id} selected={item?.id === data?.city_id}>{item?.name}</option>

                                        ))}
                                    </select>
                                    <p className="text-[red]">
                                        {error && error.city_id}
                                    </p>
                                </FormItem>
                                <FormItem
                                    label="State"
                                    className="rounded-lg pl-[22px] w-1/2"
                                >
                                         <select
                                        disabled={data?.isdisabled}
                                        onChange={(e: any) => handleChange(e)}
                                        name="state_id"
                                        className="h-11 border w-[175px] input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                    >
                                        <option>Select</option>
                                        {ListOfState && ListOfState?.data?.map((item: any, index: any) => (
                                            <option value={item?.id} selected={item?.id === data?.state_id}>{item?.name}</option>

                                        ))}
                                    </select>
                                    <p className="text-[red]">
                                        {error && error.state_id}
                                    </p>
                                </FormItem>
                            </div>
                            
                            <div className="flex">
                            <FormItem
                                    label="Country"
                                    className="rounded-lg pl-[22px]"
                                >
                                        <select
                                        disabled={data?.isdisabled}
                                        onChange={(e: any) => handleChange(e)}
                                        name="country_id"
                                        className="h-11 border w-[175px] input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                    >
                                        <option>Select</option>
                                        {ListOfCountry && ListOfCountry?.data?.map((item: any, index: any) => (
                                            <option value={item?.id} selected={item?.id === data?.country_id}>{item?.name}</option>

                                        ))}
                                    </select>
                                    <p className="text-[red]">
                                        {error && error.country_id}
                                    </p>
                                </FormItem>
                                <FormItem
                                    label="PIN Code"
                                    className="rounded-lg pl-[22px] w-1/2"
                                >
                                    <Field
                                        disabled={data?.isdisabled}
                                        type="text"
                                        autoComplete="off"
                                        onChange={(e: any) =>
                                            handleChange(e)
                                        }
                                        name="pin_code"
                                        value={data?.pin_code}
                                        placeholder="PIN Code"
                                        component={Input}
                                    />
                                      <p className="text-[red]">
                                        {error && error.pin_code}
                                    </p>
                                </FormItem>
                            </div>
                        </div>
                        <div className="flex">
                        <FormItem
                                label="Aadhar Card"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={data?.isdisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="aadhar"
                                    value={data?.aadhar}
                                    placeholder="Aadhar Card"
                                    component={Input}
                                />
                                 <p className="text-[red]">
                                        {error && error.aadhar}
                                    </p>
                            </FormItem>
                            <FormItem
                                label="Contact no."
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={data?.isdisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="contact_number"
                                    value={data?.contact_number}
                                    placeholder="Contact no."
                                    component={Input}
                                />
                                 <p className="text-[red]">
                                        {error && error.contact_number}
                                    </p>
                            </FormItem>
                        </div>
                        <div className="flex">
                            {/* <FormItem
                                label="Aadhar Card"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                <Field
                                    disabled={data?.isdisabled}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e: any) =>
                                        handleChange(e)
                                    }
                                    name="pucc_validity"
                                    value={data?.firm_state}
                                    placeholder="Aadhar Card"
                                    component={Input}
                                />
                                  
                            </FormItem> */}
                            <FormItem
                                label="Platform Role"
                                className="rounded-lg pl-[22px] w-1/2"
                            >
                                       <select
                                        disabled={data?.isdisabled}
                                        onChange={(e: any) => handleChange(e)}
                                        name="platform_role_id"
                                        className="h-11 border input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                    >
                                        <option>Select</option>
                                        {ListOfRole && ListOfRole?.data?.map((item: any, index: any) => (
                                            <option value={item?.id} selected={item?.id === data?.platform_role_id}>{item?.name}</option>

                                        ))}
                                    </select>
                                    <p className="text-[red]">
                                        {error && error.platform_role_id}
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
                                onClick={()=>setModal(false)}
                                className="indigo-btn !w-[200px] !bg-gray-500 m-4 mx-auto rounded-[30px]"
                            >
                                Cancel
                            </Button>
                            <Button
                                block
                                style={{borderRadius:"13px"}}
                                // loading={isSubmitting}
                                disabled={data?.type==='View'}
                                variant="solid"
                                onClick={handlesubmit}
                                className='indigo-btn mt-4 !w-[30%] mx-auto rounded-xl shadow-lg'
                            >
                               
                                Submit
                                   
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

export default KeyModal
