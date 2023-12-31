/*
 * The above code is a TypeScript React component that renders a modal for entering A.M.C. (Annual
 * Maintenance Contract) details. It receives props such as `modal`, `formD`, `update`, and `setModal`
 * to control the visibility and behavior of the modal. Inside the modal, there are input fields for
 * entering asset ID, name of service, vendor, valid till date, and fixed cost. The user can enter the
 * details and click the "Save" button to save the data. The `handleChange` function is used to update
 * the `data` state object with the input values.
 */
import { Button, FormItem, Input } from '@/components/ui'
import usePutApi from '@/store/customeHook/putApi'
import { handleStoreTable, messageView, validateAMCForm } from '@/store/customeHook/validate'
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
const AMCDetailModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
    FetchAgain,
    commanData
}:any) => {
    /* The above code is using the useState hook in a React component to create two state variables:
    "data" and "errors". */
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const {id}: any = useParams() // Extracting active URL endpoint to define payload for API call
    const isDisabled:any=commanData?.type=='View' ? true: false;
    const { result: PutApiResponse, loading: PutApiLoading, sendPostRequest: updateData }: any = usePutApi(`partner/store/amc/${commanData?.id}`)

    /* The above code is using the useEffect hook in a React component. It is creating a new state
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
     * The handleChange function updates the state with the new value of the input field.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input field.
     */
    const handleChange = (e: any) => {
        const newData: any = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    const today = new Date().toISOString().split('T')[0];

    /**
     * The function `handlesave` is used to handle saving data to a store table in a React
     * application using TypeScript.
     */
    const handlesave = () => {
        if(commanData?.type==='Edit'){
            updateData(data)
        }else{
            if(validateAMCForm(data, setErrors)) {
                handleStoreTable(
                    'partner/store/amc',
                    data,
                    setModal,
                    formD,
                    update,
                    'amc_ids',
                    FetchAgain
                )
                }
        }
        
    }

    /**
     * The function `handleISOFormatDate` takes an input date and returns it in ISO format
     * (YYYY-MM-DD).
     * @param {any} inputdate - The inputdate parameter is the date that you want to convert to ISO
     * format. It can be in any valid date format that can be parsed by the JavaScript Date object.
     * @returns The function `handleISOFormatDate` returns a string in the format "YYYY-MM-DD"
     * representing the input date.
     */
    const handleISOFormatDate = (inputdate:any) => {
        let currentFullDate = new Date(inputdate)
        let month: any = currentFullDate.getMonth()+1;
        let year = currentFullDate.getFullYear();
        let date:any = currentFullDate.getDate();

        if(month<10){
            month=`0${month}`
        }
        if(date<10){
            date=`0${date}`
        }
        return `${year}-${month}-${date}`
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
      conditionally rendered based on the value of the `modal` variable. When the modal is rendered,
      it displays a form with several input fields for entering details related to an A.M.C. (Asset
      Maintenance Contract). The user can enter values for fields such as asset id, name of service,
      vendor, valid till, and fixed cost. There is also a "Save" button that triggers a `handlesave`
      function when clicked. */}
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
                                <h6 className='text-center m-2'>A.M.C. Details</h6>
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
                                <div className=" bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                    <FormItem
                                        label="Name of service*"
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Field
                                            type="text"
                                            disabled={isDisabled}
                                            autoComplete="off"
                                            name="name_of_service"
                                            placeholder="Name of service"
                                            value={data?.name_of_service}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.name_of_service}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Vendor*"
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                       <Field
                                            type="text"
                                            autoComplete="off"
                                            disabled={isDisabled}
                                            name="vendor"
                                            value={data?.vendor}
                                            placeholder="Vendor"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.vendor}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className=" bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                    <FormItem
                                        label="Valid till*"
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Field
                                            type="date"
                                            disabled={isDisabled}
                                            autoComplete="off"
                                            name="valid_till"
                                            min={today}
                                            value={handleISOFormatDate(data?.valid_till)}
                                            placeholder="Valid till"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.valid_till}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Fixed cost(Rs)*"
                                        className=" pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                       <Field
                                            type="number"
                                            autoComplete="off"
                                            disabled={isDisabled}
                                            name="fixed_cost"
                                            value={data?.fixed_cost}
                                            placeholder="Fixed Cost"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.fixed_cost}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex ">
                                </div>
                                <div className='flex'>
                                <Button
                                    style={{ borderRadius: '13px' }}
                                    block
                                    disabled={isDisabled}
                                    onClick={handlesave}
                                    variant="solid"
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

export default AMCDetailModal
