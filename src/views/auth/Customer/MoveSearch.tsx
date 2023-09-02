// Import necessary React and custom components and libraries
import React, { useState } from 'react';
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

// Define the functional component for MoveSearch
const MoveSearch = () => {
    // Define a state variable for the ThankYou modal
    const [modal, setModal] = useState(false);
    
    // Define a function to handle a button click
    const handleRoute = () => {
        console.log('clicked!');
        setModal(true); // Set the modal state to true
    }

  return (
        <div>
              {modal && <ThankYouModal/>}
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
                                            name="country"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            <option>B</option>
                                        </select>
                                    </FormItem>
                                    <FormItem
                                        label="From"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            name="category"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            <option>B</option>
                                        </select>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="PIN Code"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="pin"
                                            placeholder="PIN Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="GPS"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="gps"
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
                                            name="country"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            <option>B</option>
                                        </select>
                                    </FormItem>
                                    <FormItem
                                        label="From"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            name="category"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            <option>B</option>
                                        </select>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="PIN Code"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="pin"
                                            placeholder="PIN Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="GPS"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="gps"
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
                                            type="text"
                                            autoComplete="off"
                                            name="load"
                                            placeholder="Load Quantity"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Broad Category"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            name="category"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            <option>B</option>
                                        </select>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Product Type"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            name="category"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            <option>B</option>
                                        </select>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Dispactch Date/ Time"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="date"
                                            autoComplete="off"
                                            name="model"
                                            placeholder="Date of Storage"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Arrival Date/ Time"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="date"
                                            autoComplete="off"
                                            name="storage_duration"
                                            placeholder="Storage Duration"
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
