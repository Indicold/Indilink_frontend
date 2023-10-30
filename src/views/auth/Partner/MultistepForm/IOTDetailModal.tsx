/*
 * The above code is a TypeScript React component that renders a modal for entering I.O.T. device
 * details. It includes form fields for asset id, type, device id, make, model, and internet enabled.
 * The component uses Formik for form handling and includes a save button that triggers a function to
 * store the entered data. The modal is displayed conditionally based on the value of the "modal" prop.
 */
import { Button, FormItem, Input } from '@/components/ui'
import usePutApi from '@/store/customeHook/putApi'
import { handleStoreTable, messageView, validateIOTForm } from '@/store/customeHook/validate'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
interface MajorityHolderModalProps {
    modal: boolean
    formD: any
    update: React.Dispatch<React.SetStateAction<boolean>>
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    FetchAgain: any
}
const IOTDetailModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
    FetchAgain,
    commanData
}:any) => {
    const [data, setData] = useState<any>({})
    const [errors, setErrors] = useState<any>({})
    const {id}: any = useParams();
    const isDisabled:any=commanData?.types=='View' ? true: false;
    const { result: PutApiResponse, loading: PutApiLoading, sendPostRequest: updateData }: any = usePutApi(`partner/store/iot-devices/${commanData?.id}`)

    useEffect(()=>{
        const newState:any = { ...data };
        newState.asset_id = id
        setData(newState)
        // console.log("AssetsId", localStorage.getItem('AssetsId'), newState)
    }, [])
    /**
     * The handleChange function updates the state data object with the new value from the input field.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input field.
     */
    const handleChange = (e: any) => {
        const newData: any = { ...data }
        newData[e.target.name] = e.target.value

        setData(newData)
        // console.log('newData', newData)
    }
    /**
     * The function `handlesave` is used to handle saving data to a specific store table in a
     * React application.
     */
    const handlesave = () => {
        if(commanData?.types==='Edit'){
            updateData(data)
        }else{
            if(validateIOTForm(data, setErrors)) {
                handleStoreTable(
                    'partner/store/iot-devices',
                    data,
                    setModal,
                    formD,
                    update,
                    'iot_devices_ids',
                    FetchAgain
                )
                }
        }
       
    }
    useEffect(()=>{
        if(commanData?.types=='Edit' || commanData?.types=='View'){
            setData(commanData)
        }
  
    },[commanData])
    useEffect(()=>{
if(PutApiResponse?.status===200){
    messageView("Data Updated Successfully !");
    setModal(false)
}else{
    messageView(PutApiResponse)
}
    },[PutApiResponse])
    return (
        <>
            <ToastContainer />
            {/* The above code is rendering a modal component in a React
            application. The modal is displayed when the `modal` variable is
            true. The modal contains a form with input fields for asset id,
            type, device id, make, model, and internet enabled. The user can
            enter values in these fields and click the "Save" button to save the
            form data. The modal can be closed by clicking the close button in
            the top right corner. */}
            {modal && (
                <div
                    id="authentication-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="my-auto relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                onClick={() => setModal(false)}
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h6 className='text-center'>I.O.T. Device Details</h6>
                                    {/* <FormItem
                                        label="Asset id*"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="asset_id"
                                            placeholder="Asset ID"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.asset_id}
                                        </p>
                                    </FormItem> */}
                                <div className="flex">
                                    <FormItem label="Type*" className="mx-auto">
                                       <Field
                                            type="text"
                                            autoComplete="off"
                                            name="type"
                                            disabled={isDisabled}
                                            placeholder="Type"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            value={data?.type}
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.type}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Device ID*"
                                        className="mx-auto"
                                    >
                                       <Field
                                            type="text"
                                            autoComplete="off"
                                            disabled={isDisabled}
                                            name="device_id"
                                            placeholder="Device ID"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            value={data?.device_id}
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.device_id}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem label="Make*" className="mx-auto">
                                     <Field
                                            type="text"
                                            autoComplete="off"
                                            name="make"
                                            disabled={isDisabled}
                                            placeholder="Make"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            value={data?.make}
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.make}
                                        </p>
                                    </FormItem>
                                    <FormItem label="Model*" className="mx-auto w-1/2">
                                      <Field
                                            type="text"
                                            autoComplete="off"
                                            name="model"
                                            disabled={isDisabled}
                                            placeholder="Model"
                                            value={data?.model}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.model}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Internet enabled*"
                                        className="mx-auto w-1/2"
                                    >
                                        <select
                                            id="countries"
                                            disabled={isDisabled}
                                            name="internet_enabled"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            <option value={1} selected={data?.internet_enabled === 1}>
                                                Yes
                                            </option>
                                            <option value={0} selected={data?.internet_enabled === 0}>No</option>
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.internet_enabled}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className='flex'>
                                <Button
                                    style={{ borderRadius: '13px' }}
                                    block
                                    disabled={isDisabled}
                                    variant="solid"
                                    onClick={handlesave}
                                    type="button"
                                    className="indigo-btn !w-[40%] mx-auto rounded-[30px]"
                                >
                                    Save
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default IOTDetailModal
