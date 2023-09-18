import { Dropdown, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'

const Step4 = () => {
  return (
    <div>
        <Formik>
            <Form className="py-2 multistep-form-step">
                <FormContainer>
                    <div className="flex">
                        <FormItem
                            label="Location"
                            className='mx-auto w-1/2'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="location"
                                placeholder="Location"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Amount"
                            className='mx-auto w-1/2 rounded-lg'
                        >
                            <div className='flex h-11 input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <input type='text' className='w-5/6' placeholder='Enter the amount for invest' />
                                <select>
                                    <option>Rs.</option>
                                    <option>B</option>
                                </select>
                            </div>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                            label="Mezzanine structure"
                            className='rounded-lg w-1/2'
                        >
                            <div className='border flex h-11 w-fit input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <select>
                                    <option>Pallets</option>
                                    <option>B</option>
                                </select>
                                <input className='w-2/3' type='text' />
                                <select className=''>
                                    <option>cubic feet</option>
                                    <option>B</option>
                                </select>
                            </div>
                        </FormItem>
                        <FormItem label="Storage Type"
                            className='mx-auto w-1/2 rounded-lg'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Cold Storage</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                            label="Temperature Profile"
                            className='rounded-lg w-1/2'
                        >
                            <div className='border flex h-11 w-fit input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <select>
                                    <option>Unit</option>
                                    <option>B</option>
                                </select>
                                <input type='text' className='w-2/3' />
                                <select>
                                    <option>Celsius</option>
                                    <option>B</option>
                                </select>
                            </div>
                        </FormItem>
                        <FormItem label="Land"
                            className='mx-auto w-1/2 rounded-lg'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Area of land</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                    </div>
                    {/* <div className='mx-auto border w-fit rounded-lg py-2'>
                        <select>
                            <option>Pallets</option>
                            <option>B</option>
                        </select>
                        <input type='text' />
                        <select>
                            <option>cubic feet</option>
                            <option>B</option>
                        </select>
                    </div> */}
                </FormContainer>
            </Form>
        </Formik>
    </div>
  )
}

export default Step4
