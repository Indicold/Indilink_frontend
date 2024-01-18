/*
 * The above code is a TypeScript React component that renders a modal for entering M.H.E. (Majority
 * Holder Entity) details. It receives props such as `modal` (boolean to control the visibility of the
 * modal), `formD` (form data), `update` (a function to update the state), `setModal` (a function to
 * set the visibility of the modal), and `MHE` (the existing M.H.E. data).
 */
import { Button, FormItem, Input } from '@/components/ui'
import usePutApi from '@/store/customeHook/putApi'
import { handleStoreTable, messageView, validateMHEForm, onkeyDownforNumSpecialCharcter, onkeyDownNew, messageViewNew } from '@/store/customeHook/validate'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
interface MajorityHolderModalProps {
    modal: boolean
    formD: any
    update: React.Dispatch<React.SetStateAction<boolean>>
    MHE: any
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    FetchAgain: any
}
const MHEDetailsModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
    MHE,
    FetchAgain,
    commanData
}:any) => {
    /* The code snippet is using the `useState` hook to define two state variables: `data` and
    `errors`. */
    const [data, setData] = useState<any>({})
    const [errors, setErrors] = useState({})
    const {id}: any = useParams(); // Extracting active URL endpoint to define payload for API call
    const isDisabled:any=commanData?.type=='View' ? true: false;
    const { result: PutApiResponse, loading: PutApiLoading, sendPostRequest: updateData }: any = usePutApi(`partner/store/mhe/${commanData?.id}`)

    /* The `useEffect` hook in the code snippet is used to update the state `data` when the component
    mounts. It runs only once when the component is first rendered, as indicated by the empty
    dependency array `[]` as the second argument. */
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
     * The handlesave function is used to handle saving data to a store table in a React
     * component.
     */
    const handlesave = () => {
        if(commanData?.type==='Edit'){
            updateData(data)
        }else{
            if(validateMHEForm(data, setErrors)) {
                handleStoreTable(
                    'partner/store/mhe',
                    data,
                    setModal,
                    formD,
                    update,
                    'mhe_ids',
                    FetchAgain
                )
                }
        }
      
    }
 
    /* The `useEffect` hook in the code snippet is used to update the state `data` when the
    `commanData` prop changes. It runs whenever the `commanData` prop changes, as indicated by the
    dependency array `[commanData]` as the second argument. */
    useEffect(()=>{
        if(commanData?.type=='Edit' || commanData?.type=='View'){
            setData(commanData)
        }
  
    },[commanData])
    useEffect(()=>{
if(PutApiResponse?.status===200){
    messageViewNew({message:"Data Updated Successfully !",status:200});
    setModal(false)
    FetchAgain();
}else{
    messageViewNew(PutApiResponse)
}
    },[PutApiResponse])
    return (
        <>
            <ToastContainer />
            {/* The above code is rendering a modal component in a React application. The modal is displayed
     when the `modal` variable is true. The modal contains a form with input fields for "Asset ID",
     "Make", "Model", and "Load". There is also a "Save" button that triggers the `handlesave`
     function when clicked. The modal can be closed by clicking on the close button in the top right
     corner. */}
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
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h6 className='text-center'>M.H.E. Details</h6>
                                    {/* <FormItem
                                        label="Asset ID*"
                                        className="mx-auto"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="asset_id"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Asset ID"
                                            component={Input}
                                        />
                                        <p className="text-[red] text-p-error-hight">
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
                                            value={data?.make}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Make"
                                            component={Input}
                                            onKeyDown={onkeyDownforNumSpecialCharcter}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.make}
                                        </p>
                                    </FormItem>
                                    <FormItem label="Model*" className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto">
                                      <Field
                                            type="text"
                                            autoComplete="off"
                                            name="model"
                                            disabled={isDisabled}
                                            value={data?.model}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Model"
                                            component={Input}
                                            onKeyDown={onkeyDownforNumSpecialCharcter}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.model}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                    <FormItem label="Load*" className="pl-3 w-[100%] text-label-title m-auto">
                                       <Field
                                            type="number"
                                            autoComplete="off"
                                            name="load"
                                            disabled={isDisabled}
                                            value={data?.load}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Load"
                                            component={Input}
                                            onKeyDown={onkeyDownNew}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.load}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className=' m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex'>
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

export default MHEDetailsModal
