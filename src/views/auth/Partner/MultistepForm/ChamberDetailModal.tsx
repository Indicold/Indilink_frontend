/* 
* The above code is a TypeScript React component that represents a modal for adding chamber details.
* It includes form fields for entering chamber information such as chamber number, chamber name,
* chamber size, number of pallets, pallet size, racking type, photo of entrance, photo of the chamber
* from inside, number of floors, floor area, temperature range, height of each floor, staircase
* (yes/no), and parking area. It also includes a save button that triggers a function to save the
* chamber details. The component uses various dependencies such as FormItem, Input, useApiFetch,
* useState, and ToastContainer 
*/
import { Button, FormItem, Input } from "@/components/ui";
import { apiUrl, getToken } from "@/store/customeHook/token";
import useApiFetch from "@/store/customeHook/useApiFetch";
import { Field } from "formik";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface MajorityHolderModalProps {
    modal: boolean;
    formD: any;
    update: React.Dispatch<React.SetStateAction<boolean>>;
    chamber: any;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChamberDetailModal: React.FC<MajorityHolderModalProps> = ({ modal, formD, update, setModal }) => {
    const { token }: any = getToken();
    const { data: RackingType, loading: RackingTypeLoading, error: RackingTypeError } = useApiFetch<any>('master/partner/store/get-racking-type', token);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>({
    });

    /**
     * The handleChange function updates the data object based on the input value and name, and logs
     * the updated data object.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the change, such as a user input or a file
     * selection.
     */
    const handleChange = (e: any) => {
        const newData: any = { ...data };
        newData.asset_id =localStorage.getItem('AssetsId') || "INDI01AAAA4";
        newData[e.target.name] = e.target.value;
        if (e.target.name === 'photo_of_entrance') {
            newData[e.target.name] = e.target.files[0];
        }
        else if (e.target.name === 'photo_of_chamber') {
            newData[e.target.name] = e.target.files[0];
        } else {
            newData[e.target.name] = e.target.value;
        }
        setData(newData);
        console.log("newData", newData);

    }
    /**
     * The `handlesave` function is responsible for saving chamber details by making a POST request to
     * the server with the provided form data.
     */
    const handlesave = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        var formdata = new FormData();
        formdata.append("asset_id", data?.asset_id);
        formdata.append("chamber_number", data?.chamber_number);
        formdata.append("chamber_name", data?.chamber_name);
        formdata.append("chamber_size", data?.chamber_size);
        formdata.append("no_of_pallets", data?.no_of_pallets);
        formdata.append("pallet_size",data?.pallet_size);
        formdata.append("racking_type_id", data?.racking_type_id);
        formdata.append("no_of_floors", data?.no_of_floors);
        formdata.append("staircase", data?.staircase);
        formdata.append("floor_area", data?.floor_area);
        formdata.append("temp_range", data?.temp_range);
        formdata.append("parking_area", data?.parking_area);
        formdata.append("each_floor_hight", data?.each_floor_hight);
        formdata.append("photo_of_entrance", data?.photo_of_entrance, "C:\Users\amritkumar\Pictures\adfas.png");
        formdata.append("photo_of_chamber", data?.photo_of_chamber, "C:\Users\amritkumar\Pictures\adfas.png");
    
        var requestOptions:any = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
    
        try {
          const response = await fetch(`${apiUrl}/partner/store/chamber`, requestOptions);
          const result = await response.json();
          if(result?.status){
            messageView('Chamber Details Updated Successfully!')
            const newD:any = {...formD};
            let arr:any = []
            if(newD[`chamber_ids`]) arr=[...newD[`chamber_ids`]]
            newD['chamber_ids'].push(result?.id);
            update(newD);
            setModal(false)
          }
          console.log(result?.status);
        } catch (error:any) {
            messageView(error.message)
          console.log('error', error.message);
        }
    };
    
    /**
     * The function `messageView` displays a success toast message with specified options.
     * @param {any} messagevalue - The message value is the text that you want to display in the toast
     * message. It can be any string or variable that contains the message you want to show.
     */
    const messageView=(messagevalue:any)=>{
        toast.success(messagevalue, {
            position: 'top-right', // Position of the toast
            autoClose: 3000,       // Auto-close after 3000ms (3 seconds)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                background: '#FFB017',fontSize:"bold",
                color: "#fff"// Set the background color here
            },
        });
    }
    return (
        <>
         <ToastContainer />
            {/* The above code is rendering a modal component in a TypeScript React application. The
            modal is displayed when the `modal` variable is true. The modal contains a form with
            various input fields such as chamber number, chamber name, chamber size, number of
            pallets, pallet size, racking type, photo of entrance, photo of the chamber from inside,
            number of floors, floor area, temperature range, height of each floor, staircase
            (yes/no), and parking area. The user can fill in these fields and click the "Save"
            button to save the form data. */}
            {modal &&
                <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-[800px] max-h-full rounded-[13px]">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={() => setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h6 className="text-center text-head-title">Chamber</h6>
                                <div className="flex">
                                    <FormItem
                                        label="Chamber no."
                                        className='mx-auto w-1/2'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="chamber_number"
                                            onChange={(e: any) => handleChange(e)}
                                            placeholder="Chamber no."
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Chamber name"
                                        className='mx-auto w-1/2'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="chamber_name"
                                            onChange={(e: any) => handleChange(e)}
                                            placeholder="Chamber name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Chamber Size"
                                        className='mx-auto w-1/2'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="chamber_size"
                                            onChange={(e: any) => handleChange(e)}
                                            placeholder="Chamber Size"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="No. of pallets"
                                        className='mx-auto w-1/2'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="no_of_pallets"
                                            onChange={(e: any) => handleChange(e)}
                                            placeholder="No. of pallets"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Pallet size"
                                        className='mx-auto w-1/2'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="pallet_size"
                                            onChange={(e: any) => handleChange(e)}
                                            placeholder="Pallet size"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Racking Type"
                                        className='mx-auto w-1/2'
                                    >

                                        <select
                                            name="racking_type_id"
                                            onChange={(e: any) => handleChange(e)}
                                            className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                            <option>Select</option>
                                            {RackingType && RackingType?.data?.map((item: any, index: any) => (
                                                <option value={item?.type}>{item?.type}</option>

                                            ))}
                                        </select>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    
                                    <FormItem
                                        label="Photo of entrance"
                                        className='mx-auto w-1/2'
                                    >
                                        <input type="file" name="photo_of_entrance" id="" className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400" onChange={(e: any) => handleChange(e)} />
                                    </FormItem>
                                 
                                    <FormItem
                                        label="Photo of the chamber from inside"
                                        className='mx-auto w-1/2'
                                    >
                                        <input type="file" name="photo_of_chamber" id="" className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400" onChange={(e: any) => handleChange(e)} />
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="No. of floors"
                                        className='mx-auto w-1/2'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="no_of_floors"
                                            onChange={(e: any) => handleChange(e)}
                                            placeholder="No. of floors"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Floor area"
                                        className='mx-auto w-1/2'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="floor_area"
                                            onChange={(e: any) => handleChange(e)}
                                            placeholder="Floor area"
                                            component={Input}
                                        />
                                    </FormItem>

                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Temperature range"
                                        className='mx-auto w-1/2'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="temp_range"
                                            onChange={(e: any) => handleChange(e)}
                                            placeholder="Temperature range"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Height of each floor"
                                        className='mx-auto w-1/2'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="each_floor_hight"
                                            onChange={(e: any) => handleChange(e)}
                                            placeholder="Capacity (Pallet)"
                                            component={Input}
                                        />
                                    </FormItem>

                                </div>
                            
                                <div className="flex">
                                    <FormItem
                                        label="Staircase (Yes/No)"
                                        className='mx-auto w-1/2'
                                    >
                                      
                                            <select name='staircase'  onChange={(e:any)=>handleChange(e)} className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                         <option value='true'>Yes</option>
                         <option value='false'>No</option>
                     </select>
                                    </FormItem>
                                    <FormItem
                                        label="Parking Area (sqft)"
                                        className='mx-auto w-1/2'
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="parking_area"
                                            onChange={(e:any)=>handleChange(e)}
                                            placeholder="Parking Area (sqft)"
                                            component={Input}
                                        />
                                    </FormItem>
                                    
                                </div> 
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