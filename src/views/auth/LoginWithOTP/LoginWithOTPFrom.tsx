/* 
* The following code is a TypeScript React component that represents a login form with OTP (One-Time
* Password) functionality. It imports various components from different files and libraries, such as
* Input, Button, FormItem, FormContainer, ActionLink, Field, Form, Formik, ToastContainer, and toast. 
*/
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import ActionLink from '@/components/shared/ActionLink'
import { Field, Form, Formik } from 'formik'
import type { CommonProps } from '@/@types/common'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import usePostApi from '@/store/customeHook/postApi'
import { ToastContainer, toast } from 'react-toastify'
import usePutApi from '@/store/customeHook/putApi'
import { apiUrl } from '@/store/customeHook/token'
import { messageViewNew, onkeyDownOne } from '@/store/customeHook/validate'
import jwt_decode from "jwt-decode";
/* The below code is defining an interface called `LoginWithOTPFormProps` in TypeScript for a React
component. This interface extends another interface called `CommonProps` and adds three optional
properties: `disableSubmit`, `forgotPasswordUrl`, and `signUpUrl`. */
interface LoginWithOTPFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}





const LoginWithOTPForm = (props: LoginWithOTPFormProps) => {
    /* The below code is a TypeScript React component that handles the functionality of submitting a
    mobile number and verifying it with an OTP (One-Time Password). */
    const [isSubmitting, setSubmitting] = useState(false)
    const [isNumber, setIsNumber] = useState<any>(true)
    const [seconds, setSeconds] = useState(10);
    const { result: postMobileNumberResponse, loading: postMobileNumberLoading, sendPostRequest: postMobileNumber } = usePostApi(`auth/login-with-otp`);
    const { result: verifyResponse, loading: verifyLoading, sendPostRequest: PUTOTPDetails }: any = usePutApi(`auth/login-with-otp-verify`);
    const [formdata, setFormData] = useState<any>({
        phone_number: "",
        otp: ""
    })

const [errors,setError]=useState<any>({})
    /* The below code is a TypeScript React component that is destructuring the `props` object to
    extract certain properties and assign them to variables. */
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props

    let a = 'false'

    const navigate = useNavigate();
/**
 * The function `validate` checks if the `phone_number` field in the `formdata` object is empty and
 * returns true if it is not empty, otherwise it returns false.
 * @returns a boolean value. It returns true if there are no errors (i.e., the error object is empty),
 * and false otherwise.
 */
const validate=()=>{
    const error:any={};
    if(!formdata?.phone_number){
        error.phone_number="Phone number is required"
    }
    
    setError(error)
    return Object.keys(error).length === 0
}
    /**
     * The `handlesubmit` function is used to handle form submission, validate the form data, and
     * perform different actions based on the presence of an OTP value.
     * @param {any} e - The parameter `e` is an event object. It is typically used in event handlers to
     * access information about the event that occurred, such as the target element or the event type.
     * In this case, it is used to prevent the default form submission behavior by calling
     * `e.preventDefault()`.
     */
    const handlesubmit = (e: any) => {
        e.preventDefault()
        if(validate()){
            if (formdata?.otp) {
                PUTOTPDetails(formdata)
            } else {
                // a = 'true';
                let body: any = { phone_number: formdata?.phone_number }
                postMobileNumber(body)
                a = 'true';
            }
        }
        
    }

    /**
     * The handleChange function is used to update the form data object with the new value entered by the
     * user.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange` function.
     * It represents the event that triggered the function, such as a change event on an input field.
     */
    const handleChange = (e: any) => {
        const newData: any = { ...formdata };
        newData[e.target.name] = e.target.value;
        if(e.target.name==='phone_number'){
            const sanitizedValue = e.target.value.replace(/\D/g, '');
            setFormData({...newData,phone_number:sanitizedValue})
        }else{
            setFormData(newData)

        }
    }

    /* The `useEffect` hook in the code snippet is used to perform side effects in a React
    component. In this case, it is used to handle the response from a POST request made to the
    server. */
    useEffect(() => {
        if (postMobileNumberResponse?.message) {
            if (postMobileNumberResponse?.message === 'OTP sent successfully over mobile.') {
                setIsNumber(false);
                setSeconds(20)
            }
            messageViewNew(postMobileNumberResponse)
            // toast.success(postMobileNumberResponse?.message, {
            //     position: 'top-right', // Position of the toast
            //     autoClose: 3000,       // Auto-close after 3000ms (3 seconds)
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     style: {
            //         background: '#FFB017', fontSize: "bold",
            //         color: "#fff"// Set the background color here
            //     },
            // });
            a = 'false';
        }

    }, [a, postMobileNumberResponse])
    /* The `useEffect` hook in the code snippet is used to handle the response from a PUT request
    made to the server. */
    console.log("verifyResponse",verifyResponse);
    
    useEffect(() => {

        if (verifyResponse?.message) {
            messageViewNew(verifyResponse)
            // toast.success(verifyResponse?.message, {
            //     position: 'top-right', // Position of the toast
            //     autoClose: 3000,       // Auto-close after 3000ms (3 seconds)
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     style: {
            //         background: '#FFB017', fontSize: "bold",
            //         color: "#fff"// Set the background color here
            //     },
            // });
        }
        if (verifyResponse?.status) {
            if (verifyResponse.message.accessToken) localStorage.setItem('access_token', verifyResponse.message.accessToken);

            if (verifyResponse?.message) {
                messageViewNew(verifyResponse)
            }
        
           
           if(verifyResponse?.status==200){
            const {default_user_type}:any= jwt_decode(verifyResponse.message.accessToken)
            console.log("default_user_type",default_user_type);
            if(default_user_type===1){
                localStorage.setItem('user_type','Partner')
                navigate('/partner-dashbord')
            }else if(default_user_type===2){
                localStorage.setItem('user_type','Customer')
                navigate('/home')
            }else{
                localStorage.setItem('user_type','Investor')                
                navigate('/investor-dashbord')
            }
           }

         
        }

    }, [verifyResponse?.message])

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

            {/* The above code is a form component written in TypeScript and React using the Formik
            library. It renders a form with different fields and buttons based on the value of the
            `isNumber` variable. If `isNumber` is true, it renders a field for entering a mobile
            number and a login button. If `isNumber` is false, it renders a field for entering an
            OTP (One-Time Password) and a verify OTP button. The form also includes a checkbox for
            remembering the user, a forgot password link, a login with password link, a sign up
            link, and some styling classes. */}
            <Formik


            >
                <Form onSubmit={handlesubmit}>
                    <FormContainer>
                        {isNumber ? <FormItem className='d-flex text-label-title'
                            label="Phone Number*"

                        >
                            <Field
                                type="tel"
                                autoComplete="off"
                                className="rounded-[13px]"
                                name="phone_number"
                                placeholder="Mobile Number"
                                value={formdata?.phone_number}
                                onChange={handleChange}
                                component={Input}
                                onKeyDown={onkeyDownOne}
                                maxLength={10}
                            />
                           <p className="text-[red]">{errors?.phone_number}
                            </p>

                        </FormItem> :
                            <FormItem className='text-label-title'
                                label="Enter OTP*"


                            >
                                <Field
                                    style={{ borderRadius: "13px" }}
                                    autoComplete="off"
                                    name="otp"
                                    value={formdata?.otp}
                                    placeholder="Enter Your OTP"
                                    onChange={handleChange}
                                    component={Input}
                                    type="number"
                                // component={PasswordInput}
                                />
                                  <p className="text-[red]">{errors?.OTP}
                            </p>

                            </FormItem>
                        }

                        {/* <div className='flex justify-between'>
                            <div className="flex items-center">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-[#979da8] dark:text-[#979da8]">Remember me</label>
                            </div>
                            <ActionLink to={forgotPasswordUrl} className="text-link">Forgot Password?</ActionLink>

                        </div> */}
                        <div className='w-full flex'>
                            {isNumber ? <Button
                                style={{ borderRadius: "13px" }}
                                block
                                loading={isSubmitting}
                                variant="solid"
                                className='bg-[#3f8cfe] indigo-btn  w-[40%] mx-auto rounded-[30px] mt-2'
                            >
                                {isSubmitting ? 'Signing in...' : 'Log in'}
                            </Button> : <Button
                                style={{ borderRadius: "13px" }}
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                className='bg-[#3f8cfe] indigo-btn w-[40%] mx-auto rounded-[30px] mt-2'
                                disabled={!formdata?.otp}
                            >
                                {isSubmitting ? 'Signing in...' : 'Verify OTP'}
                            </Button>}

                        </div>
                        {!isNumber && <div className='w-full flex'>
                            <div className='w-full flex' >
                                <label
                                    role='button'
                                    style={{ borderRadius: "13px" }}
                                    onClick={handlesubmit}
                                    className='!text-[#103492] rounded-[30px] font-bold mx-auto py-2'
                                >
                                    {seconds !== 0 ? `00:${seconds}` : 'Resend OTP'}
                                </label>
                            </div>
                        </div>}
                        <div className="mt-4 text-center text-field">
                            <span>{`Don't have an account?`} </span>
                            <ActionLink className='text-link' to={signUpUrl}>Sign up</ActionLink>
                        </div>
                        <div className="flex mt-5">
                            <hr className='w-[47%] my-auto mx-1' />
                            Or
                            <hr className='w-[47%] my-auto mx-1' />
                        </div>
                        <div className='mx-auto flex mt-5'>
                            <Button
                                block
                                variant="solid"
                                onClick={()=>navigate('/sign-in')}
                                className='indigo-btn !bg-black mx-auto'
                            >
                            <NavLink to="/sign-in" className='' >
                                Log in with Email ID
                            </NavLink>
                            </Button>
                        </div>
                    </FormContainer>
                </Form>
            </Formik>
        </div>
    )
}

export default LoginWithOTPForm
