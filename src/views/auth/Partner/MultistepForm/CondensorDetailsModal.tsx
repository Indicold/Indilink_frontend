/*
 * The above code is a TypeScript React component that renders a modal for entering condenser details.
 * It receives props such as `modal`, `formD`, `update`, and `setModal` to control the visibility and
 * behavior of the modal. Inside the component, there is a form with input fields for asset ID, make,
 * model, T.R., and A.M.C. (Annual Maintenance Contract). The user can enter the details in the input
 * fields and click the "Save" button to save the data. The `handleChange` function is used to update
 * the `data` state with the input values
 */
import { Button, FormItem, Input, Tooltip } from '@/components/ui'
import usePutApi from '@/store/customeHook/putApi'
import { handleStoreTable, messageView, validateCondensorForm } from '@/store/customeHook/validate'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import InfoIcon from '@mui/icons-material/Info';
interface MajorityHolderModalProps {
    modal: boolean
    formD: any
    update: React.Dispatch<React.SetStateAction<boolean>>
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    FetchAgain: any
}
const CondensorDetailsModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
    FetchAgain,
    commanData
}:any) => {
    const [data, setData] = useState<any>({})
    const isDisabled:any=commanData?.type=='View' ? true: false;
    const [errors, setErrors] = useState({})
    const {id}: any = useParams() // Extracting active URL endpoint to define payload for API call
    const { result: PutApiResponse, loading: PutApiLoading, sendPostRequest: updateData }: any = usePutApi(`partner/store/condensor/${commanData?.id}`)

    /* The following code is using the useEffect hook in a React component. It is creating a new state
    object by copying the existing data object using the spread operator. Then, it is updating the
    asset_id property of the new state object with the value of the id variable. Finally, it is
    setting the new state object as the updated state using the setData function. The useEffect hook
    is triggered only once, when the component is mounted, as the dependency array is empty. */
    useEffect(()=>{
        const newState:any = { ...data };
        newState.asset_id = id
        setData(newState)
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
    }
    /**
     * The function `handlesave` is used to handle saving data to a store table in a React
     * component.
     */
    const handlesave = () => {
        if(commanData?.type==='Edit'){
            updateData(data)
        }else{
            if(validateCondensorForm(data, setErrors)) {
                handleStoreTable(
                    'partner/store/condensor',
                    data,
                    setModal,
                    formD,
                    update,
                    'condensor_ids',
                    FetchAgain
                )
                }
        }
       
    }
    useEffect(()=>{
if(commanData?.type=='Edit' || commanData?.type=='View'){
    setData(commanData)
}
    },[commanData])
    useEffect(()=>{
        if(PutApiResponse?.status===200){
            messageView("Data Updated Successfully !");
            setModal(false)
            FetchAgain();
        }else{
            messageView(PutApiResponse)
        }
            },[PutApiResponse])
    return (
        <>
            <ToastContainer />
            {/* The above code is rendering a modal component in a React application. The modal is
      conditionally rendered based on the value of the `modal` variable. When the `modal` variable
      is true, the modal component is displayed. */}
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
                                <h6 className='text-center m-2'>Condenser Details</h6>
                                    {/* <FormItem
                                        label="Asset id*"
                                        className="mx-auto w-1/2"
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
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                    <FormItem label="Make*" className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto">
                                       <Field
                                            type="text"
                                            disabled={isDisabled}
                                            autoComplete="off"
                                            name="make"
                                            placeholder="Make"
                                            value={data?.make}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.make}
                                        </p>
                                    </FormItem>
                                    <FormItem label="Model*" className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            disabled={isDisabled}
                                            name="model"
                                            value={data?.model}
                                            placeholder="Model"
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
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                    <FormItem label={<div className='flex justify-center items-center'>
                                           T.R.*
                                              <Tooltip title="Ton of Refrigeration" arrow>
                                                <InfoIcon />
                                              </Tooltip>
                                            </div>} className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto">
                                      <Field
                                            type="number"
                                            disabled={isDisabled}
                                            autoComplete="off"
                                            name="tr"
                                            placeholder="T.R."
                                            value={data?.tr}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.tr}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label={<div className='flex justify-center items-center'>
                                        A.M.C.*
                                           <Tooltip title="Annual Maintenance Contract" arrow>
                                             <InfoIcon />
                                           </Tooltip>
                                         </div>}
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <select
                                            id="countries"
                                            disabled={isDisabled}
                                            name="amc"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="bg-gray-50 border h-11 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       
                                        >
                                            <option selected disabled>Select</option>
                                            <option selected={data?.amc == "Yes"}>Yes</option>
                                            <option selected={data?.amc == "No"}>No</option>
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.amc}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex !justify-items-start">
                                </div>
                                <div className='flex mt-2 justify-center'>
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

export default CondensorDetailsModal
