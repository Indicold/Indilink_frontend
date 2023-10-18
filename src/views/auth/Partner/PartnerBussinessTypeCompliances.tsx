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
import usePostApi from '@/store/customeHook/postApi'
const PartnerBussinessTypeCompliances = () => {
    // Get the user's token
    const { token }: any = getToken()
    const { id }: any = useParams()
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

    let array1 = [
        {
            label: 'FSSAI License',
            placeholder: 'Upload',
            key: 'fsssai_lic',
            key_text: 'fsssai_lic_text',
            view: false,
            key_lic: 'fsssai_lic_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'ISO Certificate',
            placeholder: 'Upload',
            key: 'iso_cert',
            key_text: 'iso_cert_text',
            view: false,
            key_lic: 'iso_cert_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'HACCP',
            placeholder: 'Upload',
            key: 'haccp',
            key_text: 'haccp_text',
            view: false,
            key_lic: 'haccp_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'Pest Control Agency Contract',
            placeholder: 'Upload',
            key: 'pest_control_agency_contract',
            key_text: 'pest_control_agency_contract_text',
            view: false,
            key_lic: 'pest_control_agency_contract_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'BRC Audit or any other certification (If Applicable)',
            placeholder: 'Upload',
            key: 'brc_audit',
            key_text: 'brc_audit_text',
            view: false,
            key_lic: 'brc_audit_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'Pollution NOC',
            placeholder: 'Upload',
            key: 'pollution_noc',
            key_text: 'pollution_noc_text',
            view: false,
            key_lic: 'pollution_noc_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'Fire Safety NOC',
            placeholder: 'Upload',
            key: 'fire_safety_noc',
            key_text: 'fire_safety_noc_text',
            view: false,
            key_lic: 'fire_safety_noc_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'MCD License (if applicable)',
            placeholder: 'Upload',
            key: 'mcd_lic',
            key_text: 'mcd_lic_text',
            view: false,
            key_lic: 'mcd_lic_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'UP Cold Storage License',
            placeholder: 'Upload',
            key: 'up_cond_storage_lic',
            key_text: 'up_cond_storage_lic_text',
            view: false,
            key_lic: 'up_cond_storage_lic_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'Factory License',
            placeholder: 'Upload',
            key: 'factory_lic',
            key_text: 'factory_lic_text',
            view: false,
            key_lic: 'factory_lic_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'Panchayat NOC',
            placeholder: 'Upload',
            key: 'panchayat_noc',
            key_text: 'panchayat_noc_text',
            view: false,
            key_lic: 'panchayat_noc_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'No Lien Certificate',
            placeholder: 'Upload',
            key_text: 'no_lien_cert_text',
            view: false,
            key: 'no_lien_cert',
            key_lic: 'no_lien_cert_license',
            url: null,
            valid_till: null,
        },
        {
            label: 'Latest Electricity Bill',
            placeholder: 'Upload',
            key_text: 'latest_electricity_bill_text',
            key: 'latest_electricity_bill',
            key_lic: 'latest_electricity_bill_license',
            url: null,
            valid_till: null,
            view: false,
        },
        {
            label: 'Structural Load Safety',
            placeholder: 'Upload',
            key_text: 'structural_load_safety_cert_text',
            key: 'structural_load_safety_cert',
            key_lic: 'structural_load_safety_cert_license',
            url: null,
            valid_till: null,
            view: false,

        },
        {
            label: 'Insurance Certificate',
            placeholder: 'Upload',
            key_text: 'insurance_cert_text',
            key: 'insurance_cert',
            key_lic: 'insurance_cert_license',
            url: null,
            valid_till: null,
            view: false,
        },
        {
            label: 'Facility Layout',
            placeholder: 'Upload',
            key_text: 'facility_layout_text',
            key: 'facility_layout',
            key_lic: 'facility_layout_license',
            url: null,
            valid_till: null,
            view: false,
        },
        {
            label: 'Storage Temperature Record for Last Couple of Months',
            placeholder: 'Upload',
            key_text: 'storage_temp_record_text',
            key: 'storage_temp_record',
            key_lic: 'storage_temp_record_license',
            url: null,
            valid_till: null,
            view: false,
        },
    ];



    const {
        result: ValidTillResponse,
        loading: ValidTillLoading,
        sendPostRequest: PostValidTillDetails,
    }: any = usePostApi(`partner/register-partner-upload-doc-text`)

    // Initialize state variable for the file upload items
    const [array, setArray] = useState(array1)
    const [dateArray, setDateArray] = useState<any>({
        'asset_id': id,
        'asset_type_id': localStorage.getItem('asset_id')
    })

    // Handle changes in the file input
    const handleFileChange = (e: any, item: any) => {
        setSelectedFile(e.target.files[0])
        handleUpload(item, e.target.files[0])
    }

    const handleDateChange = (e: any) => {
        let newData = { ...dateArray }
        newData[e.target.name] = e.target.value
        setDateArray(newData)
        const updatedArray = array.map((item: any) => {
            if (e.target.name === item.key_text) {
                return {
                    ...item,
                    valid_till: e.target.value
                };
            } else {
                return item; // Keep the other items unchanged
            }
        });
        setArray(updatedArray);
    };

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
                            key_lic: "",
                            url: responseData?.data,
                            message: 'Error While Uploading',
                        }
                        : itemData
                )
                setArray(updatedArray) // Update the state with the modified array
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // Access the navigate function from React Router
    const navigate = useNavigate()
    const validateData = () => {
        let error: any = false;

        const updatedArray = array.map((itemData: any) => {
            if (itemData?.url) {
                if (itemData?.valid_till === null || itemData?.valid_till === '' || itemData?.valid_till === undefined) {

                    error = true
                    return {
                        ...itemData,
                        messageText: 'Valid till date is required',
                    }
                } else {
                    return {
                        ...itemData,
                        messageText: '',
                    }
                }
            }

        }

        )
        setArray(updatedArray)
        let isValid = updatedArray?.some((item: any) => {
            if ((item?.valid_till === null ||
                item?.valid_till === undefined ||
                item?.valid_till === '') && item?.url)
                return true
        });


        return isValid
    }
    // Handle route navigation
    const handleRoute = () => {

        // if (!validateData()) {
        PostValidTillDetails(dateArray)
        console.log("KEYJHJHKHKHKHK");
        navigate('/asset_success')
        // navigate(`/partner-bussiness-type-additional/${id}`, { state: isDisabled })
        // }

    }
    const handleChange = (e: any, item: any) => {

        console.log("TYYYYYYYYY", e.target.name, item);

        const newData: any = { ...dateArray }
        newData[e.target.name] = e.target.value
        setDateArray(newData)
        // const updatedArray = array.map((itemData) =>
        //   item.key_lic === itemData.key_lic
        //     ? { ...itemData, key_lic: e.target.value }
        //     : itemData
        // );
        // setArray(updatedArray);
        console.log("TTTTT66TTTT", e.target.name, newData);
        // console.log("TTTTT66TTTT",newData);

    };

    // Use useEffect to update file upload items when fetchDetails changes
    /* The above code is a commented out `useEffect` hook in a TypeScript React component. It appears to
    be updating an array of items based on some data fetched from an API. */
    useEffect(() => {
        if (fetchDetails?.data !== null) {
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
    useEffect(() => {
        if (fetchDetails?.data !== null) {
            const updatedArray = array.map((item: any) =>
                true && {
                    ...item,
                    valid_till: fetchDetails?.data[item?.key_text],
                    // key_lic: fetchDetails?.data[item?.key_lic]

                }
            )
            setArray(updatedArray)
        }

    }, [])
    console.log("tryttytyrty", array);
/* The above code is a useEffect hook in a TypeScript React component. It is triggered whenever the
`fetchDetails.data` value changes. */
    useEffect(() => {


        if (fetchDetails?.data) {
            const apiData: any = fetchDetails?.data;

            const payload: any = {
                asset_id: id,
                asset_type_id: localStorage.getItem('asset_id')
            };

            array.forEach((fieldDef: any) => {
                const { key, key_text, key_lic } = fieldDef;

                if (apiData[key]) {
                    payload[key] = apiData[key];
                }

                if (apiData[key_text]) {
                    payload[key_text] = apiData[key_text];
                }

                if (apiData[key_lic]) {
                    payload[key_lic] = apiData[key_lic];
                }
            });
            setDateArray(payload)
            console.log("Payload:", payload);
        }


    }, [fetchDetails?.data])
    return (
        <div className='flex'>
            <ToastContainer />

            <div className='w-1/6'>


                <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                            </svg>
                        </span>
                        <h6 className="font-medium leading-tight">Asset Specifications</h6>
                        {/* <p className="text-sm">Step details here</p> */}
                    </li>
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                            </svg>
                        </span>
                        <h6 className="font-medium leading-tight pt-2">Compliance Details</h6>
                        {/* <p className="text-sm">Step details here</p> */}
                    </li>

                </ol>




            </div>

            <div className="bg-white w-5/6">
                <ArrowBackIcon role='button' onClick={() => navigate(-1)} />
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
                                                        <span className="align-right" ><a
                                                            href={`${item?.url}`}
                                                            target="_blank"
                                                            download={false}
                                                        >
                                                            View
                                                        </a>
                                                        </span>
                                                    )}
                                                </div>
                                            </FormItem>
                                            <div className='flex'>
                                                <FormItem
                                                    label="Valid Till"
                                                    key={index}
                                                    className={`w-1/2 rounded-lg pl-[22px] text-label-title ${item?.key_text === '' ? 'invisible' : 'visible'}`}
                                                >

                                                    <input type='date'
                                                     disabled={isDisabled}
                                                    placeholder='Valid Till' name={item?.key_text}
                                                        defaultValue={fetchDetails?.data && fetchDetails?.data[item?.key_text]} className="!w-full h-11 block w-full border border-gray-200 
                        shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                   file:bg-transparent file:border-0
                             file:bg-gray-100 file:mr-4
                           file:py-3 file:px-4
                                  dark:file:bg-gray-700 dark:file:text-gray-400"
                                                        onChange={handleDateChange} />

                                                    {item?.messageText && (
                                                        <p className="text-[red]">
                                                            {item?.messageText}
                                                        </p>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label="Licence No"
                                                    key={index}
                                                    className={`w-1/2 rounded-lg pl-[22px] text-label-title ${item?.key_text === '' ? 'invisible' : 'visible'}`}
                                                >

                                                    <input type='text'
                                                     disabled={isDisabled}
                                                    placeholder='Licence No' name={`${item?.key_lic}`}
                                                        defaultValue={fetchDetails?.data && fetchDetails?.data[item?.key_lic]}
                                                        className="!w-full h-11 block w-full border border-gray-200 
                        shadow-sm rounded-md text-sm 
                        focus:z-10 focus:border-blue-500 focus:ring-blue-500
                         dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                   file:bg-transparent file:border-0
                             file:bg-gray-100 file:mr-4
                           file:py-3 file:px-4
                                  dark:file:bg-gray-700 dark:file:text-gray-400"
                                                        onChange={(e: any) => handleChange(e, item)} />

                                                    {item?.messageText && (
                                                        <p className="text-[red]">
                                                            {item?.messageText}
                                                        </p>
                                                    )}
                                                </FormItem>
                                            </div>


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
                                        onClick={() => navigate(-1)}
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
                                        save
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