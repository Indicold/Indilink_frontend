/**
 * The `CompressorModal` component is a modal that allows users to input data for a compressor and save
 * it.
 * @param  - 1. `modal`: a boolean value indicating whether the modal is open or not.
 * @returns The CompressorModal component is being returned.
 */
import { Button, FormItem, Input, Tooltip } from '@/components/ui'
import { handleStoreTable, messageView, validateCompressorForm } from '@/store/customeHook/validate'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import InfoIcon from '@mui/icons-material/Info'
import usePutApi from '@/store/customeHook/putApi'
interface MajorityHolderModalProps {
    modal: boolean
    formD: any
    update: React.Dispatch<React.SetStateAction<boolean>>
    chamber: any
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    FetchAgain: any,

}
const CompressorModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
    FetchAgain,
    commanData
}: any) => {
    const [data, setData] = useState<any>({})
    const [errors, setErrors] = useState<any>({})
    const { id }: any = useParams(); // Extracting active URL endpoint to define payload for API call
    const isDisabled: any = commanData?.type == 'View' ? true : false;
    const { result: PutApiResponse, loading: PutApiLoading, sendPostRequest: updateData }: any = usePutApi(`partner/store/compressors/${commanData?.id}`)

    useEffect(() => {
        const newState: any = { ...data };
        newState.asset_id = id
        setData(newState)
    }, [])

    /**
     * The handleChange function updates the state with the new value entered in the input field or
     * the selected file in the file input field.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input field or a file input event.
     */
    const handleChange = (e: any) => {
        const newData: any = { ...data }

        if (e.target.name === 'photo_of_entrance') {
            newData[e.target.name] = e.target.files[0]
        } else {
            newData[e.target.name] = e.target.value
        }
        setData(newData)
    }
    /**
     * The handlesave function is used to handle saving data related to compressors in a
     * partner store.
     */
    const handlesave = () => {
        if (commanData?.type === 'Edit') {
            updateData(data)
        } else {
            if (validateCompressorForm(data, setErrors)) {
                handleStoreTable(
                    'partner/store/compressors',
                    data,
                    setModal,
                    formD,
                    update,
                    'compressor_ids',
                    FetchAgain
                )
            }
        }

    }
    useEffect(() => {
        if (commanData?.type == 'Edit' || commanData?.type == 'View') {
            setData(commanData)
        }
    }, [commanData])
    useEffect(() => {
        if (PutApiResponse?.status === 200) {
            messageView("Data Updated Successfully !");
            FetchAgain()
            setModal(false)
        } else {
            messageView(PutApiResponse)
        }
    }, [PutApiResponse])
    return (
        <>
            <ToastContainer />
            {/* The above code is a modal component in a TypeScript React application. It is conditionally
       rendered based on the value of the `modal` variable. When the `modal` variable is true, the
       modal is displayed on the screen. */}
            {modal && (
                <div
                    id="authentication-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="my-auto relative w-full max-w-[600px] max-h-full rounded-[13px]">
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
                                <h6 className="text-center mt-4">Compressor</h6>
                                {/* <FormItem
                                        label="Asset ID *"
                                        className="mx-auto w-1/2"
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
                                <div className=" bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex " >
                                    <FormItem label="Make *" className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto">
                                        <Field
                                            type="text"
                                            disabled={isDisabled}
                                            autoComplete="off"
                                            name="make"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            value={data?.make}
                                            placeholder="Make"
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.make}
                                        </p>
                                    </FormItem>
                                    <FormItem label="Model *" className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto">
                                        <Field
                                            type="text"
                                            disabled={isDisabled}
                                            autoComplete="off"
                                            name="model"
                                            value={data?.model}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Model"
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.model}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className=" bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                    <FormItem
                                        // label="C.F.M. *"
                                        label={
                                            <div className='flex justify-center items-center'>
                                                C.F.M.*
                                                <Tooltip title="Cubic Feet Per Minute" arrow>
                                                    <InfoIcon />
                                                </Tooltip>
                                            </div>
                                        }
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto"
                                    >
                                        <Field
                                            type="number"
                                            disabled={isDisabled}
                                            autoComplete="off"
                                            name="cmf"
                                            value={data?.cmf}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="C.F.M."
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.cmf}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        // label="H.P.*"
                                        label={
                                            <div className='flex justify-center items-center'>
                                                H.P.*
                                                <Tooltip title="Horsepower " arrow>
                                                    <InfoIcon />
                                                </Tooltip>
                                            </div>
                                        }
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto">
                                        <Field
                                            type="number"
                                            disabled={isDisabled}
                                            autoComplete="off"
                                            name="hp"
                                            value={data?.hp}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="H.P."
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.hp}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className=" bg-gray-100  m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex">
                                    <FormItem
                                        // label="A.M.C. *"
                                        label={
                                            <div className='flex justify-center items-center'>
                                                A.M.C.*
                                                <Tooltip title="Annual Maintenance Contract" arrow>
                                                    <InfoIcon />
                                                </Tooltip>
                                            </div>
                                        }
                                        className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title"
                                    >
                                        <select
                                            id="countries"
                                            name="amc"
                                            disabled={isDisabled}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option disabled selected value="">
                                                Select
                                            </option>
                                            <option value="Yes" selected={data?.amc == "Yes"}>Yes</option>
                                            <option value="No" selected={data?.amc == "No"}>No</option>
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.amc}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className='   m-auto mt-2 rounded-md p-2 w-[100%] md:flex lg:flex'>
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

export default CompressorModal
