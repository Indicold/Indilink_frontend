/* 
* The above code is a TypeScript React component that represents a login form with OTP (One-Time
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

interface LoginWithOTPFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}





const LoginWithOTPForm = (props: LoginWithOTPFormProps) => {
    const [isSubmitting,setSubmitting]=useState(false)
    const [isNumber,setIsNumber]=useState<any>(true)
    const { result: postMobileNumberResponse, loading: postMobileNumberLoading, sendPostRequest: postMobileNumber } = usePostApi(`${apiUrl}/auth/login-with-otp`);
    const { result: verifyResponse, loading: verifyLoading, sendPostRequest: PUTOTPDetails }:any = usePutApi(`${apiUrl}/auth/login-with-otp-verify`);
    const [formdata,setFormData]=useState<any>({
        phone_number:"",
        otp:""
    })
  
    
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props

    let a = 'false'

    const navigate=useNavigate();
   
    const handlesubmit=(e:any)=>{
        e.preventDefault()
        if(formdata?.otp){
            PUTOTPDetails(formdata)
        }else{
            // a = 'true';
            // console.log("aaaaaaaaaabb", a, postMobileNumberResponse);
            let body:any={phone_number:formdata?.phone_number}
            postMobileNumber(body)
            a = 'true';
        }
    }

/**
 * The handleChange function is used to update the form data object with the new value entered by the
 * user.
 * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange` function.
 * It represents the event that triggered the function, such as a change event on an input field.
 */
const handleChange=(e:any)=>{
    const newData:any={...formdata};
    newData[e.target.name]=e.target.value;
    setFormData(newData)
}

        /* The `useEffect` hook in the code snippet is used to perform side effects in a React
        component. In this case, it is used to handle the response from a POST request made to the
        server. */
        useEffect(() => {
            console.log("TTTTTT",postMobileNumberResponse);
            if (postMobileNumberResponse?.message) {
                if(postMobileNumberResponse?.message === 'OTP sent successfully over mobile.'){
                    setIsNumber(false);
                }
                toast.success(postMobileNumberResponse?.message, {
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
                a = 'false';
                console.log("aaaaaaaaaa", a);
            }
    
        }, [a, postMobileNumberResponse])
        /* The `useEffect` hook in the code snippet is used to handle the response from a PUT request
        made to the server. */
        useEffect(() => {
            console.log("TTTTTT",postMobileNumberResponse);
           
            if (verifyResponse?.message) {
                toast.success(verifyResponse?.message, {
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
            if(verifyResponse?.status){
                if(verifyResponse.message.accessToken)sessionStorage.setItem('access_token', verifyResponse.message.accessToken);
  
                navigate('/home')
            }
    
        }, [verifyResponse?.message])
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
                                label="Mobile Number"
                                
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    className="rounded-[13px]"
                                    name="phone_number"
                                    placeholder="Mobile Number"
                                    value={formdata?.phone_number}
                                    onChange={handleChange}
                                    component={Input}
                                />
                                
                            </FormItem> :
                             <FormItem className='text-label-title'
                             label="Enter OTP"

                             
                         >
                             <Field
                                 style={{ borderRadius: "13px" }}
                                 autoComplete="off"
                                 name="otp"
                                 value={formdata?.otp}
                                 placeholder="Enter Your OTP"
                                 onChange={handleChange}
                                 component={Input}
                                 // component={PasswordInput}
                             />
                         </FormItem>
                            }
                           
                            <div className='flex justify-between'>
                                <div className="flex items-center">
                                    {/* <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-[#979da8] dark:text-[#979da8]">Remember me</label> */}
                                </div>
                                <ActionLink to={forgotPasswordUrl} className="mb-1 ml-2 text-sm font-medium !text-[#103492] dark:text-[#103492]">Forgot Password?</ActionLink>

                            </div>
                            <div className='w-full flex'>
                              {isNumber ?  <Button
                                    style={{ borderRadius: "13px" }}
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    className='bg-[#3f8cfe] indigo-btn  w-[40%] mx-auto rounded-[30px]'
                                >
                                    {isSubmitting ? 'Signing in...' : 'Log in'}
                                </Button> :  <Button
                                    style={{ borderRadius: "13px" }}
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    className='bg-[#3f8cfe] indigo-btn  w-[40%] mx-auto rounded-[30px]'
                                >
                                    {isSubmitting ? 'Signing in...' : 'Verfy OTP'}
                                </Button> }

                            </div>
                            <div className='w-full flex'>
                                <NavLink to="/sign-in" className='w-full flex' >
                                <label
                                role='button'
                                    style={{ borderRadius: "13px" }}
                                    className='!text-[#103492] mx-auto rounded-[30px] font-bold mx-auto py-2'
                                >
                                    {isSubmitting ? 'Signing in...' : 'Log in with Password'}
                                </label>
                                </NavLink>
                            </div>
                            <div className="mt-4 text-center !text-[#103492]">
                                <span>{`Not a member yet?`} </span>
                                <ActionLink className='text-bold decoration-none' to={signUpUrl}>Sign up</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
            </Formik>
        </div>
    )
}

export default LoginWithOTPForm
