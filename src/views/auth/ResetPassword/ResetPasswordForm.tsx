import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import { apiResetPassword } from '@/services/AuthService'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ResetPasswordFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type ResetPasswordFormSchema = {
    password: string
    confirm_password: string
}

const validationSchema = Yup.object().shape({
    password: Yup.string().required('Please enter your password'),
    confirm_password: Yup.string().oneOf(
        [Yup.ref('password')],
        'Your passwords do not match'
    ),
})

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const [resetComplete, setResetComplete] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const navigate = useNavigate()
    const emailId=localStorage.getItem("email");
    const onSubmit = async (
        values: ResetPasswordFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { password } = values
        setSubmitting(true)
        apiResetPassword({...values,email:emailId},messageView)
        // try {
        //     const resp = await apiResetPassword({ password })
        //     if (resp.data) {
        //         setSubmitting(false)
        //         setResetComplete(true)
        //     }
        // } catch (errors) {
        //     setMessage(
        //         (errors as AxiosError<{ message: string }>)?.response?.data
        //             ?.message || (errors as Error).toString()
        //     )
        //     setSubmitting(false)
        // }
    }

    const onContinue = () => {
        navigate('/sign-in')
    }
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
                {resetComplete ? (
                    <>
                        <h3 className="mb-1">Reset done</h3>
                        <p>Your password has been successfully reset</p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-1">Set new password</h3>
                        <p>
                            Your new password must different to previos password
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
                    password: null,
                    confirm_password: null,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSubmit(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            {!resetComplete ? (
                                <>
                                    <FormItem
                                        label="Password"
                                        invalid={
                                            errors.password && touched.password
                                        }
                                        errorMessage={errors.password}
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="password"
                                            placeholder="Password"
                                            component={PasswordInput}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Confirm Password"
                                        invalid={
                                            errors.confirm_password &&
                                            touched.confirm_password
                                        }
                                        errorMessage={errors.confirm_password}
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="confirm_password"
                                            placeholder="Confirm Password"
                                            component={PasswordInput}
                                        />
                                    </FormItem>
                                    <Button
                                        block
                                        loading={isSubmitting}
                                        variant="solid"
                                        className='indigo-btn'
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'Submiting...'
                                            : 'Submit'}
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    block
                                    variant="solid"
                                    type="button"
                                    onClick={onContinue}
                                >
                                    Continue
                                </Button>
                            )}

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

export default ResetPasswordForm
