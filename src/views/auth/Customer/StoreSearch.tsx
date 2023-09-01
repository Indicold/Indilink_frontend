import React from 'react'
import {
    Button,
    Dropdown,
    FormContainer,
    FormItem,
    Input,
} from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import { useNavigate } from 'react-router-dom'

const StoreSearch = () => {
    const handleRoute = () => {
        console.log('clicked!')
    }
    return (
        <div>
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
                                            name="make"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            <option>B</option>
                                        </select>
                                    </FormItem>
                                    <FormItem
                                        label="City"
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
                                    <FormItem
                                        label="Temperature"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="temperature"
                                            placeholder="Temperature"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Unit"
                                        className="rounded-lg pl-[22px] w-1/2"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="unit"
                                            placeholder="Unit"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Certification"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="model"
                                            placeholder="Certification"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Date of Storage"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="model"
                                            placeholder="Date of Storage"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Storage Duration"
                                        className=" w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
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

export default StoreSearch
