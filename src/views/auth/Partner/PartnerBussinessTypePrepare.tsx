/*
 * The above code is a TypeScript React component that represents a form for preparing partner business
 * types. It imports various UI components, hooks, and custom functions for handling tokens, API
 * fetching, form validation, and displaying messages.
 */
import React, { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
import {
    Button,
    Dropdown,
    FormContainer,
    FormItem,
    Input,
} from '@/components/ui' // Import UI components
import { useTranslation } from 'react-i18next'
import { Field, Form, Formik } from 'formik' // Import Formik for form handling
import { useLocation, useNavigate, useParams } from 'react-router-dom' // Import routing related hooks
import { apiUrl, getToken } from '@/store/customeHook/token' // Import a custom hook for handling tokens
import useApiFetch from '@/store/customeHook/useApiFetch' // Import a custom hook for API fetching
import usePostApi from '@/store/customeHook/postApi' // Import a custom hook for making POST requests
import LoaderSpinner from '@/components/LoaderSpinner' // Import a custom loader spinner component
import { messageView, onkeyDown, validatePrepareForm } from '@/store/customeHook/validate' // Import custom functions for messages and form validation
import { ToastContainer } from 'react-toastify' // Import a toast notification container component
import ACUModall from './MultistepForm/ACUModal' // Import a custom modal component
import MachineModal from './MultistepForm/MachineModal' // Import another custom modal component
import 'react-accessible-accordion/dist/fancy-example.css' // Import CSS styles for an accordion
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Autocomplete, TextField } from '@mui/material'
import MachineTable from './MachineTable';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion'

const tableHead = {
    id: "ID",
    type_of_machine: "Machine Type",
    name: "Name",
    make:"Make",
  // is_deleted: "Is Deleted",
  // is_deletedBy: "Is Deleted By",

  Action: "Action"
};
// Define the main functional component for PartnerBussinessTypePrepare
const PartnerBussinessTypePrepare = () => {
    // Get the user's token using a custom hook
    const { token }: any = getToken()
    const {id}:any=useParams();
    // Get the current route location and check if it's disabled
    const location = useLocation()
    const isDisabled = location?.state || false

    // Get the AssetsId from local storage

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
        data: MachineList,
        loading: MLLoading,
        // error: PTLError,
        refetch:fetchMachineList
    } = useApiFetch<any>(`partner/prepare/components-all/${id}`, token)

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
    }: any = usePostApi(`partner/prepare/register`)
    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
    } = useApiFetch<any>(`partner/prepare/${id}`, token)

    const { data: ListOfUnit, loading: LOUloading, error: LOUerror } =
        useApiFetch<any>(`master/customer/store/get-unit-type`, token);

    // Define a sample payload for the POST request

    const fixedOptions: any = [];
    const [value, setValue] = React.useState([...fixedOptions]);
    const fixedOptions1: any = [];
    const [value1, setValue1] = React.useState([...fixedOptions1]);
    // Define state variable and function for form data
    const [formData, setFormData] = useState<any>({
        asset_id:id,
        city_id: '',
        address: '',
        hourly_throughput: '',
        prepare_type_id: '',
        product_category_ids: '',
        product_type: value || [],
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
        if (errors[e.target.name]) validatePrepareForm(newData, setErrors)
    }

    // Define a function to handle form submission and POST request
    const handleRoute = () => {
        formData.product_category_ids=value1?.map((item:any)=>item?.id);
        formData.product_type=value?.map((item:any)=>item?.id);
        let isValid = validatePrepareForm(formData, setErrors)
        if (isValid) {
            PostPrepareRegisterDetails(formData)
            navigate(`/partner-bussiness-type-compliance/${id}`,{state:isDisabled})
        }
    }

    // Handle success message display on successful POST request
    useEffect(() => {
        if (PrepareResponse?.status!==400 && PrepareResponse?.data) {
            messageView('Data Updated Successfully!')
            setTimeout(() => {
                navigate(`/partner-bussiness-type-compliance/${id}`,{state:isDisabled})
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
 

    /* The above code is using the useEffect hook in a React component. It is updating the formData
    state by spreading the existing formData and updating the product_type and product_category_ids
    properties based on the values in the "value" array. It is mapping over the "value" array and
    extracting the "id" property from each item, and then assigning the resulting array to the
    product_type property in the formData state. */
    useEffect(() => {
        setFormData({ ...formData, product_type: value?.map((item: any) => item?.id), product_category_ids: value1?.map((item: any) => item?.id) })
    }, [value])

    /* The above code is using the `useEffect` hook in a React component. It is setting the values of
    certain properties in the `formData` object. Specifically, it is setting the values of
    `throughput_unit_id`, `avg_case_size_unit_id`, and `batch_size_unit_id` to 1, 2, and 1
    respectively. This code is executed only once, when the component is mounted, as indicated by
    the empty dependency array `[]` passed as the second argument to `useEffect`. */
    useEffect(() => {
        setFormData({ ...formData, throughput_unit_id: 1, avg_case_size_unit_id: 2, batch_size_unit_id: 1 })
    }, [])
    const targetArray1: any = ProductType?.data || [];
    const itemsToFind1 = formData?.product_category_ids;

    /* The above code is a useEffect hook in a TypeScript React component. It is used to perform some
    logic when the dependency `ProductType?.data` changes. */
    useEffect(() => {
        const foundItems: any = itemsToFind1.length > 0 ? targetArray1?.filter((item: any) => itemsToFind1?.includes(item?.id)) : targetArray1?.filter((item: any) => item?.id === itemsToFind1);
        setValue1(foundItems)
    }, [ProductType?.data])
    const targetArray: any = ProductTypeList?.data || [];
    const itemsToFind = formData?.product_type;

    /* The above code is a useEffect hook in a TypeScript React component. It is triggered whenever the
    `ProductTypeList.data` changes. */
    useEffect(() => {
        if(ProductTypeList?.data!==null){
            const foundItems: any = itemsToFind.length > 0 ? targetArray?.filter((item: any) => itemsToFind?.includes(item?.id)) : targetArray?.filter((item: any) => item?.id === itemsToFind);
            setValue(foundItems)
        }
       
    }, [ProductTypeList?.data])

    /* The above code is using the useEffect hook in a TypeScript React component. It is calling the
    fetchMachineList function when the machineModal or MachineList variables change. */
    useEffect(() => {
        fetchMachineList();
    }, [machineModal, MachineList]);
    const { t, i18n }:any = useTranslation();

    return (
        <div className='flexlg:flex md:flex'>
            <ToastContainer />

            <div className='md:w-1/6 w-[100%] pl-[10%] md:pl-[0] lg:pl-0 lg:w-1/6'>


                <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                            </svg>
                        </span>
                        <h6 className="font-medium leading-tight">{t("Asset Specifications")} </h6>
                        {/* <p className="text-sm">Step details here</p> */}
                    </li>
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                            </svg>
                        </span>
                        <h6 className="font-medium leading-tight">{t("Compliance Details")}</h6>
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
                <div className="bg-white m-auto p-2 rounded w-[98%] md:w-5/6 lg:w-5/6">
                    <ArrowBackIcon onClick={() => navigate(-1)} />
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
                                        formD={formData}
                                        fetchMachineList={fetchMachineList}
                                        update={setFormData}
                                    />
                                )}
                                <FormContainer>
                                    <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                        <FormItem
                                            label="City*"
                                            className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto "
                                        >
                                            <div className="border flex  w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
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
                                            label="Address*"
                                            className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
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

                                    <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                        <FormItem
                                            label="Total Hourly Throughput(MT)*"
                                            className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                        >
                                            <Field
                                                disabled={isDisabled}
                                                type="number"
                                                min={0}
                                                onKeyDown={onkeyDown}
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
                                            label="Types Of Prepare*"
                                            className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
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
                                    <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                        <FormItem
                                            label="Product Category*"
                                            className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                        >
                                            <Autocomplete
                                                multiple
                                                limitTags={1}
                                                disabled={isDisabled}
                                                id="fixed-tags-demo"
                                                value={value1}
                                                onChange={(event, newValue) => {
                                                    setValue1([
                                                        ...fixedOptions1,
                                                        ...newValue.filter((option) => fixedOptions1.indexOf(option) === -1),
                                                    ]);
                                                    handleChange(event)
                                                }}
                                                options={ProductType ? ProductType?.data : []}
                                                getOptionLabel={(option: any) => option?.name}
                                                renderTags={(tagValue, getTagProps) =>
                                                    tagValue.map((option, index) => (
                                                        <Chip
                                                            label={option?.name}
                                                            {...getTagProps({ index })}
                                                            disabled={fixedOptions.indexOf(option) !== -1}
                                                        />
                                                    ))
                                                }
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        name="product_category_ids"
                                                        placeholder="Product Category"
                                                       
                                                     />
                                                    
                                                )}
                                            />
                                            {/* <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                                <select
                                                    disabled={isDisabled}
                                                    className="w-full focus:outline-0"
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
                                            </div> */}
                                            <p className="text-[red]">
                                                {errors &&
                                                    errors.product_category_ids}
                                            </p>
                                        </FormItem>
                                        <FormItem
                                            label="Product Type"
                                            className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                        >
                                            <Autocomplete
                                                multiple
                                                limitTags={1}
                                                id="fixed-tags-demo"
                                                disabled={isDisabled}
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue([
                                                        ...fixedOptions,
                                                        ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                                                    ]);
                                                    handleChange(event)
                                                }}
                                                options={ProductTypeList ? ProductTypeList?.data : []}
                                                getOptionLabel={(option: any) => option?.type}
                                                renderTags={(tagValue, getTagProps) =>
                                                    tagValue.map((option, index) => (
                                                        <Chip
                                                            label={option?.type}
                                                            {...getTagProps({ index })}
                                                            disabled={fixedOptions.indexOf(option) !== -1}
                                                        />
                                                    ))
                                                }
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        name="product_type"
                                                        placeholder="Product Type" />
                                                )}
                                            />
                                            {/*                                             
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
                                              

                                            </div> */}

                                        </FormItem>
                                    </div>
                                    <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                        <FormItem
                                            label="Throughput(MT)*"
                                            className=" pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                        >
                                            <div className="border flex justify-between h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                                <input
                                                    disabled={isDisabled}
                                                    className="w-2/3 border-0 focus:outline-0"
                                                    type='number'
                                                    min={0}
                                                    onKeyDown={onkeyDown}
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="throughput"
                                                    value={formData?.throughput}
                                                    placeholder="Throughput"
                                                />
                                                <select
                                                    disabled={isDisabled}
                                                    onChange={(e: any) => handleChange(e)}
                                                    name="throughput_unit_id"
                                                    className=" w-[20%]  input-md right-0 focus-within:border-indigo-600 focus:border-indigo-600"
                                                >

                                                    {ListOfUnit && ListOfUnit?.data?.filter((item: any) => [2, 3, 6].includes(item?.id)).map((item: any, index: any) => (
                                                        <option value={item?.id} selected={item?.id === formData?.throughput_unit_id}>{item?.type}</option>

                                                    ))}
                                                </select>
                                            </div>
                                            <p className="text-[red]">
                                                {errors && errors.throughput}
                                            </p>
                                        </FormItem>
                                        <FormItem
                                            label="Avg. case size*"
                                            className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                        >
                                            <div className="border flex justify-between h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                                <input
                                                    disabled={isDisabled}
                                                    className="w-2/3 border-0 focus:outline-0"
                                                    type='number'
                                                    min={0}
                                                    onKeyDown={onkeyDown}
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="avg_case_size"
                                                    value={formData?.avg_case_size}
                                                    placeholder="Avg. case size"
                                                />
                                                <select
                                                    disabled={isDisabled}
                                                    onChange={(e: any) => handleChange(e)}
                                                    name="avg_case_size_unit_id"
                                                    className="w-[20%]  input-md focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                                >

                                                    {ListOfUnit && ListOfUnit?.data?.filter((item: any) => [1, 7].includes(item?.id)).map((item: any, index: any) => (
                                                        <option value={item?.id} selected={formData?.case_size_unit_id}>{item?.type}</option>

                                                    ))}
                                                </select>
                                            </div>
                                            <p className="text-[red]">
                                                {errors && errors.avg_case_size}
                                            </p>
                                        </FormItem>
                                    </div>
                                    <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                        <FormItem
                                            label="No of Docks"
                                            className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                        >
                                            <Field
                                                disabled={isDisabled}
                                                type="number"
                                                autoComplete="off"
                                                min={0}
                                                onKeyDown={onkeyDown}
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                name="no_of_docks"
                                                defaultValue={formData?.no_of_docks || 2}
                                                // value={formData?.no_of_docks}
                                                placeholder="Enter Value"
                                                component={Input}
                                            />
                                            <p className="text-[red]">
                                                {errors && errors.no_of_docks}
                                            </p>
                                        </FormItem>
                                        <FormItem
                                            label="Area (Square Feet)"
                                            className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                        >
                                            <div className="border flex w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                                <input
                                                    className="w-full border-0 focus:outline-0"
                                                    type='number'
                                                    min={0}
                                                    onKeyDown={onkeyDown}
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="area"
                                                    value={formData?.area}
                                                    disabled={isDisabled}
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
                                        {/* <FormItem
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
                                        </FormItem> */}
                                    </div>
                                    <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                        <FormItem
                                            label="Temperature*"
                                            className=" pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                        >
                                            <div className='flex input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                                <input type="number" placeholder='Min' className='w-1/2 text-center focus:outline-0' name='temperature_min' value={formData?.temperature_min} onChange={(e: any) => handleChange(e)} disabled={isDisabled}/>
                                                <input type="number" placeholder='Max' className='w-1/2 text-center focus:outline-0' name='temperature_max' value={formData?.temperature_max} onChange={(e: any) => handleChange(e)} disabled={isDisabled}/>
                                            </div>
                                            {/* <Field
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
                                            /> */}
                                            <p className="text-[red]">
                                                {errors && errors.temperature_min}
                                            </p>
                                        </FormItem>
                                        <FormItem
                                            label="Batch Size*"
                                            className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                        >
                                            <div className="border flex justify-between h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                                <input
                                                    disabled={isDisabled}
                                                    className="w-2/3 border-0 focus:outline-0"
                                                    type='number'
                                                    min={0}
                                                    onKeyDown={onkeyDown}
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                    name="batch_size"
                                                    value={formData?.batch_size}
                                                    placeholder="Batch Size"
                                                />
                                                <select
                                                    disabled={isDisabled}
                                                    onChange={(e: any) => handleChange(e)}
                                                    name="batch_size_unit_id"
                                                    className=" w-[20%]  input-md focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                                >

                                                    {ListOfUnit && ListOfUnit?.data?.filter((item: any) => [2, 3, 6].includes(item?.id)).map((item: any, index: any) => (
                                                        <option value={item?.id} selected={formData?.case_size_unit_id}>{item?.type}</option>

                                                    ))}
                                                </select>
                                            </div>
                                            <p className="text-[red]">
                                                {errors && errors.batch_size}
                                            </p>
                                        </FormItem>
                                    </div>

                                    <Accordion>
                                        <AccordionItem>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    Machines
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                            {MachineList?.data?.machines?.length > 0 &&
                                                    <MachineTable AllStore={MachineList?.data?.machines} tableHead={tableHead}
                                                        modal={machineModal}
                                                        setFormData={setFormData}
                                                        setModal={setMachineModal} />
                                                }
                                    <div className="flex">

                                        <FormItem
                                            // label="Machines"
                                            className=" pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                        >
                                            <Button
                                                style={{ borderRadius: '13px' }}
                                                disabled={isDisabled}
                                                type="button"
                                                onClick={() =>{
                                                    setFormData({});
                                                    setMachineModal(true)
                                                }}
                                                className="text-white indigo-btn mx-auto rounded-[30px] px-[65px] py-4 my-2"
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
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    </Accordion>

                                    <div className="flex justify-center">
                                        <Button
                                            style={{ borderRadius: '13px' }}
                                            block
                                            variant="solid"
                                            type="button"
                                            disabled
                                            onClick={() => navigate(-1)}
                                            className="indigo-btn mt-2 !w-[30%] !bg-gray-300 mx-auto rounded-[30px]"
                                        >
                                            Prev
                                        </Button>
                                        <Button
                                            style={{ borderRadius: '13px' }}
                                            block
                                            variant="solid"
                                            type="button"
                                            onClick={handleRoute}
                                            className="indigo-btn mt-2 !w-[30%] mx-auto rounded-[30px]"
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
