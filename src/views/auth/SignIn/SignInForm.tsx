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
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import { Field, Form, Formik } from 'formik'
import type { CommonProps } from '@/@types/common'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { messageView, validateForm } from '@/store/customeHook/validate'
import { apiUrl } from '@/store/customeHook/token'
import { ToastContainer } from 'react-toastify'
import jwt_decode from "jwt-decode";
const API_URL = apiUrl;

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}

const SignInForm = (props: SignInFormProps) => {
    /* The below code is a TypeScript React component that defines a form with three state variables:
    `isSubmitting`, `formData`, and `error`. */
    const [isSubmitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState<any>({
        email: '',
        password: '',
        rememberMe: false
    })
    const [error, setError] = useState<any>({
        email: '',
        password: '',
    })



 
    /* The below code is a TypeScript React component that is destructuring the `props` object to
    extract certain properties and assign them to variables. */
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

        if (validateFormLogin(formData)) {

            setSubmitting(true)
            if (formData?.rememberMe) {
                localStorage.setItem('RememberMe', JSON.stringify(formData));
            } else {
                localStorage.removeItem('RememberMe')
            }
            fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        email: formData?.email,
                        password: formData?.password,
                    }
                ),
            }).then((res) => res.json())
                .then((data) => {
                    setSubmitting(false)
                    if (data.message.accessToken) {
                        localStorage.setItem('access_token', data.message.accessToken);
                        messageView("Login Successfully")
                        setTimeout(() => {
                            const { default_user_type }: any = jwt_decode(data.message.accessToken)
                            if (default_user_type === 1) {
                                localStorage.setItem('user_type', 'Partner')
                                navigate('/partner-dashbord')
                            } else if (default_user_type === 3) {
                                localStorage.setItem('user_type', 'Investor')
                                navigate('/investor-dashbord')
                            } else {
                                navigate('/home')
                            }
                        }, 2000)


                    } else {

                        messageView(data?.message)

                    }

                })
                .catch((err) => {
                    setSubmitting(false)
                })

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
        if (!formD.email) {
            errors.email = 'Email is required !'
        }

        if (formD.email) {
            if (!/\S+@\S+\.\S+/.test(formData?.email)) {
                errors.email = 'Invalid email address';
            }
        }
        if (/\.\@/.test(formD?.email)) {
            errors.email = 'Email not allow .@'
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
        validateFormLogin(newData);
        setFormData(newData)
        if (error[e.target.name]) validateFormLogin(newData);
    }

    const handleRememberMeChange = (e: any) => {
        const newData = { ...formData };
        newData.rememberMe = e.target.checked; // Update rememberMe state
        setFormData(newData);
    };

    useEffect(() => {
        if (localStorage.getItem('RememberMe')) {
            const dataVal: any = localStorage.getItem('RememberMe');
            setFormData(JSON.parse(dataVal))
        }
    }, [])
    return (
        <>
            <ToastContainer />
            <div className={className}>
             
                <Formik >
                    <Form className='md:m-auto ' onSubmit={handlesubmit}>
                        <FormContainer className="">
                            <FormItem
                                className="!text-[#103492]"
                                label="Registered Email ID*"
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    className="rounded-[13px]"
                                    name="email"
                                    value={formData?.email}
                                    placeholder="your@email.com"
                                    onChange={handlechange}
                                    component={Input}
                                />
                                <p className="text-[red]">
                                    {error && error.email}
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
                                <hr className='w-[50%] my-auto mx-1' />
                                Or
                                <hr className='w-[50%] my-auto mx-1' />
                            </div>
                            <div className=" mx-auto flex mt-5">
                                <Button
                                    block
                                    variant="solid"
                                    type='button'
                                    onClick={() => navigate('/sign-in-otp')}
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
