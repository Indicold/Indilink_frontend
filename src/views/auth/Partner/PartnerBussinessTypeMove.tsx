/*
 * The above code is a TypeScript React component that represents a form for moving a partner's
 * business type. It includes various UI components such as buttons, dropdowns, and input fields. The
 * form is handled using Formik, a popular form library for React. The component fetches data from APIs
 * using custom hooks and displays the fetched data in the form fields. It also handles form validation
 * and submission. The form data is sent to an API endpoint for further processing. The component also
 * includes routing functionality to navigate to different routes based on the form submission.
 */
import React, { useEffect, useState } from 'react'
import {
    Button,
    Dropdown,
    FormContainer,
    FormItem,
    Input,
} from '@/components/ui' // Import UI components
import { Field, Form, Formik } from 'formik' // Import Formik for form handling
import { apiUrl, getToken } from '@/store/customeHook/token' // Import a custom hook for handling tokens
import { useLocation, useNavigate, useParams } from 'react-router-dom' // Import routing related hooks
import {
    messageView,
    validateMovePartnerForm,
} from '@/store/customeHook/validate' // Import custom functions for messages and form validation
import { ToastContainer } from 'react-toastify' // Import a toast notification container component
import 'react-toastify/dist/ReactToastify.css' // Import CSS for toast notifications
import useApiFetch from '@/store/customeHook/useApiFetch' // Import a custom hook for API fetching
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Define the main functional component for PartnerBussinessTypeMove
const PartnerBussinessTypeMove = () => {
    // Get the user's token using a custom hook
    const { id }:any = useParams();
    const { token }: any = getToken()
    // Get the AssetsId from local storage
    const AssetsId: any = localStorage.getItem('assets_list_id')
console.log("VVVVVVV",id);

    // Get the current route location and check if it's disabled
    const location = useLocation()
    const pramas:any=location

    const isDisabled = location?.state
    console.log('location', location?.state)

    // Fetch data for vehicle model and make using custom hooks
    const {
        data: vehicalModal,
        loading: vehicalLoading,
        error: vehicalError,
    } = useApiFetch<any>('master/partner/move/get-vehicle-model', token)
    const {
        data: vehicalMake,
        loading: MakeLoading,
        error: makeError,
    } = useApiFetch<any>('master/partner/move/get-vehicle-make', token)

    // Fetch additional data for form pre-filling using a custom hook
    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
    } = useApiFetch<any>(`partner/move/${AssetsId}`, token)

    // Define a payload object for the POST request
    const payload = {
        vehicle_make_id: '',
        vehicle_model_id: '',
        permit_validity: '',
        pucc_validity: '',
        chassis_no: '',
        fitness_validity: '',
    }

    // Define state variables for form data and errors
    const [data, setData] = useState<any>(payload)
    const [errors, setErrors] = useState<any>(null)

    // Get the navigate function from the routing hook
    const navigate = useNavigate()

    // Define a function to handle form input changes
    const handleChange = (e: any) => {
        const newData: any = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
        if(errors[e.target.name])validateMovePartnerForm(newData, setErrors)
    }

    // Get the AssetsId from local storage
    let ID: any = localStorage.getItem('AssetsId')

    // Define a function to handle form submission
    const handlesave = async () => {
        console.log('IDDDDDDDDD', ID)

        // Check form validation and if the form is not disabled
        if (validateMovePartnerForm(data, setErrors) && !isDisabled) {
            // Prepare headers and form data for the POST request
            var myHeaders = new Headers()
            myHeaders.append('Authorization', `Bearer ${token}`)
            var formdata = new FormData()
            formdata.append('asset_id', id)
            formdata.append('vehicle_make_id', data?.vehicle_make_id)
            formdata.append('vehicle_model_id', data?.vehicle_model_id)
            formdata.append('permit_validity', data?.permit_validity)
            formdata.append('pucc_validity', data?.pucc_validity)
            formdata.append('chassis_no', data?.chassis_no)
            formdata.append('fitness_validity', data?.fitness_validity)

            // Prepare request options for the POST request
            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow',
            }

            try {
                // Make the POST request
                const response = await fetch(
                    `${apiUrl}/partner/move/register`,
                    requestOptions
                )
                const result = await response.json()
                messageView(result?.message)

                // If the response status is 200, navigate to the specified route
                if (result?.status == 200 || result?.status) {
                    setTimeout(()=>{
                        navigate(`/partner-bussiness-type-compliance/${id}`)

                    },2000)
                }
            } catch (error: any) {
                // Display an error message on request failure
                messageView(error.message)
            }
        } else if (isDisabled) {
            // If the form is disabled, navigate to the specified route with state
          setTimeout(()=>{
            navigate(`/partner-bussiness-type-compliance/${id}`, {
                state: isDisabled,
            })
          },2000)
          
        }
    }

    // Load data into the form when fetchDetails has data
    useEffect(() => {
        if (fetchDetails?.data) {
            setData(fetchDetails?.data)
        }
    }, [fetchDetails])

    console.log('INDI01AAAA5INDI01AAAA5', fetchDetails)

    // Log vehicalMake?.data for debugging purposes
    {
        console.log('vehicalMake?.data', vehicalMake?.data)
    }
    const TimeString = (time: any) => {
        const dateTimeString = "2023-09-15T00:00:00.000Z";
        
        const date = new Date(dateTimeString);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate
    }
    console.log("66666666666666",TimeString());
    
    return (
        <div className='flex'>
            <ToastContainer />
            <div className='w-1/6'>
            

            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">                  
    <li className="mb-10 ml-6">            
    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">Asset Specifications</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">Compliance Details</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">Additional submissions</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
</ol>




            </div>
            <div className="bg-white w-5/6">
                <ArrowBackIcon onClick={()=>navigate(-1)} />
                <h4 className=" mb-2 text-head-title text-center p-4">Move</h4>
                <div>
                    <Formik
                        initialValues={{ field: true }}
                        onSubmit={() =>
                            console.log('Submited via my onSubmit function')
                        }
                    >
                        <Form className="py-2 multistep-form-step">
                            <FormContainer>
                                <div className="flex">
                                    <FormItem
                                        label="Make*"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px] "
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="vehicle_make_id"
                                            className="border flex h-11 w-full input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select Make</option>
                                            {vehicalMake &&
                                                vehicalMake?.data?.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            value={item?.id}
                                                            selected={
                                                                item?.id ===
                                                                data?.vehicle_make_id
                                                            }
                                                        >
                                                            {item?.name}
                                                        </option>
                                                    )
                                                )}
                                        </select>

                                        <p className="text-[red]">
                                            {errors && errors.vehicle_make_id}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Model*"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="vehicle_model_id"
                                            className="border flex h-11 w-full input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select Model</option>
                                            {vehicalModal &&
                                                vehicalModal?.data?.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            value={
                                                                item?.vehicle_make_id
                                                            }
                                                            selected={
                                                                item?.id ==
                                                                data?.vehicle_model_id
                                                            }
                                                        >
                                                            {item?.name}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.vehicle_model_id}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Permit valid Till Date*"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="date"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="permit_validity"
                                            value={data?.permit_validity && TimeString(data?.permit_validity)}
                                            placeholder="Permit Validity Date"
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.permit_validity}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="PUCC valid Till Date*"
                                        className="rounded-lg pl-[22px] w-1/2"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="date"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="pucc_validity"
                                            value={data?.pucc_validity && TimeString(data?.pucc_validity)}
                                            placeholder="PUCC valid Till Date"
                                            component={Input}
                                        />

                                        <p className="text-[red]">
                                            {errors && errors.pucc_validity}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Get Chassis No from RC*"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="chassis_no"
                                            value={data?.chassis_no}
                                            placeholder="Get Chassis No from RC"
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.chassis_no}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Fitness Certificate Valid Till*"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="date"
                                            autoComplete="off"
                                            value={data?.fitness_validity && TimeString(data?.fitness_validity)}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="fitness_validity"
                                            placeholder="Fitness Certificate Valid Till"
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.fitness_validity}
                                        </p>
                                    </FormItem>
                                </div>

                                <div className="flex justify-center">
                                <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        disabled
                                        onClick={()=>navigate(-1)}
                                        className="indigo-btn mt-2 !w-[200px] !bg-gray-300 mx-auto rounded-[30px]"
                                    >
                                        Prev
                                    </Button>
                                    <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        onClick={handlesave}
                                        className="indigo-btn m-4 !w-[200px] mx-auto rounded-[30px]"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default PartnerBussinessTypeMove
