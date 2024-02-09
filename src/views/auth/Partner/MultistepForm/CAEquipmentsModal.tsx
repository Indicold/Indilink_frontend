/*
 * The above code is a TypeScript React component that renders a modal for CA Equipment. It receives
 * props such as `modal`, `formD`, `update`, `setModal`, and `chamber`. It uses state to manage the
 * form data and handles changes in the form inputs. It also includes a `handlesave` function that is
 * triggered when the save button is clicked. The `handlesave` function calls the `handleStoreTable`
 * function from a custom hook to store the table data. The modal is displayed when the `modal` prop is
 * true.
 */
import { Button, FormItem, Input, Tooltip } from '@/components/ui'
import { getToken } from '@/store/customeHook/token'
import { handleStoreTable, messageView, validateCAEquipForm, onkeyDownNew, onkeyDownforNumSpecialCharcter, messageViewNew } from '@/store/customeHook/validate'
import axios from 'axios'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import InfoIcon from '@mui/icons-material/Info';
import usePutApi from '@/store/customeHook/putApi'
import { useTranslation } from 'react-i18next'
interface MajorityHolderModalProps {
    modal: boolean
    formD: any
    update: React.Dispatch<React.SetStateAction<boolean>>
    chamber: any
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    FetchAgain: any
}
const CAEquipmentsModal: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
    FetchAgain,
    commanData,
}:any) => {
    const { token }: any = getToken() // Replace this with your actual token retrieval logic
    const isDisabled:any=commanData?.type=='View' ? true: false;
    const {id}: any = useParams() // Extracting active URL endpoint to define payload for API call
    const [data, setData] = useState<any>({})
    const [errors, setErrors] = useState<any>({}) // State variable to store errors during form validations
    const { result: PutApiResponse, loading: PutApiLoading, sendPostRequest: updateData }: any = usePutApi(`partner/store/ca-equipment/${commanData?.id}`)

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
     * The handleChange function updates the state data based on the input value or file selected by
     * the user.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input field or a file input.
     */
    const { t, i18n }:any = useTranslation();
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
     * The function `handlesave` is an asynchronous function that calls the `handleStoreTable`
     * function with specific parameters.
     */
    const handlesave = async () => {
        if(commanData?.type==='Edit'){
            updateData(data)
        }else{
            if(validateCAEquipForm(data, setErrors)) {
            handleStoreTable(
                'partner/store/ca-equipment',
                data,
                setModal,
                formD,
                update,
                'ca_equipment_ids',
                FetchAgain
            )
            }
        }
      
    }
    useEffect(()=>{
        if(commanData?.type==='Edit' || commanData?.type==='View'){
            setData(commanData)
        }
    
    },[commanData])
useEffect(()=>{
    if(PutApiResponse?.status===200){
    messageViewNew({message:"Data Updated Successfully !",status:200})
        FetchAgain();
        if(modal){
            setModal(false)
        }
    }else if(PutApiResponse){
        messageViewNew(PutApiResponse)
    }
},[PutApiResponse])
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
                    <div className="relative my-auto w-full max-w-[600px] max-h-full rounded-[13px]">
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
                                <h6 className="text-center">{t("CA Equipment")}</h6>
                                    {/* <FormItem
                                        label="Asset ID *"
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
                                    <FormItem label= {t("Make *")}
                                       className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto">
                                        <Field
                                        disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            name="make"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            value={data?.make}
                                            placeholder="Make"
                                            component={Input}
                                            onKeyDown={onkeyDownforNumSpecialCharcter}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.make}
                                        </p>
                                    </FormItem>
                                    <FormItem label= {t("Model *")}
                                      className="pl-3 w-[100%] lg:w-1/2 md:w-1/2 text-label-title m-auto">
                                        <Field
                                                disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            name="model"
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
                                    <FormItem
                                        // label="C.F.M.*"
                                        label={
                                            <div className='flex justify-center items-center'>
                                           {t("C.F.M.*")}
                                              <Tooltip title="Cubic Feet Per Minute" arrow>
                                                <InfoIcon />
                                              </Tooltip>
                                            </div>
                                          }
                                        className="pl-3 w-[100%] text-label-title m-auto"
                                    >
                                        <Field
                                                disabled={isDisabled}
                                            type="number"
                                            autoComplete="off"
                                            name="cmf"
                                            value={data?.cmf}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="C.F.M."
                                            component={Input}
                                            onKeyDown={onkeyDownNew}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {errors && errors.cmf}
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
                                    className="indigo-btn !w-[40%] mx-auto mt-2 rounded-[30px]"
                                    
                                >
                                    {t("Save")}
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

export default CAEquipmentsModal
