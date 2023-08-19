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
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginApiPost } from '@/store'

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
    const dispatch=useDispatch();
    const LoginResponse=useSelector((state:any)=>state?.auth?.apiLoginPostReducer)
    console.log("LOGIN",LoginResponse?.responseData?.message);
    
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props

    const [message, setMessage] = useTimeOutMessage()

    const { signIn } = useAuth()

    const onSignIn = async (
        values: SignInFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { email, password } = values
console.log("hhhhhhhhhhhhhhhhhhh");

        setSubmitting(true)

        const result = await signIn({ email, password })
        console.log("HHHHH", result);

        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }
const handlesubmit=(e:any)=>{
    e.preventDefault();
    dispatch(userLoginApiPost({user_id:formData?.username,password:formData?.password}))
    console.log("handle")
}
const handlechange=(e:any)=>{
    const newData:any={...formData};
    newData[e.target.name]=e.target.value;
    setFormData(newData);
        }
    return (
        <div className={className}>
            {LoginResponse?.responseData?.message && (
                <Alert showIcon className="mb-4" type="danger">
                    <>{LoginResponse?.responseData?.message}</>
                </Alert>
            )}
            <Formik
               
            
            >
                    <Form onSubmit={handlesubmit}>
                        <FormContainer>
                            <FormItem
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
                            </FormItem>
                            <FormItem
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
                            </FormItem>
                            <div className='flex justify-between'>
                                <div className="flex items-center mb-4">
                                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-[#979da8] dark:text-[#979da8]">Remember me</label>
                                </div>
                                <ActionLink to={forgotPasswordUrl} className="ml-2 text-sm font-medium text-[#979da8] dark:text-[#979da8]">Forgot Password?</ActionLink>

                            </div>
                            <div className='w-full flex'>
                                <Button
                                    style={{ borderRadius: "13px" }}
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    className='bg-[#3f8cfe] w-[40%] mx-auto rounded-[30px]'
                                >
                                    {isSubmitting ? 'Signing in...' : 'Log in'}
                                </Button>

                            </div>
                            <div className='w-full flex'>
                                <label
                                    style={{ borderRadius: "13px" }}
                                    className='text-[#3f8cfe] mx-auto rounded-[30px] font-bold mx-auto py-2'
                                >
                                    {isSubmitting ? 'Signing in...' : 'Log in with OTP'}
                                </label>
                            </div>
                            <div className="mt-4 text-center text-[#3f8cfe]">
                                <span>{`Not a member yet?`} </span>
                                <ActionLink className='text-bold decoration-none p-2 pl-4 pr-4 rounded-lg border border-[black] ml-5' to={signUpUrl}>Sign up</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
            </Formik>
        </div>
    )
}

export default SignInForm
