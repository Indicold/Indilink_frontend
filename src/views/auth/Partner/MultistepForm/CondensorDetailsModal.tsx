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
const CondensorDetailsModal: React.FC<MajorityHolderModalProps>  = ({modal, formD, update,setModal}) => {
    const [data,setData]=useState({
    });
    // function to store form data
    const handleChange=(e:any)=>{
     const newData:any={...data};
     newData[e.target.name]=e.target.value;
  
     setData(newData);
     console.log("newData",newData);
     
         }

         // function to handle modal form data submission and api call
         const handlesave = () => {
            // custom hook to handle api call
            handleStoreTable('partner/store/condensor',data,setModal,formD,update,"condensor_ids")
               
             
         };
    return (
      <> 
      {/* Component that displays messages from backend on api call */}
            <ToastContainer />
      {modal && 
      // modal container
      <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* button to close modal */}
                            <button onClick={()=>setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            {/* modal form container */}
                            <div className="px-6 py-6 lg:px-8">
                                <h6>Condensor Details</h6>
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
                                        label="Make"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="make"
                                            placeholder="Make"
                                            onChange={(e:any)=>handleChange(e)}
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Model"
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="model"
                                            placeholder="Model"
                                            onChange={(e:any)=>handleChange(e)}
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="T.R."
                                        className='mx-auto'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="tr"
                                            placeholder="T.R."
                                            onChange={(e:any)=>handleChange(e)}
                                            component={Input}
                                        />
                                    </FormItem>
                            </div>
                            <div className="flex">
                                <FormItem
                                        label="A.M.C."
                                        className='mx-auto'
                                    >
                                        <select
                                            id="countries"
                                            name="amc"
                                            onChange={(e:any)=>handleChange(e)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </FormItem>
                            </div>

                            {/* modal form submission button */}
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

export default CondensorDetailsModal;