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
import { CustomerPrepare, CustomerPrepare1 } from '@/store/Payload';
import usePostApi from '@/store/customeHook/postApi';
import { validatePrepareCustomerForm } from '@/store/customeHook/validate';

// Define the functional component for PrepareSearch
const PrepareSearch = () => {

    // Get the user's token using a custom hook
    const { token }: any = getToken();

    // Define a state variable for the  modal
    const [errors, setErrors] = useState<any>({});
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState<any>(CustomerPrepare1);

    // Fetch a list of categories using a custom hook
    const { data: ListOfProductCategory, loading: PCloading, error: PCerror } =
        useApiFetch<any>(`master/partner/prepare/get-product-category`, token);

    // Fetch a list of countries using a custom hook
    const { data: ListOfBroadCategory, loading: BCloading, error: BCerror } =
        useApiFetch<any>(`master/customer/store/get-broad-category`, token);

    // Fetch a list of countries using a custom hook
    const { data: ListOfCountry, loading: LCloading, error: LCerror } =
        useApiFetch<any>(`master/get-countries`, token);

    // Fetch a list of countries using a custom hook
    const { data: ListOfState, loading: LOSloading, error: LOSerror } =
        useApiFetch<any>(`master/get-state-by-countryId/${formData?.country_id}`, token);

    // Fetch a list of cities based on the selected country
    const { data: ListOfCity, loading: Lcityloading, error: Lcityerror } =
        useApiFetch<any>(`master/get-city-by-countryId/${formData?.country_id}`, token);

        


    // Fetch a list of category based on the selected category
    const { data: ListOfServiceCategory, loading: LOCSloading, error: LOCSerror } =
        useApiFetch<any>(`master/get-categories`, token);




    // Fetch a list of cities based on the selected Product
    const { data: ListOfProduct, loading: LOPloading, error: LOPerror } =
        useApiFetch<any>(`master/customer/store/get-product-type`, token);


    // Fetch a list of cities based on the selected country
    const { data: ListOfUnit, loading: LOUloading, error: LOUerror } =
        useApiFetch<any>(`master/customer/store/get-unit-type`, token);

    // Define a custom hook for making a POST request
    const { result: CustomerResponse, loading: CustomerLoading, sendPostRequest: PostCustomerPrepareDetails }: any =
        usePostApi(`${apiUrl}/customer/prepare/search`);

          // Define a function to handle a button click
      const handleChange = (e: any) => {
        const newData: any = { ...formData };
        newData[e.target.name] = e.target.value;
        setFormData(newData);
        console.log("FFFFFFFFFF",newData);
        
    }

       // Define a function to handle a button click
       const handleRoute = () => {
        // Check form validation before making a POST request
        if (validatePrepareCustomerForm(formData, setErrors)) {
            PostCustomerPrepareDetails(formData);
        }
    }
    const navigate:any=useNavigate();
    // Use useEffect to open the ThankYou modal when CustomerResponse status is 200
    useEffect(() => {
        if (CustomerResponse?.status == 200) {
            setModal(true);
              setTimeout(()=>{
                navigate('/ticket_list_prepare')
            },2000)
        }
    }, [CustomerResponse?.status]);


    return (
        <div>
           {modal && <ThankYouModal message={CustomerResponse} setModal={setModal} setFormData={setFormData} />}
            <div className="bg-white">
                <h4 className=" mb-2 text-head-title text-center">Prepare</h4>
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
                                        label="Category"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px] "
                                    >
                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="product_category_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfProductCategory && ListOfProductCategory?.data?.map((item: any, index: any) => (
                                                <option value={item?.id}>{item?.name}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red]'>{errors && errors.product_category_id}</p>
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
                                            {ListOfBroadCategory && ListOfBroadCategory?.data?.map((item: any, index: any) => (
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
                                    <FormItem
                                        label="Service Category"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="service_category_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfServiceCategory && ListOfServiceCategory?.data?.map((item: any, index: any) => (
                                                <option value={item?.id}>{item?.name}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red]'>{errors && errors.service_category_id}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Country"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            onChange={(e: any) => handleChange(e)}
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
                                    <div className="flex mx-auto w-1/2 rounded-lg pl-[22px]">
                                        <FormItem
                                            label="State"
                                            className="mx-auto w-1/2 rounded-lg"
                                        >
                                            <select
                                                onChange={(e: any) => handleChange(e)}
                                                name="state_id"
                                                className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                            >
                                                <option>Select</option>
                                                {ListOfState && ListOfState?.data?.map((item: any, index: any) => (
                                                    <option value={item?.id} selected={item?.id === formData?.country_id}>{item?.name}</option>

                                                ))}
                                            </select>
                                            <p className='text-[red]'>{errors && errors.state_id}</p>
                                        </FormItem>
                                        <FormItem
                                            label="City"
                                            className="mx-auto w-1/2 rounded-lg"
                                        >
                                            <select
                                                onChange={(e: any) => handleChange(e)}
                                                name="city_id"
                                                className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                            >
                                                <option>Select</option>
                                                {ListOfCity && ListOfCity?.data?.map((item: any, index: any) => (
                                                    <option value={item?.id}>{item?.name}</option>

                                                ))}
                                            </select>
                                            <p className='text-[red]'>{errors && errors.city_id}</p>
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Throughput"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field 
                                        onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="throughput"
                                            className="w-[80%]"
                                            placeholder="Throughput"
                                            component={Input}
                                        />
                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="throughput_unit_id"
                                            className="h-11 border w-[20%]  input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Unit</option>
                                            {ListOfUnit && ListOfUnit?.data?.map((item: any, index: any) => (
                                                <option value={item?.id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.throughput}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Avg. Case Size"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field 
                                        onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="case_size"
                                            className="w-[80%]"
                                            placeholder="Avg. Case Size"
                                            component={Input}
                                        />

                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="case_size_unit_id"
                                            className="h-11 border w-[20%]  input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Unit</option>
                                            {ListOfUnit && ListOfUnit?.data?.map((item: any, index: any) => (
                                                <option value={item?.id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.case_size}</p>

                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Estimated Docks"
                                        className="rounded-lg pl-[22px] w-1/2"
                                    >
                                        <Field 
                                        onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="estimated_docks"
                                            placeholder="Estimated Docks"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Estimated Dispatches"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field 
                                        onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="estimated_dispatch"
                                            placeholder="Certification"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">

                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Temperature"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="temp_min"
                                            className="h-11 border w-[50%]  input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Minimum</option>
                                            {Array(3).fill(0).map((_, index) => (
                                                <option key={index} value={index * 5}>
                                                    {index * 5}
                                                </option>
                                            ))}


                                        </select>
                                        <select
                                            onChange={(e: any) => handleChange(e)}
                                            name="temp_max"
                                            className="h-11 border w-[50%]  input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Maximum</option>
                                            {Array(3).fill(0).map((_, index) => parseInt(formData?.temp_min) + index*5+5).map((item: any, index: any) => (
                                                <option value={parseInt(item) + 5}>{parseInt(item)}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red]'>{errors && errors.temp_max ? errors.temp_max:errors.temp_min}</p>

                                    </FormItem>
                                    <FormItem
                                        label="Date of Start"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field 
                                        onChange={(e: any) => handleChange(e)}
                                            type="date"
                                            autoComplete="off"
                                            name="date_of_start"
                                            placeholder="Date of Start"
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

export default PrepareSearch
