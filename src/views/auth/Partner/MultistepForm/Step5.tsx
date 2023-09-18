import { Dropdown, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'

const Step5 = () => {
  return (
    <div>
        <Formik>
            <Form className="py-2 multistep-form-step">
                <FormContainer>
                    <div className="flex">
                        <FormItem label="Asset Class"
                            className='mx-auto w-1/2 rounded-lg'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Select</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                        <FormItem label="Type of Investment"
                            className='mx-auto w-1/2 rounded-lg'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Select</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem label="Commitment on offer from IndiCold and ROI"
                            className='mx-auto w-1/2 rounded-lg'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Option</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                        <FormItem label="Storage Type"
                            className='mx-auto w-1/2 rounded-lg'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Select</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                            label="Temperature Profile"
                            className='rounded-lg w-1/2'
                        >
                            <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
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
                        <FormItem
                            label="Possible Trucking"
                            className='mx-auto w-1/2 rounded-lg'
                        >
                            <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <input type='text' className='w-5/6' placeholder='Enter the amount for invest' />
                                <select>
                                    <option>Text</option>
                                    <option>B</option>
                                </select>
                            </div>
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

export default Step5
