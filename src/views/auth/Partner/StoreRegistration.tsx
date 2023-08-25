import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import ChamberDetailModal from './MultistepForm/ChamberDetailModal';
import { useNavigate } from 'react-router-dom';

const StoreRegistration = () => {
    const [numChambers, setNumChambers] = useState<any>(0);
    const [show, setShow] = useState(false);
    const [chamberModal, setChamberModal] = useState(false);
    const navigate = useNavigate();
    const handleRoute = () => {
       navigate('/partner-bussiness-type-compliance')
    }
  return (
    <div className='bg-white p-4'>
        <h4 className='text-center text-head-title'>Store</h4>
      <Formik
        initialValues={{field: true}}
        onSubmit={() => console.log("Submited via my onSubmit function")}
        
        >

            {({ handleSubmit }) => (
            <Form className="py-2 ">
        {chamberModal && <ChamberDetailModal modal={chamberModal} setModal={setChamberModal} />}

                <FormContainer>
                    <div className="flex">
                        <FormItem
                                    label="City"
                                    className='w-1/2 text-label-title'
                                >
        
                            <select
                                id="countries"
                                name="Cold_Storage_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose Cold Storage</option>
                                <option value="a">A</option>

                            
                            </select>
                        </FormItem>
                        <FormItem
                            label="Address"
                            className='w-1/2 text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Company_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                placeholder="Company Name"
                                component={Input}
                            />
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                            label="Total tonnage"
                            className='w-1/2 text-label-title'
                        >
                            <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <input className='w-2/3' type='text' placeholder='Enter value' />
                                <select className=''>
                                    <option>Metric ton</option>
                                    <option>B</option>
                                </select>
                            </div>
                        </FormItem>
                        <FormItem
                                    label="Type of Store"
                                    className='w-1/2 text-label-title'
                                >
        
                            <select
                                id="countries"
                                name="Cold_Storage_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Chilled</option>
                                <option value="a">A</option>
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                                    label="Type of Cold Storage"
                                    className='w-1/2 text-label-title'
                                >
        
                            <select
                                id="countries"
                                name="Cold_Storage_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Chilled</option>
                                <option value="a">A</option>
                            </select>
                        </FormItem>
                        <FormItem
                            label="Total number of chambers"
                            className='w-1/2 text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"

                                placeholder="Total number of chambers"
                                value={numChambers}
                                // onChange={(e: any) => handlechange(e)}
                                component={Input}
                            />
                        </FormItem>
                    </div>
                    {/* <table className='table-fixed w-full'>
                        <thead>
                            <tr>
                                <th>Chambers</th>
                                <th>Icon</th>
                            </tr>
                        </thead>
                        <tbody>
                            <table className='table-fixed w-full'>
                                <thead>
                                    <tr>
                                        <th>Chamber number</th>
                                        <th>Chamber name</th>
                                        <th>Chamber size</th>
                                        <th>Number of pallets</th>
                                        <th>Pallet size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>4241234</td>
                                        <td>Chamber 1</td>
                                        <td>4241234</td>
                                        <td>41</td>
                                        <td>85</td>
                                    </tr>
                                </tbody>
                            </table>
                        </tbody>
                    </table> */}


                    <div className=' text-white indigo-btn w-full py-2 rounded-[13px]' role='button' onClick={()=>setShow(!show)}>
                        <p className='mx-auto w-fit font-bold'>Chambers</p>
                    </div>
                    {show && 
                    <div className='w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3'>
                        <div className='bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2'>
                            <div className='mx-auto'>Chamber no.</div>
                            <div className='mx-auto'>Chamber name</div>
                            <div className='mx-auto'>Chamber size</div>
                            <div className='mx-auto'>No. of pallets</div>
                            <div className='mx-auto'>Pallet size</div>
                        </div>
                        <div className='listt flex w-full bg-white py-4 rounded-[13px]'>
                            <div className='mx-auto'>A.P.</div>
                            <div className='mx-auto'>EXG4568</div>
                            <div className='mx-auto'>2</div>
                            <div className='mx-auto'>2014</div>
                            <div className='mx-auto'>48</div>
                        </div>
                        <div className='flex'>
                            <button className='mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border' onClick={()=>setChamberModal(true)}>Add details</button>
                        </div>
                    </div>}







                    <div className="flex">
                        <FormItem
                            label="Ante Room - Area"
                            className='w-1/2 text-label-title'
                        >
                            <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <input className='w-2/3' type='text' placeholder='Enter value' />
                                <select className=''>
                                    <option>Square feet</option>
                                    <option>B</option>
                                </select>
                            </div>
                        </FormItem>
                        <FormItem
                            label="Total number of docks"
                            className='w-1/2 text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"

                                placeholder="Total number of docks"
                                value={numChambers}
                                // onChange={(e: any) => handlechange(e)}
                                component={Input}
                            />
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                            label="Total office space"
                            className='w-1/2 text-label-title'
                        >
                            <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <input className='w-2/3' type='text' placeholder='Enter value' />
                                <select className=''>
                                    <option>Square feet</option>
                                    <option>B</option>
                                </select>
                            </div>
                        </FormItem>
                        <FormItem
                                    label="Type of docks"
                                    className='w-1/2 text-label-title'
                                >
        
                            <select
                                id="countries"
                                name="Cold_Storage_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose Cold Storage</option>
                                <option value="a">A</option>

                            
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                            label="Processing Area"
                            className='w-1/2 text-label-title'
                        >
                            <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <input className='w-2/3' type='text' placeholder='Enter value' />
                                <select className=''>
                                    <option>Square feet</option>
                                    <option>B</option>
                                </select>
                            </div>
                        </FormItem>
                        <FormItem
                            label="Parking Area"
                            className='w-1/2 text-label-title'
                        >
                            <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <input className='w-2/3' type='text' placeholder='Enter value' />
                                <select className=''>
                                    <option>Square feet</option>
                                    <option>B</option>
                                </select>
                            </div>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                                    label="Type of Refrigeration"
                                    className='w-1/2 text-label-title'
                                >
        
                            <select
                                id="countries"
                                name="Cold_Storage_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose Cold Storage</option>
                                <option value="a">A</option>

                            
                            </select>
                        </FormItem>
                        <FormItem
                                    label="Year of Installation"
                                    className='w-1/2 text-label-title'
                                >
        
                            <select
                                id="countries"
                                name="Cold_Storage_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose Cold Storage</option>
                                <option value="a">A</option>

                            
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                            label="Facility Manager Name"
                            className='w-1/2 text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Company_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                placeholder="Company Name"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Cold Storage Manager Contact Number"
                            className='w-1/2 text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Company_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                placeholder="Company Name"
                                component={Input}
                            />
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                                    label="Internet"
                                    className='w-1/2 text-label-title'
                                >
        
                            <select
                                id="countries"
                                name="Cold_Storage_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </FormItem>
                        <FormItem
                                    label="Wifi"
                                    className='w-1/2 text-label-title'
                                >
        
                            <select
                                id="countries"
                                name="Cold_Storage_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                                    label="CCTV"
                                    className='w-1/2 text-label-title'
                                >
        
                            <select
                                id="countries"
                                name="Cold_Storage_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </FormItem>
                        <FormItem
                                    label="Driver Area for Food and Resting"
                                    className='w-1/2 text-label-title'
                                >
        
                            <select
                                id="countries"
                                name="Cold_Storage_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </FormItem>
                    </div>
                    <div className="flex">
                        <FormItem
                            label="Weighbridge"
                            className='w-1/2 text-label-title'
                        >
                            <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                <select className=''>
                                    <option>Inside</option>
                                    <option>B</option>
                                </select>
                                <input className='w-2/3' type='text' placeholder='Enter value' />
                                <select className=''>
                                    <option>Distance in km</option>
                                    <option>B</option>
                                </select>
                            </div>
                        </FormItem>
                        <FormItem
                                    label="Road condition from main road"
                                    className='w-1/2 text-label-title'
                                >
        
                            <select
                                id="countries"
                                name="Cold_Storage_Name"
                                // onChange={(e:any)=>handlechange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Good</option>
                                <option value="a">A</option>
                            </select>
                        </FormItem>
                    </div>
                    
                    <div className="flex justify-center">
                           <Button
                              style={{ borderRadius: "13px" }}
                              block
                              variant="solid"
                              type="button"
                              onClick={handleRoute}
                              className='indigo-btn w-[300px] mx-auto rounded-[30px]'
                           >
                              Next
                           </Button>
                        </div>
                </FormContainer>
            </Form>)}
        </Formik>

    </div>
  )
}

export default StoreRegistration
