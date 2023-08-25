import React from 'react'
import { Button, Dropdown, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom';

const PartnerBussinessTypePrepare = () => {
    const navigate=useNavigate();
    const handleRoute=()=>{
        navigate('/partner-bussiness-type-compliance')
   }
  return (
    <div>
    <div  className="bg-white">
     <h4 className=" mb-2 text-head-title text-center">Prepare</h4>
     <div>
 <Formik>
     <Form className="py-2 multistep-form-step">
         <FormContainer>
             <div className="flex">
                 <FormItem label="City"
                     className='mx-auto w-1/2 rounded-lg pl-[22px] '>
                   <Field
                                type="text"
                                autoComplete="off"
                                name="City"
                                placeholder="City"
                                component={Input}
                            />
                 </FormItem>
                 <FormItem label="Address"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'>
                        <Field
                                type="text"
                                autoComplete="off"
                                name="Address"
                                placeholder="Address"
                                component={Input}
                            />
                 </FormItem>
             </div>
             
             <div className="flex">
                 <FormItem label="Total Hourly ThroughOut"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'>
                    <Field
                                type="text"
                                autoComplete="off"
                                name="Total_Hourly"
                                placeholder="Enter Value"
                                component={Input}
                            />
                 </FormItem>
                 <FormItem label="Types Of Prepare"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'>
   <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                         <select className='w-full'>
                             <option>Types Of Prepare</option>
                             <option>B</option>
                         </select>
                         
                     </div>
                 </FormItem>
             </div>
             <div className="flex">
                 <FormItem
                     label="Product Category"
                     className='rounded-lg pl-[22px] w-1/2'
                 >
                     <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                         <select className='w-full'>
                             <option>Product Category</option>
                             <option>B</option>
                         </select>
                         
                     </div>
                 </FormItem>
                 <FormItem
                     label="Product Type"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'
                 >
                    <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                         <select className='w-full'>
                             <option>Product Type</option>
                             <option>B</option>
                         </select>
                         
                     </div>
                 </FormItem>
             </div>
             <div className="flex">
             <FormItem
                     label="ThroughOut"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                                type="text"
                                autoComplete="off"
                                name="ThroughOut"
                                placeholder="ThroughOut"
                                component={Input}
                            />
                 </FormItem>
                 <FormItem
                     label="Avg. case size"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                                type="text"
                                autoComplete="off"
                                name="Avgcasesize"
                                placeholder="Avg. case size"
                                component={Input}
                            />
                 </FormItem>
                 </div>
                 <div className="flex">
             <FormItem
                     label="Temperature"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                                type="text"
                                autoComplete="off"
                                name="ThroughOut"
                                placeholder="Enter Value"
                                component={Input}
                            />
                 </FormItem>
                 <FormItem
                     label="Batch Size"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                                type="text"
                                autoComplete="off"
                                name="batch_size"
                                placeholder="Batch Size"
                                component={Input}
                            />
                 </FormItem>
                 </div>
           
                 <div className="flex">
             <FormItem
                     label="Machines"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                                type="text"
                                autoComplete="off"
                                name="Machines"
                                placeholder="Machines"
                                component={Input}
                            />
                 </FormItem>
                 <FormItem
                     label="Area"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                                type="text"
                                autoComplete="off"
                                name="Area"
                                placeholder="Area"
                                component={Input}
                            />
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
     </Form>
 </Formik>
</div>
 </div>
</div>
  )
}

export default PartnerBussinessTypePrepare
