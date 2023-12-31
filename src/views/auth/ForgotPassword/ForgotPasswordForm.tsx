/**
 * This is a TypeScript React component for a Forgot Password form that sends a password recovery
 * instruction to the user's email.
 * @property {string} email - The email property is a string that represents the user's email address.
 */
import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input' // Custom input field to show in form
import Button from '@/components/ui/Button' // Custom button to show in page
import Alert from '@/components/ui/Alert'
import ActionLink from '@/components/shared/ActionLink'
import { apiForgotPassword } from '@/services/AuthService'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik' // For rendering form and form fields
import * as Yup from 'yup' // For defining Form validations
import type { CommonProps } from '@/@types/common'
import type { AxiosError } from 'axios'
import { ToastContainer, toast } from 'react-toastify'; // For showing toast messages
import 'react-toastify/dist/ReactToastify.css';

/* The `interface ForgotPasswordFormProps` is defining the props that can be passed to the
`ForgotPasswordForm` component. It extends the `CommonProps` interface, which likely contains common
props used across multiple components. */
interface ForgotPasswordFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

/**
 * The `ForgotPasswordFormSchema` type represents the shape of data expected for a forgot password
 * form, which includes an email field of type string.
 * @property {string} email - The `email` property is a string that represents the user's email
 * address.
 */
type ForgotPasswordFormSchema = {
    email: string
}

/* The `validationSchema` constant is defining the validation rules for the form. In this case, it is
using the Yup library to create a validation schema object. The schema specifies that the `email`
field is required and must be a string. If the field is empty or not a string, it will display the
error message `'Please enter your email'`. */
const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter your email'),
})

const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const [emailSent, setEmailSent] = useState(false)


    /**
     * The function `onSendMail` is used to send a forgot password email and store the email in local
     * storage.
     * @param {ForgotPasswordFormSchema} values - The `values` parameter is an object that contains the
     * form values submitted by the user. In this case, it likely includes the user's email address.
     * @param setSubmitting - A function that takes a boolean value and updates the state of whether
     * the form is submitting or not.
     */
    const onSendMail = (
        values: ForgotPasswordFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        
        const {email }=values;
    localStorage.setItem("email",email)
        apiForgotPassword(values,messageView,setSubmitting)
    };
    /**
     * The function `messageView` displays a success toast message with a custom style.
     * @param {any} messagevalue - The messagevalue parameter is the value of the message that you want
     * to display in the toast notification. It can be any string or variable that contains the message
     * you want to show.
     */
    const messageView=(messagevalue:any)=>{
        toast.success(messagevalue, {
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
    

    return (
        <div className='p-2 w-[100%]'> 
            <img className="lg:w-[130px] mt-4 md:w-[25%] w-1/2 object-cover object-center rounded-[3%]" alt="hero" src="./img/images/logimg.png" />
             <ToastContainer />
            <div className="mb-6 ">
                {emailSent ? (
                    <>
                        <h3 className="mt-2">Check your email</h3>
                        <p>
                            We have sent a password recovery instruction to your
                            email
                        </p>
                    </>
                ) : (
                    <>
                        <h4 className="mt-2 text-head-title">Forgot Password?</h4>
                        {/* <p className='!text-[#103492]'>
                            Please enter your email address to receive a
                            verification code
                        </p> */}
                    </>
                )}
            </div>
            <Formik
                initialValues={{
                    email: null,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSendMail(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className={emailSent ? 'hidden' : ''}>
                                <FormItem
                                label='Email address*'
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}
                                    className='w-[100%]'
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="eg. johndeo@gmail.com"
                                        component={Input}
                                        className=''
                                    />
                                </FormItem>
                            </div>
                            <div className='flex'>
                            <Button
                                block
                                style={{borderRadius:"13px"}}
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                className='indigo-btn w-[100%] mt-4'
                            >
                                {emailSent ? 'Resend' : 'Reset Password'}
                            </Button>
                            </div>
                            <div className="w-full text-center mt-2">
                                <span className='text-field'>Back to </span>
                                <ActionLink to={signInUrl}>Login</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ForgotPasswordForm
