import React from 'react'
import { Button, Dropdown, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch'
import { useNavigate } from 'react-router-dom';

const PartnerBussinessTypeMove = () => {
    const {token}:any =getToken();
    const { data, loading, error } = useApiFetch<any>('master/partner/store/get-store-type', token);
  const navigate=useNavigate();
    const handleRoute=()=>{
        navigate('/partner-bussiness-type-compliance')
   }
    return (
    <div>
    <div  className="bg-white">
     <h4 className=" mb-2 text-head-title text-center">Move</h4>
     <div>
 <Formik
 initialValues={{field: true}}
 onSubmit={() => console.log("Submited via my onSubmit function")}
 >
     <Form className="py-2 multistep-form-step">
         <FormContainer>
             <div className="flex">
                 <FormItem label="Make"
                     className='mx-auto w-1/2 rounded-lg pl-[22px] '>
                     <select name='make' className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                         <option>Select</option>
                         <option>B</option>
                     </select>
                 </FormItem>
                 <FormItem label="Model"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'>
                        <Field
                                type="text"
                                autoComplete="off"
                                name="model"
                                placeholder="Model"
                                component={Input}
                            />
                 </FormItem>
             </div>
             <div className="flex">
                 <FormItem label="Vehical Number"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'>
                       <Field
                                type="text"
                                autoComplete="off"
                                name="Vehical_Number"
                                placeholder="Vehical Number"
                                component={Input}
                            />
                 </FormItem>
                 <FormItem label="Permit valid Till Date"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'>
                      <Field
                                type="text"
                                autoComplete="off"
                                name="model"
                                placeholder="Permit valid Till Date"
                                component={Input}
                            />
                 </FormItem>
             </div>
             <div className="flex">
                 <FormItem
                     label="PUCC valid Till Date"
                     className='rounded-lg pl-[22px] w-1/2'
                 >
                     <Field
                                type="text"
                                autoComplete="off"
                                name="PUCC_valid_Till_Date"
                                placeholder="PUCC valid Till Date"
                                component={Input}
                            />
                         
                 </FormItem>
                 <FormItem
                     label="Get Chassis No from RC"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                                type="text"
                                autoComplete="off"
                                name="model"
                                placeholder="Get Chassis No from RC"
                                component={Input}
                            />
                 </FormItem>
             </div>
             <FormItem
                     label="Fitness Certificate Valid Till"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                                type="text"
                                autoComplete="off"
                                name="model"
                                placeholder="Fitness Certificate Valid Till"
                                component={Input}
                            />
                 </FormItem>
           
                    <div className="flex justify-center w-[140px] mx-auto">
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

export default PartnerBussinessTypeMove
