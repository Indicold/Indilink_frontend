/**
 * The above code is a TypeScript React component that renders a modal form for entering data related
 * to an ACU (Air Conditioning Unit) and includes form validation and a save button.
 * @param  - 1. `modal`: a boolean value indicating whether the modal is open or not.
 * @returns The component is returning a modal component that displays a form with input fields for
 * various attributes such as asset ID, make, model, C.M.F., H.P., A.M.C., T.R., and defrosting ID. The
 * user can enter values in these fields and click the "Save" button to save the data. The modal is
 * displayed conditionally based on the value of the "modal
 */
import { Button, FormItem, Input, Tooltip } from '@/components/ui'
import { getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import { handleStoreTable, messageView, validateACUForm } from '@/store/customeHook/validate'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import usePutApi from '@/store/customeHook/putApi'
interface MajorityHolderModalProps {
    modal: boolean
    formD: any
    update: React.Dispatch<React.SetStateAction<boolean>>
    chamber: any
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    FetchAgain: any
}
const ACUModall: React.FC<MajorityHolderModalProps> = ({
    modal,
    formD,
    update,
    setModal,
    FetchAgain,
    commanData
}:any) => {
   
    const {id}: any = useParams();
    const isDisabled:any=commanData?.type=='View' ? true: false;
    const [data, setData] = useState<any>({
        asset_id:id
    })
    const [errors, setErrors] = useState<any>({});
    const { result: PutApiResponse, loading: PutApiLoading, sendPostRequest: updateData }: any = usePutApi(`partner/store/acu/${commanData?.id}`)

    useEffect(()=>{
        const newState:any = { ...data };
        newState.asset_id = id
        setData(newState)
        console.log("AssetsId", localStorage.getItem('AssetsId'), newState)
    }, [])
    const {token}:any=getToken()
    const {
        data: DfTypeList,
        loading: DfLoading,
        error: DfError,
    } = useApiFetch<any>('master/partner/store/get-defrosting', token)

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
        console.log('newData', newData)
    }
    /**
     * The function `handlesave` calls the `handleStoreTable` function with specific
     * parameters.
     */
    const handlesave = () => {
        console.log("saved", data, validateACUForm(data, setErrors), errors)
        if(commanData?.type==='Edit'){
            updateData(data)
        }else{
            if(validateACUForm(data, setErrors)) {
                console.log("validated")
            handleStoreTable(
                'partner/store/acu',
                data,
                setModal,
                formD,
                update,
                'acu_ids',
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
}else{
    messageView(PutApiResponse)
}
    },[PutApiResponse])
    return (
        <>
            {/* The above code is a TypeScript React component that renders a modal. The modal is
       conditionally rendered based on the value of the `modal` variable. When the modal is
       rendered, it displays a form with several input fields and a save button. The user can enter
       values in the input fields and click the save button to save the form data. The modal can be
       closed by clicking the close button in the top right corner. */}
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
                                <h6 className="text-center">ACU Details</h6>
                                    {/* <FormItem
                                        label="Asset ID*"
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
                                <div className="flex">
                                    <FormItem label="Make*" className="mx-auto w-1/2">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="make"
                                            disabled={isDisabled}
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
                                    <FormItem label="Model*" className="mx-auto w-1/2">
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
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.model}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        // label="C.F.M.*"
                                        label={
                                            <div className='flex justify-center items-center'>
                                           C.F.M.*
                                              <Tooltip title="Cubic Feet Per Minute" arrow>
                                                <InfoIcon />
                                              </Tooltip>
                                            </div>
                                          }
                                        className="mx-auto w-1/2"
                                    >
                                        <Field
                                            type="number"
                                            autoComplete="off"
                                            name="cmf"
                                            disabled={isDisabled}
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
                                    label={
                                        <div className='flex justify-center items-center'>
                                       H.P.*
                                          <Tooltip title="Horsepower" arrow>
                                            <InfoIcon />
                                          </Tooltip>
                                        </div>
                                      }
                                     className="mx-auto w-1/2">
                                        <Field
                                            type="number"
                                            autoComplete="off"
                                            name="hp"
                                            disabled={isDisabled}
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
                                <div className="flex">
                                    {/* <FormItem
                                        label="A.M.C.*"
                                        className="mx-auto w-1/2"
                                    >
                                        <select
                                            id="countries"
                                            name="amc"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected disabled>Select</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.amc}
                                        </p>
                                    </FormItem> */}
                                    <FormItem 
                                    // label="T.R.*"
                                    label={
                                        <div className='flex justify-center items-center'>
                                     T.R.*
                                          <Tooltip title="T.R.*" arrow>
                                            <InfoIcon />
                                          </Tooltip>
                                        </div>
                                      }
                                    className="mx-auto w-1/2">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="tr"
                                            disabled={isDisabled}
                                            value={data?.tr}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="T.R."
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.tr}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Defrosting*"
                                        className="mx-auto w-1/2"
                                    >
                                        {/* <Field
                                            type="text"
                                            autoComplete="off"
                                            name="defrosting_id"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Defrosting ID"
                                            component={Input}
                                        /> */}
                                        <select
                                            name="defrosting_id"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            disabled={isDisabled}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option >Select</option>
                                            {DfTypeList && DfTypeList?.data?.map((item:any,index:any)=>(
  <option selected={item?.id===data?.defrosting_id} value={item?.id}>{item?.type}</option>
                                            ))}
                                          
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.defrosting_id}
                                        </p>
                                    </FormItem>
                                </div>

                                <div className="flex">
                                {/* <FormItem
                                        label="Discharge Outlet Pipe - GI*"
                                        className=" w-1/2"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="Discharge"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            placeholder="Defrosting ID"
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.defrosting_id}
                                        </p>
                                    </FormItem> */}
                                 
                                </div>
                                <div className="flex">
                                </div>
<div className='flex'>
                                <Button
                                    style={{ borderRadius: '13px' }}
                                    block
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

export default ACUModall
