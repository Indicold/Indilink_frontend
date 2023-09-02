// Import necessary components and libraries
import { Button, Dropdown, FormContainer, FormItem, Input } from '@/components/ui'; // Import UI components
import { getToken } from '@/store/customeHook/token'; // Import a custom hook for handling tokens
import useApiFetch from '@/store/customeHook/useApiFetch'; // Import a custom hook for API fetching
import { Field, Form, Formik } from 'formik'; // Import Formik for form handling
import { useState } from 'react'; // Import useState hook for managing component state

// Define the functional component for InvestorBussinessTypeStore
const InvestorBussinessTypeStore = () => {
    // Get the token from a custom hook
    const { token }: any = getToken();

    // Use the useApiFetch hook to fetch data
    const { data, loading, error } = useApiFetch<any>('master/partner/store/get-store-type', token);

    // Define a state variable for 'island' and initialize it to 'false'
    const [island, setIsland] = useState(false);

    // Define a state variable 'formData' and initialize it as an empty object
    const [formData, setFormData] = useState({});

    // Define a function to handle input changes
    const handleChange = (e: any) => {
        // Create a copy of the existing 'formData' object
        const newData: any = { ...formData };

        // Update the property in 'newData' with the new value
        newData[e.target.name] = e.target.value;
        
        // Check if the input with name 'islandavailable' has a value of 'Yes'
        if (e.target.name === 'islandavailable' && e.target.value === 'Yes') {
            setIsland(true); // Set 'island' state to 'true'
        }

        // Update the 'formData' state with the modified object
        setFormData(newData);
    }

    return (
    <div  className="bg-white">
            <h4 className=" mb-2 text-head-title text-center">Investor</h4>
    <div>
    <Formik>
        <Form className="py-2 multistep-form-step">
            <FormContainer>
                <div className="flex">
                    <FormItem
                        label="Location"
                        className='mx-auto pl-[22px] w-1/2'
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
                        className='mx-auto pl-[22px] w-1/2 rounded-lg'
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
                        className='rounded-lg pl-[22px] w-1/2'
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
                        className='mx-auto pl-[22px] w-1/2 rounded-lg'>
                        <select className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                            <option>Select Storage</option>
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
                        className='mx-auto pl-[22px] w-1/2 rounded-lg'>
                        <select name='islandavailable' onChange={(e:any)=>handleChange(e)} className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                            <option >Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </FormItem>
                </div>
                {island && <FormItem
                            label="Area of land"
                            className='pl-[22px] w-1/2'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="landarea"
                                placeholder="Location"
                                component={Input}
                            />
                        </FormItem>}
                        <div className="flex justify-center">
                        <Button
                                  style={{ borderRadius: "13px" }}
                                  block
                                  variant="solid"
                                  type="button"
                                //   onClick={handleRoute}
                                  className='indigo-btn mb-4 w-[300px] mx-auto rounded-[30px]'
                              >
                                  Research for search
                              </Button>
                              </div>
                {/* <div className='mx-auto pl-[22px] border w-fit rounded-lg py-2'>
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
</div>
  )
}

export default InvestorBussinessTypeStore
