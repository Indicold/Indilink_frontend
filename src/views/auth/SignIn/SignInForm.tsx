import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useAuth from '@/utils/hooks/useAuth'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInSuccess, userLoginApiPost } from '@/store'
import { NavLink } from 'react-router-dom'
import { validateForm } from '@/store/customeHook/validate'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}

type SignInFormSchema = {
    email: string
    password: string
    rememberMe: boolean
}
interface UserLoginApiPostPayload {
    user_id: string;
    password: string;
  }
const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter your email address'),
    password: Yup.string().required('Please enter your password'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props: SignInFormProps) => {
    const [isSubmitting,setSubmitting]=useState(false)
    const [formData,setFormData]=useState({
        username:"",
        password:""
    })
    const [error,setError]=useState<any>({
        username:"",
        password:""
    })
    const dispatch=useDispatch();
    const LoginResponse=useSelector((state:any)=>state?.auth?.apiLoginPostReducer)
    console.log("LOGIN",LoginResponse?.responseData?.message);
    
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props



  
const handlesubmit=(e:any)=>{
    e.preventDefault();
    console.log("HGFFGDFGD",validateForm({user_id:formData?.username,passwordlGN:formData?.password},setError));

    if(validateFormLogin()){
        
        dispatch(userLoginApiPost({user_id:formData?.username,password:formData?.password}))
    }
}
const validateFormLogin=()=>{
    const errors:any={};
    if(!formData.username){
        errors.username="Username is required !"
    }
    if(!formData.password){
        errors.password="Password is can't be Empty !"
    }
    setError(errors)
    return Object.keys(errors).length == 0;
}
const handlechange=(e:any)=>{
    const newData:any={...formData};
    newData[e.target.name]=e.target.value;
    setFormData(newData);
    
        }
        useEffect(()=>{
            localStorage.setItem("access_token",LoginResponse?.responseData?.message?.accessToken)
        },[LoginResponse?.responseData?.message])
    return (
        <div className={className}>
         {LoginResponse?.responseData?.message && typeof LoginResponse?.responseData?.message === 'string' && false && (

<Alert showIcon className="mb-4" type="danger">

    <>{LoginResponse?.responseData?.message}</>

</Alert>

)}
            <Formik
                onSubmit={handlesubmit}
            >
                    <Form className='formm' action=''>
                        <FormContainer>
                            <FormItem className='!text-[#103492]'
                                label="Username"
                                
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    className="rounded-[13px]"
                                    name="username"
                                    placeholder="username"
                                    onChange={handlechange}
                                    component={Input}
                                />
                                 <p className='text-[red]'>{error && error.username}</p>
                            </FormItem>
                            <FormItem
                            className='!text-[#103492]'
                                label="Password"

                                
                            >
                                <Field
                                    style={{ borderRadius: "13px" }}
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handlechange}
                                    component={PasswordInput}
                                />
                                 <p className='text-[red]'>{error && error.password}</p>
                            </FormItem>
                            <div className='flex justify-between'>
                                <div className="flex items-center mb-4">
                                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-[#103492] dark:text-[#103492]">Remember me</label>
                                </div>
                                <ActionLink to={forgotPasswordUrl} className="ml-2 text-sm font-medium !text-[#103492] dark:text-[#103492]">Forgot Password?</ActionLink>

                            </div>
                            <div className='w-full flex'>
                                <Button
                                    style={{ borderRadius: "13px" }}
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    className='bg-[#ffb017] indigo-btn w-[40%] mx-auto rounded-[30px]'
                                >
                                    {isSubmitting ? 'Signing in...' : 'Log in'}
                                </Button>

                            </div>
                            <div className='w-full flex'>
                                <NavLink  to="/sign-in-otp" role='button'
                                    style={{ borderRadius: "13px",textDecoration:"auto" }}
                                    className='!text-[#103492] mx-auto rounded-[30px] font-bold mx-auto py-2'
                                >
                                    {isSubmitting ? 'Signing in...' : 'Log in with OTP'}
                                </NavLink>
                            </div>
                            <div className="mt-4 text-center text-[#103492]">
                                <span>{`Not a member yet?`} </span>
                                <ActionLink className='text-bold decoration-none rounded-lg !text-[#103492]' to={signUpUrl}>Sign up</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
            </Formik>
        </div>
    )
}

export default SignInForm
