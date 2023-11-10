/* 
* The above code is a TypeScript React component that represents a form for collecting basic information from a
* user. It includes form validation using Yup, form submission handling, and API calls using custom hooks. 
* The form includes fields for user name, email, password, and confirm password. 
* It also includes fields for CIN No/GST, country, Pan Card No., user designation, firm type, and firm name. 
* The form is wrapped in a Formik component for managing form state and validation. 
* The form submission is handled by the handlesubmit function, which sends a POST request to the API endpoint. 
*/
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFormData } from '@/store/slices/Authentication/userDetails'
import { useNavigate } from 'react-router-dom'
import usePostApi from '@/store/customeHook/postApi'
import usePutApi from '@/store/customeHook/putApi';
import { apiUrl } from '@/store/customeHook/token';
import Tooltip from '@mui/material/Tooltip';

interface BasicInformationFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}




/* The above code is defining a validation schema using Yup for a form in a TypeScript React
application. The validation schema specifies the validation rules for each field in the form. */
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
    const selector = useSelector((state: any) => state?.auth)
    const [isSubmitting, setSubmitting] = useState(false)
    const [isDisabled, setDisabled] = useState(true)
    const [otp, setOtp] = useState('')
    const [seconds, setSeconds] = useState(10);
    const [formData, setFormData] = useState(selector?.details?.data);
    const [GSTRes, setGSTRes] = useState({});
    let { result: OTPPostDetails, loading, sendPostRequest }:any = usePostApi(`auth/getOTP`);
    let { result: GSTResponse, loading: GSTLoading, sendPostRequest: FetchGSTDetails }:any = usePostApi(`auth/getGstDetails`);
    const { result: OTPResponse, loading: OTPLoading, sendPostRequest: PostOTPDetails }:any = usePutApi(`auth/verifyOTP`);
    const { className }:any = props
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const autoFilldata:any = GSTResponse?.message;
    const [otpModal, setOtpModal] = useState(false)
    const [invalidPanMessage, showInvalidPanMessage] = useState(false);



    /**
     * The function `handleFinalSubmit` is an asynchronous function that handles the final submission
     * of OTP details by making a POST request with the user ID and OTP.
     * @param {any} e - The parameter `e` is an event object that is passed to the function when it is
     * triggered. It is commonly used to prevent the default behavior of an event, such as form
     * submission, by calling the `preventDefault()` method on it.
     */
    const handleFinalSubmit = async (e: any) => {
        e.preventDefault();
        
        if (otp) {
            let obj: any = { user_id: OTPPostDetails?.user_id, otp: otp };
            PostOTPDetails(obj)

            if (OTPResponse?.message) {
                toast.success(OTPResponse?.message, {
                    position: 'top-right', // Position of the toast
                    autoClose: 3000,       // Auto-close after 3000ms (3 seconds)
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        background: '#FFB017',fontSize:"bold",
                        color: "#fff"// Set the background color here
                    },
                });
            }
    
            if (OTPResponse && OTPResponse?.status != 401) {
                setTimeout(() => {
                    navigate('/signup-success')
    
                }, 2000)
            }
        }
    }

    // const [a, setA] = useState('false');
    let b = "false";
  
    /**
     * The handleChange function updates the formData state with a new GST value and triggers an API
     * call and Redux action when the GST value reaches a length of 15 characters.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the change, such as a user typing in an input
     * field or selecting an option from a dropdown menu.
     */
    const handleChange = (e: any,key:any) => {
        const newGst = e.target.value;
        const newData = { ...formData, [key]: newGst };
        setFormData(newData);
        const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (newGst.length == 10 && re.test(newGst)) {
            
            setDisabled(false);
            showInvalidPanMessage(false);
        }
        else {
            setDisabled(true);
            showInvalidPanMessage(true);
        }
      };


      const handledChange = (e: any,key:any) => {
        const newGst = e.target.value;
        const newData = { ...formData, [key]: newGst };
        setFormData(newData);
      }

      
      const handledfChange = (e: any,key:any) => {
        const newGst = e.target.value;
        const newData = { ...formData, [key]: newGst };
        setFormData(newData);
      }

      const handledfnChange = (e: any,key:any) => {
        const newGst = e.target.value;
        const newData = { ...formData, [key]: newGst };
        setFormData(newData);
      }
      


    /**
     * The `handlesubmit` function is used to handle form submission in a TypeScript React application,
     * where it collects form data and sends a POST request with the data to a server.
     */
    const handlesubmit = () => {
        let ObjectData:any={
            first_name:formData?.first_name,
            last_name:formData?.last_name,
            email: formData?.email,
            phone_number:formData?.phone_number,
            password:formData?.password,
            country: "India",
            panNo:formData?.panNo,
            gstNo:formData?.gstin,
            userDesignation: formData?.designation,
            firmType:formData?.firm,
            firmName: formData?.firmName,

          }    

          
        setSubmitting(false)
        sendPostRequest(ObjectData);
       
        OTPPostDetails && OTPPostDetails?.status !== 400 ? setOtpModal(true) : null
        // OTPPostDetails?.message && setOtpModal(true)
        setSubmitting(false)

    }

    /* The above code is a TypeScript React code snippet that uses the useEffect hook. */
    useEffect(() => {
        if (OTPResponse?.message) {
            toast.success(OTPResponse?.message, {
                position: 'top-right', // Position of the toast
                autoClose: 3000,       // Auto-close after 3000ms (3 seconds)
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: '#FFB017',fontSize:"bold",
                    color: "#fff"// Set the background color here
                },
            });
        }

        if (OTPResponse && OTPResponse?.status != 401) {
            setTimeout(() => {
                navigate('/signup-success')

            }, 2000)
        }
        
    }, [OTPResponse?.message])

    /* The above code is a useEffect hook in a TypeScript React component. It is triggered whenever the
    value of `b` or `GSTResponse` changes. */
    useEffect(() => {
        if (GSTResponse?.message) {

            toast.success(typeof GSTResponse?.message === 'string'?GSTResponse?.message:"Details fetched successfully.", {
                position: 'top-right', // Position of the toast
                autoClose: 3000,       // Auto-close after 3000ms (3 seconds)
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: '#FFB017',fontSize:"bold",
                    color: "#fff"// Set the background color here
                },
            });
            if(GSTResponse?.message?.compliance)setDisabled(false);
            else setDisabled(true);
            // setA("false");
            b = "false";
        }
    }, [b, GSTResponse])

    /* The above code is a useEffect hook in a TypeScript React component. It is used to display a
    toast notification when the `OTPPostDetails` object has a `message` property. */
    useEffect(() => {
        if (OTPPostDetails?.message && OTPPostDetails?.message !== 'hello') {
            setSeconds(120)
            toast.success(OTPPostDetails?.message, {
                position: 'top-right', // Position of the toast
                autoClose: 3000,       // Auto-close after 3000ms (3 seconds)
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: '#FFB017',fontSize:"bold",
                    color: "#fff"// Set the background color here
                },
            });
            if(OTPPostDetails?.user_id){
                setOtpModal(true)
            }
            OTPPostDetails.message = 'hello'
        }
    }, [OTPPostDetails?.message])

    useEffect(() => {
        // Decrease the timer every second
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(timer);

    }, [seconds]);


    return (
        <div className={className}>
            <ToastContainer />

            {/* The above code is rendering an OTP (One-Time Password) modal in a React component. The
            modal is displayed conditionally based on the value of the `otpModal` variable. If
            `otpModal` is true, the modal is displayed, otherwise it is not rendered. */}
            {otpModal ?
                <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="bg-black h-8 flex rounded-t-[8px]">
                                <h6 className='text-white my-auto ms-2'>OTP</h6>
                                <button onClick={() => setOtpModal(false)} type="button" className="absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-800 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="px-6 py-6 lg:px-8">
                                <h4 className="mb-4 text-center">Enter OTP</h4>
                                <p className='text-field text-center mb-3'>An OTP has been sent to your email, kindly enter the code below to login.</p>
                                <form className="" onSubmit={(e) => handleFinalSubmit(e)}>
                                    <div>
                                        <div className="otp mx-auto">
                                            <input type='text' className='w-full p-3 border-2 border-indigo-800 rounded-[13px]' placeholder='Enter OTP here.' onChange={(e: any) => setOtp(e.target.value)} />
                                        </div>
                                    </div>
                                    <button type="submit" className="indigo-btn mt-3 rounded-[13px] p-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get Started!</button>
                                    <div className="text-field text-center">
                                    If you didn’t receive a code <a role='button' className="text-link" onClick={handlesubmit}>{seconds !== 0 ? seconds < 10 ? `00:0${seconds}` : `00:${seconds}` : 'Resend OTP'}</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> : <></>}

            {/* The above code is a form component written in TypeScript and React using the Formik
            library. It renders a form with various input fields and a submit button. */}
            <Formik
                initialValues={{
                    country: "india",

                }}
         

            >
                <Form className='signup-form'>


                    <FormContainer>
                        <FormItem
                            label="GST Number"
                            className='text-start cin-number text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="GST No"
                              
                                component={Input}
                                className=''
                                max="15"
                            />
                        </FormItem>

                        <FormItem
                                label="Pan Number"

                                className='me-auto text-label-title'
                                asterisk={true}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="panNo"
                                    placeholder="Pan Card No."
                                    onChange={(e: any) => handleChange(e,'panNo')}
                                    component={Input}
                                    className=''
                                    max="10"
                                />
                                {invalidPanMessage && (
                                    <div className='text-[red]'>Invalid Pan Number</div>
                                )}
                            </FormItem>
                        <div className="">
                            <FormItem
                                label="Country"

                                className='me-auto text-label-title'
                                asterisk={true}
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
                        </div>

                            <FormItem
                                label="User Designation"

                                className='me-auto text-label-title'
                                asterisk={true}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="designation"
                                    placeholder="User Designation"
                                    onChange={(e: any) => handledChange(e,'designation')}
                                    component={Input}
                                    className=''
                                    max="35"
                                />
                            </FormItem>
                        <div className="flex">
                            <FormItem
                                label="Firm Type"

                                className='me-auto text-label-title'
                                asterisk={true}
                            >
                                  
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="firm"
                                    placeholder="Firm Type"
                                    onChange={(e: any) => handledfChange(e,'firm')}

                                    
                                    component={Input}
                                    className=''
                                />
                              
                            </FormItem>

                            <FormItem
                                label="Firm Name"

                                className='me-auto text-label-title'
                                asterisk={true}
                            >
                                
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="firmName"
                                    placeholder="Firm Name"
                                    onChange={(e: any) => handledfnChange(e,'firmName')}
                                    component={Input}
                                    className=''
                                />
                              
                            </FormItem>

                        </div>




                        <div className='flex mt-3'>
                            <Button
                                block
                                style={{borderRadius:"13px"}}
                                loading={isSubmitting}
                                disabled={isDisabled}
                                variant="solid"
                                onClick={handlesubmit}
                                className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
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
