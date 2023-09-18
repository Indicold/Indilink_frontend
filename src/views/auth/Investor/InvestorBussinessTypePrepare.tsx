/* 
* The code is defining a React functional component called `InvestorBussinessTypePrepare`. 
*/
import { Button, FormContainer, FormItem, Input } from '@/components/ui';
import { Field, Form, Formik } from 'formik';

const InvestorBussinessTypePrepare = () => {

  return (
    <div>
        <div  className="bg-white">
            <h4 className=" mb-2 text-head-title text-center">Investor</h4>
            <div>
        {/* The code snippet is using the Formik library to handle form state and validation in a React
        component. */}
        <Formik>
            <Form className="py-2 multistep-form-step">
                <FormContainer>
                    <div className="flex">
                        <FormItem
                            label="Asset for Service"
                            className='mx-auto w-1/2 pl-[22px]'
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
                            className='mx-auto w-1/2 pl-[22px] rounded-lg'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Dropdown with checkbox options</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem label="Any other"
                            className='w-1/2 pl-[22px] rounded-lg'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Option</option>
                                <option>B</option>
                            </select>
                        </FormItem>

                    </div>
                    <div className="flex justify-center">
                        <Button
                                  style={{ borderRadius: "13px" }}
                                  block
                                  variant="solid"
                                  type="button"
                                //   onClick={handleRoute}
                                  className='indigo-btn w-[300px] mx-auto rounded-[30px]'
                              >
                                  Next
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

export default InvestorBussinessTypePrepare
