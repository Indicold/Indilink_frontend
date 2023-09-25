/**
 * This is a TypeScript React component for a sign-in form with validation and submission
 * functionality.
 * @property {string} email - The email property is a string that represents the user's email address.
 * It is required and must be a valid email format.
 * @property {string} password - The password property is used to store the user's password input in
 * the form.
 * @property {boolean} rememberMe - A boolean value indicating whether the user wants to be remembered
 * for future logins.
 */
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
import { userLoginApiPost } from '@/store'
import { NavLink, useNavigate } from 'react-router-dom'
import { messageView, validateForm } from '@/store/customeHook/validate'
import axios from 'axios'
import { apiUrl } from '@/store/customeHook/token'
import { ToastContainer } from 'react-toastify'

const API_URL = apiUrl;

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
    user_id: string
    password: string
}
/* The `validationSchema` constant is defining the validation rules for the form fields in the
`SignInForm` component. It is using the Yup library to create a validation schema object. */
const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter your email address'),
    password: Yup.string().required('Please enter your password'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props: SignInFormProps) => {
    const [isSubmitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState<any>({
        username: '',
        password: '',
        rememberMe:false
    })
    const [error, setError] = useState<any>({
        username: '',
        password: '',
    })
    const dispatch = useDispatch()
    const LoginResponse = useSelector(
        (state: any) => state?.auth?.apiLoginPostReducer
    )
    console.log('LOGIN', LoginResponse?.responseData?.message)

    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props

    /**
     * The function handlesubmit is used to handle form submission in a TypeScript React application,
     * including validation and dispatching an API call.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handlesubmit` function.
     * It is typically an event object that is triggered when a form is submitted.
     */
    const navigate: any = useNavigate()
    const handlesubmit = (e: any) => {
        e.preventDefault()
        console.log(
            'HGFFGDFGD',
            validateForm(
                {
                    user_id: formData?.username,
                    passwordlGN: formData?.password,
                },
                setError
            )
        )

        if (validateFormLogin(formData)) {
            
        setSubmitting(true)
if(formData?.rememberMe){
    localStorage.setItem('RememberMe',JSON.stringify(formData));
}else{
    localStorage.removeItem('RememberMe')
}
            fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        email: formData?.username,
                        password: formData?.password,
                    }
                ),
            }).then((res) => res.json())
                .then((data) => {
                    setSubmitting(false)
                    if (data.message.accessToken) {
                        sessionStorage.setItem('access_token', data.message.accessToken);
                    messageView("Login Successfully")
                    setTimeout(()=>{
                        navigate('/home')
                    },2000)
                  

                    }else{
                    console.log("res", data)

                        messageView(data?.message)

                    }
      
                })
                .catch((err) => {
                    setSubmitting(false)
                    console.log("err", err)
                })
            // dispatch(
            //     userLoginApiPost({
            //         user_id: formData?.username,
            //         password: formData?.password,
            //     })
            // )
        }
    }
    /**
     * The function `validateFormLogin` checks if the `username` and `password` fields in a form are
     * filled, and returns true if they are, otherwise it returns false and sets error messages.
     * @returns a boolean value. It returns true if there are no errors in the form data, and false if
     * there are any errors.
     */
    const validateFormLogin = (formD: any) => {
        const errors: any = {}
        if (!formD.username) {
            errors.username = 'Email is required !'
        }
        if (!formD.password) {
            errors.password = "Password can't be Empty !"
        }
        setError(errors)
        return Object.keys(errors).length == 0
    }
    /**
     * The handlechange function updates the formData state with the new value entered in the input field.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handlechange` function.
     * It represents the event that triggered the function, such as a change event on an input field.
     */
    const handlechange = (e: any) => {
        const newData: any = { ...formData }
        newData[e.target.name] = e.target.value
        setFormData(newData)
        if(error[e.target.name])validateFormLogin(newData);
    }
    /* The `useEffect` hook is used to perform side effects in a React component. In this case, the
        `useEffect` hook is used to update the `access_token` value in the browser's `localStorage`
        whenever the `LoginResponse?.responseData?.message?.accessToken` value changes. */
    useEffect(() => {
        localStorage.setItem(
            'access_token',
            LoginResponse?.responseData?.message?.accessToken
        )
    }, [LoginResponse?.responseData?.message])
    const handleRememberMeChange = (e:any) => {
        const newData = { ...formData };
        newData.rememberMe = e.target.checked; // Update rememberMe state
        setFormData(newData);
    };
    useEffect(()=>{
        if(localStorage.getItem('RememberMe')){
            const dataVal:any=localStorage.getItem('RememberMe');
            setFormData(JSON.parse(dataVal))
        }
    },[])
    return (
        <>
            <ToastContainer />

        <div className={className}>
            {LoginResponse?.responseData?.message &&
                typeof LoginResponse?.responseData?.message === 'string' &&
                false && (
                    <Alert showIcon className="mb-4" type="danger">
                        <>{LoginResponse?.responseData?.message}</>
                    </Alert>
                )}
            <Formik>
                <Form onSubmit={handlesubmit}>
                    <FormContainer>
                        <FormItem
                            className="!text-[#103492]"
                            label="Registered Email ID*"
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                className="rounded-[13px]"
                                name="username"
                                value={formData?.username}
                                placeholder="your@email.com"
                                onChange={handlechange}
                                component={Input}
                            />
                            <p className="text-[red]">
                                {error && error.username}
                            </p>
                        </FormItem>
                        <FormItem className="text-field" label="Password*">
                            <Field
                                style={{ borderRadius: '13px' }}
                                autoComplete="off"
                                name="password"
                                value={formData?.password}
                                placeholder="Password"
                                onChange={handlechange}
                                component={PasswordInput}
                            />
                            <p className="text-[red]">
                                {error && error.password}
                            </p>
                        </FormItem>
                        <div className="flex justify-between">
                        <div className="flex items-center mb-4">
                                    <input
                                        id="rememberMeCheckbox"
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe} // Bind to rememberMe state
                                        onChange={handleRememberMeChange} // Handle the change event
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="rememberMeCheckbox"
                                        className="ml-2 text-sm font-medium text-[#103492] dark:text-[#103492]"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            <ActionLink
                                to={forgotPasswordUrl}
                                className="text-link"
                            >
                                Forgot Password?
                            </ActionLink>
                        </div>
                        <div className=" mx-auto flex mt-5">
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                className="indigo-btn  mx-auto "
                            >
                                {isSubmitting ? 'Signing in...' : 'Log in'}
                            </Button>
                        </div>
                        {/* <div className="w-full flex">
                            <NavLink
                                to="/sign-in-otp"
                                role="button"
                                style={{
                                    borderRadius: '13px',
                                    textDecoration: 'auto',
                                }}
                                className="!text-[#103492] mx-auto rounded-[30px] font-bold mx-auto py-2"
                            >
                                {isSubmitting
                                    ? 'Signing in...'
                                    : 'Log in with Phone number'}
                            </NavLink>
                        </div> */}
                        <div className="text-center">
                            <span className='text-field'>{`Don't have an account?`} </span>
                            <ActionLink
                                className="text-link"
                                to={signUpUrl}
                            >
                                Sign up
                            </ActionLink>
                        </div>
                        <div className="flex mt-5">
                            <hr className='w-[40%] my-auto mx-1' />
                            Or
                            <hr className='w-[40%] my-auto mx-1' />
                        </div>
                        <div className=" mx-auto flex mt-5">
                            <Button
                                block
                                variant="solid"
                                type='button'
                                onClick={()=>navigate('/sign-in-otp')}
                                className="indigo-btn !bg-black mx-auto !hover:bg-gray-900"
                            >
                                <NavLink
                                to="/sign-in-otp"
                                role="button"
                                style={{
                                    borderRadius: '13px',
                                    textDecoration: 'auto',
                                }}
                                className=""
                            >
                                Login with Phone number
                            </NavLink>
                            </Button>
                        </div>
                    </FormContainer>
                </Form>
            </Formik>
        </div>
        </>
    )
}

export default SignInForm
