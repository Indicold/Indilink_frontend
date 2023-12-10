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
import { messageView, onkeyDown, onkeyDownOne, validateStoreCustomerForm } from '@/store/customeHook/validate'; // Import a custom function for form validation
import usePutApi from '@/store/customeHook/putApi'; // Import a custom hook for making PUT requests
import { ToastContainer } from 'react-toastify'; // Import container for showing toast messages
import TableCustomerStoreAssets from './TableCustomerStoreAssets';
import { useTranslation } from 'react-i18next'


var currentDate = new Date()

// Define an initial payload for searching customers
export const payloadSearchCustomer: any = {
    country_id: 101,
    city_id: '',
    product_type_id: '',
    temperature: '',
    temperature_type_id: 1,
    unit_id: 1,
    certification_id: '',
    date:`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()+1}`,
    storage_duration: '',
    storage_duration_type: 4,
    quantity: ''
}

// Define the main functional component for StoreSearch
const StoreSearch = () => {
    // Get the user's token using a custom hook
    const { token }: any = getToken();
    const location: any = useLocation();

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
        
    const { data: ApprovedAssets, loading: Approvedloading, error: Approvederror } =
    useApiFetch<any>(`customer/get-responses/1/${location?.state?.data?.id}`, token);

    // Fetch a list of certification types using a custom hook
    const { data: ListOfCert, loading: Lctloading, error: Lcterror } =
        useApiFetch<any>(`master/customer/store/get-certification-type`, token);

    // Fetch a list of time units using a custom hook
    const { data: ListOfTimeUnits, loading: Ltuloading, error: Ltuerror } =
        useApiFetch<any>(`master/customer/store/get-duration`, token);

    // Define a custom hook for making a POST request
    const { result: CustomerResponse, loading: CustomerLoading, sendPostRequest: PostCustomerRegisterDetails }: any =
        usePostApi(`customer/store/search`);

    const { result: StoreCustomerResponse, loading: OTPLoading, sendPostRequest: UpdateStoreCustomer }: any =
        usePutApi(`customer/store/search-update/5`);


    // Define state variables for the ThankYou modal and form errors
    const [modal, setModal] = useState<any>(!false);
    const [message,setMessage]=useState<any>('')
    const [errors, setErrors] = useState<any>({});
    const today = new Date().toISOString().split('T')[0];
    // Define a function to handle form submission
    const handleRoute = () => {

      

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
        if(errors[e.target.name])validateStoreCustomerForm(newData, setErrors)
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
                navigate('/ticket_list_store')
            }, 2000)
        }else {
            messageView(CustomerResponse?.message)
        }
    }, [CustomerResponse?.status]);

    
    const { t, i18n }:any = useTranslation();

 
    return (
        <div className='bg-white p-2 rounded-md'>
            <ToastContainer />
            {/* The above code is rendering a ThankYouModal component if the "modal" variable is truthy.
            The ThankYouModal component is passed the "message", "setModal", and "setFormData"
            props. */}
            {modal && <ThankYouModal message={message} setModal={setModal} setFormData={setFormData} />}
            <div className="">
                <h4 className=" mb-2 text-head-title text-center"> {t("Store")} </h4>
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
                        className="gap-2 rounded-md"
                        initialValues={{ field: true }}
                        onSubmit={() =>
                            console.log('Submited via my onSubmit function')
                        }
                    >
                        <Form className="py-2 multistep-form-step">
                            <FormContainer className='gap-4'>
                                <div className='bg-gray-100 p-2 rounded-md'>
                                <p className='pl-3'><b>{t("Location")} </b></p>
                                <div className="md:flex lg:flex ">
                                   
                                    <FormItem
                                        label= {t("Country")} 
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto "
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="country_id"
                                            className="border w-full pl-2 rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCountry && ListOfCountry?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.country_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.country_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label={t("City*")} 
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="city_id"
                                            className="border w-full rounded-lg pl-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
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


                                <div className="bg-gray-100 mt-4 p-3 rounded-md lg:flex md:flex">
                                    <FormItem
                                        label= {t("Product Type*")} 
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="product_type_id"
                                            className= "border pl-2 w-full rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfProduct && ListOfProduct?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.product_type_id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.product_type_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label={t("Temperature*")} 
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="number"
                                            autoComplete="off"
                                            onChange={(e: any) => handlechange(e)}
                                            className="w-[60%] pl-2"
                                            name="temperature"
                                            value={formData?.temperature}
                                            placeholder="Temperature"
                                            component={Input}
                                        />
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="temperature_type_id"
                                            className="border ml-10 w-[25%] rounded-lg pl-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option selected>Unit</option>
                                            {ListOfTemp && ListOfTemp?.data?.filter((item: any) => [1, 2].includes(item?.id)).map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.temperature_type_id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.temperature}</p>
                                    </FormItem>
                                </div>
                                <div className="md:flex lg:flex bg-gray-100 mt-4 rounded-md p-2">
                                    <FormItem
                                        label={t("Unit*")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                       <Field
                                            disabled={isDisabled}
                                            type="number"
                                            autoComplete="off"
                                            onChange={(e: any) => handlechange(e)}
                                            className="w-[60%]"
                                            name="quantity"
                                            value={formData?.quantity}
                                            placeholder="Quantity"
                                            component={Input}
                                            onKeyDown={onkeyDownOne}
                                        />
                                            <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="unit_id"
                                            className="border ml-10 w-[25%] rounded-lg pl-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option selected>Unit</option>
                                            { ['Pallets', 'MT', 'Cubic Feet', 'Sq. Feet']?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item === 'MT'}>{item}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.quantity}</p>
                                    </FormItem>
                                    <FormItem
                                        label={t("Certification")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="certification_id"
                                            className="border w-full rounded-lg p-2 h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option selected>Select</option>
                                            {ListOfCert && ListOfCert?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.certification_id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.certification_id}</p>
                                    </FormItem>
                                </div>
                                <div className="md:flex lg:flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label= {t("Date Of Storage")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            min={today}
                                            type="date"
                                            onChange={(e: any) => handlechange(e)}
                                            autoComplete="off"
                                            name="date"
                                            value={new Date(formData?.date) !='Invalid Date' ?  new Date(formData?.date).toISOString().split('T')[0] :''}
                                            placeholder="Date of Storage"
                                            component={Input}
                                        />
                                        <p className='text-[red]' >{errors && errors.date}</p>
                                    </FormItem>
                                    <FormItem
                                        label={t("Storage Duration*")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="number"
                                            onChange={(e: any) => handlechange(e)}
                                            autoComplete="off"
                                            className="w-[70%]"
                                            min={1}
                                            onKeyDown={onkeyDownOne}
                                            name="storage_duration"
                                            value={formData?.storage_duration}
                                            placeholder="Storage Duration"
                                            component={Input}
                                        />
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handlechange(e)}
                                            name="storage_duration_type"
                                            className="border w-[20%] ml-4 input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option selected>Unit</option>
                                            {ListOfTimeUnits && ListOfTimeUnits?.data?.map((item: any, index: any) =>{if(item.id === 4||item.id === 6||item.id === 7){
                                                return (
                                                <option className='' value={item?.id} selected={item?.id === formData?.storage_duration_type}>{item?.type}</option>)
                                            }})}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.storage_duration}</p>
                                    </FormItem>
                                </div>
                          {/* {location?.state?.extraForm &&      <>
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
                                <div className="flex bg-gray-100 mt-4 rounded-md p-2">
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
                                <div className="flex bg-gray-100 mt-4 rounded-md p-2">
                                    <FormItem
                                        label="Contract Upload"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                         <input
                                        disabled={isDisabled}
                                        type="file"
                                        name="contract_download"
                                        id="file-input"
                                        className="block w-full border border-bg-white shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                        file:bg-transparent file:border-0
                                        file:bg-white file:mr-4
                                        file:py-3 file:px-4
                                        dark:file:bg-white dark:file:text-gray-400"
                                        onChange={(e: any) => handlechange(e)}
                                      />

                                        <p className='text-[red]'>{errors && errors.date}</p>
                                    </FormItem>
                                   
                                </div>
                                </>} */}


                                <div className="flex justify-center w-[310px] mx-auto">
                                   
                                  {location?.state?.extraForm ?  <Button
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
                                     className="indigo-btn w-[300px] mt-4 mx-auto rounded-[30px]"
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
                ApprovedAssets?.data?.length>0 && <TableCustomerStoreAssets AllStore={ApprovedAssets?.data} />:<></>}
            </div>
        </div>
    )
}

export default StoreSearch
