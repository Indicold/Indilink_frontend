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

const PrepareSearch = () => {
    const handleRoute = () => {
        console.log('clicked!')
    }
  return (
        <div>
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
                                            name="category"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            <option>B</option>
                                        </select>
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
                                    <FormItem
                                        label="Service Category"
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
                                        label="Country"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <select
                                            name="country"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            <option>B</option>
                                        </select>
                                    </FormItem>
                                    <div className="flex mx-auto w-1/2 rounded-lg pl-[22px]">
                                        <FormItem
                                            label="State"
                                            className="mx-auto w-1/2 rounded-lg"
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
                                            label="City"
                                            className="mx-auto w-1/2 rounded-lg"
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
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Throughput"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="pin"
                                            placeholder="Throughput"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Avg. Case Size"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="gps"
                                            placeholder="Avg. Case Size"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Estimated Docks"
                                        className="rounded-lg pl-[22px] w-1/2"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="load"
                                            placeholder="Estimated Docks"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Estimated Dispatches"
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
                                    
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Temperature"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="gps"
                                            placeholder="Temperature"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Date of Start"
                                        className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    >
                                        <Field
                                            type="date"
                                            autoComplete="off"
                                            name="pin"
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
