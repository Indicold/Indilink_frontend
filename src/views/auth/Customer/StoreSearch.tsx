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
import { getToken } from '@/store/customeHook/token'; // Import a custom hook for handling tokens
import useApiFetch from '@/store/customeHook/useApiFetch'; // Import a custom hook for API fetching
import { useNavigate } from 'react-router-dom'; // Import routing related hook
import ThankYouModal from '@/components/layouts/Customer/ThankYouModal'; // Import a custom ThankYou modal component
import usePostApi from '@/store/customeHook/postApi'; // Import a custom hook for making POST requests
import LoaderSpinner from '@/components/LoaderSpinner'; // Import a loader spinner component
import { validateStoreCustomerForm } from '@/store/customeHook/validate'; // Import a custom function for form validation

// Define an initial payload for searching customers
export const payloadSearchCustomer: any = {
    country_id: '',
    city_id: '',
    product_type_id: '',
    temperature: '',
    temperature_type_id: 1,
    unit_id: 1,
    certification_id: '',
    date: new Date(),
    storage_duration: '',
    storage_duration_type: 1
}

// Define the main functional component for StoreSearch
const StoreSearch = () => {
    // Get the user's token using a custom hook
    const { token }: any = getToken();
    
    // Initialize the form data with the payload
    const [formData, setFormData] = useState<any>(payloadSearchCustomer)
    
    // Fetch a list of countries using a custom hook
    const { data: ListOfCountry, loading: LCloading, error: LCerror } =
        useApiFetch<any>(`master/get-countries`, token);
    
    // Fetch a list of cities based on the selected country
    const { data: ListOfCity, loading: Lcityloading, error: Lcityerror } =
        useApiFetch<any>(`master/get-city-by-countryId/${formData?.country_id}`, token);
    
    // Fetch a list of product types using a custom hook
    const { data: ListOfProduct, loading: LPloading, error: Lperror } =
        useApiFetch<any>(`master/customer/store/get-product-type`, token);
    
    // Fetch a list of temperature types using a custom hook
    const { data: ListOfTemp, loading: LTloading, error: Lterror } =
        useApiFetch<any>(`master/customer/store/get-temperature-type`, token);
    
    // Fetch a list of certification types using a custom hook
    const { data: ListOfCert, loading: Lctloading, error: Lcterror } =
        useApiFetch<any>(`master/customer/store/get-certification-type`, token);
    
    // Fetch a list of time units using a custom hook
    const { data: ListOfTimeUnits, loading: Ltuloading, error: Ltuerror } =
        useApiFetch<any>(`master/customer/store/get-duration`, token);
    
    // Define a custom hook for making a POST request
    const { result: CustomerResponse, loading: CustomerLoading, sendPostRequest: PostCustomerRegisterDetails }: any =
        usePostApi('https://seal-app-uqxwl.ondigitalocean.app/customer/store/search');
    
    // Define state variables for the ThankYou modal and form errors
    const [modal, setModal] = useState<any>(false);
    const [errors, setErrors] = useState<any>({});

    // Define a function to handle form submission
    const handleRoute = () => {
        console.log('clicked!')
        
        // Check form validation before making a POST request
        if (validateStoreCustomerForm(formData, setErrors)) {
            PostCustomerRegisterDetails(formData);
        }
    }

    // Define a function to handle form input changes
    const handlechange = (e: any) => {
        const newData: any = { ...formData };
        newData[e.target.name] = e.target.value;
        setFormData(newData);
    }

    // Use useEffect to open the ThankYou modal when CustomerResponse status is 200
    useEffect(() => {
        if (CustomerResponse?.status == 200) {
            setModal(true);
        }
    }, [CustomerResponse?.status]);

    console.log("statusstatusstatusstatusstatusstatusstatus", modal);
    return (
        <div>
            {modal && <ThankYouModal message={CustomerResponse} setModal={setModal} setFormData={setFormData} />}
            <div className="bg-white">
                <h4 className=" mb-2 text-head-title text-center">Store</h4>
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
                                        label="Country"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px] "
                                    >
                                        <select
                                            onChange={(e: any) => handlechange(e)}
                                            name="country_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCountry && ListOfCountry?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.country_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.country_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label="City"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            onChange={(e: any) => handlechange(e)}
                                            name="city_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCity && ListOfCity?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.city_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.city_id}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Product Type"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            onChange={(e: any) => handlechange(e)}
                                            name="product_type_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfProduct && ListOfProduct?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.product_type_id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.product_type_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Temperature"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            onChange={(e: any) => handlechange(e)}
                                            className="w-[80%]"
                                            name="temperature"
                                            placeholder="Temperature"
                                            component={Input}
                                        />
                                        <select
                                            onChange={(e: any) => handlechange(e)}
                                            name="temperature_type_id"
                                            className="h-11 border w-[20%] input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option selected>Unit</option>
                                            {ListOfTemp && ListOfTemp?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.temperature_type_id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.temperature}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Unit"
                                        className="rounded-lg pl-[22px] w-1/2"
                                    >
                                        <Field
                                            type="text"
                                            onChange={(e: any) => handlechange(e)}
                                            autoComplete="off"
                                            name="unit_id"
                                            placeholder="Unit"
                                            component={Input}
                                        />
                                          <p className='text-[red]'>{errors && errors.unit_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Certification"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            onChange={(e: any) => handlechange(e)}
                                            name="certification_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option selected>Select</option>
                                            {ListOfCert && ListOfCert?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.certification_id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.certification_id}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Date of Storage"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="date"
                                            onChange={(e: any) => handlechange(e)}
                                            autoComplete="off"
                                            name="date"
                                            placeholder="Date of Storage"
                                            component={Input}
                                        />
                                          <p className='text-[red]'>{errors && errors.date}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Storage Duration"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            onChange={(e: any) => handlechange(e)}
                                            autoComplete="off"
                                            className="w-[80%]"
                                            name="storage_duration"
                                            placeholder="Storage Duration"
                                            component={Input}
                                        />
                                        <select
                                            onChange={(e: any) => handlechange(e)}
                                            name="storage_duration_type"
                                            className="h-11 border w-[20%] input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option selected>Unit</option>
                                            {ListOfTimeUnits && ListOfTimeUnits?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.storage_duration_type}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.storage_duration}</p>
                                    </FormItem>
                                </div>


                                <div className="flex justify-center w-[310px] mx-auto">
                                    <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        onClick={handleRoute}
                                        className="indigo-btn w-[300px] mx-auto rounded-[30px]"
                                    >
                                        Request for Search
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

export default StoreSearch
