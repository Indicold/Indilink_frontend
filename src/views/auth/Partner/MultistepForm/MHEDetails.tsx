/*
 * The above code is a TypeScript React component that renders a modal for entering M.H.E. (Majority
 * Holder Entity) details. It receives props such as `modal` (boolean to control the visibility of the
 * modal), `formD` (form data), `update` (a function to update the state), `setModal` (a function to
 * set the visibility of the modal), and `MHE` (the existing M.H.E. data).
 */
import { Button, FormItem, Input } from '@/components/ui'
import { handleStoreTable, validateMHEForm } from '@/store/customeHook/validate'
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
    viewOnly: boolean
}
const MHEDetailsModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
    MHE,
    FetchAgain,
    viewOnly
}) => {
    const [data, setData] = useState<any>({})
    const [errors, setErrors] = useState({})
    const {id}: any = useParams()
    useEffect(()=>{
        const newState:any = { ...data };
        newState.asset_id = id
        setData(newState)
        // console.log("AssetsId", localStorage.getItem('AssetsId'), newState, data)
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
        // console.log('newData', newData, data)
    }
    /**
     * The handlesave function is used to handle saving data to a store table in a React
     * component.
     */
    const handlesave = () => {
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
    /* The `useEffect` hook is used to perform side effects in a React component. In this case,
         the `useEffect` hook is used to update the state data object with the value of `MHE`
         whenever it changes. */
    // useEffect(() => {
    //     setData({
    //         MHE: MHE,
    //     })
    // }, [data.MHE])
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
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
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
                                        <p className="text-[red]">
                                            {errors && errors.asset_id}
                                        </p>
                                    </FormItem> */}
                                <div className="flex">
                                    <FormItem label="Make*" className="mx-auto">
                                        {viewOnly ? (<Field
                                            type="text"
                                            autoComplete="off"
                                            name="make"
                                            placeholder="Make"
                                            component={Input}
                                            value={formD?.make}
                                            disabled={viewOnly}
                                        />) : (<Field
                                            type="text"
                                            autoComplete="off"
                                            name="make"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Make"
                                            component={Input}
                                        />)}
                                        <p className="text-[red]">
                                            {errors && errors.make}
                                        </p>
                                    </FormItem>
                                    <FormItem label="Model*" className="mx-auto">
                                        {viewOnly ? (<Field
                                            type="text"
                                            autoComplete="off"
                                            name="model"
                                            placeholder="Model"
                                            component={Input}
                                            value={formD?.model}
                                            disabled={viewOnly}
                                        />) : (<Field
                                            type="text"
                                            autoComplete="off"
                                            name="model"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Model"
                                            component={Input}
                                        />)}
                                        <p className="text-[red]">
                                            {errors && errors.model}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem label="Load*" className="me-auto">
                                        {viewOnly ? (<Field
                                            type="number"
                                            autoComplete="off"
                                            name="load"
                                            placeholder="Load"
                                            component={Input}
                                            value={formD?.load}
                                            disabled={viewOnly}
                                        />) : (<Field
                                            type="number"
                                            autoComplete="off"
                                            name="load"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Load"
                                            component={Input}
                                        />)}
                                        <p className="text-[red]">
                                            {errors && errors.load}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className='flex'>
                                <Button
                                    style={{ borderRadius: '13px' }}
                                    block
                                    onClick={handlesave}
                                    variant="solid"
                                    type="button"
                                    className="indigo-btn !w-[40%] mx-auto rounded-[30px]"
                                    disabled={viewOnly}
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
