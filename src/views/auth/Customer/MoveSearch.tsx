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
import usePostApi from '@/store/customeHook/postApi';
import { messageView, validateMoveCustomerForm } from '@/store/customeHook/validate';
import { ToastContainer } from 'react-toastify';
import TableCustomerMoveAssets from './TableCustomerMoveAssets';

// Define the functional component for MoveSearch
const MoveSearch = () => {

    // Get the user's token using a custom hook
    const { token }: any = getToken();
    const location: any = useLocation();

    // Define a state variable for the this component
    const [errors, setErrors] = useState<any>({});
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState<any>(CustomerMovePayload1);
    const [message, setMessage] = useState<any>('')
    const [isDisabled, setIsDisabled] = useState<any>(false)

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


        function formatDate(inputDate:any) {
            console.log("GGGGGGGGGtIME",inputDate);
            
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

    console.log(formData)
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
        formdata.append("origin_gps", formData?.origin_gps);
        formdata.append("dest_country_id", formData?.dest_country_id);
        formdata.append("dest_city_id", formData?.dest_city_id);
        formdata.append("dest_pincode", formData?.dest_pincode);
        formdata.append("dest_gps", formData?.dest_gps);
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
                console.log("GGGGGG88888777", result)
            })
            .catch(error => console.log('error', error));
    }
    // Define a function to handle a button click
    const handleChange = (e: any) => {
        const newData: any = { ...formData };
        if (e.target.name === 'contract_download') {
            console.log("DDDDDDDDDDDDDDD", e.target.files[0]);

            newData[e.target.name] = e.target.files[0];
        } else {
            newData[e.target.name] = e.target.value;
        }
        console.log("FFFFFFFFFFFF",newData);
        
        setFormData(newData);
    }
    const navigate: any = useNavigate();
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
                navigate('/ticket_list_move')
            }, 2000)
        }
        messageView(CustomerResponse?.message)
    }, [CustomerResponse?.status]);


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
                <h4 className=" mb-2 text-head-title pl-[22px] text-center">Move</h4>
                <div>
                    <Formik
                        initialValues={{ field: true }}
                        onSubmit={() =>
                            console.log('Submited via my onSubmit function')
                        }
                    >
                        <Form className="py-2 multistep-form-step">
                            <FormContainer>
                                <h6 className=" mb-2 pl-[22px] text-head-title text-start">Origin Location</h6>
                                <div className="flex bg-gray-100 p-2 rounded-md">
                                    <FormItem
                                        label="Country*"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px] "
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
                                        label="From*"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
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
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label="PIN Code"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
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
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="GPS"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="origin_gps"
                                            value={formData?.origin_gps}
                                            placeholder="Location"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <h6 className=" mb-2 mt-4 text-head-title pl-[22px] text-start">Destination Location</h6>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label="Country*"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px] "
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
                                        label="To*"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
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
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label="PIN Code"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
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
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="GPS"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="dest_gps"
                                            value={formData?.dest_gps}
                                            placeholder="Location"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label="Load Quantity*"
                                        className="rounded-lg pl-[22px] w-1/2"
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
                                        label="Broad Category*"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
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
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label="Product Type"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="product_type_id"
                                            className=" p-2 border w-full rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfProduct && ListOfProduct?.data?.map((item: any, index: any) => (
                                                <option value={item?.id}>{item?.type}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red]'>{errors && errors.product_type_id}</p>
                                   
                                    </FormItem>
                                </div>
                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label="Dispatch Date"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="date"
                                            autoComplete="off"
                                            name="dispatch_date"
                                            // onFocus={(e:any) => (e.target.type = "date")}
                                            // onBlur={(e:any) => (e.target.type = "text")}
                                            value={formData?.dispatch_date}
                                            placeholder="Date of Dispatch"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Arrival Date"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            type="date"
                                            autoComplete="off"
                                            value={formData?.arrival_date}
                                            name="arrival_date"
                                            // onFocus={(e:any) => (e.target.type = "date")}
                                            // onBlur={(e:any) => (e.target.type = "text")}
                                            placeholder="Arrival Dtate"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                      {location?.state?.extraForm &&    <>

                                <div className="flex bg-gray-100 p-2 mt-4 rounded-md">
                                    <FormItem
                                        label="Status Id"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >

                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="status_id"
                                            className="h-11 border w-full rounded-lg h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfstatus && ListOfstatus?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.status_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.date}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Comment"
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


                                <div className="flex">
                                    <FormItem
                                        label="Dispatch Date"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="date"
                                            onChange={(e: any) => handleChange(e)}
                                            autoComplete="off"
                                            name="dispatch_date"
                                            value={formData?.contract_name}
                                            placeholder="Dispatch Date"
                                            component={Input}
                                        />
                                        <p className='text-[red]'>{errors && errors.dispatch_date}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Arrival Date"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="date"
                                            onChange={(e: any) => handleChange(e)}
                                            autoComplete="off"

                                            name="arrival_date"
                                            value={formData?.contract_type}
                                            placeholder="Arrival Date"
                                            component={Input}
                                        />

                                        <p className='text-[red]'>{errors && errors.arrival_date}</p>
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
                                            Request for Search
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
