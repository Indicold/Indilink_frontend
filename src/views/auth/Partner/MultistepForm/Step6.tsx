import { FormContainer, FormItem, Input } from '@/components/ui';
import { Field, Form, Formik } from 'formik';

const Step6 = () => {
  return (
    <div>
      <Formik>
            <Form className="py-2 multistep-form-step">
                <FormContainer>
                    <div className="flex">
                        <FormItem
                            label="Asset for Service"
                            className='mx-auto w-1/2'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="asset"
                                placeholder="Text"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem label="Specifications"
                            className='mx-auto w-1/2 rounded-lg'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Dropdown with checkbox options</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem label="Any other"
                            className='w-1/2 rounded-lg'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Option</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                    </div>
                </FormContainer>
            </Form>
        </Formik>
    </div>
  )
}

export default Step6;
