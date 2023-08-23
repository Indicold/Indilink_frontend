import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import { Field, Form, Formik } from 'formik'

import type { CommonProps } from '@/@types/common'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { updateFormData } from '@/store/slices/Authentication/userDetails'

import { debounce } from 'lodash'
import { validateEmail, validateForm, validateMobile } from '@/store/customeHook/validate'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}


const SignUpForm = (props: SignUpFormProps) => {
    const { className, signInUrl = '/sign-in' } = props
    const [error, setError] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
        term_condition: ''
    });
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isMobileValid, setIsMobileValid] = useState(false);
    const [formData, setFormData] = useState<any>({
        first_name: "",
        last_name: "",
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
        gst: '',
        term_condition: false,
    });
    const [isSubmitting, setSubmitting] = useState<Boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const validateEmailDebounced = debounce(validateEmail, 300);
    const validateMobileDebounced = debounce(validateMobile, 300);

    const handleChange = (e: any) => {

        const newData: any = { ...formData };
        newData[e.target.name] = e.target.value;
        if (e.target.name === 'email') {
            validateEmailDebounced(e.target.value, setIsEmailValid);
        } else if (e.target.name === 'phone_number') {
            validateMobileDebounced(e.target.value, setIsMobileValid);
        }
        setFormData(newData);
    }




    const handlesubmit = (e: any) => {
        e.preventDefault();
        console.log(error);


        validateForm(formData, setError)
        if (validateForm(formData, setError)) {
            setSubmitting(true)
            dispatch(updateFormData(formData))
            navigate('/basic-information')
            setSubmitting(false)

        }



    }
    return (

        <div className={className}>

            <Formik
                initialValues={{
                    first_name: null,
                    last_name: null,
                    email: null,
                    phone_number: null,
                    password: null,
                    confirm_password: null,
                    gst: '',
                    term_condition: false,
                }}
                onSubmit={handlesubmit}
            >
                <Form className='signup-form'
                    onSubmit={handlesubmit}>
                    <FormContainer>
                        <div className="flex">
                            <FormItem
                                label="First Name"
                                className='me-auto text-label-title'
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    className="rounded-[13px]"
                                    name="first_name"
                                    placeholder="First Name"
                                    component={Input}
                                    onChange={(e: any) => handleChange(e)}
                                />
                                <p className='text-[red]'>{error && error.first_name}</p>
                            </FormItem>
                            <FormItem
                                label="Last Name"
                                className='me-auto text-label-title'
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    className="rounded-[13px]"
                                    name="last_name"
                                    placeholder="Last Name"
                                    component={Input}
                                    onChange={(e: any) => handleChange(e)}
                                />
                                <p className='text-[red]'>{error && error.last_name}</p>

                            </FormItem>
                        </div>

                        <div className="flex">
                            <FormItem
                                label="Email Address"

                                className='me-auto text-label-title '
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    className="rounded-[13px]"
                                    name="email"
                                    placeholder="Email Address"
                                    component={Input}
                                    onChange={(e: any) => handleChange(e)}
                                />
                                <p className='text-[red] email-msg-text'>{isEmailValid ? isEmailValid : error?.email}</p>
                            </FormItem>
                            <FormItem
                                label="Phone Number"

                                className='me-auto text-label-title'
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    className="rounded-[13px]"
                                    name="phone_number"
                                    placeholder="Phone number"
                                    component={Input}
                                    onChange={(e: any) => handleChange(e)}
                                />
                                <p className='text-[red] email-msg-text'>{isMobileValid ? isMobileValid : error.phone_number}</p>
                            </FormItem>
                        </div>

                        <div className='flex'>
                            <FormItem
                                label="Password"

                                className='me-auto text-label-title'
                            >
                                <Field
                                    autoComplete="off"
                                    className="rounded-[13px]"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                    onChange={(e: any) => handleChange(e)}
                                />
                                <p className='text-[red]'>{error && error.password}</p>

                            </FormItem>
                            <FormItem
                                label="Confirm Password"

                                className='me-auto text-label-title'
                            >
                                <Field
                                    autoComplete="off"
                                    className="rounded-[13px]"
                                    name="confirm_password"
                                    placeholder="Confirm Password"
                                    onChange={(e: any) => handleChange(e)}
                                    component={PasswordInput}
                                  
                                />
                                <p className='text-[red]'>{error && error.password}</p>
                            </FormItem>
                        </div>

                        <div className="flex  w-[95%]">
                            <input type='checkbox' className='me-1 w-5' name="term_condition" onChange={(e: any) => handleChange(e)} />
                            <p className='m-1'><span>I agree to </span>
                                <ActionLink to={signInUrl}><big><u className='!text-[#103492] text-sm'>Terms and Conditions</u></big> </ActionLink>
                                
                              </p>
                        </div>
                        <p className='text-[red]'>{error && error.term_condition}</p>

                        <div className='flex w-[80%] mx-auto '>
                            <Button
                             style={{ borderRadius: "13px" }}
                                block
                                variant="solid"
                                type="submit"
                                className='indigo-btn w-[30%] mx-auto rounded-xl px-4 shadow-lg'
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Sign Up'}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-[#103492]">
                            <span className=''>Already have an account? </span>
                            <ActionLink to={signInUrl} className=' !indigo-btn:hover text-bold decoration-none rounded-lg !text-[#103492]'>Login</ActionLink>
                        </div>
                    </FormContainer>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUpForm
