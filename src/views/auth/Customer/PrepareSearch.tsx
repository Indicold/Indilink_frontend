// Import necessary React and custom components and libraries
import React, { useEffect, useState } from 'react';
import {
    Button,
    Dropdown,
    FormContainer,
    FormItem,
    Input,
} from '@/components/ui'; // Import UI components
import { Field, Form, Formik } from 'formik'; // Import Formik for form handling
import { apiUrl, getToken } from '@/store/customeHook/token'; // Import a custom hook for handling tokens
import useApiFetch from '@/store/customeHook/useApiFetch'; // Import a custom hook for API fetching
import { useLocation, useNavigate } from 'react-router-dom'; // Import routing related hook
import ThankYouModal from '@/components/layouts/Customer/ThankYouModal'; // Import a custom ThankYou modal component
import { CustomerPrepare, CustomerPrepare1 } from '@/store/Payload';
import usePostApi from '@/store/customeHook/postApi';
import { formatDate, validatePrepareCustomerForm } from '@/store/customeHook/validate';
import LoaderSpinner from '@/components/LoaderSpinner';
import TableCustomerPrepareAssets from './TableCustomerPrepareAssets';
import { useTranslation } from 'react-i18next'

  
// Define the functional component for PrepareSearch
const PrepareSearch = () => {

    // Get the user's token using a custom hook
    const { token }: any = getToken();
    const location: any = useLocation();

    // Define a state variable for the  modal
    const [errors, setErrors] = useState<any>({});
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState<any>(CustomerPrepare1);
    const [isDisabled, setIsDisabled] = useState<any>(false);
    const [message, setMessage] = useState<any>('')

    // Fetch a list of categories using a custom hook
    const { data: ListOfProductCategory, loading: PCloading, error: PCerror } =
        useApiFetch<any>(`master/partner/prepare/get-product-category`, token);

    // Fetch a list of countries using a custom hook
    const { data: ListOfBroadCategory, loading: BCloading, error: BCerror } =
        useApiFetch<any>(`master/customer/store/get-broad-category`, token);
    
    const { data: ApprovedAssets, loading: Approvedloading, error: Approvederror } =
        useApiFetch<any>(`customer/get-responses/3/${location?.state?.data?.id}`, token);

    // Fetch a list of countries using a custom hook
    const { data: ListOfCountry, loading: LCloading, error: LCerror } =
        useApiFetch<any>(`master/get-countries`, token);

    // Fetch a list of countries using a custom hook
    const { data: ListOfState, loading: LOSloading, error: LOSerror } =
        useApiFetch<any>(`master/get-state-by-countryId/${formData?.country_id}`, token);

    // Fetch a list of cities based on the selected country
    const { data: ListOfCity, loading: Lcityloading, error: Lcityerror } =
        useApiFetch<any>(`master/get-city-by-stateId/${formData?.state_id}`, token);




    // Fetch a list of category based on the selected category
    const { data: ListOfServiceCategory, loading: LOCSloading, error: LOCSerror } =
        useApiFetch<any>(`master/get-categories`, token);




    // Fetch a list of cities based on the selected Product
    const { data: ListOfProduct, loading: LOPloading, error: LOPerror } =
        useApiFetch<any>(`master/customer/store/get-product-type`, token);

    // Fetch a list of status based on it
    const { data: ListOfstatus, loading: Lstatusloading, error: Lstatuserror } =
        useApiFetch<any>(`master/customer/store/get-status`, token);

    // Fetch a list of cities based on the selected country
    const { data: ListOfUnit, loading: LOUloading, error: LOUerror } =
        useApiFetch<any>(`master/customer/store/get-unit-type`, token);

    // Define a custom hook for making a POST request
    const { result: CustomerResponse, loading: CustomerLoading, sendPostRequest: PostCustomerPrepareDetails }: any =
        usePostApi(`customer/prepare/search`);

    // Define a function to handle a button click
    const handleChange = (e: any) => {
        const newData: any = { ...formData };
        newData[e.target.name] = e.target.value;
        setFormData(newData);

    }

    // Define a function to handle a button click
    const handleRoute = () => {
        // Check form validation before making a POST request
        if (validatePrepareCustomerForm(formData, setErrors)) {
            PostCustomerPrepareDetails(formData);
        }
    };
    /**
     * The `handleRouteUpdate` function sends a PUT request to update a customer's search data and
     * redirects to the ticket list page after a successful response.
     */
    const handleRouteUpdate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("product_category_id", formData?.product_category_id);
        formdata.append("broad_category_id", formData?.broad_category_id);
        formdata.append("product_type_id", formData?.product_type_id);
        formdata.append("service_category_id", formData?.service_category_id);
        formdata.append("country_id", formData?.country_id);
        formdata.append("state_id", formData?.state_id);
        formdata.append("city_id", formData?.city_id);
        formdata.append("throughput", formData?.throughput);
        formdata.append("throughput_unit_id", formData?.throughput_unit_id);
        formdata.append("case_size", formData?.case_size);
        formdata.append("case_size_unit_id", formData?.case_size_unit_id);
        formdata.append("estimated_docks", formData?.estimated_docks);
        formdata.append("estimated_dispatch", formData?.estimated_dispatch);
        formdata.append("temp_min", formData?.temp_min);
        formdata.append("temp_max", formData?.temp_max);
        formdata.append("temp_unit_id", formData?.temp_unit_id);
        formdata.append("date_of_start", formData?.date_of_start);
        formdata.append("dispatch_date", formData?.dispatch_date);
        formdata.append("arrival_date", formData?.arrival_date);
        formdata.append("contract_type", formData?.contract_type);
        formdata.append("contract_name", formData?.contract_name);
        formdata.append("status_id", formData?.status_id);
        formdata.append("comment", formData?.comment);
        formdata.append("contract_download", formData?.contract_download);

        var requestOptions: any = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${apiUrl}/customer/prepare/search-update/${location?.state?.data?.id}`, requestOptions)
            .then(response => response.json())
            .then((result: any) => {
                setMessage(result);
                setModal(true)
                setTimeout(() => {
                    navigate('/ticket_list_prepare')
                }, 2000)
            })
            .catch(error => console.log('error', error));
    }
    const navigate: any = useNavigate();

    /* The above code is using the useEffect hook in a React component. It is checking if the
    `location.state.data` property exists and if it does, it sets the `formData` state variable to
    the value of `location.state.data` and sets the `isDisabled` state variable to the value of
    `location.state.disabled`. This code is likely used to initialize the form data and disabled
    state based on the data passed in through the `location` object. */
    useEffect(() => {
        if (location?.state?.data) {
            setFormData(location?.state?.data);
            setIsDisabled(location?.state?.disabled)
        }

    }, [])
    // Use useEffect to open the ThankYou modal when CustomerResponse status is 200
    useEffect(() => {
        if (CustomerResponse?.status == 200) {
            setMessage(CustomerResponse)
            setModal(true);
            setTimeout(() => {
                navigate('/ticket_list_prepare')
            }, 2000)
        }
    }, [CustomerResponse?.status]);

const { t, i18n }:any = useTranslation();

    return (
        <div>
            {/* The above code is rendering a ThankYouModal component if the "modal" variable is truthy.
            The ThankYouModal component is passed the "message", "setModal", and "setFormData"
            props. */}
            {modal && <ThankYouModal message={message} setModal={setModal} setFormData={setFormData} />}
            <div className="bg-white p-4">
                <h4 className=" mb-2 text-head-title text-center"> {t("Prepare")}</h4>
                {/* The above code is a form component written in TypeScript and React. It uses the
                Formik library for form management. The form consists of various input fields and
                select dropdowns for selecting different categories and options. It also includes
                validation for the form fields. The form can be submitted by clicking on the
                "Request for Search" button or the "Update" button, depending on the value of the
                `location.state.extraForm` variable. */}
                <div>
                    <Formik
                        initialValues={{ field: true }}
                        onSubmit={() =>
                            console.log('Submited via my onSubmit function')
                        }
                    >
                        <Form className="py-2 multistep-form-step">
                            <FormContainer>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label={t("Product Category")}
                                        className="mx-auto w-1/2 rounded-lg pl-[22px] "
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="product_category_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfProductCategory && ListOfProductCategory?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.product_category_id}>{item?.name}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red]'>{errors && errors.product_category_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label= {t("Broad Category")}
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="broad_category_id"
                                            className=" border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfBroadCategory && ListOfBroadCategory?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.broad_category_id}>{item?.type}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red]'>{errors && errors.broad_category_id}</p>
                                    </FormItem>
                                </div>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label= {t("Product Type")}
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="product_type_id"
                                            className="border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfProduct && ListOfProduct?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.product_type_id}>{item?.type}</option>
                                            ))}

                                        </select>

                                    </FormItem>
                                    <FormItem
                                        label={t("Service Category")}
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="service_category_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfServiceCategory && ListOfServiceCategory?.data?.filter((item: any) => [12, 13, 14, 15, 16, 17].includes(item?.id)).map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.service_category_id}>{item?.name}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red]'>{errors && errors.service_category_id}</p>
                                    </FormItem>
                                </div>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label={t("Country*")}
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="country_id"
                                            className="border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCountry && ListOfCountry?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.country_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.country_id}</p>
                                    </FormItem>
                                    <div className="flex mx-auto w-1/2 rounded-lg pl-[22px]">
                                        <FormItem
                                            label={t("State*")}
                                            className="mx-auto w-1/2 rounded-lg"
                                        >
                                            <select
                                                disabled={isDisabled}
                                                onChange={(e: any) => handleChange(e)}
                                                name="state_id"
                                                className="border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                            >
                                                <option>Select</option>
                                                {ListOfState && ListOfState?.data?.map((item: any, index: any) => (
                                                    <option value={item?.id} selected={item?.id === formData?.state_id}>{item?.name}</option>

                                                ))}
                                            </select>
                                            <p className='text-[red]'>{errors && errors.state_id}</p>
                                        </FormItem>
                                        <FormItem
                                            label= {t("City*")} 
                                            className="mx-auto w-1/2 rounded-lg"
                                        >
                                            <select
                                                disabled={isDisabled}
                                                onChange={(e: any) => handleChange(e)}
                                                name="city_id"
                                                className="border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                            >
                                                <option>Select</option>
                                                {ListOfCity && ListOfCity?.data?.map((item: any, index: any) => (
                                                    <option value={item?.id} selected={item?.id === formData?.city_id}>{item?.name}</option>

                                                ))}
                                            </select>
                                            <p className='text-[red]'>{errors && errors.city_id}</p>
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label={t("Throughput")}
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="throughput"
                                            value={formData?.throughput}
                                            className="w-[70%]"
                                            placeholder="Throughput"
                                            component={Input}
                                        />
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="throughput_unit_id"
                                            className=" border w-[20%] ml-4 p-2 input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Unit</option>
                                            {ListOfUnit && ListOfUnit?.data?.filter((item: any) => [2, 3, 6].includes(item?.id)).map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.throughput_unit_id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.throughput}</p>
                                    </FormItem>
                                    <FormItem
                                        label=  {t("Avg. Case Size")}
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="case_size"
                                            className="w-[70%]"
                                            value={formData?.case_size}
                                            placeholder="Avg. Case Size"
                                            component={Input}
                                        />

                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="case_size_unit_id"
                                            className=" border p-2 ml-4 w-[20%]  input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Unit</option>
                                            {ListOfUnit && ListOfUnit?.data?.filter((item: any) => [1, 7].includes(item?.id)).map((item: any, index: any) => (
                                                <option value={item?.id} selected={formData?.case_size_unit_id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.case_size}</p>

                                    </FormItem>
                                </div>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label={t("Estimated Docks")}
                                        className="rounded-lg pl-[22px] w-1/2"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="estimated_docks"
                                            value={formData?.estimated_docks}
                                            placeholder="Estimated Docks"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={t("Estimated Dispatches")}
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="estimated_dispatch"
                                            value={formData?.estimated_dispatch}
                                            placeholder="Certification"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex ">

                                </div>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label= {t("Temperature")}
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="temp_min"
                                            className="p-2 border w-[50%]  input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option value='0'>Minimum</option>
                                            {Array(3).fill(0).map((_, index) => (
                                                <option key={index} value={index * 5} selected={index * 5 === formData?.temp_min}>
                                                    {index * 5}
                                                </option>
                                            ))}


                                        </select>
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="temp_max"
                                            className="p-2 border w-[50%]  input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Maximum</option>
                                            {Array(3).fill(0).map((_, index) => parseInt(formData?.temp_min || 0) + index * 5 + 5).map((item: any, index: any) => (
                                                <option value={parseInt(item) + 5} selected={parseInt(item) + 5 === formData?.temp_max}>{parseInt(item)}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red]'>{errors && errors.temp_max ? errors.temp_max : errors.temp_min}</p>

                                    </FormItem>
                                    <FormItem
                                        label= {t("Date of Start")}
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="date"
                                            autoComplete="off"
                                            value={formData?.date_of_start}
                                            name="date_of_start"
                                            placeholder="Date of Start"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                             {location?.state?.extraForm &&   <>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label= {t("Status Id")}
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >

                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="status_id"
                                            className="border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfstatus && ListOfstatus?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.status_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.date}</p>
                                    </FormItem>
                                    <FormItem
                                        label={t("Comment")}
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            onChange={(e: any) => handleChange(e)}
                                            autoComplete="off"

                                            name="comment"
                                            value={formData?.comment}
                                            placeholder="comment"
                                            component={Input}
                                        />

                                        <p className='text-[red]'>{errors && errors.storage_duration}</p>
                                    </FormItem>
                                </div>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label= {t("Contract Name")}
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            onChange={(e: any) => handleChange(e)}
                                            autoComplete="off"
                                            name="contract_name"
                                            value={formData?.contract_name}
                                            placeholder="Contract name"
                                            component={Input}
                                        />
                                        <p className='text-[red]'>{errors && errors.date}</p>
                                    </FormItem>
                                    <FormItem
                                        label= {t("Contract Type")}
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            onChange={(e: any) => handleChange(e)}
                                            autoComplete="off"

                                            name="contract_type"
                                            value={formData?.contract_type}
                                            placeholder="Contract Type"
                                            component={Input}
                                        />

                                        <p className='text-[red]'>{errors && errors.storage_duration}</p>
                                    </FormItem>
                                </div>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label={t("Arrival Date")}
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="date"
                                            onChange={(e: any) => handleChange(e)}
                                            autoComplete="off"
                                            name="arrival_date"
                                            value={formData?.arrival_date}
                                            placeholder="Arrival Date"
                                            component={Input}
                                        />
                                        <p className='text-[red]'>{errors && errors.date}</p>
                                    </FormItem>
                                    <FormItem
                                        label= {t("Dispatch Date")}
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="date"
                                            onChange={(e: any) => handleChange(e)}
                                            autoComplete="off"

                                            name="dispatch_date"
                                            value={formData?.dispatch_date}
                                            placeholder="Contract Type"
                                            component={Input}
                                        />

                                        <p className='text-[red]'>{errors && errors.storage_duration}</p>
                                    </FormItem>
                                </div>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label= {t("Contract Upload")}
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <input
                                            disabled={isDisabled}
                                            type="file"
                                            name="contract_download"
                                            id="file-input"
                                            className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                        file:bg-transparent file:border-0
                                        file:bg-gray-100 file:mr-4
                                        file:py-3 file:px-4
                                        dark:file:bg-gray-700 dark:file:text-gray-400"
                                            onChange={(e: any) => handleChange(e)}
                                        />

                                        <p className='text-[red]'>{errors && errors.date}</p>
                                    </FormItem>

                                </div>
                                </>}

                                <div className="flex mt-4 justify-center w-[310px] mx-auto">
                                    {location?.state?.extraForm ? <Button
                                        disabled={isDisabled}
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        onClick={handleRouteUpdate}
                                        className={`indigo-btn w-[300px] mx-auto rounded-[30px] ${isDisabled?'!hidden': ''}`}
                                    >
                                        {t("Update")}
                                    </Button> :
                                        <Button
                                            disabled={isDisabled}
                                            style={{ borderRadius: '13px' }}
                                            block
                                            variant="solid"
                                            type="button"
                                            onClick={handleRoute}
                                            className="indigo-btn mt-4 w-[300px] mx-auto rounded-[30px]"
                                        >
                                              {t("Request for Search")}
                                        </Button>
                                    }
                                </div>
                            </FormContainer>
                        </Form>
                    </Formik>
                </div>
                {isDisabled? 
                ApprovedAssets?.data?.length>0 && <TableCustomerPrepareAssets AllStore={ApprovedAssets?.data} />:<></>}
            </div>
        </div>
    )
}

export default PrepareSearch
