/**
 * This is a TypeScript React component for a reset password form.
 * @property {string} password - The password field where the user can enter their new password.
 * @property {string} confirm_password - The `confirm_password` property is used to confirm the
 * password entered by the user. It is used to ensure that the user has entered the same password in
 * both the password and confirm password fields. If the passwords do not match, an error message will
 * be displayed.
 */
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
import { messageViewNew } from '@/store/customeHook/validate'

interface ResetPasswordFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type ResetPasswordFormSchema = {
    password: string
    confirm_password: string
}


const ResetPasswordForm = (props: ResetPasswordFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const [resetComplete, setResetComplete] = useState(false)

    const [message, setMessage] = useTimeOutMessage()
    const [error,setError]=useState<any>({})
    const [formData,setFormData]=useState<any>({})
    const [isSubmitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const emailId=localStorage.getItem("email");
    /**
     * The `onSubmit` function is used to handle the submission of a reset password form, where it
     * calls an API to reset the password and handles any errors that occur.
     * @param {ResetPasswordFormSchema} values - The `values` parameter is an object that contains the
     * form values submitted by the user. In this case, it likely includes a `password` field.
     * @param setSubmitting - A function that takes a boolean value and updates the state of whether
     * the form is submitting or not.
     */
    const validateFormPassword = (formD: any) => {
        const strongPasswordRegex :any= /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const errors: any = {}
      
       
        if(formD.password && !strongPasswordRegex.test(formD?.password)){
            errors.password = 'Minimum 8 characters, at least one number, one symbol and one uppercase letter'
        }
        if (!formD.password) {
            errors.password = "Password can't be Empty !"
        }
        if (!formD.confirm_password) {
            errors.confirm_password = "Confirm Password can't be Empty !"
        }
        if(formD.password !==formD.confirm_password){
            errors.confirm_password = "Password does not match"
        }
        setError(errors)
        return Object.keys(errors).length == 0
    }
    const handlechange = (e: any) => {
        const newData: any = { ...formData }
        newData[e.target.name] = e.target.value
        setFormData(newData)
        if (error[e.target.name]) validateFormPassword(newData);
    }
    const handlesubmit = (e: any) => {
        e.preventDefault()
        console.log("HGGGGGGGG",validateFormPassword(formData));
        

        if (validateFormPassword(formData)) {

            setSubmitting(true)
            apiResetPassword({...formData,email:emailId},messageViewNew,setSubmitting)
        }
    }
 

    const onContinue = () => {
        navigate('/sign-in')
    }
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
                            Your new password must be different from the previous password
                        </p>
                    </>
                )}
            </div>
         
            <Formik
            
            >
                    <Form  onSubmit={(e:any)=>handlesubmit(e)}>
                      
                        <FormContainer>
                            {!resetComplete ? (
                                <>
                                    <FormItem
                                        label="Password*"
                                   >
                                        <Field
                                            autoComplete="off"
                                            name="password"
                                            placeholder="Password"
                                            onChange={handlechange}
                                            component={PasswordInput}
                                        />
                                         <p className='text-[red]'>{error && error?.password}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Confirm Password*"
                                     
                                        className='mt-8'
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="confirm_password"
                                            placeholder="Confirm Password"
                                            onChange={handlechange}
                                            component={PasswordInput}
                                        />
                                         <p className='text-[red]'>{error && error?.confirm_password}</p>
                                    </FormItem>
                                    <Button
                                        block
                                        loading={isSubmitting}
                                        variant="solid"
                                        className='indigo-btn mt-8'
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
            </Formik>
        </div>
    )
}

export default ResetPasswordForm
