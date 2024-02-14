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
    messageViewNew,
    onPasteDefault,
    onkeyDownNew,
    onkeyDownforNumSpecialCharcter,
    validateMovePartnerForm,
} from '@/store/customeHook/validate' // Import custom functions for messages and form validation
import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify' // Import a toast notification container component
import 'react-toastify/dist/ReactToastify.css' // Import CSS for toast notifications
import useApiFetch from '@/store/customeHook/useApiFetch' // Import a custom hook for API fetching
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PartnerMoveMakeModal from './PartnerMoveMakeModal'
// Define the main functional component for PartnerBussinessTypeMove
const PartnerBussinessTypeMove = () => {
    // Get the user's token using a custom hook
    const { id }:any = useParams();
    const { token }: any = getToken()
    // Get the AssetsId from local storage
    const AssetsId: any = localStorage.getItem('assets_list_id')

    // Get the current route location and check if it's disabled
    const location = useLocation()
    const pramas:any=location

    const isDisabled = location?.state

    // Fetch data for vehicle model and make using custom hooks
    const {
        data: vehicalModal,
        loading: vehicalLoading,
        error: vehicalError,
        refetch:fetchList
    } = useApiFetch<any>('master/partner/move/get-vehicle-model', token)
    const {
        data: vehicalMake,
        loading: MakeLoading,
        error: makeError,
        refetch:fetchmake
    } = useApiFetch<any>('master/partner/move/get-vehicle-make', token)

    // Fetch additional data for form pre-filling using a custom hook
    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
    } = useApiFetch<any>(`partner/move/${id}`, token)

    // Define a payload object for the POST request
    const payload = {
        vehicle_make_id: '',
        vehicle_model_id: '',
        permit_validity: '',
        pucc_validity: '',
        chassis_no: '',
        fitness_validity: '',
        mfg_month_year:'',
        vehicle_class:'',
        emission_norms:'',
        actual_payload:'',
        create_capacity:'',
        length: '',
width: '',
hight: '',
gv_weight: '',
unladen_weight_in_rc: '',
engine_no: '',
side_door: '',
hatch_window: '',
dual_temp_bulkhead: '',
rc_no: '',
rc_image: '',
vehicle_no:''
    }

    // Define state variables for form data and errors
    const [data, setData] = useState<any>(payload)
    const [errors, setErrors] = useState<any>(null)

    const [makeCustom, setMakeCustom] = useState<any>(false)
    const [modelCustom, setModelCustom] = useState<any>(false)
    const [longitude,setLongitude]=useState<any>(null)
    const [latitude,setLatitude]=useState<any>(null)

    // Get the navigate function from the routing hook
    const navigate = useNavigate()

    // Define a function to handle form input changes
    const handleChange = (e: any) => {
        const newData: any = { ...data }
        if(e.target.name === 'vehicle_make_id') {
            if(e.target.value === 'other') {
                setMakeCustom(true)
                setModelCustom(true)
            }
            else {
                setMakeCustom(false)
            }
        }
        if(e.target.name === 'vehicle_model_id') {
            if(e.target.value === 'other') {
                setModelCustom(true)
            }
            else {
                setModelCustom(false)
            }
        }
        newData[e.target.name] = e.target.value
        setData(newData)
        
        if(errors[e.target.name])validateMovePartnerForm(newData, setErrors)
    }

    // Get the AssetsId from local storage
    let ID: any = localStorage.getItem('AssetsId')

    // Define a function to handle form submission
    const handlesave = async () => {

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
            formdata.append('vehicle_no', data?.vehicle_no)
            formdata.append('fitness_validity', data?.fitness_validity)
            formdata.append('pucc_validity', data?.mfg_month_year)
            formdata.append('vehicle_class', data?.vehicle_class)
            formdata.append('emission_norms', data?.emission_norms)
            formdata.append('actual_payload', data?.actual_payload)
            formdata.append('create_capacity', data?.create_capacity)
            formdata.append('length', data?.length)
            formdata.append('width', data?.width)
            formdata.append('hight', data?.hight)
            formdata.append('gv_weight', data?.gv_weight)
            formdata.append('unladen_weight_in_rc', data?.unladen_weight_in_rc)
            formdata.append('engine_no', data?.engine_no)
            formdata.append('side_door', data?.side_door)
            formdata.append('hatch_window', data?.hatch_window)
            formdata.append('dual_temp_bulkhead', data?.dual_temp_bulkhead)
            formdata.append('rc_no', data?.rc_no)
            formdata.append('rc_image', data?.rc_image)
            formdata.append("addr_longitude",longitude);
            formdata.append("addr_latitude",latitude);

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
                messageViewNew(result)

                // If the response status is 200, navigate to the specified route
                if (result?.status == 200) {
                    setTimeout(()=>{
                        navigate(`/partner-move-compliance/${id}`)

                    },2000)
                }
            } catch (error: any) {
                // Display an error message on request failure
                messageViewNew(error)
            }
        } else if (isDisabled) {
            // If the form is disabled, navigate to the specified route with state
          setTimeout(()=>{
            navigate(`/partner-move-compliance/${id}`, {
                state: isDisabled,
            })
          },2000)
          
        }
    }

    // Load data into the form when fetchDetails has data
    useEffect(() => {
        if (fetchDetails?.data?.move) {
            setData(fetchDetails?.data?.move)
        }
    }, [fetchDetails?.data?.move])


    const TimeString = (time: any) => {
        const dateTimeString = "2023-09-15T00:00:00.000Z";
        
        const date = new Date(dateTimeString);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate
    }
    const { t, i18n }:any = useTranslation();

    useEffect(()=>{
        function showPosition(position:any) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude)
           
          }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            console.log("Geolocation is not supported by this browser.");
            
          }
    },[])
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add padding if necessary

    // Calculate the minimum allowed date (one year ago)
    const minDate = `${currentYear - 20}-${currentMonth}`;

    // Format the current month and year as 'YYYY-MM'
    const maxDate = `${currentYear}-${currentMonth}`;
    return (
        <div className='lg:flex'>
            <ToastContainer />
            {makeCustom && <PartnerMoveMakeModal modal={makeCustom} setModal={setMakeCustom} fetchList={fetchList} fetchmake={fetchmake} />}
            <div className=' w-[100%] pl-[10%] lg:pl-0 md:pl-4 lg:w-1/6'>
            

            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">                  
    <li className="mb-10 ml-6">            
    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">{t("Asset Specifications")} </h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">{t("Compliance Details")}</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
</ol>




            </div>
            <div className="bg-white m-auto p-2 rounded w-[98%] md:w-[100%] lg:w-5/6 shadow-2xl">
            {/* <ArrowBackIcon onClick={()=>navigate(-1)} /> */}
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
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%]  lg:flex">
                                    <FormItem
                                        label="Make*"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto "
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="vehicle_make_id"
                                            className="border pl-2 flex w-full input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
                                            <option value="other">Other</option>
                                        </select>
                                        {/* :
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            onChange={(e: any) =>r
                                                handleChange(e)
                                            }
                                            name="vehicle_make_id"
                                            value={data?.make}
                                            placeholder="Make"
                                            component={Input}
                                        />} */}

                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.vehicle_make_id}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Model*"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="vehicle_model_id"
                                            className="pl-2 border flex w-full input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
                                        {/* :<Field
                                        disabled={isDisabled}
                                        type="text"
                                        autoComplete="off"
                                        onChange={(e: any) =>
                                            handleChange(e)
                                        }
                                        name="vehicle_model_id"
                                        value={data?.make}
                                        placeholder="Model"
                                        component={Input}
                                    /> */}
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.vehicle_model_id}
                                        </p>
                                    </FormItem>
                                </div>
                                {/* <div className="flex">
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
                                        <p className="text-[red] text-p-error-hight">
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

                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.pucc_validity}
                                        </p>
                                    </FormItem>
                                </div> */}
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%]  lg:flex">
                                    <FormItem
                                        label="Get Chassis No from RC*"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="chassis_no"
                                            value={data?.chassis_no !=undefined ? data?.chassis_no :""}
                                            placeholder="Get Chassis No from RC"
                                            component={Input}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.chassis_no}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Emission norms"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="emission_norms"
                                            value={data?.emission_norms !=="undefined" ? data?.emission_norms :""}
                                            placeholder="Emission norms"
                                            component={Input}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.emission_norms}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%]  lg:flex">
                                    <FormItem
                                        label="MFG Month/Year"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="month"
                                            autoComplete="off"
                                            onKeyDown={(e:any) => e.preventDefault()}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="mfg_month_year"
                                            value={data?.mfg_month_year || '2023-05'}
                                            placeholder="MFG Month/Year"
                                            component={Input}
                                            min={minDate} // Set the minimum allowed date to one year ago
                                            max={maxDate} 
                                            
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.mfg_month_year}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Vehicle Class"
                                        className=" pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            value={data?.vehicle_class !=="undefined" ? data?.vehicle_class :""}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="vehicle_class"
                                            placeholder="Vehicle Class"
                                            component={Input}
                                            onKeyDown={onkeyDownforNumSpecialCharcter}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.vehicle_class}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%]  lg:flex">
                                    <FormItem
                                        label="Vehicle number*"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="vehicle_no"
                                            value={!(data?.vehicle_no =="undefined" || data?.vehicle_no ==undefined) ? data?.vehicle_no :""}
                                            placeholder="Vehicle number"
                                            component={Input}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.vehicle_no}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Actual Payload (in kg)"
                                        className=" pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="number"
                                            onPaste={onPasteDefault}
                                            onWheel={(e:any) => e.target.blur()}
                                            min="0"
                                            autoComplete="off"
                                            value={data?.actual_payload  || ""}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="actual_payload"
                                            placeholder="Actual Payload (in kg)"
                                            component={Input}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.actual_payload}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%]  lg:flex">
                                    <FormItem
                                        label="Crate Capacity (in Numbers)"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="number"
                                            onPaste={onPasteDefault}
                                            onWheel={(e:any) => e.target.blur()}
                                            min="0"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="create_capacity"
                                            value={data?.create_capacity || ""}
                                            placeholder="Crate Capacity"
                                            component={Input}
                                            onKeyDown={onkeyDownNew}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.create_capacity}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Length"
                                        className=" pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="number"
                                            onPaste={onPasteDefault}
                                            onWheel={(e:any) => e.target.blur()}
                                            min="0"
                                            autoComplete="off"
                                            value={data?.length || ""}                          
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="length"
                                            placeholder="Length"
                                            component={Input}
                                            onKeyDown={onkeyDownNew}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.length}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%]  lg:flex">
                                    <FormItem
                                        label="Width"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="number"
                                            onPaste={onPasteDefault}
                                            onWheel={(e:any) => e.target.blur()}
                                            min="0"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="width"
                                            value={data?.width || ""}
                                            placeholder="Width"
                                            component={Input}
                                            onKeyDown={onkeyDownNew}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.width}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Height"
                                        className=" pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="number"
                                            onPaste={onPasteDefault}
                                            onWheel={(e:any) => e.target.blur()}
                                            min="0"
                                            autoComplete="off"
                                            value={data?.hight || ""}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="hight"
                                            placeholder="Height"
                                            component={Input}
                                            onKeyDown={onkeyDownNew}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.hight}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%]  lg:flex">
                                    <FormItem
                                        label="GV Weight"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="number"
                                            onPaste={onPasteDefault}
                                            onWheel={(e:any) => e.target.blur()}
                                            min="0"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="gv_weight"
                                            value={data?.gv_weight || ""}
                                            placeholder="GV Weight"
                                            component={Input}
                                            onKeyDown={onkeyDownNew}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.gv_weight}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Unladen Weight in RC
