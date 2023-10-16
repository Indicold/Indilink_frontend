/*
 * The above code is a TypeScript React component that handles the file upload functionality for partner business
 * type compliances.
 */
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
import { ToastContainer } from 'react-toastify'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const PartnerBussinessTypeCompliances = () => {
    // Get the user's token
    const { token }: any = getToken()
      const {id}:any=useParams()
    // Get the current location
    const location = useLocation()

    // Initialize a boolean variable based on the location state (default to false)
    const isDisabled = location?.state || false

    // Initialize state variables for file upload
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    // Get asset IDs from local storage
    const AssetsId: any = localStorage.getItem('assets_list_id')
    const AssetsType: any = localStorage.getItem('asset_id')

    // Determine the API URL based on the asset type
    let apiUrls: string =
        AssetsType == 1
            ? `partner/store/${id}`
            : AssetsType == 2
            ? `partner/move/${id}`
            : AssetsType == 3
            ? `partner/prepare/${id}`
            : ''

    // Fetch details using the determined API URL
    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
    } = useApiFetch<any>(apiUrls, token)
    console.log('TTTTTTTTTT', apiUrls, fetchDetails)

    let array1 = [
        {
            label: 'FSSAI License',
            placeholder: 'Upload',
            key: 'fsssai_lic',
            view: false,
            url: null,
            valid_till: null,
        },
        {
            label: 'ISO Certificate',
            placeholder: 'Upload',
            key: 'iso_cert',
            view: false,
            url: null,
            valid_till: null,
        },
        {
            label: 'HACCP',
            placeholder: 'Upload',
            key: 'haccp',
            view: false,
            url: null,
            valid_till: null,
        },
        {
            label: 'Pest Control Agency Contract',
            placeholder: 'Upload',
            key: 'pest_control_agency_contract',
            view: false,
            url: null,
            valid_till: null,
        },
        {
            label: 'BRC Audit or any other certification (If Applicable)',
            placeholder: 'Upload',
            key: 'brc_audit',
            view: false,
            url: null,
            valid_till: null,
        },
        {
            label: 'Pollution NOC',
            placeholder: 'Upload',
            key: 'pollution_noc',
            view: false,
            url: null,
            valid_till: null,
        },
        {
            label: 'Fire Safety NOC',
            placeholder: 'Upload',
            key: 'fire_safety_noc',
            view: false,
            url: null,
            valid_till: null,
        },
        {
            label: 'MCD License (if applicable)',
            placeholder: 'Upload',
            key: 'mcd_lic',
            view: false,
            url: null,
            valid_till: null,
        },
        {
            label: 'UP Cold Storage License',
            placeholder: 'Upload',
            key: 'up_cond_storage_lic',
            view: false,
            url: null,
            valid_till: null,
        },
        {
            label: 'Factory License',
            placeholder: 'Upload',
            key: 'factory_lic',
            view: false,
            url: null,
            valid_till: null,
        },
        {
            label: 'Panchayat NOC',
            placeholder: 'Upload',
            key: 'panchayat_noc',
            view: false,
            url: null,
            valid_till: null,
        },
    ]

    // Initialize state variable for the file upload items
    const [array, setArray] = useState(array1)

    // Handle changes in the file input
    const handleFileChange = (e: any, item: any) => {
        console.log('FILE', e.target.files[0])
        setSelectedFile(e.target.files[0])
        handleUpload(item, e.target.files[0])
    }

    const handleDateChange = (e:any) => {
        let newData = {...array}
        let newarr:any=array?.map((item:any,index:any)=>{
            if(item?.key==e.target.name){
                item.valid_till = e.target.value
            }
        })
        console.log("date_change", newData, e.target.value)
    }

    // Handle the file upload
    const handleUpload = async (item: any, file: any) => {
        let AssetsId = localStorage.getItem('AssetsId')
        let ListId = localStorage.getItem('assets_list_id')
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
            if (responseData?.status == 200 || responseData?.status) {
                const updatedArray = array.map((itemData: any) =>
                    itemData.key === item.key
                        ? {
                              ...itemData,
                              view: true,
                              url: responseData?.data,
                              message: 'Uploaded',
                          }
                        : itemData
                )

                setArray(updatedArray) // Update the state with the modified array
            } else if (
                responseData?.status == 400 ||
                responseData?.status == 409
            ) {
                const updatedArray = array.map((itemData: any) =>
                    itemData.key === item.key
                        ? {
                              ...itemData,
                              view: false,
                              url: responseData?.data,
                              message: 'Error While Uploading',
                          }
                        : itemData
                )
                setArray(updatedArray) // Update the state with the modified array
            }
            console.log('Response data:', responseData?.data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // Access the navigate function from React Router
    const navigate = useNavigate()

    // Handle route navigation
    const handleRoute = () => {
        navigate(`/partner-bussiness-type-additional/${id}`, { state: isDisabled })
    }

    // Use useEffect to update file upload items when fetchDetails changes
    useEffect(() => {
        if (fetchDetails) {
            const newData = {
                ...fetchDetails?.data,
            }

            const updatedArray = array.map((item) =>
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
    console.log('DDDDDDDD', array[0],isDisabled)
    return (
        <div className='flex'>
            <ToastContainer />

            <div className='w-1/6'>
            

            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">                  
    <li className="mb-10 ml-6">            
        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">Asset Specifications</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight pt-2">Compliance Details</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight pt-2">Additional submissions</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
</ol>




            </div>

            <div className="bg-white w-5/6">
            <ArrowBackIcon role='button' onClick={()=>navigate(-1)} />
                <h4 className=" mb-2 text-head-title text-center p-4">
                    Compliance Details
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
                                                type="file"
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
                                                    <p className="text-[red]">
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
                                            className=" w-1/2 rounded-lg pl-[22px] text-label-title "
                                        >
                                     
                                            <input type='date' disabled={isDisabled} placeholder='Valid Till' name={item?.key}  className="!w-full h-11 block w-full border border-gray-200 
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
                                        Next
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

export default PartnerBussinessTypeCompliances
