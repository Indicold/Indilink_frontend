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

interface LoginWithOTPFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}





const LoginWithOTPForm = (props: LoginWithOTPFormProps) => {
    const [isSubmitting,setSubmitting]=useState(false)
    const [isNumber,setIsNumber]=useState<any>(true)
    const { result: postMobileNumberResponse, loading: postMobileNumberLoading, sendPostRequest: postMobileNumber } = usePostApi('https://seal-app-uqxwl.ondigitalocean.app/auth/login-with-otp');
    const { result: verifyResponse, loading: verifyLoading, sendPostRequest: PUTOTPDetails } = usePutApi('https://seal-app-uqxwl.ondigitalocean.app/auth/login-with-otp-verify');
    const [formdata,setFormData]=useState<any>({
        mobile:"",
        otp:""
    })
  
    
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props


    const navigate=useNavigate();
   
    const handlesubmit=(e:any)=>{
        e.preventDefault()
        if(formdata?.otp){
            PUTOTPDetails(formdata)
        }else{
            let body:any={phone_number:formdata?.mobile}
            postMobileNumber(body)
        }
     
    }

const handleChange=(e:any)=>{
    const newData:any={...formdata};
    newData[e.target.name]=e.target.value;
    setFormData(newData)
}
        useEffect(() => {
            console.log("TTTTTT",postMobileNumberResponse);
            if(postMobileNumberResponse?.status){
                setIsNumber(false);
                
            }
            if (postMobileNumberResponse?.message) {
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
            }
    
        }, [postMobileNumberResponse?.message])
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
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    value={formdata?.mobile}
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
