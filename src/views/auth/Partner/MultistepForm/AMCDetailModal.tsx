import { Button, FormItem, Input } from "@/components/ui";
import { handleStoreTable } from "@/store/customeHook/validate";
import { Field } from "formik";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
interface MajorityHolderModalProps {
    modal: boolean;
    formD: any;
    update: React.Dispatch<React.SetStateAction<boolean>>
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
const AMCDetailModal: React.FC<MajorityHolderModalProps>  = ({modal, formD, update,setModal}) => {
    const [data,setData]=useState({
    });
    const handleChange=(e:any)=>{
     const newData:any={...data};
     newData[e.target.name]=e.target.value;
  
     setData(newData);
     
         }
         const handlesave = () => {
            handleStoreTable('partner/store/amc',data,setModal,formD,update,"amc_ids")
             
         };
    return (
      <> 
      <ToastContainer />
      {modal && <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={()=>setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h6>A.M.C. Details</h6>
                                <div className="flex">
                                    <FormItem
                                        label="Asset id"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="asset_id"
                                            placeholder="Asset ID"
                                            onChange={(e:any)=>handleChange(e)}
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Name of service"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="name_of_service"
                                            placeholder="Name of service"
                                            onChange={(e:any)=>handleChange(e)}
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Vendor"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="vendor"
                                            placeholder="Vendor"
                                            onChange={(e:any)=>handleChange(e)}
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Valid till"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="valid_till"
                                            placeholder="Valid till"
                                            onChange={(e:any)=>handleChange(e)}
                                            component={Input}
                                        />
                                    </FormItem>
                            </div>
                            <div className="flex">
                                <FormItem
                                        label="Fixed cost"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="fixed_cost"
                                            placeholder="Fixed Cost"
                                            onChange={(e:any)=>handleChange(e)}
                                            component={Input}
                                        />
                                    </FormItem>
                            </div>
                            <Button
                                    style={{ borderRadius: "13px" }}
                                    block
                                    onClick={handlesave}
                                    variant="solid"
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

export default AMCDetailModal;