import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { useNavigate } from 'react-router-dom'
import { setUser } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { error } from 'console'
import { updateFormData } from '@/store/slices/Authentication/userDetails'
import usePostApi from '@/store/customeHook/postApi'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    first_name: string
    last_name: string
    password: string
    confirm_password: string
    email: string
    phone_number: string
    term_condition:String
    gst:String
}

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter your user name'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'Your passwords do not match'
    ),
})

const SignUpForm = (props: SignUpFormProps) => {
    const { result, loading, sendPostRequest } = usePostApi('https://seal-app-uqxwl.ondigitalocean.app/auth/check_email');
    const { disableSubmit = true, className, signInUrl = '/sign-in' } = props
    const selector=useSelector((state:any)=>state)
    const [error, setError] = useState({ first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password:''});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password:'',
        gst: '',
        term_condition:''
      });
    const [isSubmitting,setSubmitting]=useState<Boolean>(false)
    const dispatch=useDispatch()


    const navigate = useNavigate()

    const handleChange=(e:any)=>{
const newData:any={...formData};
newData[e.target.name]=e.target.value;
setFormData(newData);
    }
    const validateForm = () => {
        const errorss:any={}
      
        if (formData.password !== formData.confirm_password) {
            console.log("formData.password !== formData.confirm_password",formData.password,formData.confirm_password);
            
            errorss.password='Passwords do not match';
        }
      
        // Add more specific validation rules for each field
        if (!formData.first_name) {
            console.log("hhhhhhh");
            
            errorss.first_name='First name required';
        }
      
        if (!formData.last_name) {
            errorss.last_name='Last name required';
        }
      
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errorss.email='Invalid email address';
        }
        if (/\S+@\S+\.\S+/.test(formData.email)) {
            sendPostRequest({email:formData?.email})
                // errorss.email='Not Found email address';

        }
      
        if (!/^[0-9+\-]+$/.test(formData.phone_number)) {
            errorss.phone_number='Invalid phone number';
        }
      console.log(errorss);
      
        // Add more validation rules for other fields
      setError(errorss)
        return Object.keys(errorss).length==0; // Empty string indicates no validation errors
      };

      console.log("result",result);
      
 const handlesubmit=(e:any)=>{
    e.preventDefault();
    console.log(error);
    

    validateForm()
console.log("hhhhh5545",error,validateForm())
    if (validateForm()) {
        setSubmitting(true)
         dispatch(updateFormData(formData))
        navigate('/basic-information')
         setSubmitting(false)
        
    }
    // setUser(formData)

console.log("selector",selector?.auth?.details);


 }
    return (
        
        <div className={className}>
            {/* {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )} */}
            
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
                validationSchema={validationSchema}
                onSubmit={handlesubmit}
            >
                    <Form className='signup-form' 
                    onSubmit={handlesubmit}>
                        <FormContainer>
                            <div className="flex">
                                <FormItem
                                    label="First Name"
                                    // invalid="hello"
                                    // {error && error.field === 'first_name' && error.message}
                                      errorMessage="hello"
                                    className='me-auto'
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="first_name"
                                        placeholder="First Name"
                                        component={Input}
                                        onChange={(e:any)=>handleChange(e)}
                                        className=''
                                    />
                                    <p className='text-red'>{error && error.first_name}</p>
                                </FormItem>
                                <FormItem
                                    label="Last name"
                                    // invalid={errors.email && touched.email}
                                    // errorMessage={errors.email}
                                    className='me-auto'
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="last_name"
                                        placeholder="Last Name"
                                        component={Input}
                                        onChange={(e:any)=>handleChange(e)}
                                        className=''
                                    />
      <p className='text-red'>{error && error.last_name}</p>

                                </FormItem>
                            </div>

                            <div className="flex">
                                <FormItem
                                    label="Email address"
                                    // invalid={errors.userName && touched.userName}
                                    // errorMessage={errors.userName}
                                    className='me-auto'
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Email Address"
                                        component={Input}
                                        onChange={(e:any)=>handleChange(e)}
                                        className=''
                                    />
                                    <p className='text-red'>{error && error.email}</p>
                                </FormItem>
                                <FormItem
                                    label="Phone number"
                                    // invalid={errors.email && touched.email}
                                    // errorMessage={errors.email}
                                    className='me-auto'
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="phone_number"
                                        placeholder="Phone number"
                                        component={Input}
                                        onChange={(e:any)=>handleChange(e)}
                                        className=''
                                    />
                                     <p className='text-red'>{error && error.phone_number}</p>
                                </FormItem>
                            </div>
                            
                            <div className='flex'>
                                <FormItem
                                    label="Password"
                                    // invalid={errors.password && touched.password}
                                    // errorMessage={errors.password}
                                    className='me-auto'
                                >
                                    <Field
                                        autoComplete="off"
                                        name="password"
                                        placeholder="Password"
                                        component={PasswordInput}
                                        onChange={(e:any)=>handleChange(e)}
                                        className='w-5/6'
                                    />
 <p className='text-red'>{error && error.password}</p>

                                </FormItem>
                                <FormItem
                                    label="Confirm Password"
                                    // invalid={
                                    //     errors.confirmPassword &&
                                    //     touched.confirmPassword
                                    // }
                                    // errorMessage={errors.confirmPassword}
                                    className='me-auto'
                                >
                                    <Field
                                        autoComplete="off"
                                        name="confirm_password"
                                        placeholder="Confirm Password"
                                        onChange={(e:any)=>handleChange(e)}
                                        component={PasswordInput}
                                        className='w-5/6'
                                    />
                                     <p className='text-red'>{error && error.password}</p>
                                </FormItem>
                            </div>

                            <div className="flex mb-4 w-4/5 mx-auto">
                                <input type='checkbox' className='me-2 w-5'  name="term_condition"   onChange={(e:any)=>handleChange(e)} />
                                <p><span>I agree to </span>
                                <ActionLink to={signInUrl}><big><u>Terms and Conditions</u></big> </ActionLink>
                                <span>agreement or </span>
                                <ActionLink to={signInUrl}><big><u>Privacy Policy</u></big></ActionLink></p>
                            </div>

                            <div className='flex'>
                                <Button
                                    block
                                    // loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    className='signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                                >
                                    {isSubmitting
                                        ? 'Creating Account...'
                                        : 'Sign Up'}
                                </Button>
                            </div>
                            <div className="mt-4 text-center">
                                <span className='me-4'>Already have an account? </span>
                                <ActionLink to={signInUrl}><Button className='login-btn-signupform'>Login</Button></ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
            </Formik>
        </div>
    )
}

export default SignUpForm
