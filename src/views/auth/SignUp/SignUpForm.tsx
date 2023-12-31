/*
 * The above code is a TypeScript React component that represents a sign-up form.
 * It imports various components from different files and libraries such as FormItem,
 * FormContainer, Input, Button, PasswordInput, ActionLink, Field, Form, Formik, etc.
 * It also imports some utility functions from
 * lodash library.
 */
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
import {
    onkeyDownOne,
    validateEmail,
    validateForm,
    validateMobile,
} from '@/store/customeHook/validate'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

const SignUpForm = (props: SignUpFormProps) => {
    /* The code snippet is declaring and initializing multiple variables using destructuring assignment
   and the useState hook. */
    const { className, signInUrl = '/sign-in' } = props
    const [error, setError] = useState<any>({
        first_name: '',
        // last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
        term_condition: '',
    })
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isMobileValid, setIsMobileValid] = useState(false)
    const [formData, setFormData] = useState<any>({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
        gst: '',
        term_condition: false,
    })
    const [isSubmitting, setSubmitting] = useState<Boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validateEmailDebounced = debounce(validateEmail, 300)
    const validateMobileDebounced = debounce(validateMobile, 300)

    const [phone, setPhone] = useState('');

    /**
     * The handleChange function updates the formData state based on the input value and performs
     * validation for email and phone number inputs.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the change, such as a user typing in an input
     * field or selecting an option from a dropdown.
     */
    const handleChange = (e: any) => {
        const newData: any = { ...formData }
        
        if (e.target.name === 'email') {
            validateEmailDebounced(e.target.value, setIsEmailValid)
        } else if (e.target.name === 'phone_number') {
            if(e.target.value.replace(/[^0-9]/g, "").length > 0)validateMobileDebounced(e.target.value.replace(/[^0-9]/g, ""), setIsMobileValid)
             setPhone(e.target.value.replace(/[^0-9]/g, ""))
        }
        newData[e.target.name] = e.target.value
        setFormData(newData)
        if(error[e.target.name] || e.target.name === "password" || e.target.name === "confirm_password")validateForm(newData, setError)
    }

    const handleTermConditionChange = (e: any) => {
        const newData: any = { ... formData }
        if (e.target.checked) {
            newData['term_condition'] = "on"
        }
        else {
            newData['term_condition'] = "off"
        }
        validateForm(newData, setError)
        setFormData(newData)
    }

    /**
     * The `handlesubmit` function is used to handle form submission in a TypeScript React component.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handlesubmit`
     * function. It is typically an event object that is triggered when a form is submitted.
     */
    const handlesubmit = (e: any) => {
        e.preventDefault()
        // validateForm(formData, setError)
        if (validateForm(formData, setError)) {
            setSubmitting(true)
            dispatch(updateFormData(formData))
            navigate('/basic-information')
            setSubmitting(false)
        }
    }
    return (
        <div className={className}>
            {/* The above code is a form component written in TypeScript and React using the Formik
            library. It is a sign-up form that collects user information such as first name, last
            name, email address, phone number, password, and confirm password. */}
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
                <Form className="signup-form w-[100%]" onSubmit={handlesubmit}>
                    <FormContainer>
                        <div className="sm:flex md:flex lx:flex" >
                            <FormItem
                                label="First Name" 
                                className="me-auto w-[100%] text-label-title"
                                asterisk={true}
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
                                <p className="text-[red] normal-case">
                                    {error && error.first_name}
                                </p>
                            </FormItem>
                            
                            <FormItem
                                label="Last Name"
                                className="me-auto text-label-title w-[100%]"
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
                                {/* <p className='text-[red]'>{error && error.last_name}</p> */}
                            </FormItem>
                        </div>

                        <div className="">
                            <FormItem
                                label="Email Address"
                                className="w-[100%] text-label-title "
                                asterisk={true}
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
                                <p className="text-[red] normal-case">
                                    {isEmailValid ? isEmailValid !== 'Eligible'? isEmailValid : '' : error?.email}
                                </p>
                            </FormItem>
                            <FormItem
                                label="Phone Number"
                                className="me-auto text-label-title"
                                asterisk={true}
                            >
                                <Field
                                    type="tel"
                                    autoComplete="off"
                                    minLength={10}
                                    maxLength={10}
                                    value={phone}
                                    className="rounded-[13px]"
                                    name="phone_number"
                                    placeholder="Phone number"
                                    component={Input}
                                    onChange={(e: any) => handleChange(e)}
                                    onKeyDown={onkeyDownOne}
                                />
                                <p className="text-[red] normal-case">
                                    {isMobileValid
                                       ? isMobileValid !== 'Eligible' ? isMobileValid : ''
                                        : error.phone_number}
                                </p>
                            </FormItem>
                        </div>

                        <div className="sm:fle md:flex xl:flex">
                            <FormItem
                                label="Password"
                                className="me-auto w-[100%] text-label-title !mb-0"
                                asterisk={true}
                            >
                                <Field
                                    autoComplete="off"
                                    className="rounded-[13px]"
                                    name="password"
                                    maxLength={16}
                                    placeholder="Password"
                                    component={PasswordInput}
                                    onChange={(e: any) => handleChange(e)}
                                />
                                <p className="text-[red] normal-case">
                                    {error && error.password}
                                </p>
                            </FormItem>
                            <FormItem
                                label="Confirm Password"
                                className="me-auto w-[100%] text-label-title"
                                asterisk={true}
                            >
                                <Field
                                    autoComplete="off"
                                    className="rounded-[13px]"
                                    name="confirm_password"
                                    maxLength={16}
                                    placeholder="Confirm Password"
                                    onChange={(e: any) => handleChange(e)}
                                    component={PasswordInput}
                                />
                                <p className="text-[red] normal-case">
                                    {error && error.password}
                                </p>
                            </FormItem>
                        </div>

                        <div className="flex w-[100%]">
                            <input
                                type="checkbox"
                                className="me-1 w-5"
                                name="term_condition"
                                onClick={(e: any) => handleTermConditionChange(e)}
                                checked={formData?.term_condition === "on" ? true: false}
                            />
                            <p className="m-1">
                                <span>I agree to </span>
                                <ActionLink to={'/terms'}>
                                    <big className="!text-[#103492] text-sm hover:underline font-semibold">
                                        Terms and Conditions
                                    </big>{' '}
                                </ActionLink>
                            </p>
                        </div>
                        <p className="text-[red]  normal-case">
                            {error && error.term_condition}
                        </p>

                        <div className="flex mx-auto mt-3">
                            <Button
                                // style={{ borderRadius: '13px' }}
                                block
                                variant="solid"
                                type="submit"
                                className="indigo-btn  mx-auto rounded-xl px-4 shadow-lg"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Create account'}
                            </Button>
                        </div>
                        <div className="mt-3 text-center text-[#103492]">
                            <span className="mr-3">
                                Already have an account?{''}
                            </span>
                            <ActionLink
                                to={signInUrl}
                            >
                                <big className="h-11 hover:underline mx-auto radius-round rounded-xl w-[30%] w-full !text-[#103492] text-sm font-semibold">
                                    Login
                                </big>
                            </ActionLink>
                        </div>
                    </FormContainer>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUpForm
