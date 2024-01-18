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
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import { useTranslation } from 'react-i18next'

const CustomerDetailModal = ({message,setModal,setFormData,isDisabled}:any) => {
 const {token}:any=getToken()
  const [formData,setFormdata]=useState<any>({});
  const [errors, setErrors] = useState<any>({});
  
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

        const { t, i18n }:any = useTranslation();

  return (
    <div>
         {true && <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="my-auto otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-[800px] mt-[50px] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={() => setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <div className="px-6 py-6 lg:px-8">
              <h4 className="text-head-title text-center mb-4">{localStorage.getItem('user_type')==='Customer' ? "Request search" : "Choice on Business"} </h4>
              <p> {t("You may also change later")}</p>

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
                                         disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="product_category_id"
                                            className="h-11 border w-full input input-md focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfProductCategory && ListOfProductCategory?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id===formData?.product_category_id}>{item?.name}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red] text-p-error-hight'>{errors && errors.product_category_id}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Broad Category"
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
                                                <option value={item?.id} selected={item?.id===formData?.broad_category_id}>{item?.type}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red] text-p-error-hight'>{errors && errors.broad_category_id}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Product Type"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                         disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="product_type_id"
                                            className=" border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfProduct && ListOfProduct?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id===formData?.product_type_id}>{item?.type}</option>
                                            ))}

                                        </select>
                                        
                                    </FormItem>
                                    <FormItem
                                        label="Service Category"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                         disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="service_category_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfServiceCategory && ListOfServiceCategory?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id===formData?.service_category_id}>{item?.name}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red] text-p-error-hight'>{errors && errors.service_category_id}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Country"
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
                                        <p className='text-[red] text-p-error-hight'>{errors && errors.country_id}</p>
                                    </FormItem>
                                    <div className="flex mx-auto w-1/2 rounded-lg pl-[22px]">
                                        <FormItem
                                            label="State"
                                            className="mx-auto w-1/2 rounded-lg"
                                        >
                                            <select
                                             disabled={isDisabled}
                                                onChange={(e: any) => handleChange(e)}
                                                name="state_id"
                                                className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                            >
                                                <option>Select</option>
                                                {ListOfState && ListOfState?.data?.map((item: any, index: any) => (
                                                    <option value={item?.id} selected={item?.id === formData?.state_id}>{item?.name}</option>

                                                ))}
                                            </select>
                                            <p className='text-[red] text-p-error-hight'>{errors && errors.state_id}</p>
                                        </FormItem>
                                        <FormItem
                                            label="City"
                                            className="mx-auto w-1/2 rounded-lg"
                                        >
                                            <select
                                             disabled={isDisabled}
                                                onChange={(e: any) => handleChange(e)}
                                                name="city_id"
                                                className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                            >
                                                <option>Select</option>
                                                {ListOfCity && ListOfCity?.data?.map((item: any, index: any) => (
                                                    <option value={item?.id} selected={item?.id===formData?.city_id}>{item?.name}</option>

                                                ))}
                                            </select>
                                            <p className='text-[red] text-p-error-hight'>{errors && errors.city_id}</p>
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Throughput"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field 
                                        disabled={isDisabled}
                                        onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="throughput"
                                            value={formData?.throughput}
                                            className="w-[80%]"
                                            placeholder="Throughput"
                                            component={Input}
                                        />
                                        <select
                                         disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="throughput_unit_id"
                                            className="h-11 border w-[20%]  input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Unit</option>
                                            {ListOfUnit && ListOfUnit?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id===formData?.throughput_unit_id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red] text-p-error-hight'>{errors && errors.throughput}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Avg. Case Size"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field 
                                        disabled={isDisabled}
                                        onChange={(e: any) => handleChange(e)}
                                            type="text"
                                            autoComplete="off"
                                            name="case_size"
                                            className="w-[80%]"
                                            value={formData?.case_size}
                                            placeholder="Avg. Case Size"
                                            component={Input}
                                        />

                                        <select
                                         disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="case_size_unit_id"
                                            className="h-11 border w-[20%]  input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Unit</option>
                                            {ListOfUnit && ListOfUnit?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={formData?.case_size_unit_id}>{item?.type}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red] text-p-error-hight'>{errors && errors.case_size}</p>

                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Estimated Docks"
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
                                        label="Estimated Dispatches"
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
                                <div className="flex">

                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Temperature"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                         disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="temp_min"
                                            className="h-11 border w-[50%]  input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Minimum</option>
                                            {Array(3).fill(0).map((_, index) => (
                                                <option key={index} value={index * 5} selected={index*5===formData?.temp_min}>
                                                    {index * 5}
                                                </option>
                                            ))}


                                        </select>
                                        <select
                                         disabled={isDisabled}
                                            onChange={(e: any) => handleChange(e)}
                                            name="temp_max"
                                            className="h-11 border w-[50%]  input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Maximum</option>
                                            {Array(3).fill(0).map((_, index) => parseInt(formData?.temp_min) + index*5+5).map((item: any, index: any) => (
                                                <option value={parseInt(item) + 5} selected={parseInt(item) + 5===formData?.temp_max}>{parseInt(item)}</option>
                                            ))}

                                        </select>
                                        <p className='text-[red] text-p-error-hight'>{errors && errors.temp_max ? errors.temp_max:errors.temp_min}</p>

                                    </FormItem>
                                    <FormItem
                                        label="Date of Start"
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


                                <div className="flex justify-center w-[310px] mx-auto">
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
                                </div>
                            </FormContainer>
                        </Form>
                    </Formik>
                </div>
           
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default CustomerDetailModal
