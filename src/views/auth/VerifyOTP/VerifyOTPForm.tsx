/**
 * This is a TypeScript React component for a form that allows users to verify their OTP (One-Time
 * Password) for password recovery.
 * @property {string} email - The email field is used to enter the user's email address.
 */
import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import ActionLink from '@/components/shared/ActionLink'
import { apiForgotPassword, apiVerifyOTP } from '@/services/AuthService'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ForgotPasswordFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type ForgotPasswordFormSchema = {
    email: string
}

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter your email'),
    OTP: Yup.string().required('Please enter your OTP'),
})

const VerfyOtpForm = (props: ForgotPasswordFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const [emailSent, setEmailSent] = useState(false)
    const [submitting,setSubmitting]=useState(false)
    const [message, setMessage] = useTimeOutMessage()
const emailId=localStorage.getItem("email");
    /**
     * The `onSendMail` function is used to handle the logic for sending a password reset email.
     * @param {ForgotPasswordFormSchema} values - The `values` parameter is an object that represents
     * the form values submitted by the user. It likely contains properties such as email, password,
     * and any other fields present in the form.
     * @param setSubmitting - A function that takes a boolean value and updates the state of whether
     * the form is submitting or not.
     */
    const onSendMail = (
        values: ForgotPasswordFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true);
    
        apiVerifyOTP(values,messageView)
    };
    /**
     * The function `messageView` displays a success toast message with specified options.
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
const handleresend=()=>{
    const data:any={
        email:emailId,
        redirect:3
    }
    apiForgotPassword(data,messageView,setSubmitting)
}
    const newLocal = 'OTP*'
    return (
        <div className={className}>
                  <ToastContainer />
            <div className="mb-6">
                {emailSent ? (
                    <>
                        <h3 className="mb-1">Check your email</h3>
                        <p>
                            We have sent a password recovery instruction to your
                            email
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-1 text-head-title">Verify OTP</h3>
                        <p>
                            Please enter your verification code
                        </p>
                    </>
                )}
            </div>
            
            <Formik
                initialValues={{
                    email: emailId || null,
                    OTP: null,
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
                                label='Email*'
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Email"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                label={newLocal}
                                    invalid={errors.OTP && touched.OTP}
                                    errorMessage={errors.OTP}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="OTP"
                                        placeholder="Enter Your OTP"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                        
                            <div className='mt-6'></div>
                            <span
                            className='border-none'
                                
                              
                                onClick={handleresend}
                            >
                                Resend OTP
                            </span>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                className='indigo-btn'
                            >
                            Verify OTP
                            </Button>
                            <div className="mt-4 text-center">
                                <span>Back to </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default VerfyOtpForm
