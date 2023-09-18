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
import { useNavigate } from 'react-router-dom'; // Import routing related hook
import ThankYouModal from '@/components/layouts/Customer/ThankYouModal'; // Import a custom ThankYou modal component
import { CustomerMovePayload1 } from '@/store/Payload';
import usePostApi from '@/store/customeHook/postApi';
import { validateMoveCustomerForm } from '@/store/customeHook/validate';

// Define the functional component for MoveSearch
const MoveSearch = () => {

    // Get the user's token using a custom hook
    const { token }: any = getToken();

    // Define a state variable for the this component
    const [errors, setErrors] = useState<any>({});
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState<any>(CustomerMovePayload1);

    // Fetch a list of countries using a custom hook
    const { data: ListOfCountry, loading: LCloading, error: LCerror } =
        useApiFetch<any>(`master/get-countries`, token);

    // Fetch a list of cities based on the selected country
    const { data: ListOfCity, loading: Lcityloading, error: Lcityerror } =
        useApiFetch<any>(`master/get-city-by-countryId/${formData?.origin_country_id}`, token);


    // Fetch a list of cities based on the selected country
    const { data: ListOfCityDest, loading: LcityDestloading, error: LcityDesterror } =
        useApiFetch<any>(`master/get-city-by-countryId/${formData?.dest_country_id}`, token);


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
        usePostApi(`${apiUrl}/customer/move/search`);

    // Define a function to handle a button click
    const handleRoute = () => {
        // Check form validation before making a POST request
        if (validateMoveCustomerForm(formData, setErrors)) {
            PostCustomerMoveDetails(formData);
        }
    }

    // Define a function to handle a button click
    const handleChange = (e: any) => {
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


    return (
        <div>
            {/* {CustomerLoading && !modal && <LoaderSpinner /> } */}
            {modal && <ThankYouModal message={CustomerResponse} setModal={setModal} setFormData={setFormData} />}
            <div className="bg-white">
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
                                <div className="flex">
                                    <FormItem
                                        label="Country"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px] "
                                    >
                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="origin_country_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCountry && ListOfCountry?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.country_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.origin_country_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label="City"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="origin_city_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCity && ListOfCity?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.city_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.origin_city_id}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="PIN Code"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="origin_pincode"
                                            placeholder="PIN Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="GPS"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="origin_gps"
                                            placeholder="Location"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <h6 className=" mb-2 text-head-title pl-[22px] text-start">Destination Location</h6>
                                <div className="flex">
                                    <FormItem
                                        label="Country"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px] "
                                    >
                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="dest_country_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCountry && ListOfCountry?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.country_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.dest_country_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label="From"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="dest_city_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCityDest && ListOfCityDest?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === formData?.city_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.dest_city_id}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="PIN Code"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="dest_pincode"
                                            placeholder="PIN Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="GPS"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="dest_gps"
                                            placeholder="Location"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Load Quantity"
                                        className="rounded-lg pl-[22px] w-1/2"
                                    >
                                        <Field
                                            onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            className="w-[80%]"
                                            autoComplete="off"
                                            name="load_quantity_id"
                                            placeholder="Load Quantity"
                                            component={Input}
                                        />
                                           <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="unit_id"
                                            className="!w-[20%] h-11 border input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Unit</option>
                                            {ListOfUnit && ListOfUnit?.data?.map((item: any, index: any) => (
                                                <option value={item?.id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.load_quantity_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Broad Category"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="broad_category_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfBroad && ListOfBroad?.data?.map((item: any, index: any) => (
                                                <option value={item?.id}>{item?.type}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red]'>{errors && errors.broad_category_id}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Product Type"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="product_type_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfProduct && ListOfProduct?.data?.map((item: any, index: any) => (
                                                <option value={item?.id}>{item?.type}</option>
                                            ))}

                                        </select>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Dispactch Date/ Time"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            onChange={(e: any) => handleChange(e)}
                                            type="date"
                                            autoComplete="off"
                                            name="dispatch_date"
                                            placeholder="Date of Dispatch"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Arrival Date/ Time"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            onChange={(e: any) => handleChange(e)}
                                            type="date"
                                            autoComplete="off"
                                            name="arrival_date"
                                            placeholder="Arrival Dtate"
                                            component={Input}
                                        />
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

export default MoveSearch
