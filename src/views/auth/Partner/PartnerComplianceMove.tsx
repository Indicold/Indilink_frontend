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
import { useTranslation } from 'react-i18next'
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
import { messageView } from '@/store/customeHook/validate'
const PartnerComplianceMove = () => {
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

    const {
        result: ValidTillResponse,
        loading: ValidTillLoading,
        sendPostRequest: PostValidTillDetails,
    }: any = usePostApi(`partner/register-partner-upload-doc-text`)

    let array1 = [
        {
            label: 'Insurance Policy',
            placeholder: 'Upload',
            key: 'insurance_policy_image',
            key_text: 'insurance_policy_text',
            key_lic:"insurance_policy_license",
            key_status:"insurance_policy_status",
            view: false,
            url: null,
            valid_till: null,
            licenseNo: null
        },
        {
            label: 'Permit',
            placeholder: 'Upload',
            key: 'permit_image',
            key_text: 'permit_validity_text',
            key_lic:"permit_license",
            key_status:"permit_status",
            view: false,
            url: null,
            valid_till: null,
            licenseNo: null
        },
        {
            label: 'PUCC',
            placeholder: 'Upload',
            key: 'pucc_image',
            key_lic:"pucc_license",
            key_text: 'pucc_validity_text',
            key_status:"pucc_status",
            view: false,
            url: null,
            valid_till: null,
            licenseNo: null
        },
        // {
        //     label: 'Fitness Certificate',
        //     placeholder: 'Upload',
        //     key: 'fitness_cert',
        //     view: false,
        //     url: null,
        //     valid_till: null,
        // },
        // {
        //     label: 'No Entry Permit',
        //     placeholder: 'Upload',
        //     key: 'no_entry_permit',
        //     view: false,
        //     url: null,
        //     valid_till: null,
        // },
    ]

    // Initialize state variable for the file upload items
    const [array, setArray] = useState(array1)
    const [dateArray, setDateArray] = useState<any>({
        'asset_id': id,
        'asset_type_id': localStorage.getItem('asset_id')
    })

    // Handle changes in the file input
    const handleFileChange = (e: any, item: any) => {
        console.log('FILE', e.target.files[0])
        setSelectedFile(e.target.files[0])
        handleUpload(item, e.target.files[0])
    }

    const handleDateChange = (e:any) => {
        let newData = {...dateArray}
        newData[e.target.name] = e.target.value
        setDateArray(newData)
        // console.log("date_change", newData, e.target.value)

        const updatedArray = array.map((item: any) => {
            if (e.target.name === item.key_text) {
                return {
                    ...item,
                    valid_till: e.target.value,
                    messageText: null,
                    licenseNo:"Licence No is required"
                };
            } else {
                return item; // Keep the other items unchanged
            }
        });
        if (localStorage.getItem('isFormValid') !== null){
            localStorage.removeItem('isFormValid');
            const isFormValid:any=updatedArray?.filter((item:any)=>item?.messageText)?.length>0  ? false : true;
            localStorage.setItem('isFormValid', isFormValid);
        }
        setArray(updatedArray);
    }
    const handleChange = (e: any, item: any) => {

        console.log("TYYYYYYYYY", e.target.name, item);

        const newData: any = { ...dateArray }
        newData[e.target.name] = e.target.value
        setDateArray(newData)
        const updatedArray = array.map((itemData) =>
          item.key_lic === itemData.key_lic
            ? { ...itemData, key_lic: e.target.value,  licenseNo:null }
            : itemData
        );
        setArray(updatedArray);
        // const updatedArray = array.map((itemData) =>
        //   item.key_lic === itemData.key_lic
        //     ? { ...itemData, key_lic: e.target.value }
        //     : itemData
        // );
        // setArray(updatedArray);
        console.log("TTTTT66TTTT", e.target.name, newData);
        // console.log("TTTTT66TTTT",newData);

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
                              messageText: 'Valid till date is Required',
                              licenseNo:"Licence No is required"
                          }
                        : itemData
                )

                const isFormValid:any=updatedArray?.filter((item:any)=>item?.messageText)?.length>0  ? false : true;
                localStorage.setItem('isFormValid', isFormValid);
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
    function validateMandatoryFields(data:any, fieldName:any) {
        if (data[fieldName]) {
            let licenseField = `${fieldName}_license`;
            let textField = `${fieldName}_text`;
            if(fieldName==='insurance_policy_image'){
                licenseField="insurance_policy_license";
                textField="insurance_policy_text";
            }
            if(fieldName==='permit_image'){
                licenseField="permit_license";
                textField="permit_validity_text";
            }
    
            if (!data[licenseField] || !data[textField]) {
                console.log("YYYYYYYYYY",data[licenseField]);
                
                // messageView(`Valid Till and License no is mandatory`);
                return false;
            }
            
        } else {
            // The field is not provided, so its corresponding 'license' and 'text' fields are not mandatory.
        }
    
        return true; // Fields are valid or not applicable
    }
    // Handle route navigation
    const handleRoute = () => {
        
        // Extract keys from dateArray and slice from index 2
 const slicedKeys = Object.keys(dateArray);
 
 // Extract keys from array1 items
 const array1Keys = array1?.map((item) => item?.key);
         const matchingKeys = array1Keys.filter((key) => slicedKeys.includes(key))
         
       const isValids:any= matchingKeys?.map((item:any)=>{
            return validateMandatoryFields(dateArray,item);
         });
         const newvalidate:any=array?.filter((item:any)=>item?.messageText)?.length>0  ? false : true;
         const newvalidateLicence:any=array?.filter((item:any)=>item?.licenseNo)?.length>0 ? false : true;
         let Invalid:any=isValids?.filter((item:any)=>item===false)?.length>0 ? false : true;
         console.log("YUUUUUUUUU",Invalid,newvalidate);
         if (Invalid && newvalidate && newvalidateLicence) {
         PostValidTillDetails(dateArray)
         console.log("KEYJHJHKHKHKHK");
         navigate('/asset_success')
         // navigate(`/partner-bussiness-type-additional/${id}`, { state: isDisabled })
         }else{
             messageView(`Valid Till and License no is mandatory`);
         }
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
    useEffect(() => {
        if (fetchDetails?.data !== null) {
            const updatedArray = array.map((item: any) =>
                true && {
                    ...item,
                    valid_till: fetchDetails?.data[item?.key_text],
                    doc_status:fetchDetails?.data[item?.key_status],
                    // key_lic: fetchDetails?.data[item?.key_lic]

                }
            )
            setArray(updatedArray)
        }

    }, [fetchDetails?.data])
    console.log('DDDDDDDD', array)
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
    const { t, i18n }:any = useTranslation();

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
        <h6 className="font-medium leading-tight">{t("Asset Specifications")} </h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight pt-2">{t("Compliance Details")}</h6>
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
                                            className="rounded-lg pl-[6px] text-label-title "
                                        >
                                            <input
                                                disabled={isDisabled}
                                                type="file"
                                                accept="image/png, image/jpeg"
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

                                                    {item?.licenseNo && (
                                                        <p className="text-[red]">
                                                            {item?.licenseNo}
                                                        </p>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                        label="Status"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            name={`${item?.key_status}`}
                                        >
                                            <option disabled selected>Select Status</option>
                                            
                                                        <option
                                                            value={1}
                                                            selected={item?.doc_status===1}
                                                          
                                                        >
                                                         Approved
                                                        </option>
                                                
                                            <option value={0}  selected={item?.doc_status===0}>Not Approved</option>
                                        </select>
                                      
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

export default PartnerComplianceMove