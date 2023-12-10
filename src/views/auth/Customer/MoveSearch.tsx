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
import { CustomerMovePayload1 } from '@/store/Payload';
import usePostApi from '@/store/customeHook/postApi'; // Custom hook for API call
import { messageView, validateMoveCustomerForm, onkeyDownPincode } from '@/store/customeHook/validate';
import { ToastContainer } from 'react-toastify';
import TableCustomerMoveAssets from './TableCustomerMoveAssets';
import { useTranslation } from 'react-i18next'
import Autocomplete from "react-google-autocomplete"

// Define the functional component for MoveSearch
const MoveSearch = () => {
    const dest_gps:any=localStorage.getItem('dest_gps') || "";
    const origin_gps:any=localStorage.getItem('origin_gps') || "";
    // Get the user's token using a custom hook
    const { token }: any = getToken();

    /* The above code is declaring a constant variable named "location" and assigning it the value
    returned by the "useLocation()" function. The type of the "location" variable is set to "any",
    meaning it can hold any type of value. */
    const location: any = useLocation();

    // Define a state variable for the this component
    const [errors, setErrors] = useState<any>({});
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState<any>({...CustomerMovePayload1,dest_gps:dest_gps,origin_gps:origin_gps,unit_id:2});
    const [message, setMessage] = useState<any>('')
    const [isDisabled, setIsDisabled] = useState<any>(false)
    const [addressUpdateCount, setAddressUpdateCount] = useState(0);

    // Fetch a list of countries using a custom hook
    const { data: ListOfCountry, loading: LCloading, error: LCerror } =
        useApiFetch<any>(`master/get-countries`, token);

    // Fetch a list of cities based on the selected country
    const { data: ListOfCity, loading: Lcityloading, error: Lcityerror } =
        useApiFetch<any>(`master/get-city-by-countryId/${formData?.origin_country_id}`, token);

        const { data: ApprovedAssets, loading: Approvedloading, error: Approvederror } =
        useApiFetch<any>(`customer/get-responses/2/${location?.state?.data?.id}`, token);

    // Fetch a list of cities based on the selected country
    const { data: ListOfCityDest, loading: LcityDestloading, error: LcityDesterror } =
        useApiFetch<any>(`master/get-city-by-countryId/${formData?.dest_country_id}`, token);

    // Fetch a list of status based on it
    const { data: ListOfstatus, loading: Lstatusloading, error: Lstatuserror } =
        useApiFetch<any>(`master/customer/store/get-status`, token);


    // Fetch a list of cities based on the selected country
    const { data: ListOfBroad, loading: LOBloading, error: LOBerror } =
        useApiFetch<any>(`master/customer/store/get-broad-category`, token);

    // Fetch a list of cities based on the selected Product
    const { data: ListOfProduct, loading: LOPloading, error: LOPerror } =
        useApiFetch<any>(`master/customer/store/get-product-type`, token);


    // Fetch a list of cities based on the selected country
    const { data: ListOfUnit, loading: LOUloading, error: LOUerror } =
        useApiFetch<any>(`master/customer/store/get-unit-type`, token);

    // Define a custom hook for making a POST request
    const { result: CustomerResponse, loading: CustomerLoading, sendPostRequest: PostCustomerMoveDetails }: any =
        usePostApi(`customer/move/search`);

        const today = new Date().toISOString().split('T')[0];
        function formatDate(inputDate:any) {
            
                const parts = inputDate.split('-'); // Split the input date into parts
                if (parts.length === 3) {
                  const [year, month, day] = parts;
                  return `${day}-${month}-${year}`;
                }
                return inputDate; // Return the input date if it's not in the expected format
              }

              
    // Define a function to handle a button click
    const handleRoute = () => {
        // Check form validation before making a POST request

        if (validateMoveCustomerForm(formData, setErrors)) {
            PostCustomerMoveDetails(formData);
        }
    }
    /**
     * The `handleRouteUpdate` function sends a PUT request to update a move search with form data and
     * authorization headers, and then displays a success message and redirects the user to a ticket
     * list page after a delay.
     */
   
    const handleRouteUpdate = () => {
  
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("origin_country_id", formData?.origin_country_id);
        formdata.append("origin_city_id", formData?.origin_city_id);
        formdata.append("origin_pincode", formData?.origin_pincode);
        formdata.append("origin_gps", origin_gps);
        formdata.append("dest_country_id", formData?.dest_country_id);
        formdata.append("dest_city_id", formData?.dest_city_id);
        formdata.append("dest_pincode", formData?.dest_pincode);
        formdata.append("dest_gps", dest_gps);
        formdata.append("load_quantity", formData?.load_quantity);
        formdata.append("unit_id", formData?.unit_id);
        formdata.append("broad_category_id", formData?.broad_category_id);
        formdata.append("product_type_id", formData?.product_type_id);
        formdata.append("contract_name", formData?.contract_name);
        formdata.append("dispatch_date", formData?.dispatch_date);
        formdata.append("arrival_date", formData?.arrival_date);
        formdata.append("contract_type", formData?.contract_type);
        formdata.append("status_id", formData?.status_id);
        formdata.append("comment", formData?.comment);
        formdata.append("contract_download", formData?.contract_download);

        var requestOptions: any = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${apiUrl}/customer/move/search-update/${location?.state?.data?.id}`, requestOptions)
            .then(response => response.json())
            .then((result: any) => {
                setMessage(result);
                setModal(true)
                setTimeout(() => {
                    navigate('/ticket_list_move')
                }, 2000)
            })
            .catch(error => console.log('error', error));
    }
    // Define a function to handle a button click
    const handleChange = (e: any) => {
        const newData: any = { ...formData };
        if (e.target.name === 'contract_download') {

            newData[e.target.name] = e.target.files[0];
        } else {
            newData[e.target.name] = e.target.value;
        }
        
        setFormData(newData);
        if(errors[e.target.name])validateMoveCustomerForm(newData, setErrors)
    }
    const navigate: any = useNavigate();

    /* The above code is using the useEffect hook in a React component. It is checking if the
    `location.state.data` property exists and if it does, it sets the `formData` state variable to
    the value of `location.state.data` and sets the `isDisabled` state variable to the value of
    `location.state.disabled`. This code is likely used to initialize the form data and disabled
    state based on the data passed in through the `location` object. */
    useEffect(() => {
        if (location?.state?.data) {
            console.log("TTTT6666TTTT",location?.state?.data);
            setFormData(location?.state?.data);
            setIsDisabled(location?.state?.disabled)
        }

    }, [])

    useEffect(() => {
        if (location?.state?.data) {
            console.log("65765765",location?.state?.data);
            
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
                navigate('/ticket_list_move')
            }, 2000)
        }
        messageView(CustomerResponse?.message)
    }, [CustomerResponse?.status]);


    const { t, i18n }:any = useTranslation();
useEffect(()=>{
localStorage.removeItem('dest_gps');
localStorage.removeItem('origin_gps');
},[])

// useEffect(() => {
//     const newData = {...formData};
//     var formValuesUpdated = false;
//     if (localStorage.getItem('dest_gps') !== null) {
//         newData['dest_gps'] = localStorage.getItem('dest_gps');
//         formValuesUpdated = true;
//     }
//     if (localStorage.getItem('origin_gps') !== null) {
//         newData['origin_gps'] = localStorage.getItem('origin_gps');
//         formValuesUpdated = true;
//     }
//     if (formValuesUpdated) setFormData(newData)
// }, [addressUpdateCount])
console.log("wertyuio", new Date(formData?.arrival_date));

    return (
        <div>
            <ToastContainer />
            {/* The above code is rendering a ThankYouModal component if the "modal" variable is truthy.
            The ThankYouModal component is passed the "message", "setModal", and "setFormData"
            props. */}
            {modal && <ThankYouModal message={message} setModal={setModal} setFormData={setFormData} />}
            {/* The above code is a TypeScript React component that renders a form for moving items. It
            uses the Formik library for form management. The form includes fields for origin and
            destination locations, load quantity, broad category, product type, dispatch date/time,
            arrival date/time, status, comment, contract name, contract type, and contract upload.
            The form also includes validation for required fields and handles form submission.
            Depending on the value of the `location.state.extraForm` prop, the form will either
            display an "Update" button or a "Request for Search" button. */}
            <div className="bg-white p-4">
                <h4 className=" mb-2 text-head-title pl-[22px] text-center">{t("Move")} </h4>
                <div>
                    <Formik
                        initialValues={{ field: true }}
                        onSubmit={() =>
                            console.log('Submited via my onSubmit function')
                        }
                    >
                        <Form className="py-2 multistep-form-step">
                            <FormContainer>
                                <h6 className=" mb-2 pl-[22px] text-head-title text-start">{t("Origin Location")}</h6>
                                <div className="md:flex lg:flex bg-gray-100 p-2 rounded-md">
                                    <FormItem
                                        label= {t("Country*")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="origin_country_id"
                                            className=" border w-full p-2 rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCountry && ListOfCountry?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.origin_country_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.origin_country_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label= {t("From*")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="origin_city_id"
                                            className="p-2 border w-full rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCity && ListOfCity?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.origin_city_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.origin_city_id}</p>
                                    </FormItem>
                                </div>
                                <div className="md:flex lg:flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label=  {t("PIN Code")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="number"
                                            autoComplete="off"
                                            name="origin_pincode"
                                            value={formData?.origin_pincode}
                                            placeholder="PIN Code"
                                            component={Input}
                                            onKeyDown={onkeyDownPincode}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={t("GPS")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Autocomplete
                                            className='input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="origin_gps"
                                            defaultValue={formData?.origin_gps || origin_gps}
                                            placeholder="Location"
                                            apiKey='AIzaSyB7dJWdsmX6mdklhTss1GM9Gy6qdOk6pww'
                                            onPlaceSelected={(place) => {
                                                localStorage.setItem("origin_gps",place?.formatted_address)
                                                // setAddressUpdateCount((val) => val + 1);
                                            }}
                                        />
                                    </FormItem>
                                </div>
                                <h6 className=" mb-2 mt-4 text-head-title pl-[22px] text-start"> {t("Destination Location")} </h6>
                                <div className="md:flex lg:flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label=  {t("Country*")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="dest_country_id"
                                            className="p-2 border w-full rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCountry && ListOfCountry?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.dest_country_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.dest_country_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label=  {t("To*")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="dest_city_id"
                                            className="p-2 border w-full rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCityDest && ListOfCityDest?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.dest_city_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.dest_city_id}</p>
                                    </FormItem>
                                </div>
                                <div className="md:flex lg:flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label={t("PIN Code")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="number"
                                            autoComplete="off"
                                            name="dest_pincode"
                                            value={formData?.dest_pincode}
                                            placeholder="PIN Code"
                                            component={Input}
                                            onKeyDown={onkeyDownPincode}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={t("GPS")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Autocomplete
                                            className='input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="dest_gps"
                                            defaultValue={formData?.dest_gps || dest_gps}
                                            placeholder="Location"
                                            apiKey='AIzaSyB7dJWdsmX6mdklhTss1GM9Gy6qdOk6pww'
                                            onPlaceSelected={(place) => {
                                                localStorage.setItem("dest_gps",place?.formatted_address)
                                                // setAddressUpdateCount((val) => val + 1);
                                                // const newData = {...formData}
                                                // newData['dest_gps'] = place?.formatted_address
                                                // setFormData({...formData,dest_gps:place?.formatted_address})
                                            }}
                                        />
                                    </FormItem>
                                </div>
                                <div className="md:flex lg:flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label= {t("Load Quantity*")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            className="w-[70%]"
                                            autoComplete="off"
                                            name="load_quantity"
                                            value={formData?.load_quantity}
                                            placeholder="Load Quantity"
                                            component={Input}
                                        />
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="unit_id"
                                            className="w-[20%] ml-4 p-2 border input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Unit</option>
                                            {ListOfUnit && ListOfUnit?.data?.filter((item: any) => [1, 2, 3, 5].includes(item?.id)).map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.unit_id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.load_quantity}</p>
                                    </FormItem>
                                    <FormItem
                                        label= {t("Broad Category*")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="broad_category_id"
                                            className="border p-2 w-full rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfBroad && ListOfBroad?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.broad_category_id}>{item?.type}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red]'>{errors && errors.broad_category_id}</p>
                                    </FormItem>
                                </div>
                                <div className="md:flex lg:flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label= {t("Product Type*")}
                                        className="pl-3 w-[100%] text-label-title m-auto"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="product_type_id"
                                            className=" p-2 border w-full rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfProduct && ListOfProduct?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id===formData?.product_type_id}>{item?.type}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red]'>{errors && errors.product_type_id}</p>
                                   
                                    </FormItem>
                                </div>
                                <div className="md:flex lg:flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label= {t("Dispatch Date")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="date"
                                            min={today}
                                            
                                            autoComplete="off"
                                            name="dispatch_date"
                                            // onFocus={(e:any) => (e.target.type = "date")}
                                            // onBlur={(e:any) => (e.target.type = "text")}
                                            value={new Date(formData?.dispatch_date).toISOString().split('T')[0]}
                                            placeholder="Date of Dispatch"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label= {t("Arrival Date")}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="date"
                                            min={today}
                                            autoComplete="off"
                                            name="arrival_date"
                                            value={
    (formData?.arrival_date && new Date(formData?.arrival_date) !='Invalid Date')
      ? new Date(formData?.arrival_date).toISOString().split('T')[0]
      : '' // Set a default value if formData.arrival_date is undefined/null
  }
                                            placeholder="Arrival Dtate"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                      {location?.state?.extraForm &&    <>

                                <div className="md:flex lg:flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label="Status"
                                        className=" pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >

                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="status_id"
                                            className="border w-full rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfstatus && ListOfstatus?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.status_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.date}</p>
                                    </FormItem>
                                    <FormItem
                                        label= {t("Comment")}
                                        className=" pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
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


                               
                                </>}
                                <div className="flex justify-center w-[310px] mx-auto">

                                    {location?.state?.extraForm ? <Button
                                        disabled={isDisabled}
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        onClick={handleRouteUpdate}
                                        className={`indigo-btn w-[300px] mx-auto rounded-[30px] ${isDisabled?'!hidden': ''}`}
                                    >
                                          {/* {t("Update")} */}
                                          Update
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
                ApprovedAssets?.data?.length>0 && <TableCustomerMoveAssets AllStore={ApprovedAssets?.data} />:<></>}
            </div>
        </div>
    )
}

export default MoveSearch
