/**
 * This is a TypeScript React component for a Forgot Password form that sends a password recovery
 * instruction to the user's email.
 * @property {string} email - The email property is a string that represents the user's email address.
 */
import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import ActionLink from '@/components/shared/ActionLink'
import { apiForgotPassword } from '@/services/AuthService'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import type { AxiosError } from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ForgotPasswordFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

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
        setSubmitting(true);
        const {email }=values;
    localStorage.setItem("email",email)
        apiForgotPassword(values,messageView)
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
                        <h4 className="mb-1 text-head-title text-center">Forgot Password</h4>
                        <p className='!text-[#103492]'>
                            Please enter your email address to receive a
                            verification code
                        </p>
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
                            </div>
                            <div className='flex'>
                            <Button
                                block
                                style={{borderRadius:"13px"}}
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                className='indigo-btn w-[94%]'
                            >
                                {emailSent ? 'Resend' : 'Send'}
                            </Button>
                            </div>
                            <div className="mt-4 text-center !text-[#103492]">
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

export default ForgotPasswordForm