"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="number"
                                            onPaste={onPasteDefault}
                                            onWheel={(e:any) => e.target.blur()}
                                            min="0"
                                            autoComplete="off"
                                            value={data?.unladen_weight_in_rc || ""}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="unladen_weight_in_rc"
                                            placeholder="Unladen Weight in RC
"
                                            component={Input}
                                            onKeyDown={onkeyDownNew}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.unladen_weight_in_rc}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%]  lg:flex">
                                    <FormItem
                                        label="Get Engine No"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="engine_no"
                                            value={!(data?.engine_no ==undefined) ? data?.engine_no :""}
                                            placeholder="Get Engine No"
                                            component={Input}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.engine_no}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Side Door"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="side_door"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="border h-11 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option
                                                value="true"
                                                selected={data?.side_door}
                                            >
                                                Yes
                                            </option>
                                            <option
                                                value="false"
                                                selected={!data?.side_door}
                                            >
                                                No
                                            </option>
                                        </select>
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.side_door}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%]  lg:flex">
                                    <FormItem
                                        label="Hatch Window"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="hatch_window"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="border h-11 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option
                                                value="true"
                                                selected={data?.hatch_window}
                                            >
                                                Yes
                                            </option>
                                            <option
                                                value="false"
                                                selected={!data?.hatch_window}
                                            >
                                                No
                                            </option>
                                        </select>
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.hatch_window}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Dual Temperature"
                                        className=" pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="dual_temp_bulkhead"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="border h-11 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option
                                                value="true"
                                                selected={data?.dual_temp_bulkhead}
                                            >
                                                Yes
                                            </option>
                                            <option
                                                value="false"
                                                selected={!data?.dual_temp_bulkhead}
                                            >
                                                No
                                            </option>
                                        </select>
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.dual_temp_bulkhead}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%]  lg:flex">
                                    <FormItem
                                        label="RC (Upload clear picture)"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <input
                                            type="file"  
                                            accept="image/png, image/jpeg"
                                            name="rc_image"
                                            id=""
                                      className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.rc_image}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Get RC Number from RC"
                                        className=" pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            value={!(data?.rc_no=="undefined" || data?.rc_no==undefined) ? data?.rc_no :""}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="rc_no"
                                            placeholder="RC Number from RC"
                                            component={Input}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.rc_no}
                                        </p>
                                    </FormItem>
                                </div>

                                <div className="  m-auto mt-2 rounded-md p-2 w-[100%]  lg:flex">
                                    
                                    {/* <FormItem
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
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.fitness_validity}
                                        </p>
                                    </FormItem> */}
                                </div>

                                <div className="flex justify-center">
                                <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        disabled
                                        onClick={()=>navigate(-1)}
                                        className="indigo-btn  !w-[200px] !bg-gray-300 mx-auto rounded-[30px]"
                                    >
                                        Prev
                                    </Button>
                                    <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        onClick={handlesave}
                                        className="indigo-btn !w-[200px] mx-auto rounded-[30px]"
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
