import React, { useEffect, useState } from 'react'
import { Button, Dropdown, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import usePostApi from '@/store/customeHook/postApi';
import LoaderSpinner from '@/components/LoaderSpinner';
import { messageView, validatePrepareForm } from '@/store/customeHook/validate';
import { ToastContainer } from 'react-toastify';
import ACUModall from './MultistepForm/ACUModal';
import MachineModal from './MultistepForm/MachineModal';
import 'react-accessible-accordion/dist/fancy-example.css';

const PartnerBussinessTypePrepare = () => {
    const {token}:any=getToken();
    const location=useLocation();
    const isDisabled=location?.state || false;
    const AssetsId:any=localStorage.getItem('assets_list_id');
    const { data:prepareType, loading:prepareTypeLoading, error:prepareTypeError } = useApiFetch<any>('master/partner/prepare/get-prepare-type', token);
    const { data:CityList, loading:CityListLoading, error:CityListError } = useApiFetch<any>('master/get-city-by-countryId/101', token);
    const { data:ProductType, loading:ProductTypeLoading, error:ProductTypeError } = useApiFetch<any>('master/partner/prepare/get-product-category', token);
    const { result:PrepareResponse, loading: PrepareLoading, sendPostRequest: PostPrepareRegisterDetails }:any = usePostApi('https://seal-app-uqxwl.ondigitalocean.app/partner/prepare/register');
    const { data: fetchDetails, loading: fetchDetailsloading, error: fetchDetailsSerror } = useApiFetch<any>(`partner/prepare/${AssetsId}`, token);
   
    const payload:any={
    asset_id:localStorage.getItem('AssetsId'),
    city_id: "9",
    address: "VARANSHI",
    hourly_throughput: "2132",
    prepare_type_id: "4",
    product_category_ids: "6",
    product_type: "B",
    throughput: "ghfgh",
    avg_case_size: "4564",
    temperature: "23",
    type_of_dock_id: "4554",
    batch_size: "353453",
    machine_ids: "5545",
    area: "45345343"
  }
    const [formData,setFormData]=useState<any>({
        asset_id: localStorage.getItem('AssetsId'),
        city_id: '',
        address: '',
        hourly_throughput: '',
        prepare_type_id: '',
        product_category_ids: '',
        product_type: '',
        throughput: '',
        avg_case_size: '',
        temperature: '',
        no_of_docks:'',
        type_of_dock_id: '',
        batch_size: '',
        machine_ids: '',
        area: '',
      });
      const [errors, setErrors] = useState<any>({});
    const navigate=useNavigate();
    const handleChange=(e:any)=>{
        const newData={...formData};
        newData[e.target.name]=e.target.value;
        setFormData(newData)
        
    }
    const handleRoute=()=>{
    let isValid=validatePrepareForm(formData,setErrors)
    console.log("isValid",isValid);
        if(isValid){
            
            PostPrepareRegisterDetails(payload)
    navigate('/partner-bussiness-type-compliance')


        }
      
   }
   console.log("newdata",formData,PrepareResponse,PrepareLoading);
   useEffect(()=>{
    if(PrepareResponse?.status && PrepareResponse?.data){
        messageView('Data Updated Successfully !')
        setTimeout(()=>{
            navigate('/partner-bussiness-type-compliance')

        },2000)
    }

   },[PrepareResponse])

   const [machineModal, setMachineModal] = useState<any>(false);
   useEffect(() => {
if(fetchDetails?.data){
    setFormData(fetchDetails?.data)
}
   
}, [fetchDetails])
console.log("INDI01AAAA5INDI01AAAA5", fetchDetails);
  return (
    <div>
        <ToastContainer />
   {(PrepareLoading || prepareTypeLoading ||CityListLoading || ProductTypeLoading || fetchDetailsloading ) ? <LoaderSpinner/> : <div  className="bg-white">
     <h4 className=" mb-2 text-head-title text-center">Prepare</h4>
     <div>
 <Formik>
     <Form className="py-2 multistep-form-step">
        {machineModal && <MachineModal modal={machineModal} setModal={setMachineModal} />}
         <FormContainer>
             <div className="flex">
                 <FormItem label="City"
                     className='mx-auto w-1/2 rounded-lg pl-[22px] '>
                
                             <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                         <select disabled={isDisabled} className='w-full'   name="city_id"
                                onChange={(e:any)=>handleChange(e)}
                                >
                             <option>Select City</option>
                             {CityList && CityList?.data?.map((item:any,index:any)=>(
                             <option value={item?.id} selected={item?.id===formData?.city_id}>{item?.name}</option>

                             ))}
                         </select>
                         
                     </div>
                     <p className='text-[red]'>{errors && errors.city_id}</p>
                 </FormItem>
                 <FormItem label="Address"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'>
                        <Field
                        disabled={isDisabled}
                                type="text"
                                autoComplete="off"
                                name="address"
                                onChange={(e:any)=>handleChange(e)}
                                placeholder="Address"
                                value={formData?.address}
                                component={Input}
                            />
                            <p className='text-[red]'>{errors && errors.address}</p>
                 </FormItem>
             </div>
             
             <div className="flex">
                 <FormItem label="Total Hourly ThroughOut"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'>
                    <Field
                    disabled={isDisabled}
                                type="text"
                                autoComplete="off"
                                 onChange={(e:any)=>handleChange(e)}
                                name="hourly_throughput"
                                value={formData?.hourly_throughput}
                                placeholder="Enter Value"
                                component={Input}
                            />
                             <p className='text-[red]'>{errors && errors.hourly_throughput}</p>
           
                 </FormItem>
                 <FormItem label="Types Of Prepare"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'>
   <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                         <select disabled={isDisabled} className='w-full' name='prepare_type_id'  onChange={(e:any)=>handleChange(e)}>
                             <option>Types Of Prepare</option>
                             {prepareType && prepareType?.data?.map((item:any,index:any)=>(
                             <option value={item?.id} selected={item?.id===formData?.prepare_type_id}>{item?.type}</option>

                             ))}
                         </select>
                         
                     </div>
                     <p className='text-[red]'>{errors && errors.prepare_type_id}</p>
           
                 </FormItem>
             </div>
             <div className="flex">
                 <FormItem
                     label="Product Category"
                     className='rounded-lg pl-[22px] w-1/2'
                 >
                     <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                         <select disabled={isDisabled} className='w-full' name='product_category_ids'  onChange={(e:any)=>handleChange(e)}>
                             <option>Product Category</option>
                             {ProductType && ProductType?.data?.map((item:any,index:any)=>(
                             <option value={item?.id} selected={item?.id===formData?.product_category_ids[0]}>{item?.name}</option>

                             ))}
                         </select>
                         
                     </div>
                     <p className='text-[red]'>{errors && errors.product_category_ids}</p>
           
                 </FormItem>
                 <FormItem
                     label="Product Type"
                     className='mx-auto w-1/2 rounded-lg pl-[22px]'
                 >
                    <div className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                         <select disabled={isDisabled} className='w-full' name='product_type'  onChange={(e:any)=>handleChange(e)}>
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
                     disabled={isDisabled}
                                type="text"
                                autoComplete="off"
                                 onChange={(e:any)=>handleChange(e)}
                                name="throughput"
                                value={formData?.throughput}
                                placeholder="ThroughOut"
                                component={Input}
                            />
                             <p className='text-[red]'>{errors && errors.throughput}</p>
           
                 </FormItem>
                 <FormItem
                     label="Avg. case size"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                     disabled={isDisabled}
                                type="text"
                                autoComplete="off"
                                 onChange={(e:any)=>handleChange(e)}
                                name="avg_case_size"
                                value={formData?.avg_case_size}
                                placeholder="Avg. case size"
                                component={Input}
                            />
                            <p className='text-[red]'>{errors && errors.avg_case_size}</p>
                 </FormItem>
                 </div>
                 <div className="flex">
             <FormItem
                     label="No of Docks"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                     disabled={isDisabled}
                                type="text"
                                autoComplete="off"
                                 onChange={(e:any)=>handleChange(e)}
                                name="no_of_docks"
                                value={formData?.no_of_docks}
                                placeholder="Enter Value"
                                component={Input}
                            />
                            <p className='text-[red]'>{errors && errors.no_of_docks}</p>
                 </FormItem>
                 <FormItem
                     label="Types of Docks"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                     disabled={isDisabled}
                                type="text"
                                autoComplete="off"
                                 onChange={(e:any)=>handleChange(e)}
                                name="type_of_dock_id"
                                value={formData?.type_of_dock_id}
                                placeholder="Batch Size"
                                component={Input}
                            />
                             <p className='text-[red]'>{errors && errors.type_of_dock_id}</p>
                 </FormItem>
                 </div>
                 <div className="flex">
             <FormItem
                     label="Temperature"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                     disabled={isDisabled}
                                type="text"
                                autoComplete="off"
                                 onChange={(e:any)=>handleChange(e)}
                                name="temperature"
                                value={formData?.temperature}
                                placeholder="Enter Value"
                                component={Input}
                            />
                             <p className='text-[red]'>{errors && errors.temperature}</p>
             
                 </FormItem>
                 <FormItem
                     label="Batch Size"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                     disabled={isDisabled}
                                type="text"
                                autoComplete="off"
                                 onChange={(e:any)=>handleChange(e)}
                                name="batch_size"
                                value={formData?.batch_size}
                                placeholder="Batch Size"
                                component={Input}
                            />
                                 <p className='text-[red]'>{errors && errors.batch_size}</p>
             
                 </FormItem>
                 </div>
           
                 <div className="flex">
                 <FormItem
                     label="Area"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                     <Field
                     disabled={isDisabled}
                                type="text"
                                autoComplete="off"
                                 onChange={(e:any)=>handleChange(e)}
                                name="area"
                                value={formData?.area}
                                placeholder="Area"
                                component={Input}
                            />
                             <p className='text-[red]'>{errors && errors.area}</p>
             
                 </FormItem>
                <FormItem
                     label="Machines"
                     className=' w-1/2 rounded-lg pl-[22px]'
                 >
                    <Button
                           style={{ borderRadius: "13px" }}
                           block
                           disabled={isDisabled}
                           variant="solid"
                           type="button"
                           onClick={()=>setMachineModal(true)}
                           className='indigo-btn w-[300px] mx-auto rounded-[30px]'
                       >
                    Add Machine
                       </Button>
                     {/* <Field
                                type="text"
                                autoComplete="off"
                                 onChange={(e:any)=>handleChange(e)}
                                name="machine_ids"
                                placeholder="Machines"
                                component={Input}
                            /> */}
                                  <p className='text-[red]'>{errors && errors.machine_ids}</p>
             
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
 </div>}
</div>
  )
}

export default PartnerBussinessTypePrepare
