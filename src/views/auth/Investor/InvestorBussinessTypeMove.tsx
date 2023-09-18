// Import necessary components and libraries
import React from 'react'; // Import React library
import { Button, Dropdown, FormContainer, FormItem, Input } from '@/components/ui'; // Import UI components
import { Field, Form, Formik } from 'formik'; // Import Formik for form handling
import { getToken } from '@/store/customeHook/token'; // Import a custom hook for handling tokens
import useApiFetch from '@/store/customeHook/useApiFetch'; // Import a custom hook for API fetching

// Define the functional component for InvestorBussinessTypeMove
const InvestorBussinessTypeMove = () => {
    // Get the token from a custom hook
    const { token }: any = getToken();

    // Use the useApiFetch hook to fetch data
    const { data, loading, error } = useApiFetch<any>('master/partner/store/get-store-type', token);

    // Log the fetched data to the console
    console.log("HHHH555", data);
    
  return (
    <div>
           <div  className="bg-white">
            <h4 className=" mb-2 text-head-title text-center">Investor</h4>
            <div>
        <Formik>
            <Form className="py-2 multistep-form-step">
                <FormContainer>
                    <div className="flex">
                        <FormItem label="Asset Class"
                            className='mx-auto w-1/2 rounded-lg pl-[22px] '>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Select</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                        <FormItem label="Type of Investment"
                            className='mx-auto w-1/2 rounded-lg pl-[22px]'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Select</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem label="Commitment on offer from IndiCold and ROI"
                            className='mx-auto w-1/2 rounded-lg pl-[22px]'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Option</option>
                                <option>B</option>
                            </select>
                        </FormItem>
                        <FormItem label="Storage Type"
                            className='mx-auto w-1/2 rounded-lg pl-[22px]'>
                            <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <option>Select</option>
                                {data && data?.data.map((item:any,index:any)=>(
                                <option key={index} value={item?.type}>{item?.type}</option>

                                ))}
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                            label="Temperature Profile"
                            className='rounded-lg pl-[22px] w-1/2'
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
                            className='mx-auto w-1/2 rounded-lg pl-[22px]'
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
                    {/* <div className='mx-auto border w-fit rounded-lg pl-[22px] py-2'>
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
                           <div className="flex justify-center">
                        <Button
                                  style={{ borderRadius: "13px" }}
                                  block
                                  variant="solid"
                                  type="button"
                                //   onClick={handleRoute}
                                  className='indigo-btn w-[300px] mx-auto rounded-[30px]'
                              >
                                  Research for search
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

export default InvestorBussinessTypeMove
