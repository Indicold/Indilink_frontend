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
import usePostApi from '@/store/customeHook/postApi'; // Import a custom hook for making POST requests
import LoaderSpinner from '@/components/LoaderSpinner'; // Import a loader spinner component
import { messageView, validateStoreCustomerForm } from '@/store/customeHook/validate'; // Import a custom function for form validation
import usePutApi from '@/store/customeHook/putApi';
import { ToastContainer } from 'react-toastify';

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
    const [formData, setFormData] = useState<any>(payloadSearchCustomer);
    const [isDisabled, setIsDisabled] = useState<any>(false)

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
        usePostApi(`${apiUrl}/customer/store/search`);

    const { result: StoreCustomerResponse, loading: OTPLoading, sendPostRequest: UpdateStoreCustomer }: any =
        usePutApi(`${apiUrl}/customer/store/search-update/5`);


    // Define state variables for the ThankYou modal and form errors
    const [modal, setModal] = useState<any>(!false);
    const [message,setMessage]=useState<any>('')
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
        if (e.target.name === 'contract_download') {
    
            newData[e.target.name] = e.target.files[0];
        } else {
            newData[e.target.name] = e.target.value;
        }
        setFormData(newData);
    }
    /**
     * The `handleRouteUpdate` function sends a PUT request to update a customer store search and then
     * redirects the user to the ticket list store page.
     */
    const handleRouteUpdate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        
        var formdata = new FormData();
        formdata.append("country_id", formData?.country_id);
        formdata.append("city_id", formData?.city_id);
        formdata.append("product_type_id", formData?.product_type_id);
        formdata.append("temperature", formData?.temperature);
        formdata.append("temperature_type_id",formData?.temperature_type_id);
        formdata.append("unit_id", formData?.unit_id);
        formdata.append("certification_id", formData?.certification_id);
        formdata.append("date", formData?.date);
        formdata.append("storage_duration", formData?.storage_duration);
        formdata.append("storage_duration_type", formData?.storage_duration_type);
        formdata.append("contract_name", formData?.contract_name);
        formdata.append("contract_type", formData?.contract_type);
        formdata.append("status_id", formData?.status_id);
        formdata.append("comment", formData?.comment);
        formdata.append("contract_download", formData?.contract_download);
        
        var requestOptions:any = {
          method: 'PUT',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        fetch(`${apiUrl}/customer/store/search-update/${location?.state?.data?.id}`, requestOptions)
          .then(response => response.json())
          .then((result:any) => {
            setMessage(result);
            setModal(true)
            setTimeout(() => {
                navigate('/ticket_list_store')
            }, 2000)
            console.log("GGGGGG88888777",result)
          })
          .catch(error => console.log('error', error));
      }
    
    const navigate: any = useNavigate();
    const location: any = useLocation();
    console.log("GGG88888GGG", location?.state);

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
                navigate('/ticket_list_store')
            }, 2000)
        }else {
            messageView(CustomerResponse)
        }
    }, [CustomerResponse?.status]);

    console.log("statusstatusstatusstatusstatusstatusstatus", modal);
    return (
        <div>
            <ToastContainer />
            {/* The above code is rendering a ThankYouModal component if the "modal" variable is truthy.
            The ThankYouModal component is passed the "message", "setModal", and "setFormData"
            props. */}
            {modal && <ThankYouModal message={message} setModal={setModal} setFormData={setFormData} />}
            <div className="bg-white">
                <h4 className=" mb-2 text-head-title text-center">Store</h4>
                {/* The above code is a TypeScript React component that renders a form using the Formik
                library. The form contains several input fields and select dropdowns for the user to
                enter data. The form is wrapped in a Formik component, which handles form state and
                validation. The form data is stored in the component's state using the useState
                hook. The form also includes conditional rendering based on the value of the
                `location?.state?.extraForm` variable. If this variable is truthy, additional form
                fields are rendered. The form includes submit buttons that trigger different
                functions depending on the form's purpose. */}
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
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="country_id"
                                            className="h-11 border w-full rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="city_id"
                                            className="h-11 border w-full rounded-lg  h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="product_type_id"
                                            className="h-11 border w-full rounded-lg  h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
                                            disabled={isDisabled}
                                            type="number"
                                            autoComplete="off"
                                            onChange={(e: any) => handlechange(e)}
                                            className="w-[80%]"
                                            name="temperature"
                                            value={formData?.temperature}
                                            placeholder="Temperature"
                                            component={Input}
                                        />
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="temperature_type_id"
                                            className="h-11 border w-[20%] rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
                                       
                                            <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="unit_id"
                                            className="h-11 border rounded-lg w-full h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option selected>Unit</option>
                                            { ['Pallets', 'MT', 'Cubic', 'Feet', 'Sq. Feet']?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item === 'MT'}>{item}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.unit_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Certification"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="certification_id"
                                            className="h-11 border w-full rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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
                                            disabled={isDisabled}
                                            type="date"
                                            onChange={(e: any) => handlechange(e)}
                                            autoComplete="off"
                                            name="date"
                                            value={formData?.date}
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
                                            disabled={isDisabled}
                                            type="number"
                                            onChange={(e: any) => handlechange(e)}
                                            autoComplete="off"
                                            className="w-[80%]"
                                            name="storage_duration"
                                            value={formData?.storage_duration}
                                            placeholder="Storage Duration"
                                            component={Input}
                                        />
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="storage_duration_type"
                                            className="h-11 border w-[20%] input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option selected>Unit</option>
                                            {ListOfTimeUnits && ListOfTimeUnits?.data?.map((item: any, index: any) => {if(item.id === 4||item.id === 6||item.id === 7){
                                                return (
                                                <option value={item?.id} selected={item?.id === formData?.storage_duration_type}>{item?.type}</option>)

}})}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.storage_duration}</p>
                                    </FormItem>
                                </div>
                          {location?.state?.extraForm &&      <>
                                <div className="flex">
                                    <FormItem
                                        label="Status Id"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            onChange={(e: any) => handlechange(e)}
                                            autoComplete="off"
                                            name="status_id"
                                            value={formData?.status_id}
                                            placeholder="Enter Value"
                                            component={Input}
                                        />
                                        <p className='text-[red]'>{errors && errors.date}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Comment"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            onChange={(e: any) => handlechange(e)}
                                            autoComplete="off"

                                            name="comment"
                                            value={formData?.comment}
                                            placeholder="comment"
                                            component={Input}
                                        />

                                        <p className='text-[red]'>{errors && errors.storage_duration}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Contract Name"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            onChange={(e: any) => handlechange(e)}
                                            autoComplete="off"
                                            name="contract_name"
                                            value={formData?.contract_name}
                                            placeholder="Contract name"
                                            component={Input}
                                        />
                                        <p className='text-[red]'>{errors && errors.date}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Contract Type"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="text"
                                            onChange={(e: any) => handlechange(e)}
                                            autoComplete="off"

                                            name="contract_type"
                                            value={formData?.contract_type}
                                            placeholder="Contract Type"
                                            component={Input}
                                        />

                                        <p className='text-[red]'>{errors && errors.storage_duration}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Contract Upload"
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
                                        onChange={(e: any) => handlechange(e)}
                                      />

                                        <p className='text-[red]'>{errors && errors.date}</p>
                                    </FormItem>
                                   
                                </div>
                                </>}


                                <div className="flex justify-center w-[310px] mx-auto">
                                   
                                  {location?.state?.extraForm ?  <Button
                                        disabled={isDisabled}
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        onClick={handleRouteUpdate}
                                        className="indigo-btn w-[300px] mx-auto rounded-[30px]"
                                    >
                                    Update
                                    </Button> :
                                     <Button
                                     disabled={isDisabled}
                                     style={{ borderRadius: '13px' }}
                                     block
                                     variant="solid"
                                     type="button"
                                     onClick={handleRoute}
                                     className="indigo-btn w-[300px] mx-auto rounded-[30px]"
                                 >
                                     Request for Search
                                 </Button>
                                    }
                                    

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
