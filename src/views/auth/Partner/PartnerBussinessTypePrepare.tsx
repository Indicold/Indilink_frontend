/*
 * The above code is a TypeScript React component that represents a form for preparing partner business
 * types. It imports various UI components, hooks, and custom functions for handling tokens, API
 * fetching, form validation, and displaying messages.
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
import { useLocation, useNavigate } from 'react-router-dom' // Import routing related hooks
import { apiUrl, getToken } from '@/store/customeHook/token' // Import a custom hook for handling tokens
import useApiFetch from '@/store/customeHook/useApiFetch' // Import a custom hook for API fetching
import usePostApi from '@/store/customeHook/postApi' // Import a custom hook for making POST requests
import LoaderSpinner from '@/components/LoaderSpinner' // Import a custom loader spinner component
import { messageView, validatePrepareForm } from '@/store/customeHook/validate' // Import custom functions for messages and form validation
import { ToastContainer } from 'react-toastify' // Import a toast notification container component
import ACUModall from './MultistepForm/ACUModal' // Import a custom modal component
import MachineModal from './MultistepForm/MachineModal' // Import another custom modal component
import 'react-accessible-accordion/dist/fancy-example.css' // Import CSS styles for an accordion

// Define the main functional component for PartnerBussinessTypePrepare
const PartnerBussinessTypePrepare = () => {
    // Get the user's token using a custom hook
    const { token }: any = getToken()

    // Get the current route location and check if it's disabled
    const location = useLocation()
    const isDisabled = location?.state || false

    // Get the AssetsId from local storage
    const AssetsId: any = localStorage.getItem('assets_list_id')

    // Fetch data for various elements using custom hooks
    const {
        data: prepareType,
        loading: prepareTypeLoading,
        error: prepareTypeError,
    } = useApiFetch<any>('master/partner/prepare/get-prepare-type', token)
    const {
        data: CityList,
        loading: CityListLoading,
        error: CityListError,
    } = useApiFetch<any>(`master/get-city-by-countryId/${localStorage.getItem('country_id')}`, token)
    const {
        data: ProductType,
        loading: ProductTypeLoading,
        error: ProductTypeError,
    } = useApiFetch<any>('master/partner/prepare/get-product-category', token)
    const {
        data: ProductTypeList,
        loading: PTLLoading,
        error: PTLError,
    } = useApiFetch<any>('master/customer/store/get-product-type', token)


    const {
        data: DockTypeList,
        loading: DTLoading,
        error: DTError,
    } = useApiFetch<any>('master/partner/store/type-of-docks', token)

    // Define state variables for API response and loading status
    const {
        result: PrepareResponse,
        loading: PrepareLoading,
        sendPostRequest: PostPrepareRegisterDetails,
    }: any = usePostApi(`${apiUrl}/partner/prepare/register`)
    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
    } = useApiFetch<any>(`partner/prepare/${AssetsId}`, token)

    // Define a sample payload for the POST request
    const payload: any = {
        asset_id: localStorage.getItem('assets_list_id'),
        city_id: '9',
        address: 'VARANSHI',
        hourly_throughput: '2132',
        prepare_type_id: '4',
        product_category_ids: '6',
        product_type: 'B',
        throughput: 'ghfgh',
        avg_case_size: '4564',
        temperature: '23',
        type_of_dock_id: '4554',
        batch_size: '353453',
        machine_ids: '5545',
        area: '45345343',
    }

    // Define state variable and function for form data
    const [formData, setFormData] = useState<any>({
        asset_id: localStorage.getItem('assets_list_id'),
        city_id: '',
        address: '',
        hourly_throughput: '',
        prepare_type_id: '',
        product_category_ids: '',
        product_type: '',
        throughput: '',
        avg_case_size: '',
        temperature: '',
        no_of_docks: '',
        type_of_dock_id: '',
        batch_size: '',
        machine_ids: '',
        area: '',
    })

    // Define state variable for form validation errors
    const [errors, setErrors] = useState<any>({})

    // Get the navigate function from the routing hook
    const navigate = useNavigate()

    // Define a function to handle form input changes
    const handleChange = (e: any) => {
        const newData = { ...formData }
        newData[e.target.name] = e.target.value
        setFormData(newData)
        if(errors[e.target.name])validatePrepareForm(newData, setErrors)
        console.log("formsdata", formData)
    }

    // Define a function to handle form submission and POST request
    const handleRoute = () => {
        let isValid = validatePrepareForm(formData, setErrors)
        if (isValid) {
            PostPrepareRegisterDetails(formData)
            navigate('/partner-bussiness-type-compliance')
        }
    }

    // Handle success message display on successful POST request
    useEffect(() => {
        if (PrepareResponse?.status && PrepareResponse?.data) {
            messageView('Data Updated Successfully!')
            setTimeout(() => {
                navigate('/partner-bussiness-type-compliance')
            }, 2000)
        }
    }, [PrepareResponse])

    // Define state variable and function for the machine modal
    const [machineModal, setMachineModal] = useState<any>(false)

    // Load data into the form when fetchDetails has data
    useEffect(() => {
        if (fetchDetails?.data) {
            setFormData(fetchDetails?.data)
        }
    }, [fetchDetails])

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

            {PrepareLoading ||
            prepareTypeLoading ||
            CityListLoading ||
            ProductTypeLoading ||
            fetchDetailsloading ? (
                <LoaderSpinner />
            ) : (
                <div className="bg-white w-5/6">
                    <h4 className=" mb-2 text-head-title text-center">
                        Prepare
                    </h4>
                    <div>
                        <Formik>
                            <Form className="py-2 multistep-form-step">
                                {machineModal && (
                                    <MachineModal
                                        modal={machineModal}
                                        setModal={setMachineModal}
                                        formD={formData?.machine_ids}
                                        update={setFormData}
                                    />
                                )}
                                <FormContainer>
                                    <div className="flex">
                                        <FormItem
                                            label="City"
                                            className="mx-auto w-1/2 rounded-lg pl-[22px] "
                                        >
                                            <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                                <select
                                                    disabled={isDisabled}
                                                    className="w-full focus:outline-0"
                                                    name="city_id"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                >
                                                    <option>Select City</option>
                                                    {CityList &&
                                                        CityList?.data?.map(
                                                            (
                                                                item: any,
                                                                index: any
                                                            ) => (
                                                                <option
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                    selected={
                                                                        item?.id ===
                                                                        formData?.city_id
                                                                    }
                                                                >
                                                                    {item?.name}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>
                                            <p className="text-[red]">
                                                {errors && errors.city_id}
                                            </p>
                                        </FormItem>
                                        <FormItem
                                            label="Address"
                                            className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                        >
                                            <Field
                                                disabled={isDisabled}
                                                type="text"
                                                autoComplete="off"
                                                name="address"
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                placeholder="Address"
                                                value={formData?.address}
                                                component={Input}
                                            />
                                            <p className="text-[red]">
                                                {errors && errors.address}
                                            </p>
                                        </FormItem>
                                    </div>

                                    <div className="flex">
                                        <FormItem
                                            label="Total Hourly Throughput(MT)*"
                                            className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                        >
                                              <Field
                                                disabled={isDisabled}
                                                type="number"
                                                autoComplete="off"
                                                name="hourly_throughput"
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                placeholder="Enter value"
                                                value={formData?.hourly_throughput}
                                                component={Input}
                                            />
                                       
                                            <p className="text-[red]">
                                                {errors &&
                                                    errors.hourly_throughput}
                                            </p>
                                        </FormItem>
                                        <FormItem
                                            label="Types Of Prepare"
                                            className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                        >
                                            <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                                <select
                                                    disabled={isDisabled}
                                                    className="w-full focus:outline-0"
                                                    name="prepare_type_id"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                >
                                                    <option>
                                                        Types Of Prepare
                                                    </option>
                                                    {prepareType &&
                                                        prepareType?.data?.map(
                                                            (
                                                                item: any,
                                                                index: any
                                                            ) => (
                                                                <option
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                    selected={
                                                                        item?.id ===
                                                                        formData?.prepare_type_id
                                                                    }
                                                                >
                                                                    {item?.type}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>
                                            <p className="text-[red]">
                                                {errors &&
                                                    errors.prepare_type_id}
                                            </p>
                                        </FormItem>
                                    </div>
                                    <div className="flex">
                                        <FormItem
                                            label="Product Category"
                                            className="rounded-lg pl-[22px] w-1/2"
                                        >
                                            <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                                <select
                                                    disabled={isDisabled}
                                                    className="w-full"
                                                    name="product_category_ids"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                >
                                                    <option>
                                                        Product Category
                                                    </option>
                                                    {ProductType &&
                                                        ProductType?.data?.map(
                                                            (
                                                                item: any,
                                                                index: any
                                                            ) => (
                                                                <option
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                    selected={
                                                                        item?.id ===
                                                                        formData?.product_category_ids[0]
                                                                    }
                                                                >
                                                                    {item?.name}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>
                                            <p className="text-[red]">
                                                {errors &&
                                                    errors.product_category_ids}
                                            </p>
                                        </FormItem>
                                        <FormItem
                                            label="Product Type"
                                            className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                        >
                                            <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                                <select
                                                    disabled={isDisabled}
                                                    className="w-full focus:outline-0"
                                                    name="product_type"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                >
                                                    <option>
                                                        Product Type
                                                    </option>
                                                    {ProductTypeList &&
                                                        ProductTypeList?.data?.map(
                                                            (
                                                                item: any,
                                                                index: any
                                                            ) => (
                                                                <option
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                    selected={
                                                                        item?.id ===
                                                                        formData?.product_type
                                                                    }
                                                                >
                                                                    {item?.type}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>
                                        </FormItem>
                                    </div>
                                    <div className="flex">
                                        <FormItem
                                            label="Throughput"
                                            className=" w-1/2 rounded-lg pl-[22px]"
                                        >
                                            <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                            disabled={isDisabled}
                                                className="w-2/3 border-0 focus:outline-0"
                                                type='number'
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                name="throughput"
                                                value={formData?.throughput}
                                                placeholder="Throughput"
                                            />
                                            <select
                                                   disabled={isDisabled}
                                                className="border-0 ms-auto me-2"
                                            >
                                                <option className='text-end'>MT</option>
                                                <option className='text-end'>Cases</option>
                                                <option className='text-end'>Pallets</option>
                                            </select>
                                        </div>
                                            <p className="text-[red]">
                                                {errors && errors.throughput}
                                            </p>
                                        </FormItem>
                                        <FormItem
                                            label="Avg. case size"
                                            className=" w-1/2 rounded-lg pl-[22px]"
                                        >
                                            <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                disabled={isDisabled}
                                                className="w-2/3 border-0 focus:outline-0"
                                                type='number'
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                name="avg_case_size"
                                                value={formData?.avg_case_size}
                                                placeholder="Avg. case size"
                                            />
                                            <select
                                               disabled={isDisabled}
                                                className="border-0 ms-auto me-2"
                                            >
                                                <option className='text-end'>Kg</option>
                                                <option className='text-end'>Cubic Feet</option>
                                            </select>
                                        </div>
                                            <p className="text-[red]">
                                                {errors && errors.avg_case_size}
                                            </p>
                                        </FormItem>
                                    </div>
                                    <div className="flex">
                                        <FormItem
                                            label="No of Docks"
                                            className=" w-1/2 rounded-lg pl-[22px]"
                                        >
                                            <Field
                                                disabled={isDisabled}
                                                type="number"
                                                autoComplete="off"
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                name="no_of_docks"
                                                value={formData?.no_of_docks}
                                                placeholder="Enter Value"
                                                component={Input}
                                            />
                                            <p className="text-[red]">
                                                {errors && errors.no_of_docks}
                                            </p>
                                        </FormItem>
                                        <FormItem
                                            label="Types of Docks"
                                            className=" w-1/2 rounded-lg pl-[22px]"
                                        >
                                                                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                              <select
                                                    disabled={isDisabled}
                                                    className="w-full focus:outline-0"
                                                    name="type_of_dock_id"
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                >
                                                    <option>
                                                    Dock Type
                                                    </option>
                                                    {DockTypeList &&
                                                        DockTypeList?.data?.map(
                                                            (
                                                                item: any,
                                                                index: any
                                                            ) => (
                                                                <option
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                    selected={
                                                                        item?.id ==
                                                                        formData?.type_of_dock_id
                                                                    }
                                                                >
                                                                    {item?.type}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                          </div>
                                            <p className="text-[red]">
                                                {errors &&
                                                    errors.type_of_dock_id}
                                            </p>
                                        </FormItem>
                                    </div>
                                    <div className="flex">
                                        <FormItem
                                            label="Temperature"
                                            className=" w-1/2 rounded-lg pl-[22px]"
                                        >
                                            <Field
                                                disabled={isDisabled}
                                                type="number"
                                                autoComplete="off"
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                name="temperature"
                                                value={formData?.temperature}
                                                placeholder="Enter Value"
                                                component={Input}
                                            />
                                            <p className="text-[red]">
                                                {errors && errors.temperature}
                                            </p>
                                        </FormItem>
                                        <FormItem
                                            label="Batch Size"
                                            className=" w-1/2 rounded-lg pl-[22px]"
                                        >
                                            <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                disabled={isDisabled}
                                                className="w-2/3 border-0 focus:outline-0"
                                                type='number'
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                name="batch_size"
                                                value={formData?.batch_size}
                                                placeholder="Batch Size"
                                            />
                                            <select
                                                   disabled={isDisabled}
                                                className="border-0 ms-auto me-2 focus:outline-0"
                                            >
                                                <option className='text-end'>MT</option>
                                                <option className='text-end'>Cases</option>
                                                <option className='text-end'>Pallets</option>
                                            </select>
                                        </div>
                                            <p className="text-[red]">
                                                {errors && errors.batch_size}
                                            </p>
                                        </FormItem>
                                    </div>

                                    <div className="flex">
                                        <FormItem
                                            label="Area (Square Feet)*"
                                            className=" w-1/2 rounded-lg pl-[22px]"
                                        >
                                            <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                className="w-full border-0 focus:outline-0"
                                                type='number'
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                name="area"
                                                value={formData?.area}
                                                placeholder="Area"
                                            />
                                            {/* <select
                                                disabled={true}
                                                className="border-0 ms-auto me-2 focus:outline-0"
                                            >
                                                <option className='text-end'>Square feet</option>
                                            </select> */}
                                        </div>
                                            <p className="text-[red]">
                                                {errors && errors.area}
                                            </p>
                                        </FormItem>
                                        <FormItem
                                            label="Machines"
                                            className=" w-1/2 rounded-lg pl-[22px]"
                                        >
                                            <Button
                                                style={{ borderRadius: '13px' }}
                                                block
                                                disabled={isDisabled}
                                                variant="solid"
                                                type="button"
                                                onClick={() =>
                                                    setMachineModal(true)
                                                }
                                                className="indigo-btn w-[300px] mx-auto rounded-[30px]"
                                            >
                                                Add Machine
                                            </Button>
                                            {/* <Field
                                type="text"
                                autoComplete="off"
                                 onChange={(e:any)=>handleChange(e)}
                                name="machine_ids"
                                placeholder="Machines"
                                component={Input}
                            /> */}
                                            <p className="text-[red]">
                                                {errors && errors.machine_ids}
                                            </p>
                                        </FormItem>
                                    </div>
                                    <div className="flex justify-center">
                                        <Button
                                            style={{ borderRadius: '13px' }}
                                            block
                                            variant="solid"
                                            type="button"
                                            onClick={handleRoute}
                                            className="indigo-btn !w-[30%] mx-auto rounded-[30px]"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </FormContainer>
                            </Form>
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PartnerBussinessTypePrepare
