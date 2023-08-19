import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFormData } from '@/store/slices/Authentication/userDetails'
import { userRegisterPostApi, usergetOTPPostApi, userverifyOTPPostApi } from '@/store'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/ui'

interface BasicInformationFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type BasicInformationFormSchema = {
    first_name: string
    last_name: string
    password: string
    confirm_password: string
    email: string
    phone_number: string
    term_condition:String
    gst:String
}


const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter your user name'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'Your passwords do not match'
    ),
})

const BasicInformationForm = (props: BasicInformationFormProps) => {
    const selector=useSelector((state:any)=>state?.auth)
    const [isSubmitting,setSubmitting]=useState(false)
    const [otp,setOtp]=useState('')
     const [formData, setFormData] = useState(selector?.details?.data);
    const { className } = props
    const dispatch=useDispatch()
    const { signUp } = useAuth()
const autoFilldata=selector?.apiGstDetailsReducer?.responseData?.message;
    const [ otpModal, setOtpModal ] = useState(false)
const navigate=useNavigate();
    const [message, setMessage] = useTimeOutMessage()

   

    const handleFinalSubmit = async (e:any) => {
       e.preventDefault();
        console.log("gggggg",selector?.apiPostverifyOtpReducer?.responseData?.message);
        
        dispatch(userverifyOTPPostApi({user_id:selector?.apiGetOtpReducer?.responseData?.user_id,otp:otp}))
        
        if (selector?.apiPostverifyOtpReducer?.responseData?.message=="OTP verified successfully") {
            setOtpModal(false)
            navigate('/sign-in')
        
        }
            
     
    }

   
    const handleChange=(e:any)=>{
        const newData:any={...formData};
        newData[e.target.name]=e.target.value;
        setFormData(newData);
        if(newData?.gst?.length==16){
            console.log("hghfghf");
            dispatch(updateFormData(formData));
console.log("SSSSSSSS",selector?.apiGetAuthOtpReducer?.responseData?.message,message);
dispatch(userRegisterPostApi(formData))
setMessage(selector?.apiGetAuthOtpReducer?.responseData?.message)


}

       
            }
            const handlesubmit=()=>{
                setSubmitting(true)
                setOtpModal(true)
                
                dispatch(usergetOTPPostApi(formData));
                console.log("ggggg9999",selector);

                setSubmitting(false)

            }
            console.log("JJJJJJJ666oooo",selector?.apiGstDetailsReducer?.responseData?.message);

            

    return (
        <div className={className}>
            {/* {selector?.apiGetAuthOtpReducer?.responseData?.message && (
                <Alert showIcon className="mb-4" type="danger">
                    {selector?.apiGetAuthOtpReducer?.responseData?.message}
                </Alert>
            )} */}


        {otpModal?
        <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={()=>setOtpModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">An OTP has been sent to your email. Please enter here.</h3>
                        <form className="space-y-6" onSubmit={(e)=>handleFinalSubmit(e)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OTP</label>
                                <div className="otp mx-auto">
                                    <input type='text' className='w-full p-4 rounded-[3px]' placeholder='Enter OTP here.' onChange={(e:any)=>setOtp(e.target.value)} />
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Didn't receive email? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Resend OTP</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>:<></>}

            <Formik
                initialValues={{
                    country:"india",
                    gst:autoFilldata?.taxpayerInfo?.gstin,
                    pancardno:autoFilldata?.taxpayerInfo?.panNo,
                    designation:autoFilldata?.taxpayerInfo?.ctb,
                    firmName:autoFilldata?.taxpayerInfo?.tradeNam,
                    firm:autoFilldata?.taxpayerInfo?.pradr?.ntr,
                }}
                validationSchema={validationSchema}
           
            >
                    <Form className='signup-form'>
                        <FormContainer>
                        <FormItem
                            label="CIN No"
                            className='mx-auto cin-number'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="CIN No"
                                onChange={(e:any)=>handleChange(e)}
                                component={Input}
                                className=''
                            />
                        </FormItem>
                            <div className="flex">
                                <FormItem
                                    label="Country"
                                  
                                    className='me-auto'
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="country"
                                        placeholder="Country"
                                        component={Input}
                                        className=''
                                    />
                                </FormItem>
                                <FormItem
                                    label="Pan Card No."
                                 
                                    className='me-auto'
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="pancardno"
                                        placeholder="Pan Card No."
                                        component={Input}
                                        className=''
                                    />
                                </FormItem>
                            </div>

                            <div className="flex">
                                <FormItem
                                    label="User Designation"
                                   
                                    className='me-auto'
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="designation"
                                        placeholder="User Designation"
                                        component={Input}
                                        className=''
                                    />
                                </FormItem>
                                <FormItem
                                    label="Firm Type"
                                   
                                    className='me-auto'
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="firm"
                                        placeholder="Firm Type"
                                        component={Input}
                                        className=''
                                    />
                                </FormItem>
                            </div>
                            
                            <div className="flex">
                                <FormItem
                                    label="Firm Name"
                                   
                                    className='me-auto'
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="firmName"
                                        placeholder="Firm Name"
                                        component={Input}
                                        className=''
                                    />
                                </FormItem>
                                
                            </div>

                            <div className='flex'>
                                <Button
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    onClick={handlesubmit}
                                    className='signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                                >
                                    {isSubmitting
                                        ? 'Creating Account...'
                                        : 'Submit'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
            </Formik>
        </div>
    )
}

export default BasicInformationForm;
