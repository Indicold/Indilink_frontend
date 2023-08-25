import { Button, FormItem, Input } from "@/components/ui";
import { Field } from "formik";
import { useEffect, useState } from "react";
interface MajorityHolderModalProps {
    modal: boolean;
    chamber:any;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
const ChamberDetailModal: React.FC<MajorityHolderModalProps>  = ({modal,setModal}) => {
    const [data,setData]=useState({
       });
       
       const handleChange=(e:any)=>{
        const newData:any={...data};
    
        if(e.target.name==='photo_of_entrance'){
            newData[e.target.name]=e.target.files[0];
        }else{
            newData[e.target.name]=e.target.value;
        }
     
        setData(newData);
        console.log("newData",newData);
        
            }
            const handlesave = () => {
                let getData: any[] = JSON.parse(localStorage.getItem('chamber_List') || '[]');
            
                if (localStorage.getItem('chamber_List')) {
                    getData.push(data);
                    localStorage.setItem('chamber_List', JSON.stringify(getData));
                }
                
                if (!localStorage.getItem('chamber_List')) {
                    localStorage.setItem('chamber_List', JSON.stringify([data]));
                }
                console.log("gggggg");
                
            };
      
    return (
        <>
       {modal && 
       <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-[600px] max-h-full rounded-[13px]">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={()=>setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h6 className="text-center">Chamber</h6>
                                <div className="flex">
                                    <FormItem
                                        label="Chamber no."
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="chamber_number"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Chamber no."
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Chamber name"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="chamber_name"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Chamber name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Chamber Size"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="chamber_size"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Chamber Size"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="No. of pallets"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="no_of_pallets"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="No. of pallets"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>                                
                                <div className="flex">
                                    <FormItem
                                        label="Pallet size"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="pallet_size"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Pallet size"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Racking Type"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="racking_type_id"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Racking Type"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    {/* <FormItem
                                        label="Photo of entrance"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="floors"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Photo of entrance"
                                            component={Input}
                                        />
                                    </FormItem> */}
                                    <FormItem 
                                    label="Photo of entrance"
                                    className='mx-auto'
                                    >
                                        <input type="file" name="photo_of_entrance" id="" className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400" onChange={(e:any)=>handleChange(e)} />
                                    </FormItem>
                                    {/* <FormItem
                                        label="Photo of the chamber from inside"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="floorHeight"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Photo of the chamber from inside"
                                            component={Input}
                                        />
                                    </FormItem> */}
                                    <FormItem
                                        label="Photo of the chamber from inside"
                                        className='mx-auto'
                                    >
                                        <input type="file" name="photo_of_chamber" id="" className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400" onChange={(e:any)=>handleChange(e)} />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="No. of floors"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="no_of_floors"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="No. of floors"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Floor area"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="floor_area"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Floor area"
                                            component={Input}
                                        />
                                    </FormItem>
                                    
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Temperature range"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="temp_range"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Temperature range"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Height of each floor"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="each_floor_hight"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Capacity (Pallet)"
                                            component={Input}
                                        />
                                    </FormItem>
                                    
                                </div>
                                {/* <div className="flex">
                                    <FormItem
                                        label="Pallet Dimension mm"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="Pallet_Dimension"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Pallet Dimension "
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Floor Area (sqft)"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="Floor_Area_(sqft)"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Floor Area (sqft)"
                                            component={Input}
                                        />
                                    </FormItem>
                                    
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Staircase (Yes/No)"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="Staircase_(Yes/No)"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Yes/No"
                                            component={Input}
                                        />
                                    </FormItem>
                                  
                                    
                                </div> */}
                                <Button
                                    style={{ borderRadius: "13px" }}
                                    block
                                    variant="solid"
                                    onClick={handlesave}
                                    type="button"
                                    className='bg-[#3f8cfe] w-[40%] mx-auto rounded-[30px]'
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>}
                </>
    )
}

export default ChamberDetailModal;