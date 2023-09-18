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

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter your email'),
})

const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const [emailSent, setEmailSent] = useState(false)


    const onSendMail = (
        values: ForgotPasswordFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true);
        const {email }=values;
    localStorage.setItem("email",email)
        apiForgotPassword(values,messageView)
            // .then((resp) => {
            //     console.log("hhhhh", resp);
    
            //     if (resp && resp.data) {
            //         setSubmitting(false);
            //         setEmailSent(true);
            //     }
            // })
            // .catch((errors) => {
            //     console.log("errors", errors);
            //     setMessage(
            //         (errors as AxiosError<{ message: string }>)?.response?.data
            //             ?.message || (errors as Error).toString()
            //     );
            //     setSubmitting(false);
            // });
    };
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
            {/* {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )} */}
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
                                {emailSent ? 'Resend Email' : 'Send Email'}
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
