/*
 * The above code is a TypeScript React component that handles additional submissions for a partner's business type.
 */
import { useTranslation } from 'react-i18next'
import {
    Button,
    Dropdown,
    FormContainer,
    FormItem,
    Input,
} from '@/components/ui'
import { getToken } from '@/store/customeHook/token'
import useApiUpload from '@/store/customeHook/uploadApi'
import useApiFetch from '@/store/customeHook/useApiFetch'
import { apiUrl } from '@/store/token'
import axios from 'axios'
import { File } from 'buffer'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import usePostApi from '@/store/customeHook/postApi'

// Define the PartnerBussinessTypeAdditional component
const PartnerBussinessTypeAdditional = () => {
    // Get the user's token
    const { token }: any = getToken()

    // Get the assets list ID and other information from local storage and location state
    const AssetsId: any = localStorage.getItem('assets_list_id')
    const location = useLocation()
    const isDisabled = location?.state || false
    const {id}:any=useParams();
    // Initialize state variables for file upload
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const AssetsType: any = localStorage.getItem('asset_id')

    // Construct the API URL based on the AssetsType
    let apiUrls: string =
        AssetsType == 1
            ? `partner/store/${id}`
            : AssetsType == 2
            ? `partner/move/${id}`
            : AssetsType == 3
            ? `partner/prepare/${id}`
            : ''

    // Fetch data from the API using a custom hook
    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
        refetch: refetchDetails
    } = useApiFetch<any>(apiUrls, token)

    // Define an array of objects for file upload items
    let array1 = [
        {
            label: 'No Lien Certificate',
            placeholder: 'Upload',
            key_text: '',
            key: 'no_lien_cert',
        },
        {
            label: 'Latest Electricity Bill',
            placeholder: 'Upload',
            key_text: '',
            key: 'latest_electricity_bill',
        },
        {
            label: 'Structural Load Safety',
            placeholder: 'Upload',
            key_text: '',
            key: 'structural_load_safety_cert',
        },
        // {
        //     label: 'Pest Control Agency Contract',
        //     placeholder: 'Upload',
        //     key_text: '',
        //     key: 'pest_control_agency_contract',
        // },
        // {
        //     label: 'Plant Layout',
        //     placeholder: 'Upload',
        //     key_text: 'plant_layout',
        //     key: 'plant_layout',
        // },
        {
            label: 'Insurance Certificate',
            placeholder: 'Upload',
            key_text: 'insurance_cert_text',
            key: 'insurance_cert',
        },
        {
            label: 'Facility Layout',
            placeholder: 'Upload',
            key_text: '',
            key: 'facility_layout',
        },
        {
            label: 'Storage Temperature Record for Last Couple of Months',
            placeholder: 'Upload',
            key_text: '',
            key: 'storage_temp_record',
        },
        {
            label: '3D view of the assets',
            placeholder: 'Upload',
            key_text: '',
            key: 'three_d_view_of_asset',
        },
        {
            label: 'Photo of the Assets',
            placeholder: 'Upload',
            key_text: '',
            key: 'photos_of_asset',
        },
        // Add additional objects as needed
        // Example:
        // {
        //   label: "New License",
        //   placeholder: "Upload",
        //   key: "new_license",
        // },
    ]

    const {
        result: ValidTillResponse,
        loading: ValidTillLoading,
        sendPostRequest: PostValidTillDetails,
    }: any = usePostApi(`partner/register-partner-upload-doc-text`)

    // Initialize state variable for the file upload items
    const [array, setArray] = useState<any>(array1)
    const [dateArray, setDateArray] = useState<any>({
        'asset_id': id,
        'asset_type_id': localStorage.getItem('asset_id')
    })

    // Handle file change and upload
    const handleFileChange = (e: any, item: any) => {
        setSelectedFile(e.target.files[0])
        handleUpload(item, e.target.files[0])
    }

    const today = new Date().toISOString().split('T')[0];
    const handleDateChange = (e:any) => {
        let newData = {...dateArray}
        newData[e.target.name] = e.target.value
        setDateArray(newData)
    }

    // Upload the file to the server
    const handleUpload = async (item: any, file: any) => {
        let AssetsId = localStorage.getItem('AssetsId')
        let asset_type_id = localStorage.getItem('asset_id')
        const { token } = getToken()
        const formData = new FormData()
        formData.append(item?.key, file)
        formData.append('key', item?.key)
        formData.append('asset_id', id)
        formData.append('asset_type_id', asset_type_id || '1')

        const headers = new Headers()
        headers.append('Authorization', `Bearer ${token}`)

        const config = {
            method: 'POST',
            body: formData,
            headers: headers,
        }

        try {
            const response = await fetch(
                `${apiUrl}/partner/register-partner-upload-doc`,
                config
            )
            const responseData = await response.json()
            if (responseData?.status) {
                const updatedArray = array.map((itemData: any) =>
                    itemData.key === item.key
                        ? { ...itemData, view: true, url: responseData?.data }
                        : itemData
                )
                setArray(updatedArray) // Update the state with the modified array
            }
            setResponse(response.data)
            setError(null)
        } catch (error: any) {
            setError(error)
            setResponse(null)
        }
    }
    const handleRoute = () => {
        PostValidTillDetails(dateArray)
        navigate('/asset_success')
    }

    // Effect to update the array based on fetched data
    useEffect(() => {
        if (fetchDetails) {
            const newData = {
                ...fetchDetails?.data,
            }

            const updatedArray = array.map((item: any) =>
                newData[item.key]
                    ? {
                          ...item,
                          view: true,
                          url: newData[item.key],
                          message: 'Uploaded',
                      }
                    : item
            )

            setArray(updatedArray)
        }
    }, [fetchDetails])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const { t, i18n }:any = useTranslation();
    // Render the component JSX
    return (
        <div className='flex'>
            <div className='w-1/6'>
            

            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">                  
    <li className="mb-10 ml-6">            
        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">{t("Asset Specifications")} </h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight pt-2">{t("Compliance Details")}</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>

</ol>




            </div>
            <div className="bg-white w-5/6">
            <ArrowBackIcon role='button' onClick={()=>navigate(-1)} />

                <h4 className="mb-2 text-head-title text-center p-4">
                    Additional Submissions
                </h4>
                <div>
                    <Formik>
                        <Form className="py-2 multistep-form-step">
                            <FormContainer>
                                <div className="flex flex-wrap">
                                    {array?.map((item: any, index: any) => (
                                           <>
                                           <FormItem
                                            label={item?.label}
                                            key={index}
                                            className=" w-1/2 rounded-lg pl-[22px] text-label-title "
                                        >
                                            <input
                                                disabled={isDisabled}
                                                type="file"  accept="image/png, image/jpeg"

                                                name={item?.key}
                                                id="file-input"
                                                className="!w-full block w-full border border-gray-200 
                        shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                   file:bg-transparent file:border-0
                             file:bg-gray-100 file:mr-4
                           file:py-3 file:px-4
                                  dark:file:bg-gray-700 dark:file:text-gray-400"
                                                onChange={(e: any) =>
                                                    handleFileChange(e, item)
                                                }
                                            />
                                          
                                            <div className="flex">
                                                {item?.message && (
                                                    <p className="text-[green]">
                                                        Status:{item?.message}
                                                    </p>
                                                )}
                                                {/* <button type='button' onClick={() => handleUpload(item)}>Upload</button> */}
                                                {item?.view && (
                                                    <a
                                                        href={`${item?.url}`}
                                                        target="_blank"
                                                        download={false}
                                                    >
                                                        View
                                                    </a>
                                                )}
                                            </div>
                                        </FormItem>
                                        <FormItem
                                           
                                            label="Valid Till"
                                            key={index}
                                            className={`w-1/2 rounded-lg pl-[22px] text-label-title ${item?.key_text === ''?'invisible':'visible'}`}
                                        >
                                     
                                            <input type='date' min={today} placeholder='Valid Till' name={`${item?.key}_text`}  
                                            defaultValue={fetchDetails?.data[item?.key_text]}  className="!w-full h-11 block w-full border border-gray-200 
                        shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                   file:bg-transparent file:border-0
                             file:bg-gray-100 file:mr-4
                           file:py-3 file:px-4
                                  dark:file:bg-gray-700 dark:file:text-gray-400"
                                               onChange={handleDateChange} />
                                        
                                        </FormItem>
                                        </>
                                    ))}
                                </div>

                                <div className="flex justify-center">
                                <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        role='button'
                                        onClick={()=>navigate(-1)}
                                        className="indigo-btn !w-[200px] !bg-gray-500 m-4 mx-auto rounded-[30px]"
                                    >
                                        Prev
                                    </Button>
                                    <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        onClick={handleRoute}
                                        className="indigo-btn !w-[200px] m-4 mx-auto rounded-[30px]"
                                    >
                                        Save Asset
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default PartnerBussinessTypeAdditional